"use client";

import {
  Ellipsis,
  PanelLeft,
  RefreshCcw,
  Save,
  SquareTerminal,
} from "lucide-react";
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

  const iconButtonClass =
    "group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] active:scale-95";

  return (
    <nav
      aria-label="Workspace"
      className="relative z-50 w-full border-b border-white/[0.08] bg-[#08080a] px-3 sm:px-4"
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1800px] flex-wrap items-center gap-x-3 gap-y-2 py-2 md:min-h-14 md:flex-nowrap md:gap-4 md:py-2">
        <div className="flex w-full min-w-0 shrink-0 items-center gap-2.5 md:w-auto md:gap-2">
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/[0.09] bg-white/[0.035] text-neutral-300 transition-colors hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-95 md:hidden"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
            aria-pressed={sidebarCollapsed}
          >
            <PanelLeft className="h-[17px] w-[17px]" />
          </button>

          <Image
            src="/newlogo.svg"
            width={32}
            height={32}
            alt=""
            aria-hidden="true"
            className="shrink-0 object-contain opacity-90 md:hidden"
          />

          <button
            type="button"
            className="group relative hidden h-9 w-9 shrink-0 cursor-col-resize items-center justify-center rounded-lg text-neutral-300 transition-colors hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-95 md:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
            aria-pressed={sidebarCollapsed}
          >
            <Image
              src="/newlogo.svg"
              width={32}
              height={32}
              alt=""
              aria-hidden="true"
              className="absolute object-contain opacity-90 transition-opacity duration-150 group-hover:opacity-0"
            />
            <Image
              src="/sidebar.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className="absolute h-[18px] w-[18px] object-contain opacity-0 transition-opacity duration-150 group-hover:opacity-70"
            />
          </button>

          <Image
            src="/name.svg"
            height={24}
            width={120}
            alt="ComponentLab"
            className="h-[19px] w-auto max-w-[112px] shrink-0 object-contain opacity-[0.92] sm:h-[21px] md:ml-0.5 md:h-[20px]"
          />
        </div>

        <div className="min-w-[130px] flex-1 max-[420px]:w-full max-[420px]:flex-none md:max-w-[360px]">
          <input
            type="text"
            onChange={(event) =>
              setActiveComponent((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
            value={activeComponent?.name ?? ""}
            placeholder="Component name"
            aria-label="Component name"
            className={`h-9 w-full rounded-lg border bg-[#111114] px-3 text-[13px] font-medium tracking-[0.01em] outline-none transition-colors placeholder:text-neutral-500 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/15 ${
              activeComponent?.name
                ? "border-white/[0.11] text-neutral-100"
                : "border-red-400/35 text-red-200"
            }`}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-1.5 max-[420px]:hidden">
            <button
              type="button"
              onClick={onSave}
              title="Save component"
              aria-label="Save component"
              className={`${iconButtonClass} border-orange-300/25 bg-orange-300/[0.07] text-orange-200 hover:border-orange-200/50 hover:bg-orange-300/[0.13]`}
            >
              <Save className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            </button>

            <button
              type="button"
              onClick={() => setShowConsole((prev) => !prev)}
              title="Toggle console"
              aria-label="Toggle console"
              aria-pressed={showConsole}
              className={`${iconButtonClass} ${
                showConsole
                  ? "border-pink-300/50 bg-pink-300/[0.14] text-pink-100"
                  : "border-pink-300/25 bg-pink-300/[0.07] text-pink-200 hover:border-pink-200/50 hover:bg-pink-300/[0.13]"
              }`}
            >
              <SquareTerminal className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            </button>

            <button
              type="button"
              onClick={reRender}
              title="Refresh preview"
              aria-label="Refresh preview"
              className={`${iconButtonClass} border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-200 hover:border-emerald-200/50 hover:bg-emerald-300/[0.13]`}
            >
              <RefreshCcw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          <div ref={moreRef} className="relative hidden max-[420px]:block">
            <button
              type="button"
              onClick={() => setShowMore((previous) => !previous)}
              aria-label="More actions"
              aria-expanded={showMore}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-95"
            >
              <Ellipsis className="h-5 w-5" />
            </button>

            {showMore && (
              <div className="absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/[0.1] bg-[#111114] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
                <button
                  type="button"
                  onClick={() => {
                    onSave();
                    setShowMore(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <Save className="h-4 w-4 text-orange-200" />
                  Save component
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowConsole((prev) => !prev);
                    setShowMore(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <SquareTerminal className="h-4 w-4 text-pink-200" />
                  {showConsole ? "Hide console" : "Show console"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    reRender();
                    setShowMore(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <RefreshCcw className="h-4 w-4 text-emerald-200" />
                  Refresh preview
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto shrink-0 border-l border-white/[0.1] pl-2">
          <Profile user={user} />
        </div>
      </div>
    </nav>
  );
}
