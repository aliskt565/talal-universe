'use client';

import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { HeartMesh } from './HeartMesh';

interface SceneInteractiveHeartProps {
  onHeartActivated: () => void;
  isActivated: boolean;
}

export const SceneInteractiveHeart: React.FC<SceneInteractiveHeartProps> = ({
  onHeartActivated,
  isActivated,
}) => {
  const [hovered, setHovered] = useState(false);
  const burstParticlesRef = useRef<THREE.Points>(null);

  // Burst particles for activation
  const [burstPositions, burstVelocities] = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      const speed = 0.05 + Math.random() * 0.12;

      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;

      vel.push({
        vx: Math.sin(phi) * Math.cos(theta) * speed,
        vy: Math.sin(phi) * Math.sin(theta) * speed,
        vz: Math.cos(phi) * speed,
      });
    }
    return [pos, vel];
  }, []);

  useFrame((state, delta) => {
    if (burstParticlesRef.current && isActivated) {
      const posAttr = burstParticlesRef.current.geometry.attributes.position;
      for (let i = 0; i < burstVelocities.length; i++) {
        let x = posAttr.getX(i) + burstVelocities[i].vx;
        let y = posAttr.getY(i) + burstVelocities[i].vy;
        let z = posAttr.getZ(i) + burstVelocities[i].vz;
        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Lighting for Interactive Heart */}
      <ambientLight intensity={0.5} />
      <pointLight
        position={[0, 2, 4]}
        color={hovered || isActivated ? '#ff4070' : '#d4af37'}
        intensity={hovered || isActivated ? 3.5 : 2.0}
        distance={15}
        decay={2}
      />
      <pointLight
        position={[0, -2, -2]}
        color="#8b0025"
        intensity={2.5}
        distance={10}
      />

      {/* Main Interactive Heart */}
      <HeartMesh
        scale={2.2}
        position={[0, 0, 0]}
        color={isActivated ? '#e60039' : '#b80a32'}
        emissiveColor={isActivated ? '#800020' : '#450012'}
        isHovered={hovered}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          onHeartActivated();
        }}
      />

      {/* Radiant Glow Ring */}
      <mesh position={[0, 0, -0.6]} scale={isActivated ? 1.4 : 1.0}>
        <torusGeometry args={[3.0, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={hovered || isActivated ? 1.5 : 0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Activation Burst Particles */}
      {isActivated && (
        <points ref={burstParticlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[burstPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.18}
            color="#ffd700"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
};
