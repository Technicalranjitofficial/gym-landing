"use client";

import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setVisible(y > 400));
    return unsub;
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded options */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-2 items-end"
              >
                {[
                  { label: "📞 Call Us",        href: "/contact",  color: "bg-white text-[#111]" },
                  { label: "💰 See Pricing",    href: "/services", color: "bg-[#1a1a1a] text-white border border-white/20" },
                  { label: "🎯 Free Trial",     href: "/contact",  color: "bg-white text-[#111]" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setExpanded(false)}
                      className={`${item.color} text-sm font-bold px-5 py-2.5 rounded-full shadow-lg whitespace-nowrap hover:scale-105 transition-transform inline-block`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB button */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={{ rotate: expanded ? 45 : 0 }}
            className="relative w-14 h-14 bg-[#111111] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex items-center justify-center border border-white/20 overflow-hidden group"
          >
            {/* Pulse ring */}
            {!expanded && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-2xl"
            >
              {expanded ? "✕" : "💪"}
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
