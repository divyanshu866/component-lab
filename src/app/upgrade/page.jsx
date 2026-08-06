"use client";

import { useState } from "react";

import PricingHero from "@/components/upgrade/PricingHero";
import BillingToggle from "@/components/upgrade/BillingToggle";
import UpgradeCard from "@/components/upgrade/UpgradeCard";
import GuaranteeCard from "@/components/upgrade/GuaranteeCard";
import FeatureComparison from "@/components/upgrade/FeatureComparison";
import FAQ from "@/components/upgrade/FAQ";
import CTASection from "@/components/upgrade/CTASection";

import { Rocket, Crown } from "lucide-react";
import Navbar from "@/components/Landing/Navbar";

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "free",

      name: "Free",

      description:
        "Perfect for trying out the platform and building your first components.",

      icon: Rocket,

      badge: null,

      price: {
        monthly: 0,
        yearly: 0,
      },

      cta: "Get Started for Free",

      ctaVariant: "secondary",

      features: [
        "Generate up to 10 components / month",
        "Access to all base UI components",
        "Community templates",
        "Basic exports (JSX, TSX, HTML, CSS)",
        "Standard support",
      ],
    },

    {
      id: "premium",

      name: "Pro",

      description:
        "For developers who build more, move faster, and want more power.",

      icon: Crown,

      badge: "Most Popular",

      price: {
        monthly: 15,
        yearly: 12,
      },

      cta: "Get Pro",

      ctaVariant: "primary",

      features: [
        "Unlimited component generations",
        "Access to premium UI components",
        "Advanced code exports (React, Vue, HTML)",
        "AI-powered improvements & refactors",
        "Private projects",
        "Priority support",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      {/* Grid Overlay */}
      <Navbar />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        {/* Hero */}

        <section className="px-6 pt-32 lg:pt-36">
          <div className="mx-auto max-w-7xl">
            <PricingHero />

            <div className="mt-14">
              <BillingToggle
                plans={plans}
                billingCycle={billingCycle}
                setBillingCycle={setBillingCycle}
              />
            </div>
          </div>
        </section>

        {/* Pricing Cards */}

        <section className="px-6 pt-14">
          <div className="mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <UpgradeCard
                  key={plan.id}
                  plan={plan}
                  billingCycle={billingCycle}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee */}

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-3xl">
            <GuaranteeCard />
          </div>
        </section>

        {/* Feature Comparison */}

        <section className="px-6 pt-28">
          <div className="mx-auto max-w-6xl">
            <FeatureComparison />
          </div>
        </section>

        {/* FAQ */}

        <section className="px-6 pt-28">
          <div className="mx-auto max-w-4xl">
            <FAQ />
          </div>
        </section>

        {/* Final CTA */}

        <section className="px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <CTASection />
          </div>
        </section>
      </div>
    </main>
  );
}
