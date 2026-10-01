"use client";

import { useState } from "react";
import { Check, Rocket, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { PaddleUpgradeButton } from "./PaddleUpgradeButton";

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
      features: [
        "Generate up to 10 components / month",
        "Access to all base UI components",
        "Community templates",
        "Basic exports (JSX, TSX, HTML, CSS)",
        "Standard support",
      ],
    },

    {
      id: "pro",
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
      features: [
        "500 component generations / billing period",
        "Access to powerful AI models",
        "Advanced reasoning effort levels",
        "AI-powered improvements & refactors",
        "Private projects",
        "Priority support",
      ],
    },
  ];

  const router = useRouter();

  return (
    <section className="px-6 pt-14">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => {
            const isPro = plan.id === "pro";
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative mb-5 overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-1 ${
                  isPro
                    ? "p-[1px] bg-linear-to-br from-violet-400 via-fuchsia-500 to-pink-500 shadow-[0_0_35px_rgba(217,70,239,0.14)]"
                    : "border border-white/[0.12]"
                }`}
              >
                {/* Pro-only ambient glow */}
                {isPro && (
                  <>
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[90px]" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />
                  </>
                )}

                <div className="relative flex h-full flex-col rounded-[27px] bg-[#08080a]/95 p-8 backdrop-blur-sm">
                  {/* Plan */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-semibold text-white">
                        {plan.name}
                      </h3>

                      {plan.badge && (
                        <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-fuchsia-300">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-end">
                      <span className="text-6xl font-bold tracking-tight text-white">
                        ${plan.price[billingCycle]}
                      </span>

                      <span className="mb-2 ml-2 text-xl font-medium text-gray-300">
                        /month
                      </span>
                    </div>

                    {billingCycle === "yearly" &&
                      (plan.price.monthly - plan.price.yearly) * 12 > 0 && (
                        <p className="mt-3 text-sm text-emerald-400">
                          Save ${(plan.price.monthly - plan.price.yearly) * 12}
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
                            isPro
                              ? "bg-fuchsia-400 text-black"
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
                    {isPro && userId != null ? (
                      <PaddleUpgradeButton userId={userId} />
                    ) : (
                      <button
                        type="button"
                        onClick={() => router.push("/workspace")}
                        className="group flex h-14 w-full items-center justify-center rounded-2xl bg-white/[0.06] font-semibold text-lg text-white transition-all duration-300 hover:bg-white/[0.1] cursor-pointer"
                      >
                        {plan.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpgradeCard;
