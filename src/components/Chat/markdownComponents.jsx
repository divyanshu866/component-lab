import MarkdownCodeBlock from "./MarkdownCodeBlock";

/* ------------------------------------------------------------------
   Type scale          line-heights      spacing rhythm
   h1  25px            display  1.22     tight   4px  (mt-1)
   h2  20px            heading  1.3      2xs     6px  (mt-1.5)
   h3  17px            sub      1.4       xs      8px  (mt-2)
   h4  15px            body     1.65      sm     12px  (mt-3)
   h5  14px            meta     1.5       md     16px  (mt-4)
   h6  13px            caption  1.35      lg     24px  (mt-6)
   body 15px
   small 13px
   meta 11px

   Text hierarchy
   primary   text-white        headings, strong
   secondary text-white/85     body copy
   tertiary  text-white/65     secondary body, cells
   muted     text-white/45     captions, disabled
   accent    text-violet-300   links, markers
------------------------------------------------------------------- */

const linkPattern = /^(https?:\/\/|mailto:|tel:|#)/i;

const getSafeHref = (href) => {
  if (typeof href !== "string") return null;
  return linkPattern.test(href) ? href : null;
};

/* Shared heading styles */
const headingBase =
  "scroll-mt-6 text-white [&_a]:text-violet-300 [&_a]:no-underline";

const markdownComponents = {
  /* ----------------------------------------------------------------
     Headings
  ----------------------------------------------------------------- */

  h1: ({ children }) => (
    <h1
      className={`${headingBase} mt-1 mb-4 text-[25px] leading-[1.22] font-semibold tracking-[-0.035em]`}
    >
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2
      className={`${headingBase} mt-8 mb-3 text-[20px] leading-[1.3] font-semibold tracking-[-0.025em]`}
    >
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3
      className={`${headingBase} mt-6 mb-2 text-[17px] leading-[1.4] font-semibold tracking-[-0.015em] text-white/95`}
    >
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4
      className={`${headingBase} mt-5 mb-2 text-[15px] leading-[1.45] font-semibold text-white/90`}
    >
      {children}
    </h4>
  ),

  h5: ({ children }) => (
    <h5
      className={`${headingBase} mt-4 mb-1.5 text-[14px] leading-[1.5] font-semibold text-white/85`}
    >
      {children}
    </h5>
  ),

  h6: ({ children }) => (
    <h6
      className={`${headingBase} mt-4 mb-1.5 text-[13px] leading-[1.5] font-semibold tracking-[0.01em] text-white/70 uppercase`}
    >
      {children}
    </h6>
  ),

  /* ----------------------------------------------------------------
     Text
  ----------------------------------------------------------------- */

  p: ({ children, node }) => {
    const nodeChildren = node?.children ?? [];

    const hasImage = nodeChildren.some(
      (child) => child.type === "element" && child.tagName === "img",
    );

    const isImageOnly =
      hasImage &&
      nodeChildren.every(
        (child) => child.type === "element" && child.tagName === "img",
      );

    const className = `
      mb-4
      text-[15px]
      leading-[1.7]
      font-normal
      text-white/85
      whitespace-pre-wrap
      break-words
      last:mb-0
      [&+ul]:mt-0
      [&+ol]:mt-0
    `;

    if (isImageOnly) return <>{children}</>;
    if (hasImage) return <div className={className}>{children}</div>;

    return <p className={className}>{children}</p>;
  },

  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),

  em: ({ children }) => (
    <em className="font-normal text-violet-100/90 italic">{children}</em>
  ),

  del: ({ children }) => (
    <del className="text-white/45 decoration-red-400/55">{children}</del>
  ),

  u: ({ children }) => (
    <u className="decoration-white/50 decoration-[1px] underline-offset-[3px]">
      {children}
    </u>
  ),

  kbd: ({ children }) => (
    <kbd
      className="
        inline-flex
        items-center
        rounded-md
        border
        border-white/[0.12]
        bg-white/[0.055]
        px-1.5
        py-0.5
        font-mono
        text-[11px]
        leading-none
        font-medium
        text-white/80
        shadow-[0_1px_0_rgba(255,255,255,0.04)]
      "
    >
      {children}
    </kbd>
  ),

  mark: ({ children }) => (
    <mark className="rounded bg-violet-400/[0.12] px-1 text-violet-100">
      {children}
    </mark>
  ),

  /* ----------------------------------------------------------------
     Lists
  ----------------------------------------------------------------- */

  ul: ({ children, className }) => (
    <ul
      className={`
        my-4
        list-disc
        space-y-2
        pl-6
        text-[15px]
        leading-[1.7]
        font-normal
        text-white/85
        marker:text-[10px]
        marker:text-violet-300/90
        [&>li>ul]:my-2
        [&>li>ol]:my-2
        [&>li>p]:mb-2
        [&>li>p:last-child]:mb-0
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
        text-[15px]
        leading-[1.7]
        font-normal
        text-white/85
        marker:text-[13px]
        marker:font-medium
        marker:text-violet-300/90
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

  /* GFM task-list checkboxes */
  input: ({ type, checked }) => {
    if (type !== "checkbox") return null;

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

  /* ----------------------------------------------------------------
     Quotes / separators / native HTML
  ----------------------------------------------------------------- */

  blockquote: ({ children }) => (
    <blockquote
      className="
        my-5
        rounded-r-lg
        border-l-2
        border-violet-400/80
        bg-violet-400/[0.055]
        px-4
        py-3
        text-[15px]
        leading-[1.7]
        font-normal
        text-white/80
        [&>p]:mb-2
        [&>p:last-child]:mb-0
        [&_strong]:font-semibold
        [&_strong]:text-white
        [&_a]:text-violet-300
      "
    >
      {children}
    </blockquote>
  ),

  details: ({ children }) => (
    <details
      className="
        my-5
        overflow-hidden
        rounded-xl
        border
        border-white/[0.09]
        bg-white/[0.02]
      "
    >
      {children}
    </details>
  ),

  summary: ({ children }) => (
    <summary
      className="
        cursor-pointer
        select-none
        px-4
        py-3
        text-[14px]
        leading-6
        font-medium
        text-white/85
        transition-colors
        duration-150
        marker:text-violet-300
        hover:bg-white/[0.025]
        hover:text-white
      "
    >
      {children}
    </summary>
  ),

  dl: ({ children }) => (
    <dl className="my-5 space-y-3 text-[15px] leading-[1.7]">{children}</dl>
  ),

  dt: ({ children }) => (
    <dt className="font-semibold text-white/90">{children}</dt>
  ),

  dd: ({ children }) => <dd className="mt-1 pl-4 text-white/70">{children}</dd>,

  hr: () => <hr className="my-8 border-0 border-t border-white/[0.1]" />,

  br: () => <br />,

  /* ----------------------------------------------------------------
     Code
  ----------------------------------------------------------------- */

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
            border-white/[0.10]
            bg-white/[0.055]
            px-1.5
            py-0.5
            font-mono
            text-[12.5px]
            leading-[1.5]
            font-medium
            text-violet-300/90
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
        className={`
          ${className ?? ""}
          font-mono
          text-[12.5px]
          leading-[1.7]
          font-normal
          text-white/90
        `}
        {...props}
      >
        {children}
      </code>
    );
  },

  /* ----------------------------------------------------------------
     Links
  ----------------------------------------------------------------- */

  a: ({ href, title, children }) => {
    const safeHref = getSafeHref(href);

    if (!safeHref) {
      return <span className="text-white/75">{children}</span>;
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
          decoration-violet-300/40
          underline-offset-[3px]
          transition-colors
          duration-150
          hover:text-violet-200
          hover:decoration-violet-200/70
        "
      >
        {children}
      </a>
    );
  },

  /* ----------------------------------------------------------------
     Tables
  ----------------------------------------------------------------- */

  table: ({ children }) => (
    <div
      className="
        my-5
        overflow-x-auto
        rounded-xl
        border
        border-white/[0.1]
        bg-white/[0.015]
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
          leading-[1.6]
          font-normal
          [&_tr:last-child_td]:border-b-0
        "
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-violet-400/[0.06] text-white/90">{children}</thead>
  ),

  tbody: ({ children }) => (
    <tbody className="divide-y divide-white/[0.065]">{children}</tbody>
  ),

  tfoot: ({ children }) => (
    <tfoot className="border-t border-white/[0.08] bg-white/[0.02]">
      {children}
    </tfoot>
  ),

  tr: ({ children }) => (
    <tr className="transition-colors duration-150 hover:bg-white/[0.025]">
      {children}
    </tr>
  ),

  th: ({ children, align }) => (
    <th
      style={{ textAlign: align ?? undefined }}
      className="
        border-b
        border-white/[0.09]
        px-3.5
        py-3
        text-left
        text-[13px]
        leading-[1.6]
        font-semibold
        text-white/90
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
        border-white/[0.055]
        px-3.5
        py-3
        align-top
        text-[13px]
        leading-6
        font-normal
        text-white/75
      "
    >
      {children}
    </td>
  ),

  /* ----------------------------------------------------------------
     Images
  ----------------------------------------------------------------- */

  img: ({ src, alt, title }) => {
    if (!src) return null;

    return (
      <figure
        className="
          mb-4
          mr-4
          inline-block
          w-[30%]
          min-w-[180px]
          max-w-[320px]
          align-top
          whitespace-normal
          last:mr-0
        "
      >
        <div
          className="
            flex
            w-full
            justify-center
            overflow-hidden
            rounded-xl
            border
            border-white/[0.1]
            bg-white/[0.02]
            shadow-[0_12px_35px_rgba(0,0,0,0.2)]
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
              w-full
              max-h-[520px]
              max-w-full
              object-contain
            "
          />
        </div>

        {alt ? (
          <figcaption className="mt-2 px-1 text-[11px] leading-5 font-normal text-white/40">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },

  /* ----------------------------------------------------------------
     Superscript / subscript
  ----------------------------------------------------------------- */

  sup: ({ children }) => (
    <sup className="text-[10px] font-medium text-violet-300">{children}</sup>
  ),

  sub: ({ children }) => (
    <sub className="text-[10px] font-medium text-fuchsia-300">{children}</sub>
  ),
};

export default markdownComponents;
