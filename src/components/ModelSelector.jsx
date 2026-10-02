import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Check,
  ChevronDown,
  Lock,
  SlidersHorizontal,
} from "lucide-react";

import { AI_MODELS } from "@/ai/models";
import { hasPlanAccess } from "@/lib/billing/plans";

const EFFORT_LABELS = {
  none: "None",
  minimal: "Minimal",
  low: "Low",
  medium: "Medium",
  high: "High",
  xhigh: "XHigh",
  max: "Max",
};

const EFFORT_DESCRIPTIONS = {
  none: "No reasoning",
  minimal: "Minimal reasoning",
  low: "Fast reasoning",
  medium: "Balanced reasoning",
  high: "Deeper reasoning",
  xhigh: "Extended reasoning",
  max: "Maximum reasoning",
};

function getModelEfforts(model) {
  if (!model?.allowedEfforts) {
    return [];
  }

  return [
    ...new Set(Object.values(model.allowedEfforts).flat().filter(Boolean)),
  ];
}

export default function ModelSelector({
  selectedModel,
  setSelectedModel,
  selectedEffort,
  setSelectedEffort,
  userPlan = "FREE",
  onPlanRequired,
  reworkUI = false,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const availableEfforts = getModelEfforts(selectedModel);

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

    setSelectedModel(model);
    setSelectedEffort(model.defaultEffort);
  };

  const handleEffortSelect = (effort) => {
    setSelectedEffort(effort);
  };

  return (
    <div
      ref={containerRef}
      className={`${
        reworkUI ? "border-b backdrop-blur-sm" : ""
      } absolute left-0 top-0 z-10 flex h-12 w-full items-center gap-1 border-darkBorder bg-transparent px-2 pl-4 text-xs`}
    >
      <Brain width={16} height={16} className="shrink-0 text-violet-400" />

      <div className="relative">
        {/* Selected model */}
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          className="flex min-w-48 items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/5"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-neutral-300">
                {selectedModel?.label ?? "Select model"}
              </span>

              {selectedModel &&
                !hasPlanAccess(userPlan, selectedModel.minimumPlan) && (
                  <Lock
                    width={10}
                    height={10}
                    className="shrink-0 text-yellow-300/80"
                  />
                )}
            </div>

            <div className="flex min-w-0 items-center gap-1.5">
              {selectedModel?.description && (
                <span className="truncate text-[10px] text-neutral-500">
                  {selectedModel.description}
                </span>
              )}

              {selectedEffort && availableEfforts.includes(selectedEffort) && (
                <>
                  <span className="shrink-0 text-[9px] text-neutral-700">
                    ·
                  </span>

                  <span className="shrink-0 text-[10px] text-violet-400/80">
                    {EFFORT_LABELS[selectedEffort] ?? selectedEffort}
                  </span>
                </>
              )}
            </div>
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
          <div className="absolute left-0 top-full z-50 mt-1 w-[290px] overflow-hidden rounded-xl border border-lightBorder bg-backgroundLight p-2 shadow-xl">
            {/* Models */}
            <div className="space-y-1">
              {AI_MODELS.map((model) => {
                const isSelected = model.value === selectedModel?.value;

                const isLocked = !hasPlanAccess(userPlan, model.minimumPlan);

                return (
                  <button
                    key={model.value}
                    type="button"
                    onClick={() => handleModelSelect(model)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "bg-white/[0.08]"
                        : isLocked
                          ? "hover:bg-white/[0.025]"
                          : "hover:bg-white/[0.05]"
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
                        <div className="mt-0.5 truncate text-[10px] text-neutral-500">
                          {model.description}
                        </div>
                      )}
                    </div>

                    {isLocked ? (
                      <div className="flex shrink-0 items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-yellow-300/70">
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

            {/* Effort selector */}
            {selectedModel && availableEfforts.length > 0 && (
              <div className="mt-2 border-t border-white/[0.06] pt-2">
                <div className="flex items-center gap-2 px-3 pb-2 pt-1">
                  <SlidersHorizontal
                    width={12}
                    height={12}
                    className="text-violet-400/80"
                  />

                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-600">
                    Reasoning effort
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  {availableEfforts.map((effort) => {
                    const isSelected = selectedEffort === effort;

                    return (
                      <button
                        key={effort}
                        type="button"
                        onClick={() => handleEffortSelect(effort)}
                        className={`group rounded-lg px-2.5 py-2 text-left transition-all ${
                          isSelected
                            ? "bg-violet-400/[0.10] ring-1 ring-violet-400/20"
                            : "hover:bg-white/[0.05]"
                        }`}
                      >
                        <div
                          className={`text-[11px] font-medium ${
                            isSelected ? "text-violet-200" : "text-neutral-300"
                          }`}
                        >
                          {EFFORT_LABELS[effort] ?? effort}
                        </div>

                        <div
                          className={`mt-0.5 text-[9px] ${
                            isSelected
                              ? "text-violet-300/50"
                              : "text-neutral-600"
                          }`}
                        >
                          {EFFORT_DESCRIPTIONS[effort] ?? ""}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
