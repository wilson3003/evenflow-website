"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"

// ── Palette ──────────────────────────────────────────────────────────
const ESPRESSO   = "#0C0A08"
const ESPRESSO_L = "#151210"
const WARM       = "#F5E6D3"
const GOLD       = "#C8956C"
const STONE_D    = "#3A332C"
const STONE_M    = "#6B5E52"
const BORDER_D   = "rgba(255,255,255,0.06)"

// ── Spring config ────────────────────────────────────────────────────
const SPRING = { stiffness: 120, damping: 22, mass: 0.8 }
const EASE_OUT = [0.32, 0.72, 0, 1] as const

// ── Data ─────────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Explore & audit", body: "A free 30-minute call. We look at what you've got, what it's actually earning, and what's being left on the table." },
  { num: "02", title: "The brand interview", body: "One 60-minute session. You talk. We listen. Our AI builds your brand voice, customer intelligence, and content strategy — as you speak." },
  { num: "03", title: "Strategy & approval", body: "AI creates your complete brief — Brand Intelligence File, email architecture, content calendar. Nothing goes out until you've said yes." },
  { num: "04", title: "Execution & dashboard", body: "Flows go live. Campaigns go out. Your personal dashboard shows exactly what's sending, what's working, and what's coming next." },
]

const STATS = [
  { value: "5–15%", label: "Abandoned cart recovery" },
  { value: "7 days", label: "Interview to flows live" },
  { value: "30–40%", label: "Revenue from email in 90 days" },
]

// ── Reveal wrapper ───────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

// ── Logo SVG ─────────────────────────────────────────────────────────
function Logo({ light = false, size = 1 }: { light?: boolean; size?: number }) {
  const primary = light ? "#FAFAF7" : WARM
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * size }}>
      <svg width={80 * size} height={30 * size} viewBox="-4 -12 128 64" fill="none">
        <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke={primary} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke={GOLD} strokeWidth="1.4" fill="none" opacity="0.85" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 600, fontSize: 17 * size, letterSpacing: "-0.03em", color: primary }}>
        Even <span style={{ color: GOLD }}>Flow</span>
      </span>
    </div>
  )
}

// ── Grain overlay (fixed, pointer-events-none) ───────────────────────
function Grain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 50,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.03,
        mixBlendMode: "overlay" as const,
      }}
    />
  )
}

// ── Horizontal rule ──────────────────────────────────────────────────
function Rule() {
  return <div style={{ width: "100%", height: 1, background: BORDER_D }} />
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
export default function Option1() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 })
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 0.96])

  // Scroll progress bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} style={{ background: ESPRESSO, color: WARM, minHeight: "100dvh" }}>
      <Grain />

      {/* ── Progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left"
        style={{ scaleX, background: GOLD, zIndex: 40 }}
      />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* NAV                                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-30" style={{ background: "rgba(12,10,8,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <div className="flex items-center justify-between h-[72px]" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
          <Logo light size={0.9} />
          <motion.a
            href="https://cal.com/evenflow/30min"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", ...SPRING }}
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: ESPRESSO,
              background: GOLD,
              padding: "12px 28px",
              borderRadius: 4,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Book a call
          </motion.a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <motion.section
        className="relative flex items-end min-h-[100dvh]"
        style={{ opacity: heroOpacity, scale: heroScale, padding: "0 48px 80px" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end" }}>
            {/* Left — massive headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
                style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 32 }}
              >
                AI-native email marketing
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: EASE_OUT }}
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(56px, 7vw, 108px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: WARM, margin: 0 }}
              >
                Your emails.<br />Your voice.<br />
                <span style={{ color: GOLD }}>Handled.</span>
              </motion.h1>
            </div>

            {/* Right — sub + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE_OUT }}
              style={{ maxWidth: 420 }}
            >
              <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: STONE_M, marginBottom: 40 }}>
                One conversation. Your entire email programme — built, scheduled, and selling. Boutique Klaviyo specialists for ecommerce brands who give a damn about their voice.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <motion.a
                  href="https://cal.com/evenflow/30min"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", ...SPRING }}
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: ESPRESSO,
                    background: WARM,
                    padding: "18px 40px",
                    borderRadius: 4,
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Book a discovery call
                </motion.a>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 13, color: STONE_D }}>
                  30 min · free · no pitch
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: BORDER_D }} />
      </motion.section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="how" style={{ padding: "140px 48px", borderBottom: `1px solid ${BORDER_D}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
              How it works
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: WARM, margin: "0 0 16px", maxWidth: 700 }}>
              One interview.<br />Everything else is handled.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: STONE_M, maxWidth: 480, marginBottom: 80 }}>
              Most agencies take months to get started. We&apos;re live in a week.
            </p>
          </Reveal>

          {/* Steps — asymmetric 2-col grid */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={0.1 * i}>
                <motion.div
                  whileHover={{ backgroundColor: ESPRESSO_L }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  style={{
                    background: "transparent",
                    border: `1px solid ${BORDER_D}`,
                    borderRadius: 8,
                    padding: "48px 40px",
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.1em", color: GOLD }}>{step.num}</span>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: 32, letterSpacing: "-0.02em", color: WARM, margin: "20px 0 16px", lineHeight: 1.1 }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: STONE_M, margin: 0 }}>
                    {step.body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* STATS                                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 48px", borderBottom: `1px solid ${BORDER_D}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {STATS.map((s, i) => (
              <Reveal key={s.value} delay={0.12 * i}>
                <div style={{ padding: "0 40px", borderLeft: i > 0 ? `1px solid ${BORDER_D}` : "none" }}>
                  <p style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700, fontSize: "clamp(48px, 5vw, 72px)", letterSpacing: "-0.04em", color: WARM, margin: "0 0 12px", lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: STONE_D, margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BOOKING                                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="book" style={{ padding: "140px 48px", borderBottom: `1px solid ${BORDER_D}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* Left */}
            <div>
              <Reveal>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
                  Get started
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px, 4.5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: WARM, margin: "0 0 24px" }}>
                  Book a<br />discovery call.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: STONE_M, maxWidth: 420, marginBottom: 48 }}>
                  30 minutes. No deck. No pitch. Just a conversation about your brand and whether we&apos;re a fit.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {["We'll audit your current email setup", "Estimate the revenue you're leaving behind", "Tell you exactly what we'd build first"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: GOLD }}>→</span>
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, color: STONE_M }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — CTA card */}
            <Reveal delay={0.2}>
              <div style={{ background: ESPRESSO_L, border: `1px solid ${BORDER_D}`, borderRadius: 16, padding: 64, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: `1px solid ${BORDER_D}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: 36, color: WARM, margin: "0 0 12px", lineHeight: 1.1 }}>
                  30 minutes with us
                </h3>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, color: STONE_M, marginBottom: 40, lineHeight: 1.7 }}>
                  Free. No obligations. You&apos;ll leave knowing exactly what your email channel is worth.
                </p>
                <motion.a
                  href="https://cal.com/evenflow/30min"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", ...SPRING }}
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: ESPRESSO,
                    background: WARM,
                    padding: "18px 48px",
                    borderRadius: 4,
                    textDecoration: "none",
                    display: "inline-block",
                    marginBottom: 12,
                  }}
                >
                  Book a discovery call
                </motion.a>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 13, color: STONE_D }}>
                  cal.com/evenflow/30min
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "48px", background: ESPRESSO }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <Logo light size={0.85} />
            <div style={{ display: "flex", gap: 24 }}>
              {[["How it works", "#how"], ["Book a call", "#book"]].map(([label, href]) => (
                <a key={label} href={href} style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: STONE_D, textDecoration: "none" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <Rule />
          <div style={{ paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: STONE_D, margin: 0 }}>
              &copy; 2026 Even Flow &middot; Gold Coast, AU
            </p>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 14, color: STONE_D, margin: 0 }}>
              evenflow.agency
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
