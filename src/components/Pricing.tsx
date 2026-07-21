"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const plansData = {
  monthly: [
    {
      name: "Starter",
      price: "$10",
      period: "/ Month",
      badge: null,
      featured: false,
      features: [
        "Access to gym floor",
        "Locker room access",
        "2 group classes/month",
        "Basic fitness assessment",
      ],
    },
    {
      name: "Champion",
      price: "$15",
      period: "/ Month",
      badge: "MOST POPULAR",
      featured: true,
      features: [
        "Everything in Starter",
        "Unlimited group classes",
        "1 PT session/month",
        "Nutrition consultation",
        "Progress tracking app",
      ],
    },
    {
      name: "Elite",
      price: "$20",
      period: "/ Month",
      badge: "BEST VALUE",
      featured: false,
      features: [
        "Everything in Champion",
        "4 PT sessions/month",
        "Custom meal plan",
        "Recovery suite access",
        "Priority booking",
        "Guest passes (2/month)",
      ],
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: "$96",
      period: "/ Year",
      badge: "SAVE $24",
      featured: false,
      features: [
        "Access to gym floor",
        "Locker room access",
        "2 group classes/month",
        "Basic fitness assessment",
      ],
    },
    {
      name: "Champion",
      price: "$144",
      period: "/ Year",
      badge: "MOST POPULAR",
      featured: true,
      features: [
        "Everything in Starter",
        "Unlimited group classes",
        "1 PT session/month",
        "Nutrition consultation",
        "Progress tracking app",
      ],
    },
    {
      name: "Elite",
      price: "$192",
      period: "/ Year",
      badge: "BEST VALUE",
      featured: false,
      features: [
        "Everything in Champion",
        "4 PT sessions/month",
        "Custom meal plan",
        "Recovery suite access",
        "Priority booking",
        "Guest passes (2/month)",
      ],
    },
  ],
};

function SpotlightCard({ plan, index, billingCycle }: {
  plan: typeof plansData.monthly[0];
  index: number;
  billingCycle: "monthly" | "yearly";
}) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: plan.featured ? -12 : -8 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-3xl overflow-hidden cursor-default flex flex-col ${
        plan.featured
          ? "bg-[#111111] border-2 border-white/20"
          : "bg-white border border-[#F0F0F0]"
      } shadow-[0_20px_60px_rgba(0,0,0,0.12)]`}
    >
      {/* Spotlight radial glow */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${
              plan.featured ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"
            } 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Badge */}
      {plan.badge && (
        <div className={`absolute top-4 right-4 text-[10px] font-black tracking-widest px-3 py-1 rounded-full ${
          plan.featured
            ? "bg-white text-[#111111]"
            : "bg-[#111111] text-white"
        }`}>
          {plan.badge}
        </div>
      )}

      {/* Featured top bar */}
      {plan.featured && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[3px] bg-gradient-to-r from-transparent via-white/80 to-transparent origin-left"
        />
      )}

      <div className="p-7 md:p-8 flex flex-col gap-8 flex-1">
        {/* Plan name */}
        <div>
          <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
            plan.featured ? "text-white/50" : "text-[#9E9E9E]"
          }`}>
            {plan.name}
          </p>

          {/* Price */}
          <div className="flex items-end gap-2">
            <motion.span
              key={`${billingCycle}-${plan.price}`}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className={`text-5xl md:text-6xl font-black leading-none ${
                plan.featured ? "text-white" : "text-[#212121]"
              }`}
            >
              {plan.price}
            </motion.span>
            <span className={`text-sm font-medium pb-2 ${
              plan.featured ? "text-white/40" : "text-[#9E9E9E]"
            }`}>
              {plan.period}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex items-center gap-3"
            >
              <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                plan.featured ? "bg-white/10" : "bg-[#F5F5F5]"
              }`}>
                <Image src="/images/checkmark.svg" alt="" width={12} height={12} className={plan.featured ? "invert" : ""} />
              </span>
              <span className={`text-sm ${plan.featured ? "text-white/70" : "text-[#757575]"}`}>
                {f}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className={`relative overflow-hidden w-full py-4 text-center rounded-2xl font-bold text-sm group transition-all duration-300 ${
            plan.featured
              ? "bg-white text-[#111111] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              : "bg-[#111111] text-white hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
          }`}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="relative">Choose {plan.name} →</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="services" className="relative bg-white py-16 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Background huge text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black text-black/[0.025] uppercase tracking-tighter whitespace-nowrap leading-none">
          PRICING
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#9E9E9E] text-xs font-bold uppercase tracking-[0.3em] block mb-3">Membership</span>
            <h2 className="text-3xl md:text-[54px] font-black text-[#111111] leading-[1.05] tracking-tight">
              Simple{" "}
              <span className="gradient-text-dark">Pricing</span>
            </h2>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1 p-1.5 bg-[#F5F5F5] rounded-2xl"
          >
            {(["monthly", "yearly"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={`relative px-5 py-2.5 rounded-xl font-semibold text-sm capitalize transition-colors duration-200 ${
                  billing === cycle ? "text-white" : "text-[#757575] hover:text-[#424242]"
                }`}
              >
                {billing === cycle && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 bg-[#111111] rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cycle}</span>
                {cycle === "yearly" && (
                  <span className="relative z-10 ml-1 text-[10px] text-green-500 font-bold">-20%</span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {plansData[billing].map((plan, i) => (
            <SpotlightCard key={plan.name} plan={plan} index={i} billingCycle={billing} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-[#9E9E9E] text-xs mt-8"
        >
          No hidden fees. Cancel anytime. 7-day free trial on all plans.
        </motion.p>
      </div>
    </section>
  );
}
