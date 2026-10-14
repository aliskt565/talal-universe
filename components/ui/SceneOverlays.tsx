'use client';

import React from 'react';
import { SceneId } from '../3d/Experience3D';
import { AgeCountdownSection } from './AgeCountdownSection';
import { Sparkles, Heart, ArrowRight, Cake, Mail, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

import { TALAL_PHOTOS, TalalPhoto } from '@/lib/galleryData';

interface SceneOverlaysProps {
  currentScene: SceneId;
  onSceneChange: (scene: SceneId) => void;
  onOpeningEnter: () => void;
  isOpeningTransition: boolean;
  isHeartActivated: boolean;
  onHeartActivate: () => void;
  onOpenEnvelope: () => void;
  onSelectPhoto: (photo: TalalPhoto) => void;
}

export const SceneOverlays: React.FC<SceneOverlaysProps> = ({
  currentScene,
  onSceneChange,
  onOpeningEnter,
  isOpeningTransition,
  isHeartActivated,
  onHeartActivate,
  onOpenEnvelope,
  onSelectPhoto,
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#b80a32', '#f8c8d2', '#ffffff'],
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5rem 1.5rem 6.5rem 1.5rem',
        overflowY: 'auto',
      }}
    >
      {/* SCENE 1: OPENING */}
      {currentScene === 1 && (
        <div
          style={{
            margin: 'auto',
            textAlign: 'center',
            maxWidth: '750px',
            pointerEvents: 'auto',
            transition: 'opacity 0.8s ease',
            opacity: isOpeningTransition ? 0 : 1,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--champagne-gold)',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={16} />
            <span>Dedicated to Talal Ahmad</span>
            <Sparkles size={16} />
          </div>

          <h1
            className="gold-gradient-text"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
              lineHeight: 1.15,
              marginBottom: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            HAPPY BIRTHDAY, TALAL AHMAD ❤️
          </h1>

          <p
            className="font-serif-elegant"
            style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              color: 'var(--warm-ivory)',
              marginBottom: '0.6rem',
              fontStyle: 'italic',
            }}
          >
            A Special Little Universe, Created Just for You
          </p>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--soft-blush)',
              marginBottom: '2.5rem',
              letterSpacing: '0.05em',
            }}
          >
            With Love, Maria — Your Jhalo Rani
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={onOpeningEnter}
              className="btn-luxury-primary"
              style={{ fontSize: '1.1rem', padding: '1rem 2.8rem' }}
            >
              ENTER YOUR UNIVERSE ❤️
            </button>

            <button
              type="button"
              onClick={() => onSceneChange(2)}
              className="btn-luxury-secondary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
            >
              Skip to Experience →
            </button>
          </div>
        </div>
      )}

      {/* SCENE 2: ROMANTIC GARDEN */}
      {currentScene === 2 && (
        <div
          style={{
            margin: 'auto auto 1rem auto',
            textAlign: 'center',
            maxWidth: '700px',
            pointerEvents: 'auto',
          }}
        >
          <div className="glass-panel" style={{ padding: '2rem 1.75rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--champagne-gold)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              <span>Scene 02 • The Night Garden</span>
            </div>

            <h2
              className="crimson-gradient-text"
              style={{
                fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
                marginBottom: '0.8rem',
                lineHeight: 1.2,
              }}
            >
              Janaaaa, Tonight This Little World Is All About You ❤️
            </h2>

            <p
              className="font-serif-elegant"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: 'var(--warm-ivory)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                marginBottom: '1.8rem',
              }}
            >
              Har phool, har sitara aur har roshni sirf aap ki muskurahat ke liye sajai gayi hai.
            </p>

            <button
              type="button"
              onClick={() => onSceneChange(3)}
              className="btn-luxury-primary"
            >
              Dil Ki Baat Suniye <Heart size={18} fill="#14050a" />
            </button>
          </div>
        </div>
      )}

      {/* SCENE 3: INTERACTIVE HEART */}
      {currentScene === 3 && (
        <div
          style={{
            margin: 'auto auto 0.5rem auto',
            textAlign: 'center',
            maxWidth: '750px',
            pointerEvents: 'auto',
          }}
        >
          <div className="glass-panel-glow" style={{ padding: '2rem 1.8rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--champagne-gold)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              <Heart size={14} fill="var(--champagne-gold)" />
              <span>Scene 03 • Dil Ki Baat</span>
              <Heart size={14} fill="var(--champagne-gold)" />
            </div>

            {/* Exact Required Sentence 1 */}
            <p
              style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: 'clamp(1.4rem, 2.8vw, 2.0rem)',
                color: '#fff',
                lineHeight: 1.4,
                marginBottom: '1.2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.7)',
              }}
            >
              &ldquo;Ma bohat pyar krti ap se ap ko kabhe kisi k sath share nai kar sakti.&rdquo;
            </p>

            {/* Second Affectionate Sentence */}
            <p
              className="font-serif-elegant"
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                color: 'var(--soft-blush)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                marginBottom: '1.8rem',
              }}
            >
              Janaaaa, Aap mere liye bohat special hain. Aap ki khushi meri khushi ha, aur meri dua ha ke aap ki zindagi hamesha khushiyon, kamyabi aur sukoon se bhari rahy. ❤️
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onHeartActivate}
                className="btn-luxury-secondary"
              >
                Touch Heart <Sparkles size={16} />
              </button>

              <button
                type="button"
                onClick={() => onSceneChange(4)}
                className="btn-luxury-primary"
              >
                View Talal&apos;s 13 Portraits <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 4: 13-PHOTO PORTRAIT GALLERY */}
      {currentScene === 4 && (
        <div
          style={{
            margin: '0 auto auto auto',
            textAlign: 'center',
            maxWidth: '750px',
            pointerEvents: 'auto',
          }}
        >
          <div className="glass-panel" style={{ padding: '1.5rem 1.8rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--champagne-gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Scene 04 • Portrait Exhibition
            </span>

            <h2
              className="gold-gradient-text"
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
                marginTop: '0.3rem',
                marginBottom: '0.4rem',
              }}
            >
              13 Little Reasons I Smile When I See You ❤️
            </h2>

            <p
              className="font-serif-elegant"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: 'var(--soft-blush)',
                fontStyle: 'italic',
                marginBottom: '1rem',
              }}
            >
              &ldquo;Janaaaa, aap ki har tasveer apni jagah special ha, aur aaj ka din sirf aap ke naam.&rdquo;
            </p>

            <p style={{ fontSize: '0.82rem', color: 'var(--muted-ivory)', marginBottom: '0.75rem' }}>
              💡 Click any 3D floating frame or tap below to open portraits:
            </p>

            {/* 13 Direct Portrait Chips */}
            <div
              style={{
                display: 'flex',
                gap: '0.4rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                maxWidth: '620px',
                margin: '0 auto 1.25rem auto',
              }}
            >
              {TALAL_PHOTOS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelectPhoto(p)}
                  aria-label={`Open Portrait ${p.slotNumber}`}
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    color: 'var(--champagne-light)',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.35)';
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  #{p.slotNumber}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onSceneChange(5)}
              className="btn-luxury-secondary"
            >
              See Cosmic Timeline & Age →
            </button>
          </div>
        </div>
      )}

      {/* SCENE 5: LIVE AGE & BIRTHDAY COUNTDOWN */}
      {currentScene === 5 && (
        <div
          style={{
            margin: 'auto',
            width: '100%',
            pointerEvents: 'auto',
          }}
        >
          <AgeCountdownSection />

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => onSceneChange(6)}
              className="btn-luxury-primary"
            >
              Cut Birthday Cake <Cake size={18} />
            </button>
          </div>
        </div>
      )}

      {/* SCENE 6: 3D BIRTHDAY CAKE */}
      {currentScene === 6 && (
        <div
          style={{
            margin: 'auto auto 0.5rem auto',
            textAlign: 'center',
            maxWidth: '750px',
            pointerEvents: 'auto',
          }}
        >
          <div className="glass-panel-glow" style={{ padding: '2rem 1.8rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--champagne-gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Scene 06 • 27th Birthday Cake
            </span>

            <h2
              className="crimson-gradient-text"
              style={{
                fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)',
                marginTop: '0.4rem',
                marginBottom: '0.8rem',
              }}
            >
              HAPPY 27TH BIRTHDAY, MY JANAAAA! ❤️
            </h2>

            <p
              className="font-serif-elegant"
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
                color: 'var(--warm-ivory)',
                lineHeight: 1.6,
                marginBottom: '1.8rem',
              }}
            >
              &ldquo;Allah aap ko hamesha khush rakhy, kamyabi de, sehat aur sukoon ata farmaye, aur aap ke tamam achay khwab poory hon. Ameen. ❤️&rdquo;
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={triggerConfetti}
                className="btn-luxury-secondary"
              >
                Blow Candles & Celebrate ✨
              </button>

              <button
                type="button"
                onClick={() => onSceneChange(7)}
                className="btn-luxury-primary"
              >
                Read Maria&apos;s Love Letter <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 7: LOVE LETTER */}
      {currentScene === 7 && (
        <div
          style={{
            margin: 'auto auto 1rem auto',
            textAlign: 'center',
            maxWidth: '680px',
            pointerEvents: 'auto',
          }}
        >
          <div className="glass-panel" style={{ padding: '2rem 1.8rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--champagne-gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Scene 07 • A Letter From Maria
            </span>

            <h2
              className="gold-gradient-text"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                marginTop: '0.4rem',
                marginBottom: '0.8rem',
              }}
            >
              With Love, Maria — Your Jhalo Rani
            </h2>

            <p
              className="font-serif-elegant"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: 'var(--soft-blush)',
                fontStyle: 'italic',
                marginBottom: '1.8rem',
              }}
            >
              A special letter waiting for Talal Ahmad. Click the sealed envelope or the button below to read.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onOpenEnvelope}
                className="btn-luxury-primary"
              >
                Open Love Letter <Mail size={18} />
              </button>

              <button
                type="button"
                onClick={() => onSceneChange(8)}
                className="btn-luxury-secondary"
              >
                Grand Finale →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 8: FINAL CINEMATIC ENDING */}
      {currentScene === 8 && (
        <div
          style={{
            margin: 'auto',
            textAlign: 'center',
            maxWidth: '750px',
            pointerEvents: 'auto',
          }}
        >
          <div className="glass-panel-glow" style={{ padding: '2.5rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>❤️</div>

            <h2
              className="gold-gradient-text"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                lineHeight: 1.2,
                marginBottom: '0.8rem',
              }}
            >
              Happy Birthday, My Janaaaa ❤️
            </h2>

            <p
              className="font-serif-elegant"
              style={{
                fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)',
                color: 'var(--warm-ivory)',
                marginBottom: '0.5rem',
                fontStyle: 'italic',
              }}
            >
              Forever Your Jhalo Rani&apos;s Favorite Person
            </p>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--soft-blush)',
                marginBottom: '2.2rem',
                letterSpacing: '0.04em',
              }}
            >
              With All My Love, Always — Maria
            </p>

            <button
              type="button"
              onClick={() => onSceneChange(1)}
              className="btn-luxury-primary"
              style={{ fontSize: '1.05rem', padding: '0.95rem 2.4rem' }}
            >
              <RotateCcw size={18} /> REPLAY OUR LITTLE UNIVERSE ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
