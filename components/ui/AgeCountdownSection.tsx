'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  calculateAgeBreakdown,
  calculateNextBirthdayCountdown,
  DEFAULT_TIMEZONE,
  AgeBreakdown,
  CountdownBreakdown,
} from '@/lib/ageCalculator';
import { Clock, Calendar, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AgeCountdownSection: React.FC = () => {
  const [ageData, setAgeData] = useState<AgeBreakdown | null>(null);
  const [countdownData, setCountdownData] = useState<CountdownBreakdown | null>(null);
  const confettiFiredRef = useRef(false);

  useEffect(() => {
    // Immediate calculation using accurate Asia/Karachi time
    const update = () => {
      const now = new Date();
      const age = calculateAgeBreakdown(now);
      const countdown = calculateNextBirthdayCountdown(now);
      setAgeData(age);
      setCountdownData(countdown);

      // Trigger subtle celebration confetti once when birthday begins/is active
      if (countdown.isToday && !confettiFiredRef.current) {
        confettiFiredRef.current = true;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#d4af37', '#b80a32', '#f8c8d2', '#ffffff'],
        });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!ageData || !countdownData) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--champagne-light)' }}>Calculating cosmic timeline...</p>
      </div>
    );
  }

  // Determine section heading
  const sectionHeading = countdownData.isToday
    ? `Happy ${ageData.years}th Birthday, Talal! ❤️`
    : countdownData.status === 'next_birthday'
    ? `${ageData.years} Years of Being You — A Lifetime of Beautiful Moments`
    : `27 Years of Being You — A Lifetime of Beautiful Moments`;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Heading Block */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            color: 'var(--champagne-light)',
            marginBottom: '1rem',
          }}
        >
          <Calendar size={15} />
          <span>DOB: 17 October 1999 • {DEFAULT_TIMEZONE.name}</span>
        </div>

        <h2
          className="gold-gradient-text"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
            marginBottom: '0.8rem',
            lineHeight: 1.2,
          }}
        >
          {sectionHeading}
        </h2>
        <p
          className="font-serif-elegant"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            color: 'var(--soft-blush)',
            fontStyle: 'italic',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          &ldquo;Har second ki apni ek kahani hai, aur meri har kahani mein aap hain, Meri Jan. ❤️&rdquo;
        </p>
      </div>

      {/* Part A: Upcoming Birthday Countdown / Celebratory Message Banner */}
      <div
        className="glass-panel-glow"
        style={{
          padding: '1.75rem',
          marginBottom: '2rem',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at top, rgba(148, 10, 42, 0.4) 0%, rgba(14, 8, 17, 0.85) 75%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--champagne-gold)',
            marginBottom: '1.2rem',
            fontSize: '0.95rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          <Sparkles size={18} />
          {countdownData.isToday
            ? '🎉 TODAY IS YOUR SPECIAL DAY! 🎉'
            : countdownData.status === 'next_birthday'
            ? `Next Birthday In ❤️ (17 October ${countdownData.targetBirthdayYear})`
            : `Countdown to 27th Birthday (17 October ${countdownData.targetBirthdayYear})`}
        </div>

        {/* When Birthday is Active (17 October 00:00:00 to 23:59:59 PKT): Celebratory Message */}
        {countdownData.isToday ? (
          <div style={{ padding: '1rem 0' }}>
            <h3
              className="crimson-gradient-text"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              🎂 HAPPY BIRTHDAY, TALAL! ❤️
            </h3>

            <p
              className="font-serif-elegant"
              style={{
                color: 'var(--warm-ivory)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
                lineHeight: 1.6,
                fontStyle: 'italic',
                maxWidth: '680px',
                margin: '0 auto 1.2rem auto',
              }}
            >
              &ldquo;Today is your special day! May your universe always be filled with happiness, love, and beautiful memories.&rdquo;
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.4rem',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '9999px',
                color: 'var(--champagne-light)',
                fontSize: '0.95rem',
              }}
            >
              <Heart size={16} fill="var(--champagne-gold)" />
              <span>Meri Jan, aap ki khushi meri sab se badi khushi ha! ❤️</span>
            </div>
          </div>
        ) : (
          /* Pre-Birthday or Next-Birthday Live Countdown Grid */
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                maxWidth: '540px',
                margin: '0 auto',
              }}
            >
              {[
                { label: 'Days', val: countdownData.days },
                { label: 'Hours', val: countdownData.hours },
                { label: 'Minutes', val: countdownData.minutes },
                { label: 'Seconds', val: countdownData.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '1rem',
                    padding: '1rem 0.5rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif-title)',
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                      fontWeight: 700,
                      color: 'var(--champagne-light)',
                      lineHeight: 1,
                      marginBottom: '0.3rem',
                    }}
                  >
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--muted-ivory)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {countdownData.status === 'next_birthday' && (
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--soft-blush)',
                  marginTop: '1.2rem',
                  fontStyle: 'italic',
                }}
              >
                Counting down to your {countdownData.targetAge}th birthday celebration on 17 October {countdownData.targetBirthdayYear}! ✨
              </p>
            )}
          </div>
        )}
      </div>

      {/* Part B: Live Total Elapsed Lifetime Counters */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            paddingBottom: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="#d4af37" />
            <h3
              style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '1.15rem',
                color: 'var(--warm-ivory)',
              }}
            >
              Total Lived Time Since 17 Oct 1999
            </h3>
          </div>
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--champagne-gold)',
              background: 'rgba(212, 175, 55, 0.1)',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
            }}
          >
            Live Updating
          </span>
        </div>

        {/* Highlight Age Pill */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'rgba(148, 10, 42, 0.2)',
            borderRadius: '1rem',
            border: '1px solid rgba(148, 10, 42, 0.4)',
          }}
        >
          <span style={{ fontSize: '0.9rem', color: 'var(--soft-blush)' }}>Current Age: </span>
          <span
            style={{
              fontFamily: 'var(--font-serif-title)',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: 'var(--champagne-light)',
              marginLeft: '0.5rem',
            }}
          >
            {ageData.years} Years {ageData.months > 0 ? `& ${ageData.months} Months` : ''}
          </span>
        </div>

        {/* Elapsed Breakdown Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.8rem',
          }}
        >
          {[
            { label: 'Completed Years', val: ageData.years.toLocaleString() },
            { label: 'Calendar Months', val: (ageData.years * 12 + ageData.months).toLocaleString() },
            { label: 'Total Elapsed Days', val: ageData.totalDays.toLocaleString() },
            { label: 'Total Elapsed Hours', val: ageData.totalHours.toLocaleString() },
            { label: 'Total Minutes', val: ageData.totalMinutes.toLocaleString() },
            { label: 'Live Seconds', val: ageData.totalSeconds.toLocaleString() },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '0.75rem',
                padding: '0.8rem 0.6rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif-title)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--champagne-gold)',
                  marginBottom: '0.2rem',
                }}
              >
                {stat.val}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted-ivory)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
