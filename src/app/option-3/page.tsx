"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

// ── Brand palette ────────────────────────────────────────────────────
const ACCENT = "#09D9A0"
const INK    = "#141210"
const CREAM  = "#FAFAF7"
const STONE  = "#8A8078"
const BORDER = "#E8E4DF"

// ── Spring / ease ────────────────────────────────────────────────────
const SPRING = { type: "spring" as const, stiffness: 100, damping: 22 }
const EASE_OUT = [0.32, 0.72, 0, 1] as const

// ── Data ─────────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Explore & audit", body: "A free 30-minute call. We look at what you've got, what it's earning, and what's being left on the table." },
  { num: "02", title: "The brand interview", body: "One session. You talk. We listen. Our AI builds your brand voice, customer intelligence, and content strategy as you speak." },
  { num: "03", title: "Strategy & approval", body: "Your complete brief — brand file, email architecture, content calendar. Nothing goes out until you've said yes." },
  { num: "04", title: "Execution & dashboard", body: "Flows go live. Your dashboard shows what's sending, what's working, and what's coming next. Every day." },
]

const STATS = [
  { value: "5–15%", label: "Cart recovery" },
  { value: "7 days", label: "To live" },
  { value: "30–40%", label: "Revenue from email" },
]

// ── Reveal ───────────────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
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
      <svg width={72 * size} height={27 * size} viewBox="-4 -12 128 64" fill="none">
        <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke={primary} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke={ACCENT} strokeWidth="1.4" fill="none" opacity="0.85" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 600, fontSize: 16 * size, letterSpacing: "-0.03em", color: primary }}>
        Even <span style={{ color: ACCENT }}>Flow</span>
      </span>
    </div>
  )
}

// ── Thin horizontal rule ─────────────────────────────────────────────
function Rule({ color = BORDER }: { color?: string }) {
  return <div style={{ width: "100%", height: 1, background: color }} />
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
export default function Option3() {
  return (
    <div style={{ background: CREAM, color: INK, minHeight: "100dvh" }}>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* NAV — minimal, no bg, just a line below                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 30, background: "rgba(250,250,247,0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Logo size={0.85} />
          <motion.a
            href="https://cal.com/evenflow/30min"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: INK,
              background: "transparent",
              border: `1px solid ${BORDER}`,
              padding: "10px 24px",
              borderRadius: 2,
              textDecoration: "none",
            }}
          >
            Book a call
          </motion.a>
        </div>
        <Rule />
      </nav>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO — one giant headline, one CTA, nothing else             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(56px, 9vw, 140px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: INK,
              margin: "0 0 48px",
              maxWidth: 900,
            }}
          >
            Your emails.<br />
            Your voice.<br />
            <span style={{ color: ACCENT }}>Handled.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
            style={{ display: "flex", alignItems: "center", gap: 32 }}
          >
            <motion.a
              href="https://cal.com/evenflow/30min"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: CREAM,
                background: INK,
                padding: "18px 44px",
                borderRadius: 2,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book a discovery call
            </motion.a>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 14, color: STONE }}>
              30 min &middot; free &middot; no pitch
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SINGLE-LINE DESCRIPTOR                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Rule />
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 19, lineHeight: 1.8, color: STONE, maxWidth: 560, margin: 0 }}>
              Boutique Klaviyo specialists for ecommerce brands who give a damn about their voice. AI-native. Gold Coast, AU.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS — clean numbered list                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Rule />
      <section id="how" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: STONE, marginBottom: 64 }}>
              How it works
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.06}>
                <div style={{ borderTop: `1px solid ${BORDER}`, padding: "48px 0", display: "grid", gridTemplateColumns: "64px 280px 1fr", gap: 0, alignItems: "baseline" }}>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>
                    {step.num}
                  </span>
                  <h3 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 600, fontSize: 20, letterSpacing: "-0.02em", color: INK, margin: 0 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: STONE, margin: 0, maxWidth: 480 }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${BORDER}` }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* STATS — three numbers, nothing more                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 48px", background: INK }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
            {STATS.map((s, i) => (
              <Reveal key={s.value} delay={i * 0.1}>
                <div>
                  <p style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700, fontSize: "clamp(44px, 5vw, 72px)", letterSpacing: "-0.04em", color: CREAM, margin: "0 0 8px", lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,247,0.35)", margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BOOKING — brutally simple                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="book" style={{ padding: "140px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: STONE, marginBottom: 32 }}>
              Get started
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: INK, margin: "0 0 24px", maxWidth: 600 }}>
              Book a discovery call.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: STONE, maxWidth: 480, marginBottom: 48 }}>
              30 minutes. No deck. No pitch. Just a conversation about your brand and whether we&apos;re a fit.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 56 }}>
              {["Audit your current email setup", "Estimate the revenue gap", "Tell you exactly what we'd build first"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: ACCENT }}>&#8594;</span>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: 15, color: STONE }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.a
              href="https://cal.com/evenflow/30min"
              whileHover={{ scale: 1.02 }}
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
                borderRadius: 2,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book a discovery call
            </motion.a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FOOTER — absolute minimum                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Rule />
      <footer style={{ padding: "48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size={0.8} />
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: STONE, margin: 0 }}>
            &copy; 2026 Even Flow &middot; Gold Coast, AU
          </p>
        </div>
      </footer>

      {/* Bottom breathing room */}
      <div style={{ height: 48 }} />
    </div>
  )
}
