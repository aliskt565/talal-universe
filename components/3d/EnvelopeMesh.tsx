'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface EnvelopeMeshProps {
  isOpen: boolean;
  onClick?: () => void;
  scale?: number;
  position?: [number, number, number];
}

export const EnvelopeMesh: React.FC<EnvelopeMeshProps> = ({
  isOpen,
  onClick,
  scale = 1,
  position = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const letterRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle breathing float when waiting
    if (!isOpen) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
    }

    // Animate flap opening (rotation on top hinge)
    if (flapRef.current) {
      const targetFlapRot = isOpen ? -Math.PI * 0.85 : 0;
      flapRef.current.rotation.x = THREE.MathUtils.lerp(
        flapRef.current.rotation.x,
        targetFlapRot,
        delta * 4
      );
    }

    // Animate letter sliding upward out of the envelope
    if (letterRef.current) {
      const targetLetterY = isOpen ? 1.3 : 0.05;
      letterRef.current.position.y = THREE.MathUtils.lerp(
        letterRef.current.position.y,
        targetLetterY,
        delta * 3.5
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onClick={onClick}
    >
      {/* Pedestal / Table Disc */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[2.0, 2.2, 0.15, 36]} />
        <meshStandardMaterial
          color="#1a0712"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[0, -1.12, 0]}>
        <torusGeometry args={[2.0, 0.04, 16, 36]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Envelope Body Back Plate */}
      <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.8, 0.04]} />
        <meshStandardMaterial
          color="#380718"
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Envelope Pocket Front */}
      <mesh position={[0, -0.2, 0.05]} castShadow>
        <boxGeometry args={[2.8, 1.4, 0.04]} />
        <meshStandardMaterial
          color="#480920"
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Golden Trim Border along Envelope */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[2.85, 1.85, 0.02]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.3}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Wax Seal with Gold Heart Emblem */}
      <group position={[0, -0.05, 0.1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.06, 24]} />
          <meshStandardMaterial
            color="#8b0020"
            roughness={0.25}
            metalness={0.4}
          />
        </mesh>
        <mesh position={[0, 0, 0.04]} scale={0.1}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Flap Hinged at Top (Y = 0.9) */}
      <group ref={flapRef} position={[0, 0.9, 0]}>
        <mesh position={[0, -0.5, 0.06]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[1.4, 0.95, 3]} />
          <meshStandardMaterial
            color="#5a0b28"
            roughness={0.35}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Letter Paper Emerging */}
      <mesh ref={letterRef} position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[2.5, 1.6, 0.02]} />
        <meshStandardMaterial
          color="#fffaf0"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Soft Romantic Point Light */}
      <pointLight
        position={[0, 1.5, 1.5]}
        color="#ffccaa"
        intensity={isOpen ? 2.5 : 1.2}
        distance={6}
        decay={2}
      />
    </group>
  );
};
