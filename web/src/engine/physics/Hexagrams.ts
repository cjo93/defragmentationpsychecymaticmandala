// web/src/engine/physics/Hexagrams.ts

// 64 Gates mapped around the 360 degree wheel.
// For prototype, we use a simplified uniform mapping (360 / 64 = 5.625 deg per gate).
// In reality, the Mandala is specific. We'll simulate the mapping.

export function getHexagramIndex(longitude: number): number {
    // 0 Aries starts at Gate 25 in Human Design, roughly.
    // The "Rave Mandala" starts Gate 41 at approx 302 deg (Aquarius).
    // We will use a simplified mock mapping for the prototype engine to deterministically return a Gate.
    // Gate = floor(longitude / (360/64)) + Offset

    // We'll just return the 0-63 index based on longitude for now.
    // The user's spec focuses on the *concept* of the Index.
    const gateArc = 360 / 64;
    const index = Math.floor(longitude / gateArc);
    return index + 1; // 1-64
}

// Check if a gate is part of the "Logic" circuitry (Collective)
// Partial list of Logic gates: 63, 4, 17, 62, 48, 18, etc.
const LOGIC_GATES = [4, 7, 9, 15, 17, 18, 31, 48, 52, 58, 62, 63];
const TRIBAL_GATES = [6, 19, 21, 26, 27, 37, 40, 44, 45, 49, 50, 59];

export function getCircuitry(gates: number[]) {
    let logic = 0;
    let tribal = 0;
    let individual = 0; // Abstract/Individual lumped for now

    gates.forEach(g => {
        if (LOGIC_GATES.includes(g)) logic++;
        else if (TRIBAL_GATES.includes(g)) tribal++;
        else individual++;
    });

    const total = gates.length || 1;
    return {
        logic: logic / total,
        tribal: tribal / total,
        individual: individual / total
    };
}
