// web/src/engine/physics/Waveforms.ts
import { getCircuitry } from './Hexagrams';

export type WaveformType = 'Sine' | 'Soliton'; // Generator vs Projector

export interface PhysicsState {
    waveform: WaveformType;
    vector: [number, number, number]; // x (Logic), y (Tribal), z (Individual/Abstract)
    entropy: number;
}

export function calculatePhysicsState(gates: number[], type: 'Projector' | 'Generator' | 'Manifestor' | 'Reflector'): PhysicsState {
    // 1. Signature Waveform
    const waveform: WaveformType = (type === 'Projector') ? 'Soliton' : 'Sine';

    // 2. Vector State (Circuitry Balance)
    const circuitry = getCircuitry(gates);

    // Map Logic -> X, Tribal -> Y, Individual -> Z
    // Normalize vector
    const vec: [number, number, number] = [circuitry.logic, circuitry.tribal, circuitry.individual];
    const len = Math.sqrt(vec[0]**2 + vec[1]**2 + vec[2]**2) || 1;
    const normalizedVector: [number, number, number] = [vec[0]/len, vec[1]/len, vec[2]/len];

    // 3. Entropy (Mocked based on "Not-Self")
    // For Subject Alpha (Chad), entropy is minimized (Syntropy) when following strategy.
    // We'll calculate mock entropy based on randomness for now.
    const entropy = 0.1;

    return {
        waveform,
        vector: normalizedVector,
        entropy
    };
}
