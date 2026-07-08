"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60]"
      style={{ backgroundColor: "var(--border-color)" }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{ width: `${progress}%`, backgroundColor: "var(--accent)" }}
      />
    </div>
  );
}
