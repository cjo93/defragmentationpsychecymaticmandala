// web/src/experience/overlays/GiftShadowCube.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

export function GiftShadowCube({ visible, value = 0.5 }: { visible: boolean, value?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (!visible || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    // Vector Slide Logic (Tri-Vector)
    // Flatten along X-Axis if Logic Dominant (Subject Alpha)
    // We assume a prop or context for 'vector' will be passed, but for now we mock Subject Alpha behavior
    // if a certain flag is set, or just use the slider to demonstrate the distortion principle.

    // Morph:
    // "Result: Cube slides heavily along X-Axis, flattening geometry into a plane"
    // We simulate this "Slide" by scaling X heavily and Y/Z lightly based on 'value' (Shadow/Entropy).

    const slideFactor = value; // 0 (Gift/Structure) -> 1 (Shadow/Entropy)

    // If Logic Dominant (Alpha), we flatten X.
    const scaleX = 1 + slideFactor * 2;
    const scaleY = 1 - slideFactor * 0.5;
    const scaleZ = 1 - slideFactor * 0.5;

    meshRef.current.scale.set(scaleX, scaleY, scaleZ);
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
