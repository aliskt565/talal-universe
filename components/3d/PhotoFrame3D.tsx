'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { TalalPhoto } from '@/lib/galleryData';

interface PhotoFrame3DProps {
  photo: TalalPhoto;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: (photo: TalalPhoto) => void;
}

export const PhotoFrame3D: React.FC<PhotoFrame3DProps> = ({
  photo,
  position,
  rotation,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Generate an elegant fallback texture if needed or while loading
  const placeholderTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 680;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Luxury dark burgundy gradient background
      const grad = ctx.createLinearGradient(0, 0, 512, 680);
      grad.addColorStop(0, '#2d0615');
      grad.addColorStop(0.5, '#17040c');
      grad.addColorStop(1, '#0c0206');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 680);

      // Gold inner border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 472, 640);

      // Corner ornaments
      ctx.fillStyle = '#d4af37';
      ctx.fillRect(16, 16, 12, 12);
      ctx.fillRect(484, 16, 12, 12);
      ctx.fillRect(16, 652, 12, 12);
      ctx.fillRect(484, 652, 12, 12);

      // Text
      ctx.fillStyle = '#f5e4b2';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(`PORTRAIT ${photo.slotNumber}`, 256, 300);

      ctx.fillStyle = '#f8c8d2';
      ctx.font = '22px Georgia, serif';
      ctx.fillText('TALAL AHMAD', 256, 350);

      ctx.fillStyle = '#d4af37';
      ctx.font = 'italic 18px sans-serif';
      ctx.fillText('Dedicated with love ❤️', 256, 400);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [photo.slotNumber]);

  // Load actual photo
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      photo.src,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTex);
      },
      undefined,
      () => {
        // Fallback to placeholderTexture on error
        setTexture(placeholderTexture);
      }
    );
  }, [photo.src, placeholderTexture]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle floating bob
    const floatOffset = Math.sin(t * 1.2 + photo.id * 0.7) * 0.08;
    groupRef.current.position.y = position[1] + floatOffset;

    // Hover response
    const targetScale = hovered ? 1.08 : 1.0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick(photo);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer 3D Gold Frame Border */}
      <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 3.2, 0.12]} />
        <meshStandardMaterial
          color={hovered ? '#f5e4b2' : '#d4af37'}
          metalness={0.85}
          roughness={0.25}
          emissive={hovered ? '#44330a' : '#1a1403'}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner Burgundy Velvet Matting */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[2.15, 2.95, 0.08]} />
        <meshStandardMaterial
          color="#380617"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Picture Canvas / Plane with Talal's Photo */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.9, 2.7]} />
        <meshBasicMaterial
          map={texture || placeholderTexture || undefined}
          toneMapped={false}
        />
      </mesh>

      {/* Subtle Glass Reflection Layer */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[1.9, 2.7]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.1}
          transmission={0.92}
          transparent
          opacity={0.3}
          reflectivity={0.9}
        />
      </mesh>

      {/* Frame Gold Corner Accents */}
      {[
        [-1.15, 1.55],
        [1.15, 1.55],
        [-1.15, -1.55],
        [1.15, -1.55],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.02]} scale={0.08}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#fff3d1" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Soft spotlight when hovered */}
      {hovered && (
        <pointLight
          position={[0, 0, 1.2]}
          color="#ffeedd"
          intensity={1.5}
          distance={3}
          decay={2}
        />
      )}
    </group>
  );
};
