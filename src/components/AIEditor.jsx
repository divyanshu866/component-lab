"use client";
import { useState, useRef, useEffect } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";
import { AI_MODELS } from "@/ai/models";
import ChatList from "@/components/Chat/ChatList";
import ModelSelector from "@/components/ModelSelector";
import TargetTechTabs from "./TargetTechTabs";
import GenerationSuggestions from "./GenerationSuggestions";
import PlanRequiredModal from "@/components/upgrade/PlanRequiredModal";
import GenerationLimitModal from "@/components/GenerationLimitModal";
import GenerationUsageIndicator from "@/components/GenerationUsageIndicator";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
const AIEditor = ({ user, isMobile }) => {
  const [planRequiredModel, setPlanRequiredModel] = useState(null);

  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [selectedEffort, setSelectedEffort] = useState(
    selectedModel?.defaultEffort,
  );
  const { setConsoleLogs } = useConsole();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [generationMode, setGenerationMode] = useState("AUTO");
  const [resolvedGenerationMode, setResolvedGenerationMode] = useState("ASK");
  const [webSearchEnabeled, setWebSearchEnabeled] = useState(false);
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
    previewKey,
    setPreviewKey,
    saveComponent,
    changeDesc,
    setChangeDesc,
    isGenerating,
    isGeneratingCode,
    setIsGeneratingCode,
    showPreview,
    setShowPreview,
    updatePreview,
    setIsGenerating,
    selectedType,
    setSelectedType,
    selectedStyle,
    setSelectedStyle,
    targetTech,
    generationUsage,
    setGenerationUsage,
    generationLimitModalOpen,
    setGenerationLimitModalOpen,
  } = useEditorContext();
  const router = useRouter();
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
  const promptAreaRef = useRef(null);
  const generationLimitReached = generationUsage?.remaining === 0;
  const handleAIResponseError = async (response) => {
    let errorData = null;

    try {
      errorData = await response.json();
    } catch {
      // Response did not contain JSON.
    }

    if (errorData?.error === "PLAN_REQUIRED") {
      const requiredModel = AI_MODELS.find(
        (model) => model.value === errorData.model,
      );

      if (requiredModel) {
        setPlanRequiredModel(requiredModel);
      }

      return true;
    }

    if (errorData?.error === "INVALID_MODEL") {
      alert("The selected AI model is not available.");
      return true;
    }

    if (response.status === 401) {
      alert("Please sign in to continue.");
      return true;
    }
    if (errorData?.error === "GENERATION_LIMIT_REACHED") {
      setGenerationUsage((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          used: errorData.limit,
          remaining: 0,
          limit: errorData.limit,
        };
      });

      setGenerationLimitModalOpen(true);

      return true;
    }
    return false;
  };
  const generateComponent = async (promptOverride) => {
    if (generationUsage?.remaining === 0) {
      setGenerationLimitModalOpen(true);
      return;
    }
    const prompt = promptOverride ?? changeDesc;
    if (!prompt?.trim()) {
      console.log("PROMPT EMPTY");
      return;
    }

    try {
      setIsGenerating(true);
      setIsGeneratingCode(false);
      setReworkUI(true);
      // setShowPreview(true);
      let usageMetadata;
      const userMessage = {
        id: null,
        role: "USER",
        message: prompt,
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
        name: activeComponent.name ?? "",
        messages: [userMessage, assistantPlaceholder],
        targetTech: targetTech,
        jsx: activeComponent.jsx ?? "",
        html: activeComponent.html ?? "",
        css: activeComponent.css ?? "",
        js: activeComponent.js ?? "",
        usageMetadata: null,
        model: selectedModel,
        effort: selectedEffort,
      };

      setActiveMessages(streamState.messages);

      //Enrich messages for ai call
      const enrichedPrompt = `Use the following 'User Request' to resolve user intent to 'REWORK' or 'ASK' mode.
  
        Component Type:${selectedType}

        Component Style:${selectedStyle}

        User Request:${prompt}`;

      const messages = [
        { role: "USER", message: enrichedPrompt },
        { role: "ASSISTANT", message: "" },
      ];
      //Helper Update current component state
      const updateStreamingComponent = (section, content) => {
        if (resolvedMode !== "REWORK") {
          return;
        }
        setIsGeneratingCode(true);
        setShowPreview(true);
        streamState[section] += content;
        setActiveComponent({ ...streamState });
        // streamState.targetTech === "HTML" && updatePreview(streamState);
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
      console.log("messages right before generate api call====>", messages);
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
          targetTech: targetTech,
          generationMode: generationMode,
          model: selectedModel.value,
          effort: selectedEffort,
          webSearchEnabeled: webSearchEnabeled,
        }),
      });

      if (!response.ok) {
        const handled = await handleAIResponseError(response);

        if (handled) {
          return;
        }

        throw new Error(`Failed: ${response.status}`);
      }

      const generationsRemaining = response.headers.get(
        "X-Generations-Remaining",
      );

      if (generationsRemaining !== null) {
        const remaining = Number(generationsRemaining);

        setGenerationUsage((previous) => {
          if (!previous) {
            return previous;
          }

          return {
            ...previous,
            remaining,
            used: previous.limit - remaining,
          };
        });
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      let resolvedMode = response.headers.get("X-Resolved-Generation-Mode");
      if (resolvedMode !== "ASK" && resolvedMode !== "REWORK") {
        resolvedMode = "ASK";
      }
      setResolvedGenerationMode(resolvedMode);

      console.log("RESOLVED MODE========>", resolvedMode);
      if (resolvedMode === "REWORK") {
        streamState.name = "";
        streamState.html = "";
        streamState.css = "";
        streamState.js = "";
        streamState.jsx = "";

        // Reset the editor now that the stream has been established.
        clearScreen();
        setActiveComponent({
          ...streamState,
        });
      }

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
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "css":
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "js":
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "jsx":
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "usage_metadata":
                  streamState.usageMetadata = data.content;
                  break;
              }
            } catch (err) {
              console.error("Error parsing streaming data:", err);
            }
          } else if (event.startsWith("event: end")) {
            //update preview
            updatePreview(streamState);
            setActiveEditor("AI");
            // Streaming complete
            setIsGeneratingCode(false);
            console.log(
              "Active streamState.messages at the end of streaming:",
              streamState.messages,
            );

            //presist to db
            await saveComponent(streamState);
            console.log("Streaming complete");

            return;
          } else if (event.startsWith("event: error")) {
            const errorData = JSON.parse(event.substring(12)); // Remove 'event: error\ndata: ' prefix
            console.error("Streaming error:", errorData?.error);
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
    } finally {
      setIsGenerating(false);
      setIsGeneratingCode(false);
    }
  };
  async function rework() {
    if (generationUsage?.remaining === 0) {
      setGenerationLimitModalOpen(true);
      return;
    }
    if (!changeDesc.trim()) {
      console.log("EMPTY");
      return;
    }
    try {
      // setShowPreview(true);
      setIsGenerating(true);
      setIsGeneratingCode(false);

      const userMessage = {
        id: null,
        role: "USER",
        message: changeDesc,
        componentId: activeComponent.id,
        createdAt: null,
      };
      setChangeDesc("");

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
        name: activeComponent.name ?? "",
        messages: [...activeMessages, userMessage, assistantPlaceholder],
        html: activeComponent.html ?? "",
        css: activeComponent.css ?? "",
        js: activeComponent.js ?? "",
        jsx: activeComponent.jsx ?? "",
        targetTech: targetTech,
        usageMetadata: null,
        model: selectedModel,
        effort: selectedEffort,
      };

      setActiveMessages(streamState.messages);

      // setActiveComponent(streamState);

      //Helper Update current component state
      const updateStreamingComponent = (section, content) => {
        if (resolvedMode !== "REWORK") {
          return;
        }
        setShowPreview(true);
        setIsGeneratingCode(true);
        streamState[section] += content;
        setActiveComponent({ ...streamState });
        // streamState.targetTech === "HTML" && updatePreview(streamState);
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
          name: activeComponent.name ?? "",
          messages: streamState.messages ?? [],
          html: activeComponent.html ?? "",
          css: activeComponent.css ?? "",
          js: activeComponent.js ?? "",
          jsx: activeComponent.jsx ?? "",
          targetTech: streamState.targetTech,
          generationMode: generationMode,
          model: selectedModel.value,
          effort: selectedEffort,
          webSearchEnabeled: webSearchEnabeled,
        }),
      });

      if (!response.ok) {
        const handled = await handleAIResponseError(response);

        if (handled) {
          return;
        }

        throw new Error(`Failed: ${response.status}`);
      }
      const generationsRemaining = response.headers.get(
        "X-Generations-Remaining",
      );

      if (generationsRemaining !== null) {
        const remaining = Number(generationsRemaining);

        setGenerationUsage((previous) => {
          if (!previous) {
            return previous;
          }

          return {
            ...previous,
            remaining,
            used: previous.limit - remaining,
          };
        });
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      let resolvedMode = response.headers.get("X-Resolved-Generation-Mode");
      if (resolvedMode !== "ASK" && resolvedMode !== "REWORK") {
        resolvedMode = "ASK";
      }
      setResolvedGenerationMode(resolvedMode);

      console.log("RESOLVED MODE========>", resolvedMode);
      if (resolvedMode === "REWORK") {
        streamState.name = "";
        streamState.html = "";
        streamState.css = "";
        streamState.js = "";
        streamState.jsx = "";

        setActiveComponent({
          ...streamState,
        });
      }
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
                  if (resolvedMode !== "REWORK") {
                    break;
                  }
                  streamState.name += data.content;
                  setActiveComponent({ ...streamState });
                  break;
                case "message":
                  appendAssistantMessageChunk(data.content);
                  break;

                case "html":
                  updateStreamingComponent(data.type, data.content);
                  break;

                case "css":
                  updateStreamingComponent(data.type, data.content);
                  break;

                case "js":
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "jsx":
                  updateStreamingComponent(data.type, data.content);
                  break;
                case "usage_metadata":
                  streamState.usageMetadata = data.content;
                  break;
              }
            } catch (err) {
              console.error("Error parsing streaming data:", err);
            }
          } else if (event.startsWith("event: end")) {
            //Update Preview
            updatePreview(streamState);
            setIsGeneratingCode(false);
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
            console.log("STREAM STATE ASK==========>", streamState);
            await saveComponent(streamState);
            // Streaming complete
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
            console.error("Streaming error:", errorData?.error);
            setIsGenerating(false);
            alert("An Error occurred. Please try again.");
            return;
          }
        }
      }
    } catch (err) {
      console.error("Error calling /api/generate:", err);
      alert("An Error occurred. Please try again.");
      setIsGenerating(false);
      setActiveEditor("AI");
    } finally {
      setIsGenerating(false);
      setIsGeneratingCode(false);
    }
  }

  const clearScreen = (name, html, css, js, jsx, targetTech) => {
    console.log("Editor cleared from AI-EDITOR");
    setSelectedType("Custom type");
    setSelectedStyle("Custom style");
    setActiveComponentIndex(null);

    setActiveComponent({
      id: "",
      messages: [],
      name: name ?? "",
      targetTech: targetTech,
      jsx: jsx ?? "",
      html: html ?? "",
      css: css ?? "",
      js: js ?? "",
    });

    setConsoleLogs([]);
    updatePreview();
  };
  useEffect(() => {
    if (isGenerating) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const textarea = promptAreaRef.current;

      if (!textarea || textarea.disabled) {
        return;
      }

      textarea.focus();

      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    });

    return () => cancelAnimationFrame(frame);
  }, [isGenerating, activeComponentIndex]);
  return (
    <div
      className={`${
        activeEditor == "AI" ? "" : "hidden"
      } flex h-full min-h-0 w-full mx-auto flex-col items-center justify-start flex-1 relative transition-all duration-200 overflow-hidden bg-transparent`}
    >
      {/* Model Selection */}
      <ModelSelector
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedEffort={selectedEffort}
        setSelectedEffort={setSelectedEffort}
        userPlan={generationUsage?.plan}
        reworkUI={reworkUI}
        onPlanRequired={(model) => {
          setPlanRequiredModel(model);
        }}
      />

      <div
        className={`w-full h-full min-h-0 flex flex-col ${reworkUI ? "justify-end" : "justify-center"} gap-1 items-center overflow-hidden`}
      >
        {/* Chat List */}
        <ChatList
          resolvedGenerationMode={resolvedGenerationMode}
          isGeneratingCode={isGeneratingCode}
        />
        {/* heading/textarea container */}
        <div
          className={`${
            reworkUI || showPreview
              ? "bottom-0 pb-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-4 sm:pb-0"
              : "top-1/2 -translate-y-1/2 sm:top-auto sm:bottom-[39%] sm:translate-y-0"
          } absolute w-full max-w-4xl max-h-full overflow-y-auto px-2 sm:px-6 lg:px-5 flex flex-col items-center justify-center`}
        >
          {/* Greeting */}
          <h1
            className={`${
              reworkUI && activeMessages.length > 0 ? "hidden" : ""
            } mb-5 px-2 text-center font-sans text-2xl font-medium tracking-tight text-transparent bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text sm:mb-10 sm:text-3xl xl:text-4xl`}
          >
            Good to see you, {user.name}!
          </h1>

          <TargetTechTabs />

          {/* Filters */}
          <div
            className={`w-full overflow-hidden px-2 sm:px-4 transition-all duration-300 ease-out ${
              reworkUI
                ? "hidden"
                : showFilters
                  ? "pointer-events-auto mt-3 mb-4 max-h-36 sm:max-h-24 translate-y-0 opacity-100"
                  : "pointer-events-none mt-0 mb-0 max-h-0 -translate-y-2 opacity-0"
            }`}
          >
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                name="type"
                className="
          h-10 w-full min-w-0 cursor-pointer appearance-none
          rounded-lg border border-white/10
          bg-white/[0.04] px-3 text-sm text-neutral-300
          outline-none backdrop-blur-xl
          transition
          hover:border-white/15 hover:bg-white/[0.06]
          focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/10
        "
              >
                <option
                  value="Custom type"
                  className="bg-[#151516] text-neutral-300"
                >
                  Describe type in prompt
                </option>

                {componentTypes.map((type, index) => (
                  <option
                    key={index}
                    value={type.name}
                    className="bg-[#151516] text-neutral-300"
                  >
                    {type.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                name="style"
                className="
          h-10 w-full min-w-0 cursor-pointer appearance-none
          rounded-lg border border-white/10
          bg-white/[0.04] px-3 text-sm text-neutral-300
          outline-none backdrop-blur-xl
          transition
          hover:border-white/15 hover:bg-white/[0.06]
          focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/10
        "
              >
                <option
                  value="Custom style"
                  className="bg-[#151516] text-neutral-300"
                >
                  Describe style in prompt
                </option>

                {styleOptions.map((style, index) => (
                  <option
                    key={index}
                    value={style.name}
                    className="bg-[#151516] text-neutral-300"
                  >
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full px-2 sm:px-4">
            {/* Prompt Bar */}
            <div
              className={`
        flex w-full min-w-0 items-center
        rounded-2xl border
        px-2 py-2
        backdrop-blur-2xl
        transition-all duration-200

        ${
          generationMode === "ASK"
            ? "border-emerald-400/25 bg-emerald-400/[0.04] shadow-[0_0_0_1px_rgba(52,211,153,0.04)]"
            : reworkUI
              ? "border-white/10 bg-[#151516]"
              : "border-white/10 bg-white/[0.04]"
        }

        ${isExpanded ? "flex-col items-stretch" : "flex-col items-stretch sm:flex-row sm:items-center"}

        focus-within:border-white/20
        focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.03)] relative
      `}
            >
              {/* Textarea */}
              <textarea
                ref={promptAreaRef}
                autoFocus
                name="prompt"
                id="prompt"
                value={changeDesc}
                disabled={isGenerating}
                rows={1}
                placeholder={
                  activeComponent.id
                    ? "Describe changes..."
                    : "Describe the component you want to generate..."
                }
                className="
          m-0
          min-h-9 min-w-0 w-full
          resize-none
          bg-transparent
          px-2 py-2
          text-sm leading-5 text-neutral-200
          placeholder:text-neutral-500
          outline-none
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
                onChange={(e) => {
                  setChangeDesc(e.target.value);

                  e.target.style.height = "0px";
                  e.target.style.height = `${Math.min(
                    e.target.scrollHeight,
                    220,
                  )}px`;

                  e.target.value.length > 75 && setIsExpanded(true);
                  e.target.value.length < 1 && setIsExpanded(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();

                    activeComponent.id === "" ? generateComponent() : rework();

                    if (promptAreaRef.current) {
                      promptAreaRef.current.style.height = "";
                    }

                    setIsExpanded(false);
                  }
                }}
              />

              {/* Actions */}
              <div
                className={`
          flex items-center gap-1.5
          ${isExpanded ? "mt-2 w-full justify-end" : "mt-1 w-full justify-end sm:mt-0 sm:ml-2 sm:w-auto sm:shrink-0"}
        `}
              >
                {/* Generation Mode */}
                <select
                  name="generation-mode"
                  aria-label="Generation mode"
                  value={generationMode}
                  disabled={isGenerating}
                  onChange={(e) => setGenerationMode(e.target.value)}
                  className="
            h-9
            cursor-pointer
            appearance-none
            rounded-lg
            border border-transparent
            bg-transparent
            px-2
            text-xs font-medium
            text-neutral-400
            outline-none
            transition
            hover:bg-white/[0.05]
            hover:text-neutral-200
            focus:bg-white/[0.05]
            focus:text-neutral-200
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                  <option value="AUTO" className="bg-[#151516]">
                    Auto
                  </option>
                  <option value="ASK" className="bg-[#151516]">
                    Ask
                  </option>
                </select>

                {/* Filters */}
                {!reworkUI && (
                  <button
                    type="button"
                    aria-label="Toggle filters"
                    aria-pressed={showFilters}
                    onClick={() => {
                      setShowFilters((v) => !v);
                      setSelectedType("Custom type");
                      setSelectedStyle("Custom style");
                    }}
                    className={`
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              transition
              ${
                showFilters
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
              }
            `}
                  >
                    <SlidersHorizontal size={16} />
                  </button>
                )}

                {/* Web Search */}
                <button
                  type="button"
                  aria-label="Toggle web search"
                  aria-pressed={webSearchEnabeled}
                  onClick={() => {
                    setWebSearchEnabeled((prev) => !prev);
                  }}
                  className={`
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-lg
            transition
            ${
              webSearchEnabeled
                ? "bg-violet-500/10 text-violet-400"
                : "text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
            }
          `}
                >
                  <Search size={16} />
                </button>

                {/* Submit */}
                <button
                  type="button"
                  onClick={() => {
                    activeComponent.id === "" ? generateComponent() : rework();

                    if (promptAreaRef.current) {
                      promptAreaRef.current.style.height = "";
                    }

                    setIsExpanded(false);
                  }}
                  disabled={isGenerating || !changeDesc.trim()}
                  className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-lg
            bg-violet-500
            text-white
            shadow-sm
            transition
            hover:bg-violet-400
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:bg-violet-500
          "
                >
                  {isGenerating ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Suggestions */}
            {activeComponent.id === "" &&
              activeMessages.length === 0 &&
              !isGenerating && (
                <GenerationSuggestions
                  disabled={isGenerating}
                  onGenerate={(prompt) => {
                    generateComponent(prompt);
                  }}
                />
              )}
          </div>
        </div>
      </div>
      <PlanRequiredModal
        model={planRequiredModel}
        open={Boolean(planRequiredModel)}
        currentPlan={generationUsage?.plan ?? "FREE"}
        onClose={() => setPlanRequiredModel(null)}
        onUpgrade={(requiredPlan) => {
          setPlanRequiredModel(null);

          window.location.assign("/upgrade");
        }}
      />
      <GenerationLimitModal
        open={generationLimitModalOpen}
        generationUsage={generationUsage}
        onClose={() => setGenerationLimitModalOpen(false)}
        onUpgrade={() => {
          setGenerationLimitModalOpen(false);
          window.location.assign("/upgrade");
        }}
      />
    </div>
  );
};
export default AIEditor;
