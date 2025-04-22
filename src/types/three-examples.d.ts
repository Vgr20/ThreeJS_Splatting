declare module 'three/examples/jsm/controls/PointerLockControls' {
    import { Camera, EventDispatcher, Object3D } from 'three';
  
    export class PointerLockControls extends EventDispatcher {
      constructor(camera: Camera, domElement: HTMLElement);
      domElement: HTMLElement;
      isLocked: boolean;
      connect(): void;
      disconnect(): void;
      dispose(): void;
      getObject(): Object3D;
      lock(): void;
      unlock(): void;
    }
  }
  