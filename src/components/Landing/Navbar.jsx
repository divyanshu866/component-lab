"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Menu, X, Sparkles, Zap } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Examples", href: "/Examples" },
    { label: "Pricing", href: "/upgrade" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-white/10 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center justify-start w-max gap-0 group"
        >
          <img src="/newlogo.svg" alt="Logo" className="w-12 h-12" />
          <img src="/name.svg" alt="Logo" className="h-9 mb-1" />
        </Link>

        {/* Desktop */}

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-neutral-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right */}

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 p-2 text-neutral-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            <Github size={18} />
          </a>

          <Link
            href="/workspace"
            className="rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 font-medium shadow-lg shadow-purple-600/20 transition p-[1px] hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg,#e879f9,#818cf8)",
              color: "#fff",
            }}
          >
            <div className="flex justify-between font-light py-1 px-3 rounded-full items-center gap-2 text-neutral-300 bg-[#150a1e]">
              {/* <Zap className="w-4 h-4" /> */}
              Launch Workspace
            </div>
          </Link>
        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-white/10 p-2 text-white lg:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="border-t border-white/10 bg-neutral-950/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-5 px-6 py-8">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-neutral-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <Link
              href="/workspace"
              className="mt-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-5 py-3 text-center font-medium text-white"
            >
              Launch Workspace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
