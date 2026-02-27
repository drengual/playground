import { Link } from "react-router";
import type { Route } from "./+types/home";
import { ArrowRight, Star, Zap, Layers } from "lucide-react";
import { motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Parachute Consulting Solutions - Design Mockups" },
    {
      name: "description",
      content:
        "Choose your preferred design direction for Parachute Consulting",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center text-white">
              <Star size={20} />
            </div>
            <span className="text-xl font-bold tracking-wider">PARACHUTE</span>
          </div>
          <span className="text-sm text-slate-500 font-medium">
            Design Mockup Selection
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-slate-800 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-8">
              Client Presentation
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
              Parachute Consulting Solutions
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Three distinct design directions for your consulting brand. Click
              on each mockup below to explore the full experience, then return
              here to compare your favorites.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Options */}
      <section className="pb-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Para 1 - Editorial Prestige */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <Link to="/para" className="block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Preview Image */}
                <div className="aspect-[4/5] bg-[#F9F7F2] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Editorial Prestige Preview"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-[#BCA570] text-white text-xs font-bold tracking-widest uppercase rounded-full mb-3">
                      Option 01
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Editorial Prestige
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded-full bg-[#172F7C]" />
                    <div className="w-4 h-4 rounded-full bg-[#BCA570]" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">
                      Navy & Gold
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    High-end magazine or boutique law firm aesthetic—classic,
                    formal, and authoritative. Uses serif fonts and rigid grid
                    to establish trust through tradition.
                  </p>
                  <div className="flex items-center text-slate-800 font-bold text-sm group-hover:text-[#172F7C] transition-colors">
                    View Full Mockup{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Para 2 - Kinetic Minimalist */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <Link to="/para2" className="block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Preview Image */}
                <div className="aspect-[4/5] bg-[#FDFDFD] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop"
                    alt="Kinetic Minimalist Preview"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-[#172F7C] text-white text-xs font-bold tracking-widest uppercase rounded-full mb-3">
                      Option 02
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Kinetic Minimalist
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded-full bg-[#172F7C]" />
                    <div className="w-4 h-4 rounded-full bg-[#BCA570]" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">
                      Navy & Gold
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    2026-forward tech-consultancy aesthetic with Glassmorphism,
                    fluid movement, and structural clarity. Feels "surgical" and
                    "high-velocity."
                  </p>
                  <div className="flex items-center text-slate-800 font-bold text-sm group-hover:text-[#172F7C] transition-colors">
                    View Full Mockup{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Para 3 - Mineral Vanguard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <Link to="/para3" className="block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Preview Image */}
                <div className="aspect-[4/5] bg-[#F9F7F2] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Mineral Vanguard Preview"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-[#4A5D4E] text-white text-xs font-bold tracking-widest uppercase rounded-full mb-3">
                      Option 03
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Mineral Vanguard
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded-full bg-[#4A5D4E]" />
                    <div className="w-4 h-4 rounded-full bg-[#D4B499]" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">
                      Eucalyptus & Copper
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Premium architectural look balancing Australian warmth with
                    professional structure. Features grain overlay and
                    linen-white backgrounds.
                  </p>
                  <div className="flex items-center text-slate-800 font-bold text-sm group-hover:text-[#4A5D4E] transition-colors">
                    View Full Mockup{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Design Details Summary */}
      <section className="py-16 px-8 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-10 text-center">
            Key Design Details
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Para 1 Details */}
            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#172F7C]">01</span>
                <h3 className="text-lg font-bold text-slate-800">
                  Editorial Prestige
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>
                    Serif fonts (italicized) for high-end editorial feel
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>Navy (#172F7C) & Gold (#BCA570) palette</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>Framer Motion with Spring easing animations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>LinkedIn integration concept section</span>
                </li>
              </ul>
            </div>

            {/* Para 2 Details */}
            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#172F7C]">02</span>
                <h3 className="text-lg font-bold text-slate-800">
                  Kinetic Minimalist
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>
                    Ultra-heavy sans-serif headers with tight tracking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>Glassmorphism & blurred card effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>Bento Box layout for expertise section</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[#BCA570] mt-1 flex-shrink-0"
                  />
                  <span>Scroll-triggered animations</span>
                </li>
              </ul>
            </div>

            {/* Para 3 Details */}
            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#4A5D4E]">03</span>
                <h3 className="text-lg font-bold text-slate-800">
                  Mineral Vanguard
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Layers
                    size={14}
                    className="text-[#4A5D4E] mt-1 flex-shrink-0"
                  />
                  <span>Architectural Sans with italic serif accents</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers
                    size={14}
                    className="text-[#4A5D4E] mt-1 flex-shrink-0"
                  />
                  <span>Eucalyptus (#4A5D4E) & Sand/Copper (#D4B499)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers
                    size={14}
                    className="text-[#4A5D4E] mt-1 flex-shrink-0"
                  />
                  <span>Asymmetrical balance with curved arch containers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers
                    size={14}
                    className="text-[#4A5D4E] mt-1 flex-shrink-0"
                  />
                  <span>Subtle grain overlay & linen-white backgrounds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-500">
            Click any mockup above to view the full design. Use the back button
            at the top of each page to return here.
          </p>
        </div>
      </footer>
    </div>
  );
}
