"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  tag?: string;
}

const floatingParticles = [
  { x: 10, y: 30, size: 3, dur: 4, delay: 0   },
  { x: 85, y: 20, size: 2, dur: 5, delay: 0.8 },
  { x: 50, y: 70, size: 4, dur: 3, delay: 0.4 },
  { x: 25, y: 80, size: 2, dur: 6, delay: 1.2 },
  { x: 75, y: 60, size: 3, dur: 4, delay: 0.6 },
  { x: 90, y: 75, size: 2, dur: 5, delay: 1.5 },
];

export default function PageHeader({ title, subtitle, tag }: PageHeaderProps) {
  return (
    <section className="relative w-full min-h-[340px] md:min-h-[440px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated particles */}
      {floatingParticles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Diagonal grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Animated border beams */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent origin-left"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto py-16">
        {tag && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-white/30 text-xs font-bold uppercase tracking-[0.3em] mb-4"
          >
            {tag}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-[64px] font-black text-white leading-[1.05] tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/40 text-base md:text-xl mt-5 max-w-[560px] mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-white/60"
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ height: "40%" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
