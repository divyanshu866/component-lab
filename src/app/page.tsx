import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-12 flex flex-col items-center justify-center text-center relative z-50">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
        {/* Header */}
        <div className="absolute h-full mx-5 sm:mx-10 flex flex-col items-center justify-start">
          <div className="text-center mt-20 sm:mt-25">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
              <span className="text-pink-300 font-semibold">
                Unlock Your Full Potential
              </span>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>

            <h1 className="mt-10 sm:mt-25 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              <span className="bg-gradient-to-r font-sans from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Build UI Components{" "}
                <span className="text-purple-600">Faster</span>
              </span>
            </h1>

            <p className="text-md sm:text-2xl md:text-2xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              From prototype to production in seconds. Build components that
              scale, collaborate seamlessly, and ship faster than ever before.
            </p>
          </div>

          <Link
            href="/workspace"
            className="mt-10 bg-gradient-to-r from-pink-600 to-purple-700 transition-colors px-6 py-3 rounded-full text-lg font-medium z-10"
          >
            Launch Workspace
          </Link>

          <p className="mt-9 text-sm text-gray-500">
            No sign-up needed. Try 3 free AI prompts instantly.
          </p>
        </div>
      </main>
    </div>
  );
}
