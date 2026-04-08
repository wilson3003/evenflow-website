"use client";
import { MeshBackground } from "@/components/ui/mesh-background"
import { HeroSection } from "@/components/ui/hero-section"
import { HowItWorks } from "@/components/ui/how-it-works"

export default function Home() {
  return (
    <>
      {/* Mesh gradient — fixed, covers entire page */}
      <MeshBackground />
      {/* Content layers on top */}
      <div className="relative z-10">
        <HeroSection />
        <HowItWorks />
      </div>
    </>
  )
}
