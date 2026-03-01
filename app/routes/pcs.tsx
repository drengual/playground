import React, { useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ArrowRight,
  Plus,
  Linkedin,
  Menu,
  X,
  Zap,
  ShieldCheck,
  BarChart3,
  Globe2,
  MoveUpRight,
} from "lucide-react";

const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed top-6 left-6 z-[100] px-5 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#2D1B4E] hover:bg-[#4A1D96] hover:text-white group"
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
  </button>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refined Brand Palette for Professionalism
  const colors = {
    purple: "#4A1D96", // Primary: Creative Solutions (Vibrant but deep)
    deepPurple: "#1A0B2E", // Backgrounds: The "New Navy"
    blue: "#3B82F6", // Second: Reducing Complexity
    gold: "#BCA570", // Third: High-quality value
    offWhite: "#FCFBFF",
    text: "#1A0B2E",
  };

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-[#FCFBFF] text-[#1A0B2E] font-sans selection:bg-[#4A1D96] selection:text-white overflow-x-hidden">
        {/* Dynamic Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-[#4A1D96]/5 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-[#3B82F6]/10 blur-[100px]" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: colors.purple }}
              >
                <div className="w-3 h-3 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[#1A0B2E]">
                PARACHUTE<span style={{ color: colors.gold }}>_</span>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-1 text-sm font-bold p-1 bg-white/50 backdrop-blur-md border border-gray-100 rounded-full shadow-sm">
              {["Expertise", "Insights", "Approach"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-6 py-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-[#4A1D96]"
                >
                  {item}
                </a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <a
                href="#"
                className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#4A1D96]/60 hover:text-[#4A1D96] transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <button
                className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-lg shadow-[#4A1D96]/20 transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: colors.purple }}
              >
                Start Project
              </button>
              <button
                className="md:hidden p-2 text-[#1A0B2E]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-44 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-purple-50 text-[#4A1D96]">
                      Strategy × Creativity
                    </span>
                    <div className="h-[1px] w-12 bg-gray-200" />
                  </div>

                  <h1 className="text-7xl md:text-[100px] font-black leading-[0.85] tracking-tighter mb-10">
                    Precision <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A1D96] via-[#3B82F6] to-[#BCA570]">
                      In Every Landing.
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-gray-500 max-w-xl mb-12 font-medium leading-relaxed">
                    We strip back the noise of Australian enterprise through
                    creative solutions that reduce complexity and deliver
                    high-quality value.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="group px-8 py-5 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-4 transition-all hover:gap-6 active:scale-95 shadow-xl shadow-[#4A1D96]/20"
                      style={{ backgroundColor: colors.purple }}
                    >
                      REFOCUS YOUR BUSINESS <ArrowRight size={24} />
                    </button>
                    <button className="px-8 py-5 rounded-2xl border-2 border-gray-100 bg-white font-bold text-lg hover:border-[#BCA570] transition-colors flex items-center justify-center gap-2">
                      Case Studies{" "}
                      <Plus size={20} style={{ color: colors.gold }} />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative z-10 aspect-[4/5] bg-gray-100 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                    alt="Corporate Creative Space"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-8 top-20 z-20 p-6 rounded-3xl backdrop-blur-xl border border-white/50 bg-white/60 shadow-xl max-w-[200px]"
                >
                  <Zap className="mb-4" style={{ color: colors.blue }} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Complexity Index
                  </div>
                  <div className="text-3xl font-black text-[#4A1D96]">-92%</div>
                  <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase">
                    Strategic Focus Gained
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                Creative <span style={{ color: colors.purple }}>Strategy.</span>{" "}
                <br />
                Reduced <span style={{ color: colors.blue }}>Complexity.</span>
              </h2>
              <p className="text-gray-400 max-w-xs font-bold text-sm uppercase tracking-widest leading-loose">
                Specialized high-tier strategy utilizing the Parachute
                philosophy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="md:col-span-2 p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer overflow-hidden relative"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl mb-8 flex items-center justify-center bg-purple-50 text-[#4A1D96] group-hover:bg-[#4A1D96] group-hover:text-white transition-colors">
                    <BarChart3 size={24} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter">
                    Creative Audit
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                    Leveraging creative problem solving to identify structural
                    drag. We find the elegant solution within the chaos.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity text-[#4A1D96]">
                  <BarChart3 size={200} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-[#1A0B2E] text-white shadow-xl flex flex-col justify-between group cursor-pointer"
              >
                <ShieldCheck size={32} style={{ color: colors.gold }} />
                <div>
                  <h3 className="text-2xl font-black mb-2 tracking-tighter">
                    Value Guard
                  </h3>
                  <p className="text-sm opacity-50 font-medium leading-relaxed">
                    Ensuring high-quality delivery at every milestone.
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-[#3B82F6] text-white transition-colors group cursor-pointer shadow-lg shadow-blue-500/20"
              >
                <Globe2 size={32} className="mb-20 text-white" />
                <h3 className="text-2xl font-black tracking-tighter leading-none">
                  Blue Sky <br />
                  Thinking
                </h3>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy Section - Using the Deep Midnight Purple */}
        <section className="py-24 bg-[#1A0B2E] rounded-[4rem] mx-4 mb-4 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest mb-8">
                The Philosophy
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
                Creative <br />
                <span style={{ color: colors.blue }}>Clarity.</span>
              </h2>
              <p className="text-xl text-purple-100/60 font-medium leading-relaxed mb-12">
                We blend creative intuition with logical reduction. By stripping
                away the unnecessary, we leave behind only the high-value core
                of your enterprise strategy.
              </p>
              <div className="space-y-6">
                {[
                  "Creative Problem Solving",
                  "Complexity Reduction",
                  "High-Quality Value Streams",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-[2px] bg-[#BCA570]" />
                    <span className="font-black text-sm uppercase tracking-widest text-white/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative z-10 aspect-[4/5] md:aspect-auto">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Strategy Workshop"
                  className="w-full h-full object-cover opacity-40 grayscale"
                />
              </div>
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#4A1D96]/40 to-transparent blur-[80px] -z-0" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-6 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-7xl md:text-[120px] font-black tracking-tighter leading-none mb-12">
              Start the <br />
              <span style={{ color: colors.gold }}>Project.</span>
            </h2>
            <p className="text-2xl text-gray-400 font-medium mb-16">
              Experience the power of high-quality creative strategy. <br />
              Reduce complexity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="px-12 py-6 rounded-3xl text-white font-black text-xl tracking-tighter shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
                style={{ backgroundColor: colors.purple }}
              >
                REQUEST STRATEGY SESSION <MoveUpRight size={24} />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pt-32 pb-12 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-2">
                <div className="text-3xl font-black tracking-tighter mb-8 text-[#1A0B2E]">
                  PARACHUTE<span style={{ color: colors.gold }}>_</span>
                </div>
                <p className="text-gray-400 max-w-xs font-bold text-xs uppercase tracking-widest leading-loose">
                  Creative solutions. Reduced complexity. <br />
                  High-quality value.
                </p>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-8">
                  Capabilities
                </div>
                <ul className="space-y-4 font-black text-sm uppercase tracking-wider text-[#4A1D96]">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#BCA570] transition-colors"
                    >
                      Creative Strategy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#BCA570] transition-colors"
                    >
                      Audit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#BCA570] transition-colors"
                    >
                      Value Mapping
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-8">
                  Connection
                </div>
                <ul className="space-y-4 font-black text-sm uppercase tracking-wider text-[#4A1D96]">
                  <li className="text-gray-900">SYDNEY / NSW</li>
                  <li className="lowercase text-gray-400">
                    hello@parachute.co.au
                  </li>
                  <li>
                    <Linkedin
                      size={20}
                      className="cursor-pointer hover:text-[#BCA570]"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between pt-12 border-t border-gray-100 gap-8">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                © 2026 Parachute Consulting.
              </div>
              <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-300">
                <a href="#" className="hover:text-[#4A1D96]">
                  Privacy
                </a>
                <a href="#" className="hover:text-[#4A1D96]">
                  Values
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-white flex flex-col p-10"
            >
              <div className="flex justify-between items-center mb-20">
                <span className="text-xl font-black tracking-tighter">
                  PARACHUTE_
                </span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={32} />
                </button>
              </div>
              <div className="flex flex-col gap-8 text-5xl font-black tracking-tighter text-[#1A0B2E]">
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  EXPERTISE
                </a>
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  INSIGHTS
                </a>
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  APPROACH
                </a>
              </div>
              <div className="mt-auto">
                <button
                  className="w-full py-6 rounded-3xl text-white font-black text-xl"
                  style={{ backgroundColor: colors.purple }}
                >
                  START PROJECT
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default App;
