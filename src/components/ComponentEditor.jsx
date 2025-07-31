// ComponentEditor.tsx
import Editor from "@monaco-editor/react";
import * as emmetMonaco from "emmet-monaco-es";

import "@/styles/editor.css";

export default function ComponentEditor({ code, onChange, language }) {
  function handleEditorWillMount(monaco) {
    // Optional: Setup any monaco configurations before mounting
  }

  function handleEditorDidMount(editor, monaco) {
    // Enable Emmet for HTML and CSS
    emmetMonaco.emmetHTML(monaco);
    emmetMonaco.emmetCSS(monaco);

    // Override Tab to trigger Emmet
  }

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
