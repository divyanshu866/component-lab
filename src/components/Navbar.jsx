"use client";
import { Play, SaveAllIcon, Terminal } from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import Profile from "@/components/Profile";
export default function Navbar({ user }) {
  const { showConsole, setShowConsole } = useConsole();
  const { activeComponent, setActiveComponent, updatePreview, saveComponent } =
    useEditorContext();

  // const { isSaving, setIsSaving } = useSave();

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
    <nav className="h-14 bg-brand flex items-center justify-between pr-2 border-b border-gray-200 dark:border-darkBorder">
      <div className="flex items-center w-max justify-start gap-0 text-white font-medium">
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
          className={`bg-gray-200 dark:bg-darkSecondary outline-0 ml-12 py-1 px-2 w-[300PX] text-sm ${
            !activeComponent.name
              ? "border-red-400"
              : "border-gray-300 dark:border-darkBorder"
          } border rounded-lg`}
        />
      </div>
      <div className="flex items-center justify-between h-full gap-5">
        <button
          onClick={() =>
            saveComponent(
              activeComponent.name,
              activeComponent.html,
              activeComponent.css,
              activeComponent.js
            )
          }
          className="flex items-center p-2 text-gray-400 bg-gray-100 dark:bg-darkGrey rounded hover:bg-gray-200 dark:hover:bg-darkSecondary cursor-pointer"
        >
          <SaveAllIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowConsole((prev) => !prev)}
          className="flex items-center px-5 text-gray-400 bg-gray-100 dark:bg-darkGrey p-2 rounded hover:bg-gray-200 dark:hover:bg-darkSecondary cursor-pointer"
        >
          <Terminal className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            updatePreview(
              activeComponent.html,
              activeComponent.css,
              activeComponent.js
            )
          }
          className="flex items-center gap-2 px-4 py-2 border border-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
        >
          <Play className="w-4 h-4" />
        </button>
        <Profile user={user} />
      </div>
    </nav>
  );
}
