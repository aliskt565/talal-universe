'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { HeartMesh } from './HeartMesh';

interface SceneOpeningProps {
  onEnter: () => void;
  isTransitioning: boolean;
}

export const SceneOpening: React.FC<SceneOpeningProps> = ({
  onEnter,
  isTransitioning,
}) => {
  const portalRingRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    // Portal ring rotation and pulsation during transition
    if (portalRingRef.current) {
      const t = state.clock.getElapsedTime();
      portalRingRef.current.rotation.z = t * 0.8;
      if (isTransitioning) {
        portalRingRef.current.scale.lerp(new THREE.Vector3(12, 12, 12), delta * 2.5);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Dramatic Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 4]} color="#ffd2a0" intensity={2.2} distance={15} />
      <pointLight position={[-4, -2, -2]} color="#800020" intensity={3.5} distance={12} />
      <pointLight position={[4, 2, -2]} color="#d4af37" intensity={2.5} distance={12} />

      {/* Main Emerging 3D Heart */}
      <HeartMesh
        scale={1.8}
        position={[0, 0, 0]}
        color="#b30030"
        emissiveColor="#4a0014"
        isHovered={hovered}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onEnter}
      />

      {/* 3D Portal Ring Behind Heart */}
      <mesh ref={portalRingRef} position={[0, 0, -1.2]}>
        <torusGeometry args={[3.2, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={isTransitioning ? 2.5 : 0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};
