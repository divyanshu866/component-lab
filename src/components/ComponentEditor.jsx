// ComponentEditor.tsx
import Editor from "@monaco-editor/react";

export default function ComponentEditor({ code, onChange, language }) {
  return (
    <Editor
      height={"100%"}
      defaultLanguage={language} // "html", "css", or "javascript"
      value={code}
      theme="vs-dark"
      onChange={onChange}
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
  );
}
