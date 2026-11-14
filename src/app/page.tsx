"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/hooks/useTheme";
import { AudioPlayerProvider } from "@/hooks/useAudioPlayer";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import TopBar from "@/components/layout/TopBar";
import NowPlaying from "@/components/layout/NowPlaying";
import ScrollProgress from "@/components/ui/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import LazySection from "@/components/shared/LazySection";
import { portfolioData } from "@/data/portfolio";

// Code splitting & lazy loading below-the-fold sections for instant initial load
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  ssr: false,
});
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  ssr: false,
});
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  ssr: false,
});
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"), {
  ssr: false,
});
const CertificationsSection = dynamic(() => import("@/components/sections/CertificationsSection"), {
  ssr: false,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  ssr: false,
});

// Code splitting & lazy loading client-only background / overlay components
const ParticleBackground = dynamic(() => import("@/components/ui/ParticleBackground"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const PortfolioWrapped = dynamic(() => import("@/components/ui/PortfolioWrapped"), {
  ssr: false,
});

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = `${portfolioData.name} | ${portfolioData.role}`;
  }, []);

  return (
    <AudioPlayerProvider>
      <ScrollProgress />
      <ParticleBackground />
      <CustomCursor />
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <MainContent>
        <TopBar />
        <HeroSection />
        <LazySection minHeight="550px">
          <AboutSection />
        </LazySection>
        <LazySection minHeight="700px">
          <SkillsSection />
        </LazySection>
        <LazySection minHeight="800px">
          <ProjectsSection />
        </LazySection>
        <LazySection minHeight="650px">
          <ExperienceSection />
        </LazySection>
        <LazySection minHeight="500px">
          <CertificationsSection />
        </LazySection>
        <LazySection minHeight="600px">
          <ContactSection />
        </LazySection>
      </MainContent>
      <NowPlaying />
      <PortfolioWrapped />
    </AudioPlayerProvider>
  );
}
