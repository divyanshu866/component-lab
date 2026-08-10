"use client";
import React, { act, useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { SlidersHorizontal } from "lucide-react";
import {
  ArrowUp,
  ChevronUp,
  Command,
  MoveUp,
  Play,
  PlayCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";
import { AI_MODELS } from "@/ai/models";
import ChatBox from "./ChatList";
import ChatList from "./ChatList";
import TargetTechTabs from "./TargetTechTabs";
const AIEditor = ({ user, isMobile }) => {
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].value);
  const { setConsoleLogs } = useConsole();
  const [showFilters, setShowFilters] = useState(false);
  const {
    components,
    activeMessages,
    setActiveMessages,
    activeEditor,
    setActiveEditor,
    activeComponent,
    setActiveComponent,
    activeComponentIndex,
    setActiveComponentIndex,
    reworkUI,
    setReworkUI,
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
    selectedType,
    setSelectedType,
    selectedStyle,
    setSelectedStyle,
    targetTech,
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

  const generateComponent = async () => {
    if (!changeDesc.trim()) {
      console.log("EMPTY");
      return;
    }

    try {
      setIsGenerating(true);
      setReworkUI(true);
      setShowPreview(true);
      const userMessage = {
        id: null,
        role: "USER",
        message: changeDesc,
        componentId: null,
        createdAt: null,
      };
      setChangeDesc("");
      const assistantPlaceholder = {
        id: null,
        role: "ASSISTANT",
        message: "",
        componentId: null,
        createdAt: null,
      };
      // Initialize streaming component
      const streamState = {
        name: "",
        messages: [userMessage, assistantPlaceholder],
        html: "",
        css: "",
        js: "",
        jsx: "",
        targetTech: targetTech,
      };

      setActiveMessages(streamState.messages);

      //Helper Update current component state
      const updateStreamingComponent = (section, content) => {
        streamState[section] += content;
        setActiveComponent({ ...streamState });
        streamState.targetTech === "HTML" && updatePreview(streamState);
      };
      const appendAssistantMessageChunk = (content) => {
        streamState.messages = streamState.messages.map((msg, index) =>
          index === streamState.messages.length - 1 && msg.role === "ASSISTANT"
            ? {
                ...msg,
                message: `${msg.message || ""}${content || ""}`,
              }
            : msg,
        );
        setActiveMessages(streamState.messages);
      };
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          componentType: selectedType,
          componentStyle: selectedStyle,
          prompt: userMessage.message,
          targetTech: targetTech,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      // Reset the editor now that the stream has been established.
      clearScreen();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Process SSE events from buffer
        const events = buffer.split("\n\n");
        buffer = events.pop() || ""; // Keep incomplete event in buffer

        for (const event of events) {
          if (event.startsWith("data: ")) {
            try {
              const data = JSON.parse(event.substring(6)); // Remove 'data: ' prefix

              switch (data.type) {
                case "name":
                  streamState.name += data.content;
                  setActiveComponent({ ...streamState });
                  break;
                case "message":
                  appendAssistantMessageChunk(data.content);
                  break;
                case "html":
                  setActiveEditor("HTML");
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "css":
                  setActiveEditor("CSS");
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "js":
                  setActiveEditor("JS");
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "jsx":
                  setActiveEditor("JSX");
                  updateStreamingComponent(data.type, data.content);
                  break;
              }
            } catch (err) {
              console.error("Error parsing streaming data:", err);
            }
          } else if (event.startsWith("event: end")) {
            //update react preview
            streamState.targetTech === "REACT" && updatePreview(streamState);
            setActiveEditor("AI");
            // Streaming complete
            setIsGenerating(false);
            console.log(
              "Active streamState.messages at the end of streaming:",
              streamState.messages,
            );

            //presist to db
            await createNewComponent(streamState);
            console.log("Streaming complete");

            return;
          } else if (event.startsWith("event: error")) {
            const errorData = JSON.parse(event.substring(12)); // Remove 'event: error\ndata: ' prefix
            console.error("Streaming error:", errorData.error);
            setIsGenerating(false);
            alert("An Error occurred. Please try again.");
            return;
          }
        }
      }
    } catch (err) {
      alert("An Error occurred. Please try again.");
      console.error("Error calling /api/generate:", err);
      setIsGenerating(false);
      setActiveEditor("AI");
    }
  };
  async function rework() {
    if (!changeDesc.trim()) {
      console.log("EMPTY");
      return;
    }
    try {
      setShowPreview(true);
      setIsGenerating(true);

      const userMessage = {
        id: null,
        role: "USER",
        message: changeDesc,
        componentId: activeComponent.id,
        createdAt: null,
      };
      const assistantPlaceholder = {
        id: null,
        role: "ASSISTANT",
        message: "",
        componentId: activeComponent.id,
        createdAt: null,
      };
      // Initialize streaming component with existing values
      const streamState = {
        id: activeComponent.id,
        name: "",
        messages: [...activeMessages, userMessage, assistantPlaceholder],
        html: "",
        css: "",
        js: "",
        jsx: "",
        targetTech: targetTech,
      };

      console.log(
        "stream state messages right after appending",
        streamState.messages,
      );
      console.log("activeMessages BEFORE rework:", activeMessages);
      console.log(
        "activeComponent.messages BEFORE rework:",
        activeComponent.messages,
      );
      setActiveMessages(streamState.messages);

      setActiveComponent(streamState);

      //Helper Update current component state
      const updateStreamingComponent = (section, content) => {
        streamState[section] += content;
        setActiveComponent({ ...streamState });
        streamState.targetTech === "HTML" && updatePreview(streamState);
      };
      const appendAssistantMessageChunk = (content) => {
        streamState.messages = streamState.messages.map((msg, index) =>
          index === streamState.messages.length - 1 && msg.role === "ASSISTANT"
            ? {
                ...msg,
                message: `${msg.message || ""}${content || ""}`,
              }
            : msg,
        );
        setActiveMessages(streamState.messages);
      };
      const response = await fetch("/api/ai", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: activeComponent.name,
          messages: streamState.messages,
          html: activeComponent.html,
          css: activeComponent.css,
          js: activeComponent.js,
          jsx: activeComponent.jsx,
          targetTech: streamState.targetTech,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Process SSE events from buffer
        const events = buffer.split("\n\n");
        buffer = events.pop() || ""; // Keep incomplete event in buffer
        for (const event of events) {
          if (event.startsWith("data: ")) {
            try {
              const data = JSON.parse(event.substring(6)); // Remove 'data: ' prefix
              switch (data.type) {
                case "name":
                  streamState.name += data.content;
                  setActiveComponent({ ...streamState });
                  break;
                case "message":
                  appendAssistantMessageChunk(data.content);
                  break;

                case "html":
                  setActiveEditor("HTML");
                  updateStreamingComponent(data.type, data.content);
                  break;

                case "css":
                  setActiveEditor("CSS");
                  updateStreamingComponent(data.type, data.content);
                  break;

                case "js":
                  setActiveEditor("JS");
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "jsx":
                  setActiveEditor("JSX");
                  updateStreamingComponent(data.type, data.content);
                  break;
              }
            } catch (err) {
              console.error("Error parsing streaming data:", err);
            }
          } else if (event.startsWith("event: end")) {
            //Update React Preview
            streamState.targetTech === "REACT" && updatePreview(streamState);

            setActiveEditor("AI");
            console.log(
              "REACHED PATCH PERSIST STAGE========================>>>",
            );
            //Persist to db
            console.log(
              "STTEAM STATE MESSAGES BEFORE slicing",
              streamState.messages,
            );
            const newMessages = streamState.messages.slice(-2);

            streamState.messages = newMessages;

            console.log(
              "STTEAM STATE MESSAGES after slicing",
              streamState.messages,
            );
            await saveComponent(streamState);
            // Streaming complete
            setIsGenerating(false);
            setChangeDesc("");
            console.log(
              "latest streamState.messages at the end of rework streaming:",
              streamState.messages,
            );
            console.log(
              "Active Messages at the end of rework streaming:",
              activeMessages,
            );

            // Update existing component

            console.log("Updated");
            console.log("Streaming rework complete");
            return;
          } else if (event.startsWith("event: error")) {
            const errorData = JSON.parse(event.substring(12)); // Remove 'event: error\ndata: ' prefix
            console.error("Streaming error:", errorData.error);
            setIsGenerating(false);
            setChangeDesc("");
            alert("An Error occurred. Please try again.");
            return;
          }
        }
      }
    } catch (err) {
      console.error("Error calling /api/generate:", err);
      alert("An Error occurred. Please try again.");
      setIsGenerating(false);
      setChangeDesc("");
      setActiveEditor("AI");
    }
  }

  const clearScreen = (
    name = "",
    html = "",
    css = "",
    js = "",
    jsx = "",
    targetTech = "",
  ) => {
    console.log("Editor cleared from AI-EDITOR");
    setSelectedType("Custom type");
    setSelectedStyle("Custom style");
    setActiveComponentIndex(null);

    setActiveComponent({
      id: "",
      messages: [],
      name: name,
      html: html,
      css: css,
      js: js,
      jsx: jsx,
      targetTech: targetTech,
    });

    setConsoleLogs([]);
    updatePreview();
  };
  return (
    <div
      className={`${
        activeEditor == "AI" ? "" : "hidden"
      } flex h-full w-full mx-auto flex-col items-center justify-start flex-1 relative transition-all duration-200 overflow-hidden bg-transparent`}
    >
      {/* Model Selection */}
      <div
        className={`${reworkUI ? "bg-linear-to-b from-black to-black/50 backdrop-blur-sm" : "bg-transparent"} absolute flex w-full h-12 justify-start items-center top-0 left-0 z-50`}
      >
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full max-w-max text-left text-neutral-200 bg-transparent border-none outline-0 border-gray-300 dark:border-lightBorder rounded-lg py-0 my-0 mx-3 text-sm cursor-pointer"
        >
          {AI_MODELS.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`w-full h-full flex flex-col ${reworkUI ? "justify-end" : "justify-center"} gap-1 items-center overflow-hidden`}
      >
        {/* Chat List */}
        <ChatList />
        {/* heading/textarea container */}
        <div
          className={`${reworkUI || showPreview ? "absolute bottom-4" : "absolute bottom-[50%]"} w-full flex flex-col justify-center items-center max-w-5xl`}
        >
          <h1
            className={` ${reworkUI ? "hidden" : ""} lg:text-3xl xl:text-4xl text-center font-sans font-medium mb-12 bg-linear-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent`}
          >
            Good to see you, {user.name}!
          </h1>
          <TargetTechTabs />

          <div
            className={`flex justify-between items-center w-full gap-5 px-4
    overflow-hidden transition-all duration-300 ease-out
    ${reworkUI ? "hidden" : ""}
    ${
      showFilters
        ? "max-h-32 opacity-100 translate-y-0 mb-4 mt-1 pointer-events-auto"
        : "max-h-0 opacity-0 -translate-y-2 mb-0 pointer-events-none"
    }
  `}
          >
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              name="select"
              className="w-full bg-gray-100 dark:bg-white/5 backdrop-blur-2xl border outline-0 border-gray-300 dark:border-lightBorder rounded-full px-3 py-2 text-md transition-all duration-200 cursor-pointer"
            >
              <option className="dark:text-gray-700" value={"custom type"}>
                {"Describe type in prompt"}
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
              className="w-full bg-gray-100 dark:bg-white/5 backdrop-blur-2xl border outline-0 border-gray-300 dark:border-lightBorder rounded-full px-3 py-2  text-md transition-all duration-200 cursor-pointer"
            >
              <option className="dark:text-gray-700" value={"Custom style"}>
                {"Describe style in prompt"}
              </option>
              {styleOptions.map((style, index) => (
                <option key={index} value={style.name}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          {/* )} */}

          <div className="w-full h-full px-4">
            {/* Full rounded single-line textarea / chat bar */}
            <div className="w-full rounded-full bg-transparent">
              <div className="relative flex items-center max-w-7xl pr-1 backdrop-blur-2xl rounded-full bg-white/5 border-lightBorder border overflow-hidden group focus-within:border-violet-400/60 focus-within:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_0_15px_rgba(139,92,246,0.25)] transition-all duration-300">
                {/* Specular top highlight */}
                {/* <div className="absolute inset-x-0 top-0 h-px mx-4 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" /> */}
                <textarea
                  value={changeDesc}
                  disabled={isGenerating}
                  rows={1}
                  placeholder={
                    activeComponent.id
                      ? "Describe changes..."
                      : "Describe the component you want to generate..."
                  }
                  onChange={(e) => {
                    setChangeDesc(e.target.value);

                    e.target.style.height = "0px";
                    e.target.style.height = `${Math.min(
                      e.target.scrollHeight,
                      220,
                    )}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      activeComponent.id === ""
                        ? generateComponent()
                        : rework();
                    }
                  }}
                  className="w-full bg-transparent px-5 py-3.5 text-md text-zinc-200 placeholder-zinc-500 focus:outline-none resize-none"
                />

                <div className="flex gap-3">
                  {!reworkUI && (
                    <button
                      onClick={() => {
                        setShowFilters((v) => !v);
                        setSelectedType("Custom type");
                        setSelectedStyle("Custom style");
                      }}
                      className={`${showFilters ? "text-orange-400 hover:text-orange-300" : "text-neutral-500 hover:text-white"} flex items-center justify-center rounded-full bg-transparent transition cursor-pointer`}
                    >
                      <SlidersHorizontal size={16} />
                    </button>
                  )}
                  <button
                    onClick={
                      activeComponent.id === "" ? generateComponent : rework
                    }
                    disabled={isGenerating || !changeDesc.trim()}
                    className="flex p-3 items-center justify-center rounded-full bg-violet-100 text-black transition hover:bg-neutral-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isGenerating ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-black" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIEditor;
