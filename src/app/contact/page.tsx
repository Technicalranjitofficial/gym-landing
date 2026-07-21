"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const contactInfo = [
  { title: "Visit Us",        details: ["123 Fitness Avenue", "Mumbai, Maharashtra 400001"], icon: "📍" },
  { title: "Call Us",         details: ["+91 82000-60000", "+91 98765-43210"],               icon: "📞" },
  { title: "Email Us",        details: ["info@fitflex.com", "support@fitflex.com"],           icon: "✉️" },
  { title: "Working Hours",   details: ["Mon–Fri: 5AM – 11PM", "Sat–Sun: 6AM – 9PM"],        icon: "🕐" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageTransition>
    <main className="flex flex-col bg-[#0a0a0a]">
      <Navbar />
      <PageHeader
        tag="Get In Touch"
        title="Contact Us"
        subtitle="Have a question or ready to start your fitness journey? We're here to help."
      />

      {/* ── INFO CARDS ── */}
      <section ref={infoRef} className="relative bg-[#0d0d0d] py-16 md:py-24 px-4 md:px-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={infoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative bg-[#111111] border border-white/8 rounded-2xl p-7 text-center group overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />

                <div className="text-3xl mb-4">{info.icon}</div>
                <h3 className="font-bold text-base text-white mb-3">{info.title}</h3>
                {info.details.map((d, j) => (
                  <p key={j} className="text-white/40 text-sm leading-relaxed">{d}</p>
                ))}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={infoInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + MAP ── */}
      <section ref={formRef} className="bg-[#111111] py-16 md:py-28 px-4 md:px-20">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Reach Out</span>
            <h2 className="text-2xl md:text-[40px] font-black text-white leading-[1.05] tracking-tight mb-2">
              Send Us a <span className="gradient-text">Message</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base mb-8">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text" name="name" placeholder="Your Name"
                  value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors text-sm"
                />
                <input
                  type="email" name="email" placeholder="Your Email"
                  value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel" name="phone" placeholder="Phone Number"
                  value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors text-sm"
                />
                <select
                  name="subject" value={formData.subject} onChange={handleChange} required
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/40 transition-colors appearance-none text-sm"
                >
                  <option value="" disabled className="bg-[#111]">Select Subject</option>
                  <option value="membership" className="bg-[#111]">Membership Inquiry</option>
                  <option value="training"   className="bg-[#111]">Personal Training</option>
                  <option value="classes"    className="bg-[#111]">Group Classes</option>
                  <option value="other"      className="bg-[#111]">Other</option>
                </select>
              </div>
              <textarea
                name="message" placeholder="Your Message"
                value={formData.message} onChange={handleChange} required rows={5}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none text-sm"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden w-full md:w-auto px-10 py-4 bg-white text-[#111] font-black text-sm rounded-xl group transition-shadow"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/8 to-transparent" />
                <span className="relative">
                  {submitted ? "✓ Message Sent!" : "Send Message →"}
                </span>
              </motion.button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 font-medium text-sm"
                >
                  Thank you! We&apos;ll be in touch soon.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[500px] flex-shrink-0 flex flex-col gap-4"
          >
            <div className="h-[300px] md:h-[420px] rounded-2xl overflow-hidden border border-white/8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Gym Location"
              />
            </div>

            {/* Quick contact */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Quick Contact</p>
              <a href="tel:+918200060000" className="flex items-center gap-3 text-white hover:text-white/70 transition-colors group">
                <span className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-sm group-hover:bg-white/15 transition-colors">📞</span>
                <span className="font-semibold text-sm">+91 82000-60000</span>
              </a>
              <a href="mailto:info@fitflex.com" className="flex items-center gap-3 text-white hover:text-white/70 transition-colors group">
                <span className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-sm group-hover:bg-white/15 transition-colors">✉️</span>
                <span className="font-semibold text-sm">info@fitflex.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section className="bg-[#0d0d0d] py-12 md:py-20 px-4 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="max-w-[600px] mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
            Follow Our <span className="gradient-text">Journey</span>
          </h3>
          <p className="text-white/40 text-sm md:text-base mb-8">
            Daily fitness tips, transformation stories, and community highlights.
          </p>
          <div className="flex items-center justify-center gap-4">
            {[
              { src: "/images/twitter.svg",   label: "Twitter",   w: 18, h: 16 },
              { src: "/images/facebook.svg",  label: "Facebook",  w: 10, h: 18 },
              { src: "/images/instagram.svg", label: "Instagram", w: 18, h: 18 },
            ].map((s) => (
              <motion.a
                key={s.label}
                href="#"
                aria-label={s.label}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/8 border border-white/15 rounded-full flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-colors"
              >
                <Image src={s.src} alt={s.label} width={s.w} height={s.h} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
}
