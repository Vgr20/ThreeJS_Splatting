import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const renderWidth = window.innerWidth;
    const renderHeight = window.innerHeight;

    const rootElement = document.createElement('div');
    rootElement.style.width = renderWidth + 'px';
    rootElement.style.height = renderHeight + 'px';
    document.body.appendChild(rootElement);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
    });
    renderer.setSize(renderWidth, renderHeight);
    rootElement.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
    camera.position.copy(new THREE.Vector3().fromArray([1.14532, 0.90916, -0.64185]));
    camera.up = new THREE.Vector3().fromArray([0.22545, -0.94844, -0.22277]).normalize();
    camera.lookAt(new THREE.Vector3().fromArray([	-0.33171, 0.95884, 0.78178]));

    const viewer = new GaussianSplats3D.Viewer({
      // 'selfDrivenMode': false,
      // 'renderer': renderer,
      'camera': camera,
      'useBuiltInControls': true,
      'ignoreDevicePixelRatio': false,
      // 'gpuAcceleratedSort': true,
      'enableSIMDInSort': true,
      'sharedMemoryForWorkers': true,
      'integerBasedSort': true,
      'halfPrecisionCovariancesOnGPU': true,
      'dynamicScene': false,
      'webXRMode': GaussianSplats3D.WebXRMode.None,
      'renderMode': GaussianSplats3D.RenderMode.OnChange,
      'sceneRevealMode': GaussianSplats3D.SceneRevealMode.Instant,
      'antialiased': true,
      'focalAdjustment': 1.0,
      'logLevel': GaussianSplats3D.LogLevel.None,
      'sphericalHarmonicsDegree': 0,
      'enableOptionalEffects': false,
      'inMemoryCompressionLevel': 2,
      'freeIntermediateSplatData': false,
      // 'cameraUp': [0.22545, -0.94844, -0.22277],
      // 'initialCameraPosition': [	1.14532, 0.90916, -0.64185],
      // 'initialCameraLookAt': [	-0.33171, 0.95884, 0.78178]
    });
    viewer.addSplatScene('src\\splats\\truck.ksplat', {
      'splatAlphaRemovalThreshold': 5,
      'showLoadingUI': true,
      'position': [0, 1, 0],
      'rotation': [0, 0, 0, 1],
      'scale': [1.5, 1.5, 1.5]
    })
    .then(() => {
      viewer.start();
      // requestAnimationFrame(function update() {
      //   viewer.update();
      //   viewer.render();
      //   requestAnimationFrame(update);
      // });
    });
  }, []);

}

export default App;

// import React, { useEffect } from 'react';
// import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
// import * as THREE from 'three';

// const App: React.FC = () => {
//   useEffect(() => {
//     const renderWidth = 800;
//     const renderHeight = 600;

//     const rootElement = document.createElement('div');
//     rootElement.style.width = renderWidth + 'px';
//     rootElement.style.height = renderHeight + 'px';
//     document.body.appendChild(rootElement);

//     const renderer = new THREE.WebGLRenderer({
//       antialias: false,
//     });
//     renderer.setSize(renderWidth, renderHeight);
//     rootElement.appendChild(renderer.domElement);

//     const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
//     camera.position.copy(new THREE.Vector3().fromArray([-1, -4, 6]));
//     camera.up = new THREE.Vector3().fromArray([0, -1, -0.6]).normalize();
//     camera.lookAt(new THREE.Vector3().fromArray([0, 4, -0]));

//     const viewer = new GaussianSplats3D.Viewer({
//       selfDrivenMode: false,
//       renderer: renderer,
//       camera: camera,
//       useBuiltInControls: false,
//       ignoreDevicePixelRatio: false,
//       gpuAcceleratedSort: true,
//       enableSIMDInSort: true,
//       sharedMemoryForWorkers: true,
//       integerBasedSort: true,
//       halfPrecisionCovariancesOnGPU: true,
//       dynamicScene: false,
//       webXRMode: GaussianSplats3D.WebXRMode.None,
//       renderMode: GaussianSplats3D.RenderMode.OnChange,
//       sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
//       antialiased: false,
//       focalAdjustment: 1.0,
//       logLevel: GaussianSplats3D.LogLevel.None,
//       sphericalHarmonicsDegree: 0,
//       enableOptionalEffects: false,
//       inMemoryCompressionLevel: 2,
//       freeIntermediateSplatData: false,
//     });

//     viewer.addSplatScene('src\\splats\\truck.ksplat').then(() => {
//       const update = () => {
//         requestAnimationFrame(update);
//       };
//       update();
//     });

//     return () => {
//       document.body.removeChild(rootElement);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Gaussian Splats 3D Viewer</h1>
//       <p>Loading the 3D scene...</p>
//     </div>
//   );
// };

// export default App;



// import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
// import * as THREE from 'three';
// import { useEffect } from 'react';

// function App() {
//   useEffect(() => {
//     const viewer = new GaussianSplats3D.Viewer({
//       'cameraUp': [0.22545, -0.94844, -0.22277],
//       'useBuiltInControls': false,
//       'initialCameraPosition': [	1.14532, 0.90916, -0.64185],
//       'initialCameraLookAt': [	-0.33171, 0.95884, 0.78178]
//     });
//     viewer.addSplatScene('src\\splats\\truck.ksplat', {
//       'splatAlphaRemovalThreshold': 5,
//       'showLoadingUI': true,
//       'position': [0, 1, 0],
//       'rotation': [0, 0, 0, 1],
//       'scale': [1.5, 1.5, 1.5]
//     })
//     .then(() => {
//       viewer.start();
//     });
//   }, []);

// }

// export default App;