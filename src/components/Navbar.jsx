"use client";

import { Ellipsis, RefreshCcw, Save, SquareTerminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useConsole } from "@/context/ConsoleContext";
import { useEditorContext } from "@/context/EditorContext";
import Profile from "@/components/Profile";
import Image from "next/image";

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
    setReworkUI,
    updatePreview,
    targetTech,
  } = useEditorContext();

  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!moreRef.current?.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  function reRender() {
    setShowPreview(true);
    updatePreview(activeComponent);
    setConsoleLogs([]);
    setPreviewKey(previewKey + 1);
  }

  function onSave() {
    if (
      (activeComponent?.html ||
        activeComponent?.css ||
        activeComponent?.js ||
        activeComponent?.jsx) &&
      activeComponent?.name
    ) {
      const componentState = {
        id: activeComponent?.id,
        name: activeComponent?.name,
        messages: [],
        html: activeComponent?.html,
        css: activeComponent?.css,
        js: activeComponent?.js,
        jsx: activeComponent?.jsx,
        targetTech,
      };

      saveComponent(componentState);
      setShowPreview(true);
      setReworkUI(true);
    }
  }

  return (
    <nav
      className="
        relative
        z-50
        w-full
        border-b
        border-gray-200
        bg-brand
        px-2
        dark:border-lightBorder
        sm:px-3
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-14
          w-full
          max-w-[1800px]
          flex-col
          gap-2
          py-2
          md:min-h-12
          md:flex-row
          md:items-center
          md:gap-3
          md:py-1
        "
      >
        {/* ----------------------------------------------------------
            Primary navigation / identity
        ----------------------------------------------------------- */}
        <div
          className="
            flex
            min-w-0
            w-full
            items-center
            gap-1
            md:w-auto
            md:shrink-0
          "
        >
          {/* Sidebar toggle */}
          <button
            type="button"
            className="
              group
              relative
              h-10
              w-10
              shrink-0
              cursor-col-resize
              rounded-lg
              transition-colors
              hover:bg-white/[0.04]
              sm:h-11
              sm:w-11
            "
            onClick={() => {
              setSidebarCollapsed(!sidebarCollapsed);
            }}
            aria-label="Toggle sidebar"
          >
            <Image
              src="/newlogo.svg"
              width={40}
              height={40}
              alt="Logo"
              className="
                absolute
                inset-1
                opacity-100
                transition-opacity
                duration-150
                group-hover:opacity-0
              "
            />

            <Image
              src="/sidebar.svg"
              alt="sidebar toggle"
              className="
                absolute
                inset-2.5
                opacity-0
                transition-opacity
                duration-150
                group-hover:opacity-40
              "
              width={28}
              height={28}
            />
          </button>

          {/* Product name */}
          <Image
            src="/name.svg"
            height={32}
            width={150}
            alt="ComponentLab"
            className="
              mb-1
              hidden
              h-7
              w-auto
              shrink-0
              lg:block
            "
          />
        </div>

        {/* ----------------------------------------------------------
            Component name
        ----------------------------------------------------------- */}
        <div
          className="
            min-w-0
            w-full
            md:flex-1
          "
        >
          <input
            type="text"
            onChange={(event) =>
              setActiveComponent((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
            value={activeComponent?.name ?? ""}
            placeholder="Component Name"
            aria-label="Component name"
            className={`
              h-10
              w-full
              rounded-lg
              border
              bg-gray-200
              px-3
              text-sm
              outline-none
              transition-colors
              placeholder:text-gray-500
              dark:bg-backgroundLight
              sm:h-9
              md:max-w-[320px]
              lg:max-w-[360px]
              ${
                activeComponent?.name
                  ? "dark:text-neutral-300"
                  : "dark:text-red-300"
              }
              ${
                !activeComponent?.name
                  ? "border-red-600/30"
                  : "border-gray-300 dark:border-lightBorder"
              }
              focus:border-violet-400/40
            `}
          />
        </div>

        {/* ----------------------------------------------------------
            Actions
        ----------------------------------------------------------- */}
        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-2
            md:w-auto
            md:shrink-0
            md:justify-end
          "
        >
          {/* Primary desktop/tablet actions */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Save */}
            <button
              type="button"
              onClick={onSave}
              title="Save component"
              aria-label="Save component"
              className="
                group
                flex
                h-9
                w-9
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                border
                border-orange-400/35
                bg-orange-400/12
                text-orange-300
                transition-all
                duration-150
                hover:border-orange-300/60
                hover:bg-orange-400/20
                hover:text-orange-200
                hover:shadow-[0_0_18px_rgba(251,146,60,0.14)]
                active:scale-95
              "
            >
              <Save className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            </button>

            {/* Console */}
            <button
              type="button"
              onClick={() => setShowConsole((prev) => !prev)}
              title="Toggle console"
              aria-label="Toggle console"
              aria-pressed={showConsole}
              className={`
                group
                flex
                h-9
                w-9
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                border
                transition-all
                duration-150
                active:scale-95
                ${
                  showConsole
                    ? "border-pink-300/65 bg-pink-400/18 text-pink-200 shadow-[0_0_20px_rgba(244,114,182,0.16)]"
                    : "border-pink-400/35 bg-pink-400/12 text-pink-300 hover:border-pink-300/60 hover:bg-pink-400/20 hover:text-pink-200 hover:shadow-[0_0_18px_rgba(244,114,182,0.14)]"
                }
              `}
            >
              <SquareTerminal className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={reRender}
              title="Refresh preview"
              aria-label="Refresh preview"
              className="
                group
                flex
                h-9
                w-9
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                border
                border-emerald-400/40
                bg-emerald-400/13
                text-emerald-300
                transition-all
                duration-150
                hover:border-emerald-300/65
                hover:bg-emerald-400/21
                hover:text-emerald-200
                hover:shadow-[0_0_18px_rgba(52,211,153,0.14)]
                active:scale-95
              "
            >
              <RefreshCcw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Profile */}
          <div className="shrink-0">
            <Profile user={user} />
          </div>

          {/* --------------------------------------------------------
              Very small-screen overflow menu

              Kept available as a compact escape hatch. The regular
              actions remain visible when there is enough width.
          --------------------------------------------------------- */}
          <div ref={moreRef} className="relative hidden max-[479px]:block">
            <button
              type="button"
              onClick={() => setShowMore((previous) => !previous)}
              aria-label="More actions"
              aria-expanded={showMore}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                bg-white/[0.035]
                text-neutral-400
                transition
                hover:border-white/15
                hover:bg-white/[0.06]
                hover:text-white
                active:scale-95
              "
            >
              <Ellipsis className="h-4 w-4" />
            </button>

            {showMore && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-44
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-[#111113]
                  p-1
                  shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    onSave();
                    setShowMore(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2.5
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-xs
                    text-neutral-300
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <Save className="h-4 w-4 text-orange-300" />
                  Save component
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowConsole((prev) => !prev);
                    setShowMore(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2.5
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-xs
                    text-neutral-300
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <SquareTerminal className="h-4 w-4 text-pink-300" />
                  {showConsole ? "Hide console" : "Show console"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    reRender();
                    setShowMore(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2.5
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-xs
                    text-neutral-300
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <RefreshCcw className="h-4 w-4 text-emerald-300" />
                  Refresh preview
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
