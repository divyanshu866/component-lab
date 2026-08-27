"use client";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import AILoader from "@/components/AILoader";
import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
const WebBundleIFrame = ({ isMobile }) => {
  const {
    htmlPreviewDocument,
    previewKey,
    isGenerating,
    showPreview,
    isMaximised,
    setIsMaximised,
    targetTech,
  } = useEditorContext();
  const { consoleLogs, setConsoleLogs } = useConsole();
  return (
    <div
      className={`${targetTech != "HTML" && "hidden"} absolute top-0 right-0 ${
        showPreview
          ? isMobile
            ? "w-full h-full absolute mt-10 bg-white"
            : isMaximised
              ? "w-full justify-self-end"
              : "w-[45%]"
          : "w-0 opacity-0"
      } ${
        isMobile ? "" : ""
      }  flex h-full justify-center items-center border-l rounded-2xl overflow-hidden border-gray-200 dark:border-darkBorder relative transition-all duration-200`}
    >
      <button
        onClick={() => setIsMaximised(!isMaximised)}
        className="absolute top-2 right-2 z-10 bg-gray-200 dark:bg-darkSecondary text-gray-800 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-darkBorder transition-all duration-150"
      >
        {isMaximised ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>

      {}
      <iframe
        key={previewKey}
        srcDoc={htmlPreviewDocument}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
        className={`w-full h-full ${showPreview ? "" : "opacity-0"} ${
          isGenerating ? "" : ""
        } transition-all duration-75`}
      />
      <AILoader isActive={isGenerating} />
    </div>
  );
};

export default WebBundleIFrame;
