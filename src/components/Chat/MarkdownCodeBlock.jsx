import { Children, isValidElement, useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------
   Type scale
   label   → 10px / tracked caps
   code    → 12.5px / line-height 1.7 (matches body rhythm)
   button  → 11px medium, tabular numbers

   Spacing rhythm
   4 · 8 · 12 · 16 · 20 · 32

   Contrast hierarchy
   primary   text-white/85       code content
   secondary text-white/55       language label on hover
   tertiary  text-white/40       language label idle
   muted     text-white/25       chrome (traffic dots, dividers)
   accent    text-violet-300     focus rings, active states
------------------------------------------------------------------- */

const getCodeText = (node) => {
  if (node == null) return "";

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getCodeText).join("");
  }

  if (isValidElement(node)) {
    return getCodeText(node.props?.children);
  }

  return "";
};

const getCodeLanguage = (children) => {
  const child = Children.toArray(children)[0];

  if (!isValidElement(child)) return "Code";

  const className = child.props?.className ?? "";

  const match =
    className.match(/language-([^\s]+)/i) ?? className.match(/lang-([^\s]+)/i);

  return match?.[1]?.toUpperCase() ?? "Code";
};

const MarkdownCodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => getCodeText(children), [children]);
  const language = useMemo(() => getCodeLanguage(children), [children]);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="
        my-6
        overflow-hidden
        rounded-xl
        border
        border-white/[0.08]
        bg-[#0b0b0d]
        shadow-[0_12px_40px_rgba(0,0,0,0.24)]
      "
    >
      {/* Header bar — fixed height keeps the top edge aligned across blocks */}
      <div
        className="
          flex
          h-10
          items-center
          justify-between
          gap-3
          border-b
          border-white/[0.07]
          bg-white/[0.025]
          pl-4
          pr-2
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          {/* Traffic-light chrome */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white/[0.14]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.09]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.06]" />
          </div>

          <span
            className="
              truncate
              text-[10px]
              font-medium
              uppercase
              leading-4
              tracking-[0.14em]
              text-white/40
            "
          >
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className="
            group
            shrink-0
            inline-flex
            items-center
            gap-1.5
            rounded-md
            border
            border-white/[0.07]
            bg-white/[0.035]
            px-2.5
            py-1
            text-[11px]
            font-medium
            leading-4
            tabular-nums
            tracking-[0.01em]
            text-white/55
            transition-colors
            duration-150
            hover:border-white/[0.14]
            hover:bg-white/[0.07]
            hover:text-white/85
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-violet-400/40
            focus-visible:ring-offset-0
          "
        >
          {/* Status dot — gives the button a scannable state change */}
          <span
            aria-hidden="true"
            className={`
              h-1.5
              w-1.5
              rounded-full
              transition-colors
              duration-150
              ${
                copied
                  ? "bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                  : "bg-white/20 group-hover:bg-white/40"
              }
            `}
          />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code body — line-height 1.7 matches markdown body copy */}
      <pre
        className="
          overflow-x-auto
          px-4
          py-4
          font-mono
          text-[12.5px]
          leading-[1.7]
          text-white/85
          tab-size-2
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-white/10
        "
      >
        {children}
      </pre>
    </div>
  );
};

export default MarkdownCodeBlock;
