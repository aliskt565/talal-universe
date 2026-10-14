'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientMusicEngine } from '@/lib/audioSynth';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'mp3' | 'synth'>('synth');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if an MP3 file exists at /audio/birthday-music.mp3
    const testAudio = new Audio('/audio/birthday-music.mp3');
    testAudio.addEventListener('canplaythrough', () => {
      setMode('mp3');
      audioRef.current = testAudio;
      testAudio.loop = true;
    });
    testAudio.addEventListener('error', () => {
      // Graceful fallback to ambient synthesizer
      setMode('synth');
    });

    return () => {
      ambientMusicEngine.pause();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      if (mode === 'mp3' && audioRef.current) {
        audioRef.current.pause();
      } else {
        ambientMusicEngine.pause();
      }
      setIsPlaying(false);
    } else {
      if (mode === 'mp3' && audioRef.current) {
        audioRef.current.play().catch(() => {
          // If browser blocks audio, fall back to synth
          ambientMusicEngine.play();
        });
      } else {
        ambientMusicEngine.play();
      }
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.25rem',
        zIndex: 50,
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        className="btn-luxury-secondary"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1.1rem',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          boxShadow: isPlaying ? '0 0 20px rgba(212, 175, 55, 0.4)' : 'none',
        }}
      >
        {isPlaying ? (
          <>
            <Volume2 size={18} color="#d4af37" />
            <span>Music: On</span>
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                animation: 'softPulse 1.5s infinite',
              }}
            />
          </>
        ) : (
          <>
            <VolumeX size={18} color="#f8c8d2" />
            <span>Sound Off</span>
          </>
        )}
      </button>
    </div>
  );
};
