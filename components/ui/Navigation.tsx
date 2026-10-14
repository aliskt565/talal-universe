'use client';

import React from 'react';
import { SceneId } from '../3d/Experience3D';
import { ChevronLeft, ChevronRight, Sparkles, Heart, Camera, Clock, Cake, Mail, Home } from 'lucide-react';

interface NavigationProps {
  currentScene: SceneId;
  onSceneChange: (scene: SceneId) => void;
}

const SCENES: { id: SceneId; label: string; icon: React.ReactNode }[] = [
  { id: 1, label: 'Start', icon: <Home size={16} /> },
  { id: 2, label: 'Garden', icon: <Sparkles size={16} /> },
  { id: 3, label: 'Dil Ki Baat', icon: <Heart size={16} /> },
  { id: 4, label: 'Portraits', icon: <Camera size={16} /> },
  { id: 5, label: 'Timeline', icon: <Clock size={16} /> },
  { id: 6, label: 'Cake', icon: <Cake size={16} /> },
  { id: 7, label: 'Letter', icon: <Mail size={16} /> },
  { id: 8, label: 'Finale', icon: <Heart size={16} /> },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentScene,
  onSceneChange,
}) => {
  const handlePrev = () => {
    if (currentScene > 1) {
      onSceneChange((currentScene - 1) as SceneId);
    }
  };

  const handleNext = () => {
    if (currentScene < 8) {
      onSceneChange((currentScene + 1) as SceneId);
    }
  };

  return (
    <nav
      aria-label="Scene navigation"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.45rem 0.8rem',
        background: 'rgba(16, 7, 18, 0.85)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '9999px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(148, 10, 42, 0.3)',
        maxWidth: 'calc(100vw - 2rem)',
        overflowX: 'auto',
      }}
    >
      {/* Previous Scene Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentScene === 1}
        aria-label="Previous Scene"
        style={{
          background: 'none',
          border: 'none',
          color: currentScene === 1 ? 'rgba(255,255,255,0.2)' : 'var(--champagne-light)',
          cursor: currentScene === 1 ? 'default' : 'pointer',
          padding: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s',
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scene Dots / Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {SCENES.map((scene) => {
          const isActive = currentScene === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onSceneChange(scene.id)}
              aria-label={`Jump to ${scene.label}`}
              aria-current={isActive ? 'step' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: isActive ? '0.35rem 0.85rem' : '0.35rem 0.55rem',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#14050a' : 'var(--warm-ivory)',
                background: isActive
                  ? 'linear-gradient(135deg, #fceec5 0%, #d4af37 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: isActive
                  ? '1px solid rgba(255, 240, 200, 0.8)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {scene.icon}
              <span className="scene-label">{scene.label}</span>
            </button>
          );
        })}
      </div>

      {/* Next Scene Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentScene === 8}
        aria-label="Next Scene"
        style={{
          background: 'none',
          border: 'none',
          color: currentScene === 8 ? 'rgba(255,255,255,0.2)' : 'var(--champagne-light)',
          cursor: currentScene === 8 ? 'default' : 'pointer',
          padding: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s',
        }}
      >
        <ChevronRight size={20} />
      </button>

      <style jsx>{`
        @media (max-width: 640px) {
          .scene-label {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
