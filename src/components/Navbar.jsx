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
  } = useEditorContext();

  // const { isSaving, setIsSaving } = useSave();
  function reRender() {
    setShowPreview(true);
    setConsoleLogs([]);
    setPreviewKey(previewKey + 1);
  }
  function onSave() {
    if (
      (activeComponent.html || activeComponent.css || activeComponent.js) &&
      activeComponent.name
    ) {
      console.log("SAVING......");
      console.log(activeComponent);
      saveComponent(
        activeComponent.name,
        activeComponent.html,
        activeComponent.css,
        activeComponent.js
      );
    } else {
      console.log("Not SAVED");
    }
  }

  return (
    <nav className="h-14 bg-brand px-1 py-2 border-b border-gray-200 dark:border-darkBorder">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex items-center w-max justify-start gap-0 text-white font-medium">
          <button
            onClick={() => {
              setSidebarCollapsed(!sidebarCollapsed);
            }}
            className={`hidden ml-2 mr-2 text-sm text-gray-400 cursor-pointer transition-all duration-100`}
          >
            <PanelRight
              className="text-neutral-700"
              width={"24px"}
              height={"24px"}
            />
          </button>
          <button
          // onClick={() => {
          //   setCollapsed(!collapsed);
          // }}
          // className="cursor-pointer"
          >
            <img src="/newlogo.svg" alt="Logo" className="w-12 h-12" />
          </button>
          <img src="/name.svg" alt="Logo" className="h-9 mb-1" />

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
            className={`bg-gray-200 dark:bg-darkSecondary outline-0 ml-11 py-1 px-2 w-[300PX] text-sm ${
              !activeComponent.name
                ? "border-red-600"
                : "border-gray-300 dark:border-darkBorder"
            } border rounded-lg`}
          />
        </div>

        <div className="flex items-center justify-between py-1 h-full gap-5">
          <button
            onClick={() =>
              saveComponent(
                activeComponent.name,
                activeComponent.html,
                activeComponent.css,
                activeComponent.js
              )
            }
            className="flex items-center px-4 h-full bg-gray-100 dark:bg-darkGrey border rounded-lg hover:bg-gray-200 dark:hover:bg-darkSecondary dark:border-darkBorder cursor-pointer"
          >
            <SaveAllIcon className="w-4 h-4 stroke-1" />
          </button>
          <button
            onClick={() => setShowConsole((prev) => !prev)}
            className={`flex items-center px-4 h-full text-pink-600 bg-gray-100 dark:bg-darkGrey border rounded-lg hover:bg-gray-200 dark:hover:bg-darkSecondary dark:border-darkBorder cursor-pointer`}
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
