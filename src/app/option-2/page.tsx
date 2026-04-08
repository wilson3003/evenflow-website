"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

// ── Brand palette ────────────────────────────────────────────────────
const ACCENT = "#09D9A0"
const INK    = "#141210"
const CREAM  = "#FAFAF7"
const STONE  = "#8A8078"
const BORDER = "#E8E4DF"
const WARM_BG = "#F2EEE9"

// ── Spring config ────────────────────────────────────────────────────
const SPRING = { type: "spring" as const, stiffness: 140, damping: 20, mass: 0.7 }
const EASE_OUT = [0.32, 0.72, 0, 1] as const

// ── Data ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Explore & audit",
    body: "A free 30-minute call. We look at what you've got, what it's actually earning, and what's being left on the table. No deck. No pitch. Just an honest look at your email channel.",
    detail: "We'll audit your current Klaviyo setup (or lack of one), estimate the revenue gap, and tell you exactly what we'd build first. You leave knowing what your email is worth — whether you work with us or not.",
  },
  {
    num: "02",
    title: "The brand interview",
    body: "One 60-minute onboarding session. You talk. We listen. Our AI reads every word in real time — building your brand voice, your customer intelligence, your content strategy — as you speak.",
    detail: "We cover: your origin story, who buys from you and why, what your voice sounds like, what you never say, your product's real differentiator, your seasonal calendar, and what's been tried before.",
  },
  {
    num: "03",
    title: "Strategy & approval",
    body: "AI creates your complete brief — Brand Intelligence File, email architecture, content calendar. We share it with you before we write a single word. Nothing goes out until you've said yes.",
    detail: "Every flow, every campaign, every email — you see it first. We refine anything that doesn't feel right. Most agencies hide behind their process. We show you ours.",
  },
  {
    num: "04",
    title: "Execution & dashboard",
    body: "Flows go live. Campaigns go out. Your personal dashboard shows exactly what's sending, what's working, and what's coming next — open rates, revenue from email, all of it, every day.",
    detail: "No monthly PDFs. No waiting for reports. We review performance weekly, optimise continuously, and keep everything alive as your brand grows.",
  },
]

const STATS = [
  { value: "5–15%", label: "Abandoned cart recovery" },
  { value: "7 days", label: "Interview to flows live" },
  { value: "30–40%", label: "Revenue from email in 90 days" },
]

// ── Reveal wrapper ───────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

// ── Logo ─────────────────────────────────────────────────────────────
function Logo({ dark = false, size = 1 }: { dark?: boolean; size?: number }) {
  const primary = dark ? "#FAFAF7" : INK
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * size }}>
      <svg width={80 * size} height={30 * size} viewBox="-4 -12 128 64" fill="none">
        <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke={primary} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke={ACCENT} strokeWidth="1.4" fill="none" opacity="0.85" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 600, fontSize: 17 * size, letterSpacing: "-0.03em", color: primary }}>
        Even <span style={{ color: ACCENT }}>Flow</span>
      </span>
    </div>
  )
}

// ── Accordion step ───────────────────────────────────────────────────
function AccordionStep({ step, isOpen, onToggle, index }: { step: typeof STEPS[0]; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        onClick={onToggle}
        layout
        transition={SPRING}
        style={{
          background: isOpen ? WARM_BG : CREAM,
          border: `1px solid ${isOpen ? ACCENT : BORDER}`,
          borderRadius: 12,
          padding: "36px 48px",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
          <motion.span
            animate={{ color: isOpen ? ACCENT : STONE }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.1em", paddingTop: 8, flexShrink: 0, width: 28 }}
          >
            {step.num}
          </motion.span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: 32, letterSpacing: "-0.02em", color: INK, margin: 0, lineHeight: 1.1 }}>
                {step.title}
              </h3>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={SPRING}
                style={{ fontFamily: "DM Mono, monospace", fontSize: 20, color: ACCENT, marginLeft: 24, flexShrink: 0, display: "inline-block" }}
              >
                +
              </motion.span>
            </div>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(0,0,0,0.5)", margin: "12px 0 0" }}>
              {step.body}
            </p>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.75, color: "rgba(0,0,0,0.35)", margin: "16px 0 0", paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
                    {step.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

// ── Animated mesh gradient (CSS only) ────────────────────────────────
function MeshVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 560, borderRadius: 24, overflow: "hidden", background: INK }}>
      {/* Animated orbs */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 20% 30%, ${ACCENT}44, transparent),
          radial-gradient(ellipse 50% 60% at 80% 70%, #09D9A022, transparent),
          radial-gradient(ellipse 70% 40% at 50% 50%, ${ACCENT}18, transparent)
        `,
        animation: "meshMove 8s ease-in-out infinite alternate",
      }} />
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06, mixBlendMode: "overlay" as const,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      {/* Centre wordmark */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <svg width={120} height={45} viewBox="-4 -12 128 64" fill="none">
          <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke="rgba(250,250,247,0.6)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke={ACCENT} strokeWidth="1.4" fill="none" opacity="0.7" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,250,247,0.35)" }}>
          Klaviyo specialists
        </span>
      </div>
      {/* Inject keyframes */}
      <style>{`
        @keyframes meshMove {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1.15) rotate(3deg); }
        }
      `}</style>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
export default function Option2() {
  const [openStep, setOpenStep] = useState<number | null>(null)

  return (
    <div style={{ background: CREAM, color: INK, minHeight: "100dvh" }}>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* NAV                                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(250,250,247,0.9)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Logo size={0.9} />
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#how" style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: STONE, textDecoration: "none" }}>
              How it works
            </a>
            <motion.a
              href="https://cal.com/evenflow/30min"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: CREAM,
                background: INK,
                padding: "12px 24px",
                borderRadius: 4,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book a call
            </motion.a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO — Split screen                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "calc(100dvh - 72px)", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 48px", width: "100%" }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            {/* Left — content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
                style={{
                  display: "inline-block",
                  fontFamily: "DM Mono, monospace",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  background: `${ACCENT}12`,
                  border: `1px solid ${ACCENT}30`,
                  borderRadius: 100,
                  padding: "8px 20px",
                  marginBottom: 32,
                }}
              >
                AI-native email marketing
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(48px, 5.5vw, 88px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: INK, margin: "0 0 8px" }}
              >
                Your emails.<br />Your voice.
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
                style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700, fontSize: "clamp(48px, 5.5vw, 88px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: ACCENT, margin: "0 0 32px" }}
              >
                Handled.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
                style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: "rgba(0,0,0,0.5)", maxWidth: 440, marginBottom: 40 }}
              >
                Boutique Klaviyo specialists for ecommerce brands who give a damn about their voice. One conversation — your entire email programme built, scheduled, and selling.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
                style={{ display: "flex", alignItems: "center", gap: 20 }}
              >
                <motion.a
                  href="https://cal.com/evenflow/30min"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: CREAM,
                    background: INK,
                    padding: "18px 40px",
                    borderRadius: 4,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  Book a discovery call
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round">
                      <path d="M1 9L9 1M9 1H3M9 1v6" />
                    </svg>
                  </span>
                </motion.a>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 13, color: STONE }}>
                  30 min &middot; free &middot; no pitch
                </span>
              </motion.div>
            </div>

            {/* Right — mesh gradient visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            >
              <MeshVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="how" style={{ background: CREAM, borderTop: `1px solid ${BORDER}`, padding: "140px 0 160px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          {/* Header — left aligned */}
          <Reveal>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
              How it works
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px, 4.5vw, 64px)", letterSpacing: "-0.02em", color: INK, lineHeight: 1.05, margin: "0 0 16px", maxWidth: 600 }}>
              One interview.<br />Everything else is handled.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: 22, color: STONE, maxWidth: 480, margin: "0 0 80px" }}>
              Most agencies take months to get started. We&apos;re live in a week.
            </p>
          </Reveal>

          {/* Accordion steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 80 }}>
            {STEPS.map((step, i) => (
              <AccordionStep
                key={step.num}
                step={step}
                index={i}
                isOpen={openStep === i}
                onToggle={() => setOpenStep(openStep === i ? null : i)}
              />
            ))}
          </div>

          {/* Stats */}
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: BORDER, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden" }}>
              {STATS.map((s) => (
                <div key={s.value} style={{ background: CREAM, padding: "44px 40px" }}>
                  <p style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 3.5vw, 52px)", letterSpacing: "-0.04em", color: INK, margin: "0 0 8px", lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.08em", color: STONE, margin: 0, textTransform: "uppercase" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BOOKING                                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="book" style={{ background: WARM_BG, borderTop: `1px solid ${BORDER}`, padding: "140px 0 160px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* Left */}
            <div>
              <Reveal>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
                  Get started
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.02em", color: INK, lineHeight: 1.05, margin: "0 0 24px" }}>
                  Book a discovery call.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: "rgba(0,0,0,0.5)", marginBottom: 40 }}>
                  30 minutes. No deck. No pitch. Just a conversation about your brand and whether we&apos;re a fit.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {["We'll audit your current email setup", "Estimate the revenue you're leaving behind", "Tell you exactly what we'd build first"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: ACCENT, fontFamily: "DM Mono, monospace", fontSize: 12 }}>&#8594;</span>
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(0,0,0,0.5)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — booking card */}
            <Reveal delay={0.15}>
              <div style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 56, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: 32, color: INK, margin: "0 0 12px", lineHeight: 1.1 }}>
                  30 minutes with us
                </h3>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, color: STONE, marginBottom: 36, lineHeight: 1.7 }}>
                  Free. No obligations. You&apos;ll leave knowing exactly what your email channel is worth.
                </p>
                <motion.a
                  href="https://cal.com/evenflow/30min"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: CREAM,
                    background: INK,
                    padding: "18px 48px",
                    borderRadius: 4,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  Book a discovery call
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round">
                      <path d="M1 9L9 1M9 1H3M9 1v6" />
                    </svg>
                  </span>
                </motion.a>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: STONE, margin: 0 }}>
                  cal.com/evenflow/30min
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#0D0F0D", borderTop: "1px solid rgba(255,255,255,0.06)", padding: 48 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <Logo dark size={0.85} />
            {/* Social icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* Instagram */}
              <a href="https://instagram.com/evenflow.agency" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/evenflow-agency" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* X */}
              <a href="https://x.com/evenflowagency" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)", margin: 0 }}>
              &copy; 2026 Even Flow &middot; evenflow.agency &middot; Gold Coast, AU
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {[["How it works", "#how"], ["Book a call", "#book"]].map(([label, href]) => (
                <a key={label} href={href} style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)", textDecoration: "none", textTransform: "uppercase" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
