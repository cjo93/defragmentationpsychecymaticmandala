// web/src/engine/StateEngine.ts
import { calculatePhysicsState, type WaveformType } from './physics/Waveforms';
import { DEFAULT_PROFILE } from './profiles/DefaultProfile';
import { SEMANTICS } from '../config/Semantics';

export interface DefragState {
  coherence: number; // 0.0 - 1.0 (Calm vs Erratic)
  energy: number;    // 0.0 - 1.0 (Parked vs High Velocity)
  tension: number;   // 0.0 - 1.0 (Intensity)
  color: string;     // Hex color (Base Cyan)
  archetype: string;
  glyphSeed: number; // Seed for the mandala geometry
  // New Physics Props
  waveform: WaveformType;
  waveformLabel: string; // v5.0 Semantics
  vector: [number, number, number];
}

// Deterministic hash function
const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const calculateState = (dob: string, location: string, _currentTime: number): DefragState => {
  // 1. Astrometry Layer
  // For the prototype, we use the Default Profile logic to demonstrate the engine.
  // In production, this would parse the actual DOB/Location inputs.
  const physicsState = calculatePhysicsState(DEFAULT_PROFILE.activeGates, DEFAULT_PROFILE.type);

  // 2. Derive Standard Props from Physics
  const coherence = physicsState.vector[0]; // Logic = Coherence/Structure
  const energy = physicsState.vector[1]; // Tribal = Energy/Support (Mock mapping)

  // v5.0 Entropy Formula
  // Entropy = (Transit_Load * 0.4) + (Biometric_Instability * 0.4) + (Cognitive_Dissonance * 0.2)
  // Mock values for prototype (0.0 - 1.0)
  const transitLoad = 0.5; // Moderate cosmic weather
  const biometricInstability = 0.2; // Calm
  const cognitiveDissonance = physicsState.entropy; // Derived from "Not-Self" physics

  const entropyScore = (transitLoad * 0.4) + (biometricInstability * 0.4) + (cognitiveDissonance * 0.2);
  const tension = entropyScore;

  // Color Logic (Cyan = Logic)
  const logicScore = physicsState.vector[0];
  const saturation = Math.floor(logicScore * 100);
  const lightness = 50;
  const color = `hsl(180, ${saturation}%, ${lightness}%)`;

  const seed = cyrb53(`${dob}-${location}`);

  // Map Waveform to v5.0 Semantics
  const waveformLabel = SEMANTICS.waveform_types[physicsState.waveform === 'Soliton' ? 'Projector' : 'Generator'] || "Unknown";

  return {
    coherence,
    energy,
    tension,
    color,
    archetype: "Projector Archetype",
    glyphSeed: seed,
    waveform: physicsState.waveform,
    waveformLabel,
    vector: physicsState.vector
  };
};
