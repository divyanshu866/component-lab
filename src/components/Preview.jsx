"use client";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";

const Preview = () => {
  const { previewCode, previewKey, isGenerating } = useEditorContext();
  const { consoleLogs, setConsoleLogs } = useConsole();

  return (
    <div
      className="flex w-[50%] h-full justify-center items-center border-l border-gray-200 dark:border-darkBorder"
      //   dangerouslySetInnerHTML={{ __html: html }}
    >
      <iframe
        key={previewKey}
        srcDoc={previewCode}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
        className={`w-full h-full ${isGenerating ? "animate-pulse" : ""}`}
      />
    </div>
  );
};

export default Preview;
