import { useState } from "react";

// ─── BRAND TOKENS — v3 palette (matches pcs-homepage-v3) ────────────────────
const B = {
  purple:      "#812990",
  purpleDeep:  "#4a1155",
  purpleHero:  "#7a2488",
  purpleMid:   "#6a2278",
  purpleLight: "#c060d4",
  blue:        "#182f7c",
  blueMid:     "#1e3a99",
  blueLight:   "#2a47a8",
  gold:        "#b9a669",
  goldLight:   "#d4c48a",
  goldDark:    "#8a7a4a",
  nearBlack:   "#1a1a1a",
  white:       "#ffffff",
  offWhite:    "#f8f5fb",
  lightGrey:   "#f2eef6",
  textMid:     "#4a4560",
  textLight:   "#7a7490",
};

// ─── SHARED PRIMITIVES ───────────────────────────────────────────────────────

const SlashMark = ({ size = 1, opacity = 1, light = false }) => (
  <div style={{ display: "flex", gap: `${3 * size}px`, alignItems: "flex-end", opacity }}>
    {[
      { h: 14 * size, bg: light ? "rgba(255,255,255,0.5)" : B.blueLight },
      { h: 14 * size, bg: light ? "rgba(255,255,255,0.6)" : B.blue },
      { h: 20 * size, bg: light ? "rgba(255,255,255,0.7)" : B.purpleLight },
      { h: 20 * size, bg: light ? "rgba(255,255,255,0.8)" : B.purple },
      { h: 26 * size, bg: B.gold },
    ].map((s, i) => (
      <div key={i} style={{
        width: `${3 * size}px`, height: `${s.h}px`,
        background: s.bg, borderRadius: `${2 * size}px`,
        transform: "skewX(-8deg)",
      }} />
    ))}
  </div>
);

const GoldRule = ({ width = "100%", opacity = 0.5 }) => (
  <div style={{
    width, height: 1,
    background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`,
    opacity,
  }} />
);

// Decorative slashes for purple backgrounds
const BgSlashes = ({ right = 0, opacity = 0.12 }) => (
  <div style={{ position: "absolute", right, top: 0, bottom: 0, display: "flex", gap: 16, alignItems: "center", opacity, zIndex: 1, pointerEvents: "none" }}>
    {[{ bg: "rgba(255,255,255,0.4)" }, { bg: "rgba(255,255,255,0.5)" }, { bg: B.gold }].map((s, i) => (
      <div key={i} style={{ width: 4, height: "115%", background: s.bg, borderRadius: 3, transform: "skewX(-10deg)" }} />
    ))}
  </div>
);

// Gold corner bracket
const GoldCorner = ({ pos }) => {
  const s = { position: "absolute", zIndex: 3 };
  const tl = { top: -2, left: -2, borderTop: `2px solid ${B.gold}`, borderLeft: `2px solid ${B.gold}` };
  const br = { bottom: -2, right: -2, borderBottom: `2px solid ${B.gold}`, borderRight: `2px solid ${B.gold}` };
  return <div style={{ ...s, width: 28, height: 28, opacity: 0.55, ...(pos === "tl" ? tl : br) }} />;
};

// ═══════════════════════════════════════════════════════════════════════════════
// HERO BANNER — PERSONAL
// LinkedIn: 1584 × 396px → rendered at 792 × 198 (50%)
// ═══════════════════════════════════════════════════════════════════════════════
const PersonalHeroBanner = () => (
  <div style={{
    width: 792, height: 198,
    position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 65% 120% at 8%  50%, rgba(92,26,104,0.85)  0%, transparent 55%),
      radial-gradient(ellipse 50% 80%  at 92% 15%, rgba(24,47,124,0.40)  0%, transparent 50%),
      radial-gradient(ellipse 55% 60%  at 50% 110%,rgba(92,26,104,0.55) 0%, transparent 50%),
      linear-gradient(160deg, #8f2ea0 0%, #7a2488 38%, #6a1e8a 65%, #5c1a78 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <BgSlashes right={-8} opacity={0.14} />

    {/* Subtle mid slashes */}
    <div style={{ position: "absolute", right: "30%", top: 0, bottom: 0, display: "flex", gap: 10, alignItems: "center", opacity: 0.08, zIndex: 1 }}>
      {["rgba(255,255,255,0.5)", B.goldLight].map((c, i) => (
        <div key={i} style={{ width: 3, height: "80%", background: c, borderRadius: 2, transform: "skewX(-10deg)" }} />
      ))}
    </div>

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", padding: "0 48px", gap: 32 }}>

      {/* Left: logo + tagline */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <SlashMark size={0.9} light />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.14em", color: B.white, lineHeight: 1, textTransform: "uppercase" }}>PARACHUTE</div>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>CONSULTING SOLUTIONS</div>
          </div>
        </div>
        <GoldRule width="180px" opacity={0.45} />
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.04em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>EXECUTIVE SURGICAL</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.04em", color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.45)", textTransform: "uppercase", lineHeight: 1.0 }}>INTERVENTIONS</div>
          <div style={{ marginTop: 6, fontSize: 9, fontWeight: 400, fontStyle: "italic", color: B.goldLight, letterSpacing: "0.06em", fontFamily: "'Barlow', sans-serif" }}>
            for Organisations That Cannot Afford to Guess.
          </div>
        </div>
      </div>

      {/* Vertical divider */}
      <div style={{ width: 1, height: 100, background: `linear-gradient(180deg, transparent, ${B.gold}, transparent)`, opacity: 0.4 }} />

      {/* Right: personal identity */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", color: B.goldLight, textTransform: "uppercase", marginBottom: 6, opacity: 0.9 }}>FOUNDER &amp; PRINCIPAL CONSULTANT</div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "0.03em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>MICHAEL</div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "0.03em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>YOUNG</div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
          {["Aviation", "Operations & Logistics", "Organisation Culture", "Safety & Risk"].map((s, i) => (
            <div key={i} style={{ fontSize: 8.5, fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{s}</div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 8, letterSpacing: "0.1em", color: B.goldLight, opacity: 0.65, fontFamily: "'Barlow', sans-serif" }}>
          parachuteconsultingsolutions.com
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`, opacity: 0.5, zIndex: 10 }} />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// HERO BANNER — COMPANY PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const CompanyHeroBanner = () => (
  <div style={{
    width: 792, height: 198,
    position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 80% 100% at 50%  0%,  rgba(92,26,104,0.6)  0%, transparent 60%),
      radial-gradient(ellipse 60% 80%  at 8%   80%, rgba(24,47,124,0.4)  0%, transparent 55%),
      radial-gradient(ellipse 50% 60%  at 92%  60%, rgba(92,26,104,0.35) 0%, transparent 50%),
      linear-gradient(160deg, #8f2ea0 0%, #7a2488 40%, #5c1a78 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <BgSlashes right={-8} opacity={0.12} />

    {/* Subtle dot grid */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 1, opacity: 0.04,
      backgroundImage: `radial-gradient(circle, ${B.goldLight} 1px, transparent 1px)`,
      backgroundSize: "28px 28px",
    }} />

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <SlashMark size={1.1} light />
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.16em", color: B.white, lineHeight: 1, textTransform: "uppercase" }}>PARACHUTE</div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>CONSULTING SOLUTIONS</div>
        </div>
      </div>

      <GoldRule width="320px" opacity={0.4} />

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.05em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>EXECUTIVE SURGICAL INTERVENTIONS</div>
        <div style={{ marginTop: 5, fontSize: 10, fontWeight: 400, fontStyle: "italic", color: B.goldLight, letterSpacing: "0.06em", fontFamily: "'Barlow', sans-serif" }}>
          for Organisations That Cannot Afford to Guess.
        </div>
      </div>

      <GoldRule width="320px" opacity={0.2} />

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {["Aviation", "Operations & Logistics", "Organisation Culture", "Safety & Risk"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <div style={{ width: 1, height: 10, background: B.gold, opacity: 0.35 }} />}
            <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 8.5, letterSpacing: "0.1em", color: B.goldLight, opacity: 0.6, fontFamily: "'Barlow', sans-serif" }}>
        Australia  ·  Pacific  ·  Asia  ·  parachuteconsultingsolutions.com
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`, opacity: 0.5, zIndex: 10 }} />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SOCIAL TEMPLATES — 1200 × 628px → rendered at 600 × 314 (50%)
// All use white/off-white or vivid purple. No near-black.
// ═══════════════════════════════════════════════════════════════════════════════

// Template 1: QUOTE / INSIGHT — white card, purple accent bar
const QuoteTemplate = ({ quote = "Risk cannot be eliminated. It can be controlled." }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: B.offWhite,
    fontFamily: "'Barlow Condensed', sans-serif",
    border: `1px solid rgba(129,41,144,0.10)`,
  }}>
    {/* Purple left accent bar */}
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: `linear-gradient(180deg, ${B.blue}, ${B.purple}, ${B.gold})`, zIndex: 10 }} />

    {/* Subtle purple circle bg */}
    <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(129,41,144,0.06) 0%, transparent 65%)`, zIndex: 1 }} />

    {/* Large quotation mark */}
    <div style={{ position: "absolute", right: 28, top: 8, fontSize: 160, fontWeight: 800, color: B.purple, opacity: 0.07, lineHeight: 1, zIndex: 2, fontFamily: "'Barlow Condensed', sans-serif" }}>"</div>

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 44px 24px 52px" }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <SlashMark size={0.7} />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: B.nearBlack, opacity: 0.5, textTransform: "uppercase" }}>PCS</div>
      </div>

      {/* Quote */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", color: B.purple, textTransform: "uppercase", marginBottom: 10, opacity: 0.8 }}>INSIGHT</div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.02em", color: B.nearBlack, lineHeight: 1.25, textTransform: "uppercase", maxWidth: 420 }}>
          {quote}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ width: 32, height: 1, background: B.gold, opacity: 0.7, marginBottom: 6 }} />
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase" }}>Michael Young  ·  PCS</div>
          <div style={{ fontSize: 8.5, fontWeight: 400, letterSpacing: "0.06em", color: B.textLight, fontFamily: "'Barlow', sans-serif", marginTop: 2 }}>
            parachuteconsultingsolutions.com
          </div>
        </div>
        <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.15em", color: B.textLight, textTransform: "uppercase" }}>
          Australia · Pacific · Asia
        </div>
      </div>
    </div>
  </div>
);

// Template 2: SERVICE ANNOUNCEMENT — vivid purple, white text
const ServiceTemplate = ({ service = "Aviation", tagline = "Precision across flight operations, ground operations, and operations leadership." }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 60% 80% at 0%   50%, rgba(92,26,104,0.9)  0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 100% 30%, rgba(24,47,124,0.4)  0%, transparent 55%),
      linear-gradient(160deg, #8f2ea0 0%, #7a2488 45%, #5c1a78 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <BgSlashes right={0} opacity={0.12} />

    {/* Top gradient bar */}
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${B.blue}, ${B.purple}, ${B.gold})`, zIndex: 10 }} />

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", padding: "24px 40px" }}>

      {/* Left vertical label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginRight: 28 }}>
        <div style={{ width: 1, flex: 1, background: `linear-gradient(180deg, ${B.gold}, transparent)`, opacity: 0.5 }} />
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.2em", color: B.goldLight, textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)", opacity: 0.8 }}>SERVICE</div>
        <div style={{ width: 1, flex: 1, background: `linear-gradient(180deg, transparent, ${B.gold})`, opacity: 0.5 }} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlashMark size={0.7} light />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>PARACHUTE CONSULTING SOLUTIONS</div>
        </div>

        {/* Service name */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.25em", color: B.goldLight, textTransform: "uppercase", marginBottom: 6, opacity: 0.85 }}>SECTOR</div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "0.04em", color: B.white, textTransform: "uppercase", lineHeight: 0.95 }}>{service}</div>
          <div style={{ marginTop: 10, fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.7)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.5, maxWidth: 380 }}>
            {tagline}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 8.5, fontWeight: 500, letterSpacing: "0.08em", color: B.goldLight, opacity: 0.75 }}>parachuteconsultingsolutions.com</div>
          <div style={{ padding: "5px 14px", background: B.gold, fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: B.nearBlack, textTransform: "uppercase", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}>
            BOOK A CONSULTATION
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Template 3: ENGAGEMENT / QUESTION — white, purple accents
const EngagementTemplate = ({ question = "What is the single biggest operational friction point in your organisation right now?", context = "The answer to that question is usually the starting point for every PCS engagement." }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: B.white,
    fontFamily: "'Barlow Condensed', sans-serif",
    border: `1px solid rgba(129,41,144,0.10)`,
  }}>
    {/* Top bar: purple */}
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${B.purple}, ${B.blue})`, zIndex: 10 }} />

    {/* Large question mark bg */}
    <div style={{ position: "absolute", right: 20, bottom: -20, fontSize: 200, fontWeight: 800, color: B.purple, opacity: 0.04, lineHeight: 1, zIndex: 1, fontFamily: "'Barlow Condensed', sans-serif" }}>?</div>

    {/* Subtle circle */}
    <div style={{ position: "absolute", left: -60, bottom: -60, width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(129,41,144,0.05) 0%, transparent 65%)`, zIndex: 1 }} />

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 44px 28px" }}>

      {/* Top */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlashMark size={0.7} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: B.nearBlack, opacity: 0.45, textTransform: "uppercase" }}>PCS</div>
        </div>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", opacity: 0.7 }}>EXECUTIVE PERSPECTIVE</div>
      </div>

      {/* Question */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.25em", color: B.gold, textTransform: "uppercase", marginBottom: 10 }}>A QUESTION WORTH ASKING</div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.02em", color: B.nearBlack, lineHeight: 1.3, maxWidth: 460 }}>
          {question}
        </div>
      </div>

      {/* Context + footer */}
      <div>
        <div style={{ width: 40, height: 1, background: B.gold, opacity: 0.7, marginBottom: 8 }} />
        <div style={{ fontSize: 11, fontWeight: 400, color: B.textMid, fontFamily: "'Barlow', sans-serif", lineHeight: 1.5, maxWidth: 400, fontStyle: "italic" }}>
          {context}
        </div>
        <div style={{ marginTop: 8, fontSize: 8.5, letterSpacing: "0.08em", color: B.textLight }}>
          parachuteconsultingsolutions.com  ·  Australia  ·  Pacific  ·  Asia
        </div>
      </div>
    </div>
  </div>
);

// Template 4: ACHIEVEMENT / MILESTONE — vivid purple
const AchievementTemplate = ({ milestone = "Decades of operational and executive leadership.", detail = "Across Oceania, the Middle East, North Africa, and Asia.", badge = "MBA  ·  MA (Hons) Psychology" }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 60% 100% at 100% 50%, rgba(185,166,105,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 70% 80%  at 0%   30%, rgba(92,26,104,0.85)   0%, transparent 55%),
      radial-gradient(ellipse 50% 60%  at 50%  100%,rgba(24,47,124,0.35)  0%, transparent 55%),
      linear-gradient(135deg, #8f2ea0 0%, #7a2488 45%, #5c1a78 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <BgSlashes right={0} opacity={0.10} />

    {/* Gold corner top right */}
    <div style={{ position: "absolute", top: 0, right: 0, width: 56, height: 56, zIndex: 3 }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 56, height: 2, background: B.gold, opacity: 0.55 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 2, height: 56, background: B.gold, opacity: 0.55 }} />
    </div>
    {/* Gold corner bottom left */}
    <div style={{ position: "absolute", bottom: 0, left: 0, width: 56, height: 56, zIndex: 3 }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 56, height: 2, background: B.gold, opacity: 0.55 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 2, height: 56, background: B.gold, opacity: 0.55 }} />
    </div>

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 44px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlashMark size={0.7} light />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>MICHAEL YOUNG  ·  PCS</div>
        </div>
        <div style={{ padding: "3px 10px", border: `1px solid rgba(185,166,105,0.45)`, fontSize: 8, fontWeight: 600, letterSpacing: "0.15em", color: B.goldLight, textTransform: "uppercase" }}>FOUNDER</div>
      </div>

      <div>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.25em", color: B.goldLight, textTransform: "uppercase", marginBottom: 8, opacity: 0.85 }}>EXPERIENCE</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.03em", color: B.white, textTransform: "uppercase", lineHeight: 1.1, maxWidth: 460 }}>{milestone}</div>
        <div style={{ marginTop: 10, fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.65)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.55, maxWidth: 420 }}>{detail}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ padding: "5px 14px", background: "rgba(185,166,105,0.12)", border: `1px solid rgba(185,166,105,0.35)`, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.1em", color: B.goldLight, textTransform: "uppercase" }}>{badge}</div>
        <div style={{ fontSize: 8.5, letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>parachuteconsultingsolutions.com</div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURED THUMBNAILS — 1200 × 627px → rendered at 400 × 209 (33%)
// ═══════════════════════════════════════════════════════════════════════════════
const FeaturedThumb = ({ label, title, variant = "purple" }) => {
  const isPurple = variant === "purple";
  return (
    <div style={{
      width: 400, height: 209, position: "relative", overflow: "hidden",
      background: isPurple
        ? `radial-gradient(ellipse 80% 80% at 30% 40%, rgba(92,26,104,0.9) 0%, transparent 60%), linear-gradient(160deg, #8f2ea0 0%, #5c1a78 100%)`
        : B.offWhite,
      fontFamily: "'Barlow Condensed', sans-serif",
      border: isPurple ? "none" : `1px solid rgba(129,41,144,0.12)`,
    }}>
      {isPurple && <BgSlashes right={0} opacity={0.12} />}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${B.gold}, transparent)`, opacity: 0.8 }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "18px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <SlashMark size={0.6} light={isPurple} />
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", color: isPurple ? "rgba(255,255,255,0.55)" : B.textLight, textTransform: "uppercase" }}>PCS</div>
        </div>
        <div>
          <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.22em", color: B.gold, textTransform: "uppercase", marginBottom: 6, opacity: 0.9 }}>{label}</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.03em", color: isPurple ? B.white : B.nearBlack, textTransform: "uppercase", lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ fontSize: 7.5, letterSpacing: "0.08em", color: isPurple ? "rgba(255,255,255,0.4)" : B.textLight, fontFamily: "'Barlow', sans-serif" }}>
          parachuteconsultingsolutions.com
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST TEMPLATES — copy-ready graphics for every LinkedIn post intent
// Graphic: 600 × 314 at 50% (1200 × 628 actual)
// ═══════════════════════════════════════════════════════════════════════════════

// Post graphic wrapper — white card with purple top bar
const PostGraphic = ({ label, headline, sub, footer, bgPurple = false, children }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: bgPurple
      ? `radial-gradient(ellipse 70% 90% at 5% 50%, rgba(92,26,104,0.9) 0%, transparent 55%), linear-gradient(160deg, #8f2ea0 0%, #7a2488 45%, #5c1a78 100%)`
      : B.white,
    fontFamily: "'Barlow Condensed', sans-serif",
    border: bgPurple ? "none" : `1px solid rgba(129,41,144,0.10)`,
  }}>
    {bgPurple && <BgSlashes right={0} opacity={0.10} />}

    {/* Top bar */}
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: bgPurple ? 0 : 4, background: `linear-gradient(90deg, ${B.purple}, ${B.blue})`, zIndex: 10 }} />

    {/* Left accent bar */}
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: bgPurple ? 0 : 5, background: `linear-gradient(180deg, ${B.blue}, ${B.purple}, ${B.gold})`, zIndex: 10 }} />

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: bgPurple ? "24px 40px" : "28px 44px 24px 52px" }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <SlashMark size={0.65} light={bgPurple} />
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: bgPurple ? "rgba(255,255,255,0.6)" : B.nearBlack, opacity: bgPurple ? 1 : 0.45, textTransform: "uppercase" }}>PCS</div>
        <div style={{ marginLeft: 8, fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: bgPurple ? B.goldLight : B.purple, textTransform: "uppercase", opacity: 0.8 }}>{label}</div>
      </div>

      {/* Headline */}
      <div>
        {sub && <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", color: B.gold, textTransform: "uppercase", marginBottom: 8, opacity: 0.85 }}>{sub}</div>}
        <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.02em", color: bgPurple ? B.white : B.nearBlack, lineHeight: 1.25, textTransform: "uppercase", maxWidth: 450 }}>
          {headline}
        </div>
        {children}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ width: 28, height: 1, background: B.gold, opacity: 0.7, marginBottom: 5 }} />
          <div style={{ fontSize: 8.5, letterSpacing: "0.08em", color: bgPurple ? "rgba(255,255,255,0.45)" : B.textLight, fontFamily: "'Barlow', sans-serif" }}>
            {footer || "parachuteconsultingsolutions.com"}
          </div>
        </div>
        <div style={{ fontSize: 8, letterSpacing: "0.12em", color: bgPurple ? "rgba(255,255,255,0.4)" : B.textLight, textTransform: "uppercase" }}>Australia · Pacific · Asia</div>
      </div>
    </div>
  </div>
);

// Copy card below each graphic
const CopyCard = ({ intent, hook, body, closing, hashtags, note }) => (
  <div style={{
    background: B.lightGrey, border: `1px solid rgba(129,41,144,0.10)`,
    padding: "20px 24px", maxWidth: 600, fontFamily: "'Barlow', sans-serif",
  }}>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: B.purple, textTransform: "uppercase", marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>
      {intent} — COPY TEMPLATE
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>Hook:  </span>
        <span style={{ fontSize: 12, color: B.nearBlack, lineHeight: 1.6 }}>{hook}</span>
      </div>
      <div>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>Body:  </span>
        <span style={{ fontSize: 12, color: B.textMid, lineHeight: 1.6 }}>{body}</span>
      </div>
      <div>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>Closing:  </span>
        <span style={{ fontSize: 12, color: B.nearBlack, lineHeight: 1.6 }}>{closing}</span>
      </div>
      <div style={{ marginTop: 4, fontSize: 11, color: B.purple, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}>{hashtags}</div>
      {note && <div style={{ marginTop: 6, fontSize: 11, fontStyle: "italic", color: B.textLight, borderLeft: `3px solid ${B.gold}`, paddingLeft: 10 }}>{note}</div>}
    </div>
  </div>
);

const postTypes = [
  {
    label: "INSIGHT",
    graphic: <PostGraphic label="INSIGHT POST" headline="Most organisations do not fail because of external pressure." sub="OBSERVATION" footer="parachuteconsultingsolutions.com">
      <div style={{ marginTop: 8, fontSize: 12, fontWeight: 400, color: B.textMid, fontFamily: "'Barlow', sans-serif", lineHeight: 1.5 }}>The friction was already inside.</div>
    </PostGraphic>,
    intent: "Insight",
    hook: "Most organisations do not fail because of external pressure.",
    body: "They fail because the internal friction went undiagnosed. Misaligned leadership. Unclear accountability. Processes that worked at half the current scale. By the time the pressure arrives from outside, the organisation is already compromised from within.",
    closing: "That is why PCS starts with a diagnostic. Every time. No assumptions. What friction is your organisation carrying right now?",
    hashtags: "#ExecutiveAdvisory #PCS #OrganisationCulture",
    note: "150–250 words. Share as a standalone post with the graphic attached.",
  },
  {
    label: "QUESTION",
    graphic: <PostGraphic label="QUESTION POST" headline="At what point does complexity become the greatest risk to performance?" sub="A QUESTION WORTH ASKING" footer="parachuteconsultingsolutions.com">
    </PostGraphic>,
    intent: "Question",
    hook: "At what point does complexity become the greatest risk to performance?",
    body: "Every organisation grows into complexity. Layers of process, layers of reporting, layers of decision-making that made sense once and now slow everything down. The organisations that outperform do not manage complexity. They eliminate it.",
    closing: "Where is complexity slowing your organisation down? I would genuinely like to know.",
    hashtags: "#ExecutiveAdvisory #PCS #OperationsAndLogistics",
    note: "60–120 words. End with a direct question. Do not answer it yourself.",
  },
  {
    label: "SERVICE",
    graphic: <ServiceTemplate service="Aviation" tagline="Precision across flight operations, ground operations, and operations leadership." />,
    intent: "Service Spotlight",
    hook: "Aviation has zero tolerance for ambiguity. That is not a constraint. It is a standard.",
    body: "In aviation, every process has an owner, every risk has a control, and every decision has a clear chain of accountability. That standard of precision is exactly what PCS brings to aviation clients — from AOC initial issue and amendments to crisis response and operational stabilisation.",
    closing: "If you are operating in the aviation sector and need structured, experienced advisory, the conversation starts here. Link in bio.",
    hashtags: "#Aviation #ExecutiveAdvisory #PCS",
    note: "Rotate through all four sectors. Adjust the hook to match each sector's specific tension.",
  },
  {
    label: "OUTCOME",
    graphic: <PostGraphic label="OUTCOME POST" headline="The diagnosis took three days. The recovery took six weeks." sub="RESULT" bgPurple footer="parachuteconsultingsolutions.com">
      <div style={{ marginTop: 8, fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.65)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.5 }}>No client details. The outcome speaks for itself.</div>
    </PostGraphic>,
    intent: "Case Outcome",
    hook: "The diagnosis took three days. The recovery took six weeks.",
    body: "An organisation in the Pacific was carrying a structural misalignment that had been invisible for over a year. Leadership knew performance was degrading. They did not know why. PCS came in, ran a full diagnostic, designed a targeted intervention, and implemented it with the leadership team directly. No consultants in the background. No handoffs.",
    closing: "Results without dependency. That is the PCS model. If your organisation is experiencing performance degradation and needs a direct answer, book a confidential consultation via the link in bio.",
    hashtags: "#ExecutiveAdvisory #PCS #Australia",
    note: "Never name the client or the organisation. Describe the situation and the outcome only.",
  },
  {
    label: "CREDENTIAL",
    graphic: <AchievementTemplate milestone="Decades of operational and executive leadership." detail="Across Oceania, the Middle East, North Africa, and Asia. In environments where performance, safety, and accountability are non-negotiable." badge="MBA  ·  MA (Hons) Psychology" />,
    intent: "Credential",
    hook: "Experience is not a credential. It is a lens.",
    body: "Decades of operational and executive leadership across Oceania, the Middle East, North Africa, and Asia. C-suite roles in complex, high-consequence environments. Post holder roles. Direct experience dealing with Regulators. That background shapes how PCS diagnoses, designs, and delivers — in every engagement, for every client.",
    closing: "Founder and Principal Consultant. I work directly with every client from the first conversation to the final handover. MBA. MA (Hons) Psychology.",
    hashtags: "#ExecutiveAdvisory #PCS #Aviation",
    note: "Use sparingly. 2–3 times per year. Do not list qualifications in every post.",
  },
  {
    label: "CTA",
    graphic: <PostGraphic label="CONSULTATION CTA" headline="Book a confidential executive consultation." sub="DIRECT ENGAGEMENT" bgPurple footer="parachuteconsultingsolutions.com">
      <div style={{ marginTop: 10 }}>
        <div style={{ display: "inline-block", padding: "5px 14px", background: B.gold, fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: B.nearBlack, textTransform: "uppercase", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}>
          BOOK NOW
        </div>
      </div>
    </PostGraphic>,
    intent: "Consultation CTA",
    hook: "If your organisation is facing a problem that needs a direct answer, this is where the conversation starts.",
    body: "PCS works directly alongside C-suite leaders and business owners across Australia, the Pacific, and Asia. One diagnostic. One point of contact. Measurable outcomes across Aviation, Operations and Logistics, Organisation Culture, and Safety and Risk Management.",
    closing: "Book a confidential consultation via the link in bio or WhatsApp +61 459 728 841. No obligation. No junior staff. Just a direct conversation with Michael Young.",
    hashtags: "#ExecutiveAdvisory #PCS #BookAConsultation",
    note: "Use once per fortnight maximum. Always pair with a piece of content in the same week.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
const tabs = [
  "Hero Banners",
  "Quote Template",
  "Service Template",
  "Engagement Template",
  "Achievement Template",
  "Post Templates",
  "Featured Thumbnails",
];

export default function App() {
  const [active, setActive] = useState(0);
  const [postIndex, setPostIndex] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: B.offWhite, fontFamily: "'Barlow Condensed', sans-serif", color: B.nearBlack }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: `linear-gradient(160deg, #8f2ea0 0%, #7a2488 45%, #5c1a78 100%)`,
        padding: "24px 40px",
        display: "flex", alignItems: "center", gap: 16,
        borderBottom: `3px solid rgba(185,166,105,0.4)`,
      }}>
        <SlashMark size={0.9} light />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: B.white }}>PCS LinkedIn Brand Kit</div>
          <div style={{ fontSize: 11, fontWeight: 400, color: B.goldLight, opacity: 0.85, fontFamily: "'Barlow', sans-serif", fontStyle: "italic" }}>
            Parachute Consulting Solutions  ·  Kinetic Minimalism  ·  2026
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, padding: "0 40px", background: B.white, borderBottom: `1px solid rgba(129,41,144,0.12)`, flexWrap: "wrap" }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "12px 16px",
              background: "transparent",
              border: "none",
              color: active === i ? B.purple : B.textLight,
              fontSize: 11,
              fontWeight: active === i ? 700 : 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Barlow Condensed', sans-serif",
              borderBottom: active === i ? `3px solid ${B.purple}` : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "40px" }}>

        {/* HERO BANNERS */}
        {active === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Personal Profile Banner — Michael Young</div>
                <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>1584 × 396px  ·  Preview at 50%  ·  Export as PNG</div>
              </div>
              <PersonalHeroBanner />
              <div style={{ marginTop: 10, padding: "10px 16px", background: B.white, border: `1px solid rgba(129,41,144,0.10)`, maxWidth: 792 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Usage Notes</div>
                <div style={{ fontSize: 11, color: B.textMid, fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
                  Replace with Michael's actual headshot on the right side when available. Tagline and sector list reinforce website keywords for LinkedIn search alignment. Export at 1584 × 396px as PNG.
                </div>
              </div>
            </div>

            <div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Company Page Banner — Parachute Consulting Solutions</div>
                <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>1584 × 396px  ·  Preview at 50%  ·  Export as PNG</div>
              </div>
              <CompanyHeroBanner />
              <div style={{ marginTop: 10, padding: "10px 16px", background: B.white, border: `1px solid rgba(129,41,144,0.10)`, maxWidth: 792 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Usage Notes</div>
                <div style={{ fontSize: 11, color: B.textMid, fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
                  Centred layout works on both desktop and mobile crop. Four pillars reinforce service keywords. Geography line supports regional visibility.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QUOTE TEMPLATE */}
        {active === 1 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Quote / Insight Template</div>
              <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  Preview at 50%  ·  Use for key brand statements and sector insights</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "Risk cannot be eliminated. It can be controlled.",
                "Culture is not an initiative. It is an operating system.",
                "Aviation demands precision. Every other industry benefits from the same standard.",
              ].map((q, i) => (
                <QuoteTemplate key={i} quote={q} />
              ))}
            </div>
          </div>
        )}

        {/* SERVICE TEMPLATE */}
        {active === 2 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Service Announcement Template</div>
              <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  One per sector  ·  Rotate across all four</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { service: "Aviation",                  tagline: "Precision across flight operations, ground operations, and operations leadership." },
                { service: "Operations & Logistics",    tagline: "Diagnosing operational friction. Restoring performance. Building capability." },
                { service: "Organisation Culture",      tagline: "Leadership clarity. Structural alignment. Behavioural discipline." },
                { service: "Safety & Risk Management",  tagline: "From compliance to proactive risk management and building safety culture." },
              ].map((s, i) => <ServiceTemplate key={i} {...s} />)}
            </div>
          </div>
        )}

        {/* ENGAGEMENT TEMPLATE */}
        {active === 3 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Engagement / Question Template</div>
              <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  Use to open conversations and drive comments</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <EngagementTemplate question="What is the single biggest operational friction point in your organisation right now?" context="The answer to that question is usually the starting point for every PCS engagement." />
              <EngagementTemplate question="At what point does complexity in an organisation become the biggest risk to performance?" context="Most organisations do not fail because of external pressure. They fail because the friction was already inside." />
            </div>
          </div>
        )}

        {/* ACHIEVEMENT TEMPLATE */}
        {active === 4 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Achievement / Milestone Template</div>
              <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  Use for credentials and landmark moments</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <AchievementTemplate milestone="Decades of operational and executive leadership." detail="Across Oceania, the Middle East, North Africa, and Asia. In environments where performance, safety, and accountability are non-negotiable." badge="MBA  ·  MA (Hons) Psychology" />
              <AchievementTemplate milestone="Four specialised sectors. One direct point of contact." detail="Aviation. Operations and Logistics. Organisation Culture. Safety and Risk Management. Each delivered as a defined intervention with measurable outcomes." badge="Australia  ·  Pacific  ·  Asia" />
            </div>
          </div>
        )}

        {/* POST TEMPLATES */}
        {active === 5 && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Post Templates — All Intents</div>
              <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>
                Each template includes a post graphic and ready-to-use copy structure. Select a post type below.
              </div>
            </div>

            {/* Post type selector */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
              {postTypes.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPostIndex(i)}
                  style={{
                    padding: "8px 18px",
                    background: postIndex === i ? B.purple : B.white,
                    border: `1px solid ${postIndex === i ? B.purple : "rgba(129,41,144,0.2)"}`,
                    color: postIndex === i ? B.white : B.purple,
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    transition: "all 0.2s",
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Selected post */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {postTypes[postIndex].graphic}
              <CopyCard
                intent={postTypes[postIndex].intent}
                hook={postTypes[postIndex].hook}
                body={postTypes[postIndex].body}
                closing={postTypes[postIndex].closing}
                hashtags={postTypes[postIndex].hashtags}
                note={postTypes[postIndex].note}
              />
            </div>
          </div>
        )}

        {/* FEATURED THUMBNAILS */}
        {active === 6 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.purple, textTransform: "uppercase", marginBottom: 4 }}>Featured Section Thumbnails</div>
              <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>1200 × 627px  ·  Preview at 33%  ·  Link each to the corresponding website page</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <FeaturedThumb label="Website"  title="Book a Consultation"    variant="purple" />
              <FeaturedThumb label="Services" title="Aviation"               variant="purple" />
              <FeaturedThumb label="Services" title="Operations & Logistics" variant="white" />
              <FeaturedThumb label="Services" title="Organisation Culture"   variant="purple" />
              <FeaturedThumb label="Services" title="Safety & Risk"          variant="white" />
            </div>
            <div style={{ marginTop: 16, padding: "12px 18px", background: B.white, border: `1px solid rgba(129,41,144,0.10)`, maxWidth: 640 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", marginBottom: 6 }}>Usage Notes</div>
              <div style={{ fontSize: 11, color: B.textMid, fontFamily: "'Barlow', sans-serif", lineHeight: 1.65 }}>
                Position 01 always links to Book a Consultation. Positions 02 to 05 link to each service page in order. Alternate purple and white variants so the row reads as a set without being repetitive. All five must link to live pages before publishing.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
