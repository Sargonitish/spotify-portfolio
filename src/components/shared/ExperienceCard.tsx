"use client";

import { motion } from "framer-motion";
import { Circle, Clock } from "lucide-react";
import type { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({
  experience,
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      <div
        className="absolute left-[7px] top-2 bottom-0 w-px"
        style={{ backgroundColor: "var(--border-color)" }}
      />
      <div className="absolute left-0 top-2">
        <Circle
          className="w-4 h-4"
          style={{ color: "var(--accent)", fill: "var(--accent)" }}
        />
      </div>
      <div
        className="p-4 rounded-md transition-colors duration-200"
        style={{ backgroundColor: "var(--bg-card)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bg-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bg-card)";
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
          <h3
            className="font-bold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {experience.role}
          </h3>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--accent)" }}
          >
            @ {experience.company}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <Clock className="w-3 h-3" style={{ color: "var(--text-subtext)" }} />
          <span
            className="text-xs"
            style={{ color: "var(--text-subtext)" }}
          >
            {experience.duration}
          </span>
        </div>
        <ul className="space-y-1">
          {experience.responsibilities.map((item, i) => (
            <li
              key={i}
              className="text-xs pl-3 relative leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="absolute left-0 top-[5px] w-1 h-1 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
