import { ArrowRight, Code2, Layers3, WandSparkles } from "lucide-react";

function Capabilities() {
  const benefits = [
    {
      icon: WandSparkles,
      title: "Describe the interface",
      description:
        "Start with a sentence, a rough idea, or a precise design brief. ComponentLab turns intent into usable UI.",
    },
    {
      icon: Layers3,
      title: "Iterate without rewrites",
      description:
        "Ask for spacing, states, responsive behavior, or a new visual direction without losing the component context.",
    },
    {
      icon: Code2,
      title: "Ship code you own",
      description:
        "Export readable components and integrate them into your existing codebase instead of locking your product into a hosted builder.",
    },
  ];
  return (
    <section
      id="capabilities"
      className="scroll-mt-20 border-y border-white/15 bg-[#0b0b12] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32 relative z-10">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-300 bg-violet-500/10 inline-block px-3 py-1 rounded-full border border-violet-500/20">
            Built for production teams
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
            Engineered for seamless codebase integration.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-3xl border border-white/15 bg-[#14141e] p-8 shadow-2xl transition hover:-translate-y-1 hover:border-violet-400/50 hover:bg-[#1a1a28]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/20 text-violet-200 shadow-md">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-8 text-lg font-semibold text-white">{title}</h3>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {description}
              </p>

              <div className="mt-8 flex items-center gap-1.5 text-xs font-medium text-violet-300 group-hover:text-violet-200">
                <span>Learn workflow</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Capabilities;
