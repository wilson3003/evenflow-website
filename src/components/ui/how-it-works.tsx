"use client";
import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const ACCENT  = "#09D9A0";
const INK     = "#141210";
const STONE   = "#8A8078";
const BORDER  = "rgba(232,228,223,0.6)";
const GLASS   = "rgba(255,255,255,0.6)";
const GLASS_OPEN = "rgba(255,255,255,0.82)";

const steps = [
  {
    num: "01",
    title: "Explore and audit.",
    body: "A free 30-minute call. We look at what you've got, what it's actually earning, and what's being left on the table. No deck. No pitch. Just an honest look at your email channel.",
  },
  {
    num: "02",
    title: "The brand interview.",
    body: "One 60-minute session. You talk. We listen. Our AI reads every word in real time — building your brand voice, your customer intelligence, your content strategy — as you speak.",
  },
  {
    num: "03",
    title: "We build your strategy. You approve it.",
    body: "AI creates your complete brief — Brand Intelligence File, email architecture, content calendar. We share it before we write a single word. Nothing goes out until you've said yes.",
  },
  {
    num: "04",
    title: "Execution and live dashboard.",
    body: "Flows go live. Campaigns go out. Your personal dashboard shows exactly what's sending, what's working, and what's coming next — every day.",
  },
];

const stats = [
  { stat: "5–15%",  label: "Abandoned cart recovery" },
  { stat: "7 days", label: "From interview to flows live" },
  { stat: "30–40%", label: "Revenue from email within 90 days" },
];

const included = [
  "Full Klaviyo setup",
  "Brand Intelligence File",
  "Welcome series + abandonment flows",
  "Weekly campaigns in your voice",
  "Live performance dashboard",
  "Weekly optimisation",
  "A/B testing",
  "Dedicated account manager",
];

const why = [
  {
    title: "AI does the heavy lifting.",
    body: "Your Brand Intelligence File is built from a single interview. Everything we write after that sounds like you — not like an agency.",
  },
  {
    title: "You keep full control.",
    body: "We show you everything before it goes out. Your approval, your voice, your brand. We handle execution. You stay in charge of direction.",
  },
  {
    title: "Live in a week.",
    body: "No 90-day onboarding. No strategy decks. Most clients have their first flows live within 7 days of the brand interview.",
  },
  {
    title: "No lock-in.",
    body: "Month-to-month. If it's not working after 90 days, we shouldn't both keep pretending. We earn your business every month.",
  },
];

const label = (text: string) => (
  <p style={{
    fontFamily: "var(--font-dm-mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: ACCENT,
    margin: "0 0 16px",
  }}>{text}</p>
);

export function HowItWorks() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        // @ts-expect-error cal typing incomplete
        cssVarsPerTheme: {
          light: {
            "cal-brand":          "#09D9A0",
            "cal-brand-emphasis": "#141210",
            "cal-brand-text":     "#141210",
            "cal-bg":             "#FAFAF7",
            "cal-bg-muted":       "#F2EEE9",
            "cal-border":         "#E8E4DF",
            "cal-text":           "#141210",
            "cal-text-emphasis":  "#141210",
            "cal-text-subtle":    "#8A8078",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <>
      {/* ── 1. How it works ──────────────────────────────────────── */}
      <section id="how" className="ef-section-how" style={{ padding: "120px 0 140px" }}>
        <div className="ef-section-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}>

          {/* Section header — naked on the gradient */}
          <div style={{ marginBottom: "64px" }}>
            {label("How it works")}
            <h2 className="ef-section-h2" style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "64px",
              letterSpacing: "-0.02em",
              color: INK,
              lineHeight: 1.05,
              margin: "0 0 20px",
            }}>
              One interview.<br />Everything else is handled.
            </h2>
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "18px",
              color: STONE,
              margin: 0,
            }}>
              Most agencies take months. We're live in a week.
            </p>
          </div>

          {/* Accordion — each step is its own frosted card */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
            {steps.map((step, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={step.num}
                  className="ef-accordion-card"
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    background: isOpen ? GLASS_OPEN : GLASS,
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1px solid ${isOpen ? ACCENT : BORDER}`,
                    borderRadius: "10px",
                    padding: "32px 40px",
                    cursor: "pointer",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
                    <span style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: ACCENT,
                      paddingTop: "9px",
                      flexShrink: 0,
                      width: "24px",
                    }}>{step.num}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h3 style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontWeight: 300,
                          fontStyle: "italic",
                          fontSize: "30px",
                          letterSpacing: "-0.02em",
                          color: INK,
                          margin: 0,
                          lineHeight: 1.1,
                        }}>{step.title}</h3>
                        <span style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "20px",
                          color: ACCENT,
                          marginLeft: "24px",
                          flexShrink: 0,
                          lineHeight: 1,
                        }}>{isOpen ? "−" : "+"}</span>
                      </div>
                      {isOpen && (
                        <p style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: 300,
                          fontSize: "16px",
                          lineHeight: 1.8,
                          color: "rgba(20,18,16,0.6)",
                          margin: "16px 0 0",
                          paddingTop: "16px",
                          borderTop: `1px solid ${BORDER}`,
                        }}>{step.body}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 2. Stats — 3 individual frosted cards ────────────────── */}
      <section className="ef-section-stats" style={{ padding: "0 0 120px" }}>
        <div className="ef-section-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}>
          <div className="ef-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {stats.map((item) => (
              <div
                key={item.stat}
                style={{
                  background: GLASS,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "10px",
                  padding: "48px 40px",
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: "12px",
                }}
              >
                <p className="ef-stat-value" style={{
                  fontFamily: "var(--font-clash)",
                  fontWeight: 700,
                  fontSize: "56px",
                  letterSpacing: "-0.04em",
                  color: INK,
                  margin: 0,
                  lineHeight: 1,
                }}>{item.stat}</p>
                <p style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: STONE,
                  margin: 0,
                }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. What's included — 2 frosted cards side by side ─────── */}
      <section className="ef-section-included" style={{ padding: "0 0 120px" }}>
        <div className="ef-section-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}>

          {/* Section header — naked on gradient */}
          <div style={{ marginBottom: "64px" }}>
            {label("What's included")}
            <h2 className="ef-section-h2-sm" style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "52px",
              letterSpacing: "-0.02em",
              color: INK,
              lineHeight: 1.05,
              margin: 0,
            }}>Everything you need.<br />Nothing you don't.</h2>
          </div>

          <div className="ef-included-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "stretch" }}>

            {/* Left card — included list */}
            <div style={{
              background: GLASS,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${BORDER}`,
              borderRadius: "10px",
              padding: "40px",
              boxSizing: "border-box" as const,
            }}>
              {included.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "14px 0",
                    borderBottom: i < included.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}
                >
                  <span style={{ color: ACCENT, fontFamily: "var(--font-dm-mono)", fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>→</span>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "16px", color: "rgba(20,18,16,0.75)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Right card — why it works */}
            <div style={{
              background: GLASS,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${BORDER}`,
              borderRadius: "10px",
              padding: "40px",
              boxSizing: "border-box" as const,
            }}>
              {label("Why it works")}
              {why.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 0",
                    borderTop: i > 0 ? `1px solid ${BORDER}` : "none",
                  }}
                >
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "22px",
                    color: INK,
                    margin: "0 0 8px",
                    lineHeight: 1.2,
                  }}>{item.title}</p>
                  <p style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 300,
                    fontSize: "15px",
                    lineHeight: 1.75,
                    color: "rgba(20,18,16,0.55)",
                    margin: 0,
                  }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Book a call ───────────────────────────────────────── */}
      <section id="book" className="ef-section-book" style={{ padding: "0 0 140px" }}>
        <div className="ef-section-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}>

          {/* Header — naked on gradient */}
          <div style={{ textAlign: "center" as const, maxWidth: "600px", margin: "0 auto 64px" }}>
            {label("Get started")}
            <h2 className="ef-book-h2" style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "56px",
              letterSpacing: "-0.02em",
              color: INK,
              lineHeight: 1.05,
              margin: "0 0 24px",
            }}>Book a discovery call.</h2>
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "18px",
              color: STONE,
              margin: "0 0 32px",
              lineHeight: 1.6,
            }}>30 minutes. No deck. No pitch. Just a conversation about your brand and whether we're a fit.</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px", alignItems: "center" }}>
              {[
                "We'll audit your current email setup",
                "Estimate the revenue you're leaving on the table",
                "Tell you exactly what we'd build first",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: ACCENT, fontFamily: "var(--font-dm-mono)", fontSize: "11px" }}>→</span>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "15px", color: "rgba(20,18,16,0.6)", margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "12px", marginBottom: "48px" }}>
            <a
              href="https://cal.com/evenflow/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="ef-book-cta"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: ACCENT,
                background: INK,
                padding: "20px 56px",
                borderRadius: "4px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book now — it's free
            </a>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "13px", color: "rgba(20,18,16,0.35)" }}>
              Opens in a new tab · cal.com/evenflow
            </span>
          </div>

          {/* Cal embed in its own frosted card */}
          <div className="ef-cal-card" style={{
            background: GLASS,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${BORDER}`,
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: "900px",
            margin: "0 auto",
          }}>
            <Cal
              namespace="30min"
              calLink="evenflow/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "light" }}
            />
          </div>
        </div>
      </section>

      {/* ── 5. Footer ────────────────────────────────────────────── */}
      <footer className="ef-footer" style={{ background: INK, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="ef-footer-top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg width="72" height="28" viewBox="-4 -12 128 64" fill="none">
                <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke="#FAFAF7" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
                <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke="#09D9A0" strokeWidth="1.4" fill="none" opacity="0.85" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "var(--font-clash)", fontWeight: 600, fontSize: "16px", letterSpacing: "-0.03em", color: "#FAFAF7" }}>
                Even <span style={{ color: ACCENT }}>Flow</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              {[
                { href: "https://instagram.com/evenflow.agency", label: "Instagram", icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                )},
                { href: "https://linkedin.com/company/evenflow-agency", label: "LinkedIn", icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                )},
                { href: "https://x.com/evenflowagency", label: "X", icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )},
              ].map(({ href, label: lbl, icon }) => (
                <a key={lbl} href={href} target="_blank" rel="noopener noreferrer" aria-label={lbl}
                  style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >{icon}</a>
              ))}
            </div>
          </div>
          <div className="ef-footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "12px" }}>
            <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)", margin: 0 }}>
              © 2026 Even Flow · evenflow.agency · Gold Coast, AU
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              {[["How it works", "#how"], ["Book a call", "#book"]].map(([lbl, href]) => (
                <a key={lbl} href={href}
                  style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
                >{lbl}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
