"use client";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import AILoader from "@/components/AILoader";
import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
const Preview = ({ isMobile }) => {
  const {
    previewCode,
    previewKey,
    isGenerating,
    showPreview,
    isMaximised,
    setIsMaximised,
  } = useEditorContext();
  const { consoleLogs, setConsoleLogs } = useConsole();
  return (
    <div
      className={`${
        showPreview
          ? isMobile
            ? "w-full h-full absolute mt-10 bg-white"
            : isMaximised
              ? "w-full justify-self-end"
              : "w-[50%]"
          : "w-0 opacity-0"
      } ${
        isMobile ? "" : ""
      }  flex h-full justify-center items-center border-l border-gray-200 dark:border-darkBorder relative transition-all duration-200`}
      //   dangerouslySetInnerHTML={{ __html: html }}
    >
      <button
        onClick={() => setIsMaximised(!isMaximised)}
        className="absolute top-2 right-2 z-10 bg-gray-200 dark:bg-darkSecondary text-gray-800 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-darkBorder transition-all duration-150"
      >
        {isMaximised ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
      <iframe
        key={previewKey}
        srcDoc={previewCode}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
        className={`w-full h-full ${showPreview ? "" : "opacity-0"} ${
          isGenerating ? "" : ""
        } transition-all duration-75`}
      />
      <AILoader isActive={isGenerating} />
    </div>
  );
};

export default Preview;
