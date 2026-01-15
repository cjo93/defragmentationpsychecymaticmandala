// web/src/experience/overlays/FamilyOverlay.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Ring } from '@react-three/drei';
import * as THREE from 'three';

export function FamilyOverlay({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_state, delta) => {
    if (!visible || !groupRef.current) return;
    // Rotate rings at different speeds to simulate "system dynamics"
    groupRef.current.children.forEach((child, i) => {
        child.rotation.z += delta * (0.05 + i * 0.02) * (i % 2 === 0 ? 1 : -1);
    });
  });

  if (!visible) return null;

  // System Rings: Self, Parents, Lineage
  const rings = [3, 4.5, 6];

  return (
    <group ref={groupRef} rotation={[Math.PI/4, 0, 0]}>
      {rings.map((radius, i) => (
        <Ring key={i} args={[radius, radius + 0.05, 64]} renderOrder={i}>
           <meshBasicMaterial
             color="#00ffff"
             transparent
             opacity={0.5 - (i * 0.1)}
             side={THREE.DoubleSide}
           />
           {/* Dashed line effect simulation via texture or multiple segments would be better,
               but for prototype simple rings work */}
        </Ring>
      ))}
      {/* Nodes representing family members */}
      <mesh position={[3, 0, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="white" />
      </mesh>
       <mesh position={[-4.5, 0, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}
