"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Eye } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function HeroSection() {
  const { name, role, introduction } = portfolioData;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 pb-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-block"
        >
          <div
            className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4"
            style={{ borderColor: "var(--accent)" }}
          >
            <div
              className="w-full h-full flex items-center justify-center text-5xl font-bold select-none"
              style={{
                background: `linear-gradient(135deg, var(--accent), #1ed760)`,
                color: "white",
              }}
            >
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center border-2"
              style={{
                backgroundColor: "var(--accent)",
                borderColor: "var(--bg-primary)",
              }}
            >
              <span className="animate-pulse-ring absolute inset-0 rounded-full" style={{ borderColor: "var(--accent)" }} />
              <span className="text-white text-lg">✓</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p
            className="text-xs sm:text-sm font-medium mb-2 tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Portfolio
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Hi, I&apos;m{" "}
            <span
              className="inline-block"
              style={{ color: "var(--accent)" }}
            >
              {name}
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl font-medium mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {role}
          </p>
          <p
            className="text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ color: "var(--text-subtext)" }}
          >
            {introduction}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "var(--accent)",
              color: "#ffffff",
            }}
          >
            <Eye className="w-4 h-4" />
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 border"
            style={{
              borderColor: "var(--text-secondary)",
              color: "var(--text-primary)",
            }}
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
            }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown
            className="w-5 h-5"
            style={{ color: "var(--text-subtext)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
