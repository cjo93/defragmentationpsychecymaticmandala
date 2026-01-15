// web/src/experience/overlays/GiftShadowCube.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

export function GiftShadowCube({ visible, value = 0.5 }: { visible: boolean, value?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!visible || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    // Morph geometry based on "Gift vs Shadow" slider (value)
    // 0 = Gift (Perfect Cube), 1 = Shadow (Distorted)
    // Minimal distortion implementation for prototype
    const scale = 1 + (value * 0.5 * Math.sin(state.clock.elapsedTime));
    meshRef.current.scale.set(scale, scale, scale);
  });

  if (!visible) return null;

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial transparent opacity={0} />
      <Edges color={value > 0.5 ? "#555" : "#fff"} />

      {/* Internal Axis */}
      <mesh position={[0, 0, 0]}>
         <sphereGeometry args={[0.1, 8, 8]} />
         <meshBasicMaterial color="#00ffff" />
      </mesh>
    </mesh>
  );
}
