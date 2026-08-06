import { React, useEffect, useRef } from "react";
import { useEditorContext } from "@/context/EditorContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
const ChatList = () => {
  const { reworkUI, activeMessages } = useEditorContext();
  const chatListRef = useRef(null);
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [activeMessages]);
  return (
    <div className="h-full w-full relative">
      <div
        ref={chatListRef}
        className={`${reworkUI ? "" : "hidden"} leading-6 w-full h-full overflow-y-auto px-4 pt-4 pb-22 space-y-5`}
      >
        {activeMessages?.map((prompt, index) => (
          <div
            key={index}
            className={`flex ${prompt.role === "USER" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl ${
                prompt.role === "USER"
                  ? "bg-linear-to-br from-[#8E2DE2] to-[#4A00E0] text-white px-4 py-3"
                  : "bg-gray-100 dark:bg-linear-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-gray-900 dark:text-white px-6 py-4 border border-gray-200 dark:border-neutral-800"
              }`}
            >
              {prompt.role === "USER" ? (
                <p className="text-md">{prompt.message}</p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mt-6 mb-3">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mt-5 mb-3">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="text-md leading-7 mb-3 last:mb-0">
                        {children}
                      </p>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-semibold text-neutral-900 dark:text-white">
                        {children}
                      </strong>
                    ),

                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),

                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-1 my-3 text-md">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 space-y-1 my-3 text-md">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="leading-6">{children}</li>
                    ),

                    blockquote: ({ children }) => (
                      <blockquote className="my-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-r-lg px-4 py-2 italic">
                        {children}
                      </blockquote>
                    ),

                    hr: () => (
                      <hr className="my-5 border-neutral-300 dark:border-neutral-700" />
                    ),

                    pre: ({ children }) => (
                      <pre className="my-4 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-md text-neutral-100">
                        {children}
                      </pre>
                    ),

                    code({ className, children, ...props }) {
                      const isBlock = className?.startsWith("language-");

                      if (!isBlock) {
                        return (
                          <code
                            className="rounded bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 font-mono text-[13px] text-pink-600 dark:text-purple-300"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }

                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },

                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline dark:text-blue-400"
                      >
                        {children}
                      </a>
                    ),

                    table: ({ children }) => (
                      <div className="my-4 overflow-x-auto">
                        <table className="w-full border border-neutral-300 dark:border-neutral-700 text-md">
                          {children}
                        </table>
                      </div>
                    ),

                    thead: ({ children }) => (
                      <thead className="bg-neutral-200 dark:bg-neutral-800">
                        {children}
                      </thead>
                    ),

                    th: ({ children }) => (
                      <th className="border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-left font-semibold">
                        {children}
                      </th>
                    ),

                    td: ({ children }) => (
                      <td className="border border-neutral-300 dark:border-neutral-700 px-3 py-2">
                        {children}
                      </td>
                    ),

                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt}
                        className="my-4 max-w-full rounded-xl"
                      />
                    ),
                  }}
                >
                  {prompt.message}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent dark:from-neutral-950" />
    </div>
  );
};

export default ChatList;
