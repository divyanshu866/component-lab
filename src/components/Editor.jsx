"use client";
import Preview from "@/components/Preview";
import ComponentEditor from "@/components/ComponentEditor";

import { useEffect, useRef, useState } from "react";
import { Code, FileText, Palette } from "lucide-react";
import { useEditorContext } from "@/context/EditorContext";
import { useConsole } from "@/context/ConsoleContext";

const Editor = () => {
  const {
    activeComponent,
    setActiveComponent,
    previewCode,
    updatePreview,
    components,
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
  }, [activeComponentIndex, components]);

  return (
    <div className="flex flex-1 h-0 overflow-hidden">
      <div className="flex w-[50%] overflow-hidden">
        {/* Left Panel: Editors */}
        <div className="flex flex-col flex-1/2 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-2 flex items-center bg-gray-800 gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              <span className="flex items-center text-sm">HTML</span>
            </div>
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

          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-2 flex items-center bg-gray-800 gap-2">
              <Palette className="w-4 h-4 text-blue-500" />
              <span className="flex items-center text-sm">CSS</span>
            </div>
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

          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-2 flex items-center bg-gray-800 gap-2">
              <Code className="w-4 h-4 text-yellow-500" />
              <span className="flex items-center text-sm">JavaScript</span>
            </div>
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

      {/*preview window  */}
      <Preview finalHtml={previewCode} />
    </div>
  );
};

export default Editor;
