"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronRight, ChevronLeft, Share2, Check, Award, Music, Code2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { audioEngine } from "@/utils/audioEngine";

export default function PortfolioWrapped() {
  const { isWrappedOpen, setWrappedOpen } = useAudioPlayer();
  const [slide, setSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const totalSlides = 5;

  useEffect(() => {
    if (isWrappedOpen) {
      setSlide(0);
      audioEngine.playChime();
    }
  }, [isWrappedOpen]);

  const handleNext = () => {
    if (slide < totalSlides - 1) {
      audioEngine.playClick();
      setSlide((s) => s + 1);
    } else {
      audioEngine.playSuccess();
      setWrappedOpen(false);
    }
  };

  const handlePrev = () => {
    if (slide > 0) {
      audioEngine.playClick();
      setSlide((s) => s - 1);
    }
  };

  const copyShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      audioEngine.playSuccess();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!isWrappedOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      >
        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-lg aspect-[9/14] sm:aspect-[9/13] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-8 text-white select-none border border-white/20"
          style={{
            background:
              slide === 0
                ? "linear-gradient(135deg, #09391C 0%, #121212 50%, #1DB954 100%)"
                : slide === 1
                ? "linear-gradient(135deg, #4A154B 0%, #121212 50%, #EC4899 100%)"
                : slide === 2
                ? "linear-gradient(135deg, #1E1B4B 0%, #121212 50%, #6366F1 100%)"
                : slide === 3
                ? "linear-gradient(135deg, #451A03 0%, #121212 50%, #F59E0B 100%)"
                : "linear-gradient(135deg, #111827 0%, #1DB954 60%, #065F46 100%)",
          }}
        >
          {/* Top Progress Bars */}
          <div className="flex gap-1.5 w-full">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full overflow-hidden bg-white/20"
              >
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{
                    width: i < slide ? "100%" : i === slide ? "100%" : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={() => setWrappedOpen(false)}
            className="absolute top-8 right-6 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors z-20"
            aria-label="Close Wrapped"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Dynamic Slide Content */}
          <div className="my-auto py-4">
            {slide === 0 && (
              <motion.div
                key="slide-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase border border-white/20">
                  <Sparkles className="w-4 h-4 text-[#1db954]" />
                  2026 Developer Wrapped
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Ready to relive <br />
                  <span className="text-[#1db954]">{portfolioData.name}&apos;s</span> year in code?
                </h2>
                <p className="text-sm text-white/80 max-w-sm mx-auto">
                  You spent countless hours browsing high-performance web engineering. Let&apos;s see the chart-toppers.
                </p>
              </motion.div>
            )}

            {slide === 1 && (
              <motion.div
                key="slide-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-pink-300">
                  Your #1 Most Played Skill
                </p>
                <h2 className="text-4xl sm:text-5xl font-black text-pink-100">
                  {portfolioData.skills[0]?.name || "React"}
                </h2>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency Score</span>
                    <span className="font-bold text-[#1db954]">
                      {portfolioData.skills[0]?.proficiency || 95}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${portfolioData.skills[0]?.proficiency || 95}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-pink-400"
                    />
                  </div>
                  <p className="text-xs text-white/70">
                    Category: {portfolioData.skills[0]?.category} &middot; Experience: {portfolioData.skills[0]?.experience}
                  </p>
                </div>
              </motion.div>
            )}

            {slide === 2 && (
              <motion.div
                key="slide-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                  Discography Highlights
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-100">
                  {portfolioData.projects.length} Hit Projects
                </h2>
                <p className="text-sm text-white/80">
                  From real-time platforms to machine learning pipelines, here are the headline releases:
                </p>
                <div className="space-y-2">
                  {portfolioData.projects.slice(0, 3).map((p, idx) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-black/30 border border-white/10"
                    >
                      <span className="font-bold text-sm text-[#1db954]">#{idx + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">{p.title}</p>
                        <p className="text-[10px] text-white/60 truncate">
                          {p.technologies.slice(0, 3).join(" • ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {slide === 3 && (
              <motion.div
                key="slide-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-300" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Developer Persona Unlocked
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-amber-100">
                  The Full-Stack Alchemist
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm mx-auto">
                  You blend cutting-edge frontend animations with solid cloud architecture. When others see code, you hear music.
                </p>
              </motion.div>
            )}

            {slide === 4 && (
              <motion.div
                key="slide-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-center"
              >
                <h2 className="text-3xl font-black text-white">
                  That&apos;s a Wrap! 🎉
                </h2>
                <div className="p-4 rounded-xl bg-black/50 border border-white/20 text-left space-y-2">
                  <p className="text-xs font-bold text-[#1db954] uppercase tracking-wider">
                    {portfolioData.name}&apos;s 2026 Summary
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-white/5">
                      <span className="text-white/60 block text-[10px]">Top Skill</span>
                      <span className="font-bold">{portfolioData.skills[0]?.name}</span>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <span className="text-white/60 block text-[10px]">Projects</span>
                      <span className="font-bold">{portfolioData.projects.length} Albums</span>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <span className="text-white/60 block text-[10px]">Experience</span>
                      <span className="font-bold">{portfolioData.experiences.length} Positions</span>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <span className="text-white/60 block text-[10px]">Certificates</span>
                      <span className="font-bold">{portfolioData.certifications.length} Verified</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={copyShare}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                    {copied ? "Link Copied!" : "Share Wrapped"}
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setWrappedOpen(false)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1db954] text-white font-bold text-xs hover:scale-105 transition-all"
                  >
                    Get in Touch
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 z-10">
            <button
              onClick={handlePrev}
              disabled={slide === 0}
              className="flex items-center gap-1 text-xs font-semibold text-white/60 hover:text-white disabled:opacity-20 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-xs text-white/50 font-mono">
              {slide + 1} / {totalSlides}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-bold text-white transition-all hover:scale-105"
            >
              {slide === totalSlides - 1 ? "Done" : "Next"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
