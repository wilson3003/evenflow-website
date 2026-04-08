"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── BRAND TOKENS ─── */
const c = {
  accent: "#09D9A0",
  ink: "#141210",
  cream: "#FAFAF7",
  stone: "#8A8078",
  border: "#E8E4DF",
};

const font = {
  display: "Clash Display, sans-serif",
  sub: "Cormorant Garamond, serif",
  body: "DM Sans, sans-serif",
  mono: "DM Mono, monospace",
};

/* ─── SPRING PRESETS ─── */
const springSmooth = { type: "spring" as const, stiffness: 120, damping: 20 };
const springSnappy = { type: "spring" as const, stiffness: 300, damping: 30 };

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: springSmooth },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: springSmooth },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── DATA ─── */
const steps = [
  {
    num: "01",
    title: "Explore and audit.",
    body: "A free 30-minute call. We look at what you\u2019ve got, what it\u2019s actually earning, and what\u2019s being left on the table. No deck. No pitch. Just an honest look at your email channel.",
    detail:
      "We\u2019ll audit your current Klaviyo setup (or lack of one), estimate the revenue gap, and tell you exactly what we\u2019d build first. You leave knowing what your email is worth \u2014 whether you work with us or not.",
  },
  {
    num: "02",
    title: "The brand interview.",
    body: "One 60-minute onboarding session. You talk. We listen. Our AI reads every word in real time \u2014 building your brand voice, your customer intelligence, your content strategy \u2014 as you speak.",
    detail:
      "We cover: your origin story, who buys from you and why, what your voice sounds like, what you never say, your product\u2019s real differentiator, your seasonal calendar, and what\u2019s been tried before. Nothing gets assumed.",
  },
  {
    num: "03",
    title: "We build your strategy. You approve it.",
    body: "AI creates your complete brief \u2014 Brand Intelligence File, email architecture, content calendar. We share it with you before we write a single word. Nothing goes out until you\u2019ve said yes.",
    detail:
      "Every flow, every campaign, every email \u2014 you see it first. We refine anything that doesn\u2019t feel right. Most agencies hide behind their process. We show you ours.",
  },
  {
    num: "04",
    title: "Execution and live dashboard.",
    body: "Flows go live. Campaigns go out. Your personal dashboard shows exactly what\u2019s sending, what\u2019s working, and what\u2019s coming next \u2014 open rates, revenue from email, all of it, every day.",
    detail:
      "No monthly PDFs. No waiting for reports. We review performance weekly, optimise continuously, and keep everything alive as your brand grows.",
  },
];

const stats = [
  { value: "5\u201315%", label: "Abandoned cart recovery" },
  { value: "7 days", label: "Interview to flows live" },
  { value: "30\u201340%", label: "Revenue from email within 90 days" },
];

/* ─── LOGO ─── */
function Logo({ light = false }: { light?: boolean }) {
  return (
    <svg width="96" height="36" viewBox="-4 -12 128 64" fill="none">
      <path
        d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20"
        stroke={light ? "#FAFAF7" : "#141210"}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20"
        stroke="#09D9A0"
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── ACCORDION ITEM ─── */
function AccordionItem({
  step,
  isOpen,
  onToggle,
}: {
  step: (typeof steps)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ borderBottom: `1px solid ${c.border}` }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-8 md:py-10 group cursor-pointer"
        style={{ background: "transparent", border: "none" }}
      >
        <div className="flex items-start gap-6 md:gap-10">
          {/* Step number */}
          <span
            style={{
              fontFamily: font.mono,
              fontSize: "0.75rem",
              color: c.accent,
              letterSpacing: "0.08em",
              lineHeight: "2.2",
            }}
          >
            {step.num}
          </span>

          {/* Title + body */}
          <div className="flex-1 pr-4">
            <h3
              style={{
                fontFamily: font.display,
                fontWeight: 600,
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                color: c.ink,
                lineHeight: 1.25,
                marginBottom: "0.5rem",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: font.body,
                fontWeight: 300,
                fontSize: "0.95rem",
                color: c.stone,
                lineHeight: 1.7,
                maxWidth: "38rem",
              }}
            >
              {step.body}
            </p>
          </div>

          {/* Toggle indicator */}
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={springSnappy}
            style={{
              fontFamily: font.body,
              fontSize: "1.5rem",
              color: c.stone,
              lineHeight: 1,
              marginTop: "0.25rem",
              flexShrink: 0,
            }}
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ...springSmooth, opacity: { duration: 0.25 } }}
            style={{ overflow: "hidden" }}
          >
            <div className="pl-12 md:pl-[4.5rem] pb-8 md:pb-10 pr-12">
              <p
                style={{
                  fontFamily: font.body,
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: c.stone,
                  lineHeight: 1.8,
                  maxWidth: "36rem",
                }}
              >
                {step.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── SOCIAL ICONS ─── */
function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── MAIN PAGE ─── */
export default function DesignB() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <div
      style={{
        backgroundColor: c.cream,
        color: c.ink,
        fontFamily: font.body,
        fontWeight: 300,
        overflowX: "hidden",
      }}
    >
      {/* ═══════════ NAV ═══════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springSmooth, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          backgroundColor: "rgba(250, 250, 247, 0.85)",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <Logo />
            <span
              style={{
                fontFamily: font.display,
                fontWeight: 600,
                fontSize: "1.1rem",
                letterSpacing: "-0.01em",
              }}
            >
              Even Flow
            </span>
          </div>

          <motion.a
            href="#book"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className="hidden sm:block px-5 py-2.5 rounded-full text-sm"
            style={{
              fontFamily: font.mono,
              fontSize: "0.8rem",
              letterSpacing: "0.04em",
              backgroundColor: c.ink,
              color: c.cream,
            }}
          >
            Book a call
          </motion.a>
        </div>
      </motion.nav>

      {/* ═══════════ HERO ═══════════ */}
      <section
        className="min-h-[100dvh] flex items-end pb-16 md:pb-24 pt-32"
        style={{ position: "relative" }}
      >
        {/* Subtle grid accent */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full hidden lg:block"
          style={{
            backgroundImage: `radial-gradient(circle, ${c.border} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            opacity: 0.5,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Kicker */}
            <motion.p
              variants={fadeLeft}
              style={{
                fontFamily: font.mono,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: c.stone,
                marginBottom: "1.5rem",
              }}
            >
              Klaviyo specialists &middot; Gold Coast, AU
            </motion.p>

            {/* Headline — dramatic sizing */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: c.ink,
                marginBottom: "1.5rem",
              }}
            >
              Your emails.
              <br />
              Your voice.
              <br />
              <span style={{ color: c.accent }}>Handled.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: font.sub,
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
                lineHeight: 1.55,
                color: c.stone,
                maxWidth: "34rem",
                marginBottom: "2.5rem",
              }}
            >
              Boutique AI-native email marketing for ecommerce brands that
              actually sound like you.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <motion.a
                href="#book"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={springSnappy}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full"
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  backgroundColor: c.ink,
                  color: c.cream,
                }}
              >
                Book a discovery call
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: "4px" }}
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke={c.cream}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TRUST LINE ═══════════ */}
      <section
        className="py-6 md:py-8"
        style={{ borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: font.mono,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: c.stone,
            }}
          >
            Klaviyo Partner &middot; Shopify &middot; AI-native workflows &middot; AU / NZ ecommerce
          </motion.p>
        </div>
      </section>

      {/* ═══════════ WHAT WE DO — ASYMMETRIC ═══════════ */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left column — narrow label */}
            <motion.div
              className="lg:col-span-4"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.accent,
                  marginBottom: "1rem",
                }}
              >
                What we do
              </p>
              <h2
                style={{
                  fontFamily: font.display,
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                Email that
                <br />
                earns while
                <br />
                you sleep.
              </h2>
            </motion.div>

            {/* Right column — body */}
            <motion.div
              className="lg:col-span-7 lg:col-start-6 flex flex-col justify-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p
                style={{
                  fontFamily: font.body,
                  fontWeight: 300,
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: c.stone,
                  maxWidth: "32rem",
                  marginBottom: "1.75rem",
                }}
              >
                Most email agencies copy-paste templates and call it strategy. We
                build a system around your brand \u2014 your voice, your
                customers, your data \u2014 powered by AI that learns how you
                speak and what your audience responds to.
              </p>
              <p
                style={{
                  fontFamily: font.body,
                  fontWeight: 300,
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: c.stone,
                  maxWidth: "32rem",
                }}
              >
                Flows, campaigns, segmentation, deliverability. End to end. You
                stay in control. We handle the rest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS — ACCORDION ═══════════ */}
      <section className="py-24 md:py-36" style={{ backgroundColor: c.cream }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <p
              style={{
                fontFamily: font.mono,
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: c.accent,
                marginBottom: "1rem",
              }}
            >
              How it works
            </p>
            <h2
              style={{
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                maxWidth: "28rem",
              }}
            >
              Four steps.
              <br />
              No mysteries.
            </h2>
          </motion.div>

          {/* Accordion */}
          <div
            className="max-w-4xl"
            style={{ borderTop: `1px solid ${c.border}` }}
          >
            {steps.map((step, i) => (
              <AccordionItem
                key={step.num}
                step={step}
                isOpen={openStep === i}
                onToggle={() => setOpenStep(openStep === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: c.ink }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <p
                  style={{
                    fontFamily: font.display,
                    fontWeight: 700,
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: c.accent,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: c.stone,
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BOOK CTA ═══════════ */}
      <section
        id="book"
        className="py-28 md:py-40"
        style={{ backgroundColor: c.cream }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — big type */}
            <motion.div
              className="lg:col-span-7"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.accent,
                  marginBottom: "1.25rem",
                }}
              >
                Get started
              </p>
              <h2
                style={{
                  fontFamily: font.display,
                  fontWeight: 700,
                  fontSize: "clamp(2.25rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  marginBottom: "1.5rem",
                }}
              >
                Let&rsquo;s see what
                <br />
                your email is
                <br />
                actually worth.
              </h2>
              <p
                style={{
                  fontFamily: font.sub,
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "1.15rem",
                  color: c.stone,
                  lineHeight: 1.6,
                  maxWidth: "28rem",
                  marginBottom: "2.5rem",
                }}
              >
                30 minutes. No pitch deck. Just an honest audit of your email
                channel and the revenue you&rsquo;re leaving behind.
              </p>

              <motion.a
                href="#book"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={springSnappy}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full"
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  backgroundColor: c.ink,
                  color: c.cream,
                }}
              >
                Book a discovery call
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: "4px" }}
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke={c.cream}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </motion.div>

            {/* Right — decorative accent block */}
            <motion.div
              className="lg:col-span-4 lg:col-start-9 hidden lg:flex items-center justify-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div
                className="w-full aspect-square rounded-3xl flex items-center justify-center"
                style={{
                  backgroundColor: c.ink,
                  maxWidth: "320px",
                }}
              >
                <svg
                  width="160"
                  height="60"
                  viewBox="-4 -12 128 64"
                  fill="none"
                >
                  <path
                    d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20"
                    stroke="#FAFAF7"
                    strokeWidth="2.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20"
                    stroke="#09D9A0"
                    strokeWidth="1.4"
                    fill="none"
                    opacity="0.85"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer
        className="py-12 md:py-16"
        style={{
          backgroundColor: c.ink,
          borderTop: `1px solid rgba(250,250,247,0.08)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
            {/* Left — branding */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <Logo light />
                <span
                  style={{
                    fontFamily: font.display,
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: c.cream,
                  }}
                >
                  Even Flow
                </span>
              </div>
              <p
                style={{
                  fontFamily: font.body,
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  color: c.stone,
                  lineHeight: 1.7,
                  maxWidth: "20rem",
                }}
              >
                Boutique AI-native email marketing.
                <br />
                Klaviyo specialists. Gold Coast, AU.
              </p>
            </div>

            {/* Middle — links */}
            <div className="md:col-span-3 md:col-start-7">
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.stone,
                  marginBottom: "1rem",
                }}
              >
                Connect
              </p>
              <div className="flex gap-5">
                {[
                  { Icon: IconInstagram, href: "#", label: "Instagram" },
                  { Icon: IconLinkedIn, href: "#", label: "LinkedIn" },
                  { Icon: IconX, href: "#", label: "X" },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={springSnappy}
                    style={{ color: c.stone }}
                    className="hover:text-white transition-colors"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right — CTA repeat */}
            <div className="md:col-span-3 md:text-right">
              <motion.a
                href="#book"
                whileHover={{ scale: 1.04 }}
                transition={springSnappy}
                className="inline-block px-5 py-2.5 rounded-full text-sm"
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.75rem",
                  letterSpacing: "0.04em",
                  border: `1px solid rgba(250,250,247,0.15)`,
                  color: c.cream,
                }}
              >
                Book a call
              </motion.a>
            </div>
          </div>

          {/* Bottom line */}
          <div
            className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            style={{ borderTop: `1px solid rgba(250,250,247,0.06)` }}
          >
            <p
              style={{
                fontFamily: font.mono,
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                color: c.stone,
                opacity: 0.6,
              }}
            >
              &copy; {new Date().getFullYear()} Even Flow. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: font.mono,
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                color: c.stone,
                opacity: 0.4,
              }}
            >
              flowbutler.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
