"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const transformations = [
  { name: "Marcus J.", weeks: 12, lostKg: 14, gainedMuscle: "8kg",
    beforeImg: "/images/trainer-4.png", afterImg: "/images/trainer-1.png",
    beforeLabel: "185 lbs · 28% body fat", afterLabel: "164 lbs · 14% body fat" },
  { name: "Priya S.",  weeks: 16, lostKg: 18, gainedMuscle: "6kg",
    beforeImg: "/images/trainer-5.png", afterImg: "/images/trainer-2.png",
    beforeLabel: "172 lbs · 32% body fat", afterLabel: "146 lbs · 18% body fat" },
  { name: "Derek T.",  weeks: 8,  lostKg: 10, gainedMuscle: "5kg",
    beforeImg: "/images/trainer-6.png", afterImg: "/images/trainer-3.png",
    beforeLabel: "210 lbs · 30% body fat", afterLabel: "188 lbs · 20% body fat" },
];

function BeforeAfterSlider({ transformation }: { transformation: typeof transformations[0] }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updateSlider(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => updateSlider(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[460px] rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseMove={onMouseMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={onTouchMove}
      onTouchEnd={() => setDragging(false)}
    >
      {/* BEFORE — full width base layer */}
      <div className="absolute inset-0">
        <Image src={transformation.beforeImg} alt="Before" fill className="object-cover object-top" />
        {/* Desaturate before image */}
        <div className="absolute inset-0 bg-black/30 mix-blend-color" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* BEFORE label */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
          Before
        </span>
        <span className="bg-black/50 backdrop-blur-sm text-white/60 text-[10px] px-3 py-1 rounded-full">
          {transformation.beforeLabel}
        </span>
      </div>

      {/* AFTER — clipped by slider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <Image src={transformation.afterImg} alt="After" fill className="object-cover object-top" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* AFTER label */}
      <div
        className="absolute top-4 z-10 flex flex-col gap-1.5 items-end"
        style={{ left: `${sliderPos + 2}%` }}
      >
        <span className="bg-white/90 backdrop-blur-sm text-[#111] text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
          After
        </span>
        <span className="bg-black/50 backdrop-blur-sm text-white/70 text-[10px] px-3 py-1 rounded-full whitespace-nowrap">
          {transformation.afterLabel}
        </span>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        {/* Line */}
        <div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        {/* Handle */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          animate={{ scale: dragging ? 1.2 : 1 }}
          className="relative z-10 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-ew-resize border-2 border-white/80"
        >
          <span className="text-[#111] text-sm font-black select-none">⟨⟩</span>
        </motion.div>
      </div>

      {/* Stats overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-base">{transformation.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{transformation.weeks} weeks · FitFlex Program</p>
          </div>
          <div className="flex gap-5">
            <div className="text-right">
              <p className="text-green-400 font-black text-xl">-{transformation.lostKg}kg</p>
              <p className="text-white/40 text-xs">fat lost</p>
            </div>
            <div className="text-right">
              <p className="text-blue-400 font-black text-xl">+{transformation.gainedMuscle}</p>
              <p className="text-white/40 text-xs">muscle gained</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Transformation() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative bg-[#111111] py-16 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black text-white/[0.02] uppercase leading-none tracking-tighter whitespace-nowrap">
          RESULTS
        </span>
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Real Results</span>
          <h2 className="text-3xl md:text-[54px] font-black text-white leading-[1.05] tracking-tight">
            See the <span className="gradient-text">Transformation</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base mt-4 max-w-[500px] mx-auto">
            Drag the slider to reveal the incredible before &amp; after results our members achieve.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {transformations.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? "bg-white text-[#111] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/8 text-white/50 hover:text-white border border-white/10"
              }`}
            >
              {t.name}
            </motion.button>
          ))}
        </div>

        {/* Slider */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <BeforeAfterSlider transformation={transformations[active]} />
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-white/20 text-xs mt-5 flex items-center justify-center gap-2"
        >
          <span>⟨</span>
          <span>DRAG TO REVEAL</span>
          <span>⟩</span>
        </motion.p>
      </div>
    </section>
  );
}
