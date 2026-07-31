"use client";
import {
  PanelRight,
  Plus,
  Sparkles,
  Zap,
  Trash,
  MoreHorizontal,
} from "lucide-react";
// import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { useConsole } from "@/context/ConsoleContext";
import { AI_MODELS } from "@/ai/models";
export default function Sidebar({ isMobile }) {
  // const pathname = usePathname();
  console.log(isMobile);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [chatMenu, setChatMenu] = useState(null);
  const [mouseClick, setMouseClick] = useState(false);
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
    activeEditor,
    setActiveEditor,
    setChangeDesc,
    createNewComponent,
    isGenerating,
    setIsGenerating,
    setShowPreview,
    updatePreview,
    sidebarCollapsed,
    setSidebarCollapsed,
    isMaximised,
    setIsMaximised,
  } = useEditorContext();
  const { setConsoleLogs, showConsole, setShowConsole } = useConsole();
  async function deleteComponent(id, componentIndex) {
    setChatMenu(null);
    // Implementation for deleting a component
    const res = await fetch(`/api/components/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete component");
      return;
    }
    // Handle active component highlighting
    if (activeComponentIndex != 0 && activeComponentIndex > componentIndex) {
      setActiveComponentIndex(activeComponentIndex - 1);
    }
    // Update the components state after deletion
    setComponents((prev) => prev.filter((c) => c.id !== id));

    if (activeComponent?.id === id) {
      clearScreen();
      setActiveEditor("AI");
    }
  }
  const hideChatMenu = () => {
    setChatMenu(null);
  };
  useEffect(() => {
    window.addEventListener("mousedown", hideChatMenu);

    return () => {
      window.removeEventListener("mousedown", hideChatMenu);
    };
  }, []);

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
    if (isGenerating) {
      return;
    }
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
      className={`h-full flex flex-col overflow-visible border-r border-gray-200 dark:border-darkBorder dark:bg-darkSecondary z-100 transition-all duration-100 ${
        sidebarCollapsed ? (isMobile ? "w-0" : "w-12") : "w-75"
      } ${isMobile ? "absolute" : "relative"}`}
    >
      <div
        className={`${
          sidebarCollapsed ? "justify-end" : "justify-between"
        } pr-2" flex items-center h-10 border-b border-gray-200 dark:border-darkBorder`}
      >
        <h3
          className={`${
            sidebarCollapsed ? "hidden" : ""
          } text-sm font-semibold text-gray-400 mx-3 m-2`}
        >
          Component Library
        </h3>
        {/* {!collapsed && ( */}
        <button
          onClick={() => {
            setSidebarCollapsed(!sidebarCollapsed);
          }}
          className={`${isMobile ? "hidden" : ""} ${
            sidebarCollapsed ? "opacity-100" : "opacity-100"
          } pr-3 text-sm text-gray-400 cursor-pointer transition-all duration-100`}
        >
          <PanelRight width={"18px"} height={"18px"} />
        </button>
      </div>

      <div
        className={`${
          sidebarCollapsed ? "justify-end items-center" : "justify-center"
        } flex border-b border-gray-200 dark:border-darkBorder gap-1 h-12 transition-all duration-100`}
      >
        <button
          onClick={() => {
            clearScreen();
            if (isMaximised) {
              setIsMaximised(false);
            }
          }}
          disabled={isGenerating}
          className={`text-gray-400 w-full bg-gray-200 dark:bg-darkSecondary hover:bg-gray-100 dark:hover:bg-darkGrey rounded text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed cursor-pointer`}
        >
          <Plus width={"20px"} height={"20px"} />
          {sidebarCollapsed ? "" : "New Component"}
        </button>
        {/* </div> */}
      </div>

      {/* Components List */}

      <div
        className={`${
          sidebarCollapsed ? "opacity-0" : "opacity-100"
        } flex flex-col overflow-y-auto overflow-hidden mt-2 px-2 transition-all duration-100`}
      >
        <ul className="px-2">
          {components.map((c, i) => (
            <li
              key={i}
              onClick={() => updateActiveComponent(i)}
              className={`flex relative items-center justify-between p-2 text-sm text-nowrap cursor-pointer ${
                i === activeComponentIndex
                  ? "bg-gray-200 dark:bg-neutral-800 border-l-3 border-neutral-600 rounded-lg"
                  : ""
              }`}
            >
              <span className="min-w-0 flex-1 truncate">{c.name}</span>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  // open menu
                  setChatMenu(chatMenu === i ? null : i);
                }}
                className="p-1 rounded text-neutral-500 hover:text-gray-300 bold dark:hover:text-neutral-100 pointer"
              >
                <MoreHorizontal size={14} className="pointer" />
              </button>
              {chatMenu === i && (
                <div className="absolute right-8 top-0 z-20 w-40 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg">
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Edit Chat", c.id);
                      deleteComponent(c.id, i);
                    }}
                    className="flex w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  >
                    <Trash
                      width={"18px"}
                      height={"18px"}
                      className="bold mr-2"
                    />
                    Delete Chat
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
