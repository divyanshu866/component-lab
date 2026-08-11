"use client";
import { createContext, useState, useContext, useEffect } from "react";
import * as esbuild from "esbuild-wasm";

const EditorContext = createContext();
let esbuildInitPromise = null;
const initializeEsbuild = () => {
  if (!esbuildInitPromise) {
    esbuildInitPromise = esbuild.initialize({
      wasmURL: "/esbuild.wasm",
    });
  }

  return esbuildInitPromise;
};
export function EditorProvider({ children }) {
  const [selectedType, setSelectedType] = useState();
  const [selectedStyle, setSelectedStyle] = useState();
  const [activeEditor, setActiveEditor] = useState("AI");
  const [targetTech, setTargetTech] = useState("HTML");

  const [components, setComponents] = useState([]);
  const [reworkUI, setReworkUI] = useState(false);
  const [activeComponent, setActiveComponent] = useState({
    id: "",
    messages: [],
    name: "",

    targetTech: "HTML",
    html: "",
    css: "",
    js: "",
    jsx: "",
  });
  const [activeComponentIndex, setActiveComponentIndex] = useState(null);

  const [activeMessages, setActiveMessages] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMaximised, setIsMaximised] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [changeDesc, setChangeDesc] = useState("");

  //EsBuild
  const [previewKey, setPreviewKey] = useState(0);
  const [esbuildReady, setEsbuildReady] = useState(false);
  const [error, setError] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [htmlPreviewDocument, setHtmlPreviewDocument] = useState("");
  const reactDefaultPreview = `function App() {
      return <h1>Hello ComponentLab</h1>;
    }

    export default App;`;
  const [reactPreviewDocument, setReactPreviewDocument] = useState("");

  // Initialize esbuild once.
  useEffect(() => {
    let cancelled = false;

    initializeEsbuild()
      .then(() => {
        if (!cancelled) {
          setEsbuildReady(true);
          console.log("====>>> esbuild initialized");
        }
      })
      .catch((error) => {
        console.error("Failed to initialize esbuild:", error);

        if (!cancelled) {
          setError(error.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const compileJSX = async (jsx) => {
    try {
      setError(null);

      const result = await esbuild.transform(jsx, {
        loader: "jsx",
        target: "es2020",
        format: "iife",
        globalName: "Component",
      });

      console.log("COMPILED JS:");
      console.log(result.code);

      return result.code;
    } catch (error) {
      console.error("ESBUILD ERROR:", error);

      setError(error.message);
      return "";
    }
  };

  useEffect(() => {
    updatePreview();
  }, []);

  const saveComponent = async (component) => {
    // (messages, name, html, css, js);
    if (!component.name.trim()) {
      return;
    }
    const payload = {
      id: component.id,
      messages: component.messages,
      name: component.name,
      html: component.html,
      css: component.css,
      js: component.js,
      jsx: component.jsx,
      targetTech: component.targetTech,
      usageMetadata: component.usageMetadata,
      model: component.model,
    };
    // Is New Component generation?
    if (!component?.id) {
      const res = await fetch("/api/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setActiveMessages(created?.prompts || []);
      setComponents((prev) => [created, ...prev]);
      setActiveComponentIndex(0);
      setActiveComponent({
        id: created.id,
        messages: created.prompts || [],
        name: created.name,
        targetTech: created.targetTech,
        html: created.html,
        css: created.css,
        js: created.js,
        jsx: created.jsx,
      });
    } else {
      // Update existing component
      const res = await fetch(`/api/components/${component.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setComponents((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      );

      setActiveComponent({
        id: updated.id,
        messages: updated.prompts || [],
        name: updated.name,
        html: updated.html,
        css: updated.css,
        js: updated.js,
        targetTech: updated.targetTech,
        jsx: updated.jsx,
      });
      setActiveMessages(updated?.prompts || []);
    }
  };
  const updatePreview = async (
    component = {
      id: "",
      name: "",
      html: "",
      css: "",
      js: "",
      jsx: "",
      targetTech: targetTech,
    },
  ) => {
    if (component.targetTech === "HTML") {
      const boilerCss = `body {
                    margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: transparent;
  display:flex;
  justify-content:center;
  align-items:center;
  color: white;
                  }
                  img{
    max-width: 400px;
    max-height: 400px;
    height: 100%;
    width: 100%;
}  
                  `;
      const finalHtml = `
     <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Preview</title>
    <style>
                ${component.css ? "" : boilerCss}         

                  ${component.css}
                </style>
              </head>
              <body>
                ${
                  !component.html && !component.css && !component.js
                    ? ' <img src="/newlogo.svg" alt="Logo"/>'
                    : component.html
                }
                <script>
                  // Override console methods to send messages to parent
                  const originalLog = console.log;
                  const originalError = console.error;
                  const originalWarn = console.warn;
                  console.log = function(...args) {
                    window.parent.postMessage({
                      type: 'console',
                      level: 'log',
                      message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
                    }, '*');
                    originalLog.apply(console, args);
                  };
                  console.error = function(...args) {
                    window.parent.postMessage({
                      type: 'console',
                      level: 'error',
                      message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
                    }, '*');
                    originalError.apply(console, args);
                  };
                  console.warn = function(...args) {
                    window.parent.postMessage({
                      type: 'console',
                      level: 'warn',
                      message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
                    }, '*');
                    originalWarn.apply(console, args);
                  };
                  // Catch unhandled errors
                  window.addEventListener('error', function(e) {
                    console.error('Error:', e.message, 'at', e.filename + ':' + e.lineno);
                  });
                   document.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', e => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Link clicked:', link.href);
                    });
                });
                  try {
                    ${component.js}
                  } catch (e) {
                    console.error('JavaScript error:', e.message);
                  }
                </script>
              </body>
            </html>
    `;

      setHtmlPreviewDocument(finalHtml);
    }

    if (component.targetTech === "REACT") {
      const compiledJsx = await compileJSX(component.jsx);
      const constructedReactDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />

        <style>
          ${component.css}
        </style>
      </head>

      <body>
        <div id="root"></div>
<script src="https://cdn.tailwindcss.com"></script>
        <script type="module">
          import React from "https://esm.sh/react@19";
          import ReactDOMClient from "https://esm.sh/react-dom@19/client";

          ${compiledJsx ? compiledJsx : ""}

          const root = ReactDOMClient.createRoot(
            document.getElementById("root")
          );

          root.render(
            React.createElement(Component.default)
          );
        </script>
      </body>
    </html>
  `;
      setReactPreviewDocument(constructedReactDoc);
    }

    // console.log("activeIndex Code", component.html);
  };

  return (
    <EditorContext.Provider
      value={{
        selectedType,
        setSelectedType,
        selectedStyle,
        setSelectedStyle,
        activeEditor,
        activeMessages,
        setActiveMessages,
        setActiveEditor,
        activeComponent,
        setActiveComponent,
        htmlPreviewDocument,
        setHtmlPreviewDocument,
        reactPreviewDocument,
        setReactPreviewDocument,
        previewKey,
        setPreviewKey,
        updatePreview,
        sidebarCollapsed,
        setSidebarCollapsed,
        components,
        setComponents,
        activeComponentIndex,
        setActiveComponentIndex,
        changeDesc,
        setChangeDesc,
        isGenerating,
        setIsGenerating,
        showPreview,
        setShowPreview,
        saveComponent,

        isSaving,
        setIsSaving,
        isMaximised,
        setIsMaximised,
        reworkUI,
        setReworkUI,
        targetTech,
        setTargetTech,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export const useEditorContext = () => useContext(EditorContext);
