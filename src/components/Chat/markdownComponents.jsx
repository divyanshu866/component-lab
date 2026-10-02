import MarkdownCodeBlock from "./MarkdownCodeBlock";

const linkPattern = /^(https?:\/\/|mailto:|tel:|#)/i;

const getSafeHref = (href) => {
  if (typeof href !== "string") return null;
  return linkPattern.test(href) ? href : null;
};

const headingBase =
  "scroll-mt-6 font-semibold text-white [&_a]:text-violet-300 [&_a]:no-underline";

const markdownComponents = {
  h1: ({ children }) => (
    <h1
      className={`${headingBase} mb-5 mt-1 text-[24px] leading-[1.25] tracking-[-0.035em] sm:text-[28px]`}
    >
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2
      className={`${headingBase} mb-3 mt-8 text-[20px] leading-[1.3] tracking-[-0.025em] sm:mt-10 sm:text-[22px]`}
    >
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3
      className={`${headingBase} mb-2 mt-6 text-[17px] leading-[1.4] tracking-[-0.015em] sm:text-[18px]`}
    >
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4 className={`${headingBase} mb-2 mt-5 text-[15px] leading-[1.45]`}>
      {children}
    </h4>
  ),

  h5: ({ children }) => (
    <h5
      className={`${headingBase} mb-1.5 mt-4 text-[14px] leading-[1.5] text-white/85`}
    >
      {children}
    </h5>
  ),

  h6: ({ children }) => (
    <h6
      className={`${headingBase} mb-1.5 mt-4 text-[12px] uppercase leading-[1.5] tracking-[0.08em] text-white/65`}
    >
      {children}
    </h6>
  ),

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

    const className =
      "mb-4 break-words whitespace-pre-wrap text-[14px] leading-[1.75] font-normal text-neutral-200 last:mb-0 sm:text-[15px] [&+ul]:mt-0 [&+ol]:mt-0";

    if (isImageOnly) return <>{children}</>;
    if (hasImage) return <div className={className}>{children}</div>;

    return <p className={className}>{children}</p>;
  },

  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),

  em: ({ children }) => <em className="text-neutral-100 italic">{children}</em>,

  del: ({ children }) => (
    <del className="text-white/55 decoration-red-400/55">{children}</del>
  ),

  u: ({ children }) => (
    <u className="decoration-white/50 decoration-[1px] underline-offset-[3px]">
      {children}
    </u>
  ),

  kbd: ({ children }) => (
    <kbd className="inline-flex items-center rounded-md border border-white/[0.14] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] font-medium leading-none text-neutral-200">
      {children}
    </kbd>
  ),

  mark: ({ children }) => (
    <mark className="rounded bg-violet-400/[0.18] px-1 text-violet-100">
      {children}
    </mark>
  ),

  ul: ({ children, className }) => (
    <ul
      className={`my-4 list-disc space-y-2 pl-5 text-[14px] leading-[1.75] text-neutral-200 marker:text-violet-300/80 sm:pl-6 sm:text-[15px] [&>li>ul]:my-2 [&>li>ol]:my-2 [&>li>p]:mb-2 [&>li>p:last-child]:mb-0 [&.contains-task-list]:list-none [&.contains-task-list]:pl-0 ${className ?? ""}`}
    >
      {children}
    </ul>
  ),

  ol: ({ children, className, start }) => (
    <ol
      start={start}
      className={`my-4 list-decimal space-y-2 pl-5 text-[14px] leading-[1.75] text-neutral-200 marker:font-medium marker:text-violet-300/80 sm:pl-6 sm:text-[15px] [&>li>ul]:my-2 [&>li>ol]:my-2 [&>li>p]:mb-2 [&>li>p:last-child]:mb-0 ${className ?? ""}`}
    >
      {children}
    </ol>
  ),

  li: ({ children, className }) => (
    <li
      className={`pl-1 [&>p]:mb-2 [&>p:last-child]:mb-0 [&.task-list-item]:list-none [&.task-list-item]:pl-0 ${className ?? ""}`}
    >
      {children}
    </li>
  ),

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
        className="mr-2 inline-block h-3.5 w-3.5 translate-y-[1px] accent-violet-500 disabled:cursor-default disabled:opacity-100"
      />
    );
  },

  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-r-lg border-l-2 border-violet-400/70 bg-violet-400/[0.06] px-4 py-3 text-[14px] leading-[1.75] text-neutral-300 sm:text-[15px] [&>p]:mb-2 [&>p:last-child]:mb-0 [&_strong]:text-white">
      {children}
    </blockquote>
  ),

  details: ({ children }) => (
    <details className="my-5 overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.025]">
      {children}
    </details>
  ),

  summary: ({ children }) => (
    <summary className="cursor-pointer select-none px-4 py-3 text-[14px] font-medium leading-6 text-neutral-100 marker:text-violet-300 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-violet-400">
      {children}
    </summary>
  ),

  dl: ({ children }) => (
    <dl className="my-5 space-y-3 text-[14px] leading-[1.75] sm:text-[15px]">
      {children}
    </dl>
  ),

  dt: ({ children }) => (
    <dt className="font-semibold text-white">{children}</dt>
  ),

  dd: ({ children }) => (
    <dd className="mt-1 pl-4 text-neutral-300">{children}</dd>
  ),

  hr: () => <hr className="my-8 border-0 border-t border-white/[0.12]" />,

  br: () => <br />,

  pre: ({ children }) => <MarkdownCodeBlock>{children}</MarkdownCodeBlock>,

  code({ className, children, ...props }) {
    const isBlock =
      typeof className === "string" &&
      /(^|\s)(language-|lang-)/i.test(className);

    if (!isBlock) {
      return (
        <code
          className="rounded border border-white/[0.12] bg-white/[0.07] px-1.5 py-0.5 font-mono text-[12px] font-medium leading-[1.5] text-violet-200 break-words sm:text-[12.5px]"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        className={`${className ?? ""} font-mono text-[12px] font-normal leading-[1.7] text-neutral-100 sm:text-[13px]`}
        {...props}
      >
        {children}
      </code>
    );
  },

  a: ({ href, title, children }) => {
    const safeHref = getSafeHref(href);

    if (!safeHref) {
      return <span className="text-neutral-300">{children}</span>;
    }

    const isExternal = /^(https?:\/\/)/i.test(safeHref);

    return (
      <a
        href={safeHref}
        title={title}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-medium text-violet-300 underline decoration-violet-300/50 underline-offset-[3px] transition-colors hover:text-violet-200 hover:decoration-violet-200 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        {children}
      </a>
    );
  },

  table: ({ children }) => (
    <div className="my-5 max-w-full overflow-x-auto rounded-xl border border-white/[0.12] bg-white/[0.02]">
      <table className="w-full min-w-[480px] border-collapse text-left text-[13px] leading-[1.6] [&_tr:last-child_td]:border-b-0">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-white/[0.055] text-white">{children}</thead>
  ),

  tbody: ({ children }) => (
    <tbody className="divide-y divide-white/[0.07]">{children}</tbody>
  ),

  tfoot: ({ children }) => (
    <tfoot className="border-t border-white/[0.1] bg-white/[0.035]">
      {children}
    </tfoot>
  ),

  tr: ({ children }) => <tr className="hover:bg-white/[0.035]">{children}</tr>,

  th: ({ children, align }) => (
    <th
      style={{ textAlign: align ?? undefined }}
      className="border-b border-white/[0.1] px-3 py-2.5 text-left text-[13px] font-semibold leading-[1.6] text-white sm:px-4 sm:py-3"
    >
      {children}
    </th>
  ),

  td: ({ children, align }) => (
    <td
      style={{ textAlign: align ?? undefined }}
      className="border-b border-white/[0.07] px-3 py-2.5 align-top text-[13px] leading-[1.6] text-neutral-300 sm:px-4 sm:py-3"
    >
      {children}
    </td>
  ),

  img: ({ src, alt, title }) => {
    if (!src) return null;

    return (
      <figure className="mb-4 block w-full max-w-[320px] whitespace-normal align-top sm:mr-4 sm:inline-block sm:w-[30%] sm:min-w-[180px] sm:last:mr-0">
        <div className="flex w-full justify-center overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.025]">
          <img
            src={src}
            alt={alt ?? ""}
            title={title}
            loading="lazy"
            className="block h-auto max-h-[520px] w-full max-w-full object-contain"
          />
        </div>
        {alt ? (
          <figcaption className="mt-2 px-1 text-xs leading-5 text-neutral-400">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },

  sup: ({ children }) => (
    <sup className="text-[10px] font-medium text-violet-300">{children}</sup>
  ),

  sub: ({ children }) => (
    <sub className="text-[10px] font-medium text-fuchsia-300">{children}</sub>
  ),
};

export default markdownComponents;
