'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CakeMeshProps {
  position?: [number, number, number];
  scale?: number;
}

export const CakeMesh: React.FC<CakeMeshProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const cakeGroupRef = useRef<THREE.Group>(null);
  const flameLightsRef = useRef<THREE.PointLight[]>([]);

  // Candle positions arranged gracefully in a ring around the top tier + center
  const candleConfigs = useMemo(() => {
    const list = [];
    // Outer circle: 16 candles
    const outerRadius = 1.35;
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      list.push({
        x: Math.cos(angle) * outerRadius,
        y: 1.6,
        z: Math.sin(angle) * outerRadius,
        height: 0.65,
      });
    }
    // Inner circle: 10 candles
    const innerRadius = 0.85;
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + 0.15;
      list.push({
        x: Math.cos(angle) * innerRadius,
        y: 1.6,
        z: Math.sin(angle) * innerRadius,
        height: 0.65,
      });
    }
    // Center candle: 1 candle => TOTAL 27 CANDLES FOR 27 YEARS!
    list.push({
      x: 0,
      y: 1.65,
      z: 0,
      height: 0.85,
    });
    return list;
  }, []);

  useFrame((state) => {
    if (!cakeGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle slow rotation of the cake
    cakeGroupRef.current.rotation.y = t * 0.15;

    // Candle flame flickering effect
    flameLightsRef.current.forEach((light, idx) => {
      if (light) {
        const noise = Math.sin(t * 12 + idx * 1.7) * 0.15 + Math.cos(t * 8 + idx * 2.3) * 0.1;
        light.intensity = 1.2 + noise;
      }
    });
  });

  return (
    <group ref={cakeGroupRef} position={position} scale={scale}>
      {/* Golden Cake Pedestal / Stand */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.2, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          roughness={0.2}
          emissive="#4a370b"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.9, 1.4, 0.6, 32]} />
        <meshStandardMaterial
          color="#bfa034"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Base Tier (Rich Red Velvet with Gold Trimmings) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.9, 48]} />
        <meshStandardMaterial
          color="#3b0615"
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>
      {/* Base Tier Cream Frosting Drips */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[2.24, 2.22, 0.15, 48]} />
        <meshStandardMaterial
          color="#fffaf0"
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>
      {/* Gold Trim Beads around Bottom Tier */}
      <mesh position={[0, -0.42, 0]}>
        <torusGeometry args={[2.22, 0.06, 16, 48]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Middle Tier */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.65, 1.65, 0.8, 48]} />
        <meshStandardMaterial
          color="#5a0920"
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>
      {/* Middle Tier Frosting */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[1.68, 1.66, 0.14, 48]} />
        <meshStandardMaterial
          color="#fffaf0"
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>
      {/* Gold Ribbon on Middle Tier */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[1.67, 0.05, 16, 48]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Decorative Golden Rosettes & Pearls */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={`rosette-mid-${i}`}
            position={[Math.cos(angle) * 1.68, 1.22, Math.sin(angle) * 1.68]}
            scale={0.07}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}

      {/* 27 Handcrafted 3D Candles for 27 Years! */}
      {candleConfigs.map((candle, idx) => {
        const flameY = candle.y + candle.height;
        return (
          <group key={`candle-${idx}`} position={[candle.x, candle.y, candle.z]}>
            {/* Candle wax cylinder (Champagne Gold / Ivory) */}
            <mesh position={[0, candle.height / 2, 0]}>
              <cylinderGeometry args={[0.035, 0.035, candle.height, 16]} />
              <meshStandardMaterial
                color={idx === 26 ? '#d4af37' : '#fff8ea'}
                metalness={idx === 26 ? 0.7 : 0.1}
                roughness={0.3}
              />
            </mesh>

            {/* Candle Wick */}
            <mesh position={[0, candle.height + 0.03, 0]}>
              <cylinderGeometry args={[0.007, 0.007, 0.06, 8]} />
              <meshBasicMaterial color="#1a0a05" />
            </mesh>

            {/* Glowing 3D Teardrop Flame */}
            <mesh position={[0, candle.height + 0.1, 0]} scale={[0.045, 0.09, 0.045]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#ffbe3d" />
            </mesh>
            <mesh position={[0, candle.height + 0.12, 0]} scale={[0.025, 0.06, 0.025]}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Point Light for Warm Glow (Only for select candles to maintain high performance) */}
            {idx % 4 === 0 && (
              <pointLight
                ref={(el) => {
                  if (el) flameLightsRef.current[Math.floor(idx / 4)] = el;
                }}
                position={[0, candle.height + 0.15, 0]}
                color="#ffaa33"
                distance={4.5}
                decay={2}
                intensity={1.2}
              />
            )}
          </group>
        );
      })}

      {/* Top 3D Golden "27" Number Display Plaque */}
      <group position={[0, 2.3, 0]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.55, 0.04, 16, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Luminous Heart Topper */}
        <mesh position={[0, 0, 0]} scale={0.22}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#b80a32"
            emissive="#800020"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};
