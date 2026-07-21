"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const trainerData = [
  { src: "/images/trainer-1.png", name: "Alex Rivera",    role: "Strength & Conditioning", wide: false },
  { src: "/images/trainer-2.png", name: "Jordan Kim",     role: "HIIT & Cardio Expert",    wide: true  },
  { src: "/images/trainer-3.png", name: "Morgan Lee",     role: "Yoga & Flexibility",      wide: false },
  { src: "/images/trainer-4.png", name: "Chris Taylor",   role: "Sports Performance",      wide: true  },
  { src: "/images/trainer-5.png", name: "Sam Patel",      role: "Nutrition & Wellness",    wide: false },
  { src: "/images/trainer-6.png", name: "Riley Johnson",  role: "CrossFit Specialist",     wide: true  },
];

const row1 = trainerData.slice(0, 3);
const row2 = trainerData.slice(3, 6);

function TrainerCard({ trainer, rowIndex, cardIndex }: {
  trainer: typeof trainerData[0];
  rowIndex: number;
  cardIndex: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (rowIndex * 3 + cardIndex) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`trainer-card relative overflow-hidden rounded-2xl cursor-pointer ${
        trainer.wide ? "flex-1" : "w-[28%] md:w-[30%] flex-shrink-0"
      }`}
      style={{ height: "clamp(160px, 28vw, 288px)" }}
    >
      {/* Image */}
      <Image
        src={trainer.src}
        alt={trainer.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}
      />

      {/* Always-on dark gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
      />

      {/* Name/role slide up */}
      <motion.div
        animate={{ y: hovered ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-5"
      >
        <p className="text-white font-bold text-sm md:text-base leading-tight">{trainer.name}</p>
        <p className="text-white/70 text-xs md:text-sm mt-0.5">{trainer.role}</p>

        {/* Social mini-icons */}
        <div className="flex gap-2 mt-3">
          {["ig", "tw", "fb"].map((s) => (
            <div key={s} className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer">
              <span className="text-white text-[8px] font-bold uppercase">{s}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Corner tag — always visible */}
      <div className="absolute top-3 left-3">
        <motion.div
          animate={{ scale: hovered ? 0 : 1, opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="bg-black/40 backdrop-blur-sm border border-white/20 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
        >
          {trainer.role.split(" ")[0]}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Trainers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative bg-[#0d0d0d] py-16 md:py-28 px-4 md:px-12 lg:px-16 overflow-hidden">
      {/* Background huge text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black text-white/[0.02] uppercase tracking-tighter whitespace-nowrap leading-none">
          TRAINERS
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Our Team</span>
          <h2 className="text-3xl md:text-[54px] font-black text-white leading-[1.05] tracking-tight">
            Meet the <span className="gradient-text">Legends</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base mt-4 max-w-[480px] mx-auto leading-relaxed">
            World-class coaches with one goal — to make you the best version of yourself.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Row 1 */}
          <div className="flex gap-3 md:gap-4">
            {row1.map((t, i) => (
              <TrainerCard key={t.name} trainer={t} rowIndex={0} cardIndex={i} />
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex gap-3 md:gap-4">
            {row2.map((t, i) => (
              <TrainerCard key={t.name} trainer={t} rowIndex={1} cardIndex={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="text-white/30 text-sm mb-4">Ready to train with the best?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#111111] font-bold text-sm px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300"
          >
            Book a Free Session 🔥
          </a>
        </motion.div>
      </div>
    </section>
  );
}
