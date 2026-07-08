"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink, Calendar } from "lucide-react";
import type { Certification } from "@/types";

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

export default function CertificationCard({
  certification,
  index,
}: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative rounded-md overflow-hidden cursor-pointer"
      style={{ backgroundColor: "var(--bg-card)" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="relative aspect-square overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${getColor(
              index
            )}, ${getColor(index + 2)})`,
          }}
        >
          <span className="text-5xl font-bold opacity-15 select-none">
            {certification.title.charAt(0)}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <Play className="w-6 h-6 text-white ml-0.5" />
          </motion.div>
        </div>
      </div>
      <div className="p-3">
        <h3
          className="font-bold text-xs mb-1 line-clamp-2 leading-relaxed"
          style={{ color: "var(--text-primary)" }}
        >
          {certification.title}
        </h3>
        <p
          className="text-[11px] font-medium mb-1.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {certification.organization}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" style={{ color: "var(--text-subtext)" }} />
            <span
              className="text-[10px]"
              style={{ color: "var(--text-subtext)" }}
            >
              {certification.date}
            </span>
          </div>
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink
              className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--accent)" }}
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function getColor(index: number): string {
  const colors = [
    "#1db954",
    "#e13300",
    "#bc5900",
    "#006b54",
    "#ff4632",
    "#dc8a00",
    "#00a376",
    "#1ed760",
  ];
  return colors[index % colors.length];
}
