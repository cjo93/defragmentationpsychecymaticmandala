// web/src/experience/entry/CymaticMandala.tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { DefragState } from '../../engine/StateEngine';

interface CymaticMandalaProps {
  visible: boolean;
  snapped: boolean; // True when "snapped into form"
  state: DefragState;
}

export function CymaticMandala({ visible, snapped, state }: CymaticMandalaProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Create a particle system for the mandala
  const particleCount = 200;

  // Calculate target positions based on state/seed (Lissajous or Radial)
  const targetPositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < particleCount; i++) {
        const theta = (i / particleCount) * Math.PI * 2;
        // Symmetry based on glyphSeed
        const k = (state.glyphSeed % 7) + 2; // 2 to 9 fold symmetry
        const r = 2 + Math.cos(k * theta) * 0.5;
        pos.push({
            x: r * Math.cos(theta),
            y: r * Math.sin(theta),
            z: 0
        });
    }
    return pos;
  }, [state]);

  useFrame((threeState, delta) => {
    if (!visible || !groupRef.current) return;

    // Animate particles
    groupRef.current.children.forEach((child, i) => {
        const target = targetPositions[i];
        if (snapped) {
            // Tight snap
            child.position.lerp(new THREE.Vector3(target.x, target.y, target.z), 0.1);
        } else {
            // Loose/Chaotic
            const noise = Math.sin(threeState.clock.elapsedTime * 2 + i) * 0.2;
            child.position.lerp(new THREE.Vector3(target.x + noise, target.y + noise, target.z), 0.02);
        }
    });

    if (snapped) {
        groupRef.current.rotation.z += delta * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {targetPositions.map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
           <sphereGeometry args={[0.05, 8, 8]} />
           <meshStandardMaterial
             color={state.color}
             emissive={state.color}
             emissiveIntensity={snapped ? 2 : 0.5}
           />
        </mesh>
      ))}
    </group>
  );
}
