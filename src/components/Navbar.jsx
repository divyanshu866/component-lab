"use client";
import { Play, SaveAll, SaveAllIcon, Terminal } from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import { useSave } from "@/context/SaveContext";
import SIGNOUT from "@/components/sign-out";
import { auth } from "@/lib/auth";
export default function Navbar() {
  const { showConsole, setShowConsole } = useConsole();
  const {
    componentName,
    activeComponent,
    setActiveComponent,
    updatePreview,
    saveComponent,
  } = useEditorContext();

  const { isSaving, setIsSaving } = useSave();

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
    <nav className="h-14 flex items-center justify-between px-6 bg-[#1f2937] border-b border-neutral-500">
      <div className="flex items-center w-max justify-start gap-5 text-white font-medium">
        <h1 className="">ComponentLab</h1>
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
          className={`bg-gray-700 px-2 w-max text-sm ${
            !componentName ? "border-red-400" : "border-gray-800"
          } border rounded-lg`}
        />
      </div>
      <SIGNOUT />
      <div className="flex items-center justify-between gap-5">
        <button
          onClick={onSave}
          className="flex items-center p-2 text-gray-400 bg-gray-800 hover:text-white rounded hover:bg-gray-700 cursor-pointer"
        >
          <SaveAllIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowConsole((prev) => !prev)}
          className="flex items-center px-5 text-gray-400 bg-gray-800 hover:text-white p-2 rounded hover:bg-gray-700 cursor-pointer"
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
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
        >
          <Play className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
