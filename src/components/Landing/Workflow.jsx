import { PencilLine, Rocket, SlidersHorizontal, Sparkles } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    number: "01",
    icon: PencilLine,
    title: "Describe",
    description: "Describe the component you want in plain language.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Generate",
    description:
      "ComponentLab turns your prompt into working UI and source code.",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Refine",
    description:
      "Iterate on the result while keeping full control over the implementation.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Ship",
    description:
      "Take the finished component into your project and keep building.",
  },
];

export default function Workflow() {
  return (
    /*
     * LANDING COMPONENT
     *
     * Suggested extraction:
     * components/Landing/Workflow.jsx
     *
     * The section intentionally uses a simple visual hierarchy:
     * heading → connecting line → four workflow steps.
     */
    <section
      id="workflow"
      className="relative border-y border-white/[0.06] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            From prompt
            <span className="text-zinc-600"> to production.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            ComponentLab turns a natural-language idea into editable,
            previewable code — then lets you keep refining it until it's ready
            to ship.
          </p>
        </div>

        {/* Workflow */}
        <div className="mt-16 lg:mt-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {WORKFLOW_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative pr-0 lg:pr-10">
                  {/* Connector */}
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-5 hidden h-px w-[calc(100%-2.5rem)] translate-x-10 bg-white/[0.08] lg:block"
                    />
                  )}

                  {/* Step header */}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-[#0b0b0f]">
                      <Icon className="h-4 w-4 text-violet-300" />
                    </div>

                    <span className="font-mono text-[11px] tracking-[0.15em] text-zinc-600">
                      {step.number}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="mt-7 max-w-[250px]">
                    <h3 className="text-base font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
