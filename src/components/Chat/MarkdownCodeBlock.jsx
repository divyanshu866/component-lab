import { Children, isValidElement, useEffect, useMemo, useState } from "react";

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

  if (!isValidElement(child)) {
    return "Code";
  }

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

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

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
    <div className="my-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0b0d] shadow-[0_10px_35px_rgba(0,0,0,0.2)]">
      <div className="flex h-9 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="h-2 w-2 rounded-full bg-white/[0.07]" />
          </div>

          <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-white/30">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="
            shrink-0
            rounded-md
            border
            border-white/[0.07]
            bg-white/[0.035]
            px-2.5
            py-1
            text-[10px]
            font-medium
            text-white/40
            transition
            hover:border-white/[0.12]
            hover:bg-white/[0.06]
            hover:text-white/70
            focus:outline-none
            focus:ring-1
            focus:ring-violet-400/40
          "
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre
        className="
          overflow-x-auto
          p-4
          font-mono
          text-[12.5px]
          leading-6
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
