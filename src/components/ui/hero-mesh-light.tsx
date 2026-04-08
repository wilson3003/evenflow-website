"use client";
import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function HeroMeshLight() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Light gradient: warm cream, soft sage, warm white, pale gold
  const colors = ["#f5f0e8", "#e8f0e4", "#f9f5ee", "#d4e8d0", "#c4a35a", "#eef5eb"]

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 w-screen h-screen">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={0.7}
              swirl={0.5}
              grainMixer={0}
              grainOverlay={0}
              speed={0.25}
              offsetX={0.06}
            />
            {/* Very light veil — just takes the edge off */}
            <div className="absolute inset-0 pointer-events-none bg-white/25" />
          </>
        )}
      </div>

      {/* Top accent line — brass */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{background:"#c4a35a"}} />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-24 h-[72px]">
        <div className="flex items-center gap-3">
          <svg width="96" height="36" viewBox="-4 -12 128 64" fill="none">
            <path d="M5,20 C30,-8 50,-8 60,20 C70,48 90,48 115,20" stroke="#c4a35a" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
            <path d="M5,20 C30,48 50,48 60,20 C70,-8 90,-8 115,20" stroke="#c4a35a" strokeWidth="1.4" fill="none" opacity="0.28" strokeLinecap="round"/>
          </svg>
          <span style={{fontFamily:"var(--font-clash)", fontWeight:600, fontSize:"19px", letterSpacing:"-0.03em", color:"#141210"}}>
            Even <span style={{color:"#c4a35a"}}>Flow</span>
          </span>
        </div>
        <a href="#" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#f5f0e8", background:"#141210", padding:"10px 22px", borderRadius:"4px", textDecoration:"none"}}>
          Book a call
        </a>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
          style={{background:"rgba(196,163,90,0.15)", border:"1px solid rgba(196,163,90,0.4)"}}
        >
          <span style={{fontFamily:"var(--font-dm-mono)", fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", color:"#8a6a1a"}}>
            Done for you · Shopify brands
          </span>
        </motion.div>

        <h1 className="mb-8 text-center" style={{lineHeight:1.0}}>
          {["Your emails.", "Your voice."].map((line, i) => (
            <motion.span
              key={i}
              style={{display:"block", fontFamily:"Cormorant Garamond, serif", fontWeight:300, fontSize:"96px", letterSpacing:"-0.02em", color:"#141210", fontStyle:"italic", lineHeight:1.05}}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            style={{display:"block", fontFamily:"var(--font-clash)", fontWeight:700, fontSize:"112px", letterSpacing:"-0.04em", color:"#c4a35a", lineHeight:1.0, marginTop:"4px"}}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            Handled.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{fontFamily:"DM Sans, sans-serif", fontWeight:300, fontSize:"18px", lineHeight:1.75, color:"rgba(20,18,16,0.55)", maxWidth:"500px", marginBottom:"48px"}}
        >
          One conversation with Wilson. Your entire email programme — built, scheduled, and running. Every email sounds like you wrote it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <a href="#" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#f5f0e8", background:"#141210", padding:"16px 36px", borderRadius:"4px", textDecoration:"none"}}>
            Book your interview
          </a>
          <a href="#" style={{fontFamily:"var(--font-dm-mono)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(20,18,16,0.4)", textDecoration:"none"}}>
            See how it works →
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <span style={{fontFamily:"Cormorant Garamond, serif", fontStyle:"italic", fontSize:"15px", color:"rgba(20,18,16,0.25)"}}>
          evenflow.agency
        </span>
      </div>
    </section>
  )
}
