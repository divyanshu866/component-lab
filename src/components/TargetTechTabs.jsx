import { useState } from "react";
import { useEditorContext } from "@/context/EditorContext";

function TargetTechTabs() {
  const { setTargetTech, targetTech, reworkUI } = useEditorContext();

  return (
    <div
      className={`${reworkUI ? "hidden -z-10" : ""} relative w-full flex items-center px-4 mb-3 mt-0`}
    >
      <div className="relative inline-flex gap-1 rounded-xl p-1 bg-white/5 border border-white/10 backdrop-blur-md">
        {[
          { id: "REACT", label: "React JSX", src: "/jsx.svg" },
          { id: "HTML", label: "Web Bundle", src: "/globe2_red.svg" },
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default TargetTechTabs;
