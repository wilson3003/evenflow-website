"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

/* ─────────────────────────────────────────────
   PALETTE & TOKENS (dark editorial)
   ───────────────────────────────────────────── */
const C = {
  bg: "#0A0A0C",
  surface: "#111114",
  surfaceHover: "#18181C",
  cream: "#F5F0E8",
  warm: "#E8DDD0",
  muted: "#8A8690",
  accent: "#D4A55A",      // warm gold
  accentHover: "#E0B86C",
  border: "#222228",
  white: "#FAFAF7",
};

/* ─────────────────────────────────────────────
   REUSABLE ANIMATION VARIANTS
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.15, duration: 1 },
  }),
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─────────────────────────────────────────────
   SECTION WRAPPER — auto in-view reveal
   ───────────────────────────────────────────── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   STEPS DATA
   ───────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Explore and audit.",
    body: "A free 30-minute call. We look at what you\u2019ve got, what it\u2019s actually earning, and what\u2019s being left on the table.",
  },
  {
    num: "02",
    title: "The brand interview.",
    body: "One 60-minute onboarding session. You talk. We listen. Our AI reads every word in real time.",
  },
  {
    num: "03",
    title: "We build your strategy. You approve it.",
    body: "AI creates your complete brief. We share it before writing a single word.",
  },
  {
    num: "04",
    title: "Execution and live dashboard.",
    body: "Flows go live. Campaigns go out. Your dashboard shows exactly what\u2019s working.",
  },
];

const stats = [
  { value: "5\u201315%", label: "Abandoned cart\nrecovery" },
  { value: "7 days", label: "Interview to\nflows live" },
  { value: "30\u201340%", label: "Revenue from email\nwithin 90 days" },
];

/* =============================================================
   PAGE COMPONENT
   ============================================================= */
export default function CCDesignA() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), {
    stiffness: 80,
    damping: 30,
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main
      style={{ background: C.bg, color: C.cream }}
      className="relative overflow-x-hidden"
    >
      {/* ── HERO ────────────────────────────────── */}
      <div ref={heroRef} className="relative min-h-[100dvh] flex flex-col">
        {/* subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 30%, ${C.accent}08 0%, transparent 70%)`,
          }}
        />

        {/* nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-20 pt-8"
        >
          <span
            style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.white }}
            className="text-xl tracking-tight font-semibold"
          >
            Even Flow
          </span>
          <motion.a
            href="#book"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm tracking-wide px-5 py-2.5 rounded-full border transition-colors"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              borderColor: C.border,
              color: C.cream,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = C.accent;
              (e.currentTarget as HTMLElement).style.color = C.accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = C.border;
              (e.currentTarget as HTMLElement).style.color = C.cream;
            }}
          >
            Get in touch
          </motion.a>
        </motion.nav>

        {/* hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6"
        >
          {/* eyebrow */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs md:text-sm tracking-[0.35em] uppercase mb-6 md:mb-8"
            style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
          >
            Boutique email marketing &mdash; Klaviyo specialists
          </motion.p>

          {/* headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-semibold tracking-tight max-w-5xl"
            style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.white }}
          >
            Your emails.{" "}
            <span
              className="italic font-light"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: C.accent,
              }}
            >
              Your voice.
            </span>
            <br />
            Handled.
          </motion.h1>

          {/* subline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 md:mt-8 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted }}
          >
            We write, design, and automate Klaviyo email for ecommerce brands
            that give a damn about how they sound.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#book"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 40px ${C.accent}30`,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mt-10 md:mt-14 inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm md:text-base font-medium tracking-wide"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: C.accent,
              color: C.bg,
            }}
          >
            Book a discovery call
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-px"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, ${C.muted}, transparent)` }}
          />
        </motion.div>
      </div>

      {/* ── DIVIDER LINE ─────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20">
        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-px origin-left"
          style={{ background: C.border }}
        />
      </div>

      {/* ── INTRO / PHILOSOPHY ───────────────────── */}
      <Section className="py-24 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
          >
            Our approach
          </motion.p>
          <div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.white }}
            >
              Most agencies blast templates.
              <br />
              <span style={{ color: C.accent }}>We learn your voice.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted }}
            >
              Even Flow pairs human strategy with AI precision. We interview
              your brand, build a living voice model, and create email systems
              that sound exactly like you &mdash; at scale.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <Section
        id="how"
        className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
        // style on wrapper not needed — bg inherited
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
          >
            How it works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-5xl font-semibold tracking-tight mb-16 md:mb-24"
            style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.white }}
          >
            Four steps.{" "}
            <span
              className="italic font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: C.accent }}
            >
              Zero fluff.
            </span>
          </motion.h2>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <StepRow key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── STATS ────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20">
        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-px origin-left"
          style={{ background: C.border }}
        />
      </div>

      <Section className="py-24 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
          >
            Results
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-5xl font-semibold tracking-tight mb-16 md:mb-24"
            style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.white }}
          >
            Numbers that{" "}
            <span
              className="italic font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: C.accent }}
            >
              actually matter.
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── BOOKING CTA ──────────────────────────── */}
      <Section
        id="book"
        className="py-24 md:py-44 px-6 md:px-12 lg:px-20 relative"
      >
        {/* bg glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${C.accent}0A 0%, transparent 70%)`,
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
          >
            Ready?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]"
            style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.white }}
          >
            Let&rsquo;s see what your
            <br />
            emails{" "}
            <span
              className="italic font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: C.accent }}
            >
              should
            </span>{" "}
            be doing.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted }}
          >
            30 minutes. No commitment. We&rsquo;ll audit what you&rsquo;ve got
            and show you exactly where the revenue is hiding.
          </motion.p>
          <motion.a
            href="https://cal.com/evenflow/30min"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            custom={3}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 60px ${C.accent}40`,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mt-10 md:mt-14 inline-flex items-center gap-3 px-10 py-5 rounded-full text-base md:text-lg font-medium tracking-wide"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: C.accent,
              color: C.bg,
            }}
          >
            Book a discovery call
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-px"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </Section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="px-6 md:px-12 lg:px-20 pb-10 pt-16">
        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-px origin-left mb-10"
          style={{ background: C.border }}
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span
              className="text-base font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.white }}
            >
              Even Flow
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
            >
              &copy; {new Date().getFullYear()} &middot; Gold Coast, AU
            </span>
          </div>

          {/* social icons */}
          <div className="flex items-center gap-5">
            {[
              {
                label: "Instagram",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
              },
              {
                label: "X",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ scale: 1.15, color: C.accent }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="transition-colors"
                style={{ color: C.muted }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─────────────────────────────────────────────
   STEP ROW COMPONENT
   ───────────────────────────────────────────── */
function StepRow({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* top border */}
      <motion.div
        variants={lineReveal}
        className="h-px origin-left"
        style={{ background: C.border }}
      />

      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1.2fr] gap-4 md:gap-8 py-8 md:py-10 items-start">
        {/* number */}
        <motion.span
          variants={fadeUp}
          custom={index * 0.3}
          className="text-xs tracking-[0.3em]"
          style={{
            fontFamily: "'DM Mono', monospace",
            color: hovered ? C.accent : C.muted,
            transition: "color 0.3s",
          }}
        >
          {step.num}
        </motion.span>

        {/* title */}
        <motion.h3
          variants={fadeUp}
          custom={index * 0.3 + 0.1}
          className="text-xl md:text-2xl font-semibold tracking-tight"
          style={{
            fontFamily: "var(--font-clash), 'Clash Display', sans-serif",
            color: hovered ? C.white : C.cream,
            transition: "color 0.3s",
          }}
        >
          {step.title}
        </motion.h3>

        {/* body */}
        <motion.p
          variants={fadeUp}
          custom={index * 0.3 + 0.2}
          className="text-sm md:text-base leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted }}
        >
          {step.body}
        </motion.p>
      </div>

      {/* last border */}
      {index === steps.length - 1 && (
        <motion.div
          variants={lineReveal}
          className="h-px origin-left"
          style={{ background: C.border }}
        />
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD COMPONENT
   ───────────────────────────────────────────── */
function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={index}
      whileHover={{
        y: -6,
        borderColor: C.accent + "40",
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className="rounded-2xl p-8 md:p-10 border transition-colors cursor-default"
      style={{
        background: C.surface,
        borderColor: C.border,
      }}
    >
      <span
        className="block text-4xl md:text-5xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-clash), 'Clash Display', sans-serif", color: C.accent }}
      >
        {stat.value}
      </span>
      <span
        className="block mt-3 text-sm leading-snug whitespace-pre-line"
        style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}
