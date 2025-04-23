/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

interface SplatViewerProps {
  splatFilePath: string;
  initialCameraPosition?: [number, number, number];
  initialCameraLookAt?: [number, number, number];
  width?: string | number;
  height?: string | number;
  moveSpeed?: number;
  onSceneLoaded?: () => void;
}

const SplatViewer: React.FC<SplatViewerProps> = ({
  splatFilePath,
  initialCameraPosition = [-0.15829, -0.08684, 0.948],
  initialCameraLookAt = [-1.36147, 0.01385, -1.93057],
  width = "100%",
  height = "600px",
  moveSpeed = 0.01,
  onSceneLoaded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const animationFrameRef = useRef<number | null>(null);
  const updateFrameRef = useRef<number | null>(null);

  // Initialize the viewer
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any previous viewer instance
    if (viewerRef.current) {
      cleanupViewer();
    }

    const container = containerRef.current;
    const renderWidth = container.clientWidth;
    const renderHeight = container.clientHeight;

    try {
      // Set up camera
      const camera = new THREE.PerspectiveCamera(
        65,
        renderWidth / renderHeight,
        0.1,
        500
      );
      camera.position.copy(
        new THREE.Vector3().fromArray(initialCameraPosition)
      );
      camera.up = new THREE.Vector3(0, 1, 0).normalize();
      camera.lookAt(new THREE.Vector3().fromArray(initialCameraLookAt));

      // Initialize viewer
      const viewer = new GaussianSplats3D.Viewer({
        useBuiltInControls: false,
        camera: camera,
        containerElement: container,
      });

      viewerRef.current = viewer;

      // Handle keyboard controls
      const handleKeyDown = (e: KeyboardEvent) => {
        keysRef.current[e.key.toLowerCase()] = true;
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        keysRef.current[e.key.toLowerCase()] = false;
      };

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

      // Load the splat scene
      loadSplatScene(splatFilePath);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        cleanupViewer();
      };
    } catch (err) {
      console.error("Error initializing viewer:", err);
      setError("Failed to initialize 3D viewer");
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to load a new splat scene when the path changes
  useEffect(() => {
    if (viewerRef.current) {
      loadSplatScene(splatFilePath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splatFilePath]);

  // Function to load a splat scene
  const loadSplatScene = async (path: string) => {
    if (!viewerRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Clean up previous animations
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (updateFrameRef.current) {
        cancelAnimationFrame(updateFrameRef.current);
      }

      // Reset camera position
      const camera = viewerRef.current.camera;
      camera.position.copy(
        new THREE.Vector3().fromArray(initialCameraPosition)
      );
      camera.lookAt(new THREE.Vector3().fromArray(initialCameraLookAt));

      // Clear previous scenes
      await viewerRef.current.clearScene();

      // Add new scene
      await viewerRef.current.addSplatScene(path, {
        splatAlphaRemovalThreshold: 5,
        showLoadingUI: true,
        position: [0, 0, 0],
        rotation: [1, 0, 0, 0],
        scale: [1, 1, 1],
      });

      // Set up controls after scene is loaded
      setupControls();

      // Notify parent component that scene is loaded
      if (onSceneLoaded) {
        onSceneLoaded();
      }
    } catch (err) {
      console.error("Error loading splat scene:", err);
      setError(`Failed to load scene: ${path}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up pointer lock controls and animation
  const setupControls = () => {
    if (!viewerRef.current) return;

    const viewer = viewerRef.current;
    const camera = viewer.camera;
    const domElement = viewer.renderer.domElement;

    // Set up pointer lock controls
    const controls = new PointerLockControls(camera, domElement);
    controlsRef.current = controls;

    // Click to lock pointer
    domElement.addEventListener("click", () => controls.lock());
    domElement.style.cursor = "pointer";

    // Animation loop for movement
    const velocity = new THREE.Vector3();

    function animate() {
      if (controls.isLocked) {
        const right = new THREE.Vector3();
        const forward = new THREE.Vector3();

        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        right.crossVectors(camera.up, forward).normalize();

        velocity.set(0, 0, 0);

        if (keysRef.current["w"]) velocity.add(forward);
        if (keysRef.current["s"]) velocity.sub(forward);
        if (keysRef.current["a"]) velocity.add(right);
        if (keysRef.current["d"]) velocity.sub(right);

        velocity.multiplyScalar(moveSpeed);
        controls.getObject().position.add(velocity);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Start animation loops
    animate();

    function update() {
      viewer.update();
      viewer.render();
      updateFrameRef.current = requestAnimationFrame(update);
    }

    update();
  };

  // Clean up viewer and animation frames
  const cleanupViewer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (updateFrameRef.current) {
      cancelAnimationFrame(updateFrameRef.current);
      updateFrameRef.current = null;
    }

    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: width,
        height: height,
        position: "relative",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            zIndex: 10,
          }}
        >
          Loading scene...
        </div>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,0,0,0.1)",
            color: "white",
            zIndex: 10,
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          color: "white",
          padding: "5px 10px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "4px",
          fontSize: "12px",
          zIndex: 5,
        }}
      >
        Click to start | WASD to move | Mouse to look
      </div>
    </div>
  );
};

export default SplatViewer;
