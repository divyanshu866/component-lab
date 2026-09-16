"use client";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex h-14 items-center justify-between rounded-2xl border border-white/8 bg-[#09090b]/50 px-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:h-16 sm:px-5">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex min-w-0 items-center gap-2.5"
            aria-label="ComponentLab home"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
              <Image
                src="/newlogo.svg"
                width={28}
                height={28}
                alt=""
                className="h-7 w-7 object-contain"
              />
            </div>

            <Image
              src="/name.svg"
              width={100}
              height={20}
              alt="ComponentLab"
              className="h-5 w-auto sm:h-6"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="#features"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Features
            </Link>

            <Link
              href="#workflow"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              How it works
            </Link>

            <Link
              href="/Examples"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Examples
            </Link>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/sign-in"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/workspace"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Start building
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-300 transition hover:bg-white/[0.07] hover:text-white md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out md:hidden ${
            menuOpen
              ? "mt-2 max-h-96 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c10]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <nav className="flex flex-col">
              <Link
                href="#features"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3.5 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                Features
              </Link>

              <Link
                href="#workflow"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3.5 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                How it works
              </Link>

              <Link
                href="/Examples"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3.5 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                Examples
              </Link>

              <div className="my-1 border-t border-white/[0.07]" />

              <Link
                href="/sign-in"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3.5 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                Sign in
              </Link>

              <Link
                href="/workspace"
                onClick={closeMenu}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Start building
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
