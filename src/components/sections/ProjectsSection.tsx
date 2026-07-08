"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Filter } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ProjectCard from "@/components/shared/ProjectCard";
import { portfolioData } from "@/data/portfolio";

const categories = [
  "All",
  ...Array.from(new Set(portfolioData.projects.map((p) => p.category))),
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <span
              className="w-1.5 h-6 rounded-full inline-block"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span style={{ color: "var(--text-primary)" }}>Projects</span>
          </h2>

          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 shrink-0" style={{ color: "var(--text-subtext)" }} />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200"
                style={{
                  backgroundColor:
                    activeCategory === cat ? "var(--accent)" : "var(--bg-hover)",
                  color:
                    activeCategory === cat
                      ? "#ffffff"
                      : "var(--text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Folder className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-subtext)" }} />
              <p className="text-sm" style={{ color: "var(--text-subtext)" }}>
                No projects in this category yet
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
