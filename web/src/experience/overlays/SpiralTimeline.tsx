// web/src/experience/overlays/SpiralTimeline.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SpiralTimeline({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.Group>(null!);

  // Helix extrusion
  const points = [];
  const radius = 5;
  const height = 20;
  const loops = 5;
  const segments = 200;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * loops * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (t - 0.5) * height;
    points.push(new THREE.Vector3(x, y, z));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame((_state, delta) => {
    if (!visible || !ref.current) return;
    ref.current.rotation.y += delta * 0.1;
  });

  if (!visible) return null;

  return (
    <group ref={ref}>
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#00ffff", transparent: true, opacity: 0.5 }))} />
      {/* Beads/Nodes */}
      {points.filter((_, i) => i % 20 === 0).map((pt, i) => (
         <mesh key={i} position={pt}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="white" />
         </mesh>
      ))}
    </group>
  );
}
