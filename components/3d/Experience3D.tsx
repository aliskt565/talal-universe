'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { StarfieldParticles } from './StarfieldParticles';
import { FloatingPetals } from './FloatingPetals';
import { SceneOpening } from './SceneOpening';
import { SceneGarden } from './SceneGarden';
import { SceneInteractiveHeart } from './SceneInteractiveHeart';
import { ScenePhotoGallery } from './ScenePhotoGallery';
import { SceneCake } from './SceneCake';
import { SceneLetter } from './SceneLetter';
import { SceneEnding } from './SceneEnding';
import { TalalPhoto } from '@/lib/galleryData';

export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Experience3DProps {
  currentScene: SceneId;
  isOpeningTransition: boolean;
  onOpeningEnter: () => void;
  onHeartActivated: () => void;
  isHeartActivated: boolean;
  onSelectPhoto: (photo: TalalPhoto) => void;
  isEnvelopeOpen: boolean;
  onOpenEnvelope: () => void;
}

// Camera coordinates for each scene
const CAMERA_TARGETS: Record<
  SceneId,
  { pos: [number, number, number]; lookAt: [number, number, number] }
> = {
  1: { pos: [0, 0, 7.5], lookAt: [0, 0, 0] },
  2: { pos: [0, 0.5, 9], lookAt: [0, 0.8, -4] },
  3: { pos: [0, 0, 6.2], lookAt: [0, 0, 0] },
  4: { pos: [0, 0.4, 7.2], lookAt: [0, 0, 0] },
  5: { pos: [0, 1.5, 11], lookAt: [0, 0, 0] },
  6: { pos: [0, 1.6, 6.4], lookAt: [0, 0.7, 0] },
  7: { pos: [0, 1.1, 4.6], lookAt: [0, 0.2, 0] },
  8: { pos: [0, 0.4, 7.2], lookAt: [0, 0.2, 0] },
};

export const Experience3D: React.FC<Experience3DProps> = ({
  currentScene,
  isOpeningTransition,
  onOpeningEnter,
  onHeartActivated,
  isHeartActivated,
  onSelectPhoto,
  isEnvelopeOpen,
  onOpenEnvelope,
}) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Determine target camera position
    let targetConfig = CAMERA_TARGETS[currentScene];

    // During Scene 1 portal transition, push camera deep through the heart
    let targetPos = new THREE.Vector3(...targetConfig.pos);
    if (currentScene === 1 && isOpeningTransition) {
      targetPos.set(0, 0, 0.2);
    }

    // Subtle pointer parallax
    const mouse = state.pointer;
    const parallaxX = mouse.x * 0.4;
    const parallaxY = mouse.y * 0.3;
    targetPos.x += parallaxX;
    targetPos.y += parallaxY;

    // Smooth camera position interpolation
    camera.position.lerp(targetPos, delta * 3.2);

    // Smooth camera lookAt interpolation
    const destLookAt = new THREE.Vector3(...targetConfig.lookAt);
    currentLookAt.current.lerp(destLookAt, delta * 3.5);
    camera.lookAt(currentLookAt.current);
  });

  return (
    <>
      {/* Background Starfield and Floating Petals always present for atmospheric cohesion */}
      <StarfieldParticles count={1000} radius={50} />
      <FloatingPetals count={45} areaRadius={14} />

      {/* Fog for deep cinematic atmosphere */}
      <fog attach="fog" args={['#08040a', 8, 38]} />

      {/* Render active scene */}
      {currentScene === 1 && (
        <SceneOpening
          onEnter={onOpeningEnter}
          isTransitioning={isOpeningTransition}
        />
      )}

      {(currentScene === 2 || currentScene === 5) && <SceneGarden />}

      {currentScene === 3 && (
        <SceneInteractiveHeart
          onHeartActivated={onHeartActivated}
          isActivated={isHeartActivated}
        />
      )}

      {currentScene === 4 && (
        <ScenePhotoGallery onSelectPhoto={onSelectPhoto} />
      )}

      {currentScene === 6 && <SceneCake />}

      {currentScene === 7 && (
        <SceneLetter
          isEnvelopeOpen={isEnvelopeOpen}
          onOpenEnvelope={onOpenEnvelope}
        />
      )}

      {currentScene === 8 && <SceneEnding />}
    </>
  );
};
