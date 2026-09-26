"use client";

import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  Image,
  LayoutDashboard,
  MessageSquare,
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
    title: "AI chat",
    prompt:
      "Create a premium AI workspace interface with a strong visual identity rather than a generic chat UI. Design an elegant conversational experience with thoughtful message hierarchy, contextual actions, polished composer interactions, subtle status and activity states, intelligent spacing, and a refined product-like layout. Use a distinctive composition and visual language inspired by high-end developer or creative tools. Avoid unnecessary panels, excessive cards, and generic chatbot styling. Make every detail feel intentional.",
    icon: MessageSquare,
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
    <section aria-label="Example prompts" className="mx-auto mt-7">
      <div className="mb-2.5 flex items-center gap-2 px-0.5">
        <Sparkles
          className="h-3.5 w-3.5 text-violet-400/50"
          strokeWidth={1.8}
        />

        <span className="text-[11px] font-medium tracking-wide text-white/35">
          Need inspiration? Try one of these:
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;

          return (
            <button
              key={suggestion.title}
              type="button"
              disabled={disabled}
              onClick={() => handleGenerate(suggestion.prompt)}
              title={suggestion.prompt}
              aria-label={`Generate ${suggestion.title}`}
              className="
                group
                inline-flex
                h-9
                shrink-0
                items-center
                gap-2
                rounded-lg
                border
                border-white/[0.075]
                bg-white/[0.018]
                px-3
                text-left
                transition-all
                duration-150
                hover:border-violet-300/[0.18]
                hover:bg-violet-300/[0.045]
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-1
                focus-visible:ring-violet-400/50
                disabled:pointer-events-none
                disabled:opacity-40
              "
            >
              <Icon
                className="
                  h-3.5
                  w-3.5
                  shrink-0
                  text-white/35
                  transition-colors
                  duration-150
                  group-hover:text-violet-300
                "
                strokeWidth={1.7}
              />

              <span
                className="
                  text-[11.5px]
                  font-medium
                  tracking-[-0.005em]
                  text-white/55
                  transition-colors
                  duration-150
                  group-hover:text-white/85
                "
              >
                {suggestion.title}
              </span>

              <ArrowUpRight
                className="
                  h-3 w-3
                  shrink-0
                  text-white/15
                  transition-all
                  duration-150
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:text-violet-300/70
                "
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
