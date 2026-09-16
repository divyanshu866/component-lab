import { Code2 } from "lucide-react";
import Image from "next/image";

const technologies = [
  {
    name: "Web Bundle",
    label: "HTML / CSS / JavaScript",
    src: "/globe2_red.svg",
  },
  {
    name: "React",
    label: "React / JSX",
    src: "/jsx.svg",
  },
];

export default function TechnologyStrip() {
  return (
    // EXTRACT THIS COMPONENT → components/Landing/TechnologyStrip.jsx
    <section className="border-y border-white/8 bg-white/1.5">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:px-8 lg:px-10">
        {/* Section label */}
        <div className="shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Build for
          </p>
          <p className="mt-1 text-xs text-zinc-600">Choose your target</p>
        </div>

        {/* Technology cards */}
        <div className="flex flex-1 flex-wrap gap-3">
          {technologies.map((technology) => (
            <div
              key={technology.name}
              className="group flex min-w-[170px] flex-1 items-center gap-3 rounded-xl border border-white/[0.09] bg-[#111116] px-4 py-3 transition-colors duration-200 hover:border-violet-400/25 hover:bg-[#15151b]"
            >
              {/* Icon */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-400/[0.08]">
                <Image
                  src={technology.src}
                  width={20}
                  height={20}
                  alt=""
                  className="h-5 w-5 object-contain text-violet-300"
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <div className="text-sm font-medium text-zinc-200">
                  {technology.name}
                </div>

                <div className="mt-0.5 truncate text-xs text-zinc-500">
                  {technology.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
