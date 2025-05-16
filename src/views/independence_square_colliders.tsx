// src/physics/colliders.ts
import * as THREE from "three";
import * as CANNON from "cannon-es";

export interface ColliderDefinition {
  mesh: THREE.Mesh;
  body: CANNON.Body;
}

export function createBoxColliders(): ColliderDefinition[] {
  const colliders: ColliderDefinition[] = [];

  const definitions = [
    {
      size: new THREE.Vector3(1.3, 0.5, 12),
      position: new THREE.Vector3(0, -0.3, -1),
      rotation: new THREE.Euler(0, 0, 0),
      color: 0xff0000,
    },
    {
      size: new THREE.Vector3(0.5, 0.5, 14),
      position: new THREE.Vector3(1.5, -0.3, -1),
      rotation: new THREE.Euler(0, 0, 0),
      color: 0x00ff00,
    },
    {
      size: new THREE.Vector3(0.5, 0.5, 14),
      position: new THREE.Vector3(-1.5, -0.3, -1),
      rotation: new THREE.Euler(0, 0, 0),
      color: 0x00ff00,
    },
    {
      size: new THREE.Vector3(6, 0.5, 0.5),
      position: new THREE.Vector3(0, -0.3, -6),
      rotation: new THREE.Euler(0, 0, 0),
      color: 0x0000ff,
    },
    {
      size: new THREE.Vector3(6, 0.2, 0.2),
      position: new THREE.Vector3(0, -0.3, 6),
      rotation: new THREE.Euler(0, 0, 0),
      color: 0x0000ff,
    }

    // Add more here as needed
  ];

  for (const def of definitions) {
    // Mesh (Three.js)
    const geometry = new THREE.BoxGeometry(def.size.x, def.size.y, def.size.z);
    const material = new THREE.MeshStandardMaterial({ color: def.color, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(def.position);
    mesh.rotation.copy(def.rotation);
    mesh.updateMatrixWorld();
    mesh.visible = false;

    // Physics body (Cannon-es)
    const shape = new CANNON.Box(
      new CANNON.Vec3(def.size.x / 2, def.size.y / 2, def.size.z / 2)
    );
    const body = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(def.position.x, def.position.y, def.position.z),
    });
    const quaternion = new CANNON.Quaternion();
    quaternion.setFromEuler(def.rotation.x, def.rotation.y, def.rotation.z);
    body.quaternion.copy(quaternion);
    body.addShape(shape);

    colliders.push({ mesh, body });
  }

  return colliders;
}
