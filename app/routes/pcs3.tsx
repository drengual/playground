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
  Users,
  Plane,
  Phone,
  MessageSquare,
} from "lucide-react";

const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed top-6 left-6 z-[100] px-5 py-3 bg-[#0F071A]/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#6366F1] group"
  >
    <ArrowRight
      className="rotate-180 group-hover:-translate-x-1 transition-transform"
      size={16}
    />
    Back
  </button>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const colors = {
    purple: "#6366F1", // Customised solutions
    deepPurple: "#0F071A", // Brand Base
    blue: "#3B82F6", // New Perspectives / Clarity
    gold: "#BCA570", // High-Quality Value
    surface: "#1A0B2E",
    textMuted: "#94A3B8",
  };

  const services = [
    {
      title: "Operations & Logistics",
      icon: <BarChart3 />,
      color: colors.blue,
      desc: "Lifting operational capability and adaptability. Managing transport operations (road, rail, shipping, air) in challenging times.",
    },
    {
      title: "Organisation Culture",
      icon: <Users />,
      color: colors.purple,
      desc: "Elevate by optimising resources. Sounding board for leveraging strengths and building resilience in low-margin environments.",
    },
    {
      title: "Safety & Risk",
      icon: <ShieldCheck />,
      color: colors.gold,
      desc: "Avoid free fall. Using aviation-grade safety systems to manage fatigue, loading, and compliance across all sectors.",
    },
    {
      title: "Aviation Expertise",
      icon: <Plane />,
      color: colors.blue,
      desc: "Soar with MRO Quality Assurance, AOC support, and technical writing from our global specialist network.",
    },
  ];

  return (
    <>
      <BackButton />
      <div
        className="min-h-screen text-white font-sans selection:bg-[#6366F1] selection:text-white overflow-x-hidden"
        style={{ backgroundColor: colors.deepPurple }}
      >
        {/* Kinetic Glows */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#4A1D96]/15 blur-[150px]" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#3B82F6]/10 blur-[120px]" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#6366F1]">
                <div className="w-3 h-3 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-black tracking-tighter">
                PARACHUTE<span style={{ color: colors.gold }}>_</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1 text-[10px] font-black uppercase tracking-widest p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
              {["Home", "Services", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`px-6 py-2.5 rounded-full transition-all ${activeTab === item ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="px-6 py-2.5 rounded-full text-white font-bold text-sm border border-white/10 hover:bg-[#6366F1] transition-all"
              style={{
                backgroundColor:
                  activeTab === "Contact" ? colors.gold : "transparent",
              }}
            >
              Let's Work Together
            </button>
          </div>
        </nav>

        {/* Hero: Content V4 Integrated */}
        <section className="relative pt-52 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <span
                  style={{ color: colors.gold }}
                  className="text-[10px] font-black uppercase tracking-[0.3em]"
                >
                  Guiding Business Success
                </span>
                <div className="h-[1px] w-12 bg-white/10" />
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-12">
                New Perspectives. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                  Accelerated Growth.
                </span>
              </h1>

              <div className="relative pl-8 border-l-2 border-[#BCA570] mb-12">
                <p className="text-2xl italic text-slate-300 font-medium leading-relaxed mb-4">
                  “If you change the way you look at things, the things you look
                  at change.”
                </p>
                <cite className="text-sm font-black uppercase tracking-widest text-slate-500">
                  — Wayne Dyer
                </cite>
              </div>

              <p className="text-xl text-slate-400 max-w-2xl mb-14 leading-relaxed font-medium">
                With our expertise and knowledge, we offer a new perspective to
                help you achieve your goals and accelerate your ability to
                adapt, grow and deliver services more effectively.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  className="px-10 py-6 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-4 transition-all hover:scale-105 shadow-2xl"
                  style={{ backgroundColor: colors.purple }}
                >
                  LET'S WORK TOGETHER <ArrowRight size={22} />
                </button>
                <button className="px-10 py-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  View Our Services{" "}
                  <MoveUpRight size={20} style={{ color: colors.blue }} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Philosophy: Logo Meaning */}
        <section className="py-32 px-6 border-y border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                Avoid <span style={{ color: colors.gold }}>Free Fall</span> in
                times of uncertainty.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Parachute Consulting Solutions (PCS) provides affordable and
                practical advice to SMEs and NGOs. Our aim is simple: Lift
                performance, soar above the others, and elevate your teams.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    label: "Purple",
                    text: "Customised solutions respecting your business needs.",
                    c: colors.purple,
                  },
                  {
                    label: "Blue",
                    text: "Focus on new perspectives and clarity.",
                    c: colors.blue,
                  },
                  {
                    label: "Gold",
                    text: "High-quality solutions that deliver true value.",
                    c: colors.gold,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-4 items-start p-6 rounded-3xl bg-white/5 border border-white/5"
                  >
                    <div
                      className="w-4 h-4 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: item.c }}
                    />
                    <div>
                      <span
                        className="font-black uppercase tracking-widest text-xs block mb-1"
                        style={{ color: item.c }}
                      >
                        {item.label}
                      </span>
                      <p className="text-sm text-slate-300 font-medium">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-[#1A0B2E] flex items-center justify-center">
              <div className="text-center p-12">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-dashed border-[#BCA570] animate-[spin_20s_linear_infinite] flex items-center justify-center">
                  <Zap size={48} style={{ color: colors.gold }} />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">
                  The PCS Signature
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  No one-size-fits-all. We guide your descent based on your
                  specific objectives and constraints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24">
              <h2 className="text-6xl font-black tracking-tighter mb-6">
                Expertise.
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">
                Everyone needs guidance to realise their goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="p-12 rounded-[3rem] bg-[#1A0B2E] border border-white/5 group hover:border-white/20 transition-all cursor-pointer"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-12 transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${s.color}20`, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-6 tracking-tighter">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    {s.desc}
                  </p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                    Full Description{" "}
                    <ArrowRight size={16} style={{ color: s.color }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Michael */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#1A0B2E] to-black rounded-[4rem] border border-white/10 p-12 md:p-24 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                    alt="Michael Young"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 p-8 bg-[#BCA570] rounded-3xl text-[#0F071A]">
                  <p className="text-sm font-black uppercase tracking-widest mb-1">
                    Michael Young
                  </p>
                  <p className="text-xs font-bold opacity-80 uppercase">
                    Founder & Lead Consultant
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-5xl font-black tracking-tighter mb-8 italic">
                  "I help organisations realise their dreams."
                </h2>
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-medium">
                  <p>
                    Michael has a strong background in reducing complexity. His
                    C-suite roles across Oceania, MENA, and Asia help him
                    isolate where to start in understanding your business.
                  </p>
                  <p>
                    With degrees in Management (MBA) and Psychology (MA Hons),
                    his experience translates across sectors, enabling him to
                    tweak and adapt responses to improve resilience.
                  </p>
                </div>
                <div className="mt-12 pt-12 border-t border-white/10">
                  <p className="text-sm italic text-slate-500 mb-2">
                    “If you do not change direction you may end up where you're
                    heading”
                  </p>
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.3em]"
                    style={{ color: colors.gold }}
                  >
                    — Lao Tzu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="pt-40 pb-16 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-20 mb-32">
              <div className="md:col-span-5">
                <h2 className="text-6xl font-black tracking-tighter mb-10 leading-none">
                  Let's <span style={{ color: colors.gold }}>land</span> safely.
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-2xl font-black transition-colors hover:text-[#6366F1] cursor-pointer">
                    <Phone size={24} style={{ color: colors.blue }} /> +64 22
                    532 3951
                  </div>
                  <div className="flex items-center gap-4 text-2xl font-black transition-colors hover:text-[#6366F1] cursor-pointer">
                    <MessageSquare size={24} style={{ color: colors.purple }} />{" "}
                    hello@parachute.co.au
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 grid grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-8">
                    What to Expect
                  </h4>
                  <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                    <li className="hover:text-white cursor-default">
                      Sounding Board
                    </li>
                    <li className="hover:text-white cursor-default">
                      One-on-One Coaching
                    </li>
                    <li className="hover:text-white cursor-default">
                      Group Facilitation
                    </li>
                    <li className="hover:text-white cursor-default">
                      Project Management
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-8">
                    Quick Links
                  </h4>
                  <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Operations Case Study
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Safety Case Study
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Culture Case Study
                    </li>
                    <li>
                      <Linkedin
                        size={20}
                        className="hover:text-white transition-colors cursor-pointer"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-700">
              <p>© 2026 Parachute Consulting Solutions. All Rights Reserved.</p>
              <div className="flex gap-10">
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
                <a href="#" className="hover:text-white">
                  Governance
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
