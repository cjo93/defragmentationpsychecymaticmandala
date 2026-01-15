// web/src/experience/TheFloor.tsx
import { useState, useEffect } from 'react';
import { Tile } from './floor/Tile';
import { CameraRig } from './floor/CameraRig';
import { NatalOverlay } from './overlays/NatalOverlay';
import { GiftShadowCube } from './overlays/GiftShadowCube';
import { FamilyOverlay } from './overlays/FamilyOverlay';
import { SpiralTimeline } from './overlays/SpiralTimeline';
import { Html } from '@react-three/drei';

type Stratum = 'A' | 'B' | 'C'; // Individual | Penta | Collective

export function TheFloor({ visible }: { visible: boolean }) {
  const [viewMode, setViewMode] = useState<'floor' | 'vortex' | 'spiral'>('floor');
  const [stratum, setStratum] = useState<Stratum>('C'); // Default to Collective
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'natal' | 'cube' | 'family' | 'timeline'>('none');

  if (!visible) return null;

  // Semantic Zoom (Scroll) Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
        if (e.deltaY < -50) {
            // Scroll Up -> Zoom In (C -> B -> A)
            setStratum(prev => prev === 'C' ? 'B' : 'A');
        } else if (e.deltaY > 50) {
            // Scroll Down -> Zoom Out (A -> B -> C)
            setStratum(prev => prev === 'A' ? 'B' : 'C');
        }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleTileClick = (seed: string) => {
    setSelectedTile(seed);
    // If we click a tile in C/B, zoom to A? For now just select.
    if (activeOverlay === 'none') setActiveOverlay('natal');
  };

  // Stratum Rendering Logic
  // A: Single Tile (0,0)
  // B: 3x3 Grid (-1 to 1)
  // C: 10x10 Grid (-5 to 5) (Infinite approximation)

  const renderRange = stratum === 'A' ? 0 : (stratum === 'B' ? 1 : 5);
  const tiles = [];

  for (let x = -renderRange; x <= renderRange; x++) {
    for (let y = -renderRange; y <= renderRange; y++) {
        // In Stratum A, only 0,0
        if (stratum === 'A' && (x !== 0 || y !== 0)) continue;

        tiles.push(
            <Tile
                key={`${x}-${y}`}
                position={[x, y, 0]}
                seed={`user-${x}-${y}`}
                onClick={handleTileClick}
            />
        );
    }
  }

  return (
    <>
      <CameraRig mode={viewMode} />

      {/* The Floor Grid */}
      <group visible={activeOverlay === 'none' || activeOverlay === 'family'}>
        {tiles}
      </group>

      {/* Overlays */}
      <NatalOverlay visible={activeOverlay === 'natal'} />
      <GiftShadowCube visible={activeOverlay === 'cube'} value={0.5} />
      <FamilyOverlay visible={activeOverlay === 'family'} />
      <SpiralTimeline visible={activeOverlay === 'timeline'} />

      {/* UI Stratum Indicator */}
      <Html position={[0, 4, 0]} center zIndexRange={[100, 0]}>
         <div className="text-xs font-mono text-cyan-500 opacity-70 tracking-widest">
            STRATUM: {stratum} // {stratum === 'A' ? 'INDIVIDUAL' : stratum === 'B' ? 'PENTA' : 'COLLECTIVE'}
         </div>
      </Html>

      {/* Controls */}
      <Html position={[0, -5, 0]} center zIndexRange={[100, 0]}>
        <div className="flex gap-2 p-4 bg-black/80 text-cyan-400 border border-cyan-900 rounded-lg pointer-events-auto">
          {selectedTile ? (
             <>
               <span className="mr-4 text-xs font-mono opacity-50">TILE: {selectedTile}</span>
               <button onClick={() => setActiveOverlay('natal')} className={activeOverlay === 'natal' ? 'font-bold' : 'opacity-50'}>NATAL</button>
               <button onClick={() => setActiveOverlay('cube')} className={activeOverlay === 'cube' ? 'font-bold' : 'opacity-50'}>CUBE</button>
               <button onClick={() => setActiveOverlay('family')} className={activeOverlay === 'family' ? 'font-bold' : 'opacity-50'}>FAMILY</button>
               <button onClick={() => { setActiveOverlay('timeline'); setViewMode('spiral'); }} className={activeOverlay === 'timeline' ? 'font-bold' : 'opacity-50'}>TIME</button>
               <button onClick={() => { setActiveOverlay('none'); setViewMode('floor'); setSelectedTile(null); }} className="text-white ml-2">X</button>
             </>
          ) : (
             <span className="text-xs font-mono animate-pulse">SCROLL TO ZOOM STRATA // CLICK TILE</span>
          )}
        </div>
      </Html>
    </>
  );
}
