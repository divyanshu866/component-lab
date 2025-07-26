"use client";
import { PanelRight, Plus, Sparkles, Zap } from "lucide-react";
// import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { useConsole } from "@/context/ConsoleContext";
import { AI_MODELS } from "@/ai/models";
export default function Sidebar() {
  // const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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
    createNewComponent,
    updatePreview,
  } = useEditorContext();
  const { setConsoleLogs } = useConsole();
  const [componentTypes, setComponentTypes] = useState([
    {
      name: "Modal",
      icon: "maximize",
      description: "Popup overlay for alerts or input",
    },
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
    {
      name: "List",
      icon: "list",
      description: "Vertical or horizontal collection of repeating items",
    },
    {
      name: "Data Grid",
      icon: "grid",
      description: "Paginated table for large data sets",
    },
    {
      name: "Calendar",
      icon: "calendar",
      description: "Month/Week/Day date selector",
    },
    {
      name: "Date Picker",
      icon: "calendar-clock",
      description: "Compact date or range input",
    },
    {
      name: "Time Picker",
      icon: "clock",
      description: "Select a specific time value",
    },
    {
      name: "Combobox",
      icon: "list-plus",
      description: "Input field with list suggestions",
    },
    { name: "Select", icon: "selector", description: "Single-option dropdown" },
    {
      name: "Slider",
      icon: "slider",
      description: "Range selection with drag handle",
    },
    {
      name: "Switch",
      icon: "toggle-left",
      description: "Binary on/off toggle",
    },
    {
      name: "Progress Bar",
      icon: "loader",
      description: "Task completion indicator",
    },
    {
      name: "Loader",
      icon: "refresh",
      description: "Indefinite loading indicator",
    },
    {
      name: "Skeleton",
      icon: "align-justify",
      description: "Loading placeholder shimmer",
    },
    { name: "Chip", icon: "tag", description: "Small removable label" },
    { name: "Badge", icon: "award", description: "Numeric/status indicator" },
    { name: "Rating", icon: "star", description: "Star/heart rating selector" },
    { name: "Avatar Group", icon: "users", description: "Clustered avatars" },
    {
      name: "Breadcrumb",
      icon: "compass",
      description: "Clickable path trail",
    },
    { name: "Drawer", icon: "sidebar", description: "Sliding side panel" },
    {
      name: "Dialog",
      icon: "message-square",
      description: "Modal confirmation overlay",
    },
    {
      name: "Popover",
      icon: "message-circle",
      description: "Lightweight contextual bubble",
    },
    {
      name: "Carousel",
      icon: "play-circle",
      description: "Swipeable content slider",
    },
    {
      name: "Steps",
      icon: "steps",
      description: "Multi-stage progress tracker",
    },
    {
      name: "Accordion",
      icon: "chevrons-right",
      description: "Expandable content sections",
    },
    {
      name: "Collapse",
      icon: "arrow-down",
      description: "Single panel show/hide",
    },
    { name: "Table", icon: "table", description: "Basic tabular layout" },
    { name: "Chart", icon: "bar-chart", description: "Chart placeholder" },
    {
      name: "Tooltip Rich",
      icon: "info",
      description: "Tooltip with rich content",
    },
    {
      name: "Alert Banner",
      icon: "flag",
      description: "Prominent page-level alert",
    },
    {
      name: "Toast Stack",
      icon: "bell-off",
      description: "Transient status messages",
    },
    {
      name: "Chat Bubble",
      icon: "message",
      description: "Chat message container",
    },
    {
      name: "Comment Thread",
      icon: "message-square-dashed",
      description: "Nested comments",
    },
    {
      name: "Activity Feed",
      icon: "activity",
      description: "Reverse-chronological event list",
    },
    {
      name: "File Dropzone",
      icon: "upload-cloud",
      description: "Drag-and-drop file upload",
    },
    {
      name: "Image",
      icon: "image",
      description: "Static or responsive illustration",
    },
    {
      name: "Video Player",
      icon: "video",
      description: "Responsive video frame",
    },
    {
      name: "Video Embed",
      icon: "video",
      description: "Responsive video frame",
    },
    { name: "Tree View", icon: "tree", description: "Hierarchical explorer" },
    {
      name: "Drawer Stack",
      icon: "layout-sidebar",
      description: "Multiple stacked drawers",
    },
    { name: "Tablist", icon: "columns-3", description: "Tabbed navigation" },
    {
      name: "Persona Card",
      icon: "id-badge",
      description: "Rich user profile card",
    },
    {
      name: "Toolbar",
      icon: "slider-horizontal",
      description: "Action button cluster",
    },
  ]);

  const [styleOptions, setStyleOptions] = useState([
    /* ---- original 11 presets here ---- */
    {
      name: "Skeuomorphic",
      icon: "archive-alt",
      description: "Real-world textures and shadows",
    },
    {
      name: "Fluent 2",
      icon: "cube",
      description: "Microsoft’s depth-rich Fluent tokens",
    },
    {
      name: "Carbon",
      icon: "flask",
      description: "IBM’s modular, accessibility-first system",
    },
    {
      name: "Skeuomorphic Antient Antique",
      icon: "antient",
      description:
        "Timeless heritage-inspired style blending classical with modern polish",
    },
    {
      name: "Antient Antique",
      icon: "antient",
      description:
        "Timeless heritage-inspired style blending classical with modern polish",
    },
    {
      name: "Metal",
      icon: "metal",
      description:
        "Industrial-inspired aesthetic featuring sleek metallic surfaces, sharp edges, and durable textures",
    },
    {
      name: "Bento Grid",
      icon: "grid-alt",
      description: "Dense tile layout with 3-D offsets",
    },
    {
      name: "Brutalist",
      icon: "slash",
      description: "Raw, intentionally rough aesthetics",
    },
    {
      name: "Neo-Brutalist",
      icon: "shield-cracked",
      description: "Harsh lines, high contrast blocks",
    },
    {
      name: "Cyberpunk",
      icon: "cpu-lightning",
      description: "Neon gradients and sci-fi glows",
    },
    {
      name: "Glassmorphism",
      icon: "layers",
      description: "Frosted, transparent glass effect",
    },
    {
      name: "3-D Glass",
      icon: "cube-transparent",
      description: "Frosted glass with depth",
    },
    {
      name: "Claymorphism",
      icon: "cloud-light",
      description: "Soft clay-like surfaces",
    },
    {
      name: "Paper Wireframe",
      icon: "file-text-alt",
      description: "Outlined paper-style mockups",
    },
    {
      name: "Minimal",
      icon: "minimize",
      description: "Clean and distraction-free UI",
    },
    {
      name: "Pastel Memphis",
      icon: "chrome",
      description: "Playful 80s pastel shapes",
    },
    {
      name: "Techno Dark",
      icon: "circuit-board",
      description: "Dark mode with cyan accents",
    },
    {
      name: "Solarized Light",
      icon: "sun-cloud",
      description: "Beige + teal readable palette",
    },
    {
      name: "Solarized Dark",
      icon: "moon-cloud",
      description: "Twin dark variant of Solarized",
    },
    {
      name: "Gradient Mesh",
      icon: "gradient",
      description: "Organic mesh gradients",
    },
    {
      name: "Cinematic",
      icon: "film",
      description: "Letterboxed, movie-inspired frame style",
    },
    {
      name: "AI Futuristic",
      icon: "brain-circuit",
      description: "Holographic AI-themed visuals",
    },
    {
      name: "Retro",
      icon: "cpu",
      description: "Old-school colors and pixel art",
    },
    {
      name: "Retro 8-bit",
      icon: "monitor",
      description: "Pixel art retro palette",
    },

    {
      name: "Holographic",
      icon: "prism",
      description: "Iridescent holo effects",
    },
    {
      name: "Corporate Neutral",
      icon: "building",
      description: "Conservative enterprise palette",
    },
    {
      name: "Cinematic",
      icon: "film",
      description: "Letterboxed, filmic UI chrome",
    },
    {
      name: "Material 3",
      icon: "layers-3",
      description: "Latest Google Material tokens",
    },
    {
      name: "Flat Pastel",
      icon: "drop",
      description: "Low-contrast pastel blocks",
    },
    {
      name: "Organic Shapes",
      icon: "leaf",
      description: "Curved blobs & asymmetric cuts",
    },
    {
      name: "Wireframe",
      icon: "slash-forward",
      description: "Monochrome dashed outlines",
    },
  ]);

  const [selectedType, setSelectedType] = useState(componentTypes[0].name);

  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0].name);

  // const [aiDescription, setAiDescription] = useState("");

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

  const generateComponent = async () => {
    try {
      setIsGenerating(true);
      clearScreen();

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          component_type: selectedType,
          component_style: selectedStyle,
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
        name: name,
        html: html,
        css: css,
        js: js,
      };
      setActiveComponent(generatedComp);
      updatePreview(html, css, js);
      createNewComponent(name, html, css, js);

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
  };

  return (
    <aside
      className={`h-full flex flex-col overflow-y-hidden border-r border-gray-200 dark:border-darkBorder dark:bg-darkSecondary transition-all duration-100 ${
        collapsed ? "w-12" : showAiPanel ? "w-80" : "w-80"
      }`}
    >
      <div
        className={`${
          collapsed ? "justify-end" : "justify-between"
        } pr-2" flex items-center h-10 border-b border-gray-200 dark:border-darkBorder`}
      >
        <h3
          className={`${
            collapsed ? "hidden" : ""
          } text-sm font-semibold text-gray-400 mx-3 m-2`}
        >
          Component Library
        </h3>
        {/* {!collapsed && ( */}
        <button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className={`${
            collapsed ? "opacity-100" : "opacity-100"
          } pr-3 text-sm text-gray-400 cursor-pointer transition-all duration-100`}
        >
          <PanelRight width={"18px"} height={"18px"} />
        </button>
      </div>

      <div
        className={`${
          collapsed ? "justify-end items-center" : "justify-between"
        } flex border-b border-gray-200 dark:border-darkBorder gap-1 h-12 transition-all duration-100`}
      >
        {/* <div
          className={`${
            collapsed ? "justify-center items-center" : ""
          } flex justify-between`}
        > */}
        <button
          onClick={() => setShowAiPanel(!showAiPanel)}
          className={`${
            collapsed ? "opacity-0 hidden" : "flex-1 opacity-100"
          } flex items-center justify-centers bg-gradient-to-r from-[#c0146b] to-[#3b64cc] border dark:border-darkBorder gap-2 my-2 text-white mx-2 px-3 py-1 rounded-lg text-sm cursor-pointer`}
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Template
        </button>
        <button
          onClick={() => clearScreen()}
          className={`text-gray-400 bg-gray-200 dark:bg-darkSecondary hover:bg-gray-100 dark:hover:bg-darkGrey mr-3 rounded text-sm flex items-center gap-2 cursor-pointer`}
        >
          <Plus width={"20px"} height={"20px"} />
        </button>
        {/* </div> */}
      </div>

      {showAiPanel && (
        <div
          className={`${
            collapsed ? "opacity-0" : "opacity-100"
          } p-4 border-b border-gray-700 bg-gray-750 transition-all duration-100`}
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
                className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm cursor-pointer"
              >
                {componentTypes.map((type, index) => (
                  <option key={index} value={type.name}>
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
                className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm cursor-pointer"
              >
                {styleOptions.map((style, index) => (
                  <option key={index} value={style.name}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
              <label className="block text-xs text-gray-400 mb-1">
                Or describe your component:
              </label>
              <textarea
                value={aiDescription}
                onChange={(e) => setAiDescription(e.target.value)}
                placeholder="e.g., a responsive pricing table with 3 tiers and hover effects"
                className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm h-16 resize-none"
              />
            </div> */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm cursor-pointer"
            >
              {AI_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={generateComponent}
                disabled={isGenerating}
                className={`flex-1 text-white bg-gradient-to-r from-[#c0146b] to-[#3b64cc] border dark:border-darkBorder disabled:opacity-50 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                  isGenerating ? "" : " cursor-pointer"
                }`}
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
        } flex-1 overflow-y-auto overflow-hidden mt-2 px-2 transition-all duration-100`}
      >
        <ul className="px-2">
          {components.map((c, i) => (
            <li
              key={i}
              onClick={() => setActiveComponentIndex(i)}
              className={`p-2 text-sm text-nowrap cursor-pointer ${
                i === activeComponentIndex
                  ? "bg-gray-200 dark:bg-activeRed border-l-3 border-activeRedBorder rounded-lg"
                  : ""
              }`}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
