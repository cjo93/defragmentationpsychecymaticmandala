// web/src/experience/entry/Spring.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Spring({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.Line>(null!);

  // Create spiral geometry
  const points = [];
  const loops = 10;
  const height = 10;
  const radius = 2;
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
    ref.current.rotation.y += delta * 0.5;
  });

  if (!visible) return null;

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#00ffff", opacity: 0.6, transparent: true }))} ref={ref} />
  );
}
