"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, LayoutGrid, List, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ProjectCard from "@/components/shared/ProjectCard";
import { portfolioData } from "@/data/portfolio";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const categories = [
  "All",
  ...Array.from(new Set(portfolioData.projects.map((p) => p.category))),
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const filtered =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="px-4 sm:px-8 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black flex items-center gap-3">
                <span
                  className="w-2 h-8 rounded-full inline-block"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span style={{ color: "var(--text-primary)" }}>Featured Discography</span>
              </h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--text-subtext)" }}>
                Albums, releases, and full-stack software products
              </p>
            </div>

            {/* View Mode Switcher */}
            <div
              className="flex items-center p-1 rounded-lg border gap-1 self-end sm:self-auto"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid" ? "bg-[#1db954] text-white" : "text-neutral-400 hover:text-white"
                }`}
                aria-label="Grid View"
                title="Album Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list" ? "bg-[#1db954] text-white" : "text-neutral-400 hover:text-white"
                }`}
                aria-label="List View"
                title="Tracklist View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Genre / Category Filter Pills */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? portfolioData.projects.length
                  : portfolioData.projects.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: isActive ? "var(--accent)" : "var(--bg-hover)",
                    color: isActive ? "#ffffff" : "var(--text-secondary)",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {cat}
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded-full"
                    style={{
                      backgroundColor: isActive ? "rgba(255,255,255,0.25)" : "var(--bg-card)",
                      color: isActive ? "#ffffff" : "var(--text-subtext)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Projects Content Rendering */}
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key={`grid-${activeCategory}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            ) : (
              /* Compact Tracklist View */
              <motion.div
                key={`list-${activeCategory}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                {filtered.map((project, i) => {
                  const isCurrent = currentTrack.id === `project-${project.id}` && isPlaying;
                  return (
                    <div
                      key={project.id}
                      onClick={() =>
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
                        })
                      }
                      className="group flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-white/5 cursor-pointer transition-colors"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-6 text-xs font-bold text-neutral-500 group-hover:text-[#1db954]">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-sm font-bold truncate flex items-center gap-2"
                            style={{
                              color: isCurrent ? "var(--accent)" : "var(--text-primary)",
                            }}
                          >
                            {project.title}
                            {isCurrent && (
                              <span className="flex items-end gap-0.5 h-3 w-3">
                                <span className="w-0.5 bg-[#1db954] h-full animate-bounce" />
                                <span className="w-0.5 bg-[#1db954] h-2/3 animate-bounce delay-75" />
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-neutral-400 truncate">
                            {project.technologies.join(" • ")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                          {project.category}
                        </span>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-bold text-[#1db954] hover:underline"
                        >
                          Demo
                        </a>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Folder className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-subtext)" }} />
              <p className="text-sm" style={{ color: "var(--text-subtext)" }}>
                No albums released in this category yet
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
