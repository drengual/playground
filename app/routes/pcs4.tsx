import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Plane,
  Activity,
  ShieldCheck,
  Users,
  ArrowRight,
  Menu,
  X,
  MessageCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed top-6 left-6 z-[100] px-5 py-3 bg-[#0A0514]/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-amber-500 group"
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pillars = [
    {
      id: "01",
      title: "Aviation",
      desc: "Precision across flight and ground operations. AOC certification, restructuring, and regulatory interface.",
      icon: <Plane className="w-6 h-6 text-blue-400" />,
      color: "from-blue-900/40 to-blue-600/10",
    },
    {
      id: "02",
      title: "Operations & Logistics",
      desc: "Diagnosing friction. Restoring performance through disciplined execution and disruption management.",
      icon: <Activity className="w-6 h-6 text-purple-400" />,
      color: "from-purple-900/40 to-purple-600/10",
    },
    {
      id: "03",
      title: "Organisation Culture",
      desc: 'Leadership clarity and structural alignment. Recalibrating the "operating system" of your business.',
      icon: <Users className="w-6 h-6 text-amber-400" />,
      color: "from-amber-900/40 to-amber-600/10",
    },
    {
      id: "04",
      title: "Safety & Risk",
      desc: "Advanced risk methodologies translated from aviation to complex corporate and regulatory environments.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-900/40 to-emerald-600/10",
    },
  ];

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-[#0A0514] text-slate-100 font-sans selection:bg-amber-500/30">
        {/* Navigation */}
        <nav
          className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0514]/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"}`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none">
                PARACHUTE
              </span>
              <span className="text-[10px] tracking-[0.3em] font-light text-amber-500 uppercase">
                Consulting Solutions
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
              <a href="#" className="hover:text-amber-500 transition-colors">
                Aviation
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Operations
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Culture
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Risk
              </a>
              <button className="bg-white text-black px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-amber-500 transition-all">
                Consultation <ChevronRight size={16} />
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

        {/* Hero Section */}
        <section className="relative pt-44 pb-24 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-500 mb-8 tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Executive Surgical Interventions
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              FOR ORGANISATIONS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                THAT CANNOT AFFORD TO GUESS.
              </span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed mb-12 font-light">
              PCS delivers precision diagnostics and decisive action for C-Suite
              leaders navigating operational complexity, leadership pressure,
              and high-consequence risk.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-500 hover:bg-amber-400 text-black font-black px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20">
                BOOK CONSULTATION <MessageCircle size={20} />
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                VIEW CAPABILITIES <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid Services */}
        <section className="py-24 px-6 bg-[#0E071A]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">
                Core Service Pillars
              </h2>
              <h3 className="text-4xl font-black tracking-tight">
                SPECIALISED INTERVENTIONS.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Featured Bento Item */}
              <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-500">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mb-8 shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform">
                    <Plane className="text-black" />
                  </div>
                  <h4 className="text-3xl font-black mb-4">
                    Aviation Precision
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    From AOC initial issues to crisis stabilization. We apply
                    aviation-grade systems thinking to restructure and optimize
                    your most complex operations.
                  </p>
                </div>
                <div className="mt-12 flex items-center text-amber-500 font-bold gap-2 cursor-pointer group-hover:gap-4 transition-all">
                  EXPLORE AVIATION SECTOR <ArrowRight size={20} />
                </div>
              </div>

              {/* Smaller Bento Items */}
              {pillars.slice(1).map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-between hover:bg-white/[0.08] transition-all"
                >
                  <div>
                    <div className="mb-6">{pillar.icon}</div>
                    <h4 className="text-xl font-black mb-3">{pillar.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500 group cursor-pointer hover:text-white transition-colors">
                    Details <ExternalLink size={14} />
                  </div>
                </div>
              ))}

              {/* Unique Stat/Trust Item */}
              <div className="md:col-span-2 bg-amber-500 p-8 rounded-[2rem] text-black flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">
                    Engagement Model
                  </p>
                  <h4 className="text-2xl font-black leading-none">
                    Diagnostic to <br />
                    Exit in 4 stages.
                  </h4>
                </div>
                <div className="flex gap-2 font-mono text-2xl font-bold">
                  <span className="opacity-40 italic">01</span>
                  <span className="opacity-60 italic">02</span>
                  <span className="opacity-80 italic">03</span>
                  <span className="opacity-100 underline decoration-4 underline-offset-8">
                    04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Founder - Strategic Narrative */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-tr from-purple-900 to-blue-900 rounded-[3rem] overflow-hidden border border-white/10 relative group">
                {/* This represents where Michael's high-end portrait would go */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute bottom-10 left-10 text-white z-10">
                  <h4 className="text-3xl font-black">Michael Young</h4>
                  <p className="text-amber-500 font-bold tracking-widest text-sm uppercase">
                    Founder & Principal
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400">MBA | MA</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tighter italic">
                    Psychology
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">
                Direct Accountability
              </h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                NO DELEGATION. <br />
                NO DILUTION.
              </h3>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                Michael Young identifies structural friction and clarifies
                decision pathways. Clients work directly with him—benefiting
                from decades of C-suite experience across Oceania, MENA, and
                Asia.
              </p>
              <ul className="space-y-4 mb-10 text-slate-300">
                <li className="flex items-center gap-3 font-semibold">
                  <ChevronRight className="text-amber-500" size={18} /> Rapid
                  Diagnosis within 48 hours
                </li>
                <li className="flex items-center gap-3 font-semibold">
                  <ChevronRight className="text-amber-500" size={18} /> In-depth
                  Regulatory Experience
                </li>
                <li className="flex items-center gap-3 font-semibold">
                  <ChevronRight className="text-amber-500" size={18} />{" "}
                  High-Consequence Environment Expertise
                </li>
              </ul>
              <button className="bg-white text-black font-black px-8 py-4 rounded-xl hover:bg-amber-500 transition-all flex items-center gap-3">
                MEET THE FOUNDER <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer / CTA */}
        <footer className="pt-24 pb-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                  READY FOR <br />
                  STABILISATION?
                </h2>
                <p className="text-slate-400 text-lg max-w-sm">
                  Confidential discussions for senior leaders navigating
                  complexity or disruption.
                </p>
              </div>
              <div className="flex flex-col justify-center items-start md:items-end">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-md">
                  <p className="text-sm font-bold text-amber-500 mb-2">
                    Direct Access
                  </p>
                  <p className="text-2xl font-bold mb-6">+61 459 728 841</p>
                  <button className="w-full bg-[#25D366] text-black font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                    WHATSAPP MICHAEL <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-xs text-slate-500 font-bold tracking-widest">
              <p>© 2026 PARACHUTE CONSULTING SOLUTIONS. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-8 mt-6 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  PRIVACY
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  LEGAL
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  LINKEDIN
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
