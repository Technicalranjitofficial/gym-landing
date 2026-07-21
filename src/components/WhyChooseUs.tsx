"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    icon: "🏋️",
    title: "Elite Equipment",
    description: "State-of-the-art machines and free weights from premium brands. Everything you need to crush your goals.",
    color: "from-white/10 to-white/5",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Trainers",
    description: "Our certified coaches have transformed hundreds of physiques. Your goals become their mission.",
    color: "from-white/10 to-white/5",
  },
  {
    icon: "📅",
    title: "Flexible Plans",
    description: "Morning bird or night owl — we're open 24/7. Train on your schedule, not ours.",
    color: "from-white/10 to-white/5",
  },
  {
    icon: "🔥",
    title: "Real Results",
    description: "Proven programs backed by science. See measurable change in strength, endurance and body composition.",
    color: "from-white/10 to-white/5",
  },
];

function TiltCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.04 : 1,
        z: hovered ? 40 : 0,
      }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative bg-[#111111] border border-white/8 rounded-2xl p-6 md:p-8 cursor-default overflow-hidden group"
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.y * 5}% ${50 + tilt.x * 5}%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
        }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/8 to-transparent rounded-bl-full" />
      </div>

      {/* Icon */}
      <motion.div
        animate={{ y: hovered ? -4 : 0, scale: hovered ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="text-3xl md:text-4xl mb-5 inline-block"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        {feature.icon}
      </motion.div>

      {/* Content */}
      <div style={{ transform: "translateZ(15px)" }}>
        <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
          {feature.title}
        </h3>
        <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors">
          {feature.description}
        </p>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent origin-left"
      />
    </motion.div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-[#0d0d0d] py-16 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Huge background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="text-[20vw] font-black text-white/[0.02] uppercase leading-none tracking-tighter whitespace-nowrap">
          WHY US
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-4"
          >
            Our Advantage
          </motion.span>

          <h2 className="text-3xl md:text-[54px] font-black text-white leading-[1.05] tracking-tight">
            Why{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Choose Us</span>
              {/* Underline stroke */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M0,8 Q75,2 150,8 Q225,14 300,8"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
              </motion.svg>
            </span>
          </h2>

          <p className="text-white/40 text-base md:text-lg leading-relaxed mt-6 max-w-[560px] mx-auto">
            We don&apos;t just build bodies — we build confidence, discipline, and a lifestyle that lasts.
          </p>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
          {/* 3D Tilt cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 flex-1">
            {features.map((f, i) => (
              <TiltCard key={f.title} feature={f} index={i} />
            ))}
          </div>

          {/* Images stacked — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-4 w-[320px] flex-shrink-0"
          >
            <div className="relative h-[280px] rounded-2xl overflow-hidden group">
              <Image
                src="/images/why-choose-1.png"
                alt="Training"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-4 left-4 text-white font-bold text-sm"
              >
                💪 Strength Training
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[160px] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/why-choose-2.png"
                  alt="Cardio"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">🏃 Cardio</div>
              </div>
              <div className="relative h-[160px] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/why-choose-3.png"
                  alt="Recovery"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">🧘 Recovery</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
