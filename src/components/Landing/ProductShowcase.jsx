import { ArrowRight, Copy, Play, Sparkles } from "lucide-react";
import GlowOrb from "./GlowOrb";
import Link from "next/link";

export default function ProductShowcase() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] px-5 py-24 sm:px-8 lg:px-10 lg:py-28"
    >
      <GlowOrb className="right-[15%] top-1/2 h-80 w-80 -translate-y-1/2 bg-violet-600/[0.07]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          {/* Copy */}
          <div className="max-w-md">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300/70">
              Built for iteration
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-[46px] lg:leading-[1.05]">
              AI where you need it.
              <br />
              <span className="text-zinc-500">Code where you want it.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500">
              Generate, inspect, preview, and refine in one workspace.
            </p>

            <Link
              href="/workspace"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              Open the workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Workspace */}
          <div className="relative min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a0d] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              {/* Window chrome */}
              <div className="flex h-10 items-center justify-between border-b border-white/[0.07] bg-[#09090c] px-3 sm:px-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                </div>

                <div className="hidden rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-1 text-[9px] text-zinc-700 sm:block">
                  componentsdev.com/workspace
                </div>

                <div className="flex items-center gap-2 text-[9px] text-zinc-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Ready
                </div>
              </div>

              <div className="grid min-h-[360px] sm:min-h-[390px] lg:grid-cols-[145px_minmax(0,1fr)_245px]">
                {/* Sidebar */}
                <aside className="hidden border-r border-white/[0.07] bg-[#09090b] lg:block">
                  <div className="border-b border-white/[0.07] p-2.5">
                    <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05] text-zinc-400">
                        +
                      </div>
                      <span className="text-[9px] text-zinc-300">
                        New Component
                      </span>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="mb-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-zinc-700">
                      Recent
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 rounded-md bg-white/[0.08] px-2 py-1.5 text-[9px] text-zinc-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        Button Test
                      </div>

                      <div className="flex items-center gap-2 px-2 py-1.5 text-[9px] text-zinc-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
                        Bento Grid
                      </div>

                      <div className="flex items-center gap-2 px-2 py-1.5 text-[9px] text-zinc-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
                        Pricing Card
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Editor / AI */}
                <div className="min-w-0 bg-[#08080a]">
                  <div className="flex h-9 items-center border-b border-white/[0.07] px-3">
                    <div className="flex items-center gap-1">
                      <span className="border-b border-violet-400 px-2.5 py-2.5 text-[9px] text-violet-300">
                        JSX
                      </span>

                      <span className="px-2.5 py-2.5 text-[9px] text-zinc-700">
                        CSS
                      </span>

                      <span className="ml-1 flex items-center gap-1.5 rounded-full border border-yellow-400/20 px-2.5 py-1 text-[8px] text-yellow-300/80">
                        <Sparkles className="h-2.5 w-2.5" />
                        AI
                      </span>
                    </div>
                  </div>

                  <div className="border-b border-white/[0.07] px-3 py-2.5">
                    <div className="text-[8px] text-zinc-600">
                      Gemini 3.5 Flash-Lite
                    </div>
                  </div>

                  <div className="space-y-4 p-3 sm:p-4">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-xl rounded-br-sm bg-violet-600 px-3 py-2 text-[9px] leading-4 text-white">
                        Create a simple button test component
                      </div>
                    </div>

                    {/* AI response */}
                    <div className="rounded-xl rounded-tl-sm border border-white/[0.07] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-1.5 text-[8px] text-zinc-500">
                        <Sparkles className="h-2.5 w-2.5 text-violet-400" />
                        ComponentLab
                      </div>

                      <p className="mt-2 text-[9px] leading-4 text-zinc-400">
                        Created an interactive button test component with click
                        tracking and a success state.
                      </p>
                    </div>

                    {/* Compact code */}
                    <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b0b0e]">
                      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
                        <span className="text-[8px] text-zinc-600">
                          ButtonTest.jsx
                        </span>

                        <Copy className="h-2.5 w-2.5 text-zinc-700" />
                      </div>

                      <div className="space-y-1 p-3 font-mono text-[8px] leading-4">
                        <div>
                          <span className="text-violet-400">
                            export default
                          </span>{" "}
                          <span className="text-zinc-400">
                            function ButtonTest()
                          </span>
                        </div>

                        <div className="pl-3 text-zinc-600">return (</div>

                        <div className="pl-6 text-fuchsia-300">&lt;button</div>

                        <div className="pl-9">
                          <span className="text-emerald-300">className</span>
                          <span className="text-zinc-700">=</span>
                          <span className="text-yellow-200">
                            "rounded-xl bg-violet..."
                          </span>
                        </div>

                        <div className="pl-6 text-fuchsia-300">
                          &gt;Test Button&lt;/button&gt;
                        </div>

                        <div className="pl-3 text-zinc-600">)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="border-t border-white/[0.07] bg-[#08080a] lg:border-l lg:border-t-0">
                  <div className="flex h-9 items-center justify-between border-b border-white/[0.07] px-3">
                    <div className="flex items-center gap-1.5 text-[8px] text-zinc-500">
                      <Play className="h-2.5 w-2.5 text-emerald-400" />
                      Live preview
                    </div>

                    <span className="text-[8px] text-emerald-400/70">
                      ● synced
                    </span>
                  </div>

                  <div className="flex h-[270px] items-center justify-center bg-[#f3f5f7] p-5">
                    <div className="w-full max-w-[195px] rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_15px_35px_rgba(0,0,0,0.10)]">
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-violet-50">
                        <span className="text-sm text-violet-500">✓</span>
                      </div>

                      <div className="mt-3 text-center">
                        <div className="text-[12px] font-semibold text-zinc-900">
                          Button Test
                        </div>

                        <div className="mx-auto mt-2 max-w-[145px] text-[8px] leading-3.5 text-zinc-400">
                          Click the button to verify interactions.
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg bg-violet-600 py-2 text-center text-[8px] font-semibold text-white">
                        Test Button
                      </div>

                      <div className="mt-3 rounded-lg bg-zinc-50 px-2 py-2 text-center text-[8px] text-zinc-400">
                        No clicks yet.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/[0.07] px-3 py-2 text-[8px] text-zinc-700 sm:px-4">
                <span>Button Test</span>

                <div className="flex items-center gap-3">
                  <span>React</span>
                  <span>Preview synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
