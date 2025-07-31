"use client";
import React, { useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { Play } from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";
import { AI_MODELS } from "@/ai/models";

const AIEditor = ({ activeEditor }) => {
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].value);
  const { setConsoleLogs } = useConsole();
  const {
    activeComponent,
    setActiveComponent,
    activeComponentIndex,
    setActiveComponentIndex,
    createNewComponent,
    previewKey,
    setPreviewKey,
    saveComponent,
    showPromptWindow,
    setShowPromptWindow,
    changeDesc,
    setChangeDesc,
    isGenerating,
    updatePreview,
    setIsGenerating,
  } = useEditorContext();
  async function rework() {
    if (changeDesc == "") {
      return;
    }
    try {
      setIsGenerating(true);
      // clearScreen();
      const res = await fetch("/api/ai", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: activeComponent.name,
          html: activeComponent.html,
          css: activeComponent.css,
          js: activeComponent.js,
          changes: changeDesc,
          model: selectedModel,
        }),
      });
      console.log("model=====>", selectedModel);
      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      const data = await res.json();
      // If the API returns a JSON string inside data.output, parse it
      const outputComp = JSON.parse(data.output);

      const { name, html, css, js } = outputComp;

      const generatedComp = {
        id: activeComponent.id,
        name: activeComponent.name,
        html: html,
        css: css,
        js: js,
      };
      setActiveComponent(generatedComp);

      updatePreview(html, css, js);
      // createNewComponent(name, html, css, js);

      console.log("activeComponent===>", activeComponent);
      console.log("activeComponentIndex==>", activeComponentIndex);

      console.log("Component Name:", name);
      console.log("HTML:", html);
      console.log("CSS:", css);
      console.log("JS:", js);

      console.log("Generated Component:", outputComp);
      return data.output;
    } catch (err) {
      console.error("Error calling /api/generate:", err);
    } finally {
      setIsGenerating(false);
    }
    console.log("rework");
  }
  const clearScreen = (name = "", html = "", css = "", js = "") => {
    console.log("cleared");

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
    <div
      className={` ${
        activeEditor == "AI" ? "" : "hidden"
      } flex flex-col items-center justify-center flex-1 px-4 py-6`}
    >
      <h1 className="text-5xl font-sans font-bold mb-12 pb-2 bg-gradient-to-r from-pink-600 to-purple-500 bg-clip-text text-transparent">
        {activeComponent.id
          ? "Describe Your Changes"
          : "Describe Your Component"}
      </h1>

      <div className="w-full max-w-lg bg-neutral-800 rounded-xl p-3 space-y-1 shadow-lg">
        <textarea
          value={changeDesc}
          onChange={(e) => {
            setChangeDesc(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows={1}
          placeholder="Start typing your change description..."
          className="w-full resize-none overflow-hidden bg-neutral-700 rounded-lg text-sm text-white p-3 outline-none focus:ring-2 focus:ring-pink-700 transition-all duration-200"
        />

        <div className="flex justify-end">
          <button
            onClick={rework}
            disabled={changeDesc == "" || isGenerating}
            className="flex items-center disabled:bg-neutral-700 disabled:cursor-not-allowed gap-2 bg-neutral-600 hover:bg-gray-400 text-white font-medium py-1.5 px-4 rounded-lg transition-all duration-200 cursor-pointer"
          >
            <Play width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AIEditor;
