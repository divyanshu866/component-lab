import { useEffect } from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  Gauge,
  Lock,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const PLAN_CONTENT = {
  PRO: {
    label: "Pro",
    eyebrow: "PRO ACCESS",
    description:
      "Unlock this model plus more generations and higher AI effort levels.",
    features: [
      {
        icon: Zap,
        title: "500",
        description: "generations / billing period",
        className:
          "border-violet-400/[0.14] bg-violet-400/[0.06] text-violet-300",
      },
      {
        icon: BrainCircuit,
        title: "Powerful models",
        description: "GPT-6 Sol · Gemini 3.8 Flash",
        className:
          "border-fuchsia-400/[0.14] bg-fuchsia-400/[0.06] text-fuchsia-300",
      },
      {
        icon: Gauge,
        title: "Higher effort",
        description: "More control over AI reasoning",
        className: "border-pink-400/[0.14] bg-pink-400/[0.06] text-pink-300",
      },
    ],
  },

  MAX: {
    label: "Max",
    eyebrow: "MAX ACCESS",
    description:
      "Unlock this model plus the full set of advanced models and controls.",
    features: [
      {
        icon: Zap,
        title: "500",
        description: "generations / billing period",
        className:
          "border-violet-400/[0.14] bg-violet-400/[0.06] text-violet-300",
      },
      {
        icon: BrainCircuit,
        title: "All Pro models",
        description: "Full access to Pro model lineup",
        className:
          "border-fuchsia-400/[0.14] bg-fuchsia-400/[0.06] text-fuchsia-300",
      },
      {
        icon: Gauge,
        title: "Maximum control",
        description: "Higher AI effort levels",
        className: "border-pink-400/[0.14] bg-pink-400/[0.06] text-pink-300",
      },
    ],
  },
};

export default function PlanRequiredModal({
  model,
  open,
  onClose,
  onUpgrade,
  currentPlan = "FREE",
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !model) return null;

  const requiredPlan = model.minimumPlan;
  const planContent = PLAN_CONTENT[requiredPlan];

  if (!planContent) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-required-title"
        className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0b0b0e] shadow-[0_35px_120px_rgba(0,0,0,0.72)]"
      >
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-64 w-64 rounded-full bg-violet-600/[0.16] blur-[100px]" />
        <div className="pointer-events-none absolute -right-28 top-0 h-64 w-64 rounded-full bg-fuchsia-500/[0.12] blur-[100px]" />

        {/* ================= HERO ================= */}
        <div className="relative min-h-[190px] overflow-hidden border-b border-white/[0.07]">
          <div className="absolute inset-0 bg-linear-to-br from-violet-500/[0.14] via-fuchsia-500/[0.045] to-transparent" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
              maskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />

          {/* Decorative rings */}
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full border border-white/[0.05]" />
          <div className="absolute right-[-5px] -top-10 h-40 w-40 rounded-full border border-violet-300/[0.07]" />
          <div className="absolute right-[24%] top-[32%] h-1.5 w-1.5 rounded-full bg-violet-300/70 shadow-[0_0_18px_rgba(167,139,250,0.9)]" />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-black/20 text-neutral-500 backdrop-blur-md transition hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white sm:right-5 sm:top-5"
          >
            <X size={15} />
          </button>

          {/* Hero content */}
          <div className="relative flex min-h-[190px] items-end px-5 pb-6 pt-14 sm:px-7 sm:pb-7">
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-violet-300/[0.18] bg-violet-400/[0.08]">
                  <Lock size={13} className="text-violet-300" />
                </div>

                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-violet-200/70 sm:text-[10px]">
                  {planContent.eyebrow}
                </span>
              </div>

              <h2
                id="plan-required-title"
                className="max-w-[540px] text-[28px] font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-[36px]"
              >
                {model.label}
                <span className="text-neutral-600"> requires </span>
                <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  {planContent.label}.
                </span>
              </h2>

              <p className="mt-3 max-w-[500px] text-[12px] leading-5 text-neutral-400 sm:text-[13px] sm:leading-6">
                {planContent.description}
              </p>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative px-5 py-5 sm:px-7 sm:py-6">
          {/* Selected model */}
          <div className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3.5 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-violet-400/[0.12] bg-violet-400/[0.06]">
              <Sparkles size={14} className="text-violet-300" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-neutral-200">
                {model.label}
              </div>

              {model.description && (
                <div className="mt-0.5 truncate text-[10px] text-neutral-500">
                  {model.description}
                </div>
              )}
            </div>

            <div className="shrink-0 rounded-md border border-violet-400/[0.14] bg-violet-400/[0.06] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-violet-300">
              {requiredPlan}
            </div>
          </div>

          {/* Features */}
          <div className="mt-5">
            <div className="mb-3 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-600">
              What you unlock
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {planContent.features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${feature.className}`}
                      >
                        <Icon size={13} />
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white">
                          {feature.title}
                        </div>

                        <div className="mt-0.5 text-[10px] leading-4 text-neutral-500">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current plan */}
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
            <div>
              <div className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-600">
                Current plan
              </div>

              <div className="mt-1 text-xs font-medium text-neutral-300">
                {currentPlan}
              </div>
            </div>

            <div className="text-right text-[10px] text-neutral-600">
              Upgrade to unlock
            </div>
          </div>

          {/* CTA */}
          <div className="relative mt-5 overflow-hidden rounded-lg border border-violet-400/[0.14] bg-linear-to-r from-violet-500/[0.08] via-fuchsia-500/[0.04] to-transparent">
            <div className="absolute inset-y-0 left-0 w-[2px] bg-linear-to-b from-violet-400 via-fuchsia-400 to-pink-400" />

            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <div className="text-xs font-medium text-white">
                  Unlock {model.label}
                </div>

                <div className="mt-0.5 text-[10px] text-neutral-500">
                  Get {planContent.label} access to continue.
                </div>
              </div>

              <button
                type="button"
                onClick={() => onUpgrade?.(requiredPlan)}
                className="group flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-md bg-white px-4 text-[11px] font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.985] sm:w-auto"
              >
                View plans
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 block w-full text-center text-[10px] text-neutral-600 transition-colors hover:text-neutral-400"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
