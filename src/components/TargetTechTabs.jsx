import { useState } from "react";
import { useEditorContext } from "@/context/EditorContext";

function TargetTechTabs() {
  const { setTargetTech, targetTech, reworkUI } = useEditorContext();

  return (
    <div
      className={`${reworkUI ? "hidden -z-10" : ""} relative w-full flex items-center px-4 mb-3 mt-0`}
    >
      {/* Extremely subtle background blobs */}
      <div className="pointer-events-none absolute inset-0 -mx-4 overflow-hidden">
        <div className="absolute left-6 top-1/2 h-20 w-36 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-3xl" />
        <div className="absolute right-10 top-1/2 h-14 w-24 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* Segmented pill — same DNA as the input below */}
      <div className="relative inline-flex gap-1 rounded-xl p-1 bg-white/5 border border-white/10 backdrop-blur-md">
        {[
          { id: "HTML", label: "Web Bundle", src: "/globe2_red.svg" },
          { id: "REACT", label: "React JSX :", src: "/jsx.svg" },
        ].map((item) => {
          const active = targetTech === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTargetTech(item.id)}
              className={`${active ? "bg-purple-500/15 border-purple-500/50" : "bg-transparent border-transparent text-neutral-100 hover:text-neutral-200 hover:bg-white/5"} flex items-center gap-1.5 border rounded-lg px-3.5 py-1.5 text-[11px] font-medium transition-all cursor-pointer duration-150`}
            >
              <img
                src={item.src}
                alt=""
                style={{ width: 13, height: 13, opacity: 1 }}
              />
              {item.label}
              {item.id === "REACT" && (
                <span className="text-yellow-400">Experimental</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default TargetTechTabs;
