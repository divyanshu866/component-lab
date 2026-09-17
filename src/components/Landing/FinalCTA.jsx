import { ArrowRight, Check, Sparkles } from "lucide-react";
import GlowOrb from "./GlowOrb";
import Link from "next/link";

const BENEFITS = [
  "Describe what you need",
  "Get editable code",
  "Preview instantly",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-8 sm:px-8 sm:pb-28 lg:px-10 lg:pt-10">
      {/* <GlowOrb className="left-1/2 top-[-8rem] h-[32rem] w-[32rem] -translate-x-1/2 bg-violet-600/[0.14]" /> */}

      <div className="relative mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/15 bg-[#111117] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          {/* Background atmosphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_55%)]"
          />

          {/* Subtle grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]"
          />

          <div className="relative px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 shadow-[0_0_30px_rgba(139,92,246,0.12)]">
              <Sparkles className="h-5 w-5 text-violet-200" />
            </div>

            {/* Eyebrow */}
            <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/70">
              Start building
            </div>

            {/* Heading */}
            <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-[58px] lg:leading-[1.02]">
              Stop starting from
              <br className="hidden sm:block" />
              <span className="text-zinc-400"> a blank editor.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              Describe the interface. Generate the implementation. Refine it
              until it is ready for your project.
            </p>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/workspace"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200 sm:w-auto"
              >
                Start building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Benefit strip */}
            <div className="mx-auto mt-9 flex max-w-2xl flex-col items-center justify-center gap-2.5 text-[11px] text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {BENEFITS.map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/10">
                    <Check className="h-2.5 w-2.5 text-emerald-400" />
                  </span>
                  {benefit}
                </span>
              ))}
            </div>

            {/* Product status */}
            <div className="mx-auto mt-10 flex max-w-md items-center justify-between rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-2.5 text-[9px] text-zinc-600 backdrop-blur-sm sm:px-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ready when you are
              </div>

              <div className="hidden sm:block">
                React · Live preview · Editable source
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
