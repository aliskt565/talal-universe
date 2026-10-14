'use client';

import React from 'react';
import { EnvelopeMesh } from './EnvelopeMesh';

interface SceneLetterProps {
  isEnvelopeOpen: boolean;
  onOpenEnvelope: () => void;
}

export const SceneLetter: React.FC<SceneLetterProps> = ({
  isEnvelopeOpen,
  onOpenEnvelope,
}) => {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Warm Intimate Letter Room Lighting */}
      <ambientLight intensity={0.45} color="#2b0a1a" />
      <directionalLight position={[-3, 6, 4]} intensity={1.6} color="#ffe8cc" />
      <pointLight position={[0, 2, 2]} color="#ffddaa" intensity={2.2} distance={10} />

      {/* 3D Envelope with Wax Seal and Hinged Flap */}
      <EnvelopeMesh
        isOpen={isEnvelopeOpen}
        onClick={onOpenEnvelope}
        scale={1.3}
        position={[0, 0, 0]}
      />
    </group>
  );
};
