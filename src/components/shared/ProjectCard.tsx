"use client";

import { useState, useRef, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Play, Pause, ExternalLink, GitBranch, Heart, Disc, Info, X } from "lucide-react";
import type { Project } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { playTrack, togglePlay, currentTrack, isPlaying, likedTrackIds, toggleLike } = useAudioPlayer();
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const isCurrent = currentTrack.id === `project-${project.id}` && isPlaying;
  const isLiked = likedTrackIds.includes(`project-${project.id}`);

  // 3D tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current || cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack({
        id: `project-${project.id}`,
        title: project.title,
        artist: "Lokesh",
        album: project.category,
        duration: 210 + project.id * 10,
        category: project.category,
        github: project.github,
        live: project.live,
        technologies: project.technologies,
        description: project.description,
      });
    }
  };

  const color1 = getColor(index);
  const color2 = getColor(index + 2);

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
        onClick={() => setModalOpen(true)}
        className="group relative rounded-xl p-4 border transition-all duration-300 hover:shadow-2xl hover:border-neutral-600/50 cursor-pointer overflow-visible flex flex-col justify-between"
      >
        {/* Album Artwork Container with Vinyl Record Slide-Out */}
        <div className="relative aspect-square w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center">
          {/* Vinyl Disc that slides out on hover */}
          <div
            className="absolute right-0 w-4/5 h-4/5 rounded-full bg-neutral-900 border-4 border-neutral-800 shadow-2xl transition-all duration-500 ease-out transform translate-x-0 opacity-0 group-hover:translate-x-10 group-hover:opacity-100 flex items-center justify-center z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #262626 20%, #171717 21%, #262626 40%, #171717 41%, #262626 60%, #171717 61%, #0a0a0a 100%)",
            }}
          >
            <div
              className={`w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center ${
                isCurrent ? "animate-spin-slow" : "group-hover:animate-spin-slow"
              }`}
              style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
            >
              <Disc className="w-5 h-5 text-white/80" />
            </div>
          </div>

          {/* Front Album Sleeve */}
          <div
            className="relative z-10 w-full h-full rounded-lg shadow-lg overflow-hidden flex flex-col justify-between p-4"
            style={{
              background: `linear-gradient(135deg, ${color1}, ${color2})`,
            }}
          >
            {/* Top Category Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-sm">
                {project.category}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(`project-${project.id}`);
                }}
                className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Like project"
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${
                    isLiked ? "fill-[#1db954] text-[#1db954]" : "text-white"
                  }`}
                />
              </button>
            </div>

            {/* Project Initial Big Letter */}
            <div className="my-auto text-center">
              <span className="text-6xl font-black text-white/30 select-none drop-shadow-md">
                {project.title.charAt(0)}
              </span>
            </div>

            {/* Spotify Green Play Button Hover Pill */}
            <div className="flex justify-end">
              <motion.button
                onClick={handlePlayClick}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ backgroundColor: "var(--accent)" }}
                aria-label={isCurrent ? "Pause" : "Play"}
              >
                {isCurrent ? (
                  <Pause className="w-5 h-5 text-white fill-current" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Project Meta Info */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3
              className="font-bold text-base truncate flex-1 group-hover:text-[#1db954] transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
            {isCurrent && (
              <span className="flex items-end gap-0.5 h-3 w-3 shrink-0">
                <span className="w-0.5 bg-[#1db954] h-full animate-bounce" />
                <span className="w-0.5 bg-[#1db954] h-2/3 animate-bounce delay-75" />
                <span className="w-0.5 bg-[#1db954] h-4/5 animate-bounce delay-150" />
              </span>
            )}
          </div>

          <p
            className="text-xs mb-3 line-clamp-2 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  color: "var(--text-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold opacity-60">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border-color)" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <GitBranch className="w-3.5 h-3.5" />
              Code
            </a>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className="flex items-center gap-1 text-xs font-semibold hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-subtext)" }}
              >
                <Info className="w-3.5 h-3.5" /> Info
              </button>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-bold transition-transform hover:scale-105"
                style={{ color: "var(--accent)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spotify Track Details Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl border"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "var(--bg-hover)" }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${color1}, ${color2})`,
                  }}
                >
                  {project.title.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1db954]">
                    {project.category} Album
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-subtext)" }}>
                    Overview
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-subtext)" }}>
                    Technologies & Instruments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          color: "var(--accent)",
                          border: "1px solid var(--border-color)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                <button
                  onClick={handlePlayClick}
                  className="flex-1 py-2.5 rounded-full font-bold text-xs text-white flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {isCurrent ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  {isCurrent ? "Pause Project Audio" : "Play Project in Player"}
                </button>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full font-bold text-xs border flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  <ExternalLink className="w-4 h-4" /> Live Site
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full font-bold text-xs border flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                >
                  <GitBranch className="w-4 h-4" /> Source
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(ProjectCard);

function getColor(index: number): string {
  const colors = [
    "#1db954",
    "#006450",
    "#2e77d0",
    "#e91429",
    "#f59b23",
    "#af2896",
    "#8b5cf6",
    "#1e3264",
  ];
  return colors[index % colors.length];
}
