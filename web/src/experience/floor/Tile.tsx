// web/src/experience/floor/Tile.tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { calculateState } from '../../engine/StateEngine';
import * as THREE from 'three';

interface TileProps {
  position: [number, number, number];
  seed: string; // "UserID" or similar to generate unique mandala
  onClick: (seed: string) => void;
}

export function Tile({ position, seed, onClick }: TileProps) {
  // Compute state for this tile (mocking other users)
  // In real app, this comes from backend.
  const tileState = calculateState(seed, "Floor", Date.now());

  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    // Idle animation based on energy
    meshRef.current.rotation.z += 0.001 + (tileState.energy * 0.01);

    // Scale on hover
    const scale = hovered ? 1.1 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(seed); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[0.9, 0.9]} />
      <meshBasicMaterial
        color={tileState.color}
        wireframe
        transparent
        opacity={hovered ? 0.8 : 0.3}
      />
      {/*
         In a polished version, this would be a ShaderMaterial rendering the actual mandala geometry
         instead of a simple wireframe plane.
         For prototype, we use the color to represent state.
      */}
    </mesh>
  );
}
