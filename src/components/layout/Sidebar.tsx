"use client";

import { useState } from "react";
import {
  Home,
  User,
  Code,
  Folder,
  Briefcase,
  Award,
  Mail,
  Menu,
  X,
  Music,
  Heart,
  Library,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { navItems, portfolioData } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const iconMap: Record<string, LucideIcon> = {
  Home,
  User,
  Code,
  Folder,
  Briefcase,
  Award,
  Mail,
};

interface SidebarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Sidebar({ theme, toggleTheme }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { likedTrackIds, setWrappedOpen } = useAudioPlayer();

  const handleNav = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile menu trigger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3.5 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center md:hidden glass border shadow-md"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
        aria-label="Open menu"
      >
        <Menu className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
      </button>

      {/* Desktop Spotify Sidebar */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-[90px] w-[240px] z-40 border-r select-none transition-colors"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Spotify Logo Header */}
        <div className="p-5 pb-3">
          <a
            href="#home"
            onClick={() => setActive("#home")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <Music className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-black text-sm tracking-tight block" style={{ color: "var(--text-primary)" }}>
                Spotify Dev
              </span>
              <span className="text-[10px] font-bold text-[#1db954] block -mt-0.5">
                PRO PORTFOLIO
              </span>
            </div>
          </a>
        </div>

        {/* Main Section Navigation */}
        <nav className="px-3 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="w-full flex items-center gap-3.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                    style={{
                      color: isActive ? "#ffffff" : "var(--text-secondary)",
                      backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    <Icon
                      className="w-4 h-4 shrink-0"
                      style={{
                        color: isActive ? "var(--accent)" : "inherit",
                      }}
                    />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Your Library Section */}
        <div className="flex-1 px-3 pt-3 flex flex-col min-h-0 border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between px-2 mb-2">
            <div className="flex items-center gap-2">
              <Library className="w-4 h-4 text-neutral-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Your Library
              </span>
            </div>
            {likedTrackIds.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#1db954] text-white">
                {likedTrackIds.length}
              </span>
            )}
          </div>

          <div className="space-y-1 flex-1 overflow-y-auto scrollbar-none pr-1">
            {/* Liked Songs Playlist */}
            <button
              onClick={() => handleNav("#projects")}
              className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition-colors group"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center shadow shrink-0">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate group-hover:text-[#1db954] transition-colors" style={{ color: "var(--text-primary)" }}>
                  Liked Projects
                </p>
                <p className="text-[10px] text-neutral-400 truncate">
                  Playlist &middot; {likedTrackIds.length} items
                </p>
              </div>
            </button>

            {/* Certifications Shortcut */}
            <button
              onClick={() => handleNav("#certifications")}
              className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition-colors group"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow shrink-0">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate group-hover:text-[#1db954] transition-colors" style={{ color: "var(--text-primary)" }}>
                  Verified Credentials
                </p>
                <p className="text-[10px] text-neutral-400 truncate">
                  Certificates &middot; {portfolioData.certifications.length} verified
                </p>
              </div>
            </button>

            {/* Career Albums Shortcut */}
            <button
              onClick={() => handleNav("#experience")}
              className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition-colors group"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow shrink-0">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate group-hover:text-[#1db954] transition-colors" style={{ color: "var(--text-primary)" }}>
                  Work Discography
                </p>
                <p className="text-[10px] text-neutral-400 truncate">
                  Experience &middot; {portfolioData.experiences.length} albums
                </p>
              </div>
            </button>
          </div>

          {/* Wrapped Promo Pill */}
          <div className="pt-2 pb-2">
            <button
              onClick={() => setWrappedOpen(true)}
              className="w-full p-2.5 rounded-xl text-left bg-gradient-to-r from-emerald-900/60 to-purple-900/60 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-extrabold text-[#1db954] uppercase tracking-wider block">
                  Wrapped 2026
                </span>
                <span className="text-xs font-bold text-white group-hover:text-[#1db954] transition-colors block">
                  See Your Stats
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            </button>
          </div>
        </div>

        {/* Footer with Theme Toggle */}
        <div className="p-3 border-t flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
          <span className="text-xs font-semibold text-neutral-400">Theme</span>
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/75 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="fixed left-0 top-0 bottom-0 w-[280px] z-50 md:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-out"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderRight: "1px solid var(--border-color)",
            }}
          >
              <div className="flex items-center justify-between p-5 pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <Music className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-sm" style={{ color: "var(--text-primary)" }}>
                    Spotify Dev
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
                >
                  <X className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
                </button>
              </div>

              <nav className="flex-1 px-3 py-2 overflow-y-auto">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = iconMap[item.icon];
                    const isActive = active === item.href;
                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => handleNav(item.href)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors"
                          style={{
                            color: isActive ? "#ffffff" : "var(--text-secondary)",
                            backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
                          }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{
                              color: isActive ? "var(--accent)" : "inherit",
                            }}
                          />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 pt-4 border-t border-neutral-700/50 space-y-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setWrappedOpen(true);
                    }}
                    className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-900 to-purple-900 text-white font-bold text-xs flex items-center justify-between"
                  >
                    <span>Developer Wrapped 2026</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </nav>

              <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-xs font-semibold text-neutral-400">Theme</span>
                <ThemeToggle theme={theme} toggle={toggleTheme} />
              </div>
            </aside>
          </>
        )}

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-[76px] left-0 right-0 z-30 border-t flex items-center justify-around px-2 py-1.5 glass"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        {navItems.slice(0, 5).map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = active === item.href;
          return (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-md transition-colors"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
