// web/src/experience/overlays/NatalOverlay.tsx
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export function NatalOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;

  // Simple geometric representation of aspects (Trine, Square, etc.)
  // Triangle
  const points = [
    new THREE.Vector3(2, 2, 0),
    new THREE.Vector3(-2, 2, 0),
    new THREE.Vector3(0, -2, 0),
    new THREE.Vector3(2, 2, 0)
  ];

  return (
    <group position={[0, 0, 1]}>
      <Line points={points} color="white" lineWidth={1} dashed dashScale={2} />
      {/* Connecting lines simulating relationship mesh */}
      <Line points={[new THREE.Vector3(0,0,0), new THREE.Vector3(2,2,0)]} color="#00ffff" lineWidth={1} />
      <Line points={[new THREE.Vector3(0,0,0), new THREE.Vector3(-2,2,0)]} color="#00ffff" lineWidth={1} />
      <Line points={[new THREE.Vector3(0,0,0), new THREE.Vector3(0,-2,0)]} color="#00ffff" lineWidth={1} />
    </group>
  );
}
