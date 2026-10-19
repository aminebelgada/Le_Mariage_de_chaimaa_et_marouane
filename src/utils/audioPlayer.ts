/**
 * Wedding Audio Player with Support for:
 * 1. The user's uploaded song: "حسين الجسمي - فستانك الأبيض (زفة)" (YouTube ID: ARh_bhCqiiM)
 * 2. Web Audio Andalusian Oud Synthesizer Fallback
 * 3. Custom MP3 Audio URLs
 */

// Declare YouTube IFrame API window types
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: unknown }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: unknown) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  setVolume: (volume: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getPlayerState: () => number;
}

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume = 0.75;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;
  private ytPlayer: YTPlayerInstance | null = null;
  private ytReady = false;
  private currentMode: 'youtube' | 'synth' | 'custom' = 'youtube';
  private currentTrackTitle = 'حسين الجسمي - فستانك الأبيض (خطوة ورا خطوة)';
  private listeners: Array<() => void> = [];

  // Maqam Nahawand / Andalus scale frequencies (Hz):
  private notes = [261.63, 293.66, 311.13, 349.23, 392.0, 415.30, 466.16, 523.25, 587.33];

  private melodyPhrase = [
    { noteIdx: 4, dur: 0.6, delay: 0.0 },
    { noteIdx: 6, dur: 0.4, delay: 0.6 },
    { noteIdx: 7, dur: 1.0, delay: 1.0 },
    { noteIdx: 6, dur: 0.4, delay: 2.1 },
    { noteIdx: 5, dur: 0.4, delay: 2.5 },
    { noteIdx: 4, dur: 0.8, delay: 2.9 },
    { noteIdx: 3, dur: 0.5, delay: 3.8 },
    { noteIdx: 4, dur: 0.5, delay: 4.3 },
    { noteIdx: 5, dur: 0.7, delay: 4.8 },
    { noteIdx: 4, dur: 0.4, delay: 5.6 },
    { noteIdx: 3, dur: 0.4, delay: 6.0 },
    { noteIdx: 2, dur: 0.9, delay: 6.4 },
    { noteIdx: 1, dur: 0.5, delay: 7.4 },
    { noteIdx: 0, dur: 1.6, delay: 8.0 },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initYouTube();
    }
  }

  public subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private initYouTube() {
    // Check if script already inserted
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady();
      this.mountYouTubePlayer();
    };

    if (window.YT && window.YT.Player) {
      this.mountYouTubePlayer();
    }
  }

  private mountYouTubePlayer() {
    let container = document.getElementById('youtube-bg-audio-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'youtube-bg-audio-container';
      container.style.position = 'fixed';
      container.style.bottom = '-9999px';
      container.style.right = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0.001';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }

    const playerDiv = document.createElement('div');
    playerDiv.id = 'yt-player-element';
    container.appendChild(playerDiv);

    try {
      this.ytPlayer = new window.YT.Player('yt-player-element', {
        videoId: 'ARh_bhCqiiM', // حسين الجسمي - فستانك الأبيض
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: 'ARh_bhCqiiM',
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            this.ytReady = true;
            this.ytPlayer?.setVolume(Math.round(this.volume * 100));
            if (this.isPlaying && this.currentMode === 'youtube') {
              this.ytPlayer?.playVideo();
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              this.isPlaying = true;
              this.notify();
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              this.isPlaying = false;
              this.notify();
            }
          },
        },
      });
    } catch {
      this.ytReady = false;
    }
  }

  private initSynth() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  private playOudNote(freq: number, duration: number, when: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, when);

    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(0.25, when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, when + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(when);
    osc.stop(when + duration);
  }

  private scheduleSynthPhrase() {
    if (!this.ctx || !this.isPlaying || this.currentMode !== 'synth') return;
    const startTime = this.ctx.currentTime + 0.1;
    this.melodyPhrase.forEach((item) => {
      this.playOudNote(this.notes[item.noteIdx], item.dur * 1.4, startTime + item.delay);
    });

    this.timerId = window.setTimeout(() => {
      if (this.isPlaying && this.currentMode === 'synth') {
        this.scheduleSynthPhrase();
      }
    }, 12000);
  }

  public setMode(mode: 'youtube' | 'synth' | 'custom', customUrl?: string) {
    this.pause();
    this.currentMode = mode;
    if (mode === 'youtube') {
      this.currentTrackTitle = 'حسين الجسمي - فستانك الأبيض';
    } else if (mode === 'synth') {
      this.currentTrackTitle = 'معزوفة أندلسية مغربية (عود)';
    } else if (mode === 'custom' && customUrl) {
      this.customAudioUrl = customUrl;
      this.currentTrackTitle = 'موسيقى مخصصة';
    }
    this.play();
  }

  public async play(): Promise<boolean> {
    this.isPlaying = true;

    // Mode 1: YouTube (Song uploaded by user)
    if (this.currentMode === 'youtube') {
      if (this.ytPlayer && this.ytReady) {
        try {
          this.ytPlayer.playVideo();
          this.notify();
          return true;
        } catch {
          // fallback
        }
      }
    }

    // Mode 2: Custom URL
    if (this.currentMode === 'custom' && this.customAudioUrl) {
      try {
        if (!this.customAudio) {
          this.customAudio = new Audio(this.customAudioUrl);
          this.customAudio.loop = true;
          this.customAudio.volume = this.volume;
        }
        await this.customAudio.play();
        this.notify();
        return true;
      } catch {
        // fallback
      }
    }

    // Mode 3: Synth Fallback
    try {
      this.initSynth();
      if (this.ctx && this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      this.scheduleSynthPhrase();
      this.notify();
      return true;
    } catch {
      this.notify();
      return false;
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.ytPlayer) {
      try {
        this.ytPlayer.pauseVideo();
      } catch {
        // ignore
      }
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ytPlayer) {
      try {
        this.ytPlayer.setVolume(Math.round(this.volume * 100));
      } catch {
        // ignore
      }
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getTrackTitle(): string {
    return this.currentTrackTitle;
  }

  public getMode(): 'youtube' | 'synth' | 'custom' {
    return this.currentMode;
  }
}

export const andalusianAudio = new WeddingAudioPlayer();
