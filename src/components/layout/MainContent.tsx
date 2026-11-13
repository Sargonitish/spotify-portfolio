"use client";

import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main
      className="relative min-h-screen pb-[140px] md:pb-[110px] md:ml-[240px]"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {children}
    </main>
  );
}
