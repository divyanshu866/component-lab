"use client";
import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { Maximize2, Minimize2 } from "lucide-react";
import { TargetTech } from "@prisma/client";

const ReactIFrame = ({ isMobile }) => {
  const {
    reactPreviewDocument,
    previewKey,
    isGenerating,
    showPreview,
    isMaximised,
    setIsMaximised,
    targetTech,
  } = useEditorContext();

  return (
    <div
      className={`${targetTech != "REACT" && "hidden"} absolute top-0 right-0 bg-white ${
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
      <iframe
        key={previewKey}
        title="React Preview"
        sandbox="allow-scripts allow-same-origin" //Reduced security access to localstorage & parent dom
        // sandbox="allow-scripts"                Enhanced Security
        srcDoc={reactPreviewDocument}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default ReactIFrame;
