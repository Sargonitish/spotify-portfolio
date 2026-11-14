"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);

  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    // Adapt particle count to device form factor: light on mobile, smooth on desktop
    const maxParticles = isMobile ? 20 : 50;
    const divisor = isMobile ? 35000 : 20000;
    const count = Math.min(Math.max(Math.floor((width * height) / divisor), 10), maxParticles);

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.35 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Honor user accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let maxDist = window.innerWidth < 768 ? 75 : 105;
    let maxDistSq = maxDist * maxDist;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      maxDist = canvas.width < 768 ? 75 : 105;
      maxDistSq = maxDist * maxDist;
      initParticles(canvas.width, canvas.height);
    };

    resize();

    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", debouncedResize, { passive: true });

    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const len = particles.length;

      // Draw and move points
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(29, 185, 84, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connecting lines with squared-distance pre-check to eliminate unnecessary sqrt
      for (let i = 0; i < len; i++) {
        const a = particles[i];
        for (let j = i + 1; j < len; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(29, 185, 84, ${
              Math.min(a.opacity, b.opacity) * (1 - dist / maxDist)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      if (!isRunningRef.current) return;
      renderFrame();
      animFrameRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;
      if (prefersReducedMotion || window.innerWidth < 768) {
        // Draw single static frame on mobile devices and reduced motion to preserve 100% main thread smoothness
        renderFrame();
      } else {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
    };

    // Pause loop when document is hidden (background tab)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimer);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
