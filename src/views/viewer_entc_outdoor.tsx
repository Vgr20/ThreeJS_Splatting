// import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
// import * as THREE from "three";
// import { useEffect, useRef } from "react";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

// function ViewerEntcOutdoor() {
//   // Create a ref to store the container element
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const keys: Record<string, boolean> = {};
//     if (!containerRef.current) return;

//     // Step 1: Initialize viewer using the container ref instead of creating a new element
//     const renderWidth = window.innerWidth;
//     const renderHeight = window.innerHeight;
//     const rootElement = containerRef.current;
//     rootElement.style.width = renderWidth + "px";
//     rootElement.style.height = renderHeight + "px";

//     const camera = new THREE.PerspectiveCamera(
//       65,
//       renderWidth / renderHeight,
//       0.1,
//       500
//     );
//     camera.position.copy(
//       new THREE.Vector3().fromArray([-0.15829, -0.08684, 0.948])
//     );
//     camera.up = new THREE.Vector3().fromArray([0, 1, 0]).normalize();
//     camera.lookAt(new THREE.Vector3().fromArray([-1.36147, 0.01385, -1.93057]));

//     const viewer = new GaussianSplats3D.Viewer({
//       cameraUp: [0, 1, 0],
//       useBuiltInControls: false,
//       camera: camera,
//       // Pass the container element instead of letting the viewer create one
//       rootElement: rootElement,
//     });

//     // Step 2: Scene load
//     viewer
//       .addSplatScene("/splats/entc_outdoor.ksplat", {
//         splatAlphaRemovalThreshold: 5,
//         showLoadingUI: false,
//         position: [0, 0, 0],
//         rotation: [1, 0, 0, 0],
//         scale: [1, 1, 1],
//       })
//       .then(() => {
//         const camera = viewer.camera;
//         const domElement = viewer.renderer.domElement;

//         // Step 3: Add PointerLockControls
//         const controls = new PointerLockControls(camera, domElement);
//         domElement.addEventListener("click", () => controls.lock());
//         viewer.renderer.domElement.style.cursor = "pointer";
//         // Step 4: WASD Movement
//         const velocity = new THREE.Vector3();
//         const moveSpeed = 0.01;

//         document.addEventListener(
//           "keydown",
//           (e) => (keys[e.key.toLowerCase()] = true)
//         );
//         document.addEventListener(
//           "keyup",
//           (e) => (keys[e.key.toLowerCase()] = false)
//         );

//         // Step 5: Single animation loop that handles both movement and rendering
//         function animate() {
//           if (controls.isLocked) {
//             const forward = new THREE.Vector3();
//             const right = new THREE.Vector3();

//             camera.getWorldDirection(forward);
//             forward.y = 0;
//             forward.normalize();
//             right.crossVectors(camera.up, forward).normalize();

//             velocity.set(0, 0, 0);
//             if (keys["w"]) velocity.add(forward);
//             if (keys["s"]) velocity.sub(forward);
//             if (keys["a"]) velocity.add(right); // Fixed: subtract for left movement
//             if (keys["d"]) velocity.sub(right); // Fixed: add for right movement

//             velocity.normalize().multiplyScalar(moveSpeed);
//             controls.getObject().position.add(velocity);
//           }

//           // Update and render in the same loop
//           viewer.update();
//           viewer.render();

//           requestAnimationFrame(animate);
//         }

//         // Start the single animation loop
//         animate();
//       });

//     // Cleanup function to remove event listeners and dispose resources
//     return () => {
//       document.removeEventListener(
//         "keydown",
//         (e) => (keys[e.key.toLowerCase()] = true)
//       );
//       document.removeEventListener(
//         "keyup",
//         (e) => (keys[e.key.toLowerCase()] = false)
//       );
//       if (viewer) {
//         viewer.dispose();
//       }
//     };
//   }, []);

//   // Render a div that will be used as the container for the 3D viewer
//   return (
//     <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
//   );
// }

// export default ViewerEntcOutdoor;

import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

function ViewerEntcOutdoor() {
  // Create a ref to store the container element
  const containerRef = useRef<HTMLDivElement | null>(null);
  // State for toast visibility and camera info
  const [showToast, setShowToast] = useState(false);
  const [cameraInfo, setCameraInfo] = useState({
    position: [0, 0, 0],
    lookAt: [0, 0, 0],
    up: [0, 0, 0],
    mode: "Perspective",
    cursorPosition: "N/A",
    fps: 0,
  });

  // FPS calculation
  const fpsRef = useRef({
    frames: 0,
    lastTime: 0,
    fps: 0,
  });

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

    // Initial camera position
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

    // Target for camera lookAt calculations
    const lookAtTarget = new THREE.Vector3().fromArray([
      -1.36147, 0.01385, -1.93057,
    ]);

    // Step 2: Scene load
    viewer
      .addSplatScene("/splats/entc_outdoor.ksplat", {
        splatAlphaRemovalThreshold: 5,
        showLoadingUI: false,
        position: [0, 0, 0],
        rotation: [1, 0, 0, 0],
        scale: [1, 1, 1],
      })
      .then(() => {
        const domElement = viewer.renderer.domElement;

        // Step 3: Add PointerLockControls
        const controls = new PointerLockControls(camera, domElement);
        domElement.addEventListener("click", () => controls.lock());
        viewer.renderer.domElement.style.cursor = "pointer";

        // Step 4: WASD Movement
        const velocity = new THREE.Vector3();
        const moveSpeed = 0.01;

        // Function to update camera info for the toast
        function updateCameraInfo() {
          const pos = camera.position.toArray().map((v) => v.toFixed(5));

          // Calculate lookAt point by extending the camera's direction
          const lookAtVector = new THREE.Vector3();
          camera.getWorldDirection(lookAtVector);
          const lookAt = new THREE.Vector3()
            .addVectors(
              camera.position,
              lookAtVector.multiplyScalar(5) // Arbitrary distance
            )
            .toArray()
            .map((v) => parseFloat(v.toFixed(5)));

          const up = camera.up.toArray().map((v) => parseFloat(v.toFixed(5)));

          setCameraInfo({
            position: pos.map(Number),
            lookAt: lookAt,
            up: up,
            mode: "Perspective", // Always perspective since we removed orthographic
            cursorPosition: "N/A", // This would need mouse position tracking if needed
            fps: fpsRef.current.fps,
          });
        }

        // Define the handleKeyDown and handleKeyUp functions so they can be properly referenced
        const handleKeyDown = (e: KeyboardEvent) => {
          keys[e.key.toLowerCase()] = true;

          // Toggle info toast with "I" key
          if (e.key.toLowerCase() === "i") {
            setShowToast((prev) => !prev);
            updateCameraInfo(); // Update camera info when showing toast
          }

          // Handle left/right arrow keys for rotation around Z axis
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            const rotationAmount = e.key === "ArrowLeft" ? 0.05 : -0.05; // Radians

            // Create a rotation matrix around the global Z axis
            const zAxis = new THREE.Vector3(0, 0, 1);
            const rotationMatrix = new THREE.Matrix4().makeRotationAxis(
              zAxis,
              rotationAmount
            );

            // Calculate the vector from camera to lookAt target
            const cameraToTarget = lookAtTarget.clone().sub(camera.position);

            // Apply rotation to this vector
            cameraToTarget.applyMatrix4(rotationMatrix);

            // Update lookAt target
            lookAtTarget.copy(camera.position).add(cameraToTarget);

            // Make camera look at the new target
            camera.lookAt(lookAtTarget);

            updateCameraInfo();
          }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
          keys[e.key.toLowerCase()] = false;
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        // Step 5: Single animation loop that handles both movement and rendering
        function animate() {
          // FPS calculation
          const now = performance.now();
          fpsRef.current.frames++;

          if (now - fpsRef.current.lastTime >= 1000) {
            fpsRef.current.fps = Math.round(
              (fpsRef.current.frames * 1000) / (now - fpsRef.current.lastTime)
            );
            fpsRef.current.frames = 0;
            fpsRef.current.lastTime = now;

            // Update camera info if toast is visible
            if (showToast) {
              updateCameraInfo();
            }
          }

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
            if (keys["a"]) velocity.sub(right); // Correct: subtract right for left movement
            if (keys["d"]) velocity.add(right); // Correct: add right for right movement

            velocity.normalize().multiplyScalar(moveSpeed);
            controls.getObject().position.add(velocity);

            // Update lookAt target when moving
            lookAtTarget.add(velocity);
          }

          // Update and render in the same loop
          viewer.update();
          viewer.render();

          requestAnimationFrame(animate);
        }

        // Start the single animation loop
        animate();

        // Cleanup function to remove event listeners and dispose resources
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.removeEventListener("keyup", handleKeyUp);
          if (viewer) {
            viewer.dispose();
          }
        };
      });
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
      {showToast && (
        <div className="fixed top-5 right-5 bg-black bg-opacity-70 text-white p-4 rounded-md font-mono text-sm z-50 max-w-sm shadow-lg">
          <p className="my-1">
            <span className="text-sky-300 mr-1 font-bold">
              Camera position:
            </span>{" "}
            {cameraInfo.position.join(", ")}
          </p>
          <p className="my-1">
            <span className="text-sky-300 mr-1 font-bold">Camera look-at:</span>{" "}
            {cameraInfo.lookAt.join(", ")}
          </p>
          <p className="my-1">
            <span className="text-sky-300 mr-1 font-bold">Camera up:</span>{" "}
            {cameraInfo.up.join(", ")}
          </p>
          <p className="my-1">
            <span className="text-sky-300 mr-1 font-bold">Camera mode:</span>{" "}
            {cameraInfo.mode}
          </p>
          <p className="my-1">
            <span className="text-sky-300 mr-1 font-bold">
              Cursor position:
            </span>{" "}
            {cameraInfo.cursorPosition}
          </p>
          <p className="my-1">
            <span className="text-sky-300 mr-1 font-bold">FPS:</span>{" "}
            {cameraInfo.fps}
          </p>
        </div>
      )}
    </>
  );
}

export default ViewerEntcOutdoor;
