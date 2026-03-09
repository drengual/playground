import { useState } from "react";

// ─── BRAND TOKENS ───────────────────────────────────────────────────────────
const B = {
  purple: "#812990",
  purpleDeep: "#4a1155",
  purpleMid: "#6a2278",
  purpleLight: "#a83db8",
  blue: "#182f7c",
  blueDeep: "#0d1e54",
  blueLight: "#2a47a8",
  gold: "#b9a669",
  goldLight: "#d4c48a",
  goldDark: "#8a7a4a",
  black: "#1A1A1A",
  white: "#FFFFFF",
  offWhite: "#f8f5fa",
};

// ─── NOISE SVG (inline, no external deps) ───────────────────────────────────
const NoiseBg = ({ opacity = 0.04 }) => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" opacity={opacity} />
  </svg>
);

// ─── SLASH MARK (logo motif) ─────────────────────────────────────────────────
const SlashMark = ({ size = 1, opacity = 1 }) => (
  <div style={{ display: "flex", gap: `${3 * size}px`, alignItems: "flex-end", opacity }}>
    {[
      { h: 14 * size, bg: B.blueLight },
      { h: 14 * size, bg: B.blue },
      { h: 20 * size, bg: B.purpleLight },
      { h: 20 * size, bg: B.purple },
      { h: 26 * size, bg: B.gold },
    ].map((s, i) => (
      <div
        key={i}
        style={{
          width: `${3 * size}px`,
          height: `${s.h}px`,
          background: s.bg,
          borderRadius: `${2 * size}px`,
          transform: "skewX(-8deg)",
        }}
      />
    ))}
  </div>
);

// ─── GOLD RULE ───────────────────────────────────────────────────────────────
const GoldRule = ({ width = "100%", opacity = 0.5 }) => (
  <div
    style={{
      width,
      height: 1,
      background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`,
      opacity,
    }}
  />
);

// ═══════════════════════════════════════════════════════════════════════════════
// HERO BANNER — PERSONAL (Michael Young)
// LinkedIn dimensions: 1584 x 396px → rendered at 792 x 198 (50% for preview)
// ═══════════════════════════════════════════════════════════════════════════════
const PersonalHeroBanner = () => (
  <div
    style={{
      width: 792,
      height: 198,
      position: "relative",
      overflow: "hidden",
      background: `
        radial-gradient(ellipse 70% 120% at 10% 50%, rgba(129,41,144,0.6) 0%, transparent 55%),
        radial-gradient(ellipse 50% 80% at 85% 20%, rgba(24,47,124,0.45) 0%, transparent 55%),
        radial-gradient(ellipse 40% 60% at 60% 90%, rgba(129,41,144,0.2) 0%, transparent 50%),
        linear-gradient(135deg, #080310 0%, #0d1530 50%, #090210 100%)
      `,
      fontFamily: "'Barlow Condensed', sans-serif",
    }}
  >
    <NoiseBg opacity={0.045} />

    {/* Large decorative slashes right side */}
    <div style={{ position: "absolute", right: -10, top: 0, bottom: 0, display: "flex", gap: 20, alignItems: "center", opacity: 0.07, zIndex: 2 }}>
      {[{ h: "110%", bg: B.blue }, { h: "110%", bg: B.purple }, { h: "110%", bg: B.gold }].map((s, i) => (
        <div key={i} style={{ width: 6, height: s.h, background: s.bg, borderRadius: 3, transform: "skewX(-10deg)" }} />
      ))}
    </div>

    {/* Diagonal accent slashes mid */}
    <div style={{ position: "absolute", right: "28%", top: 0, bottom: 0, display: "flex", gap: 10, alignItems: "center", opacity: 0.1, zIndex: 2 }}>
      {[{ h: "60%", bg: B.blueLight }, { h: "75%", bg: B.purpleLight }, { h: "88%", bg: B.gold }].map((s, i) => (
        <div key={i} style={{ width: 3, height: s.h, background: s.bg, borderRadius: 2, transform: "skewX(-10deg)" }} />
      ))}
    </div>

    {/* Content */}
    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", padding: "0 48px", gap: 32 }}>

      {/* Left: Logo + tagline */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <SlashMark size={0.9} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.14em", color: B.white, lineHeight: 1, textTransform: "uppercase" }}>
              PARACHUTE
            </div>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.12em", color: B.white, opacity: 0.7, textTransform: "uppercase" }}>
              CONSULTING SOLUTIONS
            </div>
          </div>
        </div>

        <GoldRule width="180px" opacity={0.4} />

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.04em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>
            EXECUTIVE SURGICAL
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.04em", color: "transparent", WebkitTextStroke: `1px rgba(255,255,255,0.35)`, textTransform: "uppercase", lineHeight: 1.0 }}>
            INTERVENTIONS
          </div>
          <div style={{ marginTop: 6, fontSize: 9, fontWeight: 400, fontStyle: "italic", color: B.gold, letterSpacing: "0.06em", fontFamily: "'Barlow', sans-serif", opacity: 0.9 }}>
            for Organisations That Cannot Afford to Guess.
          </div>
        </div>
      </div>

      {/* Vertical divider */}
      <div style={{ width: 1, height: 100, background: `linear-gradient(180deg, transparent, ${B.gold}, transparent)`, opacity: 0.3 }} />

      {/* Right: Personal identity */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.25em", color: B.gold, textTransform: "uppercase", marginBottom: 6, opacity: 0.8 }}>
          FOUNDER & PRINCIPAL CONSULTANT
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.03em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>
          MICHAEL
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.03em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>
          YOUNG
        </div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
          {["Aviation", "Operations & Logistics", "Organisation Culture", "Safety & Risk"].map((s, i) => (
            <div key={i} style={{ fontSize: 8.5, fontWeight: 500, letterSpacing: "0.1em", color: B.white, opacity: 0.45, textTransform: "uppercase" }}>{s}</div>
          ))}
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 8, letterSpacing: "0.1em", color: B.gold, opacity: 0.6, fontFamily: "'Barlow', sans-serif" }}>
            parachuteconsultingsolutions.com
          </div>
        </div>
      </div>
    </div>

    {/* Bottom gold rule */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`, opacity: 0.35, zIndex: 10 }} />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// HERO BANNER — COMPANY PAGE (Parachute Consulting Solutions)
// ═══════════════════════════════════════════════════════════════════════════════
const CompanyHeroBanner = () => (
  <div
    style={{
      width: 792,
      height: 198,
      position: "relative",
      overflow: "hidden",
      background: `
        radial-gradient(ellipse 80% 100% at 50% 0%, rgba(129,41,144,0.4) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 10% 80%, rgba(24,47,124,0.35) 0%, transparent 55%),
        radial-gradient(ellipse 50% 60% at 90% 60%, rgba(129,41,144,0.25) 0%, transparent 50%),
        linear-gradient(160deg, #0a0318 0%, #0d1535 40%, #080210 100%)
      `,
      fontFamily: "'Barlow Condensed', sans-serif",
    }}
  >
    <NoiseBg opacity={0.04} />

    {/* Grid pattern subtle */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 1, opacity: 0.03,
      backgroundImage: `linear-gradient(${B.gold} 1px, transparent 1px), linear-gradient(90deg, ${B.gold} 1px, transparent 1px)`,
      backgroundSize: "40px 40px"
    }} />

    {/* Large slashes left */}
    <div style={{ position: "absolute", left: -8, top: 0, bottom: 0, display: "flex", gap: 18, alignItems: "center", opacity: 0.08, zIndex: 2 }}>
      {[B.blue, B.purple, B.gold].map((c, i) => (
        <div key={i} style={{ width: 5, height: "110%", background: c, borderRadius: 3, transform: "skewX(-10deg)" }} />
      ))}
    </div>

    {/* Content — centred layout */}
    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <SlashMark size={1.1} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.16em", color: B.white, lineHeight: 1, textTransform: "uppercase" }}>
            PARACHUTE
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: B.white, opacity: 0.65, textTransform: "uppercase" }}>
            CONSULTING SOLUTIONS
          </div>
        </div>
      </div>

      <GoldRule width="320px" opacity={0.35} />

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.05em", color: B.white, textTransform: "uppercase", lineHeight: 1.0 }}>
          EXECUTIVE SURGICAL INTERVENTIONS
        </div>
        <div style={{ marginTop: 5, fontSize: 10, fontWeight: 400, fontStyle: "italic", color: B.gold, letterSpacing: "0.06em", fontFamily: "'Barlow', sans-serif" }}>
          for Organisations That Cannot Afford to Guess.
        </div>
      </div>

      <GoldRule width="320px" opacity={0.2} />

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {["Aviation", "Operations & Logistics", "Organisation Culture", "Safety & Risk"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <div style={{ width: 1, height: 10, background: B.gold, opacity: 0.3 }} />}
            <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", color: B.white, opacity: 0.5, textTransform: "uppercase" }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 8.5, letterSpacing: "0.1em", color: B.gold, opacity: 0.55, fontFamily: "'Barlow', sans-serif" }}>
        Australia  ·  Pacific  ·  Asia  ·  parachuteconsultingsolutions.com
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)`, opacity: 0.35, zIndex: 10 }} />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SOCIAL TEMPLATES
// All at 1200 x 628px → rendered at 600 x 314 (50%)
// ═══════════════════════════════════════════════════════════════════════════════

// Template 1: QUOTE / INSIGHT
const QuoteTemplate = ({ quote = "Risk cannot be eliminated. It can be controlled.", source = "Michael Young, PCS" }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 80% 70% at 15% 40%, rgba(129,41,144,0.55) 0%, transparent 55%),
      radial-gradient(ellipse 60% 70% at 85% 60%, rgba(24,47,124,0.4) 0%, transparent 55%),
      linear-gradient(140deg, #0a0318 0%, #0d1535 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <NoiseBg opacity={0.04} />

    {/* Left accent bar */}
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(180deg, ${B.blue}, ${B.purple}, ${B.gold})`, zIndex: 10 }} />

    {/* Decorative large quote mark */}
    <div style={{ position: "absolute", right: 32, top: 16, fontSize: 140, fontWeight: 800, color: B.purple, opacity: 0.12, lineHeight: 1, zIndex: 2, fontFamily: "'Barlow Condensed', sans-serif" }}>"</div>

    {/* Slashes top right */}
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", gap: 12, alignItems: "center", opacity: 0.06, zIndex: 2 }}>
      {[B.blue, B.purple, B.gold].map((c, i) => (
        <div key={i} style={{ width: 4, height: "110%", background: c, transform: "skewX(-10deg)" }} />
      ))}
    </div>

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 44px 24px 44px" }}>

      {/* Top: logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <SlashMark size={0.7} />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: B.white, opacity: 0.6, textTransform: "uppercase" }}>PCS</div>
      </div>

      {/* Middle: quote */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 12, opacity: 0.8 }}>INSIGHT</div>
        <div style={{
          fontSize: 22, fontWeight: 700, letterSpacing: "0.02em", color: B.white,
          lineHeight: 1.25, textTransform: "uppercase", maxWidth: 420
        }}>
          {quote}
        </div>
      </div>

      {/* Bottom: attribution + URL */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <GoldRule width="32px" opacity={0.6} />
          <div style={{ marginTop: 6, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase" }}>{source}</div>
          <div style={{ fontSize: 8.5, fontWeight: 400, letterSpacing: "0.06em", color: B.white, opacity: 0.4, fontFamily: "'Barlow', sans-serif", marginTop: 2 }}>
            parachuteconsultingsolutions.com
          </div>
        </div>
        <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.15em", color: B.white, opacity: 0.3, textTransform: "uppercase" }}>
          Australia · Pacific · Asia
        </div>
      </div>
    </div>
  </div>
);

// Template 2: SERVICE ANNOUNCEMENT
const ServiceTemplate = ({ service = "Aviation", tagline = "Precision across flight operations, ground operations, and operations leadership.", cta = "Direct enquiries: parachuteconsultingsolutions.com" }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 60% 80% at 0% 50%, rgba(24,47,124,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 100% 30%, rgba(129,41,144,0.35) 0%, transparent 55%),
      linear-gradient(150deg, #0d1535 0%, #080318 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <NoiseBg opacity={0.04} />

    {/* Number watermark */}
    <div style={{ position: "absolute", right: 24, bottom: -10, fontSize: 120, fontWeight: 800, color: B.blue, opacity: 0.08, lineHeight: 1, zIndex: 2 }}>01</div>

    {/* Top gold bar */}
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${B.blue}, ${B.purple}, ${B.gold})`, zIndex: 10 }} />

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", padding: "28px 40px" }}>

      {/* Left vertical label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginRight: 28 }}>
        <div style={{ width: 1, flex: 1, background: `linear-gradient(180deg, ${B.gold}, transparent)`, opacity: 0.4 }} />
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)", opacity: 0.7 }}>SERVICE</div>
        <div style={{ width: 1, flex: 1, background: `linear-gradient(180deg, transparent, ${B.gold})`, opacity: 0.4 }} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlashMark size={0.7} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: B.white, opacity: 0.6, textTransform: "uppercase" }}>PARACHUTE CONSULTING SOLUTIONS</div>
        </div>

        {/* Service name */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.25em", color: B.gold, textTransform: "uppercase", marginBottom: 6, opacity: 0.8 }}>SECTOR</div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "0.04em", color: B.white, textTransform: "uppercase", lineHeight: 0.95 }}>{service}</div>
          <div style={{ marginTop: 10, fontSize: 12, fontWeight: 400, color: B.white, opacity: 0.6, fontFamily: "'Barlow', sans-serif", lineHeight: 1.5, maxWidth: 380 }}>
            {tagline}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", color: B.gold, opacity: 0.8 }}>{cta}</div>
          <div style={{ padding: "5px 14px", background: B.gold, fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: B.black, textTransform: "uppercase", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}>
            BOOK A CONSULTATION
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Template 3: ENGAGEMENT / QUESTION
const EngagementTemplate = ({ question = "What is the single biggest operational friction point in your organisation right now?", context = "The answer to that question is usually the starting point for every PCS engagement." }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 70% 70% at 50% 100%, rgba(129,41,144,0.3) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 20% 0%, rgba(24,47,124,0.25) 0%, transparent 55%),
      linear-gradient(180deg, #111520 0%, #0a0318 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <NoiseBg opacity={0.04} />

    {/* Bottom purple glow */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(180deg, transparent, rgba(129,41,144,0.15))`, zIndex: 2 }} />

    {/* Slashes far right */}
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", gap: 10, alignItems: "center", opacity: 0.07, zIndex: 2 }}>
      {[B.blue, B.purple, B.gold].map((c, i) => (
        <div key={i} style={{ width: 3, height: "110%", background: c, transform: "skewX(-10deg)" }} />
      ))}
    </div>

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 44px 24px 44px" }}>

      {/* Top */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlashMark size={0.7} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: B.white, opacity: 0.6, textTransform: "uppercase" }}>PCS</div>
        </div>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", opacity: 0.7 }}>EXECUTIVE PERSPECTIVE</div>
      </div>

      {/* Question */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.25em", color: B.gold, textTransform: "uppercase", marginBottom: 10, opacity: 0.8 }}>A QUESTION WORTH ASKING</div>
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "0.02em", color: B.white, lineHeight: 1.3, maxWidth: 460 }}>
          {question}
        </div>
      </div>

      {/* Context + CTA */}
      <div>
        <GoldRule width="40px" opacity={0.5} />
        <div style={{ marginTop: 8, fontSize: 11, fontWeight: 400, color: B.white, opacity: 0.5, fontFamily: "'Barlow', sans-serif", lineHeight: 1.5, maxWidth: 400, fontStyle: "italic" }}>
          {context}
        </div>
        <div style={{ marginTop: 8, fontSize: 8.5, letterSpacing: "0.08em", color: B.gold, opacity: 0.6 }}>
          parachuteconsultingsolutions.com  ·  Australia  ·  Pacific  ·  Asia
        </div>
      </div>
    </div>
  </div>
);

// Template 4: ACHIEVEMENT / MILESTONE
const AchievementTemplate = ({ milestone = "Decades of operational and executive leadership.", detail = "Across Oceania, the Middle East, North Africa, and Asia. In environments where performance, safety, and accountability are non-negotiable.", badge = "MBA  ·  MA (Hons) Psychology" }) => (
  <div style={{
    width: 600, height: 314, position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 60% 100% at 100% 50%, rgba(185,166,105,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 70% 80% at 0% 30%, rgba(129,41,144,0.45) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 50% 100%, rgba(24,47,124,0.3) 0%, transparent 55%),
      linear-gradient(135deg, #0a0318 0%, #0d1535 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <NoiseBg opacity={0.045} />

    {/* Gold corner accent top right */}
    <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, zIndex: 3 }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 2, background: B.gold, opacity: 0.5 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 2, height: 60, background: B.gold, opacity: 0.5 }} />
    </div>
    {/* Gold corner accent bottom left */}
    <div style={{ position: "absolute", bottom: 0, left: 0, width: 60, height: 60, zIndex: 3 }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 60, height: 2, background: B.gold, opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 2, height: 60, background: B.gold, opacity: 0.5 }} />
    </div>

    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 44px" }}>

      {/* Top */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlashMark size={0.7} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: B.white, opacity: 0.6, textTransform: "uppercase" }}>MICHAEL YOUNG  ·  PCS</div>
        </div>
        <div style={{ padding: "3px 10px", border: `1px solid rgba(185,166,105,0.35)`, fontSize: 8, fontWeight: 600, letterSpacing: "0.15em", color: B.gold, textTransform: "uppercase" }}>
          FOUNDER
        </div>
      </div>

      {/* Milestone */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.25em", color: B.gold, textTransform: "uppercase", marginBottom: 8, opacity: 0.8 }}>EXPERIENCE</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.03em", color: B.white, textTransform: "uppercase", lineHeight: 1.1, maxWidth: 460 }}>
          {milestone}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, fontWeight: 400, color: B.white, opacity: 0.5, fontFamily: "'Barlow', sans-serif", lineHeight: 1.55, maxWidth: 420 }}>
          {detail}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ padding: "5px 14px", background: "rgba(185,166,105,0.1)", border: `1px solid rgba(185,166,105,0.3)`, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase" }}>
          {badge}
        </div>
        <div style={{ fontSize: 8.5, letterSpacing: "0.08em", color: B.white, opacity: 0.35, fontFamily: "'Barlow', sans-serif" }}>
          parachuteconsultingsolutions.com
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURED SECTION THUMBNAILS (LinkedIn Featured links)
// 1200 x 627px → rendered at 400 x 209 (33%)
// ═══════════════════════════════════════════════════════════════════════════════
const FeaturedThumb = ({ label, title, accent }) => (
  <div style={{
    width: 400, height: 209, position: "relative", overflow: "hidden",
    background: `
      radial-gradient(ellipse 80% 80% at 30% 40%, ${accent}55 0%, transparent 60%),
      linear-gradient(135deg, #0a0318 0%, #0d1535 100%)
    `,
    fontFamily: "'Barlow Condensed', sans-serif",
  }}>
    <NoiseBg opacity={0.04} />
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, opacity: 0.7 }} />
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", gap: 8, alignItems: "center", opacity: 0.07 }}>
      {[B.blue, B.purple, B.gold].map((c, i) => (
        <div key={i} style={{ width: 3, height: "110%", background: c, transform: "skewX(-10deg)" }} />
      ))}
    </div>
    <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "18px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <SlashMark size={0.6} />
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", color: B.white, opacity: 0.55, textTransform: "uppercase" }}>PCS</div>
      </div>
      <div>
        <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.22em", color: accent, textTransform: "uppercase", marginBottom: 6, opacity: 0.85 }}>{label}</div>
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.03em", color: B.white, textTransform: "uppercase", lineHeight: 1.1 }}>{title}</div>
      </div>
      <div style={{ fontSize: 7.5, letterSpacing: "0.08em", color: B.white, opacity: 0.35, fontFamily: "'Barlow', sans-serif" }}>
        parachuteconsultingsolutions.com
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
const tabs = [
  "Hero Banners",
  "Quote Template",
  "Service Template",
  "Engagement Template",
  "Achievement Template",
  "Featured Thumbnails",
];

export default function App() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e12", fontFamily: "'Barlow Condensed', sans-serif", color: B.white }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(185,166,105,0.15)", padding: "20px 40px", display: "flex", alignItems: "center", gap: 16 }}>
        <SlashMark size={0.8} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>PCS LinkedIn Brand Kit</div>
          <div style={{ fontSize: 11, fontWeight: 400, color: B.gold, opacity: 0.7, fontFamily: "'Barlow', sans-serif", fontStyle: "italic" }}>
            Parachute Consulting Solutions  ·  Kinetic Minimalism  ·  2026
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, padding: "16px 40px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px",
              background: active === i ? B.purple : "transparent",
              border: "none",
              color: active === i ? B.white : "rgba(255,255,255,0.4)",
              fontSize: 11,
              fontWeight: active === i ? 700 : 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Barlow Condensed', sans-serif",
              borderBottom: active === i ? `2px solid ${B.gold}` : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "40px" }}>

        {/* Hero Banners */}
        {active === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Personal Profile Banner</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>Michael Young  ·  1584 × 396px  ·  Preview at 50%</div>
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <PersonalHeroBanner />
              </div>
              <div style={{ marginTop: 10, padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(185,166,105,0.15)", maxWidth: 792 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Usage Notes</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
                  Replace with actual headshot on right side when available. Tagline and sector list reinforce website keywords for LinkedIn SEO alignment.
                  Export at 1584 × 396px. Use PNG for sharpest result.
                </div>
              </div>
            </div>

            <div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Company Page Banner</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>Parachute Consulting Solutions  ·  1584 × 396px  ·  Preview at 50%</div>
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <CompanyHeroBanner />
              </div>
              <div style={{ marginTop: 10, padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(185,166,105,0.15)", maxWidth: 792 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Usage Notes</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
                  Centred layout works for both desktop and mobile crop. Four pillars listed reinforce service keywords. Geography line at bottom supports regional SEO.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quote Template */}
        {active === 1 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Quote / Insight Template</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  Preview at 50%  ·  Use for key brand statements and sector insights</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <QuoteTemplate quote="Risk cannot be eliminated. It can be controlled." />
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <QuoteTemplate quote="Culture is not an initiative. It is an operating system." />
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <QuoteTemplate quote="Aviation demands precision. Every other industry benefits from the same standard." />
              </div>
            </div>
            <div style={{ marginTop: 16, padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(185,166,105,0.15)", maxWidth: 600 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Post Copy Guidance</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
                Lead with the insight in the post text. Keep post copy under 3 sentences. End with a direct question or a link to the relevant service page. No hashtag overload — 3 maximum.
              </div>
            </div>
          </div>
        )}

        {/* Service Template */}
        {active === 2 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Service Announcement Template</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  One per service pillar  ·  Rotate across the four sectors</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { service: "Aviation", tagline: "Precision across flight operations, ground operations, and operations leadership." },
                { service: "Operations & Logistics", tagline: "Diagnosing operational friction. Restoring performance. Building capability." },
                { service: "Organisation Culture", tagline: "Leadership clarity. Structural alignment. Behavioural discipline." },
                { service: "Safety & Risk Management", tagline: "From compliance to proactive risk management and building safety culture." },
              ].map((s, i) => (
                <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                  <ServiceTemplate service={s.service} tagline={s.tagline} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Template */}
        {active === 3 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Engagement / Question Template</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  Use to open conversations and drive comments</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <EngagementTemplate
                  question="What is the single biggest operational friction point in your organisation right now?"
                  context="The answer to that question is usually the starting point for every PCS engagement."
                />
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <EngagementTemplate
                  question="At what point does complexity in an organisation become the biggest risk to performance?"
                  context="Most organisations do not fail because of external pressure. They fail because the friction was already inside."
                />
              </div>
            </div>
          </div>
        )}

        {/* Achievement Template */}
        {active === 4 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Achievement / Milestone Template</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>1200 × 628px  ·  Use for credentials, experience, and landmark moments</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <AchievementTemplate
                  milestone="Decades of operational and executive leadership."
                  detail="Across Oceania, the Middle East, North Africa, and Asia. In environments where performance, safety, and accountability are non-negotiable."
                  badge="MBA  ·  MA (Hons) Psychology"
                />
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                <AchievementTemplate
                  milestone="Four specialised sectors. One direct point of contact."
                  detail="Aviation. Operations and Logistics. Organisation Culture. Safety and Risk Management. Each delivered as a defined intervention with measurable outcomes."
                  badge="Australia  ·  Pacific  ·  Asia"
                />
              </div>
            </div>
          </div>
        )}

        {/* Featured Thumbnails */}
        {active === 5 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Featured Section Thumbnails</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>1200 × 627px  ·  Preview at 33%  ·  Link each to the corresponding website page</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { label: "Website", title: "Book a Consultation", accent: B.gold },
                { label: "Services", title: "Aviation", accent: B.blueLight },
                { label: "Services", title: "Operations & Logistics", accent: B.purple },
                { label: "Services", title: "Organisation Culture", accent: B.gold },
                { label: "Services", title: "Safety & Risk", accent: B.purpleLight },
              ].map((t, i) => (
                <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", display: "inline-block" }}>
                  <FeaturedThumb {...t} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(185,166,105,0.15)", maxWidth: 640 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: B.gold, textTransform: "uppercase", marginBottom: 4 }}>Usage Notes</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
                First thumbnail should always link to Book a Consultation. Remaining four link to each service page. This keeps the Featured section functional, not just decorative, and drives traffic to the exact pages where conversions happen.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
