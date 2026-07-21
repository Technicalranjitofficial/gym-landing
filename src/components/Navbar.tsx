"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "Home",     href: "/",        section: "home"     },
  { label: "About",    href: "/about",   section: "about"    },
  { label: "Services", href: "/services",section: "services" },
  { label: "Contact",  href: "/contact", section: "contact"  },
];

/* Smooth-scroll to a section id on the same page */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Magnetic hover hook — element follows cursor slightly */
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [x, y, strength]);

  return { ref, x, y };
}

export default function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [scrollPct,    setScrollPct]    = useState(0);
  const [hoveredLink,  setHoveredLink]  = useState<string | null>(null);
  const [activeSection,setActiveSection]= useState<string>("home");
  const pathname = usePathname();
  const router   = useRouter();
  const isHome   = pathname === "/";
  const magnetic = useMagnetic(0.4);

  /* ── scroll + section tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (y / max) * 100 : 0);

      // highlight nav based on which section is in view
      if (isHome) {
        const sections = ["home", "about", "services", "contact"];
        for (const id of [...sections].reverse()) {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const bg = scrolled || !isHome
    ? "bg-[#0a0a0a]/92 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
    : "bg-transparent";

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (isHome) return activeSection === link.section;
    return pathname === link.href;
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (isHome && link.href === "/") {
      e.preventDefault();
      scrollToSection(link.section);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bg}`}
      >
        {/* ── Scroll progress bar ── */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] origin-left"
          style={{
            scaleX: scrollPct / 100,
            background: "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.2) 100%)",
          }}
        />

        <div className="max-w-[1430px] mx-auto px-4 md:px-[60px] py-4 md:py-5 flex items-center justify-between">

          {/* ── Logo with magnetic effect ── */}
          <motion.div
            ref={magnetic.ref}
            style={{ x: magnetic.x, y: magnetic.y }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <Link href="/" onClick={(e) => { if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>
              <div className="relative group">
                <Image src="/images/logo.svg" alt="FitFlex" width={80} height={36} className="brightness-0 invert transition-all duration-300 group-hover:brightness-0 group-hover:invert group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>
            </Link>
          </motion.div>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-5 py-2.5 rounded-xl group overflow-hidden"
                >
                  {/* Sliding hover background */}
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.div
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-xl bg-white/8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Text */}
                  <span className={`relative z-10 text-sm font-medium tracking-wide transition-all duration-200 ${
                    active ? "text-white font-bold" : "text-white/55 group-hover:text-white"
                  }`}>
                    {link.label}
                  </span>

                  {/* Active dot */}
                  {active && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── CTA with magnetic effect ── */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="relative overflow-hidden inline-flex items-center gap-2 bg-white text-[#111] font-bold text-sm px-6 py-2.5 rounded-xl group hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-shadow duration-300"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-black/8 to-transparent" />
                <motion.span
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-base"
                >
                  💪
                </motion.span>
                <span className="relative">Join Now</span>
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          >
            {[
              mobileOpen ? { rotate: 45, y: 6 }  : { rotate: 0, y: 0 },
              mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
              mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 },
            ].map((anim, i) => (
              <motion.span
                key={i}
                animate={anim}
                transition={{ duration: 0.25 }}
                className="w-5 h-[2px] bg-white block rounded-full origin-center"
              />
            ))}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-white/8 bg-[#080808]/98 backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-1 px-4 py-6">
                {navLinks.map((link, i) => {
                  const active = isLinkActive(link);
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => { handleNavClick(e, link); setMobileOpen(false); }}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
                          active ? "bg-white/10 text-white font-semibold" : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-base">{link.label}</span>
                        {active && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="pt-3 mt-2 border-t border-white/8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="relative overflow-hidden flex items-center justify-center gap-2 w-full bg-white text-[#111] font-bold text-sm py-3.5 rounded-xl group"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-black/8 to-transparent" />
                    <motion.span
                      animate={{ rotate: [0, -15, 15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                    >
                      💪
                    </motion.span>
                    <span className="relative">Join Now</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
