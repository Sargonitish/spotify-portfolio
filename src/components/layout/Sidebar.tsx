"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  type LucideIcon,
} from "lucide-react";
import { navItems } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/ThemeToggle";

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

  const handleNav = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center md:hidden"
        style={{ backgroundColor: "var(--bg-card)" }}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
      </button>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-[90px] w-[240px] z-40 border-r"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="p-6 pb-4">
          <a href="#home" onClick={() => setActive("#home")} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              Portfolio
            </span>
          </a>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    <Icon
                      className="w-5 h-5 shrink-0"
                      style={{
                        color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      }}
                    />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] z-50 md:hidden flex flex-col"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderRight: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <Music className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    Portfolio
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
                </button>
              </div>
              <nav className="flex-1 px-3 overflow-y-auto">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = iconMap[item.icon];
                    const isActive = active === item.href;
                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => handleNav(item.href)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200"
                          style={{
                            color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                            backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
                          }}
                        >
                          <Icon
                            className="w-5 h-5 shrink-0"
                            style={{
                              color: isActive ? "var(--accent)" : "var(--text-secondary)",
                            }}
                          />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="p-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                <ThemeToggle theme={theme} toggle={toggleTheme} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-[72px] left-0 right-0 z-30 border-t flex items-center justify-around px-2 py-1"
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
              className="flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-md transition-colors"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
