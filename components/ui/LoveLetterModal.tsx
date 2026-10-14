'use client';

import React from 'react';
import { X, Heart } from 'lucide-react';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Personal Love Letter from Maria to Talal"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(6, 2, 8, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          background: 'linear-gradient(135deg, rgba(32, 10, 24, 0.95) 0%, rgba(14, 5, 12, 0.98) 100%)',
          border: '1.5px solid rgba(212, 175, 55, 0.5)',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(148, 10, 42, 0.4)',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Letter"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
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

        {/* Letter Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--champagne-gold)',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            <Heart size={16} fill="var(--champagne-gold)" />
            <span>Meri Jan Ke Liye Ek Khas Paigham</span>
            <Heart size={16} fill="var(--champagne-gold)" />
          </div>

          <h2
            className="gold-gradient-text"
            style={{
              fontFamily: 'var(--font-serif-title)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              marginBottom: '0.2rem',
            }}
          >
            A Letter From Maria
          </h2>
          <p style={{ color: 'var(--soft-blush)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            To Talal Ahmad — On Your 27th Birthday
          </p>
        </div>

        {/* Parchment Content Box */}
        <div
          style={{
            fontFamily: 'var(--font-serif-elegant)',
            fontSize: '1.25rem',
            lineHeight: 1.8,
            color: 'var(--warm-ivory)',
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '1rem',
            padding: '1.8rem',
            position: 'relative',
          }}
        >
          <p style={{ marginBottom: '1.2rem', fontWeight: 600, color: 'var(--champagne-light)' }}>
            Meri Jan, Mere Pyare Janaaaa,
          </p>

          <p style={{ marginBottom: '1.2rem' }}>
            Aaj aap ki salgirah hai, aur is khubsurat din par mein aap ko batana chahti hoon ke aap mere liye kitne anmol hain. Yeh choti si dunya sirf aur sirf aap ke liye banayi gayi hai taake aap ko mehsoos ho ke aap mere dil ke kitne qareeb hain.
          </p>

          <p
            style={{
              marginBottom: '1.2rem',
              padding: '1rem',
              background: 'rgba(148, 10, 42, 0.25)',
              borderLeft: '3px solid var(--champagne-gold)',
              borderRadius: '0.5rem',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.3rem',
            }}
          >
            &ldquo;Ma bohat pyar krti ap se ap ko kabhe kisi k sath share nai kar sakti.&rdquo;
          </p>

          <p style={{ marginBottom: '1.2rem' }}>
            Aap jaise hain, mujhe aap ki har ek baat, aap ka pura wajood aur aap ki poori personality bohot pasand hai. Aap ki saadgi, aap ka lehja aur aap ki muskurahat mere liye dunya ki sab se pyari cheez hai.
          </p>

          <p style={{ marginBottom: '1.2rem' }}>
            Aap mere liye bohat special hain. Aap ki khushi meri khushi ha, aur meri dua ha ke aap ki zindagi hamesha khushiyon, kamyabi aur sukoon se bhari rahy. Allah Tala aap ko lambi umar, sehat-e-kamila aur tamam achay khwab poory karne ki barkat ata farmaye. Ameen.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Meri hamesha yeh dua aur khwahish ha ke mein aap ke sath aane wali bohot si salgirahain manaoon aur hamesha aap ko aise hi hanste muskurate daikhoon.
          </p>

          <div style={{ textAlign: 'right', marginTop: '1.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1rem' }}>
            <p style={{ color: 'var(--champagne-light)', fontSize: '1.15rem', fontStyle: 'italic' }}>
              With All My Love, Always,
            </p>
            <p style={{ color: 'var(--soft-blush)', fontWeight: 700, fontSize: '1.3rem', marginTop: '0.2rem' }}>
              Aap ki Jhalo Rani — Maria ❤️
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-luxury-primary"
            style={{ fontSize: '0.95rem', padding: '0.75rem 2rem' }}
          >
            Close Letter ❤️
          </button>
        </div>
      </div>
    </div>
  );
};
