"use client";
import { useEditorContext } from "@/context/EditorContext";
import AILoader from "@/components/AILoader";
import PreviewHeader from "@/components/Preview/PreviewHeader";
import { useEffect, useState } from "react";

const WebBundleIFrame = ({ isMobile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    htmlPreviewDocument,
    previewKey,
    isGenerating,
    showPreview,
    isMaximised,
    setIsMaximised,
    targetTech,
  } = useEditorContext();
  useEffect(() => {
    function generatePreview() {
      if (!htmlPreviewDocument) {
        setPreviewUrl(null);
        return;
      }

      const blob = new Blob([htmlPreviewDocument], {
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
  }, [htmlPreviewDocument]);
  return (
    <div
      className={`${targetTech != "HTML" && "hidden"} absolute top-0 right-0 ${
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
        src={previewUrl}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation" //Reduced security access to localstorage & parent dom
        title="WebBundle preview"
        className={`w-full h-full ${showPreview ? "" : "none"} ${
          isGenerating ? "" : ""
        } transition-all duration-75`}
      />
      <AILoader isActive={isGenerating} />
    </div>
  );
};

export default WebBundleIFrame;
