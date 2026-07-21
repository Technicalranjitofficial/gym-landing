"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // fast progress to 80, then wait, then finish
    const t1 = setInterval(() => {
      setProgress((p) => {
        if (p >= 80) { clearInterval(t1); return 80; }
        return p + 4;
      });
    }, 40);

    const t2 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    }, 1200);

    return () => { clearInterval(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Animated dumbbell icon */}
            <motion.div
              animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
              className="text-6xl select-none"
            >
              🏋️
            </motion.div>

            <div className="text-center">
              <h1 className="text-white text-3xl font-black tracking-wider uppercase">FitFlex</h1>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">Elite Gym</p>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-white rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <p className="text-white/20 text-xs tracking-widest">
              {progress < 100 ? "LOADING..." : "LET'S GO 💪"}
            </p>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 text-white/5 text-8xl font-black select-none">FX</div>
          <div className="absolute bottom-6 right-6 text-white/5 text-8xl font-black select-none">GYM</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
