"use client";
import { PanelRight, Play, SaveAllIcon, Terminal } from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import Profile from "@/components/Profile";
import Link from "next/link";
export default function Navbar({ user }) {
  const { showConsole, setShowConsole, setConsoleLogs } = useConsole();
  const {
    activeComponent,
    setActiveComponent,
    previewKey,
    setPreviewKey,
    saveComponent,
    setShowPreview,
    sidebarCollapsed,
    setSidebarCollapsed,
    setReworkUI,
    updatePreview,
    activeMessages,
    targetTech,
  } = useEditorContext();

  // const { isSaving, setIsSaving } = useSave();
  function reRender() {
    setShowPreview(true);
    updatePreview(activeComponent);
    setConsoleLogs([]);
    setPreviewKey(previewKey + 1);
  }
  function onSave() {
    if (
      (activeComponent?.html ||
        activeComponent?.css ||
        activeComponent?.js ||
        activeComponent?.jsx) &&
      activeComponent?.name
    ) {
      const componentState = {
        id: activeComponent?.id,
        name: activeComponent?.name,
        messages: [],
        html: activeComponent?.html,
        css: activeComponent?.css,
        js: activeComponent?.js,
        jsx: activeComponent?.jsx,
        targetTech: targetTech,
      };
      saveComponent(componentState);
      setShowPreview(true);
      setReworkUI(true);
    }
  }

  return (
    <nav className="h-14 bg-brand pr-1 py-2 border-b border-gray-200 dark:border-darkBorder z-50">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex items-center w-max justify-start gap-0 text-white font-medium">
          {/* <button
            onClick={() => {
              setSidebarCollapsed(!sidebarCollapsed);
            }}
            className={`ml-2 mr-2 text-sm text-gray-400 cursor-pointer transition-all duration-100`}
          >
            <img
              className="opacity-40"
              src="/sidebar.svg"
              alt="sidebar toggle"
              width={"24px"}
              height={"24px"}
            />
          </button> */}
          <button
            className="group relative w-12 h-12 cursor-col-resize"
            onClick={() => {
              setSidebarCollapsed(!sidebarCollapsed);
            }}
          >
            {/* Logo */}
            <img
              src="/newlogo.svg"
              alt="Logo"
              className="absolute inset-1 w-10 h-10 opacity-100 transition-opacity duration-150 group-hover:opacity-0"
            />

            {/* Sidebar toggle */}
            <img
              src="/sidebar.svg"
              alt="sidebar toggle"
              className="absolute inset-2.5 opacity-0 transition-opacity duration-150 group-hover:opacity-40"
              width={"28px"}
              height={"28px"}
            />
          </button>
          <img src="/name.svg" alt="Logo" className="h-8 mb-1" />

          <input
            type="text"
            onChange={(e) =>
              setActiveComponent((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            value={activeComponent.name}
            placeholder="Component Name"
            className={`bg-gray-200 dark:bg-transparent outline-0 ml-11 py-2 px-3 w-[300PX] text-sm ${
              !activeComponent?.name
                ? "border-red-600/50"
                : "border-gray-300 dark:border-lightBorder"
            } border rounded-xl`}
          />
        </div>

        <div className="flex items-center justify-between py-1 h-full gap-5">
          <button
            onClick={onSave}
            className="flex items-center px-4 h-full bg-gray-100 dark:bg-darkGrey border rounded-lg hover:bg-gray-200 dark:hover:bg-darkSecondary dark:border-lightBorder cursor-pointer"
          >
            <SaveAllIcon className="w-4 h-4 stroke-1" />
          </button>
          <button
            onClick={() => setShowConsole((prev) => !prev)}
            className={`flex items-center px-4 h-full text-pink-600 bg-gray-100 dark:bg-darkGrey border rounded-lg hover:bg-gray-200 dark:hover:bg-darkSecondary dark:border-lightBorder cursor-pointer`}
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={reRender}
            className="flex items-center justify-center px-4 h-full border border-green-600 text-white rounded-lg bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900  hover:to-green-800 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 stroke-1" />
          </button>
          <Profile user={user} />
        </div>
      </div>
    </nav>
  );
}
