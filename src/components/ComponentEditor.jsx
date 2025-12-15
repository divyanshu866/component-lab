// ComponentEditor.tsx
import Editor from "@monaco-editor/react";
import * as emmetMonaco from "emmet-monaco-es";
import { useEffect, useRef } from "react";
import { useEditorContext } from "@/context/EditorContext";

import "@/styles/editor.css";

export default function ComponentEditor({ code, onChange, language }) {
  const editorRef = useRef(null);
  const { isGenerating } = useEditorContext();

  function handleEditorWillMount(monaco) {
    // Optional: Setup any monaco configurations before mounting
  }

  function handleEditorDidMount(editor, monaco) {
    // Store editor reference for auto-scroll
    editorRef.current = editor;

    // Enable Emmet for HTML and CSS
    emmetMonaco.emmetHTML(monaco);
    emmetMonaco.emmetCSS(monaco);

    // Override Tab to trigger Emmet
  }

  // Auto-scroll to end when code is being streamed
  useEffect(() => {
    if (isGenerating && editorRef.current && code) {
      try {
        const model = editorRef.current.getModel();
        if (model) {
          const lineCount = model.getLineCount();
          // Scroll to reveal the last line
          editorRef.current.revealLine(lineCount);
          // Set cursor position to end of document
          const lastLineLength = model.getLineLength(lineCount);
          editorRef.current.setPosition({
            lineNumber: lineCount,
            column: lastLineLength + 1,
          });
        }
      } catch (error) {
        // Silently handle any errors during auto-scroll
        console.debug("Auto-scroll error:", error);
      }
    }
  }, [code, isGenerating]);

  return (
    <div className="relative flex items-center justify-center h-full">
      <Editor
        height="100%"
        defaultLanguage={language} // "html", "css", or "javascript"
        value={code}
        theme="vs-dark"
        onChange={onChange}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          autoClosingBrackets: true,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      {!code && (
        <img
          src={`${language}.svg`}
          alt=""
          className="absolute max-w-45 max-h-45 h-full w-full p-5 opacity-30"
        />
      )}
    </div>
  );
}
