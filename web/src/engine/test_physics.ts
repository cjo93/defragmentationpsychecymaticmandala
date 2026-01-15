// web/src/engine/test_physics.ts
import { calculateState } from './StateEngine';
import { DEFAULT_PROFILE } from './profiles/DefaultProfile';

const state = calculateState(DEFAULT_PROFILE.dob, DEFAULT_PROFILE.location, Date.now());

console.log("User Zero Physics State:");
console.log("Waveform:", state.waveform);
console.log("Vector:", state.vector);
console.log("Coherence:", state.coherence);

if (state.waveform === 'Soliton') {
    console.log("SUCCESS: Waveform is Soliton (Projector/Focused Beam)");
} else {
    console.log("FAILURE: Waveform mismatch");
}

if (state.vector[0] > state.vector[1]) {
    console.log("SUCCESS: Logic (Vector[0]) is dominant (Tri-Vector X-Axis slide)");
} else {
    console.log("FAILURE: Logic not dominant");
}
