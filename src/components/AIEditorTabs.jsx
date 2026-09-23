import { Eye, Sparkles } from "lucide-react";
import Image from "next/image";

const AIEditorTabs = ({
  activeComponentIndex,
  activeEditor,
  setActiveEditor,
  targetTech,
  setTargetTech,
  reworkUI,
  setShowPreview,
  showPreview,
}) => {
  return (
    <div className="flex h-12 w-full items-stretch border-b border-gray-200 px-2 text-xs dark:border-darkBorder dark:bg-transparent">
      {/* File Tabs */}
      <div className="flex h-full flex-nowrap items-stretch gap-2 rounded-xl bg-white/0 backdrop-blur-md">
        {targetTech === "REACT" && (
          <button
            onClick={() => setActiveEditor("JSX")}
            className={`${
              activeEditor === "JSX"
                ? "border-violet-500"
                : "border-lightBorder text-neutral-400"
            } flex items-center justify-center border-b gap-2 h-full px-4 relative transition-all duration-100 cursor-pointer`}
          >
            <Image
              src="/jsx.svg"
              width={16}
              height={16}
              className={`${activeEditor != "JSX" && "opacity-60"}`}
              alt=""
            />
            JSX
          </button>
        )}
        {targetTech === "HTML" && (
          <button
            onClick={() => setActiveEditor("HTML")}
            className={`${
              activeEditor === "HTML"
                ? "border-violet-500"
                : "border-lightBorder text-neutral-400"
            } flex items-center justify-center border-b gap-2 h-full px-4 relative transition-all duration-100 cursor-pointer`}
          >
            <Image
              src="/html.svg"
              width={16}
              height={16}
              alt=""
              className={`${activeEditor != "HTML" && "opacity-60"}`}
            />
            HTML
          </button>
        )}
        <button
          onClick={() => setActiveEditor("CSS")}
          className={`${
            activeEditor === "CSS"
              ? "border-violet-500"
              : "border-lightBorder text-neutral-400"
          } flex items-center justify-center border-b gap-2 h-full px-4 relative transition-all duration-100 cursor-pointer`}
        >
          <Image
            src="/css.svg"
            width={16}
            height={16}
            alt=""
            className={`${activeEditor != "CSS" && "opacity-60"}`}
          />
          CSS
        </button>
        {targetTech === "HTML" && (
          <button
            onClick={() => setActiveEditor("JS")}
            className={`${
              activeEditor === "JS"
                ? "border-violet-500"
                : "border-lightBorder text-neutral-400"
            } flex items-center justify-center border-b gap-2 h-full px-4 relative transition-all duration-100 cursor-pointer`}
          >
            <Image
              src="/javascript.svg"
              width={16}
              height={16}
              className={`${activeEditor != "JS" && "opacity-60"}`}
              alt=""
            />
            JavaScript
          </button>
        )}
      </div>
      <div className="flex ml-3 mr-auto h-full py-1 gap-4">
        <button
          onClick={() => setActiveEditor("AI")}
          className={`${
            activeEditor === "AI"
              ? " border-yellow-500/70"
              : " border-yellow-500/50 text-neutral-300"
          }  flex items-center justify-center gap-2 h-full px-4 font-medium border rounded-full dark:bg-transparent relative  transition-all duration-100 cursor-pointer`}
        >
          <Sparkles
            className={`${activeEditor != "AI" && "opacity-60"} w-4 h-4 text-yellow-400`}
          />
          AI
        </button>
        {/* Preview Toggle */}
        {reworkUI ||
          (showPreview && (
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setShowPreview((prev) => !prev)}
                aria-pressed={showPreview}
                className="
                    group
                    inline-flex
                    h-8
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-neutral-900/40
                    px-3
                    text-[10px]
                    font-medium
                    tracking-[0.12em]
                    text-white/30
                    transition-all
                    duration-200
                    hover:border-violet-400/20
                    hover:bg-violet-400/[0.045]
                    hover:text-white/55
                    focus:outline-none

                    focus:ring-violet-400/30
                    cursor-pointer"
              >
                <span
                  className={`
          relative
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-md
          border
          transition-all
          duration-200
          ${
            showPreview
              ? "border-violet-400/30 bg-violet-400/[0.08] text-violet-300"
              : "border-white/[0.06] bg-white/[0.02] text-white/25"
          }
        `}
                >
                  <Eye
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-105"
                    strokeWidth={1.8}
                  />
                </span>

                {/* <span>Preview</span> */}
              </button>
            </div>
          ))}
      </div>

      {activeComponentIndex != null && (
        <div className="ml-auto mr-3 h-full py-1">
          <p className="h-full text-neutral-500 flex items-center justify-center gap-2 px-4 py-2 font-medium border rounded-xl border-gray-50 dark:border-lightBorder relative  transition-all duration-100 cursor-not-allowed">
            {targetTech == "HTML" ? "WEB BUNDLE" : "REACT"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIEditorTabs;
