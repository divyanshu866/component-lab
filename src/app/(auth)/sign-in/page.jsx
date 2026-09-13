import Link from "next/link";
import SignInGithub from "@/components/github-sign-in";
import { auth } from "@/lib/auth";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Github,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In – ComponentLab",
};

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/workspace");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b] text-white">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-medium text-white/55 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400/70"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="hidden items-center gap-2 text-xs text-white/35 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            Secure authentication
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center py-12 lg:py-16">
          <section className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/50 backdrop-blur-2xl lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative hidden min-h-[650px] overflow-hidden border-r border-white/10 p-10 lg:flex lg:flex-col lg:justify-between gap-6 xl:p-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.2),transparent_34%),radial-gradient(circle_at_85%_85%,rgba(6,182,212,0.12),transparent_30%)]" />

              <div className="relative">
                <Link
                  href="/"
                  aria-label="Go to ComponentLab home"
                  className="group inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-lg shadow-violet-950/30 transition group-hover:border-white/25 group-hover:bg-white/[0.14]">
                    <img
                      src="/newlogo.svg"
                      alt=""
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <img
                    src="/name.svg"
                    alt="ComponentLab"
                    className="h-6 w-auto max-w-[170px] object-contain"
                  />
                </Link>
              </div>

              <div className="relative max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your workspace, ready to build
                </div>

                <h1 className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-white xl:text-6xl">
                  Turn ideas into interfaces.
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-white/50">
                  Create, refine, and ship production-ready components from one
                  focused workspace.
                </p>

                <div
                  aria-hidden="true"
                  className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#101116]/80 shadow-2xl shadow-black/30"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-violet-400" />
                      <span className="text-[11px] font-medium text-white/55">
                        ComponentLab workspace
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                      Live preview
                    </span>
                  </div>

                  <div className="grid grid-cols-[0.8fr_1.2fr] gap-4 p-4">
                    <div className="space-y-2">
                      {["Prompt", "Preview", "Export"].map((item, index) => (
                        <div
                          key={item}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] ${
                            index === 0
                              ? "bg-violet-400/10 text-violet-200"
                              : "text-white/35"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              index === 0 ? "bg-violet-300" : "bg-white/20"
                            }`}
                          />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                      <div className="mb-4 h-2 w-2/3 rounded-full bg-white/10" />
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-white/[0.07]" />
                        <div className="h-2 w-4/5 rounded-full bg-white/[0.07]" />
                        <div className="h-2 w-3/5 rounded-full bg-white/[0.07]" />
                      </div>
                      <div className="mt-5 h-8 w-24 rounded-lg bg-gradient-to-r from-violet-500/80 to-fuchsia-500/70" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center gap-3 text-xs text-white/35">
                <ShieldCheck className="h-4 w-4 text-emerald-400/80" />
                Authentication secured by GitHub
              </div>
            </div>

            <div className="flex min-h-[650px] flex-col justify-center p-6 sm:p-10 lg:p-14">
              <div className="mb-10 lg:hidden">
                <Link
                  href="/"
                  aria-label="Go to ComponentLab home"
                  className="mb-8 inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                    <img
                      src="/newlogo.svg"
                      alt=""
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <img
                    src="/name.svg"
                    alt="ComponentLab"
                    className="h-5 w-auto max-w-[155px] object-contain"
                  />
                </Link>

                <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300/75">
                  Build without friction
                </p>
              </div>

              <div className="mx-auto w-full max-w-md">
                <div className="mb-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
                    <Github className="h-5 w-5 text-violet-200" />
                  </div>

                  <h2 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                    Welcome back.
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">
                    Sign in with GitHub to continue to your ComponentLab
                    workspace.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.04] p-1.5 shadow-lg shadow-black/20">
                  <SignInGithub />
                </div>

                <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-xs text-white/55">
                      Access your saved components and projects
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-xs text-white/55">
                      Keep building from where you left off
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-center text-xs leading-5 text-white/30">
                  Continue securely with your GitHub account.
                </p>

                <Link
                  href="/"
                  className="group mt-8 inline-flex items-center gap-2 rounded-md text-sm text-white/40 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                >
                  <span>Return to ComponentLab</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="flex items-center justify-center pb-2 text-center text-[11px] text-white/25">
          Built with AI. Shipped by you.
        </footer>
      </div>
    </div>
  );
}
