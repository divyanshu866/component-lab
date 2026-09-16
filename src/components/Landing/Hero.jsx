"use client";

import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  MoreHorizontal,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";
import GlowOrb from "./GlowOrb";
import Link from "next/link";
import { useEffect, useState } from "react";

const DEMOS = [
  {
    name: "Pricing Card",
    prompt: "Build a responsive pricing card with three plans",
    response:
      "Created a responsive pricing section with three pricing tiers, a highlighted popular plan, and responsive spacing.",
    components: ["Pricing Card", "Feature Grid"],
    code: [
      ["import", " PricingCard from './PricingCard'"],
      ["", ""],
      ["export default function ", "Pricing()"],
      ["  return (", ""],
      ["    <section className=", '"grid gap-6 lg:grid-cols-3">'],
      ["      <PricingCard", ' plan="starter" />'],
      ["      <PricingCard", ' plan="pro" featured />'],
      ["      <PricingCard", ' plan="team" />'],
      ["    </section>", ""],
      ["  )", "}"],
    ],
    preview: "pricing",
  },
  {
    name: "Analytics Dashboard",
    prompt: "Create a modern analytics dashboard",
    response:
      "Built a responsive analytics dashboard with summary metrics, activity data, and a clean visual hierarchy.",
    components: ["Analytics", "Pricing Card"],
    code: [
      ["import", " MetricCard from './MetricCard'"],
      ["", ""],
      ["export default function ", "Dashboard()"],
      ["  return (", ""],
      ["    <main className=", '"grid gap-4 md:grid-cols-3">'],
      ["      <MetricCard", ' label="Revenue" />'],
      ["      <MetricCard", ' label="Customers" />'],
      ["      <MetricCard", ' label="Conversion" />'],
      ["    </main>", ""],
      ["  )", "}"],
    ],
    preview: "dashboard",
  },
  {
    name: "Navigation",
    prompt: "Build a responsive navigation bar",
    response:
      "Created a responsive navigation system with a desktop menu, active state, and mobile-friendly layout.",
    components: ["Navigation", "Analytics"],
    code: [
      ["export default function ", "Navbar()"],
      ["  return (", ""],
      ["    <nav className=", '"flex items-center justify-between"'],
      ["      <Logo />", ""],
      ["      <div className=", '"hidden gap-6 md:flex">'],
      ["        <a href=", '"/products">Products</a>'],
      ["        <a href=", '"/pricing">Pricing</a>'],
      ["        <a href=", '"/about">About</a>'],
      ["      </div>", ""],
      ["    </nav>", ""],
      ["  )", "}"],
    ],
    preview: "navigation",
  },
];

function Preview({ type }) {
  return (
    <div className="relative h-[292px] w-full overflow-hidden">
      {/* Pricing */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-5 transition-all duration-500 ${
          type === "pricing"
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[0.985] opacity-0"
        }`}
      >
        <div className="w-full max-w-[310px] rounded-[18px] border border-zinc-200 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-violet-500">
                Pricing
              </div>

              <div className="mt-1 text-[13px] font-semibold tracking-tight text-zinc-900">
                Choose your plan
              </div>

              <div className="mt-1 text-[8px] text-zinc-400">
                Simple pricing for growing teams.
              </div>
            </div>

            <div className="rounded-full bg-emerald-50 px-2 py-1 text-[7px] font-medium text-emerald-600">
              Save 20%
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              {
                name: "Starter",
                price: "$9",
                description: "For individuals",
              },
              {
                name: "Pro",
                price: "$29",
                description: "For growing teams",
                featured: true,
              },
              {
                name: "Team",
                price: "$79",
                description: "For larger teams",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-3 ${
                  plan.featured
                    ? "border-violet-300 bg-violet-50/70 shadow-[0_8px_25px_rgba(124,58,237,0.10)]"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-medium text-zinc-500">
                    {plan.name}
                  </span>

                  {plan.featured && (
                    <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[6px] font-medium text-violet-600">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-2 text-[17px] font-semibold tracking-tight text-zinc-900">
                  {plan.price}
                </div>

                <div className="mt-0.5 text-[6px] text-zinc-400">/ month</div>

                <div className="mt-2 text-[7px] leading-3 text-zinc-400">
                  {plan.description}
                </div>

                <div
                  className={`mt-3 rounded-lg py-1.5 text-center text-[7px] font-semibold ${
                    plan.featured
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  Get started
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-5 transition-all duration-500 ${
          type === "dashboard"
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[0.985] opacity-0"
        }`}
      >
        <div className="w-full max-w-[320px] rounded-[18px] border border-zinc-200 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-violet-500">
                Analytics
              </div>

              <div className="mt-1 text-[13px] font-semibold tracking-tight text-zinc-900">
                Overview
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 px-2 py-1 text-[7px] text-zinc-400">
              Last 30 days
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["Revenue", "$48.2k", "+12.4%"],
              ["Users", "12.4k", "+8.7%"],
              ["Conversion", "6.8%", "+2.1%"],
            ].map(([label, value, growth]) => (
              <div
                key={label}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-2.5"
              >
                <div className="text-[7px] text-zinc-400">{label}</div>

                <div className="mt-1 text-[12px] font-semibold text-zinc-900">
                  {value}
                </div>

                <div className="mt-1 text-[6px] font-medium text-emerald-500">
                  {growth}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-zinc-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] font-medium text-zinc-600">
                  Revenue
                </div>

                <div className="mt-0.5 text-[7px] text-zinc-400">
                  Monthly performance
                </div>
              </div>

              <div className="text-[7px] font-medium text-emerald-500">
                +12.4%
              </div>
            </div>

            <div className="mt-4 flex h-16 items-end gap-1">
              {[28, 42, 36, 57, 49, 63, 55, 71, 67, 82, 74, 91].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t bg-gradient-to-t from-violet-500/80 to-fuchsia-400/80"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-violet-100" />
              <div>
                <div className="h-1.5 w-16 rounded bg-zinc-200" />
                <div className="mt-1 h-1.5 w-10 rounded bg-zinc-100" />
              </div>
            </div>

            <div className="text-[7px] font-medium text-zinc-400">2m ago</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-5 transition-all duration-500 ${
          type === "navigation"
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[0.985] opacity-0"
        }`}
      >
        <div className="w-full max-w-[320px] overflow-hidden rounded-[18px] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <div className="border-b border-zinc-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-950">
                  <div className="h-2.5 w-2.5 rounded-sm bg-white" />
                </div>

                <span className="text-[10px] font-semibold text-zinc-900">
                  Acme
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[7px] font-medium text-zinc-900">
                  Product
                </span>

                <span className="text-[7px] text-zinc-400">Solutions</span>

                <span className="text-[7px] text-zinc-400">Pricing</span>

                <div className="rounded-md bg-zinc-900 px-2 py-1.5 text-[6px] font-semibold text-white">
                  Start free
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-6 py-10 text-center">
            <div className="absolute left-1/2 top-[-35px] h-32 w-32 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto inline-flex rounded-full border border-violet-200 bg-white/80 px-2 py-1 text-[6px] font-medium text-violet-600 shadow-sm">
                New · Built for modern teams
              </div>

              <div className="mx-auto mt-3 max-w-[220px] text-[20px] font-semibold leading-6 tracking-[-0.04em] text-zinc-900">
                Build better products,
                <span className="text-violet-500"> faster.</span>
              </div>

              <div className="mx-auto mt-2 max-w-[195px] text-[7px] leading-3.5 text-zinc-400">
                A simple workflow for teams that want to move from idea to
                production quickly.
              </div>

              <div className="mt-4 flex justify-center gap-2">
                <div className="rounded-lg bg-zinc-900 px-3 py-2 text-[7px] font-semibold text-white">
                  Get started
                </div>

                <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[7px] font-medium text-zinc-600">
                  Learn more
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroWorkspace() {
  const [demoIndex, setDemoIndex] = useState(0);

  const demo = DEMOS[demoIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDemoIndex((current) => (current + 1) % DEMOS.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-16 sm:mt-20 lg:mt-24">
      <GlowOrb className="-right-32 top-20 h-96 w-96 bg-violet-600/[0.12]" />
      <GlowOrb className="-left-32 bottom-0 h-96 w-96 bg-fuchsia-500/[0.08]" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* Window frame */}
        <div className="overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#0b0b0e] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          {/* Browser chrome */}
          <div className="flex h-11 items-center justify-between border-b border-white/[0.07] bg-[#09090c] px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            </div>

            <div className="hidden rounded-md border border-white/[0.06] bg-white/[0.02] px-5 py-1 text-[10px] text-zinc-600 sm:block">
              componentsdev.com/workspace
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-orange-400/30 bg-orange-400/10">
                <span className="text-[9px] text-orange-300">↗</span>
              </div>

              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.025]">
                <MoreHorizontal className="h-3.5 w-3.5 text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Workspace */}
          <div className="grid min-h-[560px] lg:grid-cols-[205px_minmax(0,1fr)_390px]">
            {/* Sidebar */}
            <aside className="hidden border-r border-white/[0.07] bg-[#09090b] lg:block">
              <div className="border-b border-white/[0.07] p-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.05]">
                    <Plus className="h-3.5 w-3.5 text-zinc-300" />
                  </div>

                  <span className="text-[11px] text-zinc-300">
                    New Component
                  </span>

                  <span className="ml-auto text-[9px] text-zinc-700">⌘ K</span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                  Recent components
                </div>

                <div className="space-y-1">
                  {demo.components.map((component, index) => (
                    <div
                      key={component}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] transition-all duration-500 ${
                        index === 0
                          ? "bg-white/[0.09] text-zinc-200"
                          : "text-zinc-600"
                      }`}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
                      {component}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute" />
            </aside>

            {/* Center */}
            <main className="min-w-0 bg-[#08080a]">
              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-3 sm:px-4">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-2 border-b border-violet-400 px-3 py-3 text-[10px] text-zinc-200">
                    <span className="text-cyan-400">⚛</span>
                    JSX
                  </div>

                  <div className="flex items-center gap-2 px-3 py-3 text-[10px] text-zinc-600">
                    <span className="text-sky-400">▣</span>
                    CSS
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-yellow-400/30 px-3 py-1.5 text-[10px] text-yellow-300/90">
                    <Sparkles className="h-3 w-3" />
                    AI
                  </div>
                </div>

                <div className="hidden rounded-lg border border-white/[0.07] px-3 py-1.5 text-[9px] text-zinc-600 sm:block">
                  REACT
                </div>
              </div>

              {/* Model */}
              <div className="border-b border-white/[0.07] px-4 py-3">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <Sparkles className="h-3 w-3 text-violet-400" />
                  Gemini 3.5 Flash-Lite
                  <ChevronRight className="h-3 w-3 rotate-90 text-zinc-700" />
                </div>
              </div>

              {/* Chat */}
              <div className="flex min-h-[445px] flex-col px-4 py-5 sm:px-6">
                <div className="flex justify-end">
                  <div className="max-w-[82%] rounded-2xl rounded-br-md bg-violet-600 px-4 py-2.5 text-[10px] leading-5 text-white shadow-lg shadow-violet-950/20 transition-all duration-500">
                    {demo.prompt}
                  </div>
                </div>

                <div className="mt-5 max-w-[92%] rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.025] px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/10">
                      <Sparkles className="h-2.5 w-2.5 text-violet-300" />
                    </div>

                    <span className="text-[9px] font-medium text-zinc-500">
                      ComponentLab
                    </span>
                  </div>

                  <p
                    key={demoIndex}
                    className="mt-3 text-[11px] leading-5 text-zinc-300 animate-[fadeIn_0.4s_ease-out]"
                  >
                    {demo.response}
                  </p>

                  <div className="mt-4 rounded-xl border border-violet-400/10 bg-violet-400/[0.035] px-3 py-2.5">
                    <div className="flex items-center gap-2 text-[9px] text-violet-300/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                      Generating component
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        key={demoIndex}
                        className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 animate-[generate_2s_ease-in-out_infinite]"
                      />
                    </div>
                  </div>
                </div>

                {/* Code preview */}
                <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b0b0e]">
                  <div className="flex h-8 items-center justify-between border-b border-white/[0.06] px-3">
                    <span className="text-[9px] text-zinc-600">
                      Generated JSX
                    </span>

                    <Copy className="h-3 w-3 text-zinc-700" />
                  </div>

                  <div className="space-y-1 px-3 py-3 font-mono text-[9px] leading-4">
                    {demo.code.map(([prefix, value], index) => (
                      <div
                        key={`${demoIndex}-${index}`}
                        className={`flex ${
                          index === 4 ? "rounded bg-violet-400/[0.05]" : ""
                        }`}
                      >
                        <span className="mr-3 w-4 shrink-0 text-right text-zinc-800">
                          {index + 1}
                        </span>

                        <span>
                          <span className="text-violet-400">{prefix}</span>
                          <span className="text-zinc-400">{value}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composer */}
                <div className="mt-3 flex items-center rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5">
                  <span className="text-[10px] text-zinc-600">
                    Describe changes...
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[9px] text-zinc-700">Auto</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500/70">
                      <ArrowRight className="h-3 w-3 rotate-[-45deg] text-zinc-200" />
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Preview */}
            <section className="border-t border-white/[0.07] bg-[#070709] lg:border-l lg:border-t-0">
              <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-4">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <Play className="h-3 w-3 text-emerald-400" />
                  Live preview
                </div>

                <div className="flex items-center gap-2 text-[9px] text-zinc-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Synced
                </div>
              </div>

              <div className="flex min-h-[330px] items-center justify-center bg-[#f4f6f8] p-5 sm:min-h-[360px]">
                <div
                  key={demoIndex}
                  className="w-full animate-[previewIn_0.55s_ease-out]"
                >
                  <Preview type={demo.preview} />
                </div>
              </div>

              <div className="hidden border-t border-white/[0.07] px-4 py-3 lg:block">
                <div className="flex items-center justify-between text-[9px] text-zinc-600">
                  <span>React</span>
                  <span>Preview synced</span>
                </div>
              </div>
            </section>
          </div>

          {/* Window footer */}
          <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#09090c] px-4 py-2.5">
            <div className="text-[9px] text-zinc-700">{demo.name}</div>

            <div className="flex items-center gap-4 text-[9px] text-zinc-700">
              <span>JSX</span>
              <span>CSS</span>
              <span>AI</span>
            </div>
          </div>
        </div>

        {/* Demo indicator */}
        <div className="mt-5 flex justify-center gap-2">
          {DEMOS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setDemoIndex(index)}
              aria-label={`Show ${item.name} demo`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === demoIndex ? "w-6 bg-violet-400" : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-28 pt-36 sm:px-8 sm:pt-44 lg:px-10 lg:pb-36 lg:pt-48">
      <GlowOrb className="left-[10%] top-24 h-96 w-96 bg-violet-600/[0.08]" />
      <GlowOrb className="right-[5%] top-40 h-96 w-96 bg-fuchsia-500/[0.07]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Hero copy */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3.5 py-2 text-xs font-medium text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered component development
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-[76px] lg:leading-[0.98]">
            Build interfaces
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              by describing them.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Generate components with AI, edit the source, and see every change
            instantly in a live preview.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-zinc-600">
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes previewIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes generate {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(170%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
