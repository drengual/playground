import { useState, useRef } from "react";

// ─── BRAND TOKENS ────────────────────────────────────────────────────────────
const B = {
  purple:      "#812990",
  purpleDeep:  "#4a1155",
  purpleHero:  "#7a2488",
  purpleMid:   "#6a2278",
  purpleLight: "#c060d4",
  blue:        "#182f7c",
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
  border:      "rgba(129,41,144,0.12)",
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const SlashMark = ({ size = 1, light = false }) => (
  <div style={{ display: "flex", gap: `${3*size}px`, alignItems: "flex-end" }}>
    {[
      { h: 14*size, bg: light ? "rgba(255,255,255,0.5)" : B.blueLight },
      { h: 14*size, bg: light ? "rgba(255,255,255,0.6)" : B.blue },
      { h: 20*size, bg: light ? "rgba(255,255,255,0.7)" : B.purpleLight },
      { h: 20*size, bg: light ? "rgba(255,255,255,0.8)" : B.purple },
      { h: 26*size, bg: B.gold },
    ].map((s, i) => (
      <div key={i} style={{ width: `${3*size}px`, height: `${s.h}px`, background: s.bg, borderRadius: `${2*size}px`, transform: "skewX(-8deg)" }} />
    ))}
  </div>
);

const BgSlashes = () => (
  <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", gap: 14, alignItems: "center", opacity: 0.10, zIndex: 1, pointerEvents: "none" }}>
    {["rgba(255,255,255,0.5)", "rgba(255,255,255,0.6)", B.gold].map((bg, i) => (
      <div key={i} style={{ width: 4, height: "115%", background: bg, borderRadius: 3, transform: "skewX(-10deg)" }} />
    ))}
  </div>
);

// ─── POST INTENT DEFINITIONS ─────────────────────────────────────────────────
const INTENTS = [
  {
    id: "insight",
    label: "Insight",
    icon: "💡",
    desc: "Sharp observation about your industry or leadership",
    bgPurple: false,
    hookPlaceholder: "Most organisations do not fail because of external pressure.",
    bodyPlaceholder: "Write 2–3 sentences expanding on the observation. What is the underlying truth? What does it cost organisations that ignore it?",
    closingPlaceholder: "End with a direct question or a clear invitation to engage.",
    hashtagSuggestion: "#ExecutiveAdvisory #PCS #Leadership",
  },
  {
    id: "question",
    label: "Question",
    icon: "❓",
    desc: "Drive comments by asking something worth answering",
    bgPurple: false,
    hookPlaceholder: "At what point does complexity become the greatest risk to performance?",
    bodyPlaceholder: "Give 1–2 sentences of context. Do not answer your own question — that kills the conversation.",
    closingPlaceholder: "Restate the question slightly differently. Invite a direct response.",
    hashtagSuggestion: "#ExecutiveAdvisory #PCS #Operations",
  },
  {
    id: "service",
    label: "Service Spotlight",
    icon: "🎯",
    desc: "Spotlight one of your four service sectors",
    bgPurple: true,
    hookPlaceholder: "Aviation has zero tolerance for ambiguity. That is not a constraint. It is a standard.",
    bodyPlaceholder: "Describe a specific tension or problem in this sector. What do organisations in this space get wrong? What does PCS do differently?",
    closingPlaceholder: "Close with a direct CTA. Link in bio or WhatsApp.",
    hashtagSuggestion: "#Aviation #PCS #ExecutiveAdvisory",
  },
  {
    id: "outcome",
    label: "Case Outcome",
    icon: "📈",
    desc: "Share a result without naming the client",
    bgPurple: true,
    hookPlaceholder: "The diagnosis took three days. The recovery took six weeks.",
    bodyPlaceholder: "Describe the situation in general terms — the sector, the problem type, what was at stake. Never name the client. Focus on the outcome.",
    closingPlaceholder: "Bridge to the CTA. How can others with the same problem get the same result?",
    hashtagSuggestion: "#ExecutiveAdvisory #PCS #Results",
  },
  {
    id: "thought",
    label: "Thought Leadership",
    icon: "🧠",
    desc: "Longer-form perspective on an industry trend or challenge",
    bgPurple: false,
    hookPlaceholder: "The organisations that will outperform in the next decade are already doing something different today.",
    bodyPlaceholder: "Share your perspective on a trend, shift, or challenge you are seeing across your sectors. 3–5 sentences. This is your considered professional view.",
    closingPlaceholder: "What does this mean in practice? Leave them with one clear takeaway.",
    hashtagSuggestion: "#ExecutiveAdvisory #PCS #FutureOfWork",
  },
  {
    id: "news",
    label: "Industry News",
    icon: "📰",
    desc: "Comment on a relevant industry development",
    bgPurple: false,
    hookPlaceholder: "There is a significant development in aviation regulation that every operator should be watching.",
    bodyPlaceholder: "Reference the news item or development. Give your read on what it means — not a summary, your interpretation. What should leaders in this space be thinking about?",
    closingPlaceholder: "What is the one practical step organisations should take in response?",
    hashtagSuggestion: "#Aviation #Safety #PCS",
  },
  {
    id: "event",
    label: "Announcement",
    icon: "📣",
    desc: "Share news, appearances, milestones or announcements",
    bgPurple: true,
    hookPlaceholder: "Pleased to share that PCS is expanding its advisory work in the Pacific region.",
    bodyPlaceholder: "Give the relevant detail — what is happening, where, and why it matters. Keep it factual and direct. No padding.",
    closingPlaceholder: "What does this mean for people who want to work with you? How do they get in touch?",
    hashtagSuggestion: "#PCS #ExecutiveAdvisory #Australia",
  },
  {
    id: "credential",
    label: "Credential",
    icon: "🏅",
    desc: "Share experience, qualifications or a professional milestone",
    bgPurple: false,
    hookPlaceholder: "Experience is not a credential. It is a lens.",
    bodyPlaceholder: "State the experience, role or qualification and what it actually means in practice. How does it shape the way you work with clients?",
    closingPlaceholder: "Keep it grounded. Anchor the credential to client value.",
    hashtagSuggestion: "#PCS #ExecutiveAdvisory #Leadership",
  },
  {
    id: "cta",
    label: "Consultation CTA",
    icon: "📅",
    desc: "Direct invitation to book a confidential consultation",
    bgPurple: true,
    hookPlaceholder: "If your organisation is facing a problem that needs a direct answer, this is where the conversation starts.",
    bodyPlaceholder: "Briefly describe who you work with and how. One sentence per point. No waffle.",
    closingPlaceholder: "Give them a clear action: Link in bio. WhatsApp. Direct message.",
    hashtagSuggestion: "#PCS #BookAConsultation #ExecutiveAdvisory",
  },
];

// ─── LIVE GRAPHIC PREVIEW ─────────────────────────────────────────────────────
const GraphicPreview = ({ intent, hook, body, closing }) => {
  const bg = intent.bgPurple
    ? `radial-gradient(ellipse 70% 90% at 5% 50%, rgba(92,26,104,0.9) 0%, transparent 55%), linear-gradient(160deg, #8f2ea0 0%, #7a2488 45%, #5c1a78 100%)`
    : B.white;
  const textColour = intent.bgPurple ? B.white : B.nearBlack;
  const subColour  = intent.bgPurple ? B.goldLight : B.gold;
  const footerCol  = intent.bgPurple ? "rgba(255,255,255,0.4)" : B.textLight;

  const displayHook = hook || intent.hookPlaceholder;

  return (
    <div style={{
      width: 600, height: 314, position: "relative", overflow: "hidden",
      background: bg, fontFamily: "'Barlow Condensed', sans-serif",
      border: intent.bgPurple ? "none" : `1px solid ${B.border}`,
      flexShrink: 0,
    }}>
      {intent.bgPurple && <BgSlashes />}

      {/* Left accent bar — light only */}
      {!intent.bgPurple && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: `linear-gradient(180deg, ${B.blue}, ${B.purple}, ${B.gold})`, zIndex: 10 }} />
      )}
      {/* Top bar — light only */}
      {!intent.bgPurple && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${B.purple}, ${B.blue})`, zIndex: 10 }} />
      )}

      <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: intent.bgPurple ? "24px 40px" : "28px 44px 24px 52px" }}>

        {/* Logo + intent label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SlashMark size={0.65} light={intent.bgPurple} />
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: intent.bgPurple ? "rgba(255,255,255,0.55)" : B.nearBlack, opacity: intent.bgPurple ? 1 : 0.45, textTransform: "uppercase" }}>PCS</div>
          <div style={{ marginLeft: 8, fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: subColour, textTransform: "uppercase", opacity: 0.85 }}>{intent.label.toUpperCase()}</div>
        </div>

        {/* Hook — main headline */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", color: subColour, textTransform: "uppercase", marginBottom: 8, opacity: 0.85 }}>
            {intent.label.toUpperCase()}
          </div>
          <div style={{
            fontSize: hook && hook.length > 80 ? 16 : 20,
            fontWeight: 700, letterSpacing: "0.02em",
            color: textColour, lineHeight: 1.25,
            textTransform: "uppercase", maxWidth: 450,
            transition: "font-size 0.2s",
          }}>
            {displayHook}
          </div>
          {body && (
            <div style={{ marginTop: 8, fontSize: 11, fontWeight: 400, color: intent.bgPurple ? "rgba(255,255,255,0.65)" : B.textMid, fontFamily: "'Barlow', sans-serif", lineHeight: 1.4, maxWidth: 440, fontStyle: "italic" }}>
              {body.length > 120 ? body.substring(0, 120) + "…" : body}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ width: 28, height: 1, background: B.gold, opacity: 0.7, marginBottom: 5 }} />
            <div style={{ fontSize: 8.5, letterSpacing: "0.08em", color: footerCol, fontFamily: "'Barlow', sans-serif" }}>parachuteconsultingsolutions.com</div>
          </div>
          <div style={{ fontSize: 8, letterSpacing: "0.12em", color: footerCol, textTransform: "uppercase" }}>Australia · Pacific · Asia</div>
        </div>
      </div>
    </div>
  );
};

// ─── POST COPY PREVIEW ────────────────────────────────────────────────────────
const CopyPreview = ({ hook, body, closing, hashtags }) => {
  const full = [hook, body, closing, hashtags].filter(Boolean).join("\n\n");
  const wordCount = full.split(/\s+/).filter(Boolean).length;
  const charCount = full.length;

  return (
    <div style={{ background: B.white, border: `1px solid ${B.border}`, padding: "20px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: B.purple, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>
          Post Copy Preview
        </div>
        <div style={{ fontSize: 10, color: B.textLight, fontFamily: "'Barlow', sans-serif" }}>
          {wordCount} words · {charCount} chars {charCount > 3000 && <span style={{ color: "#c0392b" }}>⚠ exceeds LinkedIn limit</span>}
        </div>
      </div>
      <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: B.nearBlack, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        {full || <span style={{ color: B.textLight, fontStyle: "italic" }}>Start typing to see your post copy here…</span>}
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedIntent, setSelectedIntent] = useState(INTENTS[0]);
  const [hook,     setHook]     = useState("");
  const [body,     setBody]     = useState("");
  const [closing,  setClosing]  = useState("");
  const [hashtags, setHashtags] = useState("");
  const [copied,   setCopied]   = useState(false);

  const handleIntentChange = (intent) => {
    setSelectedIntent(intent);
    setHook(""); setBody(""); setClosing("");
    setHashtags(intent.hashtagSuggestion);
  };

  const handleCopy = () => {
    const text = [hook, body, closing, hashtags].filter(Boolean).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const inputStyle = {
    width: "100%", background: B.white,
    border: `1px solid rgba(129,41,144,0.15)`,
    color: B.nearBlack, fontFamily: "'Barlow', sans-serif",
    fontSize: 13, padding: "10px 12px",
    outline: "none", resize: "vertical",
    transition: "border-color 0.2s",
    borderRadius: 0,
  };

  const labelStyle = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 10, fontWeight: 700,
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: B.purple, marginBottom: 6, display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", background: B.offWhite, fontFamily: "'Barlow Condensed', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: `linear-gradient(160deg, #8f2ea0 0%, #7a2488 45%, #5c1a78 100%)`,
        padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "3px solid rgba(185,166,105,0.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <SlashMark size={0.9} light />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: B.white }}>PCS Post Composer</div>
            <div style={{ fontSize: 11, fontWeight: 400, color: B.goldLight, opacity: 0.85, fontFamily: "'Barlow', sans-serif", fontStyle: "italic" }}>
              Write · Preview · Copy — Michael Young, Parachute Consulting Solutions
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "calc(100vh - 73px)" }}>

        {/* LEFT — Intent Selector */}
        <div style={{ background: B.white, borderRight: `1px solid ${B.border}`, padding: "24px 0" }}>
          <div style={{ padding: "0 20px 12px", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: B.textLight, textTransform: "uppercase" }}>
            Post Intent
          </div>
          {INTENTS.map((intent) => (
            <button
              key={intent.id}
              onClick={() => handleIntentChange(intent)}
              style={{
                width: "100%", textAlign: "left",
                padding: "12px 20px",
                background: selectedIntent.id === intent.id ? `rgba(129,41,144,0.06)` : "transparent",
                border: "none",
                borderLeft: selectedIntent.id === intent.id ? `3px solid ${B.purple}` : "3px solid transparent",
                cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "flex-start", gap: 10,
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1 }}>{intent.icon}</span>
              <div>
                <div style={{
                  fontSize: 12, fontWeight: selectedIntent.id === intent.id ? 700 : 500,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: selectedIntent.id === intent.id ? B.purple : B.nearBlack,
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}>
                  {intent.label}
                </div>
                <div style={{ fontSize: 11, color: B.textLight, fontFamily: "'Barlow', sans-serif", lineHeight: 1.4, marginTop: 2 }}>
                  {intent.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT — Composer + Preview */}
        <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 28 }}>

          {/* Live Graphic Preview */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: B.purple, textTransform: "uppercase", marginBottom: 10 }}>
              Live Graphic Preview
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <GraphicPreview intent={selectedIntent} hook={hook} body={body} closing={closing} />
              <div style={{ background: B.white, border: `1px solid ${B.border}`, padding: "16px 18px", maxWidth: 260 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: B.gold, textTransform: "uppercase", marginBottom: 8, fontFamily: "'Barlow Condensed', sans-serif" }}>Usage Guidance</div>
                <div style={{ fontSize: 11, color: B.textMid, fontFamily: "'Barlow', sans-serif", lineHeight: 1.65 }}>
                  {selectedIntent.id === "insight" && "150–250 words. Attach graphic. No more than 3 hashtags. End with a direct question."}
                  {selectedIntent.id === "question" && "60–120 words. End with the question. Do not answer it yourself — that kills the conversation."}
                  {selectedIntent.id === "service" && "100–180 words. Rotate all four sectors over time. Always include a direct CTA at the end."}
                  {selectedIntent.id === "outcome" && "120–200 words. Never name the client. Describe the situation and outcome only."}
                  {selectedIntent.id === "thought" && "200–350 words. This is your considered professional view. One clear takeaway at the end."}
                  {selectedIntent.id === "news" && "80–160 words. Give your interpretation, not just a summary. What should leaders do about it?"}
                  {selectedIntent.id === "event" && "60–120 words. Factual and direct. No padding. Clear CTA for anyone who wants to connect."}
                  {selectedIntent.id === "credential" && "80–150 words. Use 2–3 times per year maximum. Always anchor credentials to client value."}
                  {selectedIntent.id === "cta" && "60–100 words. Use once per fortnight maximum. Always pair with a content post in the same week."}
                </div>
              </div>
            </div>
          </div>

          {/* Writing Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: B.purple, textTransform: "uppercase" }}>
              Write Your Post
            </div>

            <div>
              <label style={labelStyle}>Hook (opening line)</label>
              <textarea
                rows={2}
                value={hook}
                onChange={e => setHook(e.target.value)}
                placeholder={selectedIntent.hookPlaceholder}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Body (2–4 sentences)</label>
              <textarea
                rows={4}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder={selectedIntent.bodyPlaceholder}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Closing / CTA</label>
              <textarea
                rows={2}
                value={closing}
                onChange={e => setClosing(e.target.value)}
                placeholder={selectedIntent.closingPlaceholder}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Hashtags (3 max)</label>
              <input
                type="text"
                value={hashtags}
                onChange={e => setHashtags(e.target.value)}
                placeholder={selectedIntent.hashtagSuggestion}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>
          </div>

          {/* Copy Preview + Actions */}
          <div>
            <CopyPreview hook={hook} body={body} closing={closing} hashtags={hashtags} />
            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <button
                onClick={handleCopy}
                style={{
                  padding: "12px 28px",
                  background: copied
                    ? `linear-gradient(135deg, #27ae60, #2ecc71)`
                    : `linear-gradient(135deg, ${B.goldLight}, ${B.gold}, ${B.goldDark})`,
                  border: "none", cursor: "pointer",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: B.nearBlack,
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 16px rgba(185,166,105,0.25)",
                }}
              >
                {copied ? "✓ Copied to Clipboard" : "Copy Post Copy"}
              </button>
              <button
                onClick={() => { setHook(""); setBody(""); setClosing(""); setHashtags(selectedIntent.hashtagSuggestion); }}
                style={{
                  padding: "12px 20px",
                  background: "transparent",
                  border: `1px solid rgba(129,41,144,0.2)`,
                  cursor: "pointer",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 12, fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: B.textMid, transition: "all 0.2s",
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                Clear
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
