"use client";

import CodePreviewPannel from "@/components/Chat/CodePreviewPannel";

const AnimatedCodePreview = ({ isOpen }) => {
  return (
    <div
      className={`
        grid
        overflow-hidden
        transition-[grid-template-rows]
        duration-[500ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
      `}
    >
      <div
        className={`
          min-h-0
          overflow-hidden
          pt-3
          transition-[opacity,transform]
          duration-[500ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-[0.985] opacity-0"
          }
        `}
      >
        <CodePreviewPannel />
      </div>
    </div>
  );
};

export default AnimatedCodePreview;
