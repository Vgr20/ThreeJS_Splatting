// import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
// import * as THREE from "three";
// import { useEffect, useRef } from "react";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
// import { createBoxColliders } from "./ganeshism_lobby_colliders";
// import * as CANNON from "cannon-es";

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
//       // new THREE.Vector3().fromArray([-0.15829, -0.08684, 0.948])
//       new THREE.Vector3().fromArray([2, 1.0, 2])
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

//     const world = new CANNON.World();
//     world.gravity.set(0, 0, 0);

//     const capsuleRadius = 0.25;
//     const capsuleHeight = 1.5;
//     const playerBody = new CANNON.Body({
//       mass: 1,
//       fixedRotation: true,
//       // position: new CANNON.Vec3(-0.15829, -0.08684, 0.948),
//       position: new CANNON.Vec3(2, 1.0, 2),
//       shape: new CANNON.Cylinder(
//         capsuleRadius,
//         capsuleRadius,
//         capsuleHeight,
//         8
//       ),
//     });
//     world.addBody(playerBody);

//     // Step 2: Scene load
//     viewer
//       .addSplatScene("/splats/ganeshism_lobby.splat", {
//         splatAlphaRemovalThreshold: 5,
//         showLoadingUI: true,
//         position: [0, 1.5, 0],
//         // rotation: [1, 0, 0, 0],
//         rotation: [1, 0, 0, 0.2],
//         scale: [1, 1, 1],
//       })
//       .then(() => {
//         // const camera = viewer.camera;
//         const domElement = viewer.renderer.domElement;

//         // Add physical box colliders
//         const colliders = createBoxColliders();
//         for (const { mesh, body } of colliders) {
//           viewer.threeScene.add(mesh);
//           world.addBody(body);
//         }

//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//         directionalLight.position.set(1, 2, 3);

//         viewer.threeScene.add(ambientLight);
//         viewer.threeScene.add(directionalLight);

//         // Step 3: Add PointerLockControls
//         const controls = new PointerLockControls(camera, domElement);
//         domElement.addEventListener("click", () => controls.lock());
//         viewer.renderer.domElement.style.cursor = "pointer";
//         // Step 4: WASD Movement
//         const moveDir = new THREE.Vector3();
//         const moveSpeed = 3;

//         document.addEventListener(
//           "keydown",
//           (e) => (keys[e.key.toLowerCase()] = true)
//         );
//         document.addEventListener(
//           "keyup",
//           (e) => (keys[e.key.toLowerCase()] = false)
//         );

//         // Fixed timestep setup
//         const fixedTimeStep = 1 / 60;
//         let lastTime = performance.now() / 1000;
//         let accumulator = 0;

//         // Step 5: Single animation loop that handles both movement and rendering
//         function animate() {
//           const currentTime = performance.now() / 1000;
//           const deltaTime = currentTime - lastTime;
//           lastTime = currentTime;
//           accumulator += deltaTime;

//           if (controls.isLocked) {
//             const forward = new THREE.Vector3();
//             const right = new THREE.Vector3();

//             camera.getWorldDirection(forward);
//             forward.y = 0;
//             forward.normalize();
//             right.crossVectors(camera.up, forward).normalize();

//             moveDir.set(0, 0, 0);
//             if (keys["w"]) moveDir.add(forward);
//             if (keys["s"]) moveDir.sub(forward);
//             if (keys["a"]) moveDir.add(right); // Fixed: subtract for left movement
//             if (keys["d"]) moveDir.sub(right); // Fixed: add for right movement

//             moveDir.normalize().multiplyScalar(moveSpeed);
//             // controls.getObject().position.add(velocity);
//             playerBody.velocity.x = moveDir.x;
//             playerBody.velocity.z = moveDir.z;
//             playerBody.velocity.y = moveDir.y;
//           }

//           // Fixed-step physics update
//           while (accumulator >= fixedTimeStep) {
//             world.step(fixedTimeStep);
//             accumulator -= fixedTimeStep;
//           }

//           // Update camera position
//           const pos = playerBody.position;
//           controls.getObject().position.set(pos.x, pos.y, pos.z);

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// THIS CODE INCLUDES UI ELEMENT NAVIGATION AND LOOKING AROUNG CONTROLS

import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { createBoxColliders } from "./ganeshism_lobby_colliders";
import * as CANNON from "cannon-es";

function ViewerGaneshismLobby() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftArrowRefs = {
    w: useRef<HTMLDivElement | null>(null),
    a: useRef<HTMLDivElement | null>(null),
    s: useRef<HTMLDivElement | null>(null),
    d: useRef<HTMLDivElement | null>(null),
  };
  const rightLookRef = useRef<HTMLDivElement>(null);

  // Navigation function - this handles the redirect to another scene
  const navigateToNextScene = () => {
    // Option 1: Simple redirect using window.location
    window.location.href = "/viewer_independence_square";
  };
  const navigateToPrevScene = () => {
    // Option 1: Simple redirect using window.location
    window.location.href = "/viewer_ganeshism";
  };
  useEffect(() => {
    const keys: Record<string, boolean> = {};
    if (!containerRef.current) return;

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
    camera.position.set(2, 1.0, 2);
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(-1.36147, 0.01385, -1.93057));

    const viewer = new GaussianSplats3D.Viewer({
      cameraUp: [0, 1, 0],
      useBuiltInControls: false,
      camera: camera,
      rootElement: rootElement,
    });

    const world = new CANNON.World();
    world.gravity.set(0, 0, 0);

    const capsuleRadius = 0.25;
    const capsuleHeight = 1.5;
    const playerBody = new CANNON.Body({
      mass: 1,
      fixedRotation: true,
      position: new CANNON.Vec3(2, 1.0, 2),
      shape: new CANNON.Cylinder(
        capsuleRadius,
        capsuleRadius,
        capsuleHeight,
        8
      ),
    });
    world.addBody(playerBody);

    viewer
      .addSplatScene("/splats/ganeshism_lobby.splat", {
        splatAlphaRemovalThreshold: 5,
        showLoadingUI: true,
        position: [0, 1.5, 0],
        rotation: [1, 0, 0, 0.2],
        scale: [1, 1, 1],
      })
      .then(() => {
        const domElement = viewer.renderer.domElement;
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

        const controls = new PointerLockControls(camera, domElement);

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

        const simulateKeyHold = (
          key: string,
          ref: React.RefObject<HTMLDivElement | null>
        ) => {
          const element = ref.current;
          if (!element) return;

          let interval: ReturnType<typeof setInterval>;
          element.addEventListener("mousedown", () => {
            keys[key] = true;
            interval = setInterval(() => (keys[key] = true), 100);
          });
          element.addEventListener("mouseup", () => {
            keys[key] = false;
            clearInterval(interval);
          });
          element.addEventListener("mouseleave", () => {
            keys[key] = false;
            clearInterval(interval);
          });
        };

        Object.entries(leftArrowRefs).forEach(([key, ref]) =>
          simulateKeyHold(key, ref)
        );

        if (rightLookRef.current) {
          let dragging = false;
          let prevX = 0;
          let prevY = 0;

          rightLookRef.current.addEventListener("mousedown", (e) => {
            dragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
          });

          rightLookRef.current.addEventListener(
            "mouseup",
            () => (dragging = false)
          );
          rightLookRef.current.addEventListener(
            "mouseleave",
            () => (dragging = false)
          );

          rightLookRef.current.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            const deltaX = e.clientX - prevX;
            const deltaY = e.clientY - prevY;
            prevX = e.clientX;
            prevY = e.clientY;

            const yaw = deltaX * 0.002;
            const pitch = deltaY * 0.002;

            const object = controls.getObject();
            object.rotation.y -= yaw;
            const maxPitch = Math.PI / 2;
            const minPitch = -Math.PI / 2;
            object.rotation.x = THREE.MathUtils.clamp(
              object.rotation.x - pitch,
              minPitch,
              maxPitch
            );
          });
        }

        const fixedTimeStep = 1 / 60;
        let lastTime = performance.now() / 1000;
        let accumulator = 0;

        function animate() {
          const currentTime = performance.now() / 1000;
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;
          accumulator += deltaTime;

          const forward = new THREE.Vector3();
          const right = new THREE.Vector3();
          camera.getWorldDirection(forward);
          forward.y = 0;
          forward.normalize();
          right.crossVectors(camera.up, forward).normalize();

          moveDir.set(0, 0, 0);
          if (keys["w"]) moveDir.add(forward);
          if (keys["s"]) moveDir.sub(forward);
          if (keys["a"]) moveDir.add(right);
          if (keys["d"]) moveDir.sub(right);

          moveDir.normalize().multiplyScalar(moveSpeed);
          playerBody.velocity.x = moveDir.x;
          playerBody.velocity.z = moveDir.z;
          playerBody.velocity.y = moveDir.y;

          while (accumulator >= fixedTimeStep) {
            world.step(fixedTimeStep);
            accumulator -= fixedTimeStep;
          }

          const pos = playerBody.position;
          camera.position.set(pos.x, pos.y, pos.z);

          viewer.update();
          viewer.render();
          requestAnimationFrame(animate);
        }

        animate();
      });

    return () => viewer?.dispose();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <button
        onClick={navigateToPrevScene}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "12px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          userSelect: "none",
          zIndex: 1000, // Ensures the button appears above other elements
          transition: "all 0.3s ease", // Smooth hover effect
        }}
        onMouseEnter={(e) => {
          // Hover effect - makes button more visible when mouse is over it
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
        }}
        onMouseLeave={(e) => {
          // Return to normal state when mouse leaves
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }}
      >
        Change to Previous Scene
      </button>
      <button
        onClick={navigateToNextScene}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "12px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          userSelect: "none",
          zIndex: 1000, // Ensures the button appears above other elements
          transition: "all 0.3s ease", // Smooth hover effect
        }}
        onMouseEnter={(e) => {
          // Hover effect - makes button more visible when mouse is over it
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
        }}
        onMouseLeave={(e) => {
          // Return to normal state when mouse leaves
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }}
      >
        Change to next Scene
      </button>

      {(["w", "a", "s", "d"] as const).map((key) => {
        // Map each key to its corresponding arrow symbol
        const getArrowSymbol = (k: string) => {
          switch (k) {
            case "w":
              return "^"; // Up arrow
            case "a":
              return "<"; // Left arrow
            case "s":
              return "v"; // Down arrow
            case "d":
              return ">"; // Right arrow
            default:
              return k.toUpperCase();
          }
        };

        return (
          <div
            key={key}
            ref={leftArrowRefs[key]}
            style={{
              position: "absolute",
              bottom: key === "s" ? 20 : key === "w" ? 100 : 60,
              left: key === "a" ? 20 : key === "d" ? 100 : 60,
              width: 50,
              height: 50,
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px", // Increased font size for better arrow visibility
              fontWeight: "bold", // Make arrows more prominent
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {getArrowSymbol(key)}
          </div>
        );
      })}

      <div
        ref={rightLookRef}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "320px",
          height: "320px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          fontSize: "2em",
          textAlign: "center",
          lineHeight: "60px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        Drag to look
      </div>
    </div>
  );
}

export default ViewerGaneshismLobby;
