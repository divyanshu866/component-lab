import { Sparkles } from "lucide-react";

const EditorTabs = ({ activeEditor, setActiveEditor }) => {
  return (
    <div className="flex h-10 w-full dark:bg-darkSecondary border-b border-gray-200 dark:border-darkBorder">
      <div className="flex">
        <button
          onClick={() => setActiveEditor("HTML")}
          className={`${
            activeEditor == "HTML" ? "bg-gray-200 dark:bg-darkGrey" : ""
          } flex items-center justify-center gap-2 px-4 dark:border-darkBorder text-sm relative transition-all duration-100 cursor-pointer`}
        >
          {/* <FileText className="w-4 h-4 text-white p-0.5 bg-orange-600 rounded-sm" /> */}
          <img src="/html.svg" alt="" className="w-4 h-4" />
          HTML
          {activeEditor == "HTML" && (
            <div className="w-full h-[0.09rem] bottom-0 primary-gradient absolute"></div>
          )}
        </button>
        <button
          onClick={() => setActiveEditor("CSS")}
          className={`${
            activeEditor == "CSS" ? "bg-gray-200 dark:bg-darkGrey" : ""
          } flex items-center justify-center gap-2 px-4 text-sm border-l border-gray-200 dark:border-darkBorder relative  transition-all duration-100 cursor-pointer`}
        >
          {/* <Palette className="w-4 h-4 text-white p-0.5 bg-blue-600 rounded-sm" /> */}
          <img src="/css.svg" alt="" className="w-4 h-4" />
          CSS
          {activeEditor == "CSS" && (
            <div className="w-full h-[0.09rem] bottom-0 primary-gradient absolute"></div>
          )}
        </button>
        <button
          onClick={() => setActiveEditor("JS")}
          className={`${
            activeEditor == "JS" ? "bg-gray-200 dark:bg-darkGrey" : ""
          } flex items-center justify-center gap-2 px-4 text-sm border-l border-r border-gray-200 dark:border-darkBorder relative  transition-all duration-100 cursor-pointer`}
        >
          {/* <Code className="w-4 h-4 text-white p-0.5 bg-yellow-500 rounded-sm" /> */}
          <img src="/javascript.svg" alt="" className="w-4 h-4" />
          JavaScript
          {activeEditor == "JS" && (
            <div className="w-full h-[0.09rem] bottom-0 primary-gradient absolute"></div>
          )}
        </button>
      </div>
      <div className="ml-auto h-full py-1 pr-1">
        <button
          onClick={() => setActiveEditor("AI")}
          className={`${
            activeEditor == "JS" ? "bg-gray-200 dark:bg-darkGrey" : ""
          } h-full text-yellow-300 flex items-center justify-center gap-2 px-4 text-sm font-medium border-t border-b rounded-full border-gray-50 dark:border-darkBorder relative  transition-all duration-100 cursor-pointer`}
        >
          {/* <Code className="w-4 h-4 text-white p-0.5 bg-yellow-500 rounded-sm" /> */}
          <Sparkles className="w-4 h-4 text-yellow-300" />
          AI
        </button>
      </div>
    </div>
  );
};

export default EditorTabs;
