import PricingHero from "@/components/upgrade/PricingHero";
import BillingToggle from "@/components/upgrade/BillingToggle";
import UpgradeCard from "@/components/upgrade/UpgradeCard";
import GuaranteeCard from "@/components/upgrade/GuaranteeCard";
import FeatureComparison from "@/components/upgrade/FeatureComparison";
import FAQ from "@/components/upgrade/FAQ";
import CTASection from "@/components/upgrade/CTASection";
import { PaddleProvider } from "@/components/PaddleProvider";

import Navbar from "@/components/Landing/Navbar";

import { auth } from "@/lib/auth";
export default async function UpgradePage() {
  const session = await auth();
  ("use client");
  // if (!session) redirect("/sign-in");
  const userId = session?.user?.id || null;

  console.log("SESSION===>", session);

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

            {/* <div className="mt-14">
              <BillingToggle
                plans={plans}
                billingCycle={billingCycle}
                setBillingCycle={setBillingCycle}
              />
            </div> */}
          </div>
        </section>

        {/* Pricing Cards */}

        <section className="px-6 pt-14">
          <div className="mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-6">
              <PaddleProvider>
                <UpgradeCard userId={userId} />
              </PaddleProvider>
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
