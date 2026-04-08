"use client";
import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
  veilOpacity?: string
}

export function HeroSection({
  colors = ["#0d0d1a", "#1a1035", "#e891c8", "#ffa07a", "#7eb8d4", "#b8a0e8"],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.3,
  offsetX = 0.08,
  veilOpacity = "bg-black/30",
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Mesh gradient background */}
      <div className="fixed inset-0 w-screen h-screen">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
          </>
        )}
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{background: "#c4a35a"}} />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-24 h-[72px]">
        <div className="flex items-center gap-3">
          <svg width="96" height="36" viewBox="-4 -12 128 64" fill="none">
            <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke="#c4a35a" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
            <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke="#c4a35a" strokeWidth="1.4" fill="none" opacity="0.28" strokeLinecap="round"/>
          </svg>
          <span style={{fontFamily:"var(--font-clash)", fontWeight:600, fontSize:"19px", letterSpacing:"-0.03em", color:"#f0e8d0"}}>
            Even <span style={{color:"#c4a35a"}}>Flow</span>
          </span>
        </div>
        <a href="#" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#0e1a14", background:"#c4a35a", padding:"10px 22px", borderRadius:"4px", textDecoration:"none", fontWeight:500}}>
          Book a call
        </a>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-10" style={{background:"rgba(196,163,90,0.15)", border:"1px solid rgba(196,163,90,0.3)"}}>
          <span style={{fontFamily:"var(--font-dm-mono)", fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", color:"#c4a35a"}}>
            Done for you · Shopify brands
          </span>
        </div>

        {/* Headline — between precision and boutique */}
        {/* Line 1 & 2: Cormorant Garamond — warmth, craft, precision instrument energy */}
        {/* Line 3: Clash Display — sharp boutique authority */}
        <h1 className="mb-8 text-center" style={{lineHeight:1.0}}>
          <span style={{display:"block", fontFamily:"Cormorant Garamond, serif", fontWeight:300, fontSize:"96px", letterSpacing:"-0.02em", color:"#f0e8d0", fontStyle:"italic", lineHeight:1.05}}>
            Your emails.
          </span>
          <span style={{display:"block", fontFamily:"Cormorant Garamond, serif", fontWeight:300, fontSize:"96px", letterSpacing:"-0.02em", color:"#f0e8d0", fontStyle:"italic", lineHeight:1.05}}>
            Your voice.
          </span>
          <span style={{display:"block", fontFamily:"var(--font-clash)", fontWeight:700, fontSize:"108px", letterSpacing:"-0.04em", color:"#c4a35a", lineHeight:1.0, marginTop:"8px"}}>
            Handled.
          </span>
        </h1>

        {/* Sub */}
        <p style={{fontFamily:"DM Sans, sans-serif", fontWeight:300, fontSize:"18px", lineHeight:1.75, color:"rgba(240,232,208,0.7)", maxWidth:"520px", marginBottom:"48px"}}>
          One conversation with Wilson. Your entire email programme — built, scheduled, and running. Every email sounds like you wrote it.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-6">
          <a href="#" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#0e1a14", background:"#c4a35a", padding:"16px 36px", borderRadius:"4px", textDecoration:"none"}}>
            Book your interview
          </a>
          <a href="#" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,232,208,0.5)", textDecoration:"none"}}>
            See how it works →
          </a>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <span style={{fontFamily:"Cormorant Garamond, serif", fontStyle:"italic", fontSize:"15px", color:"rgba(240,232,208,0.35)"}}>
          evenflow.agency
        </span>
      </div>
    </section>
  )
}
