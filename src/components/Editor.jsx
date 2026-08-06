"use client";
import ComponentEditor from "@/components/ComponentEditor";
import EditorTabs from "@/components/EditorTabs";
import AIEditor from "@/components/AIEditor";
import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { useConsole } from "@/context/ConsoleContext";

const Editor = ({ user, isMobile }) => {
  const {
    setSelectedType,
    setSelectedStyle,
    activeComponent,
    setActiveComponent,
    updatePreview,
    components,
    setShowPreview,
    saveComponent,
    activeComponentIndex,
    activeEditor,
    setActiveEditor,
    isMaximised,
    setIsMaximised,
    setReworkUI,
    isGenerating,
    setActiveMessages,
    setActiveComponentIndex,
  } = useEditorContext();

  useEffect(() => {
    if (isMobile) {
      setShowPreview(false);
    }
  }, [activeEditor]);

  const { consoleLogs, setConsoleLogs } = useConsole();

  useEffect(() => {
    if (activeComponentIndex != null && components[activeComponentIndex]) {
      console.log("compIndex", activeComponentIndex);
      const c = components[activeComponentIndex];

      setActiveComponent({
        id: c.id,
        messages: c.prompts || [],
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
        setShowPreview(true);

        e.preventDefault(); // Prevent default browser "Save page"
        console.log("Preview updated via Cmd/Ctrl + S");
        setConsoleLogs([]);
        updatePreview(
          activeComponent.html,
          activeComponent.css,
          activeComponent.js,
        );
        saveComponent(
          [],
          activeComponent.name,
          activeComponent.html,
          activeComponent.css,
          activeComponent.js,
        );
        setReworkUI(true);
      }
    };

    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [activeComponent]); // Re-bind when component changes

  // Add keyboard shortcut for Cmd/Ctrl + K
  useEffect(() => {
    const handleNewComponentShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        e.stopPropagation();

        if (isGenerating) return;

        setShowPreview(false);
        setActiveMessages([]);
        setReworkUI(false);
        setActiveComponentIndex(null);
        setSelectedType("Custom type");
        setSelectedStyle("Custom style");
        setActiveComponent({
          id: "",
          messages: [],
          name: "",
          html: "",
          css: "",
          js: "",
        });
        setActiveEditor("AI");
        setConsoleLogs([]);
        updatePreview();

        console.log("New Component");
      }
    };

    window.addEventListener("keydown", handleNewComponentShortcut);

    return () => {
      window.removeEventListener("keydown", handleNewComponentShortcut);
    };
  }, [isGenerating, activeComponent]);
  return (
    <div
      className={`${
        isMobile ? "w-full h-full absolute" : "w-0"
      } ${isMaximised ? "hidden" : ""} flex flex-col flex-1 border-r-0 dark:border-darkBorder bg-transparent`}
    >
      <div className="w-full h-full p-1 pb-0 pt-0 overflow-hidden">
        <div className="flex h-full w-full flex-col overflow-hidden border-x border-darkBorder">
          {/* EditorTabs Prefered Spot */}
          <EditorTabs
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
          {/* AI Editor */}
          <AIEditor
            user={user}
            isMobile={isMobile}
            activeEditor={activeEditor}
          />
          {/* Editors */}
          <div
            className={`${
              activeEditor == "HTML" ? "" : "hidden"
            } flex flex-col flex-1 h-full py-4 overflow-hidden relative`}
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
            } flex flex-col flex-1 py-4 overflow-hidden h-full`}
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
            } flex flex-col h-full flex-1 py-4 overflow-hidden`}
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
      </div>
    </div>
  );
};

export default Editor;
