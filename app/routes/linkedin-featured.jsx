import React from "react";

// --- BRAND CONSTANTS (From Style Guide v2.2) ---
const COLORS = {
  SOVEREIGN_BLUE: "#0A192F", // Deep, authoritative base
  SLATE_GREY: "#475569", // Modern, professional secondary
  SURGICAL_WHITE: "#F8FAFC", // Clinical, clean canvas
  ACCENT_GOLD: "#B8975E", // Executive "Surgical" precision highlight
};

const CardContainer = ({ children, title }) => (
  <div className="flex flex-col items-center gap-4 mb-16 p-8 bg-gray-100 rounded-xl border border-gray-200">
    <div className="flex flex-col items-center">
      <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500 mb-1">
        PARACHUTE CONSULTING SOLUTIONS
      </h3>
      <p className="text-[10px] text-slate-400 uppercase tracking-widest">
        {title}
      </p>
    </div>
    <div className="w-[1200px] h-[627px] scale-[0.5] origin-top shadow-2xl overflow-hidden rounded-sm relative ring-1 ring-black/5 bg-white">
      {children}
    </div>
  </div>
);

const PCS_Logo = ({ light = false }) => (
  <div className="flex flex-col items-center">
    <div
      className={`border-2 ${light ? "border-white" : "border-[#0A192F]"} p-2 mb-2`}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Parachute / Shield Motif inspired by v2.2 */}
        <path
          d="M50 10L90 30V50C90 75 50 90 50 90C50 90 10 75 10 50V30L50 10Z"
          stroke={light ? "white" : "#0A192F"}
          strokeWidth="4"
        />
        <path
          d="M30 40H70M50 40V70"
          stroke={light ? "white" : "#0A192F"}
          strokeWidth="4"
          strokeLinecap="square"
        />
      </svg>
    </div>
    <div
      className={`font-['Barlow_Condensed'] font-bold tracking-[0.25em] text-2xl ${light ? "text-white" : "text-[#0A192F]"}`}
    >
      PARACHUTE
    </div>
    <div
      className={`font-['Barlow'] text-[10px] tracking-[0.4em] uppercase ${light ? "text-slate-400" : "text-slate-500"}`}
    >
      Consulting Solutions
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-12 flex flex-col items-center font-['Barlow']">
      <header className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-3xl font-bold font-['Barlow_Condensed'] tracking-tight text-slate-900 uppercase">
          LinkedIn Visual Assets v2.2
        </h1>
        <p className="text-slate-600 mt-2 font-light">
          Aligned to "Executive Surgical Interventions" concept and Barlow
          Typography.
        </p>
      </header>

      {/* ASSET 1: THE POSITIONING STATEMENT */}
      <CardContainer title="Positioning: The Principal Expert">
        <div className="w-full h-full bg-[#0A192F] flex flex-col items-center justify-center p-20 text-center relative">
          {/* Background Grid - Surgical Precision */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%">
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <PCS_Logo light />

          <div className="mt-16 max-w-3xl">
            <h2 className="text-white text-5xl font-['Barlow_Condensed'] font-bold leading-tight tracking-tight uppercase">
              Executive Surgical Interventions for <br />
              <span className="text-[#B8975E]">
                Organisations That Cannot Afford to Guess.
              </span>
            </h2>
            <div className="h-1 w-24 bg-[#B8975E] mx-auto mt-8"></div>
          </div>

          <div className="absolute bottom-12 text-slate-500 font-['Barlow_Condensed'] tracking-[0.5em] text-sm uppercase">
            Aviation • Logistics • Culture • Safety
          </div>
        </div>
      </CardContainer>

      {/* ASSET 2: THE BOUTIQUE PROMISE */}
      <CardContainer title="Value Prop: The Boutique Model">
        <div className="w-full h-full bg-white flex flex-row items-stretch border-[24px] border-[#0A192F]">
          <div className="flex-1 p-16 flex flex-col justify-center">
            <span className="text-[#B8975E] font-bold tracking-[0.3em] uppercase text-sm mb-4 italic">
              Boutique. Decisive. Expert.
            </span>
            <h2 className="text-[#0A192F] text-6xl font-['Barlow_Condensed'] font-extrabold leading-[0.9] uppercase mb-6">
              NO PARTNERS.
              <br />
              NO OUTSOURCING.
              <br />
              JUST ANSWERS.
            </h2>
            <p className="text-slate-600 text-xl max-w-md font-light leading-relaxed">
              Direct access to Michael Young. Precise diagnosis and surgical
              execution for high-stakes operational challenges.
            </p>
          </div>
          <div className="w-1/3 bg-[#F8FAFC] flex items-center justify-center relative overflow-hidden">
            {/* Abstract Surgical Path */}
            <svg
              className="absolute opacity-5"
              viewBox="0 0 200 200"
              width="150%"
              height="150%"
            >
              <path
                d="M20,100 Q100,20 180,100 T340,100"
                fill="none"
                stroke="#0A192F"
                strokeWidth="2"
              />
            </svg>
            <PCS_Logo />
          </div>
        </div>
      </CardContainer>

      {/* ASSET 3: CALL TO INTERVENTION */}
      <CardContainer title="Conversion: Strategic Inquiry">
        <div className="w-full h-full bg-[#F8FAFC] flex flex-col items-center justify-center p-20 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#B8975E]"></div>

          <div className="flex flex-col items-center text-center">
            <div className="text-slate-400 text-sm tracking-[0.4em] uppercase mb-8">
              Scheduling Q3-Q4 2024
            </div>
            <h2 className="text-[#0A192F] text-6xl font-['Barlow_Condensed'] font-bold uppercase mb-8 tracking-tighter">
              READY FOR A <span className="italic">DECISIVE</span> INTERVENTION?
            </h2>

            <div className="flex items-center gap-6 mb-12">
              <div className="h-px w-16 bg-slate-300"></div>
              <p className="text-slate-500 font-light text-xl">
                The Principal is currently accepting strategic inquiries.
              </p>
              <div className="h-px w-16 bg-slate-300"></div>
            </div>

            <div className="border-2 border-[#0A192F] px-12 py-4 text-[#0A192F] font-['Barlow_Condensed'] font-bold text-2xl tracking-widest hover:bg-[#0A192F] hover:text-white transition-colors cursor-pointer uppercase">
              Secure Consultation
            </div>
          </div>

          <div className="absolute bottom-12 right-12">
            <PCS_Logo />
          </div>
        </div>
      </CardContainer>

      <footer className="text-slate-400 text-xs text-center pb-20">
        PCS Brand Governance: Aligned to Principal Consultant Approved Standards
        (v2.2)
      </footer>
    </div>
  );
};

export default App;
