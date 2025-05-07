import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

function ViewerEntcLobby() {
  // Create a ref to store the container element
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const keys: Record<string, boolean> = {};
    if (!containerRef.current) return;

    // Step 1: Initialize viewer using the container ref instead of creating a new element
    const renderWidth = window.innerWidth;
    const renderHeight = window.innerHeight;
    const rootElement = containerRef.current;
    rootElement.style.width = renderWidth + "px";
    rootElement.style.height = renderHeight + "px";

    const camera = new THREE.PerspectiveCamera(
      65,
      renderWidth / renderHeight,
      0.1,
      500
    );
    camera.position.copy(
      new THREE.Vector3().fromArray([-0.15829, -0.08684, 0.948])
    );
    camera.up = new THREE.Vector3().fromArray([0, 1, 0]).normalize();
    camera.lookAt(new THREE.Vector3().fromArray([-1.36147, 0.01385, -1.93057]));

    const viewer = new GaussianSplats3D.Viewer({
      cameraUp: [0, 1, 0],
      useBuiltInControls: false,
      camera: camera,
      // Pass the container element instead of letting the viewer create one
      rootElement: rootElement,
    });

    // Step 2: Scene load
    viewer
      .addSplatScene("/splats/entc_lobby.ksplat", {
        splatAlphaRemovalThreshold: 5,
        showLoadingUI: false,
        position: [0, 0, 0],
        rotation: [1, 0, 0, 0],
        scale: [1, 1, 1],
        progressiveLoad: true,
        sceneRevealMode: "Instant",
        sharedMemoryForWorkers: false,
        gpuAcceleratedSort: false,
      })
      .then(() => {
        const camera = viewer.camera;
        const domElement = viewer.renderer.domElement;

        // Step 3: Add PointerLockControls
        const controls = new PointerLockControls(camera, domElement);
        domElement.addEventListener("click", () => controls.lock());
        viewer.renderer.domElement.style.cursor = "pointer";
        // Step 4: WASD Movement
        const velocity = new THREE.Vector3();
        const moveSpeed = 0.01;

        document.addEventListener(
          "keydown",
          (e) => (keys[e.key.toLowerCase()] = true)
        );
        document.addEventListener(
          "keyup",
          (e) => (keys[e.key.toLowerCase()] = false)
        );

        // Step 5: Single animation loop that handles both movement and rendering
        function animate() {
          if (controls.isLocked) {
            const forward = new THREE.Vector3();
            const right = new THREE.Vector3();

            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            right.crossVectors(camera.up, forward).normalize();

            velocity.set(0, 0, 0);
            if (keys["w"]) velocity.add(forward);
            if (keys["s"]) velocity.sub(forward);
            if (keys["a"]) velocity.add(right); // Fixed: subtract for left movement
            if (keys["d"]) velocity.sub(right); // Fixed: add for right movement

            velocity.normalize().multiplyScalar(moveSpeed);
            controls.getObject().position.add(velocity);
          }

          // Update and render in the same loop
          viewer.update();
          viewer.render();

          requestAnimationFrame(animate);
        }

        // Start the single animation loop
        animate();
      });

    // Cleanup function to remove event listeners and dispose resources
    return () => {
      document.removeEventListener(
        "keydown",
        (e) => (keys[e.key.toLowerCase()] = true)
      );
      document.removeEventListener(
        "keyup",
        (e) => (keys[e.key.toLowerCase()] = false)
      );
      if (viewer) {
        viewer.dispose();
      }
    };
  }, []);

  // Render a div that will be used as the container for the 3D viewer
  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
  );
}

export default ViewerEntcLobby;
