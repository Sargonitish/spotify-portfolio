// Web Audio API Synthesizer & Sound FX Engine (zero external audio file dependencies)

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private loopInterval: number | null = null;
  private volume = 0.5;
  private muted = false;
  private analyser: AnalyserNode | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public getVisualizerData(): number[] {
    if (!this.analyser || !this.isPlaying) {
      return [0.15, 0.1, 0.2, 0.15];
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    // Extract 4-5 frequency bands for Spotify equalizer bars
    return [
      Math.max(0.15, (dataArray[1] || 40) / 255),
      Math.max(0.2, (dataArray[3] || 70) / 255),
      Math.max(0.25, (dataArray[6] || 110) / 255),
      Math.max(0.15, (dataArray[9] || 50) / 255),
    ];
  }

  public playNote(freq: number, duration: number, type: OscillatorType = "sine", timeOffset = 0, gainLevel = 0.12) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime + timeOffset;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter for warm lofi sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // AudioContext policy catch
    }
  }

  public playChord(frequencies: number[], duration = 2.4) {
    frequencies.forEach((f, i) => {
      this.playNote(f, duration, i % 2 === 0 ? "sine" : "triangle", i * 0.04, 0.08);
    });
  }

  public startMusic() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Lofi progression: Fmaj7 -> G6 -> Em7 -> Am7
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 329.63], // G6
      [164.81, 196.0, 246.94, 329.63], // Em7
      [220.0, 261.63, 329.63, 392.0],  // Am7
    ];

    let chordIndex = 0;
    const playNext = () => {
      if (!this.isPlaying) return;
      this.playChord(chords[chordIndex], 2.8);
      // Add subtle bass note
      this.playNote(chords[chordIndex][0] / 2, 2.5, "sine", 0, 0.15);
      chordIndex = (chordIndex + 1) % chords.length;
    };

    playNext();
    this.loopInterval = window.setInterval(playNext, 3000);
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.loopInterval !== null) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.muted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.muted;
  }

  public isSoundMuted(): boolean {
    return this.muted;
  }

  // Micro-interaction sound effects
  public playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  public playChime() {
    if (this.muted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playNote(freq, 0.4, "sine", idx * 0.06, 0.05);
    });
  }

  public playSuccess() {
    if (this.muted) return;
    this.init();
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      this.playNote(freq, 0.35, "sine", idx * 0.07, 0.06);
    });
  }
}

export const audioEngine = new AudioEngine();
