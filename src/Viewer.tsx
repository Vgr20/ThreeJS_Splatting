import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { useEffect } from 'react';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

function Viewer() {
  useEffect(() => {
    // Step 1: Initialize viewer
    const renderWidth = window.innerWidth;
    const renderHeight = window.innerHeight;
    const rootElement = document.createElement('div');
    rootElement.style.width = renderWidth + 'px';
    rootElement.style.height = renderHeight + 'px';
    document.body.appendChild(rootElement);

    const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
    camera.position.copy(new THREE.Vector3().fromArray([-0.15829, -0.08684, 0.94800]));
    camera.up = new THREE.Vector3().fromArray([0, 1,0]).normalize();
    camera.lookAt(new THREE.Vector3().fromArray([-1.36147, 0.01385, -1.93057]));
    
    const viewer = new GaussianSplats3D.Viewer({
      // cameraUp: [0, 1, 0],
      useBuiltInControls: false,
      // initialCameraPosition: [	-0.15829, -0.08684, 0.94800],
      // initialCameraLookAt: [-1.36147, 0.01385, -1.93057],
      camera: camera,
    });

    // Step 2: Scene load
    viewer
      .addSplatScene('src\\splats\\truck.ksplat', {
        splatAlphaRemovalThreshold: 5,
        showLoadingUI: true,
        
        position: [0, 0, 0],
        rotation: [1, 0, 0, 0],
        scale: [1, 1, 1],
      })
      .then(() => {
        const camera = viewer.camera;
        const domElement = viewer.renderer.domElement;

        // Step 3: Add PointerLockControls
        const controls = new PointerLockControls(camera, domElement);
        domElement.addEventListener('click', () => controls.lock());
        viewer.renderer.domElement.style.cursor = 'pointer';

        // Step 4: WASD Movement
        const keys: Record<string, boolean> = {};
        const velocity = new THREE.Vector3();
        const moveSpeed = 0.01;

        document.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
        document.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

        // Step 5: Animate loop using viewer.start()
        function animate() {
          if (controls.isLocked) {
            // const direction = new THREE.Vector3();
            const right = new THREE.Vector3();
            const forward = new THREE.Vector3();
            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            right.crossVectors(camera.up, forward).normalize();

            velocity.set(0, 0, 0);
            if (keys['w']) velocity.add(forward);
            if (keys['s']) velocity.sub(forward);
            if (keys['a']) velocity.add(right);
            if (keys['d']) velocity.sub(right);

            velocity.multiplyScalar(moveSpeed);
            controls.getObject().position.add(velocity);
          }

          requestAnimationFrame(animate);
        }

        animate();
        requestAnimationFrame(function update() {
          viewer.update();
          viewer.render();
          requestAnimationFrame(update);
        });
      });
  }, []);

  return null;
}

export default Viewer;
