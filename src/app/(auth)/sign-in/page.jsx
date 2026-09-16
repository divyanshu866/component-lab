import Link from "next/link";
import SignInGithub from "@/components/OAuth/github-sign-in";
import SignInGoogle from "@/components/OAuth/google-sign-in";
import { getSession } from "@/lib/get-session";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In – ComponentLab",
  description: "Sign in to your ComponentLab workspace.",
};

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/workspace");
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#09090b] font-[family-name:var(--font-geist-sans)] text-white antialiased">
      {/* ------------------------------------------------------------------ */}
      {/* Global background                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Main violet atmosphere */}
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-violet-600/[0.10] blur-3xl" />

        {/* Secondary glow */}
        <div className="absolute bottom-[-14rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/[0.06] blur-3xl" />

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Header                                                               */}
      {/* ------------------------------------------------------------------ */}

      <header className="absolute inset-x-0 top-0 z-20 px-4 py-4 sm:px-6 sm:py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            aria-label="ComponentLab home"
            className="group inline-flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition group-hover:border-white/[0.15] group-hover:bg-white/[0.07]">
              <img
                src="/newlogo.svg"
                alt=""
                className="h-7 w-7 object-contain"
              />
            </div>

            <img
              src="/name.svg"
              alt="ComponentLab"
              className="h-5 w-auto sm:h-6"
            />
          </Link>

          {/* Back to home */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5 text-xs font-medium text-zinc-400 transition hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main auth area                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative z-10 flex w-full items-center justify-center px-5 pb-10 pt-28 sm:px-8">
        <div className="grid w-full max-w-5xl items-center gap-16 lg:grid-cols-[1fr_460px] lg:gap-20">
          {/* ---------------------------------------------------------------- */}
          {/* Left: concise product context                                    */}
          {/* ---------------------------------------------------------------- */}

          <section className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3.5 py-2 text-xs font-medium text-violet-200">
                <Sparkles className="h-3.5 w-3.5" />
                AI-powered component development
              </div>

              <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.055em] text-white xl:text-6xl">
                Your components.
                <br />
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Your workspace.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-500">
                Generate interfaces with AI, inspect the implementation, preview
                changes instantly, and keep control of the code.
              </p>
            </div>

            {/* Minimal product visual */}
            <div className="mt-12 max-w-xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d12] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              {/* Window bar */}
              <div className="flex h-11 items-center justify-between border-b border-white/[0.06] bg-[#0a0a0d] px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                </div>

                <span className="text-[10px] text-zinc-700">
                  ComponentLab workspace
                </span>
              </div>

              {/* Product preview */}
              <div className="grid grid-cols-[0.85fr_1.15fr]">
                <div className="border-r border-white/[0.06] p-5">
                  <div className="mb-5 flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 text-violet-300" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                      Generated code
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-[10px] leading-5">
                    <div className="text-violet-300">export default</div>
                    <div className="pl-2 text-zinc-500">
                      function Component()
                    </div>
                    <div className="pl-4 text-fuchsia-300">&lt;section</div>
                    <div className="pl-6 text-emerald-300">className=</div>
                    <div className="pl-8 text-yellow-200">
                      {"rounded-xl ..."}
                    </div>
                    <div className="pl-4 text-fuchsia-300">&gt;</div>
                    <div className="pl-6 text-zinc-700">...</div>
                    <div className="pl-4 text-fuchsia-300">
                      &lt;/section&gt;
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-5 flex items-center gap-2">
                    <Layers3 className="h-3.5 w-3.5 text-violet-300" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                      Live preview
                    </span>
                  </div>

                  <div className="flex min-h-[185px] items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0a0a0d] p-5">
                    <div className="w-full max-w-[190px] rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4">
                      <div className="h-2 w-14 rounded bg-white/10" />
                      <div className="mt-3 h-6 w-28 rounded bg-white/[0.07]" />

                      <div className="mt-5 space-y-2">
                        <div className="h-2 w-full rounded bg-white/[0.06]" />
                        <div className="h-2 w-[82%] rounded bg-white/[0.06]" />
                        <div className="h-2 w-[60%] rounded bg-white/[0.06]" />
                      </div>

                      <div className="mt-5 h-8 rounded-lg bg-gradient-to-r from-violet-500/80 to-fuchsia-500/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-zinc-600">
              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Live preview
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Editable source
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                AI iteration
              </span>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* Right: sign-in card                                               */}
          {/* ---------------------------------------------------------------- */}

          <section className="w-full">
            <div className="rounded-[2rem] border border-white/[0.09] bg-[#0d0d12]/95 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
              {/* Mobile brand/context */}
              <div className="mb-8 lg:hidden">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-400/[0.07]">
                  <Sparkles className="h-5 w-5 text-violet-300" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/70">
                  ComponentLab
                </p>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                  Welcome back.
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Sign in to continue to your ComponentLab workspace.
                </p>
              </div>

              {/* OAuth buttons */}
              <div className="space-y-3">
                <SignInGoogle />
                <SignInGithub />
              </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.07]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-700">
                  Secure OAuth
                </span>

                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>

              {/* Auth reassurance */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.07]">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-zinc-300">
                      Your code stays yours
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                      Sign in securely with Google or GitHub to access your
                      saved components and workspace.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer link */}
              <div className="mt-7 text-center">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 text-xs text-zinc-600 transition hover:text-zinc-300"
                >
                  Return to ComponentLab
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-5 text-zinc-700">
              By continuing, you authenticate with the selected identity
              provider and agree to use ComponentLab responsibly.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
