"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { audioEngine } from "@/utils/audioEngine";
import { portfolioData } from "@/data/portfolio";

export interface Track {
  id: string | number;
  title: string;
  artist: string;
  album: string;
  duration: number; // seconds
  category?: string;
  github?: string;
  live?: string;
  technologies?: string[];
  description?: string;
}

const defaultTracks: Track[] = portfolioData.projects.map((p) => ({
  id: `project-${p.id}`,
  title: p.title,
  artist: portfolioData.name,
  album: p.category,
  duration: 180 + p.id * 15, // 3:00, 3:15, etc.
  category: p.category,
  github: p.github,
  live: p.live,
  technologies: p.technologies,
  description: p.description,
}));

interface AudioPlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: number; // seconds
  volume: number;
  isMuted: boolean;
  likedTrackIds: (string | number)[];
  visualizerLevels: number[];
  isWrappedOpen: boolean;
  isLyricsOpen: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (percentage: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleLike: (id: string | number) => void;
  setWrappedOpen: (open: boolean) => void;
  setLyricsOpen: (open: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(defaultTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [likedTrackIds, setLikedTrackIds] = useState<(string | number)[]>([]);
  const visualizerLevels = [0.4, 0.8, 0.5, 0.9];
  const [isWrappedOpen, setWrappedOpen] = useState(false);
  const [isLyricsOpen, setLyricsOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load liked tracks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("spotify-liked-tracks");
      if (stored) {
        setLikedTrackIds(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Track progress timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            return 0; // loop
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTrack.duration]);

  const playTrack = useCallback((track: Track) => {
    audioEngine.playChime();
    setCurrentTrack(track);
    setCurrentTime(0);
    audioEngine.startMusic();
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    audioEngine.playClick();
    const active = audioEngine.togglePlay();
    setIsPlaying(active);
  }, []);

  const nextTrack = useCallback(() => {
    audioEngine.playClick();
    const nextIdx = (trackIndex + 1) % defaultTracks.length;
    setTrackIndex(nextIdx);
    setCurrentTrack(defaultTracks[nextIdx]);
    setCurrentTime(0);
  }, [trackIndex]);

  const prevTrack = useCallback(() => {
    audioEngine.playClick();
    const prevIdx = (trackIndex - 1 + defaultTracks.length) % defaultTracks.length;
    setTrackIndex(prevIdx);
    setCurrentTrack(defaultTracks[prevIdx]);
    setCurrentTime(0);
  }, [trackIndex]);

  const seek = useCallback(
    (percentage: number) => {
      const newSec = Math.floor((percentage / 100) * currentTrack.duration);
      setCurrentTime(newSec);
      audioEngine.playClick();
    },
    [currentTrack.duration]
  );

  const setVolume = useCallback((val: number) => {
    setVolState(val);
    audioEngine.setVolume(val);
  }, []);

  const toggleMute = useCallback(() => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const toggleLike = useCallback((id: string | number) => {
    audioEngine.playClick();
    setLikedTrackIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem("spotify-liked-tracks", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const progress = currentTrack.duration > 0 ? (currentTime / currentTrack.duration) * 100 : 0;

  const contextValue = React.useMemo(
    () => ({
      currentTrack,
      isPlaying,
      progress,
      currentTime,
      volume,
      isMuted,
      likedTrackIds,
      visualizerLevels,
      isWrappedOpen,
      isLyricsOpen,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      seek,
      setVolume,
      toggleMute,
      toggleLike,
      setWrappedOpen,
      setLyricsOpen,
    }),
    [
      currentTrack,
      isPlaying,
      progress,
      currentTime,
      volume,
      isMuted,
      likedTrackIds,
      isWrappedOpen,
      isLyricsOpen,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      seek,
      setVolume,
      toggleMute,
      toggleLike,
      setWrappedOpen,
      setLyricsOpen,
    ]
  );

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
}
