import { Sparkles } from "lucide-react";

const EditorTabs = ({ activeEditor, setActiveEditor }) => {
  return (
    <div className="flex w-full dark:bg-transparent border-0 border-gray-200 dark:border-darkBorder mt-1 px-1">
      <div className="flex border rounded-xl overflow-hidden border-darkBorder">
        <button
          onClick={() => setActiveEditor("HTML")}
          className={`${
            activeEditor == "HTML" ? "border-red-700" : "border-transparent"
          } flex items-center justify-center border-x gap-2 h-full px-4 py-2 rounded-l-xl text-sm relative transition-all duration-100 cursor-pointer`}
        >
          {/* <FileText className="w-4 h-4 text-white p-0.5 bg-orange-600 rounded-sm" /> */}
          <img src="/html.svg" alt="" className="w-4 h-4" />
          HTML
        </button>
        <button
          onClick={() => setActiveEditor("CSS")}
          className={`${
            activeEditor == "CSS" ? "border-blue-700" : "border-transparent"
          } flex items-center justify-center border-x gap-2 px-4 py-2 text-sm relative  transition-all duration-100 cursor-pointer`}
        >
          {/* <Palette className="w-4 h-4 text-white p-0.5 bg-blue-600 rounded-sm" /> */}
          <img src="/css.svg" alt="" className="w-4 h-4" />
          CSS
        </button>
        <button
          onClick={() => setActiveEditor("JS")}
          className={`${
            activeEditor == "JS" ? "border-yellow-700" : "border-transparent"
          } flex items-center justify-center border-x gap-2 px-4 py-2 text-sm rounded-r-xl relative  transition-all duration-100 cursor-pointer`}
        >
          {/* <Code className="w-4 h-4 text-white p-0.5 bg-yellow-500 rounded-sm" /> */}
          <img src="/javascript.svg" alt="" className="w-4 h-4" />
          JavaScript
        </button>
      </div>
      <div className="ml-3 mr-auto h-full pr-1">
        <button
          onClick={() => setActiveEditor("AI")}
          className={`${
            activeEditor == "AI" ? "bg-gray-200 dark:bg-darkGrey" : ""
          } h-full text-yellow-300 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border-t border-b rounded-xl border-gray-50 dark:border-darkBorder relative  transition-all duration-100 cursor-pointer`}
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          AI
        </button>
      </div>
    </div>
  );
};

export default EditorTabs;
