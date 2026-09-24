import { ArrowUpRight } from "lucide-react";

const ChatPreviewToggle = ({ showPreview, setShowPreview }) => {
  return (
    <button
      type="button"
      onClick={() => setShowPreview((prev) => !prev)}
      aria-pressed={showPreview}
      aria-label={showPreview ? "Hide preview" : "Show preview"}
      title={showPreview ? "Hide preview" : "Show preview"}
      className="
        absolute
        -bottom-6
        right-0
        z-50
        group
        inline-flex
        items-center
        gap-1.5
        rounded-2xl
        rounded-tr-md
        border
        border-white/[0.10]
        bg-white/[0.035]
        px-3
        py-2
        text-[12px]
        font-normal
        tracking-normal
        text-white/55
        transition-colors
        duration-150
        hover:border-violet-300/[0.20]
        hover:bg-violet-300/[0.055]
        hover:text-white/80
        active:bg-violet-300/[0.075]
        focus:outline-none
        focus-visible:ring-1
        focus-visible:ring-violet-400/45
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#08080a]
        cursor-pointer
      "
    >
      <span
        className={`
          transition-colors
          duration-150
          ${
            showPreview
              ? "text-violet-300"
              : "text-white/55 group-hover:text-violet-200"
          }
        `}
      >
        Preview
      </span>

      <ArrowUpRight
        className={`
          h-3.5
          w-3.5
          shrink-0
          transition-colors
          duration-150
          ${
            showPreview
              ? "text-violet-300/85"
              : "text-white/40 group-hover:text-violet-200/80"
          }
        `}
        strokeWidth={1.8}
      />
    </button>
  );
};

export default ChatPreviewToggle;
