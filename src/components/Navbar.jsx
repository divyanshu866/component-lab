"use client";
import { RefreshCcw, Save, SquareTerminal } from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import Profile from "@/components/Profile";
import Image from "next/image";
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
    <nav className="h-14 bg-brand pr-1 py-2 border-b border-gray-200 dark:border-lightBorder z-50">
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
            <Image
              src="/newlogo.svg"
              width={40}
              height={40}
              alt="Logo"
              className="absolute inset-1 opacity-100 transition-opacity duration-150 group-hover:opacity-0"
            />

            {/* Sidebar toggle */}
            <Image
              src="/sidebar.svg"
              alt="sidebar toggle"
              className="absolute inset-2.5 opacity-0 transition-opacity duration-150 group-hover:opacity-40"
              width={28}
              height={28}
            />
          </button>
          <Image
            src="/name.svg"
            height={32}
            width={150}
            alt="Logo"
            className="mb-1"
          />
          <div className="flex items-center ml-16 gap-4">
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
              className={`bg-gray-200 dark:bg-backgroundLight ${activeComponent.name ? "dark:text-neutral-400" : "dark:text-red-300"} outline-0 py-2 px-3 w-[300PX] text-sm ${
                !activeComponent?.name
                  ? "border-red-600/30"
                  : "border-gray-300 dark:border-lightBorder"
              } border rounded-lg`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-1 h-full gap-5">
          <div className="flex h-full items-center gap-2 mr-2">
            {/* Save */}
            <button
              type="button"
              onClick={onSave}
              title="Save component"
              aria-label="Save component"
              className="group flex h-9 w-9 items-center justify-center rounded-lg border border-orange-400/35 bg-orange-400/12 text-orange-300 transition-all duration-150 hover:border-orange-300/60 hover:bg-orange-400/20 hover:text-orange-200 hover:shadow-[0_0_18px_rgba(251,146,60,0.14)] active:scale-95 cursor-pointer"
            >
              <Save className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            </button>

            {/* Console */}
            <button
              type="button"
              onClick={() => setShowConsole((prev) => !prev)}
              title="Toggle console"
              aria-label="Toggle console"
              className={`group flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-150 active:scale-95 cursor-pointer ${
                showConsole
                  ? "border-pink-300/65 bg-pink-400/18 text-pink-200 shadow-[0_0_20px_rgba(244,114,182,0.16)]"
                  : "border-pink-400/35 bg-pink-400/12 text-pink-300 hover:border-pink-300/60 hover:bg-pink-400/20 hover:text-pink-200 hover:shadow-[0_0_18px_rgba(244,114,182,0.14)]"
              }`}
            >
              <SquareTerminal className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            </button>

            {/* Re-render */}
            <button
              type="button"
              onClick={reRender}
              title="Refresh preview"
              aria-label="Refresh preview"
              className="group flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/13 text-emerald-300 transition-all duration-150 hover:border-emerald-300/65 hover:bg-emerald-400/21 hover:text-emerald-200 hover:shadow-[0_0_18px_rgba(52,211,153,0.14)] active:scale-95 cursor-pointer"
            >
              <RefreshCcw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
          <Profile user={user} />
        </div>
      </div>
    </nav>
  );
}
