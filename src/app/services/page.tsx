"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const services = [
  { icon: "🏋️", title: "Personal Training",    img: "/images/coach-1.png",
    description: "One-on-one sessions with certified trainers tailored to your specific goals. Personalized plans, form correction, and constant motivation." },
  { icon: "👥", title: "Group Classes",         img: "/images/coach-2.png",
    description: "High-energy group HIIT, spinning, boxing, and functional training. Feed off the energy of fellow members and push limits together." },
  { icon: "💪", title: "Strength Training",     img: "/images/why-choose-1.png",
    description: "Premium free weights, machines, and power racks. Our trainers build progressive overload programs for maximum gains." },
  { icon: "🧘", title: "Yoga & Flexibility",    img: "/images/why-choose-2.png",
    description: "Restore balance with yoga and mobility classes. Improve flexibility, reduce stress, and prevent injuries." },
  { icon: "🥗", title: "Nutrition Coaching",    img: "/images/why-choose-3.png",
    description: "Expert nutritional guidance, custom meal plans, macro tracking support, and ongoing dietary adjustments." },
  { icon: "🛁", title: "Recovery & Wellness",   img: "/images/trainer-5.png",
    description: "Sauna, foam rolling area, and stretching zone. Because growth happens when you rest as hard as you train." },
];

const amenities = [
  { icon: "⚙️", label: "State-of-the-art equipment" },
  { icon: "🌙", label: "Open 24/7 for members"       },
  { icon: "🚿", label: "Locker rooms & showers"       },
  { icon: "🅿️", label: "Free parking"                },
  { icon: "🏷️", label: "Complimentary towel service" },
  { icon: "🥤", label: "Smoothie bar"                 },
];

export default function ServicesPage() {
  const gridRef     = useRef<HTMLElement>(null);
  const amenRef     = useRef<HTMLElement>(null);
  const gridInView  = useInView(gridRef,  { once: true, amount: 0.1 });
  const amenInView  = useInView(amenRef,  { once: true, amount: 0.2 });

  return (
    <PageTransition>
    <main className="flex flex-col bg-[#0a0a0a]">
      <Navbar />
      <PageHeader
        tag="What We Offer"
        title="Our Services"
        subtitle="From personal training to group classes — everything you need to reach your fitness potential."
      />

      {/* ── SERVICES GRID ── */}
      <section ref={gridRef} className="relative bg-[#0d0d0d] py-16 md:py-28 px-4 md:px-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.02] uppercase leading-none tracking-tighter">SERVICES</span>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-[#111111] border border-white/8 rounded-2xl overflow-hidden group"
              >
                {/* Image */}
                <div className="h-[180px] overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    width={400}
                    height={180}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 h-[180px] bg-gradient-to-b from-transparent to-[#111111]" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-2xl block mb-3">{service.icon}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
                </div>

                {/* Hover bottom bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section ref={amenRef} className="bg-[#111111] py-16 md:py-24 px-4 md:px-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={amenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Included</span>
            <h2 className="text-3xl md:text-[44px] font-black text-white leading-[1.05] tracking-tight">
              Gym <span className="gradient-text">Amenities</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base mt-4 max-w-[500px] mx-auto">
              Everything you need for a comfortable and productive workout experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={amenInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-xl p-5 hover:bg-white/8 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-white/70 font-medium text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative bg-[#0d0d0d] py-16 md:py-24 px-4 md:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="max-w-[800px] mx-auto text-center relative z-10"
        >
          <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Ready?</span>
          <h2 className="text-3xl md:text-[48px] font-black text-white leading-[1.05] tracking-tight mb-4">
            Start Your <span className="gradient-text">Journey</span> Today
          </h2>
          <p className="text-white/40 text-base md:text-lg mb-8 leading-relaxed">
            Join our community and take the first step towards a healthier, stronger version of you.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="relative overflow-hidden inline-flex items-center gap-3 bg-white text-[#111] font-black text-base px-10 py-4 rounded-xl group hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/8 to-transparent" />
              <span className="relative">Get Started Now →</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing */}
      <Pricing />

      <Footer />
    </main>
    </PageTransition>
  );
}
