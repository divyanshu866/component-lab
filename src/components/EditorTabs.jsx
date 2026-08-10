import { Sparkles } from "lucide-react";

const EditorTabs = ({
  activeComponentIndex,
  activeEditor,
  setActiveEditor,
  targetTech,
  setTargetTech,
}) => {
  return (
    <div className="flex w-full dark:bg-transparent border-0 border-gray-200 dark:border-lightBorder mt-2 px-2">
      <div className="inline-flex gap-0.5 border border-lightBorder rounded-xl p-0 bg-white/0 backdrop-blur-md">
        {targetTech === "REACT" && (
          <>
            <button
              onClick={() => setActiveEditor("JSX")}
              className={`${
                activeEditor === "JSX"
                  ? "border-cyan-700"
                  : "border-transparent"
              } flex items-center justify-center border-x gap-2 h-full px-5 py-3 rounded-l-xl text-sm relative transition-all duration-100 cursor-pointer`}
            >
              <img src="/jsx.svg" alt="" className="w-4 h-4" />
              JSX
            </button>
          </>
        )}
        {targetTech === "HTML" && (
          <>
            <button
              onClick={() => setActiveEditor("HTML")}
              className={`${
                activeEditor === "HTML"
                  ? "border-red-700"
                  : "border-transparent"
              } flex items-center justify-center border-x gap-2 h-full px-5 py-3 rounded-l-xl text-sm relative transition-all duration-100 cursor-pointer`}
            >
              <img src="/html.svg" alt="" className="w-4 h-4" />
              HTML
            </button>
          </>
        )}
        <button
          onClick={() => setActiveEditor("CSS")}
          className={`${
            activeEditor === "CSS" ? "border-blue-700" : "border-transparent"
          } flex items-center justify-center ${targetTech === "REACT" && " rounded-r-xl"} border-x gap-2 px-5 py-3 text-sm relative  transition-all duration-100 cursor-pointer`}
        >
          <img src="/css.svg" alt="" className="w-4 h-4" />
          CSS
        </button>
        {targetTech === "HTML" && (
          <>
            <button
              onClick={() => setActiveEditor("JS")}
              className={`${
                activeEditor === "JS"
                  ? "border-yellow-700"
                  : "border-transparent"
              } flex items-center justify-center border-x gap-2 px-5 py-3 text-sm rounded-r-xl relative  transition-all duration-100 cursor-pointer`}
            >
              <img src="/javascript.svg" alt="" className="w-4 h-4" />
              JavaScript
            </button>
          </>
        )}
      </div>
      <div className="ml-3 mr-auto h-full pr-1">
        <button
          onClick={() => setActiveEditor("AI")}
          className={`${
            activeEditor === "AI"
              ? " border-yellow-500/50"
              : " border-lightBorder"
          } h-full text-yellow-300 flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium border-y rounded-full dark:bg-transparent relative  transition-all duration-100 cursor-pointer`}
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          AI
        </button>
      </div>

      {activeComponentIndex != null && (
        <div className="ml-auto mr-3 h-full pr-1">
          <p className="h-full text-neutral-500 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border-t border-b rounded-xl border-gray-50 dark:border-lightBorder relative  transition-all duration-100 cursor-not-allowed">
            {targetTech} COMPONENT
          </p>
        </div>
      )}
    </div>
  );
};

export default EditorTabs;
