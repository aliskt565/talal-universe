'use client';

import React from 'react';
import { SceneId } from '../3d/Experience3D';

interface WebGLFallbackProps {
  currentScene: SceneId;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({ currentScene }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: 'radial-gradient(ellipse at center, #2d0615 0%, #060407 80%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient glowing circles */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 10, 50, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'softPulse 4s infinite ease-in-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(100px, -80px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '2rem',
          maxWidth: '600px',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'gentleFloat 3s infinite ease-in-out' }}>
          ❤️
        </div>
        <h2 className="gold-gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          A Universe Made for Talal
        </h2>
        <p style={{ color: 'var(--soft-blush)', fontSize: '1rem', fontStyle: 'italic' }}>
          With Love, Maria — Your Jhalo Rani
        </p>
      </div>
    </div>
  );
};
