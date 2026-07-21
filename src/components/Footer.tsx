"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const links = {
  "Quick Links": [
    { label: "Home",     href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact",  href: "/contact" },
  ],
  "Programs": [
    { label: "Personal Training", href: "/services" },
    { label: "Group Classes",     href: "/services" },
    { label: "Nutrition Coaching",href: "/services" },
    { label: "Recovery & Yoga",   href: "/services" },
  ],
  "Company": [
    { label: "Our Story",   href: "/about" },
    { label: "Our Team",    href: "/about" },
    { label: "Careers",     href: "#" },
    { label: "Press",       href: "#" },
  ],
};

const floatingGymIcons = [
  { emoji: "🏋️", x: "3%",  y: "30%", delay: 0   },
  { emoji: "💪", x: "97%", y: "60%", delay: 1   },
  { emoji: "🥊", x: "50%", y: "5%",  delay: 0.5 },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} id="contact" className="relative bg-white overflow-hidden">
      {/* Floating icons */}
      {floatingGymIcons.map((d, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl pointer-events-none select-none hidden md:block opacity-10"
          style={{ left: d.x, top: d.y }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5 + i, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {d.emoji}
        </motion.div>
      ))}

      {/* ── CALL TO ACTION BANNER ── */}
      <div className="relative w-full h-[250px] md:h-[380px] overflow-hidden">
        <Image
          src="/images/footer-bg.png"
          alt="Footer background"
          fill
          className="object-cover"
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)" }}
        />

        {/* Animated border beam */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent origin-left"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 flex flex-col items-center justify-center h-full gap-4 md:gap-6 px-4 text-center"
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.3em] font-bold">Get in touch</span>
          <h3 className="text-white text-2xl md:text-5xl font-black leading-tight tracking-tight">
            Ready to Start Your{" "}
            <span className="gradient-text">Transformation?</span>
          </h3>
          <a
            href="tel:+918200060000"
            className="group inline-flex items-center gap-3 text-white font-bold text-lg md:text-2xl hover:scale-105 transition-transform"
          >
            <span className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-sm group-hover:bg-white/25 transition-colors">
              📞
            </span>
            +91 82000-60000
          </a>
        </motion.div>
      </div>

      {/* ── FOOTER BODY ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="bg-[#111111] px-4 md:px-16 lg:px-24 py-12 md:py-16"
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2 flex flex-col gap-5">
              <Image
                src="/images/logo.svg"
                alt="FitFlex"
                width={90}
                height={40}
                className="brightness-0 invert"
              />
              <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
                Building stronger bodies and minds since 2019. Join thousands of members transforming their lives daily.
              </p>
              {/* Socials */}
              <div className="flex items-center gap-3 mt-1">
                {[
                  { src: "/images/facebook.svg",  label: "Facebook",  w: 10, h: 18 },
                  { src: "/images/twitter.svg",   label: "Twitter",   w: 18, h: 16 },
                  { src: "/images/instagram.svg", label: "Instagram", w: 18, h: 18 },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-colors"
                  >
                    <Image src={s.src} alt={s.label} width={s.w} height={s.h} className="brightness-0 invert" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([title, items], colIdx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + colIdx * 0.1 }}
                className="flex flex-col gap-4"
              >
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">{title}</h4>
                <div className="flex flex-col gap-2.5">
                  {items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-white/40 text-sm hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs">
              © 2024 FitFlex Gym. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
                <Link key={t} href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* xyzbuilder.dev branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-6 flex justify-center"
          >
            <a
              href="https://xyzbuilder.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-white/20 hover:text-white/60 transition-all duration-300"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Built by</span>
              <span className="relative font-black text-xs tracking-wide group-hover:text-white transition-colors">
                xyzbuilder.dev
                <motion.span
                  className="absolute -bottom-px left-0 right-0 h-px bg-white/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
