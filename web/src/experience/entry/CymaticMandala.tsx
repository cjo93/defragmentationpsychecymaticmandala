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
        // Soliton vs Sine Wave Logic
        if (snapped) {
            // Tight snap
            child.position.lerp(new THREE.Vector3(target.x, target.y, target.z), 0.1);
        } else {
            let noiseX = 0, noiseY = 0, noiseZ = 0;
            const time = threeState.clock.elapsedTime;

            if (state.waveform === 'Soliton') {
                 // Soliton: Focused Beam / Pulse (Non-dispersing)
                 // Particles move in a synchronized, tight pulse along the radius or Z-axis
                 const pulse = Math.exp(-Math.pow((i / particleCount - 0.5) * 10 - (time % 5), 2)); // Gaussian pulse
                 noiseZ = pulse * 2;
                 // Minimal X/Y scatter (High coherence)
                 noiseX = Math.sin(time * 5 + i) * 0.02;
                 noiseY = Math.cos(time * 5 + i) * 0.02;
            } else {
                 // Sine/Generator: Enveloping / Breathing
                 const wave = Math.sin(time * 2 + i * 0.5);
                 noiseX = wave * 0.2;
                 noiseY = wave * 0.2;
            }

            child.position.lerp(new THREE.Vector3(target.x + noiseX, target.y + noiseY, target.z + noiseZ), 0.1);
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
