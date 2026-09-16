"use client";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Play,
  Sparkles,
} from "lucide-react";
import GlowOrb from "./GlowOrb";
import { useEffect, useState } from "react";
import Link from "next/link";
function HeroWorkspace() {
  const [promptIndex, setPromptIndex] = useState(0);

  const prompts = [
    "Build a responsive pricing card with three plans",
    "Create a modern analytics dashboard",
    "Build a responsive navigation bar",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((current) => (current + 1) % prompts.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [prompts.length]);

  return (
    // EXTRACT THIS COMPONENT → components/Landing/HeroWorkspace.jsx
    <div className="relative mx-auto w-full max-w-[720px]">
      <GlowOrb className="-right-16 top-10 h-72 w-72 bg-violet-600/15" />
      <GlowOrb className="bottom-0 left-0 h-64 w-64 bg-fuchsia-500/10" />

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0d0d11] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        {/* Browser / workspace chrome */}
        <div className="flex h-12 items-center justify-between border-b border-white/[0.07] bg-[#0a0a0d] px-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </div>

          <div className="hidden rounded-lg border border-white/[0.06] bg-white/[0.025] px-4 py-1.5 text-[11px] text-zinc-600 sm:block">
            componentsdev.com/workspace
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Ready
          </div>
        </div>

        {/* Prompt */}
        <div className="border-b border-white/[0.07] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">
              AI prompt
            </span>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
            <div className="flex min-h-[48px] items-center text-sm leading-6 text-zinc-300 sm:text-[15px]">
              {prompts[promptIndex]}
              <span className="ml-1 inline-block h-4 w-px animate-pulse bg-violet-400" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <span className="rounded-md border border-white/[0.06] px-2 py-1">
                  React
                </span>
                <span className="rounded-md border border-white/[0.06] px-2 py-1">
                  Tailwind
                </span>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-violet-500 px-3 py-2 text-xs font-semibold text-white"
              >
                Generate
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Workspace body */}
        <div className="grid min-h-[330px] grid-cols-1 sm:grid-cols-[0.9fr_1.1fr]">
          {/* Code */}
          <div className="border-b border-white/[0.07] sm:border-b-0 sm:border-r">
            <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-4">
              <div className="flex gap-4 text-[11px]">
                <span className="border-b border-violet-400 py-3 text-violet-300">
                  JSX
                </span>
                <span className="py-3 text-zinc-600">CSS</span>
              </div>

              <Copy className="h-3.5 w-3.5 text-zinc-700" />
            </div>

            <div className="space-y-2 p-4 font-mono text-[10px] leading-5 text-zinc-600 sm:text-[11px]">
              <div>
                <span className="text-violet-400">export default</span>{" "}
                <span className="text-zinc-400">function Pricing()</span>
              </div>

              <div className="pl-3">
                <span className="text-zinc-600">return</span>{" "}
                <span className="text-fuchsia-300">&lt;section</span>
              </div>

              <div className="pl-6">
                <span className="text-emerald-300">className</span>
                <span className="text-zinc-700">=</span>
                <span className="text-yellow-200">{"rounded-2xl ..."}</span>
              </div>

              <div className="pl-6 text-zinc-500">
                {/* generated component */}
              </div>

              <div className="pl-3">
                <span className="text-fuchsia-300">&lt;/section&gt;</span>
              </div>

              <div className="text-zinc-700">...</div>
            </div>
          </div>

          {/* Live preview */}
          <div className="relative min-h-[260px] bg-[#09090c]">
            <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-4">
              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <Play className="h-3 w-3 text-emerald-400" />
                Live preview
              </div>

              <span className="text-[10px] text-zinc-700">Preview</span>
            </div>

            <div className="flex h-[270px] items-center justify-center p-6">
              <div className="w-full max-w-[260px] rounded-2xl border border-white/[0.1] bg-white/[0.045] p-5 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="h-2 w-16 rounded-full bg-white/20" />
                    <div className="mt-2 h-6 w-24 rounded bg-white/10" />
                  </div>

                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] text-emerald-300">
                    Popular
                  </div>
                </div>

                <div className="mb-5 space-y-2">
                  <div className="h-2 w-full rounded-full bg-white/[0.08]" />
                  <div className="h-2 w-4/5 rounded-full bg-white/[0.06]" />
                  <div className="h-2 w-3/5 rounded-full bg-white/[0.06]" />
                </div>

                <div className="mb-5 flex items-end gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-white">
                    $29
                  </span>
                  <span className="pb-1 text-xs text-zinc-600">/month</span>
                </div>

                <div className="h-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Workspace footer */}
        <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 text-[10px] text-zinc-600">
          <span>Generated component</span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Preview synced
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Hero() {
  return (
    // EXTRACT THIS COMPONENT → components/Landing/Hero.jsx
    <section className="relative overflow-hidden px-5 pb-24 pt-40 sm:px-8 lg:px-10 lg:pb-32 lg:pt-48">
      <GlowOrb className="left-[15%] top-24 h-80 w-80 bg-violet-600/10" />
      <GlowOrb className="right-[10%] top-40 h-72 w-72 bg-fuchsia-500/10" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.07] px-3.5 py-2 text-xs font-medium text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered component development
            </div>

            <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Describe it.
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                ComponentLab builds it.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Generate UI components from natural language, preview them
              instantly, and refine the code until it is exactly what you need.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workspace"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Start building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="#workflow"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                See how it works
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-zinc-600">
              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Live preview
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Editable source
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                AI iteration
              </span>
            </div>
          </div>

          <HeroWorkspace />
        </div>
      </div>
    </section>
  );
}
