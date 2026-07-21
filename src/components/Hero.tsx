"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const words = ["STRONGER", "FASTER", "BETTER", "UNSTOPPABLE"];

// Countdown target — 3 days from a fixed reference so it's consistent
const TARGET_DATE = new Date("2026-07-25T00:00:00");

function useCountdown() {
  const [time, setTime] = useState({ d: 3, h: 12, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const particles = [
  { id: 0,  x: 12,  y: 34,  size: 3,   duration: 4.2, delay: 0.5  },
  { id: 1,  x: 25,  y: 67,  size: 2,   duration: 5.1, delay: 1.2  },
  { id: 2,  x: 38,  y: 22,  size: 4,   duration: 3.8, delay: 0.8  },
  { id: 3,  x: 52,  y: 78,  size: 2.5, duration: 4.5, delay: 2.1  },
  { id: 4,  x: 71,  y: 45,  size: 3.5, duration: 3.2, delay: 0.3  },
  { id: 5,  x: 84,  y: 12,  size: 2,   duration: 5.5, delay: 1.7  },
  { id: 6,  x: 93,  y: 88,  size: 4,   duration: 4.0, delay: 0.1  },
  { id: 7,  x: 7,   y: 55,  size: 3,   duration: 3.6, delay: 2.5  },
  { id: 8,  x: 61,  y: 8,   size: 2,   duration: 4.8, delay: 1.0  },
  { id: 9,  x: 44,  y: 91,  size: 3.5, duration: 3.3, delay: 0.6  },
  { id: 10, x: 18,  y: 72,  size: 2.5, duration: 5.0, delay: 1.9  },
  { id: 11, x: 79,  y: 38,  size: 4,   duration: 4.3, delay: 0.4  },
  { id: 12, x: 33,  y: 15,  size: 2,   duration: 3.7, delay: 2.2  },
  { id: 13, x: 56,  y: 60,  size: 3,   duration: 4.6, delay: 0.9  },
  { id: 14, x: 88,  y: 26,  size: 2.5, duration: 3.4, delay: 1.5  },
  { id: 15, x: 4,   y: 82,  size: 3.5, duration: 5.2, delay: 0.2  },
  { id: 16, x: 48,  y: 48,  size: 2,   duration: 4.1, delay: 2.8  },
  { id: 17, x: 67,  y: 18,  size: 4,   duration: 3.9, delay: 1.3  },
  { id: 18, x: 22,  y: 95,  size: 3,   duration: 4.7, delay: 0.7  },
  { id: 19, x: 76,  y: 63,  size: 2.5, duration: 3.5, delay: 1.6  },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const countdown = useCountdown();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // cycle through power words
  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((p) => (p + 1) % words.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // mouse parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full h-[100svh] min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-bg.png"
          alt="Gym background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -80, -160],
              x: [0, p.id % 2 === 0 ? 15 : -15],
              opacity: [0, 0.6, 0],
              scale: [1, 1.3, 0.5],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Diagonal light beam */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.08, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 6 }}
        style={{
          background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
        }}
      />

      {/* Mouse parallax image layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="absolute bottom-0 right-0 w-[55%] h-full opacity-20">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover object-right" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 px-4 md:px-[60px] w-full max-w-[1550px] mx-auto"
      >
        <div className="flex items-center justify-between gap-8">
        <div className="max-w-[600px] flex flex-col gap-8 pt-24 md:pt-32 pb-24 md:pb-32">

          {/* Headline */}
          <div className="flex flex-col gap-0">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-[80px] font-bold leading-[1.1] text-white tracking-tight">
                Elevate
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-[80px] font-bold leading-[1.1] text-white tracking-tight">
                Your
              </h1>
            </motion.div>

            {/* Cycling power word — own line, fixed height */}
            <div className="relative overflow-hidden w-full" style={{ height: "clamp(56px, 9vw, 96px)" }}>
              {words.map((word, i) => (
                <motion.h1
                  key={word}
                  className="absolute inset-0 text-5xl md:text-[80px] font-bold leading-[1.1] gradient-text tracking-tight"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: i === wordIndex ? "0%" : i < wordIndex ? "-110%" : "110%",
                    opacity: i === wordIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.h1>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-[80px] font-bold leading-[1.1] text-white/80 tracking-tight animate-text-flicker">
                Workout
              </h1>
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[#BDBDBD] text-base md:text-lg leading-relaxed max-w-[420px]"
          >
            Join thousands who've transformed their lives. Expert coaches,
            cutting-edge equipment, and a community that pushes you beyond limits.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="ripple-btn relative inline-flex items-center gap-2 bg-white text-[#212121] font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <span>Start Training</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-medium text-sm px-8 py-4 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/80"
            >
              Watch Our Story
              <span className="w-5 h-5 rounded-full border border-white/60 flex items-center justify-center text-xs">▶</span>
            </Link>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-5 pt-2"
          >
            <span className="text-white/40 text-xs uppercase tracking-widest">Follow us</span>
            <div className="w-8 h-px bg-white/20" />
            {[
              { src: "/images/twitter.svg", label: "Twitter" },
              { src: "/images/facebook.svg", label: "Facebook" },
              { src: "/images/instagram.svg", label: "Instagram" },
            ].map((s, i) => (
              <motion.a
                key={s.label}
                href="#"
                aria-label={s.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.3, rotate: 10 }}
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/60 transition-all"
              >
                <Image src={s.src} alt={s.label} width={16} height={16} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT SIDE: Now Open + Countdown Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col items-center gap-5 mt-24"
        >
          {/* NOW OPEN card */}
          <div className="relative bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl px-8 py-6 flex flex-col items-center gap-3 min-w-[240px] animate-pulse-glow">
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-white/20"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
              />
              <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">Status</span>
            </div>
            <p className="text-white font-black text-3xl tracking-tight">NOW OPEN</p>
            <p className="text-white/40 text-xs font-medium uppercase tracking-widest">24 hours · 7 days</p>
          </div>

          {/* COUNTDOWN card */}
          <div className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl px-8 py-7 flex flex-col items-center gap-4 min-w-[240px]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Offer Ends In</p>
            </div>

            {/* Big digit blocks */}
            <div className="flex items-end gap-2">
              {[
                { val: countdown.d, label: "Days" },
                { val: countdown.h, label: "Hrs" },
                { val: countdown.m, label: "Min" },
                { val: countdown.s, label: "Sec" },
              ].map((unit, i) => (
                <div key={unit.label} className="flex items-end gap-1.5">
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-white/10 border border-white/15 rounded-xl w-14 h-14 flex items-center justify-center">
                      <motion.span
                        key={unit.val}
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-white font-black text-2xl tabular-nums"
                      >
                        {String(unit.val).padStart(2, "0")}
                      </motion.span>
                    </div>
                    <span className="text-white/30 text-[9px] font-bold uppercase tracking-wider">{unit.label}</span>
                  </div>
                  {i < 3 && <span className="text-white/30 font-bold text-xl mb-7">:</span>}
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="w-full bg-white text-[#111] font-black text-sm py-3 rounded-xl text-center hover:bg-white/90 transition-colors hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Claim Offer →
            </Link>
          </div>
        </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-white"
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "40%" }}
          />
        </div>
      </motion.div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10 hidden md:flex"
      >
        <div className="flex items-stretch w-full">
          {[
            { label: "Members", value: "786+" },
            { label: "Trainers", value: "10+" },
            { label: "Programs", value: "25+" },
            { label: "Satisfaction", value: "95%" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex-1 bg-black/50 backdrop-blur-md border-t border-r border-white/10 last:border-r-0 px-6 py-4 flex flex-col gap-0.5 hover:bg-white/10 transition-colors"
            >
              <span className="text-white font-bold text-xl">{stat.value}</span>
              <span className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
