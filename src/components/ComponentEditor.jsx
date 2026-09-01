// ComponentEditor.tsx
import Editor from "@monaco-editor/react";
import * as emmetMonaco from "emmet-monaco-es";
import { useEffect, useRef } from "react";
import { useEditorContext } from "@/context/EditorContext";

import "@/styles/editor.css";

export default function ComponentEditor({ code, onChange, language }) {
  const { isGenerating } = useEditorContext();
  const editorRef = useRef(null);
  let editorLanguage;
  switch (language) {
    case "html":
      editorLanguage = "html";
      break;
    case "css":
      editorLanguage = "css";
      break;
    case "javascript":
      editorLanguage = "javascript";
      break;
    case "jsx":
      editorLanguage = "javascript";
      break;
  }
  function handleEditorWillMount(monaco) {
    // Enable JSX/React support in Monaco's JavaScript language service
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      allowJs: true,
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
    });

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
        defaultLanguage={editorLanguage} // "jsx", "html", "css", or "javascript"
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
