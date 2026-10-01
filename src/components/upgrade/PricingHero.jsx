import { Sparkles } from "lucide-react";

const PricingHero = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-5 flex items-center justify-center gap-2">
        <Sparkles size={13} className="text-violet-400" />

        <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-violet-300/70">
          ComponentLab Plans
        </span>
      </div>

      <h1 className="text-4xl font-medium leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
        Build more with
        <br className="hidden sm:block" />
        <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          more control.
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-[13px] leading-6 text-neutral-500 sm:text-sm sm:leading-7">
        Start free and upgrade when you need more generations, more powerful
        models, and greater control over AI.
      </p>
    </div>
  );
};

export default PricingHero;
