'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface HeartMeshProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  emissiveColor?: string;
  wireframe?: boolean;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  isHovered?: boolean;
}

export function createHeartGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  // Draw heart shape using cubic curves for smooth curvature
  shape.moveTo(0, 0.5);
  shape.bezierCurveTo(0, 0.9, -0.6, 1.4, -1.3, 1.4);
  shape.bezierCurveTo(-2.1, 1.4, -2.1, 0.6, -2.1, 0.6);
  shape.bezierCurveTo(-2.1, -0.2, -1.5, -0.85, 0, -2.0);
  shape.bezierCurveTo(1.5, -0.85, 2.1, -0.2, 2.1, 0.6);
  shape.bezierCurveTo(2.1, 0.6, 2.1, 1.4, 1.3, 1.4);
  shape.bezierCurveTo(0.6, 1.4, 0, 0.9, 0, 0.5);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.65,
    bevelEnabled: true,
    bevelSegments: 16,
    steps: 4,
    bevelSize: 0.35,
    bevelThickness: 0.35,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

export const HeartMesh: React.FC<HeartMeshProps> = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#a80b2f',
  emissiveColor = '#3a0010',
  wireframe = false,
  onClick,
  onPointerOver,
  onPointerOut,
  isHovered = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createHeartGeometry(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Gentle natural heartbeat rhythm
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2.5) * 0.05 + Math.sin(t * 5.0) * 0.02;
    const targetScale = scale * (isHovered ? 1.15 : 1.0) * pulse;

    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    );

    // Subtle floating rotation
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.8) * 0.2;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.6) * 0.08;
    meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.12;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color={color}
        emissive={isHovered ? '#800020' : emissiveColor}
        emissiveIntensity={isHovered ? 0.8 : 0.4}
        roughness={0.18}
        metalness={0.25}
        clearcoat={1.0}
        clearcoatRoughness={0.12}
        reflectivity={0.9}
        wireframe={wireframe}
      />
    </mesh>
  );
};
