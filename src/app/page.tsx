"use client";

import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { AudioPlayerProvider } from "@/hooks/useAudioPlayer";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import TopBar from "@/components/layout/TopBar";
import NowPlaying from "@/components/layout/NowPlaying";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ParticleBackground from "@/components/ui/ParticleBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import PortfolioWrapped from "@/components/ui/PortfolioWrapped";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import { portfolioData } from "@/data/portfolio";

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
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </MainContent>
      <NowPlaying />
      <PortfolioWrapped />
    </AudioPlayerProvider>
  );
}
