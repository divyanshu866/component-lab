"use client";
import { createContext, useState, useContext, useEffect } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [activeEditor, setActiveEditor] = useState("AI");

  const [components, setComponents] = useState([]);
  const [reworkUI, setReworkUI] = useState(false);
  const [activeComponent, setActiveComponent] = useState({
    id: "",
    messages: [],
    name: "",
    html: "",
    css: "",
    js: "",
  });
  const [activeComponentIndex, setActiveComponentIndex] = useState(null);

  const [activeMessages, setActiveMessages] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMaximised, setIsMaximised] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [changeDesc, setChangeDesc] = useState("");

  const [previewKey, setPreviewKey] = useState(0);

  const [isSaving, setIsSaving] = useState(false);
  const [previewCode, setPreviewCode] = useState("");
  useEffect(() => {
    updatePreview();
  }, []);
  const saveComponent = async (messages, name, html, css, js) => {
    if (!name.trim()) {
      return;
    }

    const payload = { messages, name, html, css, js };
    console.log("Payload for saving component>>> (saveComponent()):", payload);
    if (activeComponent?.id) {
      // Update existing component
      const res = await fetch(`/api/components/${activeComponent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setComponents((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      );
      // set the new active component
      setActiveComponent(updated);
      setActiveMessages(updated.prompts || []);

      console.log("Updated", updated);
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
        messages: created.prompts || [],
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
  const createNewComponent = async (messages, name, html, css, js) => {
    if (!name.trim()) {
      return;
    }
    const payload = { messages, name, html, css, js };

    // Create new component
    const res = await fetch("/api/components", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const created = await res.json();
    setComponents((prev) => [created, ...prev]);
    setActiveComponent({
      id: created.id,
      messages: messages,
      name: created.name,
      html: created.html,
      css: created.css,
      js: created.js,
    }); // set the new active component
    // setActiveMessages(created.prompts || []); // set the new active messages
    setActiveComponentIndex(0);

    console.log("created.......", created);
  };
  const updatePreview = (html = "", css = "", js = "") => {
    const boilerCss = `body {
                    margin: 0;
                    padding:0;
                    height:100vh;
                    width:100%;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #0f0f0f;
                    color:#fff;
                    display: flex;
                    flex-direction:column;
                    align-items: center;
                    justify-content: center;
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
                ${css ? "" : boilerCss}         

                  ${css}
                </style>
              </head>
              <body>
                ${
                  !html && !css && !js
                    ? ' <img src="/newlogo.svg" alt="Logo"/>'
                    : html
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
        activeEditor,
        activeMessages,
        setActiveMessages,
        setActiveEditor,
        activeComponent,
        setActiveComponent,
        previewCode,
        setPreviewCode,
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
        createNewComponent,
        isSaving,
        setIsSaving,
        isMaximised,
        setIsMaximised,
        reworkUI,
        setReworkUI,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export const useEditorContext = () => useContext(EditorContext);
