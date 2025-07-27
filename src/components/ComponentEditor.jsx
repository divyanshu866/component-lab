// ComponentEditor.tsx
import Editor from "@monaco-editor/react";
import "@/styles/editor.css";

export default function ComponentEditor({ code, onChange, language }) {
  return (
    <div className="relative flex items-center justify-center h-full">
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
      {!code && (
        <img
          src={`${language}.svg`}
          alt=""
          className="absolute max-w-40 max-h-40 h-full w-full p-2 opacity-30"
        />
      )}

      {/* <div className="absolute w-full h-full  z-50"></div> */}
    </div>
  );
}
