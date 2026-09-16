import { Check, MousePointer2 } from "lucide-react";

function Integrations() {
  return (
    <section
      id="integrations"
      className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32 relative"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-violet-600/20 blur-[140px] rounded-full" />
      </div>
      <div className="relative z-10 rounded-[32px] border border-violet-500/30 bg-gradient-to-br from-violet-950/80 via-[#101018] to-cyan-950/60 p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)] sm:p-12 lg:p-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-300 bg-violet-500/20 inline-block px-3 py-1 rounded-full border border-violet-500/30">
              Fits your stack
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
              Keep your repo architecture. Upgrade your velocity.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-300">
              Generate pure React components that require zero lock-in, dropping
              seamlessly into any standard module layout and pushing straight to
              production.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "React",
                "Next.js",
                "Tailwind CSS",
                "JavaScript",
                "Git workflows",
                "Modular Components",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-medium text-zinc-200 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-[#0d0d14] p-6 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/15 pb-4">
              <MousePointer2 className="h-4 w-4 text-violet-300" />
              <span className="text-xs font-medium text-zinc-200">
                Repository Drag & Drop Pipeline
              </span>
            </div>

            <div className="space-y-3 pt-5">
              {[
                "Generate clean JSX component",
                "Copy or drag files into your source tree",
                "Validate builds locally with Tailwind",
                "Push straight to main branch",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 transition hover:bg-white/[0.08]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/25 text-[10px] font-bold text-violet-200 border border-violet-500/40">
                    {index + 1}
                  </span>

                  <span className="text-sm font-medium text-zinc-200">
                    {item}
                  </span>

                  {index === 3 && (
                    <Check className="ml-auto h-4 w-4 text-emerald-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Integrations;
