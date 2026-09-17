import {
  Code2,
  Layers3,
  Play,
  Sparkles,
  WandSparkles,
  Zap,
  ArrowUpRight,
  Check,
} from "lucide-react";
import GlowOrb from "./GlowOrb";

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

function FeatureIcon({ children }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.07]">
      {children}
    </div>
  );
}

export default function Features() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <GlowOrb className="-left-32 top-1/3 h-96 w-96 bg-violet-600/[0.06]" />
      <GlowOrb className="right-[-10rem] bottom-0 h-96 w-96 bg-fuchsia-500/[0.05]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300/70">
            <span className="h-px w-5 bg-violet-400/50" />
            Why ComponentLab
          </div>

          <h2 className="text-balance text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-[58px] lg:leading-[1.02]">
            A faster loop between
            <br />
            <span className="text-zinc-400">idea and implementation.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Everything you need to go from an idea to editable, working UI.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-14 grid gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-12">
          {/* Featured */}
          <div className="group relative overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-[#17131f] via-[#111116] to-[#0d0d11] p-6 sm:col-span-2 lg:col-span-7 lg:min-h-[300px] lg:p-8">
            <div
              aria-hidden="true"
              className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-violet-500/[0.10] blur-3xl transition-transform duration-500 group-hover:scale-110"
            />

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between">
                <FeatureIcon>
                  <Sparkles className="h-4 w-4 text-violet-300" />
                </FeatureIcon>

                <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-300" />
              </div>

              <div className="mt-8 max-w-md">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-violet-300/70">
                  Start with an idea
                </div>

                <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
                  Natural-language generation
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                  Describe the UI you have in mind instead of starting from an
                  empty editor.
                </p>
              </div>

              {/* Prompt visual */}
              <div className="relative mt-8 max-w-[520px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#09090d]/80 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                    <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                  </div>

                  <div className="min-w-0 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2.5">
                    <span className="text-[10px] text-zinc-300 sm:text-xs">
                      Create a modern pricing section with three plans
                    </span>
                  </div>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500">
                    <ArrowUpRight className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111116] p-6 transition-colors duration-200 hover:border-white/[0.12] hover:bg-[#141419] lg:col-span-5 lg:p-7">
            <FeatureIcon>
              <Play className="h-4 w-4 text-violet-300" />
            </FeatureIcon>

            <h3 className="mt-7 text-base font-semibold text-white">
              Live preview
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              See the generated component rendered immediately while you
              iterate.
            </p>

            {/* Mini browser */}
            <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-[#09090c] shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
              <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] px-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-400/50" />
              </div>

              <div className="flex h-28 items-center justify-center bg-[#f4f5f7] p-4">
                <div className="w-full max-w-[180px] rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-1.5 w-10 rounded bg-zinc-200" />
                      <div className="mt-1.5 h-3.5 w-16 rounded bg-zinc-100" />
                    </div>

                    <div className="rounded-full bg-emerald-50 px-1.5 py-1 text-[5px] font-medium text-emerald-600">
                      Live
                    </div>
                  </div>

                  <div className="mt-3 flex gap-1">
                    <div className="h-1.5 flex-1 rounded bg-zinc-100" />
                    <div className="h-1.5 w-8 rounded bg-zinc-100" />
                  </div>

                  <div className="mt-3 h-5 rounded-md bg-violet-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Full source */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111116] p-6 transition-colors hover:border-white/[0.12] hover:bg-[#141419] lg:col-span-4">
            <FeatureIcon>
              <Code2 className="h-4 w-4 text-violet-300" />
            </FeatureIcon>

            <h3 className="mt-7 text-base font-semibold text-white">
              Full source control
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Inspect and edit the generated implementation directly in the
              workspace.
            </p>

            <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#09090c] p-3 font-mono text-[8px] leading-4">
              <div>
                <span className="text-violet-400">export default</span>{" "}
                <span className="text-zinc-400">function Card()</span>
              </div>
              <div className="pl-3 text-zinc-600">return (</div>
              <div className="pl-6 text-fuchsia-300">&lt;Card className=</div>
              <div className="pl-9 text-yellow-200">{"rounded-2xl..."}</div>
              <div className="pl-6 text-fuchsia-300">&gt;</div>
            </div>
          </div>

          {/* Context-aware */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111116] p-6 transition-colors hover:border-white/[0.12] hover:bg-[#141419] lg:col-span-4">
            <FeatureIcon>
              <WandSparkles className="h-4 w-4 text-violet-300" />
            </FeatureIcon>

            <h3 className="mt-7 text-base font-semibold text-white">
              Context-aware iteration
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Ask the AI to change the existing component instead of
              regenerating it from scratch.
            </p>

            <div className="mt-6 space-y-2">
              <div className="ml-5 max-w-[85%] rounded-xl rounded-br-sm bg-violet-600 px-3 py-2 text-[8px] text-white">
                Make the button more compact
              </div>

              <div className="max-w-[90%] rounded-xl rounded-tl-sm border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[8px] text-zinc-400">
                Updated the existing component.
              </div>
            </div>
          </div>

          {/* History */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111116] p-6 transition-colors hover:border-white/[0.12] hover:bg-[#141419] lg:col-span-4">
            <FeatureIcon>
              <Layers3 className="h-4 w-4 text-violet-300" />
            </FeatureIcon>

            <h3 className="mt-7 text-base font-semibold text-white">
              Component history
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Keep your generated components and the prompts that produced them
              together.
            </p>

            <div className="mt-6 space-y-1.5">
              {[
                ["Pricing Card", "2 min ago"],
                ["Analytics", "18 min ago"],
                ["Navigation", "1 hr ago"],
              ].map(([name, time], index) => (
                <div
                  key={name}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                    index === 0 ? "bg-white/[0.055]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />
                    <span className="text-[9px] text-zinc-300">{name}</span>
                  </div>

                  <span className="text-[8px] text-zinc-700">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Built for shipping */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111116] p-6 transition-colors hover:border-white/[0.12] hover:bg-[#141419] sm:col-span-2 lg:col-span-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-7">
            <div className="flex items-start gap-4">
              <FeatureIcon>
                <Zap className="h-4 w-4 text-violet-300" />
              </FeatureIcon>

              <div>
                <h3 className="text-base font-semibold text-white">
                  Built for shipping
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                  The goal is usable source code you can take into a real
                  application.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 lg:mt-0">
              {["Editable JSX", "Live preview", "Reusable components"].map(
                (item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[9px] text-zinc-400"
                  >
                    <Check className="h-2.5 w-2.5 text-emerald-400" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
