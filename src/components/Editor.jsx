"use client";
import ComponentEditor from "@/components/ComponentEditor";
import EditorTabs from "@/components/EditorTabs";

import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { useConsole } from "@/context/ConsoleContext";

const Editor = () => {
  const [activeEditor, setActiveEditor] = useState("HTML");

  const {
    activeComponent,
    setActiveComponent,
    previewCode,
    updatePreview,
    components,
    saveComponent,
    activeComponentIndex,
  } = useEditorContext();
  const { consoleLogs, setConsoleLogs } = useConsole();
  useEffect(() => {
    if (activeComponentIndex != null && components[activeComponentIndex]) {
      console.log("compIndex", activeComponentIndex);
      const c = components[activeComponentIndex];

      setActiveComponent({
        id: c.id,
        name: c.name,
        html: c.html,
        css: c.css,
        js: c.js,
      });
      setConsoleLogs([]);

      updatePreview(c.html, c.css, c.js);
    }
  }, [activeComponentIndex]);

  // Add keyboard shortcut for Cmd/Ctrl + S
  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault(); // Prevent default browser "Save page"
        console.log("Preview updated via Cmd/Ctrl + S");

        updatePreview(
          activeComponent.html,
          activeComponent.css,
          activeComponent.js
        );
        saveComponent(
          activeComponent.name,
          activeComponent.html,
          activeComponent.css,
          activeComponent.js
        );
      }
    };

    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [activeComponent]); // Re-bind when component changes

  return (
    <div className="flex flex-col flex-1 w-0">
      <EditorTabs
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      {/* Editors */}
      <div
        className={`${
          activeEditor == "HTML" ? "" : "hidden"
        } flex flex-col flex-1 overflow-hidden`}
      >
        <div className="flex-1 h-0">
          <ComponentEditor
            code={activeComponent.html}
            onChange={(val) =>
              setActiveComponent((prev) => ({ ...prev, html: val }))
            }
            language="html"
          />
        </div>
      </div>

      <div
        className={`${
          activeEditor == "CSS" ? "" : "hidden"
        } flex flex-col flex-1 overflow-hidden`}
      >
        <div className="flex-1 h-0">
          <ComponentEditor
            code={activeComponent.css}
            onChange={(val) =>
              setActiveComponent((prev) => ({ ...prev, css: val }))
            }
            language="css"
          />
        </div>
      </div>

      <div
        className={`${
          activeEditor == "JS" ? "" : "hidden"
        } flex flex-col flex-1 overflow-hidden`}
      >
        <div className="flex-1 h-0">
          <ComponentEditor
            code={activeComponent.js}
            onChange={(val) =>
              setActiveComponent((prev) => ({ ...prev, js: val }))
            }
            language="javascript"
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
