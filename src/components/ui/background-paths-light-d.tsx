"use client";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.02,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#6EE26E"
            strokeWidth={path.width}
            strokeOpacity={0.04 + path.id * 0.012}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function LightBackgroundPathsD() {
  const lines = ["Your emails.", "Your voice.", "Handled."];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAFAF7]">
      {/* Animated background paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#6EE26E] z-20" />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-24 h-[72px]">
        <div className="flex items-center gap-3">
          <svg width="96" height="36" viewBox="-4 -12 128 64" fill="none">
            <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke="#6EE26E" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
            <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke="#6EE26E" strokeWidth="1.4" fill="none" opacity="0.28" strokeLinecap="round"/>
          </svg>
          <span style={{fontFamily: "var(--font-clash)", fontWeight: 600, fontSize: "19px", letterSpacing: "-0.03em", color: "#141210"}}>
            Even <span style={{color: "#6EE26E"}}>Flow</span>
          </span>
        </div>
        <a href="#" className="bg-[#6EE26E] text-[#141210] font-medium text-sm px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity" style={{fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none"}}>
          Book a call
        </a>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-5xl mx-auto">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 bg-[rgba(110,226,110,0.12)] px-4 py-1.5 rounded-full mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EE26E]" style={{boxShadow: "0 0 6px rgba(110,226,110,0.8)"}} />
          <span style={{fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A6A1A"}}>
            Done for you · Shopify brands
          </span>
        </motion.div>

        {/* Animated headline — Treatment D: Oversized green "Handled." */}
        <h1 className="mb-8" style={{lineHeight: 0.93}}>
          {lines.map((line, lineIndex) => {
            const isHandled = lineIndex === 2;
            return (
              <div
                key={lineIndex}
                className="block"
                style={{
                  fontFamily: "var(--font-clash)",
                  fontWeight: 700,
                  fontSize: isHandled ? "148px" : "88px",
                  letterSpacing: "-0.04em",
                  color: isHandled ? "#6EE26E" : "#141210",
                  marginLeft: isHandled ? "-4px" : undefined,
                }}
              >
                {line.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${lineIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: lineIndex * 0.15 + letterIndex * 0.025,
                      type: "spring",
                      stiffness: isHandled ? 120 : 150,
                      damping: isHandled ? 20 : 25,
                    }}
                    className="inline-block"
                    style={letter === " " ? {marginRight: "0.25em"} : {}}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
            );
          })}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "18px", lineHeight: 1.75, color: "#8A8078", maxWidth: "540px"}}
          className="mb-12"
        >
          One conversation with Wilson. Your entire email programme — built, scheduled, and running. Every email sounds like you wrote it.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <a href="#" className="bg-[#6EE26E] text-[#141210] rounded-md hover:opacity-90 transition-opacity font-medium" style={{fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 36px", textDecoration: "none"}}>
            Book your interview
          </a>
          <a href="#" style={{fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8078", textDecoration: "none"}}>
            See how it works →
          </a>
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <span style={{fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontStyle: "italic", fontSize: "14px", color: "#C8C0B8"}}>
          evenflow.agency
        </span>
      </div>
    </div>
  );
}
