// web/src/engine/profiles/DefaultProfile.ts

// "User Zero" - A generic Projector profile for production testing.
// Anonymized data.
export const DEFAULT_PROFILE = {
    dob: "2000-01-01",
    time: "12:00",
    location: "UTC",
    type: "Projector" as const,
    activeGates: [63, 4, 17, 62, 48, 18, 5, 9, 11] // Logic dominance configuration
};
