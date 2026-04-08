"use client";
import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

export function MeshBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
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
      {/* Very light veil — keeps text readable without killing the gradient */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.18)", pointerEvents: "none" }} />
    </div>
  )
}
