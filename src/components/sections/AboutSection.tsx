"use client";

import { motion } from "framer-motion";
import { Play, Pause, BookOpen, Heart, Target, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { portfolioData } from "@/data/portfolio";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function AboutSection() {
  const { name, role, bio, education, interests, careerGoals } = portfolioData;
  const { playTrack, togglePlay, currentTrack, isPlaying } = useAudioPlayer();

  const isCurrent = currentTrack.id === "about-me" && isPlaying;

  const handlePlayAbout = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack({
        id: "about-me",
        title: `${name} - Behind The Code`,
        artist: name,
        album: "Origins & Aspirations",
        duration: 240,
        category: "Biography",
        description: bio,
      });
    }
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section id="about" className="px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <span
              className="w-1.5 h-6 rounded-full inline-block"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span style={{ color: "var(--text-primary)" }}>About Me</span>
          </h2>

          <motion.div
            className="rounded-lg overflow-hidden border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="relative p-6 sm:p-8"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Album art */}
                <div className="shrink-0">
                  <div
                    onClick={handlePlayAbout}
                    className="relative w-full max-w-[200px] aspect-square rounded-md overflow-hidden group cursor-pointer shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, var(--accent), #1ed760)`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-black text-white/20 select-none">
                        {initials}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        {isCurrent ? (
                          <Pause className="w-6 h-6 text-white fill-current" />
                        ) : (
                          <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                        )}
                      </motion.div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-bold drop-shadow-lg">
                        {name}
                      </p>
                      <p className="text-white/70 text-[10px] drop-shadow-lg truncate">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Album info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-secondary)" }}>
                      About
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "var(--accent)", color: "#fff" }}>
                      Album
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <BookOpen className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Bio</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {bio}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <GraduationCap className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Education</h3>
                      </div>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {education}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Heart className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Interests</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {interests.map((interest) => (
                          <span
                            key={interest}
                            className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
                            style={{
                              backgroundColor: "var(--bg-hover)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Target className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Career Goals</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {careerGoals}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="px-6 sm:px-8 py-3 border-t flex items-center gap-4"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <span className="text-xs" style={{ color: "var(--text-subtext)" }}>
                {new Date().getFullYear() - 2021}+ years of experience
              </span>
              <span className="text-xs" style={{ color: "var(--accent)" }}>
                10+ projects completed
              </span>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
