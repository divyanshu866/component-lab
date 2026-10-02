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
    <div className="my-5 min-w-0 max-w-full overflow-hidden rounded-xl border border-white/[0.12] bg-[#101014]">
      <div className="flex min-h-10 items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.025] py-1 pl-3 pr-2 sm:pl-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="truncate text-[11px] font-medium uppercase leading-4 tracking-[0.1em] text-neutral-400">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/[0.12] bg-white/[0.045] px-2.5 py-1 text-[11px] font-medium leading-4 text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${copied ? "bg-emerald-400" : "bg-neutral-500"}`}
          />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="max-w-full overflow-x-auto p-3 font-mono text-[12px] leading-[1.7] text-neutral-100 tab-size-2 sm:p-4 sm:text-[13px] [&>code]:!block [&>code]:!border-0 [&>code]:!bg-transparent [&>code]:!p-0 [&>code]:!font-normal [&>code]:!text-inherit [&>code]:!break-normal">
        {children}
      </pre>
    </div>
  );
};

export default MarkdownCodeBlock;
