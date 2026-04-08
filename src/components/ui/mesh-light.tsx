"use client";
import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

export function MeshLight() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    const styleEl = document.createElement("style")
    styleEl.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `
    document.head.appendChild(styleEl)
    return () => { document.head.removeChild(styleEl) }
  }, [])

  useEffect(() => {
    setMounted(true)
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <>
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Mesh gradient */}
      <div className="absolute inset-0 w-full h-full">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={["#f8f0ff", "#ffe0f0", "#ffcca0", "#c0e0ff", "#f0c0ff", "#c0f0e0"]}
              distortion={1.8}
              swirl={1.2}
              grainMixer={0}
              grainOverlay={0}
              speed={0.25}
              offsetX={0.08}
            />
            {/* Light veil — keeps it readable */}
            <div className="absolute inset-0 pointer-events-none bg-white/30" />
          </>
        )}
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-black/10" />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-24 h-[72px]">
        <div className="flex items-center gap-3">
          <svg width="96" height="36" viewBox="-4 -12 128 64" fill="none">
            <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke="#141210" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
            <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke="#09D9A0" strokeWidth="1.4" fill="none" opacity="0.85" strokeLinecap="round"/>
          </svg>
          <span style={{fontFamily:"var(--font-clash)", fontWeight:600, fontSize:"19px", letterSpacing:"-0.03em", color:"#141210"}}>
            Even <span style={{color:"#09D9A0"}}>Flow</span>
          </span>
        </div>
        <a href="#how" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"#141210", background:"transparent", border:"1.5px solid #09D9A0", padding:"10px 22px", borderRadius:"4px", textDecoration:"none"}}>
          See how it works
        </a>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-5xl mx-auto" style={{isolation: "isolate" as const}}>
        {/* Headline */}
        <h1 className="mb-8 text-center" style={{lineHeight:1.0}}>
          <span style={{display:"block", fontFamily:"Cormorant Garamond, serif", fontWeight:300, fontSize:"96px", letterSpacing:"-0.02em", color:"#141210", fontStyle:"italic", lineHeight:1.05}}>
            Your emails.
          </span>
          <span style={{display:"block", fontFamily:"Cormorant Garamond, serif", fontWeight:300, fontSize:"96px", letterSpacing:"-0.02em", color:"#141210", fontStyle:"italic", lineHeight:1.05}}>
            Your voice.
          </span>
          {/* HANDLED — mesh gradient flows through the letterforms */}
          <span style={{ display: "block", position: "relative" as const, lineHeight: 1.0, marginTop: "8px", height: "120px" }}>
            {/* Invisible text for layout space */}
            <span style={{
              display: "block",
              fontFamily: "var(--font-clash)",
              fontWeight: 700,
              fontSize: "108px",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "transparent",
              userSelect: "none" as const,
            }} aria-hidden="true">
              Handled.
            </span>
            {/* Gradient clipped to text shape */}
            <span style={{
              position: "absolute" as const,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              fontFamily: "var(--font-clash)",
              fontWeight: 700,
              fontSize: "108px",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: "linear-gradient(135deg, #c040a0 0%, #8040c0 25%, #4080c0 50%, #c06020 75%, #c040a0 100%)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text" as const,
              backgroundClip: "text" as const,
              color: "transparent",
              animation: "gradientShift 6s ease infinite",
            }}>
              Handled.
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p style={{fontFamily:"DM Sans, sans-serif", fontWeight:300, fontSize:"18px", lineHeight:1.75, color:"rgba(0,0,0,0.55)", maxWidth:"520px", marginBottom:"48px"}}>
          One conversation. Your entire email programme — built, scheduled, and selling.
        </p>

        {/* CTA */}
        <div style={{display:"flex", flexDirection:"column" as const, alignItems:"center", gap:"16px"}}>
          <a href="#book" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.12em", textTransform:"uppercase" as const, color:"#09D9A0", background:"#141210", padding:"18px 48px", borderRadius:"4px", textDecoration:"none", display:"inline-block"}}>
            Book a discovery call
          </a>
          <span style={{fontFamily:"DM Sans, sans-serif", fontWeight:300, fontSize:"13px", color:"rgba(0,0,0,0.35)"}}>
            30 minutes · free · no pitch
          </span>
        </div>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <span style={{fontFamily:"Cormorant Garamond, serif", fontStyle:"italic", fontSize:"15px", color:"rgba(0,0,0,0.25)"}}>
          evenflow.agency
        </span>
      </div>
    </section>

  </>
  )
}
