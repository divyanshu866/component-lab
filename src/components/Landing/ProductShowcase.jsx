import { ArrowRight } from "lucide-react";
import GlowOrb from "./GlowOrb";
import Link from "next/link";

export default function ProductShowcase() {
  return (
    // EXTRACT THIS COMPONENT → components/Landing/ProductShowcase.jsx
    <section
      id="features"
      className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-28 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/70">
              Built for iteration
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              AI where you need it.
              <br />
              <span className="text-zinc-500">Code where you want it.</span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-6 text-zinc-500 sm:text-base">
              ComponentLab is not just a prompt box. Generate an implementation,
              inspect the source, preview it in real time, and continue editing
              until the result matches your intent.
            </p>

            <Link
              href="/workspace"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              Open the workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <GlowOrb className="-right-10 top-1/2 h-56 w-56 -translate-y-1/2 bg-violet-600/10" />

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0b0e] shadow-2xl">
              <div className="grid min-h-[390px] grid-cols-2">
                <div className="border-r border-white/[0.07]">
                  <div className="flex h-11 items-center gap-4 border-b border-white/[0.07] px-4 text-[10px] font-medium uppercase tracking-wider">
                    <span className="border-b border-violet-400 py-3 text-violet-300">
                      JSX
                    </span>
                    <span className="text-zinc-700">CSS</span>
                    <span className="text-zinc-700">JS</span>
                  </div>

                  <div className="space-y-2 p-5 font-mono text-[10px] leading-5">
                    <div className="text-violet-300">
                      import <span className="text-white">React</span>
                    </div>

                    <div className="text-zinc-600">
                      export default function Card()
                    </div>

                    <div className="pl-3 text-zinc-500">return (</div>

                    <div className="pl-6 text-fuchsia-300">&lt;div</div>

                    <div className="pl-9 text-emerald-300">
                      className=
                      <span className="text-yellow-200">
                        {"rounded-2xl p-6..."}
                      </span>
                    </div>

                    <div className="pl-6 text-fuchsia-300">&gt;</div>

                    <div className="pl-9 text-zinc-500">...</div>

                    <div className="pl-6 text-fuchsia-300">&lt;/div&gt;</div>

                    <div className="pl-3 text-zinc-500">)</div>
                  </div>
                </div>

                <div className="bg-[#08080b]">
                  <div className="flex h-11 items-center justify-between border-b border-white/[0.07] px-4 text-[10px]">
                    <span className="text-zinc-600">Live preview</span>
                    <span className="text-emerald-400/80">● synced</span>
                  </div>

                  <div className="flex h-[345px] items-center justify-center p-8">
                    <div className="w-full max-w-[230px] rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                      <div className="h-2 w-14 rounded bg-white/10" />
                      <div className="mt-3 h-7 w-32 rounded bg-white/[0.07]" />

                      <div className="mt-5 space-y-2">
                        <div className="h-2 w-full rounded bg-white/[0.06]" />
                        <div className="h-2 w-[85%] rounded bg-white/[0.06]" />
                        <div className="h-2 w-[65%] rounded bg-white/[0.06]" />
                      </div>

                      <div className="mt-6 h-10 rounded-xl bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
