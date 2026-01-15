// web/src/engine/physics/Astrometry.ts
import * as Astronomy from 'astronomy-engine';

export interface PlanetaryPosition {
    longitude: number; // 0-360
    latitude: number;
    distance: number; // AU
}

export function calculateKeplerianPosition(date: Date, body: Astronomy.Body = Astronomy.Body.Sun): PlanetaryPosition {
    const observer = new Astronomy.Observer(0, 0, 0); // Geocentric for simplicity/archetype
    const equator = Astronomy.Equator(body, date, observer, true, true);
    const ecliptic = Astronomy.Ecliptic(equator.vec);

    return {
        longitude: ecliptic.elon,
        latitude: ecliptic.elat,
        distance: ecliptic.vec.Length()
    };
}

// The "Design" calculation: Regress 88 degrees
export function solarArcRegression(longitude: number): number {
    let designLon = longitude - 88;
    if (designLon < 0) designLon += 360;
    return designLon;
}
