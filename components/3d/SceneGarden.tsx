'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoseMesh } from './RoseMesh';

export const SceneGarden: React.FC = () => {
  // Archway posts and curved arch
  const archPoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.2, -2, 0),
      new THREE.Vector3(-3.2, 2.5, 0),
      new THREE.Vector3(-1.8, 4.2, 0),
      new THREE.Vector3(0, 4.8, 0),
      new THREE.Vector3(1.8, 4.2, 0),
      new THREE.Vector3(3.2, 2.5, 0),
      new THREE.Vector3(3.2, -2, 0),
    ]);
    return new THREE.TubeGeometry(curve, 64, 0.12, 12, false);
  }, []);

  // Pathway flagstones
  const pathwayStones = useMemo(() => {
    const list = [];
    for (let i = 0; i < 18; i++) {
      const z = -12 + i * 1.4;
      const xOffset = Math.sin(i * 0.45) * 0.4;
      list.push({
        x: xOffset,
        y: -2.3,
        z,
        scaleX: 1.4 + Math.sin(i) * 0.2,
        scaleZ: 0.9,
      });
    }
    return list;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Garden Lighting & Atmospheric Pools */}
      <ambientLight intensity={0.35} color="#2b0a1c" />
      <directionalLight
        position={[8, 14, 8]}
        intensity={1.2}
        color="#fff4db"
        castShadow
      />

      {/* Luminous Glowing 3D Moon in Night Sky */}
      <group position={[15, 18, -30]}>
        <mesh>
          <sphereGeometry args={[4.5, 32, 32]} />
          <meshBasicMaterial color="#fffbe6" />
        </mesh>
        {/* Soft Moon Halo */}
        <mesh scale={1.25}>
          <sphereGeometry args={[4.5, 24, 24]} />
          <meshBasicMaterial
            color="#ffeaa8"
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>
        <pointLight color="#ffeaa8" intensity={2.5} distance={70} decay={2} />
      </group>

      {/* Romantic Golden Archway */}
      <mesh geometry={archPoints} position={[0, 0, -2]}>
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Hanging Lanterns on Archway */}
      {[-2.8, 2.8].map((x, i) => (
        <group key={`lantern-${i}`} position={[x, 2.6, -2]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 0.5, 8]} />
            <meshStandardMaterial color="#2d0515" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0]} scale={0.15}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#ffc354" />
          </mesh>
          <pointLight color="#ffbe42" intensity={1.5} distance={6} decay={2} />
        </group>
      ))}

      {/* Illuminated Stone Pathway */}
      {pathwayStones.map((stone, idx) => (
        <mesh
          key={`stone-${idx}`}
          position={[stone.x, stone.y, stone.z]}
          rotation={[-Math.PI / 2, 0, Math.sin(idx) * 0.1]}
        >
          <planeGeometry args={[stone.scaleX, stone.scaleZ]} />
          <meshStandardMaterial
            color="#2a0d1d"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Garden Ground Plane */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#12050e"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Rose Arrangements Along Both Sides of the Pathway */}
      {[-2.5, -3.2, -2.0, -3.8].map((x, i) => (
        <RoseMesh
          key={`rose-left-${i}`}
          position={[x, -1.8, -1 - i * 2.2]}
          rotation={[0, i * 0.8, 0]}
          scale={0.9 + (i % 2) * 0.2}
          bloomColor={i % 2 === 0 ? '#99092c' : '#c91642'}
        />
      ))}

      {[2.5, 3.2, 2.0, 3.8].map((x, i) => (
        <RoseMesh
          key={`rose-right-${i}`}
          position={[x, -1.8, -1 - i * 2.2]}
          rotation={[0, -i * 0.8, 0]}
          scale={0.9 + (i % 2) * 0.2}
          bloomColor={i % 2 === 0 ? '#b50a35' : '#850724'}
        />
      ))}
    </group>
  );
};
