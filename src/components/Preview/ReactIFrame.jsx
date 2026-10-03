"use client";

import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import PreviewHeader from "./PreviewHeader";
import GeneratingIndicator from "./GenerationIndicator";

const ReactIFrame = ({ isMobile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    reactPreviewDocument,
    previewKey,
    isGenerating,
    isGeneratingCode,
    showPreview,
    setShowPreview,
    isMaximised,
    setIsMaximised,
    targetTech,
  } = useEditorContext();

  useEffect(() => {
    function generatePreview() {
      if (!reactPreviewDocument) {
        setPreviewUrl(null);
        return;
      }

      const blob = new Blob([reactPreviewDocument], {
        type: "text/html",
      });

      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      return url;
    }

    const url = generatePreview();
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [reactPreviewDocument]);

  const showGeneratingIndicator = isGeneratingCode && showPreview;

  return (
    <div
      className={`${
        targetTech !== "REACT" ? "hidden" : ""
      } absolute right-0 top-0 z-20 flex h-full flex-col items-center justify-center overflow-hidden border-l border-darkBorder transition-[width,transform,opacity] duration-300 ease-in-out ${
        isMobile
          ? `h-full w-full bg-backgroundLight ${
              showPreview
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 pointer-events-none"
            }`
          : showPreview
            ? isMaximised
              ? "w-full bg-backgroundLight"
              : "w-[35%] bg-backgroundLight"
            : "w-0 pointer-events-none opacity-0"
      }`}
    >
      <PreviewHeader
        isMaximised={isMaximised}
        setIsMaximised={setIsMaximised}
        setShowPreview={setShowPreview}
        isMobile={isMobile}
      />
      <iframe
        key={previewKey}
        src={previewUrl}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
        title="React Preview"
        className={`h-full w-full transition-all duration-75 ${
          showPreview ? "" : "hidden"
        } ${isGenerating ? "" : ""}`}
      />
      <div
        aria-hidden={!showGeneratingIndicator}
        className={`transition-opacity duration-300 ${
          showGeneratingIndicator
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {showGeneratingIndicator && <GeneratingIndicator />}
      </div>
    </div>
  );
};

export default ReactIFrame;
