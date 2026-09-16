import {
  Code2,
  Layers3,
  Play,
  Sparkles,
  WandSparkles,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Natural-language generation",
    description:
      "Describe the UI you have in mind instead of starting from an empty editor.",
  },
  {
    icon: Play,
    title: "Live preview",
    description:
      "See the generated component rendered immediately while you iterate.",
  },
  {
    icon: Code2,
    title: "Full source control",
    description:
      "Inspect and edit the generated implementation directly in the workspace.",
  },
  {
    icon: WandSparkles,
    title: "Context-aware iteration",
    description:
      "Ask the AI to change the existing component instead of regenerating it from scratch.",
  },
  {
    icon: Layers3,
    title: "Component history",
    description:
      "Keep your generated components and the prompts that produced them together.",
  },
  {
    icon: Zap,
    title: "Built for shipping",
    description:
      "The goal is usable source code you can take into a real application.",
  },
];

export default function Features() {
  return (
    // EXTRACT THIS COMPONENT → components/Landing/Features.jsx
    <section className="px-5 py-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/70">
            Why ComponentLab
          </div>

          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            A faster loop between
            <br />
            <span className="text-zinc-500">idea and implementation.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-[#0b0b0e] p-7 transition hover:bg-[#101014]"
              >
                <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.07]">
                  <Icon className="h-4 w-4 text-violet-300" />
                </div>

                <h3 className="text-[15px] font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
