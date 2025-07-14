"use client";
import { Code, Key, PanelRight, Plus, Sparkles, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [selectedType, setSelectedType] = useState("");
  const [componentTypes, setComponentTypes] = useState([
    {
      name: "Button",
      icon: "square",
      description: "Clickable UI element for actions",
    },
    {
      name: "Card",
      icon: "layout",
      description: "Container with title, text, and actions",
    },
    {
      name: "Navbar",
      icon: "menu",
      description: "Top or side navigation bar",
    },
    {
      name: "Modal",
      icon: "maximize",
      description: "Popup overlay for alerts or input",
    },
    {
      name: "Form",
      icon: "file-text",
      description: "Input fields grouped for submission",
    },
    {
      name: "Input Field",
      icon: "type",
      description: "Basic text input element",
    },
    {
      name: "Dropdown",
      icon: "chevron-down",
      description: "Expandable menu for options",
    },
    {
      name: "Checkbox",
      icon: "check-square",
      description: "Binary toggle input for selections",
    },
    {
      name: "Radio Group",
      icon: "dot",
      description: "Exclusive choice among options",
    },
    {
      name: "Tabs",
      icon: "columns",
      description: "Switch between multiple views",
    },
    {
      name: "Tooltip",
      icon: "help-circle",
      description: "Info popup on hover or focus",
    },
    {
      name: "Accordion",
      icon: "chevrons-down-up",
      description: "Expandable content sections",
    },
    {
      name: "Toast Notification",
      icon: "bell",
      description: "Auto-dismissable alerts/messages",
    },
    {
      name: "Avatar",
      icon: "user",
      description: "Profile or identity thumbnail",
    },
    {
      name: "Pagination",
      icon: "more-horizontal",
      description: "Navigate between data pages",
    },
    {
      name: "Breadcrumbs",
      icon: "navigation",
      description: "Hierarchy-based page trail",
    },
  ]);

  const [styleOptions, setStyleOptions] = useState([
    {
      name: "Material UI",
      icon: "circle",
      description: "Google's standard design system",
    },
    {
      name: "Glassmorphism",
      icon: "layers",
      description: "Frosted, transparent glass effect",
    },
    {
      name: "Neumorphism",
      icon: "shapes",
      description: "Soft, extruded 3D surfaces",
    },
    {
      name: "Flat Design",
      icon: "square",
      description: "Minimalist, no depth or gradients",
    },
    {
      name: "Skeuomorphic",
      icon: "archive",
      description: "Real-world textures and metaphors",
    },
    {
      name: "Minimal",
      icon: "minimize",
      description: "Clean and distraction-free UI",
    },
    {
      name: "Retro",
      icon: "cpu",
      description: "Old-school colors and pixel art",
    },
    {
      name: "Brutalist",
      icon: "slash",
      description: "Raw, intentionally rough aesthetics",
    },
    {
      name: "Dark Theme",
      icon: "moon",
      description: "UI with dark background and light text",
    },
    {
      name: "Light Theme",
      icon: "sun",
      description: "Default light-based appearance",
    },
  ]);

  const [selectedStyle, setSelectedStyle] = useState("");
  const [aiDescription, setAiDescription] = useState("");

  const [components, setComponents] = useState([]);
  return (
    <aside
      className={`bg-gray-800 text-white h-full transition-all duration-200 ${
        collapsed ? "w-12" : "w-80"
      }`}
    >
      <div
        className={`justify-between pr-2" flex items-center h-14 border-b border-gray-700`}
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
        {/* {!collapsed && ( */}
        <button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className={`${
            collapsed ? "opacity-0" : "opacity-100"
          } pr-3 text-sm text-white cursor-pointer transition-all duration-200`}
        >
          <PanelRight width={"28px"} height={"28px"} />
        </button>
        {/* )} */}
      </div>

      <div
        className={`py-4 px-2 border-b border-gray-700 transition-all duration-200`}
      >
        <div
          className={`${
            collapsed ? "justify-center items-center" : ""
          } flex gap-2`}
        >
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className={`${
              collapsed ? "opacity-0 hidden" : "flex-1 opacity-100"
            } flex items-center justify-centers gap-2 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm cursor-pointer`}
          >
            <Sparkles className="w-4 h-4" />
            Generate AI Template
          </button>
          <button
            // onClick={createNewComponent}
            className={`${
              collapsed ? "py-2" : ""
            } bg-gray-800 hover:bg-gray-700 px-2 rounded text-sm flex items-center gap-2 cursor-pointer`}
          >
            <Plus className="w-6 h-6" />
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

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Component
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm"
              >
                {componentTypes.map((type) => (
                  <option key={type.value} value={type.name}>
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
                className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm"
              >
                {styleOptions.map((style) => (
                  <option key={style.value} value={style.name}>
                    {style.name}
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
              {/* <button
                onClick={() => setShowApiKeyInput(true)}
                className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-xs"
              >
                <Key className="w-3 h-3" />
                API Key
              </button> */}
              <button
                // onClick={generateAIComponent}
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
