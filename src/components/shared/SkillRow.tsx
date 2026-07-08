"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Skill } from "@/types";

interface SkillRowProps {
  skill: Skill;
  index: number;
}

export default function SkillRow({ skill, index }: SkillRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-200"
      style={{ backgroundColor: "var(--bg-primary)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-primary)";
      }}
    >
      <span
        className="w-6 text-xs font-bold shrink-0"
        style={{ color: "var(--text-subtext)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className="flex items-center justify-center w-8 h-8 rounded shrink-0"
        style={{ backgroundColor: "var(--bg-hover)" }}
      >
        <Play className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-primary)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {skill.name}
        </p>
        <p className="text-xs" style={{ color: "var(--text-subtext)" }}>
          {skill.category} &middot; {skill.experience}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs">
        <div
          className="flex-1 h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--bg-hover)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.proficiency}%` }}
            transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </div>
      </div>
      <span
        className="text-xs font-mono w-10 text-right shrink-0"
        style={{ color: "var(--accent)" }}
      >
        {skill.proficiency}%
      </span>
    </motion.div>
  );
}
