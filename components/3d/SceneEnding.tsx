'use client';

import React from 'react';
import { HeartMesh } from './HeartMesh';

export const SceneEnding: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Golden Warm Cinematic Lighting */}
      <ambientLight intensity={0.6} color="#38091f" />
      <pointLight position={[0, 3, 3]} color="#ffb833" intensity={3.5} distance={15} />
      <pointLight position={[-4, -1, 0]} color="#b80033" intensity={2.5} distance={12} />
      <pointLight position={[4, -1, 0]} color="#d4af37" intensity={2.5} distance={12} />

      {/* Radiant Finale Heart */}
      <HeartMesh
        scale={2.4}
        position={[0, 0.2, 0]}
        color="#c70039"
        emissiveColor="#590018"
      />

      {/* Concentric Golden Halo Rings */}
      <mesh position={[0, 0.2, -0.8]}>
        <torusGeometry args={[3.6, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0, 0.2, -1.2]}>
        <torusGeometry args={[4.8, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#f3e5ab"
          emissive="#f3e5ab"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};
