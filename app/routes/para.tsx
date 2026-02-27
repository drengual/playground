import React, { useState } from "react";
import { Link } from "react-router";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Target,
  Compass,
  Shield,
  ChevronRight,
  Menu,
  X,
  Linkedin,
  Globe,
  Anchor,
} from "lucide-react";

const BackButton = () => (
  <Link
    to="/"
    className="fixed top-6 left-6 z-[100] px-5 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#172F7C] hover:bg-[#172F7C] hover:text-white group"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="group-hover:-translate-x-1 transition-transform"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
    Back
  </Link>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Custom Branding Colors
  const colors = {
    gold: "#BCA570",
    navy: "#172F7C",
    cream: "#F9F7F2",
    white: "#FFFFFF",
  };

  return (
    <>
      <BackButton />
      <div className="min-h-screen font-serif bg-[#F9F7F2] text-[#172F7C] selection:bg-[#BCA570] selection:text-white">
        {/* Navigation */}
        <nav className="fixed w-full z-50 px-6 py-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-xl bg-white/40 border border-white/20 rounded-2xl px-8 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: colors.gold }}
              >
                <Anchor size={18} />
              </div>
              <span className="text-xl font-bold tracking-[0.2em] font-sans">
                PARACHUTE
              </span>
            </div>

            <div className="hidden md:flex items-center gap-12 text-sm font-semibold tracking-widest uppercase font-sans">
              <a href="#" className="hover:opacity-60 transition-opacity">
                Expertise
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity">
                Insights
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity">
                Strategy
              </a>
              <button
                className="px-6 py-3 rounded-full text-white transition-transform active:scale-95"
                style={{ backgroundColor: colors.navy }}
              >
                Book Consultation
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-[60] bg-white p-8 md:hidden flex flex-col justify-center items-center gap-8 text-2xl font-bold font-sans uppercase tracking-widest"
            >
              <button
                className="absolute top-10 right-10"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={32} />
              </button>
              <a href="#" onClick={() => setIsMenuOpen(false)}>
                Expertise
              </a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>
                Insights
              </a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>
                Strategy
              </a>
              <button
                className="px-8 py-4 rounded-full text-white text-lg"
                style={{ backgroundColor: colors.navy }}
              >
                Book Consultation
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <div
                  className="w-12 h-[1px]"
                  style={{ backgroundColor: colors.gold }}
                ></div>
                <span
                  className="text-sm font-sans font-bold tracking-[0.3em] uppercase"
                  style={{ color: colors.gold }}
                >
                  Boutique Australian Consultancy
                </span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 italic">
                Strategy with <br />
                <span style={{ color: colors.gold }}>Precision.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-lg mb-10 leading-relaxed font-sans">
                Removing complexity to reveal clarity. We help Australian
                executives navigate market shifts with high-impact, focused
                interventions.
              </p>

              <div className="flex flex-wrap gap-4 font-sans">
                <button
                  className="px-10 py-5 rounded-full text-white font-bold tracking-wider flex items-center gap-3 group transition-all hover:shadow-2xl active:scale-95"
                  style={{ backgroundColor: colors.navy }}
                >
                  REQUEST AUDIT{" "}
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Main Hero Image - Architectural Minimalism */}
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern Australian Architecture"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Gold Element */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-10 -left-10 w-48 h-48 rounded-3xl p-8 shadow-xl backdrop-blur-lg border border-white/20"
                style={{ backgroundColor: `${colors.gold}EE` }}
              >
                <div className="text-white font-sans">
                  <div className="text-4xl font-bold mb-1">15+</div>
                  <div className="text-xs uppercase tracking-widest leading-tight">
                    Years of Executive Guidance
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Background Decorative Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-gray-200/20 select-none -z-10 tracking-tighter">
            FOCUS
          </div>
        </section>

        {/* Services Section - The "Parachute" Landing */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="text-5xl font-bold mb-6 italic">
                  Core Expertise
                </h2>
                <p className="text-lg text-gray-500 font-sans">
                  We don't provide templates. We provide surgical focus on the
                  areas that define your market position.
                </p>
              </div>
              <div
                className="font-sans text-sm font-bold tracking-widest uppercase pb-2 border-b-2"
                style={{ borderColor: colors.gold }}
              >
                View All Methodology
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-0 border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm font-sans">
              {[
                {
                  icon: <Target size={32} />,
                  title: "Market Refocus",
                  desc: "Re-aligning your service offering with modern Australian demand patterns.",
                },
                {
                  icon: <Compass size={32} />,
                  title: "Strategic Pivot",
                  desc: "Navigating organizational transitions with minimal friction and maximum speed.",
                },
                {
                  icon: <Shield size={32} />,
                  title: "Executive Clarity",
                  desc: "Removing noise from decision-making at the board and management level.",
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    backgroundColor: colors.navy,
                    color: "#FFFFFF",
                  }}
                  className="p-16 border-r last:border-r-0 border-gray-100 transition-colors duration-500 group cursor-pointer"
                >
                  <div
                    className="mb-8 transition-transform group-hover:scale-110 group-hover:text-[#BCA570]"
                    style={{ color: colors.gold }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="opacity-70 leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                    Explore <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LinkedIn Integration Concept */}
        <section className="py-32 bg-[#172F7C] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-video bg-gray-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                  alt="Workspace"
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Linkedin size={48} className="text-[#BCA570] mb-4" />
                    <span className="font-sans text-sm tracking-[0.3em] font-bold uppercase">
                      Linked Presence
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-5xl font-bold mb-8 italic">
                Unified Authority.
              </h2>
              <p className="text-xl text-gray-300 font-sans leading-relaxed mb-10">
                Your digital presence should be a singular experience. From the
                first click on LinkedIn to the final consultation, we ensure
                your brand speaks with one, focused voice.
              </p>
              <ul className="space-y-4 font-sans text-lg">
                <li className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.gold }}
                  ></div>
                  Consistent Messaging Strategy
                </li>
                <li className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.gold }}
                  ></div>
                  Premium Visual Continuity
                </li>
                <li className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.gold }}
                  ></div>
                  Strategic Lead Synchronization
                </li>
              </ul>
            </div>
          </div>

          {/* Decorative Gold Glow */}
          <div
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[150px]"
            style={{ backgroundColor: `${colors.gold}33` }}
          ></div>
        </section>

        {/* Modern CTA */}
        <section className="py-40 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-bold mb-12 italic tracking-tighter">
                Ready to <span style={{ color: colors.gold }}>refocus?</span>
              </h2>
              <p className="text-2xl text-gray-500 font-sans mb-16 leading-relaxed">
                Australian business landscapes move fast. Let's ensure your next
                landing is the right one.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <button
                  className="px-12 py-6 rounded-full text-white font-bold text-xl tracking-widest font-sans shadow-2xl transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: colors.navy }}
                >
                  BOOK STRATEGY CALL
                </button>
                <button
                  className="px-12 py-6 rounded-full font-bold text-xl tracking-widest font-sans border-2 transition-colors hover:bg-gray-50"
                  style={{ borderColor: colors.navy }}
                >
                  VIEW PORTFOLIO
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-gray-100 font-sans">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
              <div className="col-span-2">
                <div className="text-2xl font-bold tracking-[0.3em] mb-6">
                  PARACHUTE<span style={{ color: colors.gold }}>.</span>
                </div>
                <p className="max-w-xs text-gray-500 leading-relaxed uppercase text-xs tracking-widest font-bold">
                  Focused Consultancy Solutions for the Australian Enterprise
                  Market.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xs tracking-[0.2em] uppercase mb-6 text-gray-400">
                  Navigation
                </h4>
                <ul className="space-y-4 text-sm font-bold">
                  <li>
                    <a href="#" className="hover:opacity-50">
                      Expertise
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:opacity-50">
                      Methodology
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:opacity-50">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-xs tracking-[0.2em] uppercase mb-6 text-gray-400">
                  Contact
                </h4>
                <ul className="space-y-4 text-sm font-bold">
                  <li>Sydney, Australia</li>
                  <li>hello@parachuteconsulting.co.au</li>
                  <li>+61 (02) 0000 0000</li>
                </ul>
              </div>
            </div>
            <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
              <div>© 2026 Parachute Consulting Solutions</div>
              <div className="flex gap-8">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Engagement</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
