"use client";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import AILoader from "@/components/AILoader";
const Preview = ({ isMobile }) => {
  const { previewCode, previewKey, isGenerating, showPreview } =
    useEditorContext();
  const { consoleLogs, setConsoleLogs } = useConsole();

  return (
    <div
      className={`${
        showPreview
          ? isMobile
            ? "w-full h-full absolute mt-10 bg-white"
            : "w-[50%]"
          : "w-0 opacity-0"
      } ${
        isMobile ? "" : ""
      }  flex h-full justify-center items-center border-l border-gray-200 dark:border-darkBorder relative transition-all duration-200`}
      //   dangerouslySetInnerHTML={{ __html: html }}
    >
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
