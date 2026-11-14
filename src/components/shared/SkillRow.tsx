"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart } from "lucide-react";
import type { Skill } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface SkillRowProps {
  skill: Skill;
  index: number;
}

function SkillRow({ skill, index }: SkillRowProps) {
  const { playTrack, togglePlay, currentTrack, isPlaying, likedTrackIds, toggleLike } = useAudioPlayer();

  const isCurrent = currentTrack.id === `skill-${skill.id}` && isPlaying;
  const isLiked = likedTrackIds.includes(`skill-${skill.id}`);

  const handleRowClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack({
        id: `skill-${skill.id}`,
        title: `${skill.name} Mastery`,
        artist: "Lokesh",
        album: `${skill.category} Stack`,
        duration: 120 + skill.proficiency,
        category: skill.category,
        description: `Deep proficiency in ${skill.name} with ${skill.experience} of production experience.`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      onClick={handleRowClick}
      className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
        isCurrent ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      {/* Track Number / Play Icon / Equalizer */}
      <div className="w-6 text-center text-xs font-bold shrink-0 relative flex items-center justify-center">
        {isCurrent ? (
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className="w-0.5 bg-[#1db954] h-full animate-bounce" />
            <span className="w-0.5 bg-[#1db954] h-2/3 animate-bounce delay-75" />
            <span className="w-0.5 bg-[#1db954] h-4/5 animate-bounce delay-150" />
          </div>
        ) : (
          <>
            <span
              className="group-hover:hidden text-xs font-mono font-bold"
              style={{ color: "var(--text-subtext)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <button
              className="hidden group-hover:flex items-center justify-center text-white"
              aria-label="Play skill"
            >
              <Play className="w-3.5 h-3.5 fill-current text-white" />
            </button>
          </>
        )}
      </div>

      {/* Skill Icon / Avatar */}
      <div
        className="w-9 h-9 rounded flex items-center justify-center font-black text-xs text-white shrink-0 shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${getSkillColor(skill.category)}, #121212)`,
        }}
      >
        {skill.name.slice(0, 2).toUpperCase()}
      </div>

      {/* Skill Name & Category Genre */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-bold truncate transition-colors ${
            isCurrent ? "text-[#1db954]" : "text-white group-hover:text-[#1db954]"
          }`}
          style={{ color: isCurrent ? "var(--accent)" : "var(--text-primary)" }}
        >
          {skill.name}
        </p>
        <p className="text-xs truncate flex items-center gap-2" style={{ color: "var(--text-subtext)" }}>
          <span>{skill.category}</span>
          <span>•</span>
          <span>{skill.experience}</span>
        </p>
      </div>

      {/* Popularity / Proficiency Bar */}
      <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs">
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--bg-hover)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.proficiency}%` }}
            transition={{ duration: 0.8, delay: index * 0.04, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </div>
        <span className="text-xs font-mono font-bold w-10 text-right shrink-0" style={{ color: "var(--accent)" }}>
          {skill.proficiency}%
        </span>
      </div>

      {/* Favorite Heart & Simulated Track Duration */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(`skill-${skill.id}`);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Like skill"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "fill-[#1db954] text-[#1db954] opacity-100" : "text-neutral-400 hover:text-white"
            }`}
          />
        </button>

        <span className="text-xs font-mono w-10 text-right" style={{ color: "var(--text-subtext)" }}>
          {getFormattedDuration(skill.experience)}
        </span>
      </div>
    </motion.div>
  );
}

export default memo(SkillRow);

function getSkillColor(category: string): string {
  switch (category.toLowerCase()) {
    case "frontend":
      return "#3b82f6";
    case "backend":
      return "#10b981";
    case "language":
      return "#f59e0b";
    case "database":
      return "#8b5cf6";
    case "devops":
      return "#ec4899";
    case "ai":
      return "#06b6d4";
    default:
      return "#1db954";
  }
}

function getFormattedDuration(experience: string): string {
  const num = parseInt(experience, 10);
  if (isNaN(num)) return "3:00";
  return `${num}:00`;
}
