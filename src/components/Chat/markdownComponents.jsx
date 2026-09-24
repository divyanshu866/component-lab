import MarkdownCodeBlock from "./MarkdownCodeBlock";

const linkPattern = /^(https?:\/\/|mailto:|tel:|#)/i;

const getSafeHref = (href) => {
  if (typeof href !== "string") {
    return null;
  }

  return linkPattern.test(href) ? href : null;
};

const markdownComponents = {
  /*
   * --------------------------------------------------------------------------
   * Headings
   * --------------------------------------------------------------------------
   */

  h1: ({ children }) => (
    <h1
      className="
        mb-5
        mt-1
        text-[25px]
        font-semibold
        leading-[1.2]
        tracking-[-0.035em]
        text-white
        [&_a]:text-violet-300
      "
    >
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2
      className="
        mb-3.5
        mt-8
        text-[20px]
        font-semibold
        leading-[1.3]
        tracking-[-0.025em]
        text-white
        [&_a]:text-violet-300
      "
    >
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3
      className="
        mb-2.5
        mt-7
        text-[17px]
        font-semibold
        leading-[1.4]
        tracking-[-0.015em]
        text-violet-100
        [&_a]:text-violet-300
      "
    >
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4
      className="
        mb-2
        mt-6
        text-[15px]
        font-semibold
        leading-[1.45]
        text-violet-200
        [&_a]:text-violet-300
      "
    >
      {children}
    </h4>
  ),

  h5: ({ children }) => (
    <h5
      className="
        mb-2
        mt-5
        text-[14px]
        font-semibold
        leading-[1.5]
        text-violet-200
        [&_a]:text-violet-300
      "
    >
      {children}
    </h5>
  ),

  h6: ({ children }) => (
    <h6
      className="
        mb-2
        mt-5
        text-[12px]
        font-semibold
        uppercase
        leading-[1.5]
        tracking-[0.08em]
        text-fuchsia-300
        [&_a]:text-fuchsia-300
      "
    >
      {children}
    </h6>
  ),

  /*
   * --------------------------------------------------------------------------
   * Text
   * --------------------------------------------------------------------------
   */

  p: ({ children }) => (
    <p
      className="
        mb-4
        whitespace-pre-wrap
        break-words
        text-[14.5px]
        font-normal
        leading-[1.78]
        text-white/84
        last:mb-0
        [&+ul]:mt-1
        [&+ol]:mt-1
      "
    >
      {children}
    </p>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),

  em: ({ children }) => (
    <em className="font-normal text-violet-200">{children}</em>
  ),

  del: ({ children }) => (
    <del className="text-white/50 decoration-red-400/60">{children}</del>
  ),

  /*
   * --------------------------------------------------------------------------
   * Lists
   * --------------------------------------------------------------------------
   */

  ul: ({ children, className }) => (
    <ul
      className={`
        my-4
        list-disc
        space-y-2
        pl-6
        text-[14.5px]
        font-normal
        leading-[1.78]
        text-white/84
        marker:text-violet-400
        marker:text-[11px]
        [&>li>ul]:my-2
        [&>li>ol]:my-2
        [&>li>p]:mb-2
        [&>li>p:last-child]:mb-0
        [&.contains-task-list]:list-none
        [&.contains-task-list]:space-y-2.5
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
        text-[14.5px]
        font-normal
        leading-[1.78]
        text-white/84
        marker:font-medium
        marker:text-violet-300
        marker:text-[13px]
        [&>li>ul]:my-2
        [&>li>ol]:my-2
        [&>li>p]:mb-2
        [&>li>p:last-child]:mb-0
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

  /*
   * GFM task-list checkboxes
   */

  input: ({ type, checked }) => {
    if (type !== "checkbox") {
      return null;
    }

    const isChecked = checked === true;

    return (
      <input
        type="checkbox"
        checked={isChecked}
        readOnly
        disabled
        aria-label={isChecked ? "Completed" : "Not completed"}
        className="
          mr-2
          inline-block
          h-3.5
          w-3.5
          translate-y-[1px]
          accent-violet-500
          disabled:cursor-default
          disabled:opacity-100
        "
      />
    );
  },

  /*
   * --------------------------------------------------------------------------
   * Quotes / separators
   * --------------------------------------------------------------------------
   */

  blockquote: ({ children }) => (
    <blockquote
      className="
        my-5
        rounded-r-xl
        border-l-2
        border-violet-400
        bg-violet-400/[0.07]
        px-4
        py-3
        text-[14.5px]
        font-normal
        leading-[1.78]
        text-violet-100/88
        shadow-[inset_0_0_30px_rgba(139,92,246,0.03)]
        [&>p]:mb-2
        [&>p:last-child]:mb-0
        [&_strong]:font-semibold
        [&_strong]:text-violet-50
        [&_a]:text-violet-300
      "
    >
      {children}
    </blockquote>
  ),

  hr: () => (
    <hr
      className="
        my-8
        border-0
        border-t
        border-white/[0.12]
      "
    />
  ),

  br: () => <br />,

  /*
   * --------------------------------------------------------------------------
   * Code
   * --------------------------------------------------------------------------
   */

  pre: ({ children }) => <MarkdownCodeBlock>{children}</MarkdownCodeBlock>,

  code({ className, children, ...props }) {
    const isBlock =
      typeof className === "string" &&
      /(^|\s)(language-|lang-)/i.test(className);

    if (!isBlock) {
      return (
        <code
          className="
            inline
            rounded-md
            border
            border-fuchsia-400/20
            bg-fuchsia-400/[0.09]
            px-1.5
            py-0.5
            font-mono
            text-[12px]
            font-medium
            leading-[1.5]
            text-fuchsia-300
            break-words
            shadow-[inset_0_0_12px_rgba(217,70,239,0.035)]
          "
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        className={`
          ${className ?? ""}
          font-mono
          text-[12.5px]
          font-normal
          leading-[1.7]
          text-white/88
        `}
        {...props}
      >
        {children}
      </code>
    );
  },

  /*
   * --------------------------------------------------------------------------
   * Links
   * --------------------------------------------------------------------------
   */

  a: ({ href, title, children }) => {
    const safeHref = getSafeHref(href);

    if (!safeHref) {
      return <span className="text-white/78">{children}</span>;
    }

    const isExternal = /^(https?:\/\/)/i.test(safeHref);

    return (
      <a
        href={safeHref}
        title={title}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="
          font-medium
          text-violet-300
          underline
          decoration-violet-300/45
          underline-offset-[3px]
          transition-colors
          duration-150
          hover:text-fuchsia-300
          hover:decoration-fuchsia-300/70
        "
      >
        {children}
      </a>
    );
  },

  /*
   * --------------------------------------------------------------------------
   * Tables
   * --------------------------------------------------------------------------
   */

  table: ({ children }) => (
    <div
      className="
        my-5
        overflow-x-auto
        rounded-xl
        border
        border-white/[0.12]
        bg-white/[0.018]
        shadow-[0_8px_24px_rgba(0,0,0,0.14)]
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-white/10
      "
    >
      <table
        className="
          w-full
          min-w-[520px]
          border-collapse
          text-left
          text-[13px]
          font-normal
          leading-[1.6]
          [&_tr:last-child_td]:border-b-0
        "
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead
      className="
        bg-violet-400/[0.085]
        text-violet-100
      "
    >
      {children}
    </thead>
  ),

  tbody: ({ children }) => (
    <tbody className="divide-y divide-white/[0.075]">{children}</tbody>
  ),

  tfoot: ({ children }) => (
    <tfoot
      className="
        border-t
        border-white/[0.09]
        bg-white/[0.025]
      "
    >
      {children}
    </tfoot>
  ),

  tr: ({ children }) => (
    <tr className="transition-colors duration-150 hover:bg-violet-400/[0.05]">
      {children}
    </tr>
  ),

  th: ({ children, align }) => (
    <th
      style={{ textAlign: align ?? undefined }}
      className="
        border-b
        border-violet-400/[0.15]
        px-3.5
        py-3
        text-left
        text-[13px]
        font-semibold
        leading-[1.6]
        text-violet-100
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
        border-white/[0.065]
        px-3.5
        py-3
        align-top
        text-[13px]
        font-normal
        leading-6
        text-white/78
      "
    >
      {children}
    </td>
  ),

  /*
   * --------------------------------------------------------------------------
   * Images
   * --------------------------------------------------------------------------
   */

  img: ({ src, alt, title }) => {
    if (!src) {
      return null;
    }

    return (
      <figure className="my-5">
        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-white/[0.11]
            bg-white/[0.025]
            shadow-[0_12px_35px_rgba(0,0,0,0.22)]
          "
        >
          <img
            src={src}
            alt={alt ?? ""}
            title={title}
            loading="lazy"
            className="
              block
              h-auto
              max-w-full
            "
          />
        </div>

        {alt ? (
          <figcaption
            className="
              mt-2
              px-1
              text-[11px]
              font-normal
              leading-5
              text-violet-200/55
            "
          >
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },

  /*
   * --------------------------------------------------------------------------
   * Superscript / subscript
   * --------------------------------------------------------------------------
   */

  sup: ({ children }) => (
    <sup className="text-[10px] font-medium text-violet-300">{children}</sup>
  ),

  sub: ({ children }) => (
    <sub className="text-[10px] font-medium text-fuchsia-300">{children}</sub>
  ),
};

export default markdownComponents;
