// web/src/experience/entry/OnionWheel.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

export function OnionWheel({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_state, delta) => {
    if (!visible) return;
    // Rotate rings slowly
    if (groupRef.current) {
        groupRef.current.children.forEach((child, i) => {
            child.rotation.x += delta * (0.1 + i * 0.05) * (i % 2 === 0 ? 1 : -1);
            child.rotation.y += delta * 0.1;
        });
    }
  });

  if (!visible) return null;

  const rings = [2, 3, 4, 5]; // Radii

  return (
    <group ref={groupRef}>
      {rings.map((radius, i) => (
        <Torus key={i} args={[radius, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#004444"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3 + (i * 0.1)}
            wireframe={false}
          />
        </Torus>
      ))}
    </group>
  );
}
