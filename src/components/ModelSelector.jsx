import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { AI_MODELS } from "@/ai/models";

export default function ModelSelector({
  selectedModel,
  setSelectedModel,
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

  return (
    <div
      ref={containerRef}
      className={`${
        reworkUI ? "backdrop-blur-sm border-b" : ""
      } absolute top-0 left-0 z-10 flex h-12 w-full items-center gap-1 border-darkBorder bg-transparent px-2 pl-4 text-xs`}
    >
      <Sparkles width={16} height={16} className="shrink-0 text-violet-400" />

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
          <div className="absolute left-0 top-full z-50 mt-1 min-w-64 overflow-hidden rounded-lg border border-darkBorder bg-[#18181b] p-1 shadow-xl">
            {AI_MODELS.map((model) => {
              const isSelected = model.value === selectedModel;

              return (
                <button
                  key={model.value}
                  type="button"
                  onClick={() => {
                    setSelectedModel(model.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${
                    isSelected ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-xs font-medium ${
                        isSelected ? "text-white" : "text-neutral-300"
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

                  {isSelected && (
                    <Check
                      width={14}
                      height={14}
                      className="shrink-0 text-violet-400"
                    />
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
