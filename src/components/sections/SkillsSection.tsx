"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SkillRow from "@/components/shared/SkillRow";
import SearchBar from "@/components/ui/SearchBar";
import { portfolioData } from "@/data/portfolio";

export default function SkillsSection() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"rank" | "proficiency">("proficiency");

  const filtered = portfolioData.skills
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "proficiency"
        ? b.proficiency - a.proficiency
        : a.id - b.id
    );

  return (
    <section id="skills" className="px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <span
              className="w-1.5 h-6 rounded-full inline-block"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span style={{ color: "var(--text-primary)" }}>Top Skills</span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--accent)",
                color: "#fff",
              }}
            >
              This Month
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
            <SearchBar onSearch={setSearch} placeholder="Search skills..." />
            <button
              onClick={() =>
                setSortBy((p) => (p === "proficiency" ? "rank" : "proficiency"))
              }
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              style={{
                backgroundColor: "var(--bg-hover)",
                color: "var(--text-secondary)",
              }}
            >
              {sortBy === "proficiency" ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <BarChart3 className="w-3.5 h-3.5" />
              )}
              {sortBy === "proficiency" ? "By Rank" : "By Proficiency"}
            </button>
          </div>

          <div
            className="rounded-lg overflow-hidden border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="px-3 py-2 border-b flex items-center gap-3 text-xs font-medium"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-subtext)",
              }}
            >
              <span className="w-6 shrink-0">#</span>
              <span className="w-8 shrink-0" />
              <span className="flex-1">Skill</span>
              <span className="hidden sm:block flex-1 max-w-xs">Proficiency</span>
              <span className="w-10 text-right">%</span>
            </div>

            <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
              {filtered.length > 0 ? (
                filtered.map((skill, i) => (
                  <SkillRow key={skill.id} skill={skill} index={i} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm" style={{ color: "var(--text-subtext)" }}>
                    No skills found matching &quot;{search}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-2 text-xs"
            style={{ color: "var(--text-subtext)" }}
          >
            <BarChart3 className="w-3 h-3" />
            Showing {filtered.length} of {portfolioData.skills.length} skills
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
