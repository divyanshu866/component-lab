import { Maximize2, Minimize2, Play } from "lucide-react";
import React from "react";

function PreviewHeader({ isMaximised, setIsMaximised }) {
  return (
    <div className="w-full h-12 flex justify-between items-center px-3 border-b border-lightBorder">
      <div className="w-full h-full flex flex-nowrap justify-start items-center text-sm text-neutral-500 py-2 gap-2">
        <Play height={12} width={12} className="text-green-400" />
        <p>Live Preview</p>
      </div>
      <button
        onClick={() => setIsMaximised(!isMaximised)}
        className="bg-gray-200 dark:bg-darkSecondary text-gray-800 dark:text-gray-200 px-1.5 py-1.5 rounded hover:bg-gray-300 border dark:border-lightBorder dark:hover:bg-darkBorder transition-all duration-150 cursor-pointer"
      >
        {isMaximised ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
}

export default PreviewHeader;
