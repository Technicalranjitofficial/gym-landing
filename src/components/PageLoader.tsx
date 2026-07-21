"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"xyz" | "gym" | "done">("xyz");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Show xyzbuilder.dev for 1.2s
    const t1 = setTimeout(() => setPhase("gym"), 1200);

    // Phase 2: Progress bar fills
    const t2 = setInterval(() => {
      setProgress((p) => {
        if (p >= 80) { clearInterval(t2); return 80; }
        return p + 5;
      });
    }, 40);

    const t3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setPhase("done"), 400);
    }, 1800);

    return () => { clearTimeout(t1); clearInterval(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* ── PHASE 1: xyzbuilder.dev intro ── */}
          <AnimatePresence mode="wait">
            {phase === "xyz" && (
              <motion.div
                key="xyz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-6 text-center px-4"
              >
                {/* Animated logo text */}
                <motion.div className="flex items-center gap-1 overflow-hidden">
                  {"xyzbuilder.dev".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`font-black text-3xl md:text-5xl tracking-tight ${
                        char === "." ? "text-white/30" : "text-white"
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="text-white/30 text-xs uppercase tracking-[0.4em] font-medium"
                >
                  Presents
                </motion.p>

                {/* Animated line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                  className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent origin-left"
                />
              </motion.div>
            )}

            {/* ── PHASE 2: Gym brand loading ── */}
            {phase === "gym" && (
              <motion.div
                key="gym"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6"
              >
                {/* Dumbbell */}
                <motion.div
                  animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                  className="text-5xl md:text-6xl select-none"
                >
                  🏋️
                </motion.div>

                <div className="text-center">
                  <h1 className="text-white text-3xl md:text-4xl font-black tracking-wider uppercase">
                    FitFlex
                  </h1>
                  <p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">
                    Elite Gym
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                <p className="text-white/20 text-xs tracking-widest uppercase">
                  {progress < 100 ? "Loading..." : "Let's Go 💪"}
                </p>

                {/* xyzbuilder credit below */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/15 text-[10px] tracking-[0.25em] uppercase mt-2"
                >
                  by xyzbuilder.dev
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner watermarks */}
          <div className="absolute top-6 left-6 text-white/[0.03] text-7xl font-black select-none">XYZ</div>
          <div className="absolute bottom-6 right-6 text-white/[0.03] text-7xl font-black select-none">GYM</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
