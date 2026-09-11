"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpgradeButton } from "./UpgradeButton";
import { Rocket, Crown } from "lucide-react";

const UpgradeCard = ({ userId }) => {
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

  const router = useRouter();

  return (
    <>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative overflow-hidden rounded-[28px] bg-[#050505] transition-all duration-300 hover:-translate-y-1 mb-5 ${
            plan.id === "premium"
              ? "border-2 border-fuchsia-700/80 shadow-[0_0_35px_rgba(217,70,239,.18)]"
              : "border-2 border-white/30"
          }`}
        >
          {/* Border Glow */}
          {plan.id === "premium" && (
            <>
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-violet-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />
              <div className="absolute -right-24 top-0 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-[90px]" />
            </>
          )}

          <div className="relative flex h-full flex-col p-8">
            {/* Plan */}
            <div>
              <h3 className="text-3xl font-semibold text-white">{plan.name}</h3>
              {/* Price */}
              <div className="mt-5 flex items-end">
                <span className="text-6xl font-bold tracking-tight text-white">
                  ${plan.price[billingCycle]}
                </span>
                <span className="mb-2 ml-2 text-xl font-medium text-gray-300">
                  /month
                </span>
              </div>

              {billingCycle === "yearly" && billingCycle === "yearly"
                ? (plan.price.monthly - plan.price.yearly) * 12
                : 0 > 0 && (
                    <p className="mt-3 text-sm text-emerald-400">
                      Save $
                      {billingCycle === "yearly"
                        ? (plan.price.monthly - plan.price.yearly) * 12
                        : 0}
                      /year
                    </p>
                  )}

              <p className="mt-8 text-lg leading-8 text-gray-300">
                {plan.description}
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-5">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-4">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      plan.id === "premium"
                        ? "bg-fuchsia-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span className="text-[17px] leading-8 text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA */}
            <div className="mt-10">
              {plan.id === "premium" ? (
                /* UpgradeButton component here */
                <UpgradeButton userId={userId} />
              ) : (
                <div className="w-full">
                  <button
                    onClick={() => router.push("/workspace")}
                    className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-violet-200 to-fuchsia-200 text-gray-800 hover:brightness-105"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-white/20 group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">
                      {plan.cta}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
    // return
  );
  // func
};

export default UpgradeCard;
