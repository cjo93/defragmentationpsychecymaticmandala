// web/src/engine/StateEngine.ts

export interface DefragState {
  coherence: number; // 0.0 - 1.0 (Calm vs Erratic)
  energy: number;    // 0.0 - 1.0 (Parked vs High Velocity)
  tension: number;   // 0.0 - 1.0 (Intensity)
  color: string;     // Hex color (Base Cyan)
  archetype: string; // "Giant", "Wolf", "Woods", "Clock", "Sleeper", "Goldilocks", "Imp", "Shell", "Shoes", "Cyclone", "Piper", "Duckling"
  glyphSeed: number; // Seed for the mandala geometry
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

const ARCHETYPES = [
  "Giant", "Wolf", "Woods", "Clock", "Sleeper",
  "Goldilocks", "Imp", "Shell", "Shoes", "Cyclone", "Piper", "Duckling"
];

export const calculateState = (dob: string, location: string, currentTime: number): DefragState => {
  // Combine inputs into a seed string
  // Note: In a real engine, we would use astrological calculations here.
  // For the prototype, we use a deterministic hash of the inputs.
  const inputString = `${dob}-${location}-${Math.floor(currentTime / 60000)}`; // Updates every minute
  const seed = cyrb53(inputString);

  // Derive parameters
  // Ensure we operate on positive integers
  const safeSeed = Math.abs(seed);

  // Coherence: Higher is calmer. Derived from the "stability" of the hash (mocked)
  const coherence = (safeSeed % 100) / 100;

  // Energy: Derived from another slice
  const energy = (Math.floor(safeSeed / 4) % 100) / 100;

  // Tension: Inverse of coherence often, or independent
  const tension = (Math.floor(safeSeed / 16) % 100) / 100;

  // Archetype selection
  const archetypeIndex = safeSeed % ARCHETYPES.length;

  // Color Logic: Cyan intensity based on Coherence
  // Calm (High Coherence) -> High Cyan
  // Erratic (Low Coherence) -> Low Cyan (closer to grey/white)
  // We use HSL for easier manipulation. Hue = 180 (Cyan).
  // Saturation: Coherence * 100%
  // Lightness: 50% + (Energy * 10%)
  const saturation = Math.floor(coherence * 100);
  const lightness = 50 + Math.floor(energy * 20); // 50-70%
  const color = `hsl(180, ${saturation}%, ${lightness}%)`;

  return {
    coherence,
    energy,
    tension,
    color,
    archetype: ARCHETYPES[archetypeIndex],
    glyphSeed: seed
  };
};
