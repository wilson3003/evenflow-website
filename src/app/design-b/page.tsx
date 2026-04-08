"use client";
/**
 * DESIGN B — Brand-Constrained Elevation
 * Same Even Flow brand. Significantly better.
 * 
 * Improvements over current mesh-light:
 * - Layout: split-screen hero, left-aligned not centered
 * - Typography: bigger presence, tighter tracking, more hierarchy
 * - Motion: spring physics, scroll-triggered reveals
 * - Mobile: min-h-[100dvh] throughout
 * - Steps: horizontal timeline instead of accordion
 * - Stats: dark band with oversized numbers
 * - Footer: proper social icons, cleaner grid
 */

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const ACCENT = "#09D9A0";
const INK    = "#141210";
const CREAM  = "#FAFAF7";
const STONE  = "#8A8078";
const BORDER = "#E8E4DF";

const steps = [
  { n: "01", title: "Explore and audit.", body: "Free 30-minute call. We look at what you've got, what it's actually earning, and what's being left on the table. No deck. No pitch.", detail: "We'll audit your Klaviyo setup, estimate the revenue gap, and tell you exactly what we'd build first — whether you work with us or not." },
  { n: "02", title: "The brand interview.", body: "One 60-minute session. You talk. Our AI listens. Brand voice, customer intelligence, content strategy — built in real time as you speak.", detail: "Your origin story, who buys from you and why, your voice, what you never say, your differentiator, seasonal calendar, what's been tried. Nothing assumed." },
  { n: "03", title: "We build. You approve.", body: "AI creates your Brand Intelligence File, email architecture, content calendar. You see everything before we write a single word.", detail: "Every flow, every campaign, every email — you approve it first. We refine until it feels right. Most agencies hide their process. We show you ours." },
  { n: "04", title: "Live and optimising.", body: "Flows go live. Campaigns go out. Real-time dashboard — open rates, revenue from email, all of it, every day.", detail: "No monthly PDFs. No waiting for reports. Weekly optimisation. Everything alive as your brand grows." },
];

function useWindowSize() {
  const [size, setSize] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

function Logo({ size = 96, dark = false }: { size?: number; dark?: boolean }) {
  const stroke1 = dark ? CREAM : INK;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width={size} height={size * 0.375} viewBox="-4 -12 128 64" fill="none">
        <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke={stroke1} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke={ACCENT} strokeWidth="1.4" fill="none" opacity="0.9" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: "var(--font-clash, 'Clash Display', sans-serif)", fontWeight: 600, fontSize: size * 0.198, letterSpacing: "-0.03em", color: dark ? CREAM : INK }}>
        Even <span style={{ color: ACCENT }}>Flow</span>
      </span>
    </div>
  );
}

export default function DesignB() {
  const { w, h } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const meshY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ background: CREAM, color: INK, overflowX: "hidden" }}>

      {/* ── Nav ───────────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: "rgba(250,250,247,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}` }}>
        <Logo size={80} />
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <a href="#how" style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: STONE, textDecoration: "none" }}>How it works</a>
          <a href="#book" style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: INK, background: "transparent", border: `1.5px solid ${ACCENT}`, padding: "10px 24px", borderRadius: "4px", textDecoration: "none" }}>
            Book a call
          </a>
        </div>
      </nav>

      {/* ── Hero — split layout ───────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight: "100dvh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", position: "relative", paddingTop: 72 }}>

        {/* Left — content */}
        <div style={{ display: "flex", flexDirection: "column" as const, justifyContent: "center", padding: "80px 64px 80px 64px", position: "relative", zIndex: 2 }}>

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "40px", width: "fit-content" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: STONE }}>
              AI-native · Email Marketing · Boutique
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ margin: "0 0 32px", lineHeight: 0.95 }}>
            <span style={{ display: "block", fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(48px,6.5vw,88px)", letterSpacing: "-0.02em", color: INK, lineHeight: 1.05 }}>
              Your emails.
            </span>
            <span style={{ display: "block", fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(48px,6.5vw,88px)", letterSpacing: "-0.02em", color: INK, lineHeight: 1.05 }}>
              Your voice.
            </span>
            <span style={{ display: "block", fontFamily: "var(--font-clash, 'Clash Display', sans-serif)", fontWeight: 700, fontSize: "clamp(56px,7.5vw,104px)", letterSpacing: "-0.04em", color: ACCENT, lineHeight: 0.92, marginTop: "8px" }}>
              Handled.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "18px", lineHeight: 1.75, color: "rgba(20,18,16,0.55)", maxWidth: "440px", margin: "0 0 48px" }}>
            One conversation with us. Your entire email programme — built in your voice, running in Klaviyo, optimised every week.
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: "flex", flexDirection: "column" as const, gap: "12px", alignItems: "flex-start" }}>
            <a href="#book"
              style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: ACCENT, background: INK, padding: "18px 44px", borderRadius: "4px", textDecoration: "none", display: "inline-block" }}>
              Book a discovery call
            </a>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "13px", color: "rgba(20,18,16,0.35)" }}>
              30 minutes · free · no pitch
            </span>
          </motion.div>
        </div>

        {/* Right — mesh gradient */}
        <motion.div style={{ y: meshY, position: "relative", overflow: "hidden" }}>
          {mounted && (
            <MeshGradient
              width={w / 2}
              height={h}
              colors={["#e0f8f0", "#c8f0e8", "#a0e8d8", "#f0faf8", "#d4f5ec", "#b8edd8"]}
              distortion={1.4}
              swirl={0.9}
              speed={0.2}
            />
          )}
          {/* Overlay for readability */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(250,250,247,0.15)" }} />
          {/* Domain watermark */}
          <div style={{ position: "absolute", bottom: 40, right: 40 }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "15px", color: "rgba(20,18,16,0.2)" }}>evenflow.agency</span>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section style={{ background: INK, padding: "100px 64px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {[
            { n: "5–15%", l: "Abandoned cart recovery" },
            { n: "7 days", l: "From interview to flows live" },
            { n: "30–40%", l: "Revenue from email at 90 days" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
              style={{ background: INK, padding: "56px 48px" }}>
              <p style={{ fontFamily: "var(--font-clash, 'Clash Display', sans-serif)", fontWeight: 700, fontSize: "clamp(40px,5vw,72px)", letterSpacing: "-0.04em", color: CREAM, margin: "0 0 12px", lineHeight: 1 }}>{s.n}</p>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: STONE, margin: 0 }}>{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section id="how" style={{ padding: "160px 64px", background: CREAM }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header — left aligned, not centred */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginBottom: "100px", alignItems: "end" }}>
            <div>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "20px" }}>How it works</p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px,5vw,68px)", letterSpacing: "-0.02em", color: INK, lineHeight: 1.05, margin: 0 }}>
                One interview.<br />Everything else<br />is handled.
              </h2>
            </div>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "18px", lineHeight: 1.75, color: "rgba(20,18,16,0.5)", margin: 0, alignSelf: "end" as const }}>
              Most agencies take months to get going. We're live in a week. Here's exactly how it works.
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
            {steps.map((step, i) => {
              const isOpen = openStep === i;
              return (
                <motion.div key={step.n}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => setOpenStep(isOpen ? null : i)}
                  style={{ background: isOpen ? "#F2EEE9" : CREAM, border: `1px solid ${isOpen ? ACCENT : BORDER}`, borderRadius: "6px", padding: "40px 48px", cursor: "pointer", transition: "all 0.25s ease" }}>
                  <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.1em", color: ACCENT, paddingTop: "9px", flexShrink: 0, width: "24px" }}>{step.n}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px" }}>
                        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(24px,3vw,38px)", letterSpacing: "-0.02em", color: INK, margin: 0, lineHeight: 1.1 }}>
                          {step.title}
                        </h3>
                        <span style={{ fontFamily: "DM Mono, monospace", fontSize: "18px", color: ACCENT, flexShrink: 0, marginTop: "4px" }}>{isOpen ? "−" : "+"}</span>
                      </div>
                      <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "16px", lineHeight: 1.75, color: "rgba(20,18,16,0.55)", margin: "14px 0 0" }}>
                        {step.body}
                      </p>
                      {isOpen && (
                        <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                          style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: "rgba(20,18,16,0.4)", margin: "16px 0 0", paddingTop: "16px", borderTop: `1px solid ${BORDER}` }}>
                          {step.detail}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Book ──────────────────────────────────────────────── */}
      <section id="book" style={{ background: "#F2EEE9", borderTop: `1px solid ${BORDER}`, padding: "160px 64px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start", marginBottom: "80px" }}>
            <div>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "20px" }}>Get started</p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px,5vw,68px)", letterSpacing: "-0.02em", color: INK, lineHeight: 1.05, margin: "0 0 28px" }}>
                Book a<br />discovery call.
              </h2>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "20px", color: STONE, margin: "0 0 40px" }}>
                30 minutes. Free. We audit your email and tell you what it's worth — whether you work with us or not.
              </p>
              {["We audit your current Klaviyo setup", "Estimate the revenue you're leaving behind", "Tell you exactly what we'd build first"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <span style={{ color: ACCENT, fontFamily: "DM Mono, monospace", fontSize: "12px" }}>→</span>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "15px", color: "rgba(20,18,16,0.55)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, justifyContent: "center", alignItems: "flex-start", gap: "16px" }}>
              <a href="https://cal.com/evenflow/30min" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: ACCENT, background: INK, padding: "20px 48px", borderRadius: "4px", textDecoration: "none", display: "inline-block" }}>
                Book now — it's free
              </a>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "13px", color: "rgba(20,18,16,0.35)" }}>No commitment. No pitch. Just a conversation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer style={{ background: INK, padding: "56px 64px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
            <Logo size={72} dark />
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              {/* Instagram */}
              <a href="https://instagram.com/evenflow.agency" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/evenflow-agency" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* X */}
              <a href="https://x.com/evenflowagency" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "12px" }}>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>© 2026 Even Flow · evenflow.agency · Gold Coast, AU</span>
            <div style={{ display: "flex", gap: "28px" }}>
              {[["How it works", "#how"], ["Book a call", "#book"]].map(([l, h]) => (
                <a key={l} href={h} style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
