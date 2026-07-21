"use client";

import { motion } from "framer-motion";

const items = [
  "💪 NO PAIN NO GAIN",
  "🔥 TRAIN HARD OR GO HOME",
  "⚡ PUSH YOUR LIMITS",
  "🏆 CHAMPIONS ARE MADE HERE",
  "💯 CONSISTENCY IS KEY",
  "🥊 STRONGER EVERY DAY",
  "🎯 FOCUS. GRIND. SUCCEED",
  "🚀 UNLEASH YOUR POTENTIAL",
  "💎 ELITE TRAINING ZONE",
  "🔑 YOUR TRANSFORMATION STARTS TODAY",
];

// duplicate for seamless loop
const doubled = [...items, ...items];

export default function MarqueeTicker() {
  return (
    <div className="relative bg-[#111111] border-y border-white/8 py-3.5 overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#111111] to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#111111] to-transparent pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="flex gap-0 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase px-6">
              {item}
            </span>
            <span className="text-white/20 text-xs">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
