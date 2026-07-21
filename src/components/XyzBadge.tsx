"use client";

import { motion } from "framer-motion";

export default function XyzBadge() {
  return (
    <motion.a
      href="https://xyzbuilder.dev"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2 bg-[#111111]/90 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 px-3 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    >
      {/* Animated dot */}
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"
      />
      <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
        xyzbuilder.dev
      </span>
    </motion.a>
  );
}
