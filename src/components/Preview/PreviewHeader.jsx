import { EyeClosed, Maximize2, Minimize2, Play } from "lucide-react";

function PreviewHeader({ isMaximised, setIsMaximised, setShowPreview }) {
  return (
    <div className="w-full h-10 flex justify-between items-center px-3 border-b border-darkBorder z-20">
      <div className="w-full h-full flex flex-nowrap justify-start items-center text-sm text-neutral-500 py-2 gap-2">
        <Play height={12} width={12} className="text-green-400" />
        <p>Live Preview</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setShowPreview(false);
            if (isMaximised) setIsMaximised(false);
          }}
          className={`bg-darkSecondary text-gray-200 px-1.5 py-1.5 rounded  border border-lightBorder hover:bg-darkBorder transition-all duration-150 cursor-pointer`}
        >
          <EyeClosed size={16} />
        </button>
        <button
          onClick={() => setIsMaximised(!isMaximised)}
          className={`hidden sm:flex bg-gray-200 dark:bg-darkSecondary text-gray-800 dark:text-gray-200 px-1.5 py-1.5 rounded hover:bg-gray-300 border dark:border-lightBorder dark:hover:bg-darkBorder transition-all duration-150 cursor-pointer`}
        >
          {isMaximised ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );
}

export default PreviewHeader;
