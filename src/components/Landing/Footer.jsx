import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Workspace", href: "/workspace" },
  { label: "Examples", href: "/Examples" },
];

const ACCOUNT_LINKS = [{ label: "Sign in", href: "/sign-in" }];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#09090c]">
      {/* Ambient background */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main */}
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-20 lg:py-24">
          {/* Brand */}
          <div className="max-w-xl">
            <Link
              href="/"
              aria-label="ComponentLab home"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.04]">
                <Image
                  src="/newlogo.svg"
                  width={36}
                  height={36}
                  alt=""
                  className="h-9 w-9 object-contain"
                />
              </div>

              <Image
                src="/name.svg"
                width={120}
                height={24}
                alt="ComponentLab"
                className="h-6 w-auto"
              />
            </Link>

            <h2 className="mt-8 max-w-lg text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
              From idea
              <br />
              <span className="text-zinc-500">to working interface.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-400">
              Generate UI with AI, keep the source editable, and turn ideas into
              components you can actually ship.
            </p>

            <Link
              href="/workspace"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/[0.16] hover:bg-white/[0.07] hover:text-white"
            >
              Open workspace
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Product */}
          <nav aria-label="Product navigation">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              <span className="h-px w-4 bg-violet-400/50" />
              Product
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {PRODUCT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                  {link.label}

                  <ArrowUpRight className="h-3 w-3 text-zinc-700 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Account */}
          <nav aria-label="Account navigation">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              <span className="h-px w-4 bg-violet-400/50" />
              Account
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {ACCOUNT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                  {link.label}

                  <ArrowUpRight className="h-3 w-3 text-zinc-700 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Product signal */}
        <div className="border-y border-white/[0.06] py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5 text-xs text-zinc-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-400/[0.06]">
                <Sparkles className="h-3 w-3 text-violet-300" />
              </div>

              <span>
                AI-assisted development.{" "}
                <span className="text-zinc-300">
                  Full control remains yours.
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              ComponentLab workspace ready
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="text-zinc-600">
            © {new Date().getFullYear()} ComponentLab
          </span>

          <div className="flex items-center gap-2 text-zinc-600">
            <span>Built with AI.</span>
            <span className="text-zinc-400">Shipped by you.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
