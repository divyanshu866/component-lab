"use client";

import { useEditorContext } from "@/context/EditorContext";

function TargetTechTabs() {
  const { setTargetTech, targetTech, reworkUI } = useEditorContext();

  const targets = [
    {
      id: "REACT",
      label: "React JSX",
      src: "/jsx.svg",
    },
    {
      id: "HTML",
      label: "Web Bundle",
      src: "/globe2_red.svg",
    },
  ];

  if (reworkUI) return null;

  return (
    <div className="flex w-full items-center">
      <div
        role="tablist"
        aria-label="Target technology"
        className="
          inline-flex
          items-center
          gap-0.5
          rounded-[10px]
          border
          border-white/[0.08]
          bg-white/[0.018]
          p-0.5
        "
      >
        {targets.map((item) => {
          const active = targetTech === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTargetTech(item.id)}
              className={`
                group
                flex
                h-8
                items-center
                justify-center
                gap-2
                rounded-[7px]
                border
                px-3
                text-[11.5px]
                font-medium
                tracking-[-0.005em]
                transition-all
                duration-150
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-400/30

                sm:h-8.5
                sm:px-3.5
                sm:text-xs

                ${
                  active
                    ? `
                      border-violet-400/25
                      bg-violet-400/[0.09]
                      text-white
                    `
                    : `
                      border-transparent
                      bg-transparent
                      text-white/50
                      hover:border-white/[0.06]
                      hover:bg-white/[0.035]
                      hover:text-white/80
                    `
                }
              `}
            >
              <span
                className={`
                  flex
                  shrink-0
                  items-center
                  justify-center
                  transition-opacity
                  duration-150
                  ${active ? "opacity-100" : "opacity-55 group-hover:opacity-80"}
                `}
              >
                <img
                  src={item.src}
                  width={14}
                  height={14}
                  alt=""
                  aria-hidden="true"
                  className="h-3.5 w-3.5 object-contain"
                />
              </span>

              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TargetTechTabs;
