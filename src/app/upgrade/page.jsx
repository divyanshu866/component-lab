"use client";
import { useState } from "react";
import BillingToggle from "@/components/upgrade/BillingToggle";
import UpgradeCard from "@/components/upgrade/UpgradeCard";
import {
  Check,
  X,
  Zap,
  Crown,
  Code,
  Palette,
  Brain,
  Users,
  Rocket,
  Star,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for trying out ComponentLab",
      price: { monthly: 0, yearly: 0 },
      badge: null,
      icon: Code,
      color: "from-slate-600 to-slate-700",
      borderColor: "border-slate-700/50",
      features: [
        { name: "5 AI generations per day", included: true, highlight: false },
        { name: "Basic component library", included: true, highlight: false },
      ],
      cta: "Current Plan",
      ctaVariant: "secondary",
    },
    {
      id: "premium",
      name: "Premium",
      description: "Unlimited power for serious developers",
      price: { monthly: 19, yearly: 15 },
      badge: "Most Popular",
      icon: Crown,
      color: "from-pink-500 via-purple-500 to-indigo-500",
      borderColor: "border-pink-500/50",
      features: [
        { name: "Unlimited AI generations", included: true, highlight: true },
        { name: "Advanced AI with context", included: true, highlight: true },
      ],
      cta: "Upgrade to Premium",
      ctaVariant: "primary",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
                <span className="text-pink-300 font-semibold">
                  Unlock Your Full Potential
                </span>
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>

              <h1 className="text-2xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                <br />
                <span className="bg-gradient-to-r font-sans from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Upgrade To Premium
                </span>
              </h1>

              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                From prototype to production in seconds. Build components that
                scale, collaborate seamlessly, and ship faster than ever before.
              </p>
            </div>

            <BillingToggle
              plans={plans}
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
            />

            {/* Pricing Cards - Side by Side */}
            <div className="flex items-center justify-center gap-10">
              {plans.map((plan, index) => {
                return (
                  <UpgradeCard
                    key={index}
                    plan={plan}
                    billingCycle={billingCycle}
                  />
                );
              })}
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex flex-wrap items-center justify-center gap-8 mb-20 text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5 from 2,000+ developers</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Enhanced Features Section */}

        {/* Enhanced Testimonials */}

        {/* Final CTA */}
      </div>
    </div>
  );
}
