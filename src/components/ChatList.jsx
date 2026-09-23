"use client";

import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEditorContext } from "@/context/EditorContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Eye } from "lucide-react";

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

  if (!match?.[1]) {
    return "Code";
  }

  return match[1].toUpperCase();
};

const MarkdownCodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => getCodeText(children), [children]);
  const language = useMemo(() => getCodeLanguage(children), [children]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
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

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-4 mt-1 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mb-3 text-xl font-semibold leading-tight tracking-[-0.025em] text-white">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mb-2.5 mt-7 text-[17px] font-semibold leading-snug text-white">
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4 className="mb-2 mt-6 text-[15px] font-semibold leading-snug text-white/90">
      {children}
    </h4>
  ),

  p: ({ children }) => (
    <p
      className="
        mb-4
        whitespace-pre-wrap
        break-words
        text-[14px]
        leading-7
        text-white/70
        last:mb-0
      "
    >
      {children}
    </p>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),

  em: ({ children }) => <em className="text-white/80">{children}</em>,

  del: ({ children }) => (
    <del className="text-white/45 decoration-white/30">{children}</del>
  ),

  ul: ({ children, className }) => (
    <ul
      className={`
        my-4
        list-disc
        space-y-2
        pl-6
        text-[14px]
        leading-7
        text-white/70
        marker:text-violet-400
        [&>li>ul]:my-2
        [&>li>ol]:my-2
        [&.contains-task-list]:list-none
        [&.contains-task-list]:space-y-2
        [&.contains-task-list]:pl-0
        ${className ?? ""}
      `}
    >
      {children}
    </ul>
  ),

  ol: ({ children, className, start }) => (
    <ol
      start={start}
      className={`
        my-4
        list-decimal
        space-y-2
        pl-6
        text-[14px]
        leading-7
        text-white/70
        marker:font-medium
        marker:text-violet-300
        [&>li>ul]:my-2
        [&>li>ol]:my-2
        ${className ?? ""}
      `}
    >
      {children}
    </ol>
  ),

  li: ({ children, className }) => (
    <li
      className={`
        pl-1
        [&>p]:mb-2
        [&>p:last-child]:mb-0
        [&.task-list-item]:list-none
        [&.task-list-item]:pl-0
        ${className ?? ""}
      `}
    >
      {children}
    </li>
  ),

  input: ({ type, checked, ...props }) => {
    if (type !== "checkbox") {
      return <input type={type} {...props} />;
    }

    return (
      <input
        type="checkbox"
        checked={Boolean(checked)}
        readOnly
        disabled
        aria-label={checked ? "Completed" : "Not completed"}
        className="
          mr-2
          inline-block
          h-3.5
          w-3.5
          translate-y-[1px]
          accent-violet-500
          disabled:cursor-default
          disabled:opacity-90
        "
        {...props}
      />
    );
  },

  blockquote: ({ children }) => (
    <blockquote
      className="
        my-5
        rounded-r-xl
        border-l-2
        border-violet-400/60
        bg-violet-400/[0.045]
        px-4
        py-3
        text-[14px]
        leading-7
        text-white/60
        [&>p]:mb-2
        [&>p:last-child]:mb-0
      "
    >
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-8 border-0 border-t border-white/[0.08]" />,

  br: () => <br />,

  pre: ({ children }) => <MarkdownCodeBlock>{children}</MarkdownCodeBlock>,

  code({ className, children, ...props }) {
    const isBlock =
      typeof className === "string" &&
      /(^|\s)(language-|lang-)/i.test(className);

    if (!isBlock) {
      return (
        <code
          className="
            rounded-md
            border
            border-white/[0.08]
            bg-white/[0.055]
            px-1.5
            py-0.5
            font-mono
            text-[12px]
            text-fuchsia-300
            break-words
          "
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        className={`${className ?? ""} font-mono text-[12.5px] text-white/80`}
        {...props}
      >
        {children}
      </code>
    );
  },

  a: ({ href, children }) => {
    const safeHref =
      typeof href === "string" && /^(https?:|mailto:|tel:|#)/i.test(href)
        ? href
        : null;

    if (!safeHref) {
      return <span className="text-white/70">{children}</span>;
    }

    return (
      <a
        href={safeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="
          font-medium
          text-violet-300
          underline
          decoration-violet-300/30
          underline-offset-[3px]
          transition
          hover:text-violet-200
          hover:decoration-violet-200/70
        "
      >
        {children}
      </a>
    );
  },

  table: ({ children }) => (
    <div
      className="
        my-5
        overflow-x-auto
        rounded-xl
        border
        border-white/[0.08]
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-white/10
      "
    >
      <table
        className="
          w-full
          min-w-130
          border-collapse
          text-left
          text-[13px]
          [&_tr:last-child_td]:border-b-0
        "
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-white/[0.04] text-white/85">{children}</thead>
  ),

  tbody: ({ children }) => (
    <tbody className="divide-y divide-white/[0.05]">{children}</tbody>
  ),

  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-white/[0.018]">{children}</tr>
  ),

  th: ({ children, align }) => (
    <th
      style={{ textAlign: align ?? undefined }}
      className="
        border-b
        border-white/[0.08]
        px-3.5
        py-3
        font-semibold
        text-white/80
        whitespace-nowrap
      "
    >
      {children}
    </th>
  ),

  td: ({ children, align }) => (
    <td
      style={{ textAlign: align ?? undefined }}
      className="
        border-b
        border-white/5
        px-3.5
        py-3
        align-top
        text-white/65
      "
    >
      {children}
    </td>
  ),

  img: ({ src, alt }) => {
    if (!src) return null;

    return (
      <figure className="my-5">
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="
            max-w-full
            rounded-xl
            border
            border-white/[0.08]
            bg-white/[0.02]
            shadow-[0_10px_35px_rgba(0,0,0,0.18)]
          "
        />

        {alt ? (
          <figcaption className="mt-2 px-1 text-[11px] leading-5 text-white/30">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },

  sup: ({ children }) => (
    <sup className="text-[10px] text-violet-300">{children}</sup>
  ),

  sub: ({ children }) => (
    <sub className="text-[10px] text-violet-300">{children}</sub>
  ),
};

const ChatList = () => {
  const {
    reworkUI,
    activeMessages,
    isGenerating,
    showPreview,
    setShowPreview,
  } = useEditorContext();

  const chatListRef = useRef(null);

  const latestAssistantIndex = useMemo(() => {
    if (!activeMessages?.length) return -1;

    for (let index = activeMessages.length - 1; index >= 0; index--) {
      if (activeMessages[index].role === "ASSISTANT") {
        return index;
      }
    }

    return -1;
  }, [activeMessages]);

  const latestAssistant = useMemo(() => {
    if (latestAssistantIndex === -1) return null;

    return activeMessages?.[latestAssistantIndex] ?? null;
  }, [activeMessages, latestAssistantIndex]);

  const latestAssistantHasContent = Boolean(latestAssistant?.message?.trim());

  const isWaitingForAssistant = isGenerating && !latestAssistantHasContent;

  const generationLabel = latestAssistantHasContent ? "Generating" : "Thinking";

  useEffect(() => {
    const element = chatListRef.current;

    if (!element) return;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: isGenerating ? "auto" : "smooth",
    });
  }, [activeMessages, isGenerating]);

  if (!reworkUI) {
    return null;
  }

  return (
    <div className="relative h-full w-full overflow-hidden pt-8 bg-[#070708]">
      <div
        ref={chatListRef}
        className="
          h-full
          w-full
          overflow-x-hidden
          overflow-y-auto
          px-5
          pt-8
          pb-24
          sm:px-6
          lg:px-7
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-white/10
        "
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-7">
          {activeMessages?.map((prompt, index) => {
            const isUser = prompt.role === "USER";
            const isCurrentAssistant =
              !isUser && index === latestAssistantIndex;

            const message = prompt.message.trim() ?? "";
            const hasMessage = Boolean(message.trim());

            /*
             * Do not render an empty assistant message as a response
             * card. That empty message represents the pending generation
             * state and is rendered once below.
             */
            if (!isUser && !hasMessage) {
              return null;
            }

            const aiRequest =
              !isUser && activeMessages[index - 1]?.aiRequest
                ? activeMessages[index - 1].aiRequest
                : null;

            return (
              <Fragment key={prompt.id ?? `${prompt.role}-${index}`}>
                {isUser ? (
                  <div className="flex justify-end animate-[chat-entry_220ms_ease-out]">
                    <div className="max-w-[82%] sm:max-w-[76%]">
                      <div className="mb-2 flex justify-end">
                        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                          You
                        </span>
                      </div>

                      <div
                        className="
                          rounded-2xl
                          rounded-br-md
                          border
                          border-violet-400/25
                          bg-linear-to-br
                          from-violet-600/95
                          via-violet-600/90
                          to-fuchsia-600/90
                          px-4
                          py-2
                          text-[14px]
                          leading-6
                          text-white
                          shadow-[0_8px_30px_rgba(124,58,237,0.16)]
                        "
                      >
                        <p className="whitespace-pre-wrap wrap-break-words">
                          {prompt.message.trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="w-full max-w-[94%]">
                      <div className="mb-2 flex items-center gap-2">
                        <div
                          className={`
                            relative flex h-5 w-5 items-center justify-center
                            rounded-md border border-violet-400/20
                            bg-violet-400/8
                            ${
                              isGenerating && isCurrentAssistant
                                ? "chat-ai-orbit"
                                : ""
                            }
                          `}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.9)]" />
                        </div>

                        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/30">
                          ComponentLab
                        </span>

                        {isGenerating && isCurrentAssistant ? (
                          <span
                            className="
                              ml-1
                              bg-linear-to-r
                              from-white/20
                              via-violet-200
                              to-white/20
                              bg-[length:200%_100%]
                              bg-clip-text
                              text-[10px]
                              font-medium
                              text-transparent
                              animate-chat-status
                            "
                          >
                            {generationLabel}
                          </span>
                        ) : null}
                      </div>

                      <article
                        className={`
                          relative
                          overflow-hidden
                          animate-[chat-entry_220ms_ease-out]
                          rounded-2xl
                          border
                          border-white/[0.07]
                          bg-white/2.5
                          px-5
                          py-5
                          shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                          sm:px-6
                          sm:py-6
                          ${
                            isGenerating && isCurrentAssistant
                              ? "chat-generating"
                              : ""
                          }
                        `}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                          components={markdownComponents}
                        >
                          {message}
                        </ReactMarkdown>

                        {isGenerating && isCurrentAssistant ? (
                          <span className="chat-stream-caret" />
                        ) : null}
                      </article>

                      {aiRequest ? (
                        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 px-1 text-[10px] text-white/25">
                          <span>Input {aiRequest.inputTokens ?? 0}</span>

                          <span className="text-white/10">•</span>

                          <span>Output {aiRequest.outputTokens ?? 0}</span>

                          <span className="text-white/10">•</span>

                          <span>Thinking {aiRequest.thinkingTokens ?? 0}</span>

                          <span className="text-white/10">•</span>

                          <span>Total {aiRequest.totalTokens ?? 0}</span>
                          {index == activeMessages.length - 1 && reworkUI && (
                            <div className="flex items-center justify-end flex-1">
                              <button
                                type="button"
                                onClick={() => setShowPreview((prev) => !prev)}
                                aria-pressed={showPreview}
                                className="
                                  group
                                  inline-flex
                                  h-8
                                  items-center
                                  gap-2
                                  rounded-full
                                  border
                                  border-white/20
                                  bg-neutral-900/40
                                  px-3
                                  sticky
                                  text-[12px]
                                  font-medium
                                  tracking-[0.12em]
                                  text-white/50
                                  transition-all
                                  duration-200
                                  hover:border-violet-400/20
                                  hover:bg-violet-400/[0.045]
                                  hover:text-white/55
                                  focus:outline-none

                                  focus:ring-violet-400/30
                                  cursor-pointer"
                              >
                                <span
                                  className={`
          relative
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-md
          border
          transition-all
          duration-200
          ${
            showPreview
              ? "border-violet-400/30 bg-violet-400/[0.08] text-violet-300"
              : "border-white/[0.06] bg-white/[0.02] text-white/25"
          }
        `}
                                >
                                  <Eye
                                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-105"
                                    strokeWidth={1.8}
                                  />
                                </span>

                                <span>Preview</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}

          {isWaitingForAssistant ? (
            <div className="flex justify-start animate-[chat-entry_260ms_ease-out]">
              <div className="w-full max-w-[94%]">
                <div className="mb-2 flex items-center gap-2">
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-md border border-violet-400/20 bg-violet-400/8 chat-ai-orbit">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.9)]" />
                  </div>

                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/30">
                    ComponentLab
                  </span>

                  <span
                    className="
                      ml-1
                      bg-linear-to-r
                      from-white/20
                      via-violet-200
                      to-white/20
                      bg-[length:200%_100%]
                      bg-clip-text
                      text-[10px]
                      font-medium
                      text-transparent
                      animate-chat-status
                    "
                  >
                    Thinking
                  </span>
                </div>

                <div
                  className="
                    chat-generating
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/2.5
                    px-5
                    py-5
                    shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                    sm:px-6
                    sm:py-6
                  "
                >
                  <div className="space-y-4">
                    <div className="chat-placeholder-line w-[68%]" />
                    <div className="chat-placeholder-line w-[91%]" />
                    <div className="chat-placeholder-line w-[54%]" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#070708] via-[#070708]/80 to-transparent" />
    </div>
  );
};

export default ChatList;
