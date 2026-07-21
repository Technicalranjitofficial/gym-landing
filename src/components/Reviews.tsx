"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";

const reviews = [
  { name: "Kerry Rohan",    rating: 4, avatar: "/images/review-1.png", role: "Member since 2021", text: "FitFlex completely changed my relationship with fitness. The coaches push you at exactly the right moments and back off when you need recovery. Down 18kg in 6 months!" },
  { name: "Sarah Johnson",  rating: 5, avatar: "/images/review-2.png", role: "Member since 2022", text: "Absolutely amazing experience. The trainers are professional and the equipment is top-notch. I've seen incredible results in just 3 months of consistent training here." },
  { name: "Mike Chen",      rating: 4, avatar: "/images/review-3.png", role: "Member since 2020", text: "Great atmosphere and supportive community. The group classes are energizing and the personal training sessions helped me achieve goals I never thought possible." },
  { name: "Emily Davis",    rating: 5, avatar: "/images/review-1.png", role: "Member since 2023", text: "Best gym I've ever been to. Clean facilities, knowledgeable staff, welcoming environment for all fitness levels. Highly recommend to anyone serious about results." },
  { name: "Alex Thompson",  rating: 4, avatar: "/images/review-2.png", role: "Member since 2022", text: "The variety of programs is impressive. From yoga to HIIT, there's something for everyone. The flexible scheduling makes it easy to stay consistent." },
  { name: "Jessica Park",   rating: 5, avatar: "/images/review-3.png", role: "Member since 2021", text: "Joined 6 months ago and it's been life-changing. The coaches genuinely care about your progress and the community keeps you motivated every single day." },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 400 }}
          className={`text-sm ${i < rating ? "text-amber-400" : "text-gray-200"}`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const visibleCount = 3;
  const maxIndex = reviews.length - visibleCount;

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((p) => Math.max(0, Math.min(maxIndex, p + dir)));
  };

  return (
    <section ref={ref} className="relative bg-[#f8f8f8] py-16 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Floating gym decorations */}
      {[
        { emoji: "🏅", x: "5%",  y: "10%", delay: 0   },
        { emoji: "💯", x: "92%", y: "20%", delay: 1   },
        { emoji: "🎯", x: "90%", y: "80%", delay: 0.5 },
      ].map((d, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl pointer-events-none select-none hidden md:block"
          style={{ left: d.x, top: d.y }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4 + i, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {d.emoji}
        </motion.div>
      ))}

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <span className="text-[#9E9E9E] text-xs font-bold uppercase tracking-[0.3em] block mb-3">Testimonials</span>
            <h2 className="text-3xl md:text-[54px] font-black text-[#111111] leading-[1.05] tracking-tight">
              Real People,{" "}
              <span className="gradient-text-dark">Real Results</span>
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => go(-1)}
              disabled={current === 0}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                current === 0
                  ? "border-[#E0E0E0] text-[#E0E0E0] cursor-not-allowed"
                  : "border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white"
              }`}
            >
              ←
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => go(1)}
              disabled={current >= maxIndex}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                current >= maxIndex
                  ? "border-[#E0E0E0] text-[#E0E0E0] cursor-not-allowed"
                  : "border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white"
              }`}
            >
              →
            </motion.button>
            <span className="text-[#9E9E9E] text-sm ml-1">
              {current + 1}–{Math.min(current + visibleCount, reviews.length)} / {reviews.length}
            </span>
          </div>
        </motion.div>

        {/* Cards — desktop: 3 col, mobile: single */}
        <div className="hidden md:block overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-5"
            >
              {reviews.slice(current, current + visibleCount).map((review, i) => (
                <motion.div
                  key={review.name + i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white rounded-3xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-5 border border-[#F0F0F0] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300 cursor-default"
                >
                  {/* Quote mark */}
                  <span className="text-4xl text-[#E0E0E0] font-serif leading-none">"</span>

                  <p className="text-[#757575] text-sm leading-relaxed flex-1">{review.text}</p>

                  <div className="border-t border-[#F5F5F5] pt-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#F0F0F0]">
                      <Image src={review.avatar} alt={review.name} width={44} height={44} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#212121]">{review.name}</p>
                      <p className="text-[#9E9E9E] text-xs">{review.role}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#F0F0F0]"
            >
              <span className="text-4xl text-[#E0E0E0] font-serif leading-none">"</span>
              <p className="text-[#757575] text-sm leading-relaxed mt-3 mb-5">{reviews[current].text}</p>
              <div className="border-t border-[#F5F5F5] pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#F0F0F0]">
                  <Image src={reviews[current].avatar} alt={reviews[current].name} width={40} height={40} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#212121]">{reviews[current].name}</p>
                  <p className="text-[#9E9E9E] text-xs">{reviews[current].role}</p>
                </div>
                <StarRating rating={reviews[current].rating} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#212121] w-5" : "bg-[#D0D0D0]"}`}
                />
              ))}
            </div>
            <span className="text-[#9E9E9E] text-xs">{current + 1} / {reviews.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
