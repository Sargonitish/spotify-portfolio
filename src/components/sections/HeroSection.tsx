"use client";

import { useState, useMemo } from "react";
import {
  Play,
  Pause,
  Check,
  UserPlus,
  MoreHorizontal,
  Download,
  Mail,
  Sparkles,
  Flame,
  Clock,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { audioEngine } from "@/utils/audioEngine";

export default function HeroSection() {
  const { name, role, introduction, projects } = portfolioData;
  const { isPlaying, togglePlay, playTrack, currentTrack } = useAudioPlayer();
  const [following, setFollowing] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleFollow = () => {
    setFollowing(!following);
    if (!following) {
      audioEngine.playSuccess();
    } else {
      audioEngine.playClick();
    }
  };

  // Top 5 Popular "Tracks" (Flagship projects/skills)
  const popularTracks = useMemo(() => projects.slice(0, 5).map((p, idx) => ({
    id: `project-${p.id}`,
    title: p.title,
    artist: name,
    album: p.category,
    duration: 180 + p.id * 15,
    plays: (980420 - idx * 123450).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    category: p.category,
    technologies: p.technologies,
    github: p.github,
    live: p.live,
    description: p.description,
  })), [projects, name]);

  return (
    <section id="home" className="relative pb-12 overflow-hidden">
      {/* Spotify Artist Panoramic Banner */}
      <div
        className="relative pt-20 pb-12 px-4 sm:px-8 md:px-12 flex flex-col justify-end min-h-[380px] sm:min-h-[460px] overflow-hidden transition-colors"
        style={{
          background: "linear-gradient(180deg, rgba(29,185,84,0.35) 0%, rgba(18,18,18,0.85) 75%, var(--bg-primary) 100%)",
        }}
      >
        {/* Ambient glow blobs - optimized with static blur for GPU performance */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-2xl opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <div
          className="absolute top-10 right-10 w-80 h-80 rounded-full blur-2xl opacity-15 pointer-events-none"
          style={{ backgroundColor: "#8b5cf6" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Verified Artist Pill */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 text-white stroke-[3]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow">
              Verified Developer
            </span>
            <span className="hidden sm:inline-block text-white/50 text-xs">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-white/80">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              1,420,892 Monthly Listeners
            </span>
          </div>

          {/* Artist Name & Title - Instant paint for LCP with smooth CSS upward reveal */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight drop-shadow-md mb-2">
              {name}
            </h1>
            <p className="text-lg sm:text-2xl font-bold text-white/90 drop-shadow mb-4">
              {role}
            </p>
            <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed mb-6">
              {introduction}
            </p>
          </div>

          {/* Action Row: Giant Play Button, Follow & Options */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Giant Green Play Button */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl relative group transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: "var(--accent)" }}
              aria-label={isPlaying ? "Pause Portfolio" : "Play Portfolio"}
            >
              {isPlaying && (
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              )}
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current relative z-10" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current ml-1 relative z-10" />
              )}
            </button>

            {/* Follow Button */}
            <button
              onClick={handleFollow}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase border transition-all duration-200 flex items-center gap-2 ${
                following
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/40 hover:border-white hover:scale-105"
              }`}
            >
              {following ? (
                <>
                  <Check className="w-4 h-4" /> Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Follow
                </>
              )}
            </button>

            {/* Contact / Hire */}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-white/40 text-white hover:border-white transition-all hover:scale-105 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Contact
            </a>

            {/* Resume Download */}
            <a
              href={portfolioData.resumeUrl}
              download
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-white/40 text-white hover:border-white transition-all hover:scale-105 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Resume
            </a>

            {/* Three Dots More Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal className="w-6 h-6" />
              </button>

              {showMore && (
                <div
                  className="absolute left-0 bottom-12 rounded-lg p-2 shadow-2xl border z-30 w-44 space-y-1"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <a
                    href={portfolioData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-1.5 text-xs font-medium rounded hover:bg-white/10 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    GitHub Profile
                  </a>
                  <a
                    href={portfolioData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-1.5 text-xs font-medium rounded hover:bg-white/10 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spotify "Popular Tracks" Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Sparkles className="w-5 h-5 text-[#1db954]" />
          Popular Releases
        </h2>

        <div
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          {popularTracks.map((track, i) => {
            const isThisTrack = currentTrack.id === track.id && isPlaying;
            return (
              <div
                key={track.id}
                className="group flex items-center justify-between px-4 py-3 cursor-pointer border-b last:border-b-0 transition-colors hover:bg-[var(--bg-hover)]"
                style={{ borderColor: "var(--border-color)" }}
                onClick={() => playTrack(track)}
              >
                {/* Index / Play Button */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="w-6 text-center text-sm font-bold text-white/50 group-hover:text-transparent relative shrink-0">
                    <span className="group-hover:hidden">{i + 1}</span>
                    <button
                      className="absolute inset-0 hidden group-hover:flex items-center justify-center"
                      aria-label="Play track"
                    >
                      <Play className="w-4 h-4 text-white fill-current" />
                    </button>
                  </div>

                  {/* Artwork / Icon */}
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center font-bold text-sm text-white shrink-0 shadow"
                    style={{
                      background: `linear-gradient(135deg, ${getColor(i)}, ${getColor(i + 1)})`,
                    }}
                  >
                    {track.title[0]}
                  </div>

                  {/* Track Info */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-sm font-bold truncate flex items-center gap-2"
                      style={{
                        color: isThisTrack ? "var(--accent)" : "var(--text-primary)",
                      }}
                    >
                      {track.title}
                      {isThisTrack && (
                        <span className="flex items-end gap-0.5 h-3 w-3">
                          <span className="w-0.5 bg-[#1db954] h-full animate-bounce" />
                          <span className="w-0.5 bg-[#1db954] h-2/3 animate-bounce delay-75" />
                          <span className="w-0.5 bg-[#1db954] h-4/5 animate-bounce delay-150" />
                        </span>
                      )}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--text-subtext)" }}>
                      {track.technologies.slice(0, 3).join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Plays count & duration */}
                <div className="hidden sm:flex items-center gap-8 text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                  <span suppressHydrationWarning>{track.plays} streams</span>
                  <div className="flex items-center gap-1 w-12 justify-end">
                    <Clock className="w-3 h-3" />
                    <span>3:{15 + i * 12}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getColor(index: number): string {
  const colors = [
    "#1db954",
    "#1ed760",
    "#2e77d0",
    "#e91429",
    "#f59b23",
    "#af2896",
    "#8b5cf6",
  ];
  return colors[index % colors.length];
}
