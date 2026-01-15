// web/src/experience/TheFloor.tsx
import { useState } from 'react';
import { Tile } from './floor/Tile';
import { CameraRig } from './floor/CameraRig';
import { NatalOverlay } from './overlays/NatalOverlay';
import { GiftShadowCube } from './overlays/GiftShadowCube';
import { FamilyOverlay } from './overlays/FamilyOverlay';
import { SpiralTimeline } from './overlays/SpiralTimeline';
import { Html } from '@react-three/drei';

export function TheFloor({ visible }: { visible: boolean }) {
  const [viewMode, setViewMode] = useState<'floor' | 'vortex' | 'spiral'>('floor');
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'natal' | 'cube' | 'family' | 'timeline'>('none');

  if (!visible) return null;

  const handleTileClick = (seed: string) => {
    setSelectedTile(seed);
    // Default to Natal on click
    if (activeOverlay === 'none') setActiveOverlay('natal');
  };

  // Generate a grid of tiles
  const gridSize = 10;
  const tiles = [];
  for (let x = -gridSize / 2; x < gridSize / 2; x++) {
    for (let y = -gridSize / 2; y < gridSize / 2; y++) {
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

      {/* Overlays - Positioned relative to camera or center */}
      <NatalOverlay visible={activeOverlay === 'natal'} />
      <GiftShadowCube visible={activeOverlay === 'cube'} value={0.5} />
      <FamilyOverlay visible={activeOverlay === 'family'} />
      <SpiralTimeline visible={activeOverlay === 'timeline'} />

      {/* Mock UI Controls for Prototype */}
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
             <span className="text-xs font-mono animate-pulse">SELECT A TILE TO INTERACT</span>
          )}
        </div>
      </Html>
    </>
  );
}
