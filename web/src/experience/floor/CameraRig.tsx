// web/src/experience/floor/CameraRig.tsx
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig({ mode }: { mode: 'floor' | 'vortex' | 'spiral' }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, -5, 10));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (mode === 'floor') {
        targetPos.current.set(0, -5, 10);
        targetLook.current.set(0, 5, 0);
    } else if (mode === 'vortex') {
        targetPos.current.set(0, 0, 20);
        targetLook.current.set(0, 0, 0);
    } else if (mode === 'spiral') {
        targetPos.current.set(20, 0, 5);
        targetLook.current.set(0, 0, 0);
    }
  }, [mode]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.05);
    // Smooth lookAt is harder without controls, but for now just lerp position
    // and re-orient.
    camera.lookAt(targetLook.current);
  });

  return null;
}
