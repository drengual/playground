import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Linkedin,
  Menu,
  X,
  ChevronRight,
  Target,
  Layers,
  Compass,
  ArrowUpRight,
} from "lucide-react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // "Mineral Vanguard" Palette
  const colors = {
    slate: "#2D3436", // Charcoal Slate
    eucalyptus: "#4A5D4E", // Eucalyptus Green
    sand: "#D4B499", // Soft Copper/Sand
    linen: "#F9F7F2", // Linen White
    concrete: "#E5E1D9", // Concrete Grey
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D3436] font-sans selection:bg-[#4A5D4E] selection:text-white overflow-x-hidden">
      {/* Structural Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[60] p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 overflow-hidden">
              <motion.div
                className="absolute inset-0 border-2 border-[#2D3436] rounded-full"
                whileHover={{ scale: 1.1 }}
              />
              <div className="absolute inset-2 bg-[#4A5D4E] rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
            </div>
            <span className="text-xl font-bold tracking-tight uppercase">
              Parachute
              <span className="font-light opacity-40"> / Consulting</span>
            </span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-12 text-[11px] font-bold uppercase tracking-[0.2em]">
            {["Expertise", "Insights", "Approach"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#4A5D4E] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#4A5D4E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.2em] border-b border-[#2D3436] pb-1 hover:border-[#D4B499] transition-colors">
              Contact
            </button>
            <button className="p-2" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section: The "Descent" Entrance */}
      <section className="relative min-h-screen flex items-center pt-20 px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-6xl md:text-[clamp(4rem,8vw,10rem)] font-medium leading-[0.9] tracking-tight mb-12">
                Controlled <br />
                <span className="italic font-light serif text-[#4A5D4E]">
                  Perspective
                </span>{" "}
                <br />
                for High-Stakes.
              </h1>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <p className="text-xl text-gray-500 max-w-sm font-light leading-relaxed">
                  Boutique structural strategy for Australian enterprise. We
                  provide the stability required for ambitious pivots.
                </p>
                <motion.button
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] group"
                >
                  <span className="w-12 h-12 rounded-full border border-[#2D3436] flex items-center justify-center group-hover:bg-[#2D3436] group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </span>
                  Explore our methodology
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 relative mt-20 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="aspect-[3/4] rounded-t-[10rem] rounded-b-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Architectural Lines"
                className="w-full h-full object-cover scale-110"
              />
            </motion.div>
            <div className="absolute -bottom-8 -left-8 p-10 bg-[#D4B499] text-[#2D3436] rounded-2xl hidden md:block">
              <div className="text-4xl font-medium tracking-tighter mb-1">
                01.
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Sydney Office
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-[#E5E1D9]/30 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4A5D4E] block mb-8">
                Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight">
                Structure is the only <br />
                sustainable{" "}
                <span className="italic serif font-light">
                  competitive edge.
                </span>
              </h2>
            </div>
            <div className="space-y-12">
              <p className="text-lg text-gray-500 leading-relaxed font-light">
                In the Australian market, agility is often confused with chaos.
                Parachute brings the rigorous oversight of tier-one consulting
                with the speed and bespoke touch of a boutique firm.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-medium mb-2">15+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    ASX Partners
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-medium mb-2">$2B+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Assets Managed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Cards */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em]">
              Core Capabilities
            </h2>
            <div className="h-[1px] flex-grow mx-12 bg-gray-200 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              {
                title: "Risk Architecture",
                icon: <Target />,
                desc: "Designing structural fail-safes for rapid-growth environments.",
              },
              {
                title: "Scale Deployment",
                icon: <Layers />,
                desc: "Managing the friction of transition from mid-market to enterprise.",
              },
              {
                title: "Market Guidance",
                icon: <Compass />,
                desc: "Navigating the specific regulatory and cultural landscape of ANZ.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#F9F7F2] p-16 group hover:bg-[#2D3436] hover:text-white transition-all duration-500 cursor-pointer"
              >
                <div className="text-[#4A5D4E] group-hover:text-[#D4B499] transition-colors mb-12">
                  {React.cloneElement(item.icon, { size: 40 })}
                </div>
                <h3 className="text-2xl font-medium mb-6 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-loose font-light mb-12">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The "Report" Section (Authority) */}
      <section className="py-40 bg-[#2D3436] text-[#F9F7F2] px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4A5D4E] opacity-10 skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square bg-[#E5E1D9] p-2 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
                  alt="Boardroom"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4B499] block mb-8">
                Integrated Authority
              </span>
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-12">
                Your presence, <br />
                <span className="italic serif font-light text-[#D4B499]">
                  re-architected.
                </span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed font-light mb-12 max-w-lg">
                We extend our consulting into the digital sphere, ensuring your
                personal and corporate brand carries the same structural weight
                as your balance sheet.
              </p>
              <button className="px-10 py-5 bg-[#F9F7F2] text-[#2D3436] font-bold text-[11px] uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-[#D4B499] transition-colors">
                View Engagement Models <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-40 pb-12 px-8 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold uppercase tracking-tighter mb-8">
                Parachute_
              </div>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-light uppercase tracking-widest">
                A surgical approach to strategy. Based in Sydney, operating
                globally.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">
                Navigation
              </h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li>
                  <a href="#" className="hover:text-[#4A5D4E]">
                    Focus Areas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#4A5D4E]">
                    Intel
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#4A5D4E]">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">
                Follow
              </h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li>
                  <a href="#" className="flex items-center gap-2">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-200 gap-8">
            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">
              © 2026 Parachute Consulting Group. NSW, Australia.
            </div>
            <div className="flex gap-12 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
              <a href="#">Privacy</a>
              <a href="#">Governance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#2D3436] text-[#F9F7F2] flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="text-xl font-bold tracking-tight uppercase">
                Parachute_
              </span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-12 text-6xl font-light tracking-tighter">
              <a href="#" className="hover:italic hover:text-[#D4B499]">
                Expertise
              </a>
              <a href="#" className="hover:italic hover:text-[#D4B499]">
                Insights
              </a>
              <a href="#" className="hover:italic hover:text-[#D4B499]">
                Approach
              </a>
            </div>
            <div className="mt-auto flex justify-between items-end">
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
                Sydney Office
              </div>
              <button className="p-8 bg-[#4A5D4E] rounded-full">
                <ArrowUpRight size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
