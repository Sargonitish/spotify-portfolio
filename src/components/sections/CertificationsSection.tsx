"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import CertificationCard from "@/components/shared/CertificationCard";
import { portfolioData } from "@/data/portfolio";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <span
              className="w-1.5 h-6 rounded-full inline-block"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span style={{ color: "var(--text-primary)" }}>Certifications</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {portfolioData.certifications.map((cert, i) => (
              <CertificationCard key={cert.id} certification={cert} index={i} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
