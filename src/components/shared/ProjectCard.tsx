"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative rounded-md overflow-hidden cursor-pointer"
      style={{ backgroundColor: "var(--bg-card)" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="relative aspect-video overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${getColor(
              index
            )}, ${getColor(index + 1)})`,
          }}
        >
          <span className="text-4xl font-bold opacity-20 select-none">
            {project.title.charAt(0)}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <Play className="w-5 h-5 text-white ml-0.5" />
          </motion.div>
        </div>
      </div>
      <div className="p-4">
        <h3
          className="font-bold text-sm mb-1 truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-xs mb-3 line-clamp-2 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: "var(--bg-hover)",
                color: "var(--text-secondary)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--accent)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function getColor(index: number): string {
  const colors = [
    "#1db954",
    "#1ed760",
    "#e13300",
    "#ff4632",
    "#bc5900",
    "#dc8a00",
    "#006b54",
    "#00a376",
  ];
  return colors[index % colors.length];
}
