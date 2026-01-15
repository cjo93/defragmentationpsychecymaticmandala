// web/src/experience/EntrySequence.tsx
import { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Void } from './entry/Void';
import { OnionWheel } from './entry/OnionWheel';
import { Spring } from './entry/Spring';
import { CymaticMandala } from './entry/CymaticMandala';
import { calculateState, type DefragState } from '../engine/StateEngine';
import * as THREE from 'three';

// Simulation of input data for the prototype
const MOCK_USER = {
    dob: "1990-01-01",
    location: "Unknown",
    time: Date.now()
};

export function EntrySequence({ onComplete }: { onComplete: () => void }) {
    const { camera } = useThree();
    const [stage, setStage] = useState<'void' | 'onion' | 'spring' | 'axis' | 'mandala' | 'snap'>('void');
    const [userState] = useState<DefragState>(() => calculateState(MOCK_USER.dob, MOCK_USER.location, MOCK_USER.time));

    useEffect(() => {
        // Sequence Timeline
        const times = {
            void: 0,
            onion: 2000,
            spring: 5000,
            axis: 8000,
            mandala: 12000,
            snap: 15000,
            floor: 18000
        };

        const schedule = (s: any, t: number) => setTimeout(() => setStage(s), t);

        schedule('onion', times.onion);
        schedule('spring', times.spring);
        schedule('axis', times.axis);
        schedule('mandala', times.mandala);
        schedule('snap', times.snap);
        setTimeout(onComplete, times.floor);

    }, [onComplete]);

    useFrame((_state, _delta) => {
        // Camera choreography
        if (stage === 'onion') {
            camera.position.lerp(new THREE.Vector3(0, 0, 10), 0.05);
        } else if (stage === 'spring') {
            camera.position.lerp(new THREE.Vector3(0, 5, 10), 0.05);
        } else if (stage === 'axis') {
            // "Fly down Axis Mundi"
            camera.position.lerp(new THREE.Vector3(0, -10, 2), 0.02);
            camera.lookAt(0, -20, 0);
        } else if (stage === 'mandala' || stage === 'snap') {
            camera.position.lerp(new THREE.Vector3(0, 0, 5), 0.05);
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            <Void />
            <OnionWheel visible={stage === 'onion' || stage === 'spring'} />
            <Spring visible={stage === 'spring' || stage === 'axis'} />
            <CymaticMandala visible={stage === 'mandala' || stage === 'snap'} snapped={stage === 'snap'} state={userState} />
        </>
    );
}
