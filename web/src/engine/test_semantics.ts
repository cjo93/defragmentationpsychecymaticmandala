// web/src/engine/test_semantics.ts
import { calculateState } from './StateEngine';
import { DEFAULT_PROFILE } from './profiles/DefaultProfile';
import { SEMANTICS } from '../config/Semantics';

const state = calculateState(DEFAULT_PROFILE.dob, DEFAULT_PROFILE.location, Date.now());

console.log("--- v5.0 Semantics Verification ---");
console.log("Waveform (Physics):", state.waveform);
console.log("Waveform Label (Semantic):", state.waveformLabel);
console.log("Entropy/Tension Score:", state.tension);

if (state.waveformLabel === SEMANTICS.waveform_types.Projector) {
    console.log("SUCCESS: Semantic Label matches Projector (Vector Beam)");
} else {
    console.log(`FAILURE: Expected ${SEMANTICS.waveform_types.Projector}, got ${state.waveformLabel}`);
}

if (state.tension > 0) {
    console.log("SUCCESS: Entropy Score Calculated");
} else {
    console.log("FAILURE: Entropy Score is 0");
}
