"use client";

import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import NowPlaying from "@/components/layout/NowPlaying";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ParticleBackground from "@/components/ui/ParticleBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "John Doe | Full Stack Developer & AI Enthusiast";
  }, []);

  return (
    <>
      <ScrollProgress />
      <ParticleBackground />
      <CustomCursor />
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <MainContent>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </MainContent>
      <NowPlaying />
    </>
  );
}
