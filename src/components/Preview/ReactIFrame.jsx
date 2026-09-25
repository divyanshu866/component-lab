"use client";
import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { Maximize2, Minimize2 } from "lucide-react";
import PreviewHeader from "./PreviewHeader";

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
      className={`${targetTech != "REACT" && "hidden"} absolute top-0 right-0 ${
        showPreview
          ? isMobile
            ? "w-full h-full absolute mt-10 bg-white"
            : isMaximised
              ? "w-full justify-self-end"
              : "w-[35%]"
          : "w-0 opacity-0"
      } ${
        isMobile ? "" : ""
      }  flex flex-col h-full justify-center items-center border-l overflow-hidden border-gray-200 dark:border-darkBorder relative transition-all duration-400`}
    >
      <PreviewHeader
        isMaximised={isMaximised}
        setIsMaximised={setIsMaximised}
      />
      <iframe
        key={previewKey}
        title="React Preview"
        sandbox="allow-scripts allow-same-origin" //Reduced security access to localstorage & parent dom
        // sandbox="allow-scripts"                Enhanced Security
        srcDoc={reactPreviewDocument}
        className={`w-full h-full ${showPreview ? "" : "none"} ${
          isGenerating ? "" : ""
        } transition-all duration-75`}
      />
    </div>
  );
};

export default ReactIFrame;
