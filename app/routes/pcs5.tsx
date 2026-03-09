"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  Plane,
  Activity,
  Users,
  ShieldCheck,
  Plus,
  Linkedin,
  ChevronRight,
} from "lucide-react";

const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed top-6 left-6 z-[100] px-5 py-3 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#812990] group"
  >
    <ArrowRight
      className="rotate-180 group-hover:-translate-x-1 transition-transform"
      size={16}
    />
    Back
  </button>
);

/**
 * BRAND COLOURS & CONSTANTS
 * Updated with semantic depth variations for high-end gradients
 */
const BRAND = {
  purple: "#812990",
  purpleDark: "#2D0A31", // Deep base for gradients
  purpleGlow: "#A64DB5", // Brighter accent for mesh
  blue: "#182f7c",
  gold: "#b9a669",
  nearBlack: "#0A0A0A", // Darker for higher contrast
  lightPurple: "#F5EDF7",
  white: "#FFFFFF",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

/**
 * 1. NAVIGATION COMPONENT
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
          isScrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl py-4 border-b border-white/10"
            : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-cond font-extrabold text-3xl text-white tracking-tighter uppercase italic">
              PCS_
            </span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {["Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-cond font-medium uppercase tracking-[0.2em] text-[11px] text-white/70 hover:text-[#b9a669] transition-all"
              >
                {item}
              </a>
            ))}
            <button className="bg-[#b9a669] hover:bg-white hover:text-[#182f7c] text-white px-8 py-3 rounded-sm font-cond font-bold uppercase text-[11px] tracking-[0.2em] transition-all shadow-lg shadow-black/20">
              Book a Consultation
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[110] bg-[#0A0A0A] p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-cond font-extrabold text-3xl text-white tracking-tighter uppercase italic">
                PCS_
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-10 text-6xl font-cond font-extrabold tracking-tighter uppercase text-white italic">
              {["Services", "About", "Contact"].map((item) => (
                <a key={item} href="#" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * MAIN PAGE APPLICATION
 */
export default function App() {
  const { register, handleSubmit } = useForm();

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#812990] selection:text-white">
      <BackButton />
      {/* ADVANCED STYLING INJECTION */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;1,400&family=Barlow+Condensed:ital,wght@0,500;0,700;0,800;1,700;1,800&display=swap');
        
        :root {
          --pcs-purple: #812990;
          --pcs-blue: #182f7c;
          --pcs-gold: #b9a669;
          --pcs-near-black: #0A0A0A;
          --pcs-light-purple: #F5EDF7;
        }

        .font-cond { font-family: 'Barlow Condensed', sans-serif; }
        .font-base { font-family: 'Barlow', sans-serif; }
        
        /* High-End Glassmorphism */
        .glass-pillar {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-pillar:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(185, 166, 105, 0.5);
          transform: translateY(-8px);
        }

        /* Mesh Gradient Background */
        .mesh-bg {
          background-color: #1A1A1A;
          background-image: 
            radial-gradient(at 0% 0%, rgba(129, 41, 144, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(24, 47, 124, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(129, 41, 144, 0.05) 0px, transparent 80%);
        }

        /* Hero Atmospheric Gradient */
        .hero-gradient {
          background: radial-gradient(circle at 30% 40%, #812990 0%, #3D0E44 60%, #1A1A1A 100%);
        }

        .text-glow {
          text-shadow: 0 0 30px rgba(129, 41, 144, 0.3);
        }
      `,
        }}
      />

      <Navbar />

      {/* 2. HERO SECTION - With High-End Gradient & Mesh */}
      <section className="relative min-h-screen flex flex-col justify-center hero-gradient pt-32 pb-20 overflow-hidden">
        {/* Animated Mesh Glows */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#b9a669]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-[#182f7c]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="max-w-7xl"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-[1px] w-12 bg-[#b9a669]" />
              <p className="font-cond font-medium text-[#b9a669] uppercase tracking-[0.5em] text-[10px]">
                EXECUTIVE ADVISORY
              </p>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-white text-6xl md:text-[9.5rem] leading-[0.85] tracking-[-0.03em] mb-14 font-cond font-extrabold uppercase italic text-glow"
            >
              Executive <br />
              Surgical <br />
              <span className="text-white/40">Interventions_</span>
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <motion.div variants={fadeInUp} className="lg:col-span-7">
                <p className="text-white text-2xl md:text-4xl italic font-base font-normal mb-10 leading-tight max-w-2xl opacity-90">
                  For Organisations That{" "}
                  <span className="text-[#b9a669] not-italic font-bold">
                    Cannot Afford to Guess.
                  </span>
                </p>

                <p className="text-white/60 text-lg md:text-xl font-base mb-12 max-w-xl leading-relaxed">
                  We diagnose precisely. We intervene decisively. <br />
                  We deliver measurable outcomes.
                </p>

                <div className="flex flex-wrap gap-6">
                  <button className="bg-[#b9a669] text-white font-cond font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-sm hover:bg-white hover:text-[#182f7c] transition-all text-xs shadow-2xl shadow-black/40">
                    Book a Consultation
                  </button>
                  <button className="border border-white/20 text-white font-cond font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-sm hover:bg-white/10 transition-all text-xs backdrop-blur-sm">
                    Our Services
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="lg:col-span-5 hidden lg:block"
              >
                <div className="p-10 border-l border-white/10 bg-white/5 backdrop-blur-md rounded-tr-[4rem]">
                  <p className="font-cond font-bold text-[#b9a669] text-xs tracking-[0.3em] mb-4 uppercase">
                    Direct Accountability
                  </p>
                  <p className="text-white font-base text-lg leading-relaxed">
                    "Clients speak directly with the Principal. We do not
                    delegate expertise; we deploy it."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Subtle Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b9a669]/40 to-transparent" />
      </section>

      {/* 3. WHY PCS IS DIFFERENT - Clean Minimalist Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mb-16"
          >
            <span className="font-cond font-medium text-[#182f7c] uppercase tracking-[0.4em] text-[10px] mb-8 block">
              WHY PCS_
            </span>
            <h2 className="font-cond font-bold text-6xl md:text-8xl text-[#1A1A1A] leading-[0.9] tracking-tighter uppercase italic">
              Built Different. <br />
              <span className="text-[#182f7c]">Engineered</span> for Results.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {[
              {
                title: "Precision",
                text: "Deep capability, practical solutions. No diffusion of focus.",
              },
              {
                title: "Accountability",
                text: "Direct engagement with a principal consultant.",
              },
              {
                title: "Systems Thinking",
                text: "Aviation-level thinking applied across complex areas.",
              },
              {
                title: "Performance",
                text: "Performance uplift, risk reduction, structural clarity.",
              },
              {
                title: "Resilience",
                text: "Solutions designed to withstand future disruption.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="h-[2px] w-8 bg-[#b9a669] mb-8 group-hover:w-full transition-all duration-500" />
                <h3 className="text-[#182f7c] font-cond font-bold text-xl uppercase tracking-widest mb-4 italic">
                  {item.title}
                </h3>
                <p className="text-[#1A1A1A]/70 font-base text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOUR SERVICE PILLARS - High-End Bento with Deep Depth */}
      <section id="services" className="py-40 mesh-bg relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-3xl">
              <span className="font-cond font-medium text-[#b9a669] uppercase tracking-[0.4em] text-[10px] mb-6 block">
                WHAT WE DO_
              </span>
              <h2 className="font-cond font-bold text-6xl md:text-8xl text-white leading-[0.9] tracking-tighter uppercase italic">
                Specialised Sectors. <br />
                Decisive Action.
              </h2>
            </div>
            <p className="text-white/40 font-base text-lg max-w-xs border-l border-white/10 pl-8 pb-2">
              Deep expertise across high-consequence environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Grid Layout */}
            <ServiceCard
              idx={0}
              className="md:col-span-7"
              num="01"
              title="Aviation"
              desc="AOC Certification, regulatory interface, restructuring, and precision flight/ground operations leadership."
              icon={<Plane size={32} className="text-[#b9a669]" />}
            />
            <ServiceCard
              idx={1}
              className="md:col-span-5"
              num="02"
              title="Operations"
              desc="Diagnosing friction. Restoring performance through disciplined execution."
              icon={<Activity size={32} className="text-[#b9a669]" />}
            />
            <ServiceCard
              idx={2}
              className="md:col-span-5"
              num="03"
              title="Culture"
              desc="Leadership clarity. Structural alignment. Behavioural discipline at scale."
              icon={<Users size={32} className="text-[#b9a669]" />}
            />
            <ServiceCard
              idx={3}
              className="md:col-span-7"
              num="04"
              title="Safety & Risk"
              desc="From compliance to proactive resilience architectures and safety culture."
              icon={<ShieldCheck size={32} className="text-[#b9a669]" />}
            />
          </div>
        </div>
      </section>

      {/* 5. ABOUT MICHAEL - High-Contrast Editorial Style */}
      <section id="about" className="py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="bg-[#1A1A1A] aspect-[4/5] rounded-[3rem] relative overflow-hidden grayscale group flex items-center justify-center">
                <div className="text-white/5 font-cond font-black text-[15rem] italic select-none">
                  PCS
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#812990]/30 to-transparent" />
                <div className="absolute bottom-12 left-12">
                  <div className="h-[1px] w-12 bg-[#b9a669] mb-4" />
                  <p className="text-[#b9a669] font-cond font-bold tracking-[0.5em] text-[10px] uppercase">
                    FOUNDER
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <span className="font-cond font-medium text-[#b9a669] uppercase tracking-[0.4em] text-[10px] mb-8 block font-black">
                THE PRINCIPAL
              </span>
              <h2 className="font-cond font-extrabold text-7xl md:text-[9rem] text-[#1A1A1A] mb-8 leading-[0.8] uppercase tracking-tighter italic">
                Michael <br />
                Young_
              </h2>
              <p className="font-base text-[#182f7c] text-2xl mb-12 font-bold uppercase tracking-widest opacity-80 italic">
                Founder & Principal Consultant
              </p>

              <div className="space-y-8 text-[#1A1A1A]/70 font-base text-xl leading-relaxed mb-12 max-w-2xl">
                <p>
                  Michael Young brings decades of operational leadership
                  experience across Oceania, the Middle East, North Africa, and
                  Asia. He specializes in high-consequence environments where
                  accountability is non-negotiable.
                </p>
                <p className="font-bold text-[#1A1A1A] italic border-l-4 border-[#b9a669] pl-10 py-2 leading-tight">
                  "Clients work directly with me. There is no delegation. No
                  dilution of accountability."
                </p>
              </div>

              <div className="flex gap-4 mb-16">
                {["MBA", "MA (Hons) Psychology"].map((badge) => (
                  <span
                    key={badge}
                    className="border border-[#b9a669]/30 text-[#b9a669] font-cond font-bold text-[10px] uppercase px-8 py-3 tracking-[0.3em] rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-6 font-cond font-bold text-[#1A1A1A] uppercase tracking-[0.3em] text-xs hover:gap-10 transition-all group"
              >
                Work With Michael{" "}
                <ArrowRight
                  size={20}
                  className="text-[#b9a669] group-hover:translate-x-2 transition-transform"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. ENGAGEMENT MODEL */}
      <section className="py-40 bg-[#F5EDF7] relative">
        <div className="container mx-auto px-6">
          <div className="mb-32">
            <span className="font-cond font-medium text-[#182f7c] uppercase tracking-[0.4em] text-[10px] mb-8 block">
              THE METHODOLOGY_
            </span>
            <h2 className="font-cond font-bold text-6xl md:text-8xl text-[#1A1A1A] leading-[0.9] tracking-tighter uppercase italic">
              Surgical <br />
              Execution.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            {[
              {
                id: "01",
                title: "Diagnostic",
                desc: "Precise assessment of current state friction points.",
              },
              {
                id: "02",
                title: "Strategy",
                desc: "Custom strategic design for high-consequence impact.",
              },
              {
                id: "03",
                title: "Intervention",
                desc: "Direct, controlled implementation and leadership.",
              },
              {
                id: "04",
                title: "Transfer",
                desc: "Capability handover to ensure long-term resilience.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="text-[12rem] font-cond font-extrabold text-[#182f7c]/5 absolute -top-32 -left-10 select-none italic">
                  {step.id}
                </div>
                <div className="h-[2px] w-full bg-[#182f7c]/10 mb-10 overflow-hidden relative">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                    className="absolute inset-0 bg-[#b9a669]"
                  />
                </div>
                <h3 className="text-[#182f7c] text-xl font-cond font-bold uppercase tracking-widest mb-4 italic">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-base text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT / CTA SECTION - Premium Dark UI */}
      <section id="contact" className="py-48 hero-gradient relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="font-cond font-medium text-[#b9a669] uppercase tracking-[0.5em] text-[10px] mb-12 block">
                ENGAGEMENT_
              </span>
              <h2 className="font-cond font-extrabold text-7xl md:text-[9rem] text-white mb-12 leading-[0.8] uppercase tracking-tighter italic">
                Ready for <br />
                <span className="text-white/30 italic">Certainty?_</span>
              </h2>

              <div className="flex items-center gap-8 group cursor-pointer border-t border-white/10 pt-12">
                <div className="p-6 rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500">
                  <MessageCircle size={32} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-cond font-bold tracking-[0.4em] text-[#b9a669] mb-2">
                    WhatsApp Direct
                  </p>
                  <p className="text-4xl font-cond font-bold text-white tracking-tighter italic">
                    +61 459 728 841
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-pillar p-12 md:p-16 rounded-[4rem]"
            >
              <form className="space-y-8" onSubmit={handleSubmit(() => {})}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-cond font-bold tracking-widest text-white/40 ml-4">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      className="w-full bg-white/5 border-b border-white/10 text-white p-4 focus:border-[#b9a669] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-cond font-bold tracking-widest text-white/40 ml-4">
                      Organisation
                    </label>
                    <input
                      {...register("org")}
                      className="w-full bg-white/5 border-b border-white/10 text-white p-4 focus:border-[#b9a669] outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-cond font-bold tracking-widest text-white/40 ml-4">
                    Work Email
                  </label>
                  <input
                    {...register("email")}
                    className="w-full bg-white/5 border-b border-white/10 text-white p-4 focus:border-[#b9a669] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-cond font-bold tracking-widest text-white/40 ml-4">
                    Brief
                  </label>
                  <textarea
                    rows={3}
                    {...register("message")}
                    className="w-full bg-white/5 border-b border-white/10 text-white p-4 focus:border-[#b9a669] outline-none transition-all resize-none"
                  />
                </div>
                <button className="w-full bg-[#b9a669] text-white font-cond font-bold py-7 rounded-sm uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#1A1A1A] transition-all italic">
                  Initiate Consultation
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-24 bg-[#0A0A0A] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div>
              <span className="font-cond font-extrabold text-5xl text-white tracking-tighter uppercase italic block mb-6">
                PCS_
              </span>
              <p className="text-white/40 font-base italic text-lg max-w-sm">
                Executive Surgical Interventions for Organisations That Cannot
                Afford to Guess.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
              <FooterLinkGroup
                title="Sectors"
                links={["Aviation", "Operations", "Culture", "Risk"]}
              />
              <FooterLinkGroup
                title="Company"
                links={["About", "Insights", "LinkedIn", "Contact"]}
              />
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/20 text-[10px] font-cond font-bold uppercase tracking-[0.5em]">
              © 2026 Parachute Consulting Solutions. Australia.
            </p>
            <div className="flex gap-12 text-[10px] font-cond font-bold uppercase tracking-[0.5em] text-white/20">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Legal
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/**
 * REUSABLE COMPONENTS
 */
const ServiceCard = ({ idx, className, num, title, desc, icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.1 }}
    className={`glass-pillar p-14 group flex flex-col justify-between min-h-[420px] rounded-[3.5rem] ${className}`}
  >
    <div className="flex justify-between items-start">
      <span className="font-cond font-bold text-5xl text-[#b9a669] italic opacity-40 group-hover:opacity-100 transition-all">
        {num}
      </span>
      <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[#b9a669]/20 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
    </div>

    <div>
      <h3 className="font-cond font-bold text-4xl uppercase text-white mb-6 italic tracking-tight group-hover:translate-x-2 transition-transform">
        {title}
      </h3>
      <p className="text-white/50 font-base text-lg leading-relaxed group-hover:text-white/80 transition-colors">
        {desc}
      </p>
    </div>

    <div className="pt-10 flex items-center gap-4 text-[#b9a669] font-cond font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
      View Capability <ChevronRight size={16} />
    </div>
  </motion.div>
);

const FooterLinkGroup = ({ title, links }: any) => (
  <div className="space-y-6">
    <h4 className="font-cond font-bold text-[#b9a669] uppercase tracking-[0.4em] text-[10px]">
      {title}
    </h4>
    <ul className="space-y-4">
      {links.map((link: any) => (
        <li key={link}>
          <a
            href="#"
            className="text-white/40 font-cond font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
