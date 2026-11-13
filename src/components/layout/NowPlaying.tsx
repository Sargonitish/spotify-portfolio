"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  FileText,
  X,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function NowPlaying() {
  const {
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    volume,
    isMuted,
    likedTrackIds,
    visualizerLevels,
    isLyricsOpen,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleLike,
    setLyricsOpen,
  } = useAudioPlayer();

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const isLiked = likedTrackIds.includes(currentTrack.id);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    seek(percentage);
  };

  return (
    <>
      <footer
        className="fixed bottom-0 left-0 right-0 z-40 h-[76px] md:h-[90px] border-t px-3 md:px-6 flex items-center justify-between glass shadow-2xl transition-colors select-none"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Left: Track Info & Heart */}
        <div className="flex items-center gap-3 w-1/4 min-w-[150px] max-w-[280px]">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md"
            style={{
              background: "linear-gradient(135deg, var(--accent), #1ed760)",
            }}
          >
            {currentTrack.title.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-xs sm:text-sm font-bold truncate transition-colors hover:underline cursor-pointer"
              style={{ color: "var(--text-primary)" }}
              onClick={() => setLyricsOpen(true)}
            >
              {currentTrack.title}
            </p>
            <p className="text-[11px] truncate" style={{ color: "var(--text-subtext)" }}>
              {currentTrack.artist} &middot; {currentTrack.album}
            </p>
          </div>
          <button
            onClick={() => toggleLike(currentTrack.id)}
            className="hidden sm:flex transition-transform hover:scale-110"
            aria-label="Like current track"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-[#1db954] text-[#1db954]" : "text-neutral-400 hover:text-white"
              }`}
            />
          </button>
        </div>

        {/* Center: Playback Controls & Scrubber */}
        <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[560px] px-2 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`hidden sm:flex transition-colors ${
                isShuffle ? "text-[#1db954]" : "text-neutral-400 hover:text-white"
              }`}
              aria-label="Shuffle"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={prevTrack}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-md transition-all hover:bg-neutral-100"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black fill-current" />
              ) : (
                <Play className="w-4 h-4 text-black fill-current ml-0.5" />
              )}
            </motion.button>

            <button
              onClick={nextTrack}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`hidden sm:flex transition-colors ${
                isRepeat ? "text-[#1db954]" : "text-neutral-400 hover:text-white"
              }`}
              aria-label="Repeat"
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrubber Bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400 w-7 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              onClick={handleProgressBarClick}
              className="group relative flex-1 h-1 hover:h-2 rounded-full bg-neutral-700/60 cursor-pointer overflow-hidden transition-all duration-150"
            >
              <div
                className="h-full rounded-full transition-all duration-100 group-hover:bg-[#1db954]"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "var(--accent)",
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-neutral-400 w-7">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Right: Live Equalizer, Lyrics Button & Volume */}
        <div className="flex items-center justify-end gap-3 w-1/4 min-w-[120px] max-w-[280px]">
          {/* Live Jumping Audio Equalizer Bars */}
          <div className="hidden lg:flex items-end gap-1 h-5 w-6 mr-1" title="Sound Output Visualizer">
            {visualizerLevels.map((lvl, idx) => (
              <span
                key={idx}
                className="w-1 rounded-t-full transition-all duration-75"
                style={{
                  height: `${Math.max(15, Math.min(100, lvl * 100))}%`,
                  backgroundColor: isPlaying ? "var(--accent)" : "var(--text-subtext)",
                }}
              />
            ))}
          </div>

          {/* Lyrics / Story Button */}
          <button
            onClick={() => setLyricsOpen(!isLyricsOpen)}
            className={`p-1.5 rounded transition-colors ${
              isLyricsOpen ? "text-[#1db954]" : "text-neutral-400 hover:text-white"
            }`}
            aria-label="Lyrics & Code Narrative"
            title="Lyrics & Code Story"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-neutral-400 hover:text-white" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 sm:w-20 h-1 rounded-full accent-[#1db954] cursor-pointer"
            />
          </div>
        </div>
      </footer>

      {/* Spotify Lyrics / Code Narrative Drawer */}
      <AnimatePresence>
        {isLyricsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-[76px] md:bottom-[90px] right-4 z-40 w-full max-w-sm rounded-2xl p-6 shadow-2xl border backdrop-blur-xl"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1db954]" />
                <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  Project Lyrics & Architecture
                </h4>
              </div>
              <button
                onClick={() => setLyricsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-xs uppercase font-bold text-[#1db954]">
                  Now Featuring
                </p>
                <p className="text-base font-black" style={{ color: "var(--text-primary)" }}>
                  {currentTrack.title}
                </p>
                <p className="text-xs text-neutral-400">
                  {currentTrack.description || "Interactive full-stack application built with high scalability and test coverage."}
                </p>
              </div>

              {currentTrack.technologies && (
                <div>
                  <p className="text-xs font-semibold mb-1.5 text-neutral-400">
                    Stack Chords
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTrack.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#1db954]/20 text-[#1db954] border border-[#1db954]/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t" style={{ borderColor: "var(--border-color)" }}>
                {currentTrack.live && (
                  <a
                    href={currentTrack.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-full font-bold text-xs bg-[#1db954] text-white flex items-center justify-center gap-1.5 hover:scale-105 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Visit Live
                  </a>
                )}
                {currentTrack.github && (
                  <a
                    href={currentTrack.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full font-bold text-xs border flex items-center justify-center gap-1.5 hover:opacity-80 transition-opacity"
                    style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                  >
                    <GitBranch className="w-3.5 h-3.5" /> Repo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
