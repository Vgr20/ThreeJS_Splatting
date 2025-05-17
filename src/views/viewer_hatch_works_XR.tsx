// ViewerEntcLobby.jsx
import { useEffect, useRef } from "react";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

const ViewerGaneshismLobbyXR = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new GaussianSplats3D.Viewer({
      initialCameraLookAt: [-1.36147, 0.01385, -1.93057],
      webXRMode: GaussianSplats3D.WebXRMode.AR,
      container: containerRef.current,
    });

    const path = "/splats/hatch_works.ksplat";

    viewer
      .addSplatScene(path, {
        scale: [1.0, 1.0, 1.0],
        position: [-3, 0.1, -0.2],
        // rotation: [Math.PI, 0, 0],
        rotation: [1, 0, 0.1, 0],
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
