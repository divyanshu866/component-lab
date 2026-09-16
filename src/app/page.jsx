"use client";

import Navbar from "@/components/Landing/Navbar";
import Hero from "@/components/Landing/Hero";
import TechnologyStrip from "@/components/Landing/TechnologyStrip";
import Workflow from "@/components/Landing/Workflow";
import ProductShowcase from "@/components/Landing/ProductShowcase";
import Features from "@/components/Landing/Features";
import FinalCTA from "@/components/Landing/FinalCTA";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  return (
    <main
      className="
        relative min-h-screen overflow-x-hidden
        bg-[#09090b]/50
        font-(family-name:var(--font-geist-sans))
        text-white
        antialiased
        selection:bg-violet-400/30
        selection:text-white
      "
    >
      {/* Global landing-page atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 z-0
          h-175
          bg-[radial-gradient(
            circle_at_50%_0%,
            rgba(124,58,237,0.14),
            transparent_62%
          )]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-112.5 z-0
          h-125 w-225
          -translate-x-1/2
          rounded-full
          bg-violet-600/[0.035]
          blur-3xl
        "
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TechnologyStrip />
        <Workflow />
        <ProductShowcase />
        <Features />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
