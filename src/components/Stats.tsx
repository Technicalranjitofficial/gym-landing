"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { label: "Years of Service",      value: 5,   suffix: "+", icon: "🏆", desc: "Building champions since 2019" },
  { label: "Certified Trainers",    value: 10,  suffix: "+", icon: "💪", desc: "Expert coaches at your service" },
  { label: "Happy Members",         value: 786, suffix: "+", icon: "🔥", desc: "Lives transformed & counting" },
  { label: "Customer Satisfaction", value: 95,  suffix: "%", icon: "⚡", desc: "Our members love the results" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { damping: 30, stiffness: 80 });

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, motionVal, value]);

  useEffect(() => {
    return springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
  }, [springVal, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111111] py-16 md:py-20 px-4 md:px-20 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.03) 40px,
            rgba(255,255,255,0.03) 80px
          )`
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top border light */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent origin-left"
      />

      {/* Stats grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-3 py-8 px-4 group cursor-default"
          >
            {/* Vertical divider */}
            {i < stats.length - 1 && (
              <div className="absolute right-0 top-[20%] bottom-[20%] w-px bg-white/10 hidden md:block" />
            )}

            {/* Hover bg */}
            <div className="absolute inset-2 rounded-2xl bg-white/0 group-hover:bg-white/5 transition-all duration-500" />

            {/* Icon */}
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              className="text-2xl md:text-3xl relative z-10"
            >
              {stat.icon}
            </motion.span>

            {/* Number */}
            <div className="relative z-10 text-center">
              <div className="text-4xl md:text-[52px] font-bold text-white leading-none tabular-nums">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mt-2 origin-left"
              />
            </div>

            {/* Label */}
            <span className="relative z-10 text-[#EEEEEE] text-xs md:text-sm font-semibold tracking-widest uppercase text-center">
              {stat.label}
            </span>

            {/* Description */}
            <span className="relative z-10 text-white/30 text-xs text-center leading-relaxed hidden md:block">
              {stat.desc}
            </span>

            {/* Hover glow dot */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/0 group-hover:bg-white/60 transition-all duration-500 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </motion.div>
        ))}
      </div>

      {/* Bottom border light */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-right"
      />
    </section>
  );
}
