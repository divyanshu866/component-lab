import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

function Cta() {
  return (
    <section className="border-t border-white/15 bg-[#09090f] px-5 py-24 text-center lg:px-8 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.2),transparent_60%)] pointer-events-none" />
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/20 text-violet-200 shadow-xl">
          <Zap className="h-6 w-6" />
        </div>

        <h2 className="mt-8 text-4xl font-bold tracking-[-0.05em] text-white sm:text-6xl">
          Build production features
          <span className="block bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-transparent">
            before your next deployment.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-300">
          Start with clear architectural intent, generate bulletproof modular
          code, and push straight to main.
        </p>

        <Link
          href="/workspace"
          className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-100 shadow-[0_0_35px_rgba(255,255,255,0.3)]"
        >
          Open ComponentLab Workspace
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export default Cta;
