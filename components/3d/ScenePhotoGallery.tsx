'use client';

import React, { useMemo } from 'react';
import { TALAL_PHOTOS, TalalPhoto } from '@/lib/galleryData';
import { PhotoFrame3D } from './PhotoFrame3D';

interface ScenePhotoGalleryProps {
  onSelectPhoto: (photo: TalalPhoto) => void;
  activePhotoId?: number | null;
}

export const ScenePhotoGallery: React.FC<ScenePhotoGalleryProps> = ({
  onSelectPhoto,
}) => {
  // Compute spatial positions for all 13 frames in a grand curved floating gallery
  const framePositions = useMemo(() => {
    const list = [];
    const total = TALAL_PHOTOS.length; // exactly 13
    const radius = 10;

    for (let i = 0; i < total; i++) {
      // Arc angle from -75 deg to +75 deg
      const angle = ((i - (total - 1) / 2) / (total - 1)) * (Math.PI * 0.72);
      const x = Math.sin(angle) * radius;
      const z = -Math.cos(angle) * radius + 5.5;
      // Stagger heights subtly for dynamic luxury composition
      const y = (i % 2 === 0 ? 0.35 : -0.35) + Math.sin(i * 0.9) * 0.15;
      // Face toward center
      const rotY = -angle;

      list.push({
        position: [x, y, z] as [number, number, number],
        rotation: [0, rotY, 0] as [number, number, number],
      });
    }
    return list;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Lighting for the Portrait Exhibition */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 8, 5]} intensity={1.5} color="#fff8e8" />
      <pointLight position={[0, 3, 0]} color="#d4af37" intensity={2.0} distance={15} />

      {/* 13 Individual 3D Floating Frames */}
      {TALAL_PHOTOS.map((photo, idx) => (
        <PhotoFrame3D
          key={photo.id}
          photo={photo}
          position={framePositions[idx].position}
          rotation={framePositions[idx].rotation}
          onClick={onSelectPhoto}
        />
      ))}
    </group>
  );
};
