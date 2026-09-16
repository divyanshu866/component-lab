import { ArrowRight, Sparkles } from "lucide-react";
import GlowOrb from "./GlowOrb";
import Link from "next/link";

export default function FinalCTA() {
  return (
    // EXTRACT THIS COMPONENT → components/Landing/FinalCTA.jsx
    <section className="px-5 pb-28 pt-10 sm:px-8 lg:px-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d12] px-6 py-20 text-center shadow-2xl sm:px-12">
        <GlowOrb className="left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-violet-600/15" />

        <div className="relative">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-400/[0.07]">
            <Sparkles className="h-5 w-5 text-violet-300" />
          </div>

          <h2 className="mx-auto mt-7 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
            Stop starting from a blank editor.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            Describe the interface. Generate the implementation. Refine it until
            it is ready for your project.
          </p>

          <Link
            href="/workspace"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Start building
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
