/**
 * Ambient Romantic Melody Synthesizer (Web Audio API)
 * Plays a warm, gentle, cinematic ambient progression when no local MP3 file is present.
 * Zero external dependencies, pure native browser audio.
 */

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private intervalId: any = null;
  private masterGain: GainNode | null = null;

  private chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00], // G6
  ];
  private currentChordIndex = 0;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public play() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isRunning = true;
    this.triggerChord();

    // Loop through gentle chords every 3.8 seconds
    this.intervalId = setInterval(() => {
      if (this.isRunning) {
        this.triggerChord();
      }
    }, 3800);
  }

  private triggerChord() {
    if (!this.ctx || !this.masterGain || !this.isRunning) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine + gentle triangle for warm Rhodes/chime sound
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Micro detune for celestial shimmer
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      const delayTime = idx * 0.12; // Arpeggiated soft strum
      const noteStartTime = now + delayTime;

      // Filter for warm soft romantic tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + idx * 200, noteStartTime);

      noteGain.gain.setValueAtTime(0.0001, noteStartTime);
      noteGain.gain.exponentialRampToValueAtTime(0.08, noteStartTime + 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + 3.4);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(noteStartTime);
      osc.stop(noteStartTime + 3.6);
    });
  }

  public pause() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const ambientMusicEngine = new AmbientMusicEngine();
