"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const teamMembers = [
  { name: "John Smith",     role: "Head Trainer",      img: "/images/trainer-1.png" },
  { name: "Sarah Williams", role: "Yoga Instructor",   img: "/images/trainer-2.png" },
  { name: "Mike Johnson",   role: "Strength Coach",    img: "/images/trainer-3.png" },
  { name: "Emily Davis",    role: "Nutritionist",      img: "/images/trainer-4.png" },
];

const values = [
  { icon: "🎯", title: "Our Mission",
    description: "To provide a welcoming and motivating environment where individuals of all fitness levels can achieve their health and wellness goals through expert guidance and state-of-the-art facilities." },
  { icon: "🔭", title: "Our Vision",
    description: "To be the leading fitness community that transforms lives by making health and wellness accessible, enjoyable, and sustainable for everyone." },
  { icon: "💎", title: "Our Values",
    description: "We believe in integrity, inclusivity, and continuous improvement. Every member is treated with respect, and every achievement is celebrated regardless of size." },
];

const timeline = [
  { year: "2019", event: "FitFlex founded in a small garage with 3 pieces of equipment and a big dream." },
  { year: "2020", event: "Moved to a 5,000 sq ft facility and onboarded our first 5 certified trainers." },
  { year: "2021", event: "Reached 300 active members and launched our nutrition coaching program." },
  { year: "2022", event: "Opened a second location and introduced 24/7 access for all members." },
  { year: "2023", event: "Crossed 786 members and a 95% satisfaction rate. Champions are made here." },
];

export default function AboutPage() {
  const storyRef  = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const teamRef   = useRef<HTMLElement>(null);
  const timeRef   = useRef<HTMLElement>(null);

  const storyIn  = useInView(storyRef,  { once: true, amount: 0.2 });
  const valuesIn = useInView(valuesRef, { once: true, amount: 0.2 });
  const teamIn   = useInView(teamRef,   { once: true, amount: 0.2 });
  const timeIn   = useInView(timeRef,   { once: true, amount: 0.2 });

  return (
    <PageTransition>
    <main className="flex flex-col bg-[#0a0a0a]">
      <Navbar />
      <PageHeader
        tag="Who We Are"
        title="About FitFlex"
        subtitle="Born from passion, built on results. Learn the story behind the gym that's transforming lives."
      />

      {/* ── STORY ── */}
      <section ref={storyRef} className="relative bg-[#0d0d0d] py-16 md:py-28 px-4 md:px-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.02] uppercase leading-none tracking-tighter">STORY</span>
        </div>
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={storyIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Our Story</span>
            <h2 className="text-3xl md:text-[48px] font-black text-white leading-[1.05] tracking-tight mb-6">
              Building <span className="gradient-text">Strength</span> Since 2019
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-4">
              What started as a small garage gym with a big dream has grown into a
              thriving fitness community. Founded by passionate fitness enthusiasts,
              FitFlex was born from the belief that everyone deserves access to
              quality training in an inspiring environment.
            </p>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              Over the years, we&apos;ve helped hundreds of members transform their
              lives through personalized training programs, nutritional guidance,
              and unwavering support. Our team of certified professionals brings
              decades of combined experience to help you reach your full potential.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={storyIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full lg:w-[480px] h-[320px] md:h-[420px] rounded-2xl overflow-hidden group flex-shrink-0"
          >
            <Image
              src="/images/why-choose-1.png"
              alt="Our gym"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
              <p className="text-white font-bold text-sm">🏋️ Est. 2019 · Mumbai, India</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section ref={timeRef} className="bg-[#111111] py-16 md:py-24 px-4 md:px-20 overflow-hidden">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timeIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Our Journey</span>
            <h2 className="text-3xl md:text-[44px] font-black text-white leading-[1.05] tracking-tight">
              Milestones That <span className="gradient-text">Define Us</span>
            </h2>
          </motion.div>

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={timeIn ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
            />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={timeIn ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className={`relative flex items-center gap-4 md:gap-0 pb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Mobile: left dot + content */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1a1a1a] border border-white/15 flex items-center justify-center z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-white font-black text-xs">{item.year}</span>
                </div>
                <div className={`flex-1 md:max-w-[45%] ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="bg-white/5 border border-white/8 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                    <p className="text-white/60 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="relative bg-[#0d0d0d] py-16 md:py-28 px-4 md:px-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.02] uppercase leading-none tracking-tighter">VALUES</span>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-3">What Drives Us</span>
            <h2 className="text-3xl md:text-[44px] font-black text-white leading-[1.05] tracking-tight">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-[#111111] border border-white/8 rounded-2xl p-8 group overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
                <span className="text-4xl block mb-5">{value.icon}</span>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{value.description}</p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={valuesIn ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* ── TEAM ── */}
      <section ref={teamRef} className="relative bg-[#0d0d0d] py-16 md:py-28 px-4 md:px-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.02] uppercase leading-none tracking-tighter">TEAM</span>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-3">The People</span>
            <h2 className="text-3xl md:text-[44px] font-black text-white leading-[1.05] tracking-tight">
              Meet the <span className="gradient-text">Legends</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base mt-4 max-w-[500px] mx-auto">
              World-class professionals who live and breathe fitness every single day.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={teamIn ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col items-center gap-4"
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white font-bold text-sm">{member.name}</p>
                    <p className="text-white/50 text-xs mt-0.5">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
}
