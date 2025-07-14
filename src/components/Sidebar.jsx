"use client";
import { Code, PanelRight, Plus, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [components, setComponents] = useState([]);
  return (
    <aside
      className={`bg-gray-800 text-white h-full transition-all duration-200 ${
        collapsed ? "w-12" : "w-72"
      }`}
    >
      <div
        className={`${
          collapsed ? "justify-end" : " justify-between pr-2"
        } flex items-center h-14 border-b border-gray-700`}
      >
        <button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="cursor-pointer"
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth="5"
          >
            <rect x="20" y="20" width="60" height="60" rx="12" fill="#8B5CF6" />

            <line
              x1="38"
              y1="50"
              x2="44"
              y2="42"
              stroke="white"
              strokeWidth=""
              strokeLinecap="round"
            />
            <line
              x1="38"
              y1="50"
              x2="44"
              y2="58"
              stroke="white"
              strokeWidth=""
              strokeLinecap="round"
            />

            <line
              x1="56"
              y1="42"
              x2="62"
              y2="50"
              stroke="white"
              strokeWidth=""
              strokeLinecap="round"
            />

            <line
              x1="56"
              y1="58"
              x2="62"
              y2="50"
              stroke="white"
              strokeWidth=""
              strokeLinecap="round"
            />
          </svg>
        </button>
        {!collapsed && (
          <button
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className="text-sm text-white cursor-pointer"
          >
            <PanelRight width={"28px"} height={"28px"} />
          </button>
        )}
      </div>

      <div
        className={`${
          collapsed ? "opacity-0" : "opacity-100"
        } p-4 border-b border-gray-700 transition-all duration-200`}
      >
        <div className="flex gap-2">
          <button
            // onClick={() => setShowAiPanel(!showAiPanel)}
            className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI
          </button>
          <button
            // onClick={createNewComponent}
            className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
      </div>

      {showAiPanel && (
        <div
          className={`${
            collapsed ? "opacity-0" : "opacity-100"
          } p-4 border-b border-gray-700 bg-gray-750 transition-all duration-200`}
        >
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            AI Generator
          </h3>

          {/* API Key Setup */}
          {showApiKeyInput && (
            <div className="mb-4 p-3 bg-gray-600 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">API Key Required</span>
              </div>
              <div className="space-y-2">
                <select
                  value={aiProvider}
                  onChange={(e) => setAiProvider(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-500 rounded px-2 py-1 text-sm"
                >
                  <option value="openai">OpenAI (GPT-4)</option>
                  <option value="claude">Anthropic (Claude)</option>
                </select>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={`Enter your ${
                    aiProvider === "openai" ? "OpenAI" : "Anthropic"
                  } API key`}
                  className="w-full bg-gray-700 border border-gray-500 rounded px-2 py-1 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowApiKeyInput(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (apiKey.trim()) {
                        setShowApiKeyInput(false);
                        console.log("API key saved for", aiProvider);
                      }
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm"
              >
                {componentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Style</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm"
              >
                {styleThemes.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Layout</label>
              <select
                value={selectedLayout}
                onChange={(e) => setSelectedLayout(e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm"
              >
                {layoutOptions.map((layout) => (
                  <option key={layout.value} value={layout.value}>
                    {layout.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Or describe your component:
              </label>
              <textarea
                value={aiDescription}
                onChange={(e) => setAiDescription(e.target.value)}
                placeholder="e.g., a responsive pricing table with 3 tiers and hover effects"
                className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm h-16 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowApiKeyInput(true)}
                className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-xs"
              >
                <Key className="w-3 h-3" />
                API Key
              </button>
              <button
                onClick={generateAIComponent}
                disabled={isGenerating}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
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

            {apiKey && (
              <div className="text-xs text-green-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {aiProvider === "openai" ? "OpenAI" : "Claude"} API connected
              </div>
            )}
          </div>
        </div>
      )}
      {/* Components List */}
      <div
        className={`${
          collapsed ? "opacity-0" : "opacity-100"
        } flex-1 overflow-y-auto transition-all duration-200`}
      >
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">
            Components
          </h3>
          <div className="space-y-1">
            {components.map((component) => (
              <div
                key={component.id}
                className={`p-2 rounded cursor-pointer group flex items-center justify-between ${
                  activeComponent?.id === component.id
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => switchComponent(component)}
              >
                <div className="flex-1 min-w-0">
                  {editingId === component.id ? (
                    <input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={saveEdit}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                      className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm"
                      autoFocus
                    />
                  ) : (
                    <div className="text-sm truncate">{component.name}</div>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(component.id, component.name);
                    }}
                    className="p-1 hover:bg-gray-600 rounded"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteComponent(component.id);
                    }}
                    className="p-1 hover:bg-red-600 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
