"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const floatingIcons = [
  { emoji: "🏋️", x: "8%",  y: "20%", delay: 0,    duration: 4   },
  { emoji: "💪", x: "15%", y: "70%", delay: 0.8,  duration: 5   },
  { emoji: "⚡", x: "88%", y: "15%", delay: 0.4,  duration: 3.5 },
  { emoji: "🔥", x: "82%", y: "75%", delay: 1.2,  duration: 4.5 },
  { emoji: "🥊", x: "50%", y: "5%",  delay: 0.6,  duration: 5   },
];

export default function Coaches() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative bg-white py-16 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Floating gym icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none select-none hidden md:block"
          style={{ left: icon.x, top: icon.y }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: icon.duration, delay: icon.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Images with smooth swap-on-hover using Framer Motion */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full lg:w-[520px] h-[280px] md:h-[420px] flex-shrink-0 group/stack"
          >
            {/* Back image (coach-1) — scales up and comes forward on hover */}
            <motion.div
              initial={{ x: 12, y: -12 }}
              animate={inView ? { x: 12, y: -12 } : {}}
              whileHover={{ scale: 1.12, x: -8, y: 8, zIndex: 20, filter: "brightness(1.05)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="absolute top-0 left-0 w-[56%] h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10 cursor-pointer"
              style={{ willChange: "transform" }}
            >
              <Image src="/images/coach-1.png" alt="Coach" fill className="object-cover" />
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0.1 }}
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Front image (coach-2) — scales down and goes back on hover */}
            <motion.div
              initial={{ x: -8, y: 8 }}
              animate={inView ? { x: -8, y: 8 } : {}}
              whileHover={{ scale: 0.9, x: 12, y: -12, zIndex: 10, filter: "brightness(0.7)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="absolute top-0 right-0 w-[68%] h-full rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.25)] z-20 cursor-pointer"
              style={{ willChange: "transform" }}
            >
              <Image src="/images/coach-2.png" alt="Coach training" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 whitespace-nowrap z-30"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-heartbeat" />
              10+ Certified Coaches Available
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 md:gap-8 w-full mt-6 lg:mt-0"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-[#9E9E9E] text-xs font-bold uppercase tracking-[0.3em] block mb-3"
              >
                Are you looking for a Mentor?
              </motion.span>

              <h2 className="text-3xl md:text-[54px] font-black text-[#111111] leading-[1.05] tracking-tight">
                World-Class{" "}
                <span className="relative inline-block">
                  <span className="gradient-text-dark">Coaches</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#212121]/20 origin-left rounded-full"
                  />
                </span>
              </h2>
            </div>

            <p className="text-[#757575] text-base md:text-lg leading-relaxed max-w-[520px]">
              Our coaches aren't just trainers — they're life changers. With decades of combined experience
              across strength, cardio, nutrition, and mindset, they build programs uniquely tailored to{" "}
              <span className="text-[#212121] font-semibold">your body, your goals, your timeline.</span>
            </p>

            {/* Mini stats row */}
            <div className="flex gap-6 md:gap-10">
              {[
                { value: "10+", label: "Coaches" },
                { value: "500+", label: "Clients trained" },
                { value: "98%", label: "Success rate" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="text-2xl md:text-3xl font-black text-[#111111]">{s.value}</span>
                  <span className="text-[#9E9E9E] text-xs uppercase tracking-wide">{s.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="relative overflow-hidden inline-flex items-center gap-3 bg-[#111111] text-white font-bold text-sm px-8 py-4 rounded-xl group hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-shadow duration-300"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative">Explore Programs</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="relative text-base"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
