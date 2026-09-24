import { ArrowUpRight, Eye } from "lucide-react";

const ChatPreviewToggle = ({ showPreview, setShowPreview }) => {
  return (
    <button
      type="button"
      onClick={() => setShowPreview((prev) => !prev)}
      aria-pressed={showPreview}
      className="
        absolute
        -bottom-5
        right-0
        z-50
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
        text-[12px]
        font-medium
        tracking-[0.12em]
        text-white/50
        transition-all
        duration-200
        hover:border-violet-400/20
        hover:bg-violet-400/4.5
        hover:text-white/55
        focus:outline-none
        focus:ring-1
        focus:ring-violet-400/30
        cursor-pointer
      "
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
              ? "border-violet-400/30 bg-violet-400/8 text-violet-300"
              : "border-white/6 bg-white/2 text-white/25"
          }
        `}
      >
        <Eye
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-105"
          strokeWidth={1.8}
        />
      </span>

      <span>Preview</span>

      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.8}
      />
    </button>
  );
};

export default ChatPreviewToggle;
