'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience3D, SceneId } from './Experience3D';
import { TalalPhoto } from '@/lib/galleryData';
import { WebGLFallback } from '../ui/WebGLFallback';

interface CanvasContainerProps {
  currentScene: SceneId;
  isOpeningTransition: boolean;
  onOpeningEnter: () => void;
  onHeartActivated: () => void;
  isHeartActivated: boolean;
  onSelectPhoto: (photo: TalalPhoto) => void;
  isEnvelopeOpen: boolean;
  onOpenEnvelope: () => void;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = (props) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
      }
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported || hasWebGLError) {
    return <WebGLFallback currentScene={props.currentScene} />;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48, near: 0.1, far: 100 }}
        dpr={[1, typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#060407', 1);
        }}
        onError={() => setHasWebGLError(true)}
      >
        <Experience3D {...props} />
      </Canvas>
    </div>
  );
};
