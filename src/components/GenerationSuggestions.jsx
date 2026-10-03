"use client";

import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  Image,
  LayoutDashboard,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const suggestions = [
  {
    title: "Image gallery",
    prompt:
      "Create an editorial-grade image gallery with a distinctive art-directed layout rather than a standard masonry grid. Use striking image composition, varied image scales, intentional whitespace, sophisticated typography, subtle metadata or captions, refined hover transitions, and a cohesive premium visual direction. Make it feel like a high-end creative portfolio or design publication rather than a generic component. Use realistic image URLs and polished responsive behavior. Prioritize visual personality, composition, and restraint.",
    icon: Image,
  },
  {
    title: "SaaS pricing",
    prompt:
      "Create a premium pricing experience for a sophisticated SaaS product. Avoid the typical three equal pricing cards. Use a distinctive composition with strong typographic hierarchy, deliberate asymmetry or a strong featured plan, nuanced borders and surfaces, thoughtful feature grouping, a polished billing toggle, subtle interaction states, and a clear visual conversion path. Give it a confident product identity with refined spacing, depth, and details that make it feel designed rather than templated. Keep the interface restrained and highly polished.",
    icon: CreditCard,
  },
  {
    title: "Landing hero",
    prompt:
      "Create an art-directed, high-end landing page hero for a premium technology product. Avoid the generic centered headline + buttons + screenshot layout. Use a distinctive composition, sophisticated typography, strong visual hierarchy, layered depth, subtle gradients or atmospheric elements, and an original product-focused visual treatment. Include convincing copy, restrained motion-ready interactions, and responsive behavior. The result should feel like a carefully designed flagship product website, not a standard SaaS template.",
    icon: WandSparkles,
  },
  {
    title: "Admin dashboard",
    prompt:
      "Create a premium command-center style admin dashboard with a distinctive product identity. Avoid the standard sidebar + rows of KPI cards + generic table layout. Use strong information hierarchy, interesting but practical composition, refined data presentation, contextual actions, meaningful visual grouping, sophisticated typography, and subtle depth. Make the dashboard feel like a polished product used by a real team, with realistic data and purposeful interactions rather than decorative filler.",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    prompt:
      "Create an editorial-quality analytics dashboard with a distinctive visual system and sophisticated data presentation. Avoid generic KPI-card grids and default chart layouts. Use an intentional composition with a strong primary metric, complementary visualizations, contextual labels, useful comparisons, realistic data, and elegant spacing. Give charts and data a refined visual treatment with subtle interaction states and excellent hierarchy. The result should feel like a premium financial, product, or intelligence tool rather than a dashboard template.",
    icon: BarChart3,
  },
];

export default function GenerationSuggestions({
  onGenerate,
  disabled = false,
}) {
  const handleGenerate = (prompt) => {
    if (disabled) return;
    onGenerate?.(prompt);
  };

  return (
    <section
      aria-label="Example prompts"
      className="
        w-full
        min-w-0
      "
    >
      <div className="relative min-w-0">
        <div
          aria-label="Example generation prompts"
          className="flex min-w-0 gap-2 overflow-x-auto pb-1 pr-1 snap-x snap-mandatory sm:flex-wrap sm:overflow-visible sm:pb-0 sm:pr-0"
        >
          {suggestions.map(({ title, prompt, icon: Icon }) => (
            <button
              key={title}
              type="button"
              onClick={() => handleGenerate(prompt)}
              disabled={disabled}
              className="group inline-flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-xl border border-white/[0.075] bg-white/[0.022] px-3.5 py-2 text-left text-[12.5px] font-medium text-white/75 transition-all duration-150 hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-white/[0.045] hover:text-white hover:shadow-[0_6px_18px_rgba(0,0,0,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 disabled:pointer-events-none disabled:opacity-40 sm:min-h-9 sm:rounded-lg sm:px-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.025] text-white/45 transition-colors group-hover:border-violet-400/15 group-hover:bg-violet-400/[0.07] group-hover:text-violet-200 sm:h-5.5 sm:w-5.5">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>

              <span className="whitespace-nowrap">{title}</span>

              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 text-white/25 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300"
                strokeWidth={1.8}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
