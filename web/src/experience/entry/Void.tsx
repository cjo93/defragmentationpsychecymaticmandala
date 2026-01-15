// web/src/experience/entry/Void.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function Void() {
  // Simple starfield/dust to give depth to the void
  const count = 2000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  const ref = useRef<THREE.Points>(null!);

  useFrame((_state, delta) => {
    ref.current.rotation.x -= delta / 50;
    ref.current.rotation.y -= delta / 60;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#1a1a1a" // Very subtle grey, barely visible against black
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
