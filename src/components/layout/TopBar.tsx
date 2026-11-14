"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function TopBar() {
  const { isMuted, toggleMute, setWrappedOpen } = useAudioPlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? {
        projects: portfolioData.projects.filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        skills: portfolioData.skills.filter((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }
    : null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setSearchFocused(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 px-4 md:px-8 flex items-center justify-between glass border-b transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Navigation Arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.history.back()}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
          style={{ backgroundColor: "var(--bg-hover)" }}
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
        </button>
        <button
          onClick={() => window.history.forward()}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
          style={{ backgroundColor: "var(--bg-hover)" }}
          aria-label="Go forward"
        >
          <ChevronRight className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
        </button>

        {/* Search Bar with Dropdown */}
        <div ref={searchRef} className="relative ml-2 w-44 sm:w-64 md:w-72">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: searchFocused ? "var(--accent)" : "var(--border-color)",
            }}
          >
            <Search className="w-4 h-4 shrink-0" style={{ color: "var(--text-subtext)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="What do you want to explore?"
              className="w-full bg-transparent text-xs outline-none"
              style={{ color: "var(--text-primary)" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X className="w-3.5 h-3.5" style={{ color: "var(--text-subtext)" }} />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {searchFocused && searchResults && (
            <div
              className="animate-fade-in-up absolute left-0 right-0 top-12 rounded-lg p-3 shadow-xl border z-50 max-h-80 overflow-y-auto"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
                {searchResults.projects.length === 0 && searchResults.skills.length === 0 ? (
                  <p className="text-xs text-center py-4" style={{ color: "var(--text-subtext)" }}>
                    No results found for &quot;{searchQuery}&quot;
                  </p>
                ) : (
                  <div className="space-y-3">
                    {searchResults.projects.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider mb-1.5" style={{ color: "var(--accent)" }}>
                          Projects
                        </p>
                        <div className="space-y-1">
                          {searchResults.projects.map((proj) => (
                            <button
                              key={proj.id}
                              onClick={() => scrollTo("projects")}
                              className="w-full text-left p-1.5 rounded text-xs flex items-center justify-between hover:opacity-80 transition-opacity"
                              style={{ backgroundColor: "var(--bg-card)" }}
                            >
                              <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                                {proj.title}
                              </span>
                              <span className="text-[10px]" style={{ color: "var(--text-subtext)" }}>
                                {proj.category}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {searchResults.skills.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider mb-1.5" style={{ color: "var(--accent)" }}>
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {searchResults.skills.map((skill) => (
                            <button
                              key={skill.id}
                              onClick={() => scrollTo("skills")}
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                              style={{
                                backgroundColor: "var(--bg-hover)",
                                color: "var(--text-primary)",
                              }}
                            >
                              {skill.name} ({skill.proficiency}%)
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      {/* Right Action Icons: Wrapped, Sound & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Wrapped Easter Egg Button */}
        <button
          onClick={() => setWrappedOpen(true)}
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md overflow-hidden group transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #1db954, #8b5cf6)",
          }}
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="hidden sm:inline">Portfolio Wrapped</span>
          <span className="sm:hidden">Wrapped</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Audio FX Mute/Unmute */}
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: "var(--bg-hover)" }}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4" style={{ color: "var(--accent)" }} />
          )}
        </button>

        {/* GitHub / Profile Pill */}
        <a
          href={portfolioData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border transition-all hover:scale-105"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {portfolioData.name[0]}
          </div>
          <span className="text-xs font-semibold hidden md:inline" style={{ color: "var(--text-primary)" }}>
            {portfolioData.name}
          </span>
          <Github className="w-3.5 h-3.5" style={{ color: "var(--text-subtext)" }} />
        </a>
      </div>
    </header>
  );
}
