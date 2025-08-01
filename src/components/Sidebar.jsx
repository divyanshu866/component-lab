"use client";
import { PanelRight, Plus, Sparkles, Zap } from "lucide-react";
// import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { useConsole } from "@/context/ConsoleContext";
import { AI_MODELS } from "@/ai/models";
export default function Sidebar() {
  // const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].value);
  useEffect(() => {
    console.log(selectedModel);
  }, [selectedModel]);
  const {
    components,
    setComponents,
    activeComponent,
    setActiveComponent,
    activeComponentIndex,
    setActiveComponentIndex,
    setChangeDesc,
    createNewComponent,
    isGenerating,
    setIsGenerating,
    setShowPreview,
    updatePreview,
  } = useEditorContext();
  const { setConsoleLogs, showConsole, setShowConsole } = useConsole();

  function updateActiveComponent(index) {
    if (isGenerating) {
      return;
    }
    setShowPreview(true);

    setActiveComponentIndex(index);

    setChangeDesc("");
  }
  useEffect(() => {
    async function fetchComponents() {
      const res = await fetch("/api/components");
      if (res.ok) {
        const data = await res.json();
        setComponents(data);
      } else {
        console.error("Failed to fetch components");
      }
    }
    fetchComponents();
  }, []);
  const clearScreen = (name = "", html = "", css = "", js = "") => {
    console.log("cleared");
    setShowPreview(false);

    setActiveComponentIndex(null);

    if (true) {
      console.log("name==>", name);
      setActiveComponent({
        id: "",
        name: name,
        html: html,
        css: css,
        js: js,
      });
    }
    setConsoleLogs([]);
    updatePreview();
    console.log();
  };

  return (
    <aside
      className={`h-full flex flex-col overflow-y-hidden border-r border-gray-200 dark:border-darkBorder dark:bg-darkSecondary transition-all duration-100 ${
        collapsed ? "w-12" : "w-75"
      }`}
    >
      <div
        className={`${
          collapsed ? "justify-end" : "justify-between"
        } pr-2" flex items-center h-10 border-b border-gray-200 dark:border-darkBorder`}
      >
        <h3
          className={`${
            collapsed ? "hidden" : ""
          } text-sm font-semibold text-gray-400 mx-3 m-2`}
        >
          Component Library
        </h3>
        {/* {!collapsed && ( */}
        <button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className={`${
            collapsed ? "opacity-100" : "opacity-100"
          } pr-3 text-sm text-gray-400 cursor-pointer transition-all duration-100`}
        >
          <PanelRight width={"18px"} height={"18px"} />
        </button>
      </div>

      <div
        className={`${
          collapsed ? "justify-end items-center" : "justify-center"
        } flex border-b border-gray-200 dark:border-darkBorder gap-1 h-12 transition-all duration-100`}
      >
        {/* <button
          onClick={() => setShowAiPanel(!showAiPanel)}
          className={`${
            collapsed ? "opacity-0 hidden" : "flex-1 opacity-100"
          } flex items-center justify-centers bg-gradient-to-r from-[#c0146b] to-[#3b64cc] border dark:border-darkBorder gap-2 my-2 text-white mx-2 px-3 py-1 rounded-lg text-sm cursor-pointer`}
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Template
        </button> */}
        <button
          onClick={() => clearScreen()}
          className={`text-gray-400 w-full bg-gray-200 dark:bg-darkSecondary hover:bg-gray-100 dark:hover:bg-darkGrey rounded text-sm flex items-center justify-center gap-2 cursor-pointer`}
        >
          <Plus width={"20px"} height={"20px"} />
          {collapsed ? "" : "New Component"}
        </button>
        {/* </div> */}
      </div>

      {/* {showAiPanel && (
        <div
          className={`${
            collapsed ? "opacity-0" : "opacity-100"
          } p-4 border-b border-gray-700 bg-gray-750 transition-all duration-100`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI Generator
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Component
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm cursor-pointer"
              >
                {componentTypes.map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Style</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm cursor-pointer"
              >
                {styleOptions.map((style, index) => (
                  <option key={index} value={style.name}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm cursor-pointer"
            >
              {AI_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={generateComponent}
                disabled={isGenerating}
                className={`flex-1 text-white bg-gradient-to-r from-[#c0146b] to-[#3b64cc] border dark:border-darkBorder disabled:opacity-50 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                  isGenerating ? "" : " cursor-pointer"
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-300 border-t-purple-600"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Generate with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )} */}
      {/* Components List */}

      <div
        className={`${
          collapsed ? "opacity-0" : "opacity-100"
        } flex-1 overflow-y-auto overflow-hidden mt-2 px-2 transition-all duration-100`}
      >
        <ul className="px-2">
          {components.map((c, i) => (
            <li
              key={i}
              onClick={() => updateActiveComponent(i)}
              className={`p-2 text-sm text-nowrap cursor-pointer ${
                i === activeComponentIndex
                  ? "bg-gray-200 dark:bg-neutral-800 border-l-3 border-neutral-600 rounded-lg"
                  : ""
              }`}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
