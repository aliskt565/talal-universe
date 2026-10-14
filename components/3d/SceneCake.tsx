'use client';

import React from 'react';
import { CakeMesh } from './CakeMesh';

interface SceneCakeProps {
  onCelebrate?: () => void;
}

export const SceneCake: React.FC<SceneCakeProps> = ({
  onCelebrate,
}) => {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Warm Ambient Celebration Lighting */}
      <ambientLight intensity={0.5} color="#290715" />
      <directionalLight position={[4, 8, 4]} intensity={1.8} color="#fff1d0" castShadow />
      <pointLight position={[0, 4, 3]} color="#ffaa33" intensity={2.8} distance={12} />

      {/* Main 3D Birthday Cake */}
      <CakeMesh scale={1.1} position={[0, -0.2, 0]} />

      {/* Glowing Warm Ground Reflection Disc */}
      <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.5, 36]} />
        <meshStandardMaterial
          color="#14040b"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};
