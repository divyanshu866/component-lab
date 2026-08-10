"use client";
import {
  PanelRight,
  Plus,
  Sparkles,
  Zap,
  Trash,
  MoreHorizontal,
  Search,
  FileCode2,
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
    setSelectedType,
    setSelectedStyle,
    components,
    setActiveMessages,
    setComponents,
    activeComponent,
    setActiveComponent,
    activeComponentIndex,
    setActiveComponentIndex,
    activeEditor,
    setActiveEditor,
    setChangeDesc,
    isGenerating,
    setIsGenerating,
    setShowPreview,
    updatePreview,
    sidebarCollapsed,
    setSidebarCollapsed,
    reworkUI,
    setReworkUI,
    isMaximised,
    setIsMaximised,
    targetTech,
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
    //prevent switching components while generating
    if (isGenerating) {
      return;
    }
    setShowPreview(true);
    setActiveComponentIndex(index);
    if (index != null && index >= 0) {
      setReworkUI(true);
    }
    setActiveMessages(components[index]?.prompts || []);
    console.log("activeComponent>>>#####>>>", activeComponent);
    setChangeDesc("");
  }
  useEffect(() => {
    async function fetchComponents() {
      const res = await fetch("/api/components");
      if (res.ok) {
        const data = await res.json();
        setComponents(data);
        console.log("Fetched components>>>>:", data);
      } else {
        console.error("Failed to fetch components");
      }
    }
    fetchComponents();
  }, []);
  const clearScreen = (name = "", html = "", css = "", js = "", jsx = "") => {
    if (isGenerating) {
      return;
    }

    setSelectedType("Custom type");
    setSelectedStyle("Custom style");
    setActiveMessages([]);
    setReworkUI(false);
    setShowPreview(false);
    setActiveComponentIndex(null);
    setActiveEditor("AI");
    console.log("name==>", name);
    setActiveComponent({
      id: "",
      name: name,
      targetTech: targetTech,
      jsx: jsx,
      html: html,
      css: css,
      js: js,
    });

    setConsoleLogs([]);
    updatePreview();
    console.log("cleared");
  };

  return (
    <aside
      className={`${
        isMobile ? "absolute" : "relative"
      } z-50 flex h-full flex-col overflow-hidden border-r rounded-2xl border-darkBorder bg-transparent transition-all duration-150 ${
        sidebarCollapsed ? (isMobile ? "w-0" : "w-12") : "w-70"
      }`}
    >
      {/* Glow */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />
      </div> */}

      {/* New Component */}

      <div className={`${sidebarCollapsed === true ? "p-0" : "p-2"} relative`}>
        <button
          disabled={isGenerating}
          onClick={() => {
            clearScreen();

            if (isMaximised) {
              setIsMaximised(false);
            }
          }}
          className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden border text-sm font-medium text-white transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
            sidebarCollapsed
              ? "p-0 m-0 pt-2 h-full w-auto border border-transparent bg-transparent"
              : "px-5 py-3 rounded-2xl border-lightBorder bg-white/3  hover:border-purple-500/30 hover:bg-white/6 hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]"
          }`}
        >
          {/* Icon */}
          <div
            className={`${sidebarCollapsed ? "h-full w-auto p-2 bg-white/8 border border-lightBorder" : "p-1"} bg-white/5 rounded-lg`}
          >
            <Plus
              className={`${sidebarCollapsed ? "size-4" : "size-5"} transition-transform duration-300 group-hover:rotate-90`}
            />
          </div>
          <span
            className={`${sidebarCollapsed && "hidden"} w-full text-nowrap transition-all duration-150 flex-1 text-left`}
          >
            New Component
          </span>

          <span
            className={`${sidebarCollapsed && "hidden"} text-xs text-nowrap text-neutral-500 transition-colors duration-100 group-hover:text-neutral-300`}
          >
            ⌘ K
          </span>
        </button>
      </div>

      {/* Search */}

      {/* {!sidebarCollapsed && (
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 rounded-2xl border border-lightBorder bg-white/5 px-4 py-3">
            <Search size={16} className="text-neutral-500" />

            <input
              placeholder="Search components..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>
        </div>
      )} */}

      {/* Components */}
      <div
        className={`${sidebarCollapsed === true ? "hidden" : "w-full"} relative overflow-y-auto text-nowrap mt-3 px-2 pb-4`}
      >
        <div className={`mb-4 overflow-hidden`}>
          <p className="px-3 text-xs text-nowrap font-semibold uppercase tracking-wider text-neutral-500">
            Recent Components
          </p>
        </div>

        <div className="space-y-1">
          {components.map((c, i) => (
            <div
              key={c.id ?? i}
              onClick={() => updateActiveComponent(i)}
              className={`group relative cursor-pointer overflow-visible rounded-2xl border ${
                i === activeComponentIndex
                  ? "border-neutral-700 bg-linear-to-r from-[#232526] via-neutral-[#414345] to-neutral-500/50"
                  : "border-transparent bg-transparent hover:border-lightBorder hover:bg-white/5"
              }`}
            >
              <div className={`flex items-center justify-between px-4 py-1`}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center text-nowrap gap-2">
                    <FileCode2
                      size={16}
                      className={`${
                        i === activeComponentIndex
                          ? "text-violet-500"
                          : "text-neutral-500"
                      }`}
                    />

                    <h3 className="truncate text-sm font-medium text-white">
                      {c.name}
                    </h3>
                  </div>
                </div>

                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setChatMenu(chatMenu === i ? null : i);
                  }}
                  className={`rounded-lg p-2 text-neutral-500 transition hover:bg-white/5 hover:text-white ${
                    sidebarCollapsed ? "hidden" : ""
                  }`}
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>

              {chatMenu === i && (
                <div className="absolute right-4 top-14 z-50 w-48 overflow-hidden rounded-2xl border border-lightBorder bg-neutral-900/95 shadow-2xl backdrop-blur-xl">
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteComponent(c.id, i);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash size={16} />
                    Delete Component
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}

      {!sidebarCollapsed && (
        <div className="border-t border-lightBorder p-3">
          <div className="rounded-2xl border border-lightBorder bg-gradient-to-br from-white/5 to-white/[0.02] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-700 to-purple-700">
                <Sparkles size={18} className="text-white" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Gemini 3.5 Flash-Lite
                </p>

                <p className="text-xs text-neutral-400">Ready to generate</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
