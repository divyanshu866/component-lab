import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-transparent px-8 py-20 md:px-16">
      {/* Background Glow */}

      <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative z-10">
        {/* Badge */}

        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2">
          <Sparkles className="h-4 w-4 text-violet-400" />

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Ready to Build?
          </span>
        </div>

        {/* Heading */}

        <h2 className="mx-auto mt-8 max-w-4xl text-center text-4xl font-bold tracking-tight text-white md:text-6xl">
          Build better UI.
          <br />
          Ship faster.
        </h2>

        {/* Subtitle */}

        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-gray-400">
          Join thousands of developers using AI to generate, customize, and ship
          beautiful production-ready components in minutes.
        </p>

        {/* Buttons */}

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary */}

          <button className="group inline-flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-pink-700 to-purple-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110">
            Upgrade to Pro
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary */}

          <button
            onClick={() => router.push("/workspace")}
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            Start Free
          </button>
        </div>

        {/* Trust Indicators */}

        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">✓</div>

            <div className="mt-1 text-sm text-gray-500">
              No credit card required
            </div>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div className="text-center">
            <div className="text-3xl font-bold text-white">✓</div>

            <div className="mt-1 text-sm text-gray-500">Cancel anytime</div>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div className="text-center">
            <div className="text-3xl font-bold text-white">✓</div>

            <div className="mt-1 text-sm text-gray-500">
              7-day money-back guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
