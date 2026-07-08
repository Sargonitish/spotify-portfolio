"use client";

import { Clock, Play } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ExperienceCard from "@/components/shared/ExperienceCard";
import { portfolioData } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <span
              className="w-1.5 h-6 rounded-full inline-block"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span style={{ color: "var(--text-primary)" }}>Listening History</span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--bg-hover)",
                color: "var(--text-subtext)",
              }}
            >
              <Clock className="w-3 h-3 inline mr-1" />
              {portfolioData.experiences.length} albums
            </span>
          </h2>

          <div
            className="rounded-lg overflow-hidden border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="space-y-0">
              {portfolioData.experiences.map((exp, i) => (
                <ExperienceCard key={exp.id} experience={exp} index={i} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-2 text-xs"
            style={{ color: "var(--text-subtext)" }}
          >
            <Play className="w-3 h-3" style={{ color: "var(--accent)" }} />
            Currently listening: {portfolioData.experiences[0]?.role} @{" "}
            {portfolioData.experiences[0]?.company}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
