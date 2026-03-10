import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const BRAND = {
  purple: "#7A2488",
  navy: "#182F7C",
  gold: "#B9A669",
  offWhite: "#F8F5FB",
  white: "#FFFFFF",
};

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "cover",
      bg: BRAND.navy,
      label: "EXECUTIVE ADVISORY",
      title: (
        <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tight uppercase">
          THE <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.7)" }}
          >
            [DIAGNOSIS]
          </span>
        </h1>
      ),
      body: "High-stakes operational consulting for organizations where failure is not an option.",
      accent: true,
      pattern: "topo",
    },
    {
      id: "friction",
      bg: BRAND.navy,
      label: "THE CHALLENGE",
      title: (
        <h1 className="text-5xl font-bold text-white leading-tight uppercase">
          Operational Friction <br />
          Is <span className="text-[#B9A669]">Silent.</span>
        </h1>
      ),
      body: "Hidden inefficiencies in high-consequence environments compound into catastrophic failures.",
      image: true,
      pattern: "dots",
    },
    {
      id: "process",
      bg: BRAND.purple,
      label: "OUR METHOD",
      title: (
        <h1 className="text-5xl font-bold text-white leading-tight uppercase">
          Surgical <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.7)" }}
          >
            INTERVENTION
          </span>
        </h1>
      ),
      steps: [
        { num: "01", text: "Diagnostic Assessment" },
        { num: "02", text: "Strategic Design" },
        { num: "03", text: "Controlled Implementation" },
      ],
      pattern: "topo",
    },
    {
      id: "results",
      bg: BRAND.offWhite,
      label: "THE OUTCOME",
      title: (
        <h1 className="text-5xl font-bold text-[#182F7C] leading-tight uppercase">
          Measurable <br />
          Results.
        </h1>
      ),
      metric: "40% Efficiency Uplift",
      body: "We transfer capability and exit cleanly once results are achieved.",
      pattern: "grain",
    },
    {
      id: "cta",
      bg: BRAND.navy,
      label: "NEXT STEPS",
      title: (
        <h1 className="text-5xl font-bold text-white leading-tight uppercase">
          Secure Your <br />
          Consultation.
        </h1>
      ),
      cta: "CONSULT MICHAEL YOUNG",
      pattern: "topo",
    },
  ];

  const next = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const TextureOverlay = ({ type }) => {
    if (type === "topo") {
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
          <path
            d="M0 100 Q 250 50 500 100 T 1000 100"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.5"
          />
          <path
            d="M0 150 Q 250 100 500 150 T 1000 150"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M0 200 Q 250 150 500 200 T 1000 200"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </svg>
      );
    }
    if (type === "dots") {
      return (
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      );
    }
    if (type === "grain") {
      return (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      );
    }
    return null;
  };

  const Slide = ({ data }) => {
    return (
      <div
        className="relative w-full aspect-square overflow-hidden shadow-2xl flex flex-col p-12 transition-colors duration-500"
        style={{
          backgroundColor: data.bg,
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {/* Texture Layers */}
        <TextureOverlay type={data.pattern} />
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/10"></div>

        {/* Decorative Slashes */}
        {data.accent && (
          <div className="absolute right-[-5%] bottom-[-5%] flex gap-4 opacity-20 pointer-events-none rotate-[-12deg]">
            <div className="w-1.5 h-[500px] bg-white rounded-full"></div>
            <div className="w-1.5 h-[600px] bg-[#B9A669] rounded-full mt-20"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#B9A669]"></div>
            <span
              className="text-[11px] tracking-[0.4em] font-bold"
              style={{
                color: data.bg === BRAND.offWhite ? BRAND.purple : BRAND.gold,
              }}
            >
              {data.label}
            </span>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            {data.title}

            {data.body && (
              <p
                className={`mt-8 text-xl max-w-sm font-light leading-relaxed ${data.bg === BRAND.offWhite ? "text-gray-700" : "text-white/80"}`}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {data.body}
              </p>
            )}

            {data.steps && (
              <div className="mt-8 space-y-3">
                {data.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <span
                      className="text-3xl font-black text-transparent opacity-40 group-hover:opacity-100 transition-opacity"
                      style={{ WebkitTextStroke: "1px #B9A669" }}
                    >
                      {s.num}
                    </span>
                    <span className="text-lg text-white uppercase tracking-[0.15em] border-b border-white/10 flex-grow pb-2">
                      {s.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {data.metric && (
              <div className="mt-8 relative inline-block self-start">
                <div className="absolute -inset-1 bg-black/10 blur-sm"></div>
                <div
                  className="relative bg-[#B9A669] px-10 py-5 text-3xl font-black text-[#182F7C] uppercase"
                  style={{
                    clipPath:
                      "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                  }}
                >
                  {data.metric}
                </div>
              </div>
            )}
          </div>

          {/* Footer Branding */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-end h-5">
                <div className="w-1.5 h-3 bg-[#182F7C]"></div>
                <div className="w-1.5 h-4 bg-white/40"></div>
                <div className="w-1.5 h-6 bg-[#B9A669]"></div>
              </div>
              <span
                className={`text-[10px] font-black tracking-[0.3em] ${data.bg === BRAND.offWhite ? "text-[#182F7C]" : "text-white"}`}
              >
                PARACHUTE CS
              </span>
            </div>

            {data.cta && (
              <div
                className="bg-[#B9A669] px-8 py-3 text-[11px] font-black text-[#182F7C] uppercase tracking-[0.2em] cursor-pointer hover:scale-105 transition-transform"
                style={{
                  clipPath:
                    "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                {data.cta}
              </div>
            )}
          </div>
        </div>

        {/* Framing accents for image style */}
        {data.image && (
          <>
            <div className="absolute top-10 left-10 w-16 h-16 border-t-[1px] border-l-[1px] border-[#B9A669] opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border-b-[1px] border-r-[1px] border-[#B9A669] opacity-30"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-xl w-full">
        <header className="mb-10 text-center">
          <h2 className="text-[10px] font-black text-purple-900/40 tracking-[0.5em] uppercase mb-2">
            Social Design System v2.0
          </h2>
          <h1 className="text-4xl font-black text-[#182F7C] uppercase italic leading-none">
            Textured Precision
          </h1>
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 transition-all ${i === currentSlide ? "w-12 bg-[#B9A669]" : "w-4 bg-gray-300"}`}
              />
            ))}
          </div>
        </header>

        <div className="relative group">
          {/* The Actual Slide */}
          <div className="bg-white p-3 rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <Slide data={slides[currentSlide]} />
          </div>

          {/* Navigation Overlays (visible on hover) */}
          <button
            onClick={prev}
            className="absolute left-[-60px] top-1/2 -translate-y-1/2 p-3 text-gray-400 hover:text-purple-800 transition-colors hidden md:block"
          >
            <ArrowLeft size={32} strokeWidth={1} />
          </button>
          <button
            onClick={next}
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 p-3 text-gray-400 hover:text-purple-800 transition-colors hidden md:block"
          >
            <ArrowRight size={32} strokeWidth={1} />
          </button>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Topo Pattern
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-900"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Film Grain
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold-600"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Dot Grid
              </span>
            </div>
          </div>

          <div className="p-6 bg-white border-l-4 border-[#B9A669] shadow-sm">
            <p className="text-sm text-gray-500 font-medium leading-relaxed italic">
              "The texture isn't just aesthetic; it represents the 'Grit' and
              'Detail' of the surgical intervention. Use 5-10% opacity in Canva
              to avoid clashing with the copy."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
