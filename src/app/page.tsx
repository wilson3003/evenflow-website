"use client";
import { MeshBackground } from "@/components/ui/mesh-background"
import { HeroSection } from "@/components/ui/hero-section"
import { HowItWorks } from "@/components/ui/how-it-works"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Even Flow",
  description: "AI-native email marketing agency for ecommerce brands. Klaviyo specialists. Gold Coast, Australia.",
  url: "https://evenflow.agency",
  serviceType: ["Email Marketing", "Klaviyo", "Email Automation", "Ecommerce Email Marketing"],
  areaServed: [
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "New Zealand" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gold Coast",
    addressRegion: "QLD",
    addressCountry: "AU",
  },
  email: "info@evenflow.agency",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
