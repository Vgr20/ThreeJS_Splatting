// ViewerEntcLobby.jsx
import { useEffect, useRef } from "react";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

const ViewerGaneshismLobbyXR = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new GaussianSplats3D.Viewer({
      initialCameraLookAt: [1, 1, 1],
      // initialCameraLookAt: [-1.36147, 0.01385, -1.93057],
      webXRMode: GaussianSplats3D.WebXRMode.AR,
      // webXRSessionInit: {
      //   requiredFeatures: ["bounded-floor"], // Try also "bounded-floor"
      //   optionalFeatures: ["hit-test", "light-estimation"], // optional
      // },
      container: containerRef.current,
    });

    const path = "/splats/ganeshism_lobby.splat";

    viewer
      .addSplatScene(path, {
        scale: [1.0, 1.0, 1.0],
        position: [-2, 0.5, 0],
        // rotation: [Math.PI, 0, 0],
        rotation: [1, 0, -0.1, 0.2],
      })
      .then(() => {
        viewer.start();
      });

    // Optional cleanup if viewer has a dispose or stop method
    return () => {
      viewer.stop?.();
      viewer.dispose?.();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default ViewerGaneshismLobbyXR;

/////////////////////////////////////////////////////////
