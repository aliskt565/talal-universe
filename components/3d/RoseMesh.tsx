'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

interface RoseMeshProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  bloomColor?: string;
}

export const RoseMesh: React.FC<RoseMeshProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  bloomColor = '#9e092b',
}) => {
  // Generate multi-layer rose petal geometry
  const petalLayers = useMemo(() => {
    const layers: {
      pos: [number, number, number];
      rot: [number, number, number];
      scale: number;
    }[] = [];
    const layerCounts = [3, 5, 7, 9];
    const layerRadii = [0.18, 0.32, 0.48, 0.65];
    const layerHeights = [0.25, 0.2, 0.15, 0.08];

    layerCounts.forEach((count, lIdx) => {
      const radius = layerRadii[lIdx];
      const height = layerHeights[lIdx];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + lIdx * 0.4;
        const x = Math.cos(angle) * radius * 0.7;
        const z = Math.sin(angle) * radius * 0.7;
        const rotY = -angle + Math.PI / 2;
        const rotX = 0.2 + lIdx * 0.15; // Petals open outwards

        layers.push({
          pos: [x, height, z] as [number, number, number],
          rot: [rotX, rotY, 0] as [number, number, number],
          scale: 0.25 + lIdx * 0.12,
        });
      }
    });

    return layers;
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Rose Center Bud */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#68051a" roughness={0.3} />
      </mesh>

      {/* Petal Layers */}
      {petalLayers.map((p, idx) => (
        <mesh key={idx} position={p.pos} rotation={p.rot} scale={p.scale}>
          <coneGeometry args={[0.3, 0.45, 12, 1, true]} />
          <meshStandardMaterial
            color={bloomColor}
            roughness={0.35}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Calyx (green sepals) */}
      <mesh position={[0, -0.05, 0]}>
        <coneGeometry args={[0.22, 0.2, 5]} />
        <meshStandardMaterial color="#1f401c" roughness={0.6} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.035, 0.04, 1.4, 8]} />
        <meshStandardMaterial color="#244d21" roughness={0.5} />
      </mesh>

      {/* Rose Leaves */}
      <mesh position={[0.15, -0.5, 0.05]} rotation={[0.4, 0.2, -0.6]} scale={[0.18, 0.08, 0.3]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#1b4218" roughness={0.4} />
      </mesh>
      <mesh position={[-0.15, -0.7, -0.05]} rotation={[-0.3, -0.2, 0.6]} scale={[0.16, 0.07, 0.26]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#1b4218" roughness={0.4} />
      </mesh>
    </group>
  );
};
