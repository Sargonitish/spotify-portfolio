"use client";

import { Music, Heart } from "lucide-react";

export default function NowPlaying() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 h-[72px] md:h-[90px] border-t flex items-center px-4"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-12 h-12 rounded flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <Music className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-medium truncate"
            style={{ color: "var(--text-primary)" }}
          >
            Now Playing
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--text-secondary)" }}
          >
            Building Amazing Projects
          </p>
        </div>
        <button className="hidden sm:flex ml-2" aria-label="Like">
          <Heart
            className="w-4 h-4 transition-colors hover:opacity-80"
            style={{ color: "var(--accent)" }}
          />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
        <div className="w-full max-w-[400px]">
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--bg-hover)" }}
          >
            <div className="h-full rounded-full relative overflow-hidden" style={{ width: "45%", backgroundColor: "var(--text-primary)" }}>
              <div
                className="absolute inset-0 animate-progress"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px]" style={{ color: "var(--text-subtext)" }}>
              1:23
            </span>
            <span className="text-[10px]" style={{ color: "var(--text-subtext)" }}>
              3:45
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-2 shrink-0 ml-2"
        style={{ color: "var(--text-secondary)" }}
      >
        <span className="hidden sm:inline text-xs">Available for work</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--accent)" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--accent)" }} />
        </span>
      </div>
    </footer>
  );
}
