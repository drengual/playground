import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    className="fixed top-6 left-6 z-[100] px-5 py-3 bg-[#1A0B2E]/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#4A1D96] group"
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

  // Dark Theme Palette: High-End Creative Authority
  const colors = {
    purple: "#6366F1", // Vibrant Purple for CTAs and highlights
    deepPurple: "#0F071A", // The Main Background (Deepest Purple/Black)
    surface: "#1A0B2E", // Card Surface
    blue: "#3B82F6", // Complexity Reduction (Clarity)
    gold: "#BCA570", // High-Quality Value (Accent)
    textMain: "#FFFFFF",
    textMuted: "#94A3B8",
  };

  return (
    <>
      <BackButton />
      <div
        className="min-h-screen text-white font-sans selection:bg-[#6366F1] selection:text-white overflow-x-hidden"
        style={{ backgroundColor: colors.deepPurple }}
      >
        {/* Ambient Kinetic Glows */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#4A1D96]/20 blur-[150px] animate-pulse" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#3B82F6]/10 blur-[120px]" />
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
              <span className="text-xl font-black tracking-tighter">
                PARACHUTE<span style={{ color: colors.gold }}>_</span>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-1 text-xs font-black uppercase tracking-widest p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
              {["Expertise", "Insights", "Approach"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-6 py-2.5 rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white"
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
                className="hidden sm:flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <button
                className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-2xl transition-all hover:scale-105 active:scale-95 border border-white/10"
                style={{ backgroundColor: colors.purple }}
              >
                Start Project
              </button>
              <button
                className="md:hidden p-2 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-52 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 mb-10">
                    <span
                      className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-white/10"
                      style={{
                        color: colors.gold,
                        backgroundColor: "rgba(188, 165, 112, 0.1)",
                      }}
                    >
                      Strategic Descent
                    </span>
                    <div className="h-[1px] w-12 bg-white/10" />
                  </div>

                  <h1 className="text-7xl md:text-[110px] font-black leading-[0.85] tracking-tighter mb-12">
                    Creative <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-300 to-[#3B82F6]">
                      Solutions.
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-14 font-medium leading-relaxed">
                    We strip back the noise of Australian enterprise. Reducing
                    complexity through{" "}
                    <span className="text-white">Blue Sky thinking</span> and
                    delivering{" "}
                    <span style={{ color: colors.gold }}>
                      High-Quality Value
                    </span>
                    .
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <button
                      className="group px-10 py-6 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-4 transition-all hover:gap-8 active:scale-95 shadow-2xl shadow-indigo-500/20"
                      style={{ backgroundColor: colors.purple }}
                    >
                      REFOCUS YOUR BUSINESS <ArrowRight size={24} />
                    </button>
                    <button className="px-10 py-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
                      Our Approach
                      <Plus
                        size={20}
                        className="group-hover:rotate-90 transition-transform"
                        style={{ color: colors.gold }}
                      />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-4 hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 to-transparent rounded-[4rem] blur-2xl" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/10 bg-[#1A0B2E]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
                    alt="Abstract Light Motion"
                    className="w-full h-full object-cover opacity-60 mix-blend-screen"
                  />

                  {/* Floating Metric */}
                  <div className="absolute inset-x-6 bottom-6 p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10">
                    <Zap className="mb-4" style={{ color: colors.blue }} />
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Complexity Reduction
                    </div>
                    <div className="text-4xl font-black text-white">92.4%</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Grid */}
        <section className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Creative Solutions (Dominant Purple) */}
              <motion.div
                whileHover={{ y: -10 }}
                className="p-12 rounded-[3rem] border border-white/5 bg-[#1A0B2E] relative overflow-hidden group"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] mb-20 group-hover:bg-[#6366F1] group-hover:text-white transition-all duration-500">
                    <BarChart3 size={28} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-4 tracking-tighter">
                      Creative Audit
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed">
                      Surgical intervention to identify structural drag and
                      hidden potential.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 text-[#6366F1]/5 group-hover:text-[#6366F1]/10 transition-colors">
                  <BarChart3 size={240} />
                </div>
              </motion.div>

              {/* Blue Sky Thinking (Clarity Blue) */}
              <motion.div
                whileHover={{ y: -10 }}
                className="p-12 rounded-[3rem] border border-white/5 bg-[#1A0B2E] relative overflow-hidden group"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] mb-20 group-hover:bg-[#3B82F6] group-hover:text-white transition-all duration-500">
                    <Globe2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-4 tracking-tighter">
                      Blue Sky
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed">
                      Reducing operational complexity through visionary
                      strategic mapping.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 text-[#3B82F6]/5 group-hover:text-[#3B82F6]/10 transition-colors">
                  <Globe2 size={240} />
                </div>
              </motion.div>

              {/* High Quality Value (Gold Accent) */}
              <motion.div
                whileHover={{ y: -10 }}
                className="p-12 rounded-[3rem] border border-white/5 bg-gradient-to-br from-[#1A0B2E] to-black relative overflow-hidden group"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#BCA570]/10 flex items-center justify-center text-[#BCA570] mb-20 group-hover:bg-[#BCA570] group-hover:text-white transition-all duration-500">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-4 tracking-tighter">
                      High-Tier Value
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed">
                      Ensuring precision and quality at every point of the
                      descent.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 text-[#BCA570]/5 group-hover:text-[#BCA570]/10 transition-colors">
                  <ShieldCheck size={240} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy - Kinetic Interaction */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto bg-[#1A0B2E] rounded-[4rem] border border-white/5 p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-20 grayscale mix-blend-luminosity"
                alt="Tech Architecture"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#1A0B2E]/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-12">
                Stripping away <br />
                the <span style={{ color: colors.blue }}>noise.</span>
              </h2>
              <p className="text-2xl text-slate-400 font-medium leading-relaxed mb-16">
                Our philosophy is simple: complexity is the enemy of quality. We
                use creative problem solving to reveal the high-value core of
                your business.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div
                    className="text-4xl font-black mb-2"
                    style={{ color: colors.purple }}
                  >
                    01
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    Creative Audit
                  </div>
                </div>
                <div>
                  <div
                    className="text-4xl font-black mb-2"
                    style={{ color: colors.blue }}
                  >
                    02
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    Logic Reduction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-52 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-8xl md:text-[140px] font-black tracking-tighter leading-[0.8] mb-16">
              Secure your <br />
              <span style={{ color: colors.gold }}>Future.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                className="px-14 py-7 rounded-3xl text-white font-black text-xl tracking-tighter shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center gap-4"
                style={{ backgroundColor: colors.purple }}
              >
                REQUEST STRATEGY <MoveUpRight size={24} />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pt-32 pb-16 px-6 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mb-32">
              <div className="col-span-2">
                <div className="text-3xl font-black tracking-tighter mb-10">
                  PARACHUTE<span style={{ color: colors.gold }}>_</span>
                </div>
                <p className="text-slate-500 max-w-xs font-bold text-[10px] uppercase tracking-[0.3em] leading-loose">
                  Creative Solutions. <br />
                  Reduced Complexity. <br />
                  High-Quality Value.
                </p>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-10">
                  Capabilities
                </div>
                <ul className="space-y-5 font-black text-xs uppercase tracking-widest text-slate-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Creative Strategy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Business Audit
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Value Logic
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-10">
                  Connect
                </div>
                <ul className="space-y-5 font-black text-xs uppercase tracking-widest text-slate-400">
                  <li className="text-white">Sydney / NSW</li>
                  <li className="lowercase">hello@parachute.co.au</li>
                  <li>
                    <Linkedin
                      size={20}
                      className="cursor-pointer hover:text-white transition-colors"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center pt-12 border-t border-white/5">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-700">
                © 2026 Parachute Consulting.
              </div>
              <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-700">
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
                <a href="#" className="hover:text-white">
                  Ethics
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 z-[100] bg-[#0F071A] flex flex-col p-10"
            >
              <div className="flex justify-between items-center mb-24">
                <span className="text-xl font-black tracking-tighter">
                  PARACHUTE_
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-4 rounded-full bg-white/5"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="flex flex-col gap-10 text-6xl font-black tracking-tighter">
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
                  className="w-full py-8 rounded-[2rem] text-white font-black text-2xl tracking-tighter"
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
