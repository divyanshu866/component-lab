"use client";

import { createContext, useState, useContext } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [components, setComponents] = useState([]);

  const [activeComponentIndex, setActiveComponentIndex] = useState(null);
  const [activeComponent, setActiveComponent] = useState({
    id: "",
    name: "",
    html: "",
    css: "",
    js: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [previewCode, setPreviewCode] = useState("");

  const saveComponent = async (name, html, css, js) => {
    const payload = { name, html, css, js };

    if (activeComponent?.id) {
      // Update existing component
      const res = await fetch(`/api/components/${activeComponent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setComponents((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      console.log("Updated");
    } else {
      // Create new component
      const res = await fetch("/api/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setComponents((prev) => [created, ...prev]);
      console.log(components);
      setActiveComponent({
        id: created.id,
        name: created.name,
        html: created.html,
        css: created.css,
        js: created.js,
      }); // set the new active component
      setActiveComponentIndex(0);
      console.log(activeComponent);
      console.log(created);
      console.log("created.......");
    }
  };

  const updatePreview = (html, css, js) => {
    const finalHtml = `
     <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    margin: 0;
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #f8fafc;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  ${css}
                </style>
              </head>
              <body>
                ${!html && !css && !js ? "<h1>Preview</h1>" : html}
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
                  try {
                    ${js}
                  } catch (e) {
                    console.error('JavaScript error:', e.message);
                  }
                </script>
              </body>
            </html>
    `;

    setPreviewCode(finalHtml);
    console.log("activeIndex Code", html);
  };
  return (
    <EditorContext.Provider
      value={{
        activeComponent,
        setActiveComponent,
        previewCode,
        updatePreview,
        setPreviewCode,
        components,
        setComponents,
        activeComponentIndex,
        setActiveComponentIndex,
        saveComponent,
        isSaving,
        setIsSaving,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export const useEditorContext = () => useContext(EditorContext);
