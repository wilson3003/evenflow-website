"use client";
/**
 * DESIGN A — Free Interpretation
 * No brand constraints. Dark editorial luxury. Awwwards-tier.
 * Fonts: Fraunces (serif display) + DM Sans + DM Mono
 * Palette: deep espresso #0E0A07, warm cream #F5F0E8, electric teal #00E5B4, stone #9A8F84
 * Layout: asymmetric split, Z-axis depth, heavy whitespace
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const C = {
  bg: "#0E0A07",
  cream: "#F5F0E8",
  teal: "#00E5B4",
  stone: "#6B6258",
  border: "rgba(245,240,232,0.08)",
  muted: "rgba(245,240,232,0.4)",
};

const steps = [
  { n: "01", title: "The audit.", body: "30 minutes. We look at what your email is actually earning — and what it's leaving on the table. Free. No deck. No pitch." },
  { n: "02", title: "The interview.", body: "One 60-minute session. You talk, our AI listens. Your brand voice, customer intelligence, and content strategy — built in real time as you speak." },
  { n: "03", title: "The strategy.", body: "We build your Brand Intelligence File and email architecture. You approve every word before we write a single campaign." },
  { n: "04", title: "The execution.", body: "Flows live. Campaigns going out. Real-time dashboard. Weekly optimisation. We stay until it works." },
];

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) setHovered(true);
    };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, []);

  return (
    <motion.div
      animate={{ x: pos.x - (hovered ? 20 : 8), y: pos.y - (hovered ? 20 : 8), scale: hovered ? 1 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
        width: hovered ? 40 : 16, height: hovered ? 40 : 16,
        borderRadius: "50%",
        background: hovered ? "transparent" : C.teal,
        border: hovered ? `1.5px solid ${C.teal}` : "none",
        mixBlendMode: "difference",
        transition: "width 0.2s, height 0.2s, background 0.2s",
      }}
    />
  );
}

function Marquee() {
  const items = ["Email Marketing", "Brand Voice", "Klaviyo", "AI-Native", "Done For You", "Gold Coast"];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "14px 0", background: "transparent" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "64px", whiteSpace: "nowrap" as const, width: "max-content" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: i % 2 === 0 ? C.muted : C.teal }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function DesignA() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <div style={{ background: C.bg, color: C.cream, minHeight: "100vh", cursor: "none" }}>
      <Cursor />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `linear-gradient(to bottom, ${C.bg}, transparent)` }}>
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: "13px", letterSpacing: "0.08em", color: C.cream }}>
          Even <span style={{ color: C.teal }}>Flow</span>
        </span>
        <a href="#book" style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.bg, background: C.teal, padding: "10px 24px", borderRadius: "2px", textDecoration: "none" }}>
          Book a call
        </a>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={{ minHeight: "100dvh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 48px" }}>

        {/* Background number */}
        <motion.div style={{ y, opacity, position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", fontFamily: "DM Mono, monospace", fontSize: "clamp(200px,28vw,420px)", fontWeight: 400, color: "rgba(245,240,232,0.025)", lineHeight: 1, userSelect: "none" as const, pointerEvents: "none" }}>
          01
        </motion.div>

        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", paddingTop: "120px", paddingBottom: "80px" }}>

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,229,180,0.08)", border: `1px solid rgba(0,229,180,0.2)`, borderRadius: "2px", padding: "6px 14px", marginBottom: "48px" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.teal }}>AI-native · Boutique · Gold Coast</span>
          </motion.div>

          {/* Main headline — asymmetric, left-heavy */}
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            style={{ margin: "0 0 40px", lineHeight: 0.92 }}>
            <span style={{ display: "block", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(56px,9vw,120px)", color: C.cream, letterSpacing: "-0.03em" }}>
              Your emails.
            </span>
            <span style={{ display: "block", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(56px,9vw,120px)", color: C.cream, letterSpacing: "-0.03em" }}>
              Your voice.
            </span>
            <span style={{ display: "block", fontFamily: "DM Mono, monospace", fontWeight: 400, fontSize: "clamp(56px,9vw,120px)", color: C.teal, letterSpacing: "-0.04em", lineHeight: 1 }}>
              Handled_
            </span>
          </motion.h1>

          {/* Split: sub-copy left, CTA right */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "80px", alignItems: "end", maxWidth: "800px" }}>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "18px", lineHeight: 1.7, color: C.muted, margin: 0 }}>
              One conversation with us. Your entire email programme — built in your voice, running in Klaviyo, optimised every week. We handle it all.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
              <a href="#book" style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.bg, background: C.cream, padding: "18px 40px", borderRadius: "2px", textDecoration: "none", display: "block", transition: "background 0.2s" }}>
                Book a discovery call
              </a>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", color: C.stone }}>30 min · free · no pitch</span>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 1, height: 64, background: `linear-gradient(to bottom, ${C.teal}, transparent)` }} />
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Stats */}
      <section style={{ padding: "120px 48px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: C.border }}>
          {[
            { n: "5–15%", l: "Abandoned cart recovery" },
            { n: "7 days", l: "From interview to live" },
            { n: "30–40%", l: "Revenue from email at 90 days" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
              style={{ background: C.bg, padding: "64px 48px" }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontWeight: 400, fontSize: "clamp(40px,5vw,72px)", letterSpacing: "-0.04em", color: C.teal, margin: "0 0 12px", lineHeight: 1 }}>{s.n}</p>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.stone, margin: 0 }}>{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "160px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "120px", alignItems: "start" }}>

            {/* Sticky label */}
            <div style={{ position: "sticky" as const, top: "120px" }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.teal, marginBottom: "24px" }}>The process</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px,5vw,64px)", letterSpacing: "-0.02em", color: C.cream, lineHeight: 1.05, margin: 0 }}>
                One interview.<br />Everything else<br />is handled.
              </h2>
            </div>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
              {steps.map((step, i) => (
                <motion.div key={step.n} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => setOpenStep(openStep === i ? null : i)}
                  style={{ borderTop: `1px solid ${C.border}`, padding: "40px 0", cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", color: C.teal, paddingTop: "4px", flexShrink: 0, width: "24px" }}>{step.n}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: openStep === i ? "20px" : 0 }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(24px,3vw,40px)", letterSpacing: "-0.02em", color: C.cream, margin: 0, lineHeight: 1.1 }}>{step.title}</h3>
                        <span style={{ fontFamily: "DM Mono, monospace", fontSize: "18px", color: C.teal, marginLeft: "24px", flexShrink: 0 }}>{openStep === i ? "−" : "+"}</span>
                      </div>
                      {openStep === i && (
                        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                          style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "16px", lineHeight: 1.8, color: C.muted, margin: 0 }}>
                          {step.body}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div style={{ borderTop: `1px solid ${C.border}` }} />
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" style={{ padding: "160px 48px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.teal, marginBottom: "24px" }}>Get started</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px,5vw,72px)", letterSpacing: "-0.02em", color: C.cream, lineHeight: 1.05, margin: "0 0 32px" }}>
              Book a<br />discovery call.
            </h2>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "17px", lineHeight: 1.75, color: C.muted, margin: "0 0 48px" }}>
              30 minutes. We audit your email, estimate the revenue gap, and tell you what we'd build first — whether you work with us or not.
            </p>
            <a href="https://cal.com/evenflow/30min" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.bg, background: C.teal, padding: "20px 48px", borderRadius: "2px", textDecoration: "none", display: "inline-block" }}>
              Book now — it's free
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
            {["We'll audit your current email setup", "Estimate the revenue you're leaving behind", "Tell you exactly what we'd build first", "No commitment required"].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ display: "flex", alignItems: "center", gap: "16px", padding: "24px 32px", border: `1px solid ${C.border}`, borderRadius: "4px" }}>
                <span style={{ color: C.teal, fontFamily: "DM Mono, monospace", fontSize: "12px", flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "15px", color: C.muted }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "16px" }}>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: "13px", color: C.cream }}>Even <span style={{ color: C.teal }}>Flow</span></span>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {[["Instagram", "https://instagram.com/evenflow.agency"], ["LinkedIn", "https://linkedin.com/company/evenflow-agency"], ["X", "https://x.com/evenflowagency"]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.stone, textDecoration: "none" }}>{label}</a>
            ))}
          </div>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: "10px", color: C.stone }}>© 2026 Even Flow · evenflow.agency</span>
        </div>
      </footer>
    </div>
  );
}
