"use client";
import { useEditorContext } from "@/context/EditorContext";

const Preview = () => {
  const { previewCode } = useEditorContext();

  return (
    <div
      className="flex w-[45vw] h-full justify-center items-center border-l border-gray-200 dark:border-darkBorder"
      //   dangerouslySetInnerHTML={{ __html: html }}
    >
      <iframe
        srcDoc={previewCode}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
        className="w-full h-full"
      />
    </div>
  );
};

export default Preview;
