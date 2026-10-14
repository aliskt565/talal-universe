'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface FloatingPetalsProps {
  count?: number;
  areaRadius?: number;
}

export function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Delicate curved rose petal shape
  shape.moveTo(0, -0.2);
  shape.bezierCurveTo(0.18, -0.1, 0.22, 0.15, 0, 0.35);
  shape.bezierCurveTo(-0.22, 0.15, -0.18, -0.1, 0, -0.2);

  const geom = new THREE.ShapeGeometry(shape);
  // Add slight curvature along Z axis
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, -Math.sin(Math.sqrt(x * x + y * y) * 4) * 0.05);
  }
  geom.computeVertexNormals();
  return geom;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  count = 60,
  areaRadius = 15,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const petalGeom = useMemo(() => createPetalGeometry(), []);

  // Initialize petals with positions, random speeds, and rotations
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * areaRadius * 2,
        y: Math.random() * 12 - 2,
        z: (Math.random() - 0.5) * areaRadius * 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.008 + Math.random() * 0.015,
        swaySpeed: 0.5 + Math.random() * 1.0,
        swayAmp: 0.01 + Math.random() * 0.02,
        scale: 0.6 + Math.random() * 0.5,
      });
    }
    return data;
  }, [count, areaRadius]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Descend slowly
      p.y -= p.speedY;
      // Gentle horizontal fluttering
      p.x += Math.sin(t * p.swaySpeed + i) * p.swayAmp;
      p.z += Math.cos(t * p.swaySpeed + i) * p.swayAmp;

      p.rotX += 0.01;
      p.rotY += 0.012;

      // Wrap around when falling below ground
      if (p.y < -4) {
        p.y = 8;
        p.x = (Math.random() - 0.5) * areaRadius * 2;
        p.z = (Math.random() - 0.5) * areaRadius * 2;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeom, undefined, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#b80a32"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};
