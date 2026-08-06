import { Sparkles } from "lucide-react";

const PricingHero = () => {
  return (
    <div className="mx-auto max-w-5xl text-center">
      {/* Pricing Badge */}

      <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 backdrop-blur-xl">
        <Sparkles className="h-4 w-4 text-violet-400" />

        <span className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-300">
          Pricing
        </span>
      </div>

      {/* Heading */}

      <h1 className="mx-auto mt-10 max-w-5xl text-5xl font-bold tracking-tight text-white md:text-7xl">
        <span className="block">Simple pricing.</span>

        <span className="mt-2 block">
          Built for{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            developers.
          </span>
        </span>
      </h1>

      {/* Subtitle */}

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
        Start for free. Upgrade to Pro when you're ready to unlock more.
      </p>
    </div>
  );
};

export default PricingHero;
