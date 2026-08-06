"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Eye,
  Download,
  Sparkles,
  Wand2,
  Copy,
} from "lucide-react";

const featured = [
  {
    id: 1,
    title: "AI Dashboard",
    category: "Dashboard",
    framework: "HTML",
    color: "from-pink-700 via-purple-700 to-indigo-500",
    description:
      "Modern analytics dashboard with animated cards, charts and sidebar.",
  },
  {
    id: 2,
    title: "Pricing Section",
    category: "Marketing",
    framework: "React",
    color: "from-cyan-500 via-blue-500 to-indigo-500",
    description:
      "Animated pricing cards with glassmorphism and spotlight effects.",
  },
];

const examples = [
  {
    id: 1,
    title: "Glass Login",
    category: "Authentication",
    framework: "HTML",
    likes: 421,
    views: "12.4k",
    downloads: 923,
    prompt: "Create a premium glassmorphism login form with floating labels.",
  },
  {
    id: 2,
    title: "Chat Interface",
    category: "AI",
    framework: "React",
    likes: 182,
    views: "8.1k",
    downloads: 421,
    prompt: "Design a modern AI chat interface inspired by ChatGPT.",
  },
  {
    id: 3,
    title: "Pricing Cards",
    category: "Marketing",
    framework: "Vue",
    likes: 301,
    views: "9.7k",
    downloads: 812,
    prompt: "Premium pricing cards with featured plan and hover animations.",
  },
  {
    id: 4,
    title: "Sidebar",
    category: "Dashboard",
    framework: "HTML",
    likes: 146,
    views: "4.8k",
    downloads: 212,
    prompt: "Dark dashboard sidebar with expandable navigation groups.",
  },
  {
    id: 5,
    title: "Hero Section",
    category: "Landing Page",
    framework: "React",
    likes: 531,
    views: "18k",
    downloads: 1204,
    prompt: "Modern SaaS hero with gradients, floating illustrations and CTA.",
  },
  {
    id: 6,
    title: "Settings Page",
    category: "Settings",
    framework: "HTML",
    likes: 201,
    views: "6.4k",
    downloads: 318,
    prompt: "Apple-inspired settings page with grouped preferences.",
  },
];

const frameworkStyles = {
  HTML: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-300",
  },
  React: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-300",
  },
  Vue: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
  },
};

function FrameworkBadge({ framework }) {
  const style = frameworkStyles[framework] || frameworkStyles.HTML;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${style.bg} ${style.border} ${style.text}`}
    >
      {framework}
    </span>
  );
}

function FakePreview() {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
      <div className="absolute inset-0 bg-linear-to-br from-pink-500/30 via-purple-500/20 to-transparent" />

      <div className="absolute left-8 top-8 w-44 rounded-xl bg-white/10 p-4 backdrop-blur-xl">
        <div className="mb-3 h-4 w-24 rounded-full bg-white/20" />

        <div className="mb-2 h-2 rounded-full bg-white/10" />

        <div className="mb-2 h-2 w-5/6 rounded-full bg-white/10" />

        <div className="h-2 w-2/3 rounded-full bg-white/10" />
      </div>

      <div className="absolute bottom-8 right-8 w-40 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 rounded-lg bg-white/10" />
          <div className="h-10 rounded-lg bg-white/10" />
          <div className="h-10 rounded-lg bg-white/10" />
          <div className="h-10 rounded-lg bg-white/10" />
        </div>
      </div>

      <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-600/30 blur-3xl" />
    </div>
  );
}

function ExampleCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_0_80px_rgba(168,85,247,.15)]">
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <FrameworkBadge framework={item.framework} />

          <button className="rounded-xl bg-white/5 p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white">
            <ArrowUpRight size={16} />
          </button>
        </div>

        <FakePreview />

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>

          <p className="mt-1 text-sm text-purple-300">{item.category}</p>

          <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
              <Wand2 size={15} />
              Prompt
            </div>

            <p className="line-clamp-3 text-sm leading-6 text-neutral-400">
              {item.prompt}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
        <div className="flex items-center gap-5 text-sm text-neutral-400">
          <span className="flex items-center gap-1">
            <Heart size={15} />

            {item.likes}
          </span>

          <span className="flex items-center gap-1">
            <Eye size={15} />

            {item.views}
          </span>

          <span className="flex items-center gap-1">
            <Download size={15} />

            {item.downloads}
          </span>
        </div>

        <button className="rounded-xl bg-linear-to-r from-pink-700 to-purple-700 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.03]">
          Use Template
        </button>
      </div>
    </article>
  );
}
export default function Grid() {
  return (
    <section className="relative bg-transparent py-24">
      {/* Background */}

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Featured */}

        <div className="mb-24">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
                <Sparkles size={15} className="text-purple-400" />

                <span className="text-sm text-purple-300">
                  Featured Components
                </span>
              </div>

              <h2 className="text-4xl font-bold text-white">
                Community Favorites
              </h2>
            </div>

            <Link
              href="/workspace"
              className="hidden rounded-2xl bg-linear-to-r from-pink-700 to-purple-700 px-6 py-3 font-medium text-white transition hover:scale-[1.03] lg:inline-flex"
            >
              Create Your Own
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featured.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_0_80px_rgba(168,85,247,.18)]"
              >
                <div className="p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <FrameworkBadge framework={item.framework} />

                    <ArrowUpRight className="text-neutral-500 transition group-hover:text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-md text-neutral-400">
                    {item.description}
                  </p>
                </div>

                <div className="px-8 pb-8">
                  <FakePreview />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}

        <div className="mb-14 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Explore Components
            </h2>

            <p className="mt-2 text-neutral-400">
              Beautiful production-ready UI generated by AI.
            </p>
          </div>

          <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10">
            View All
          </button>
        </div>

        {/* Gallery */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {examples.map((item) => (
            <ExampleCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}

        <div className="mt-32 overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-16 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2">
              <Sparkles className="mr-2 text-purple-400" size={16} />

              <span className="text-sm text-purple-300">Powered by AI</span>
            </div>

            <h2 className="text-5xl font-bold text-white">
              Generate your next component
              <span className="bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}
                in seconds.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
              Describe your idea in natural language and let ComponentLab
              generate production-ready UI with HTML, CSS, JavaScript and React
              support.
            </p>

            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
              <Link
                href="/workspace"
                className="rounded-2xl bg-gradient-to-r from-pink-700 to-purple-700 px-8 py-4 font-semibold text-white transition hover:scale-[1.03]"
              >
                Launch Workspace
              </Link>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
                Browse Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
