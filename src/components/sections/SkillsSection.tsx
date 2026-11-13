"use client";

import { useState } from "react";
import { TrendingUp, BarChart3, Clock, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SkillRow from "@/components/shared/SkillRow";
import SearchBar from "@/components/ui/SearchBar";
import { portfolioData } from "@/data/portfolio";

export default function SkillsSection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rank" | "proficiency">("proficiency");

  const categories = [
    "All",
    ...Array.from(new Set(portfolioData.skills.map((s) => s.category))),
  ];

  const filtered = portfolioData.skills
    .filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) =>
      sortBy === "proficiency"
        ? b.proficiency - a.proficiency
        : a.id - b.id
    );

  return (
    <section id="skills" className="px-4 sm:px-8 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black flex items-center gap-3">
                <span
                  className="w-2 h-8 rounded-full inline-block"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span style={{ color: "var(--text-primary)" }}>Technical Repertoire</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1db954] text-white">
                  Top Charts
                </span>
              </h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--text-subtext)" }}>
                Ranked by production mastery & hands-on development time
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() =>
                  setSortBy((p) => (p === "proficiency" ? "rank" : "proficiency"))
                }
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                {sortBy === "proficiency" ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#1db954]" />
                ) : (
                  <BarChart3 className="w-3.5 h-3.5 text-[#1db954]" />
                )}
                {sortBy === "proficiency" ? "Most Proficient" : "Default Track Order"}
              </button>
            </div>
          </div>

          {/* Search & Genre Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
                  style={{
                    backgroundColor:
                      selectedCategory === cat ? "var(--accent)" : "var(--bg-hover)",
                    color:
                      selectedCategory === cat ? "#ffffff" : "var(--text-secondary)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <SearchBar onSearch={setSearch} placeholder="Filter tracks..." />
            </div>
          </div>

          {/* Spotify Song Table Container */}
          <div
            className="rounded-xl border overflow-hidden shadow-lg"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Table Header Row */}
            <div
              className="px-4 py-3 border-b flex items-center gap-4 text-xs font-bold uppercase tracking-wider"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-subtext)",
              }}
            >
              <span className="w-6 text-center">#</span>
              <span className="w-9" />
              <span className="flex-1">Title & Genre</span>
              <span className="hidden sm:block flex-1 max-w-xs">Mastery Level</span>
              <span className="w-10 text-right">
                <Clock className="w-3.5 h-3.5 inline" />
              </span>
            </div>

            {/* Table Body */}
            <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
              {filtered.length > 0 ? (
                filtered.map((skill, i) => (
                  <SkillRow key={skill.id} skill={skill} index={i} />
                ))
              ) : (
                <div className="py-16 text-center">
                  <p className="text-sm font-medium" style={{ color: "var(--text-subtext)" }}>
                    No technical skills found matching &quot;{search}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
