// import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
// import * as THREE from "three";
// import { useEffect, useRef } from "react";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

// function ViewerGaneshismLobby() {
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
//       .addSplatScene("/splats/ganeshism_lobby.splat", {
//         splatAlphaRemovalThreshold: 5,
//         showLoadingUI: true,
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
//         const moveSpeed = 0.05;

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

// export default ViewerGaneshismLobby;


import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { createBoxColliders } from "./ganeshism_lobby_colliders";
import * as CANNON from "cannon-es";

function ViewerGaneshismLobby() {
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
      // new THREE.Vector3().fromArray([-0.15829, -0.08684, 0.948])
      new THREE.Vector3().fromArray([2, 1.0, 2])
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

    const world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    
    const capsuleRadius = 0.25;
    const capsuleHeight = 1.5;
    const playerBody = new CANNON.Body({
      mass: 1,
      fixedRotation: true,
      // position: new CANNON.Vec3(-0.15829, -0.08684, 0.948),
      position: new CANNON.Vec3(2, 1.0, 2),
      shape: new CANNON.Cylinder(capsuleRadius, capsuleRadius, capsuleHeight, 8),
    });
    world.addBody(playerBody);

    // Step 2: Scene load
    viewer
      .addSplatScene("/splats/ganeshism_lobby.splat", {
        splatAlphaRemovalThreshold: 5,
        showLoadingUI: true,
        position: [0, 1.5, 0],
        // rotation: [1, 0, 0, 0],
        rotation: [1, 0, 0, 0.2],
        scale: [1, 1, 1],
      })
      .then(() => {
        // const camera = viewer.camera;
        const domElement = viewer.renderer.domElement;

        // Add physical box colliders
        const colliders = createBoxColliders();
        for (const { mesh, body } of colliders) {
          viewer.threeScene.add(mesh);
          world.addBody(body);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 2, 3);
        
        viewer.threeScene.add(ambientLight);
        viewer.threeScene.add(directionalLight);

        // Step 3: Add PointerLockControls
        const controls = new PointerLockControls(camera, domElement);
        domElement.addEventListener("click", () => controls.lock());
        viewer.renderer.domElement.style.cursor = "pointer";
        // Step 4: WASD Movement
        const moveDir = new THREE.Vector3();
        const moveSpeed = 3;

        document.addEventListener(
          "keydown",
          (e) => (keys[e.key.toLowerCase()] = true)
        );
        document.addEventListener(
          "keyup",
          (e) => (keys[e.key.toLowerCase()] = false)
        );

        // Fixed timestep setup
        const fixedTimeStep = 1 / 60;
        let lastTime = performance.now() / 1000;
        let accumulator = 0;

        // Step 5: Single animation loop that handles both movement and rendering
        function animate() {

          const currentTime = performance.now() / 1000;
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;
          accumulator += deltaTime;

          if (controls.isLocked) {
            const forward = new THREE.Vector3();
            const right = new THREE.Vector3();

            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            right.crossVectors(camera.up, forward).normalize();

            moveDir.set(0, 0, 0);
            if (keys["w"]) moveDir.add(forward);
            if (keys["s"]) moveDir.sub(forward);
            if (keys["a"]) moveDir.add(right); // Fixed: subtract for left movement
            if (keys["d"]) moveDir.sub(right); // Fixed: add for right movement

            moveDir.normalize().multiplyScalar(moveSpeed);
            // controls.getObject().position.add(velocity);
            playerBody.velocity.x = moveDir.x;
            playerBody.velocity.z = moveDir.z;
            playerBody.velocity.y = moveDir.y;
          }

          // Fixed-step physics update
          while (accumulator >= fixedTimeStep) {
            world.step(fixedTimeStep);
            accumulator -= fixedTimeStep;
          }

          // Update camera position
          const pos = playerBody.position;
          controls.getObject().position.set(pos.x, pos.y, pos.z);

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

export default ViewerGaneshismLobby;
