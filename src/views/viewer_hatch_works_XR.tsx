// // ViewerEntcLobby.jsx
// import { useEffect, useRef } from "react";
// import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

// const ViewerGaneshismLobbyXR = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const viewer = new GaussianSplats3D.Viewer({
//       initialCameraLookAt: [-1.36147, 0.01385, -1.93057],
//       webXRMode: GaussianSplats3D.WebXRMode.AR,
//       container: containerRef.current,
//     });

//     const path = "/splats/hatch_works.splat";

//     viewer
//       .addSplatScene(path, {
//         scale: [1.0, 1.0, 1.0],
//         position: [5, 1.5, 0],
//         // rotation: [Math.PI, 0, 0],
//         rotation: [1, 0, 0, 0.2],
//       })
//       .then(() => {
//         viewer.start();
//       });

//     // Optional cleanup if viewer has a dispose or stop method
//     return () => {
//       viewer.stop?.();
//       viewer.dispose?.();
//     };
//   }, []);

//   return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default ViewerGaneshismLobbyXR;

/////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

interface ControllerState {
  leftThumbstickX: number;
  leftThumbstickY: number;
  rightThumbstickX: number;
  rightThumbstickY: number;
  leftGrip: number;
  rightGrip: number;
}

const ViewerGaneshismLobbyXR: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isVRSession, setIsVRSession] = useState<boolean>(false);

  // Store controller references
  const controllerRefs = useRef<{
    left: any | null;
    right: any | null;
    leftGamepad: any | null;
    rightGamepad: any | null;
  }>({
    left: null,
    right: null,
    leftGamepad: null,
    rightGamepad: null,
  });

  // Store the previous controller state to detect changes
  const prevControllerState = useRef<ControllerState>({
    leftThumbstickX: 0,
    leftThumbstickY: 0,
    rightThumbstickX: 0,
    rightThumbstickY: 0,
    leftGrip: 0,
    rightGrip: 0,
  });

  // Movement settings
  const settings = {
    moveSpeed: 0.05,
    rotateSpeed: 0.03,
    panSpeed: 0.05,
  };

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("Initializing Gaussian Splatting Viewer");

    // Create the viewer
    const viewer = new GaussianSplats3D.Viewer({
      initialCameraLookAt: [-1.36147, 0.01385, -1.93057],
      webXRMode: GaussianSplats3D.WebXRMode.AR,
      container: containerRef.current,
    });

    // Save the viewer reference
    viewerRef.current = viewer;
    console.log("Viewer created:", viewer);

    // Load the splat scene
    const path = "/splats/hatch_works.splat";
    console.log("Loading splat scene from:", path);

    viewer
      .addSplatScene(path, {
        scale: [1.0, 1.0, 1.0],
        position: [5, 1.5, 0],
        rotation: [1, 0, 0, 0.2],
      })
      .then(() => {
        console.log("Splat scene loaded successfully");
        viewer.start();
        console.log("Viewer started");

        // Setup XR session event listeners
        setupXRSessionListeners(viewer);
      })
      .catch((error: any) => {
        console.error("Error loading splat scene:", error);
      });

    // Optional cleanup if viewer has a dispose or stop method
    return () => {
      console.log("Cleaning up viewer");
      if (viewer.stop) viewer.stop();
      if (viewer.dispose) viewer.dispose();
    };
  }, []);

  // Function to set up XR session listeners
  const setupXRSessionListeners = (viewer: any): void => {
    console.log("Setting up XR session listeners");

    // Check if the renderer and its xr property exist
    if (!viewer.renderer || !viewer.renderer.xr) {
      console.error("XR not available on the renderer");
      return;
    }

    // Listen for XR session start
    viewer.renderer.xr.addEventListener("sessionstart", () => {
      console.log("XR session started");
      setIsVRSession(true);

      // Set up controllers
      setupControllers(viewer);

      // Override the animation loop to include controller input processing
      setupXRAnimationLoop(viewer);
    });

    // Listen for XR session end
    viewer.renderer.xr.addEventListener("sessionend", () => {
      console.log("XR session ended");
      setIsVRSession(false);

      // Clean up controller references
      controllerRefs.current = {
        left: null,
        right: null,
        leftGamepad: null,
        rightGamepad: null,
      };
    });
  };

  // Function to set up the XR animation loop
  const setupXRAnimationLoop = (viewer: any): void => {
    console.log("Setting up XR animation loop");

    const origRenderFunction = viewer.renderer.setAnimationLoop;

    viewer.renderer.setAnimationLoop = (callback: any) => {
      const wrappedCallback = (timestamp: number, frame: any) => {
        if (frame) {
          processXRInput(viewer, frame);
        }
        if (callback) callback(timestamp, frame);
      };

      origRenderFunction.call(viewer.renderer, wrappedCallback);
    };
  };

  // Function to set up controllers
  const setupControllers = (viewer: any): void => {
    console.log("Setting up VR controllers");
    const { renderer } = viewer;

    if (!renderer || !renderer.xr) {
      console.error("Renderer or XR not available");
      return;
    }

    try {
      // Get the XR session
      const session = renderer.xr.getSession();
      if (!session) {
        console.error("No XR session available");
        return;
      }

      console.log("XR Session:", session);
      console.log("Available input sources:", session.inputSources);

      // Get the XR input sources
      session.inputSources.forEach((inputSource: any) => {
        console.log("Found input source:", inputSource);
        console.log("Handedness:", inputSource.handedness);
        console.log("Has gamepad:", !!inputSource.gamepad);

        if (inputSource.handedness === "left") {
          controllerRefs.current.left = inputSource;
          controllerRefs.current.leftGamepad = inputSource.gamepad;
          console.log("Set left controller");
        } else if (inputSource.handedness === "right") {
          controllerRefs.current.right = inputSource;
          controllerRefs.current.rightGamepad = inputSource.gamepad;
          console.log("Set right controller");
        }
      });

      // Listen for input source changes
      session.addEventListener("inputsourceschange", (event: any) => {
        console.log("Input sources changed:", event);

        event.added.forEach((inputSource: any) => {
          console.log("Input source added:", inputSource);

          if (inputSource.handedness === "left") {
            controllerRefs.current.left = inputSource;
            controllerRefs.current.leftGamepad = inputSource.gamepad;
            console.log("Left controller added");
          } else if (inputSource.handedness === "right") {
            controllerRefs.current.right = inputSource;
            controllerRefs.current.rightGamepad = inputSource.gamepad;
            console.log("Right controller added");
          }
        });

        event.removed.forEach((inputSource: any) => {
          console.log("Input source removed:", inputSource);

          if (inputSource.handedness === "left") {
            controllerRefs.current.left = null;
            controllerRefs.current.leftGamepad = null;
            console.log("Left controller removed");
          } else if (inputSource.handedness === "right") {
            controllerRefs.current.right = null;
            controllerRefs.current.rightGamepad = null;
            console.log("Right controller removed");
          }
        });
      });
    } catch (error) {
      console.error("Error setting up controllers:", error);
    }
  };

  // Process XR input in each frame
  const processXRInput = (viewer: any, frame: any): void => {
    if (!isVRSession) return;

    try {
      const session = frame.session;
      if (!session) return;

      // Update controller references
      session.inputSources.forEach((inputSource: any) => {
        if (inputSource.handedness === "left") {
          controllerRefs.current.left = inputSource;
          controllerRefs.current.leftGamepad = inputSource.gamepad;
        } else if (inputSource.handedness === "right") {
          controllerRefs.current.right = inputSource;
          controllerRefs.current.rightGamepad = inputSource.gamepad;
        }
      });

      // Process controller inputs
      updateControllerInputs(viewer);
    } catch (error) {
      console.error("Error processing XR input:", error);
    }
  };

  // Function to update controller inputs
  const updateControllerInputs = (viewer: any) => {
    try {
      const { left, right, leftGamepad, rightGamepad } = controllerRefs.current;

      // Check if we have gamepad data
      if (!leftGamepad && !rightGamepad) {
        // No controllers connected with gamepad data
        return;
      }

      // Get the camera for movement
      const camera = viewer.camera;
      if (!camera) {
        console.warn("Camera not available");
        return;
      }

      // Debug current camera position and rotation
      console.log("Camera position:", camera.position);
      console.log("Camera rotation:", camera.rotation);

      // Handle left controller (movement)
      if (leftGamepad && leftGamepad.axes && leftGamepad.axes.length >= 2) {
        const xAxis = leftGamepad.axes[0];
        const yAxis = leftGamepad.axes[1];

        // Log controller values for debugging
        console.log("Left thumbstick X:", xAxis);
        console.log("Left thumbstick Y:", yAxis);

        // Apply deadzone for thumbstick (ignore small movements)
        const deadzone = 0.15;

        // Only move if thumbstick is pushed significantly
        if (Math.abs(xAxis) > deadzone || Math.abs(yAxis) > deadzone) {
          console.log("Moving with left thumbstick");

          // Get camera direction vectors (using Three.js directly)
          const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
            camera.quaternion
          );
          const right = new THREE.Vector3(1, 0, 0).applyQuaternion(
            camera.quaternion
          );

          // Scale movement by speed
          const moveX = xAxis * settings.moveSpeed;
          const moveZ = yAxis * settings.moveSpeed;

          console.log("Movement amounts - X:", moveX, "Z:", moveZ);

          // Move forward/backward and left/right
          camera.position.add(forward.multiplyScalar(-moveZ));
          camera.position.add(right.multiplyScalar(moveX));

          console.log("New camera position:", camera.position);
        }

        // Store current state
        prevControllerState.current.leftThumbstickX = xAxis;
        prevControllerState.current.leftThumbstickY = yAxis;
      }

      // Handle right controller (rotation)
      if (rightGamepad && rightGamepad.axes && rightGamepad.axes.length >= 2) {
        const xAxis = rightGamepad.axes[0];
        const yAxis = rightGamepad.axes[1];

        // Log controller values for debugging
        console.log("Right thumbstick X:", xAxis);
        console.log("Right thumbstick Y:", yAxis);

        // Apply deadzone
        const deadzone = 0.15;

        if (Math.abs(xAxis) > deadzone) {
          console.log("Rotating horizontally with right thumbstick");
          // Rotate around Y axis (left/right)
          camera.rotation.y -= xAxis * settings.rotateSpeed;
          console.log("New Y rotation:", camera.rotation.y);
        }

        if (Math.abs(yAxis) > deadzone) {
          console.log("Rotating vertically with right thumbstick");
          // Limit vertical rotation to prevent flipping
          const newXRotation = camera.rotation.x - yAxis * settings.rotateSpeed;
          const maxRotation = Math.PI / 2 - 0.1; // Prevent complete flipping

          camera.rotation.x = Math.max(
            Math.min(newXRotation, maxRotation),
            -maxRotation
          );
          console.log("New X rotation:", camera.rotation.x);
        }

        // Store current state
        prevControllerState.current.rightThumbstickX = xAxis;
        prevControllerState.current.rightThumbstickY = yAxis;
      }

      // Handle grip buttons for vertical movement
      if (
        rightGamepad &&
        rightGamepad.buttons &&
        rightGamepad.buttons.length >= 2
      ) {
        // Usually button 1 is the grip button
        const gripValue = rightGamepad.buttons[1].value;
        console.log("Right grip value:", gripValue);

        // Pan up when grip is pressed
        if (gripValue > 0.5) {
          console.log("Moving up with right grip");
          // Move up
          camera.position.y += settings.panSpeed;
          console.log("New Y position:", camera.position.y);
        }

        // Store current grip state
        prevControllerState.current.rightGrip = gripValue;
      }

      // Handle left controller grip (for moving down)
      if (
        leftGamepad &&
        leftGamepad.buttons &&
        leftGamepad.buttons.length >= 2
      ) {
        const gripValue = leftGamepad.buttons[1].value;
        console.log("Left grip value:", gripValue);

        // Pan down when grip is pressed
        if (gripValue > 0.5) {
          console.log("Moving down with left grip");
          // Move down
          camera.position.y -= settings.panSpeed;
          console.log("New Y position:", camera.position.y);
        }

        // Store current grip state
        prevControllerState.current.leftGrip = gripValue;
      }
    } catch (error) {
      console.error("Error updating controller inputs:", error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Debug UI - shows current VR status */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded">
        <p>VR Status: {isVRSession ? "Active" : "Inactive"}</p>
        <p>
          Left Controller:{" "}
          {controllerRefs.current.left ? "Connected" : "Disconnected"}
        </p>
        <p>
          Right Controller:{" "}
          {controllerRefs.current.right ? "Connected" : "Disconnected"}
        </p>
      </div>

      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
        <p>VR Controls:</p>
        <p>Left Thumbstick: Move</p>
        <p>Right Thumbstick: Rotate</p>
        <p>Left Grip: Move Down</p>
        <p>Right Grip: Move Up</p>
      </div>
    </div>
  );
};

export default ViewerGaneshismLobbyXR;
