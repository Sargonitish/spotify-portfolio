"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: string;
  className?: string;
}

export default function LazySection({
  children,
  minHeight = "600px",
  className = "",
}: LazySectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    // Pre-render content when user scrolls within 400px of the container
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={containerRef}
      className={`content-visibility-auto ${className}`}
      style={{ minHeight: shouldRender ? undefined : minHeight }}
    >
      {shouldRender ? children : null}
    </div>
  );
}
