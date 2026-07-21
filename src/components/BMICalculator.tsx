"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type Unit = "metric" | "imperial";

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400",  bg: "bg-blue-400",  tip: "Our nutrition coaches can help you build lean muscle mass safely.",        pct: 15 };
  if (bmi < 25)   return { label: "Healthy",     color: "text-green-400", bg: "bg-green-400", tip: "Great! Maintain your results with our performance programs.",             pct: 40 };
  if (bmi < 30)   return { label: "Overweight",  color: "text-yellow-400",bg: "bg-yellow-400",tip: "Our fat-loss programs can help you reach your ideal weight in 12 weeks.", pct: 65 };
  return           { label: "Obese",            color: "text-red-400",   bg: "bg-red-400",   tip: "Our expert trainers specialize in transformations just like yours.",       pct: 85 };
}

export default function BMICalculator() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const [unit, setUnit]       = useState<Unit>("metric");
  const [height, setHeight]   = useState("");
  const [weight, setWeight]   = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmi, setBMI]         = useState<number | null>(null);

  const calculate = () => {
    let h = 0, w = 0;
    if (unit === "metric") {
      h = parseFloat(height) / 100; // cm → m
      w = parseFloat(weight);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      h = (ft * 12 + inch) * 0.0254;
      w = parseFloat(weight) * 0.453592;
    }
    if (h > 0 && w > 0) setBMI(parseFloat((w / (h * h)).toFixed(1)));
  };

  const reset = () => { setBMI(null); setHeight(""); setWeight(""); setHeightFt(""); setHeightIn(""); };
  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <section ref={ref} className="relative bg-[#f8f8f8] py-16 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black text-black/[0.025] uppercase tracking-tighter whitespace-nowrap leading-none">BMI</span>
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <span className="text-[#9E9E9E] text-xs font-bold uppercase tracking-[0.3em] block mb-3">Free Tool</span>
            <h2 className="text-3xl md:text-[48px] font-black text-[#111111] leading-[1.05] tracking-tight mb-4">
              Know Your <span className="gradient-text-dark">Body</span>
            </h2>
            <p className="text-[#757575] text-base leading-relaxed mb-6 max-w-[420px]">
              Calculate your BMI in seconds and get a personalized recommendation from our expert coaches.
            </p>

            {/* Feature bullets */}
            <div className="flex flex-col gap-3">
              {[
                "🎯 Instant BMI calculation",
                "📊 Personalized fitness advice",
                "🏋️ Tailored program recommendations",
                "💬 Free consultation with results",
              ].map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-[#424242]"
                >
                  <span>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — calculator card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[440px] bg-[#111111] rounded-3xl p-7 md:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
          >
            <AnimatePresence mode="wait">
              {!bmi ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <h3 className="text-white font-black text-xl">BMI Calculator</h3>

                  {/* Unit toggle */}
                  <div className="flex gap-1 bg-white/8 p-1 rounded-xl">
                    {(["metric", "imperial"] as Unit[]).map((u) => (
                      <button
                        key={u}
                        onClick={() => { setUnit(u); reset(); }}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                          unit === u ? "bg-white text-[#111]" : "text-white/40 hover:text-white"
                        }`}
                      >
                        {u === "metric" ? "Metric (kg/cm)" : "Imperial (lb/ft)"}
                      </button>
                    ))}
                  </div>

                  {/* Height */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-xs uppercase tracking-wider">Height</label>
                    {unit === "metric" ? (
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="170"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors text-sm"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">cm</span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input type="number" placeholder="5" value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors text-sm" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">ft</span>
                        </div>
                        <div className="relative flex-1">
                          <input type="number" placeholder="11" value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors text-sm" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">in</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Weight */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-xs uppercase tracking-wider">Weight</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder={unit === "metric" ? "70" : "154"}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors text-sm"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">
                        {unit === "metric" ? "kg" : "lbs"}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={calculate}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-[#111] font-black py-4 rounded-xl text-sm tracking-wide hover:bg-white/90 transition-colors"
                  >
                    Calculate My BMI →
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-black text-xl">Your Result</h3>
                    <button onClick={reset} className="text-white/30 hover:text-white text-xs transition-colors">
                      Recalculate ↺
                    </button>
                  </div>

                  {/* BMI number */}
                  <div className="text-center py-4">
                    <motion.p
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className={`text-7xl font-black ${category!.color}`}
                    >
                      {bmi}
                    </motion.p>
                    <p className="text-white/40 text-sm mt-1">Body Mass Index</p>
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-bold ${category!.color} bg-white/8`}
                    >
                      {category!.label}
                    </motion.span>
                  </div>

                  {/* Scale bar */}
                  <div>
                    <div className="flex justify-between text-white/20 text-xs mb-2">
                      <span>Underweight</span><span>Healthy</span><span>Overweight</span><span>Obese</span>
                    </div>
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full opacity-40" />
                      <motion.div
                        initial={{ left: 0 }}
                        animate={{ left: `${category!.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 ${category!.bg} rounded-full shadow-lg`}
                      />
                    </div>
                  </div>

                  {/* Tip */}
                  <div className="bg-white/8 border border-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-xs leading-relaxed">💡 {category!.tip}</p>
                  </div>

                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-[#111] font-black py-4 rounded-xl text-sm text-center block"
                  >
                    Get Free Consultation →
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
