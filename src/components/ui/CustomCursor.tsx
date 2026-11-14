"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const isFinePointerRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('a, button, [role="button"], input, select, textarea, label, .cursor-pointer')
      );
      setIsPointer(isInteractive);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    // Only activate custom cursor on devices with a fine pointer (mouse/trackpad), not touchscreens
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    isFinePointerRef.current = hasFinePointer;
    if (!hasFinePointer) return;

    setMounted(true);
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    document.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [moveCursor]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--accent)",
          opacity: visible ? 1 : 0,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid var(--accent)",
          opacity: visible ? 0.6 : 0,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </>
  );
}
