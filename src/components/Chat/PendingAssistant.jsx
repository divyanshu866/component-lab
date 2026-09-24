"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";

const PendingAssistant = () => {
  return (
    <div
      className="
        cl-pending
        mt-2
        flex
        w-full
        max-w-[96%]
        justify-start
        sm:max-w-[94%]
      "
      aria-live="polite"
      aria-label="ComponentLab is thinking"
    >
      <div className="w-full">
        {/* Assistant identity */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="cl-pending-icon">
            <Image src={"/newlogo.svg"} width={30} height={30} alt="logo" />
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <span className="text-[11px] font-medium tracking-[0.01em] text-white/65">
              ComponentLab
            </span>

            <span className="cl-pending-status">
              <span>Thinking</span>

              <span aria-hidden="true" className="cl-pending-dots">
                <span />
                <span />
                <span />
              </span>
            </span>
          </div>
        </div>

        {/* Response activity */}
        <div className="cl-pending-body pl-0.5">
          <div className="cl-pending-trace">
            <span className="cl-pending-trace-marker" />
            <span className="cl-pending-trace-line cl-pending-trace-line-primary" />
            <span className="cl-pending-trace-line cl-pending-trace-line-secondary" />
          </div>

          <div className="cl-pending-lines">
            <div className="cl-pending-line w-[78%]" />
            <div className="cl-pending-line w-[93%]" />
            <div className="cl-pending-line w-[61%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingAssistant;
