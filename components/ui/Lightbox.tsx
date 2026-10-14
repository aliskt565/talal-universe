'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TalalPhoto, TALAL_PHOTOS } from '@/lib/galleryData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  photo: TalalPhoto | null;
  onClose: () => void;
  onSelectPhoto: (photo: TalalPhoto) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  onClose,
  onSelectPhoto,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [photo]);

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = TALAL_PHOTOS.findIndex((p) => p.id === photo.id);
        const prevIndex = (currentIndex - 1 + TALAL_PHOTOS.length) % TALAL_PHOTOS.length;
        onSelectPhoto(TALAL_PHOTOS[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = TALAL_PHOTOS.findIndex((p) => p.id === photo.id);
        const nextIndex = (currentIndex + 1) % TALAL_PHOTOS.length;
        onSelectPhoto(TALAL_PHOTOS[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = TALAL_PHOTOS.findIndex((p) => p.id === photo.id);
  const prevPhoto = TALAL_PHOTOS[(currentIndex - 1 + TALAL_PHOTOS.length) % TALAL_PHOTOS.length];
  const nextPhoto = TALAL_PHOTOS[(currentIndex + 1) % TALAL_PHOTOS.length];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Talal Ahmad Portrait ${photo.slotNumber}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(5, 2, 6, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      {/* Lightbox Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(22, 10, 24, 0.88)',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(148, 10, 42, 0.35)',
          overflowY: 'auto',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '1.1rem',
                color: 'var(--champagne-gold)',
                fontWeight: 600,
              }}
            >
              Portrait {photo.slotNumber} of 13
            </span>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-ivory)' }}>
              Talal Ahmad
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Lightbox (Escape)"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--warm-ivory)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Photograph Display with Gold Luxury Frame */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3 / 4',
            maxHeight: '58vh',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '2px solid rgba(212, 175, 55, 0.6)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            backgroundColor: '#12040b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!imageError ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              style={{ objectFit: 'contain' }}
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            /* Elegant Placeholder - never a broken image! */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📷</span>
              <p
                style={{
                  fontFamily: 'var(--font-serif-title)',
                  fontSize: '1.25rem',
                  color: 'var(--champagne-light)',
                  marginBottom: '0.5rem',
                }}
              >
                Portrait {photo.slotNumber}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--soft-blush)' }}>
                Talal Ahmad
              </p>
            </div>
          )}
        </div>

        {/* Affectionate Roman Urdu Caption */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '1.2rem',
            padding: '0.8rem 1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '0.85rem',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif-elegant)',
              fontSize: '1.15rem',
              color: 'var(--warm-ivory)',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            &ldquo;{photo.caption}&rdquo;
          </p>
        </div>

        {/* Navigation Buttons: Previous and Next */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '1rem',
          }}
        >
          <button
            type="button"
            onClick={() => onSelectPhoto(prevPhoto)}
            className="btn-luxury-secondary"
            aria-label="Previous Portrait"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <span
            style={{
              alignSelf: 'center',
              fontSize: '0.85rem',
              color: 'var(--champagne-gold)',
            }}
          >
            {currentIndex + 1} / {TALAL_PHOTOS.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectPhoto(nextPhoto)}
            className="btn-luxury-secondary"
            aria-label="Next Portrait"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
