"use client";

import Link from "next/link";
import { ArrowRight, Search, Sparkles, Wand2, LayoutGrid } from "lucide-react";

export default function ExamplesHero() {
  const categories = [
    "All",
    "Buttons",
    "Cards",
    "Navbars",
    "Pricing",
    "Forms",
    "Dashboards",
    "Authentication",
    "Charts",
    "Loaders",
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-neutral-950">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-24 h-137.5 w-137.5 -translate-x-1/2 rounded-full bg-purple-700/20 blur-[120px]" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-pink-600/10 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-36 pb-24">
        {/* Badge */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-purple-400" />

          <span className="text-sm font-medium text-purple-300">
            500+ AI Generated Components
          </span>
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-center text-6xl font-black tracking-tight text-white md:text-7xl">
          Explore beautiful
          <br />
          <span className="bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AI Generated UI
          </span>
        </h1>

        {/* Subtitle */}

        <p className="mt-8 max-w-3xl text-center text-xl leading-8 text-neutral-400">
          Browse hundreds of production-ready components generated with
          ComponentLab. Clone them, remix them, or use them as inspiration for
          your next project.
        </p>

        {/* Search */}

        <div className="mt-14 flex w-full max-w-3xl items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl shadow-2xl shadow-purple-900/10">
          <Search className="h-5 w-5 text-neutral-500" />

          <input
            placeholder="Search components..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-neutral-500"
          />

          <button className="rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 text-sm font-semibold transition hover:scale-[1.03]">
            Search
          </button>
        </div>

        {/* Categories */}

        <div className="mt-10 flex max-w-6xl flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                index === 0
                  ? "border-purple-500 bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-purple-700/20"
                  : "border-white/10 bg-white/5 text-neutral-300 hover:border-purple-500/40 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}

        <div className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            {
              icon: Wand2,
              title: "1,240",
              subtitle: "Components",
            },
            {
              icon: LayoutGrid,
              title: "32",
              subtitle: "Categories",
            },
            {
              icon: Sparkles,
              title: "14k+",
              subtitle: "Generations",
            },
            {
              icon: ArrowRight,
              title: "React",
              subtitle: "Coming Soon",
            },
          ].map((item) => (
            <div
              key={item.subtitle}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-500/30"
            >
              <item.icon className="mb-5 h-6 w-6 text-purple-400" />

              <h3 className="text-3xl font-bold text-white">{item.title}</h3>

              <p className="mt-2 text-neutral-400">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-20 flex gap-5">
          <Link
            href="/workspace"
            className="rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 font-semibold text-white transition hover:scale-[1.03]"
          >
            Start Creating
          </Link>

          <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
            Browse Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
