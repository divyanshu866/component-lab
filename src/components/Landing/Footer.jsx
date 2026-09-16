import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    /*
     * LANDING COMPONENT:
     * Extracted boundary:
     * components/Landing/Footer.jsx
     *
     * The footer owns only footer content/layout.
     * Keep the global page background on the landing page <main>.
     */
    <footer className="border-t border-white/[0.07] bg-[#0b0b0f]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer content */}
        <div className="grid gap-10 py-12 sm:grid-cols-[1fr_auto] lg:py-14">
          {/* Brand / description */}
          <div className="max-w-md">
            <Link
              href="/"
              aria-label="ComponentLab home"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
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

            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">
              Generate, refine, and ship UI components with AI while keeping
              control of the code.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-14 gap-y-8 sm:grid-cols-2 sm:gap-x-16"
          >
            {/* Product */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
                Product
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/Examples"
                  className="w-fit text-sm text-zinc-500 transition hover:text-white"
                >
                  Examples
                </Link>

                <Link
                  href="/workspace"
                  className="w-fit text-sm text-zinc-500 transition hover:text-white"
                >
                  Workspace
                </Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
                Account
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  className="w-fit text-sm text-zinc-500 transition hover:text-white"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/[0.06] py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="text-zinc-700">
            © {new Date().getFullYear()} ComponentLab
          </span>

          <div className="flex items-center gap-2 text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400/70 shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
            <span>Built with AI. Shipped by you.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
