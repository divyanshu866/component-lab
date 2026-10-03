"use client";

import { useEffect, useState } from "react";
import { AI_MODELS } from "@/ai/models";

const DEFAULT_STEPS = [
  "Thinking through your request",
  "Planning the response",
  "Generating your response",
];

const PendingAssistantHeader = ({ aiRequest }) => {
  const modelUsed = AI_MODELS.find((model) => model.value === aiRequest?.model);

  return (
    <div className="mb-3 flex items-center gap-2.5">
      <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
        {/* Generating badge */}
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-violet-400/15
            bg-violet-400/[0.05]
            px-2
            py-0.5
            text-[10px]
            font-medium
            tracking-[0.06em]
            text-violet-200/70
          "
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="
                absolute
                inset-0
                animate-ping
                rounded-full
                bg-violet-300
                opacity-40
              "
            />

            <span className="relative h-1.5 w-1.5 rounded-full bg-violet-300" />
          </span>
          Generating
        </span>

        {/* Generation model */}
        {modelUsed ? (
          <span
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-medium
              uppercase
              tracking-[0.08em]
              text-neutral-400
            "
          >
            <span aria-hidden="true" className="h-3 w-px bg-white/10" />

            <span>{modelUsed.label}</span>

            {aiRequest?.effort ? (
              <span className="rounded border border-white/10 px-1.5 py-px text-neutral-400">
                {aiRequest.effort}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default function PendingAssistant({
  text,
  steps = DEFAULT_STEPS,
  aiRequest = null,
  className = "",
}) {
  const messages = text
    ? [text, ...steps.filter((step) => step !== text)]
    : steps;

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    function updateStepIndex() {
      setStepIndex(0);

      if (messages.length < 2) {
        return undefined;
      }

      const intervalId = window.setInterval(() => {
        setStepIndex((currentIndex) => (currentIndex + 1) % messages.length);
      }, 1800);

      return () => window.clearInterval(intervalId);
    }
    return updateStepIndex();
  }, [text, steps, messages.length]);

  const currentMessage = messages[stepIndex % messages.length] || "Thinking...";

  return (
    <div
      className="
        flex
        justify-start
        motion-safe:animate-[chat-entry_260ms_cubic-bezier(0.22,1,0.36,1)]
      "
    >
      <div className="relative w-full max-w-[96%] sm:max-w-[94%]">
        {/* Keep the exact same header footprint as AssistantMessage */}
        <PendingAssistantHeader aiRequest={aiRequest} />

        {/* This is deliberately the same body geometry as AssistantMessage */}
        <div className="pl-0 pt-1">
          <div
            className="
              relative
              text-[15px]
              leading-7
              text-neutral-200
            "
          >
            <p
              className={`
                shimmer-text
                m-0
                font-medium
                ${className}
              `}
              role="status"
              aria-live="polite"
            >
              {currentMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
