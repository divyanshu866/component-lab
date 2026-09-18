import { Sparkles } from "lucide-react";
import Image from "next/image";

const AIEditorTabs = ({
  activeComponentIndex,
  activeEditor,
  setActiveEditor,
  targetTech,
  setTargetTech,
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
      <div className="ml-3 mr-auto h-full py-1">
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
