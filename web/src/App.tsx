// web/src/App.tsx
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { EntrySequence } from './experience/EntrySequence';
import * as THREE from 'three';
import { TheFloor } from './experience/TheFloor';
import { Leva } from 'leva';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      <Leva collapsed hidden={false} /> {/* For dev controls */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: '#000000' }}
        gl={{ antialias: false, toneMappingExposure: 1.5 }}
      >
        <Suspense fallback={null}>
          {!hasEntered ? (
            <EntrySequence onComplete={() => setHasEntered(true)} />
          ) : (
            <TheFloor visible={true} />
          )}

          {/* Global Environment */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Post Processing for "Void Aesthetic" (v1.4 Spec) */}
          <EffectComposer enabled={true} autoClear={false}>
            {/* High-Gain Halation */}
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
            {/* The Noise Floor (Zero Point Field) */}
            <Noise opacity={0.05} />
            {/* Lens Stress / Analog Simulation */}
            <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} radialModulation={false} modulationOffset={0} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>

        {/* Controls only active on Floor usually, but for debug allowed everywhere */}
        {hasEntered && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />}
      </Canvas>

      {/* Overlay UI (HTML) */}
      <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'cyan', fontFamily: 'monospace', opacity: 0.5 }}>
        DEFRAG v3.0 // {hasEntered ? "FLOOR_ACTIVE" : "ENTRY_SEQUENCE"}
      </div>
    </>
  );
}

export default App;
