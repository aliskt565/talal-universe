'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SceneId } from '@/components/3d/Experience3D';
import { TalalPhoto } from '@/lib/galleryData';
import { Navigation } from '@/components/ui/Navigation';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { Lightbox } from '@/components/ui/Lightbox';
import { LoveLetterModal } from '@/components/ui/LoveLetterModal';
import { SceneOverlays } from '@/components/ui/SceneOverlays';
import { Sparkles } from 'lucide-react';

// Dynamic import of 3D Canvas to prevent SSR issues
const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false }
);

export default function BirthdayUniversePage() {
  const [currentScene, setCurrentScene] = useState<SceneId>(1);
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);
  const [isHeartActivated, setIsHeartActivated] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<TalalPhoto | null>(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick, elegant mounting sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Scene 1: Enter Universe handler with smooth camera zoom
  const handleOpeningEnter = () => {
    setIsOpeningTransition(true);
    setTimeout(() => {
      setCurrentScene(2);
      setIsOpeningTransition(false);
    }, 1200);
  };

  // Scene 3: Interactive Heart trigger
  const handleHeartActivate = () => {
    setIsHeartActivated(true);
    setTimeout(() => {
      setIsHeartActivated(false);
    }, 2500);
  };

  // Scene 7: Love Letter envelope opening
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setIsLetterModalOpen(true);
    }, 700);
  };

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#060407',
      }}
    >
      {/* Loading Screen */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: '#060407',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.6s ease',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'softPulse 1.5s infinite' }}>
            ❤️
          </div>
          <h2
            className="gold-gradient-text"
            style={{
              fontSize: '1.5rem',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            A Universe Made for Talal
          </h2>
          <p style={{ color: 'var(--soft-blush)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            Preparing your birthday surprise...
          </p>
        </div>
      )}

      {/* Real-time 3D Canvas Environment */}
      <CanvasContainer
        currentScene={currentScene}
        isOpeningTransition={isOpeningTransition}
        onOpeningEnter={handleOpeningEnter}
        onHeartActivated={handleHeartActivate}
        isHeartActivated={isHeartActivated}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        isEnvelopeOpen={isEnvelopeOpen}
        onOpenEnvelope={handleOpenEnvelope}
      />

      {/* Floating Audio Toggle (Sound Off by default) */}
      <AudioPlayer />

      {/* Scene-Specific Overlays (Headings, Messages, CTA Buttons) */}
      <SceneOverlays
        currentScene={currentScene}
        onSceneChange={(id) => setCurrentScene(id)}
        onOpeningEnter={handleOpeningEnter}
        isOpeningTransition={isOpeningTransition}
        isHeartActivated={isHeartActivated}
        onHeartActivate={handleHeartActivate}
        onOpenEnvelope={handleOpenEnvelope}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      {/* Scene Navigation Dock */}
      <Navigation
        currentScene={currentScene}
        onSceneChange={(id) => setCurrentScene(id)}
      />

      {/* Lightbox for Talal's 13 Portraits */}
      <Lightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      {/* Accessible Love Letter Modal */}
      <LoveLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => {
          setIsLetterModalOpen(false);
          setIsEnvelopeOpen(false);
        }}
      />
    </main>
  );
}
