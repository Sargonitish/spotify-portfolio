"use client";

import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  theme: "dark" | "light";
  toggle: () => void;
}

export default function ThemeToggle({ theme, toggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
      style={{ backgroundColor: "var(--bg-hover)" }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
      ) : (
        <Moon className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
      )}
    </motion.button>
  );
}
