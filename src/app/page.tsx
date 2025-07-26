import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-12 flex flex-col items-center justify-center text-center relative z-50">
        <div className="absolute h-screen opacity-30 z-0">
          <img src="/GradientBackground.jpg" alt="" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Build UI Components <span className="text-blue-500">Faster</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
          ComponentLab is a real-time playground where you can generate
          HTML/CSS/JS UI components using AI — then tweak them manually in an
          editor that gets out of your way.
        </p>

        <Link
          href="/workspace"
          className="bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3 rounded-lg text-lg font-medium z-10"
        >
          Launch Workspace
        </Link>

        <p className="mt-6 text-sm text-gray-500">
          No sign-up needed. Try 3 free AI prompts instantly.
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
