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
    showPreview,
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
      URL.revokeObjectURL(url);
    };
  }, [reactPreviewDocument]);
  const showGeneratingIndicator = isGenerating && showPreview;
  return (
    <div
      className={`${targetTech != "REACT" && "hidden"} absolute top-0 right-0 ${
        showPreview
          ? isMobile
            ? "w-full h-full absolute mt-10 bg-white"
            : isMaximised
              ? "w-full justify-self-end bg-backgroundLight"
              : "w-[35%] bg-backgroundLight"
          : "w-0 opacity-0"
      } ${
        isMobile ? "" : ""
      }  flex flex-col h-full justify-center items-center border-l overflow-hidden border-darkBorder relative transition-all duration-400`}
    >
      <PreviewHeader
        isMaximised={isMaximised}
        setIsMaximised={setIsMaximised}
      />
      <iframe
        key={previewKey}
        src={previewUrl}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation" //Reduced security access to localstorage & parent dom
        title="React Preview"
        className={`w-full h-full ${showPreview ? "" : "none"} ${
          isGenerating ? "" : ""
        } transition-all duration-75`}
      />
      {/* Generating indicator overlay */}
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
