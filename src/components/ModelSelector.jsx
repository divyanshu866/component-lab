import { useEffect, useRef, useState } from "react";
import { Brain, Check, ChevronDown, Lock } from "lucide-react";
import { AI_MODELS } from "@/ai/models";
import { hasPlanAccess } from "@/lib/billing/plans";

export default function ModelSelector({
  selectedModel,
  setSelectedModel,
  userPlan = "FREE",
  onPlanRequired,
  reworkUI = false,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = AI_MODELS.find((model) => model.value === selectedModel);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModelSelect = (model) => {
    const canAccess = hasPlanAccess(userPlan, model.minimumPlan);

    if (!canAccess) {
      setOpen(false);

      onPlanRequired?.(model);

      return;
    }

    setSelectedModel(model.value);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`${
        reworkUI ? "backdrop-blur-sm border-b" : ""
      } absolute top-0 left-0 z-10 flex h-12 w-full items-center gap-1 border-darkBorder bg-transparent px-2 pl-4 text-xs`}
    >
      <Brain width={16} height={16} className="shrink-0 text-violet-400" />

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex min-w-40 items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/5"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-neutral-300">
                {selected?.label ?? "Select model"}
              </span>

              {selected && !hasPlanAccess(userPlan, selected.minimumPlan) && (
                <Lock
                  width={10}
                  height={10}
                  className="shrink-0 text-yellow-300/80"
                />
              )}
            </div>

            {selected?.description && (
              <span className="block truncate text-[10px] text-neutral-500">
                {selected.description}
              </span>
            )}
          </div>

          <ChevronDown
            width={13}
            height={13}
            className={`shrink-0 text-neutral-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1 min-w-54 space-y-1 overflow-hidden rounded-xl border border-lightBorder bg-backgroundLight px-2 py-2 shadow-xl">
            {AI_MODELS.map((model) => {
              const isSelected = model.value === selectedModel;
              const isLocked = !hasPlanAccess(userPlan, model.minimumPlan);

              return (
                <button
                  key={model.value}
                  type="button"
                  onClick={() => handleModelSelect(model)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    isSelected
                      ? "bg-white/10"
                      : isLocked
                        ? "hover:bg-white/[0.03]"
                        : "hover:bg-white/5"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-xs font-medium ${
                        isSelected
                          ? "text-white"
                          : isLocked
                            ? "text-neutral-500"
                            : "text-neutral-300"
                      }`}
                    >
                      {model.label}
                    </div>

                    {model.description && (
                      <div className="mt-0.5 text-[10px] text-neutral-500">
                        {model.description}
                      </div>
                    )}
                  </div>

                  {isLocked ? (
                    <div className="flex shrink-0 items-center gap-1 text-[10px] font-medium uppercase text-yellow-300/70">
                      <Lock width={10} height={10} />
                      {model.minimumPlan}
                    </div>
                  ) : (
                    isSelected && (
                      <Check
                        width={13}
                        height={13}
                        className="shrink-0 text-violet-400"
                      />
                    )
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
