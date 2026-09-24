"use client";

import { useEffect, useMemo, useRef } from "react";
import { useEditorContext } from "@/context/EditorContext";

const getStreamingCode = (component) => {
  if (!component) {
    return { language: "Code", code: "" };
  }

  if (typeof component === "string") {
    return { language: "Code", code: component };
  }

  const sections = [];

  if (typeof component.jsx === "string" && component.jsx.trim()) {
    sections.push({ label: "JSX", code: component.jsx });
  }
  if (typeof component.html === "string" && component.html.trim()) {
    sections.push({ label: "HTML", code: component.html });
  }
  if (typeof component.css === "string" && component.css.trim()) {
    sections.push({ label: "CSS", code: component.css });
  }
  if (typeof component.js === "string" && component.js.trim()) {
    sections.push({ label: "JS", code: component.js });
  }

  if (!sections.length) {
    return { language: "Code", code: "" };
  }

  if (sections.length === 1) {
    return {
      language: sections[0].label,
      code: sections[0].code,
    };
  }

  return {
    language: "Source",
    code: sections
      .map(
        ({ label, code }) =>
          `/* ───────────── ${label} ───────────── */\n${code}`,
      )
      .join("\n\n"),
  };
};

const LoadingCode = () => (
  <div className="flex h-full flex-col justify-center gap-2.5 px-5">
    {[68, 88, 52, 79, 41, 63].map((width, index) => (
      <div
        key={index}
        className="h-[7px] overflow-hidden rounded-full bg-white/[0.04]"
        style={{ width: `${width}%` }}
      >
        <div className="h-full w-1/2 animate-[chat-shimmer_1.6s_linear_infinite] bg-linear-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    ))}
  </div>
);

const CodePreviewPannel = () => {
  const { activeComponent } = useEditorContext();
  const codeContainerRef = useRef(null);

  const { language, code } = useMemo(
    () => getStreamingCode(activeComponent),
    [activeComponent],
  );

  const lines = useMemo(() => {
    if (!code) return [];
    return code.split(/\r?\n/);
  }, [code]);

  useEffect(() => {
    const element = codeContainerRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [code]);

  return (
    <div
      className="
        relative
        flex
        h-[340px]
        w-full
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-white/[0.07]
        bg-[#09090b]
        sm:h-[370px]
      "
    >
      {/* Header */}
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.06] px-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400/80" />
          </span>
          <span className="text-[10px] font-medium tracking-[0.06em] text-white/25">
            Live
          </span>
        </div>
      </div>

      {/* Code area */}
      <div
        ref={codeContainerRef}
        className="
          relative
          min-h-0
          flex-1
          overflow-x-auto
          overflow-y-auto
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-white/10
        "
      >
        {code ? (
          <div className="flex min-w-max px-3.5 py-3.5 font-mono text-[11.5px] leading-[1.65] sm:text-[12px]">
            <div
              aria-hidden="true"
              className="mr-3.5 select-none text-right text-white/[0.14] tabular-nums"
            >
              {lines.map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>

            <pre className="m-0 whitespace-pre text-white/65">
              <code>{code}</code>
            </pre>

            <span
              aria-hidden="true"
              className="
                ml-0.5
                mt-[0.35em]
                h-[1em]
                w-[1.5px]
                shrink-0
                rounded-full
                bg-violet-300/70
                animate-pulse
              "
            />
          </div>
        ) : (
          <LoadingCode />
        )}
      </div>

      {/* Footer */}
      <div className="flex h-8 shrink-0 items-center justify-between border-t border-white/[0.05] px-3.5">
        <span className="text-[9px] tracking-[0.12em] text-white/18 uppercase">
          Streaming
        </span>
        <span className="text-[9px] tabular-nums text-white/18">
          {code ? `${lines.length} lines` : "…"}
        </span>
      </div>
    </div>
  );
};

export default CodePreviewPannel;
