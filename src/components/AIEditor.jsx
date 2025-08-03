"use client";
import React, { useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { ArrowUp, MoveUp, Play, PlayCircle, Sparkles, Zap } from "lucide-react";
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
    changeDesc,
    setChangeDesc,
    isGenerating,
    showPreview,
    setShowPreview,
    updatePreview,
    setIsGenerating,
  } = useEditorContext();
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
      name: "Subscription Pricing Cards (Free and premium)",
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
      name: "Techno Dark (Pink-Purple Gradients/Accents)",
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
      name: "AI Futuristic (Pink-Purple Dark)",
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
  const [selectedType, setSelectedType] = useState();
  const [selectedStyle, setSelectedStyle] = useState();

  const generateComponent = async () => {
    try {
      clearScreen();
      setShowPreview(true);

      setIsGenerating(true);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          component_type: selectedType,
          component_style: selectedStyle,
          desc: changeDesc,
          model: selectedModel,
        }),
      });
      console.log("model=====>", selectedModel);
      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      const data = await res.json();

      // Remove code fences like ```json and ```
      data.output = data.output.replace(/```json|```/g, "").trim();

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
  async function rework() {
    if (changeDesc == "") {
      return;
    }
    try {
      setShowPreview(true);

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

      // Remove code fences like ```json and ```
      data.output = data.output.replace(/```json|```/g, "").trim();

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
      alert("An Error occured. Please try again.");
    } finally {
      setIsGenerating(false);
      setChangeDesc("");
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
      } flex h-full w-full mx-auto flex-col items-center justify-start flex-1 px-20 relative transition-all duration-200`}
    >
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="w-full max-w-52 text-left text-neutral-400 dark:bg-transparent border-none outline-0 border-gray-300 dark:border-darkBorder rounded-lg py-1 ml-2 mt-2 text-md cursor-pointer absolute top-1 left-0"
      >
        {AI_MODELS.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
      <h1 className="lg:text-3xl xl:text-5xl mt-[20vh] text-center font-sans font-bold mb-10 pb-2 bg-gradient-to-r from-pink-600 to-purple-500 bg-clip-text text-transparent">
        {activeComponent.id
          ? "Describe Your Changes"
          : "Describe Your Component"}
      </h1>
      <div
        className={`${
          activeComponent.id == "" ? "" : "hidden"
        } flex gap-4 w-full max-w-3xl mb-7`}
      >
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          name="select"
          className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm transition-all duration-200 cursor-pointer"
        >
          <option className="dark:text-gray-900" value={""}>
            {"Component Type"}
          </option>
          {componentTypes.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className="w-full bg-gray-100 dark:bg-darkSecondary border border-gray-300 dark:border-darkBorder rounded-lg px-2 py-1 text-sm transition-all duration-200 cursor-pointer"
        >
          <option className="dark:text-gray-900" value={""}>
            {"Component Style"}
          </option>
          {styleOptions.map((style, index) => (
            <option key={index} value={style.name}>
              {style.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-4xl flex flex-col justify-center items-center transition-all bg-neutral-800/70 border dark:border-darkBorder rounded-2xl overflow-hidden duration-500">
        <textarea
          value={changeDesc}
          onChange={(e) => {
            setChangeDesc(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              activeComponent.id == "" ? generateComponent() : rework();
            }
          }}
          rows={1}
          placeholder={
            activeComponent.id
              ? "Describe what you'd like to change about this component..."
              : "Describe your component in detail. Include functionality, appearance, and behavior..."
          }
          className="w-full m-0 font-sans text-md resize-none rounded-xl text-white p-4 outline-none placeholder-neutral-600 max-h-64 transition-all duration-200"
        />
        {/* <div className="absolute bottom-3 right-3 text-xs text-neutral-500">
          {changeDesc.length} characters
        </div> */}
        <div className="w-full m-0">
          <button
            onClick={activeComponent.id == "" ? generateComponent : rework}
            disabled={
              isGenerating ||
              (activeComponent.id == "" ? changeDesc == "" : changeDesc == "")
            }
            className={`ml-auto border mr-1 mb-1 mt-1 dark:bg-neutral-300 dark:border-darkBorder disabled:opacity-50 disabled:cursor-not-allowed px-2 py-2 rounded-xl text-sm flex items-center justify-center gap-2 ${
              isGenerating ? "" : "cursor-pointer"
            }`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-neutral-300 border-t-neutral-600"></div>
              </>
            ) : (
              <>
                <ArrowUp className="w-4 h-4 stroke-black" />
                {/* {activeComponent.id == "" ? "Generate" : "Make Edits"} */}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AIEditor;
