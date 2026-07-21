"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 500, damping: 40 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40 });

  // Slower trailing dot
  const trailX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const trailY = useSpring(rawY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      window.removeEventListener("mouseover", over);
    };
  }, [rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:  hovering ? 40 : clicking ? 10 : 14,
            height: hovering ? 40 : clicking ? 10 : 14,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="rounded-full bg-white"
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:  hovering ? 60 : 32,
            height: hovering ? 60 : 32,
            opacity: hovering ? 0.6 : 0.25,
            borderColor: hovering ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="rounded-full border-2"
        />
      </motion.div>
    </>
  );
}
