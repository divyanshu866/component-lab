"use client";

import ChatMarkdown from "./ChatMarkdown";
import ChatPreviewToggle from "./ChatPreviewToggle";
import AnimatedCodePreview from "./AnimatedCodePreview";
import Image from "next/image";
import { AI_MODELS } from "@/ai/models";

/* ------------------------------------------------------------------
   Type + rhythm tokens
   body   → 15px / 28px line-height, neutral-200
   label  → 13px medium
   meta   → 11px tabular numerals, label muted / value bright
   badge  → 10px tracked caps
   vertical rhythm → 12px (mb-3) · 16px (mt-4) · 24px (mt-6)
------------------------------------------------------------------- */

const Dot = () => (
  <span aria-hidden="true" className="text-white/10">
    ·
  </span>
);

const Stat = ({ label, value }) => (
  <span className="inline-flex items-baseline gap-1.5">
    <span className="text-neutral-500">{label}</span>
    <span className="font-medium tabular-nums text-neutral-300">{value}</span>
  </span>
);

const MessageMeta = ({ aiRequest }) => {
  if (!aiRequest) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] leading-5">
      <Stat label="Input" value={aiRequest.inputTokens ?? 0} />
      <Dot />
      <Stat label="Output" value={aiRequest.outputTokens ?? 0} />
      <Dot />
      <Stat label="Thinking" value={aiRequest.thinkingTokens ?? 0} />
      <Dot />
      <Stat label="Total" value={aiRequest.totalTokens ?? 0} />
    </div>
  );
};

const AssistantHeader = ({ isGenerating, aiRequest }) => {
  const modelUsed = AI_MODELS.find((model) => model.value === aiRequest?.model);

  return (
    <div className="mb-3 flex items-center gap-2.5">
      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-violet-400/20
          bg-violet-400/[0.07]
        "
      >
        <Image
          src={"/newlogo.svg"}
          width={30}
          height={30}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="text-[13px] font-medium leading-5 tracking-[0.01em] text-violet-400">
          ComponentLab
        </span>

        {isGenerating ? (
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
                  rounded-full
                  bg-violet-300
                  opacity-40
                  animate-ping
                "
              />

              <span className="relative h-1.5 w-1.5 rounded-full bg-violet-300" />
            </span>
            Generating
          </span>
        ) : null}

        {/* Generation Model */}
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

const UserMessage = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div
        className="
          max-w-[88%]
          sm:max-w-[78%]
          motion-safe:animate-[chat-entry_220ms_cubic-bezier(0.22,1,0.36,1)]
        "
      >
        <div className="mb-2 flex justify-end px-1">
          <span className="text-[13px] font-medium leading-5 tracking-[0.01em] text-neutral-400">
            You
          </span>
        </div>

        <div
          className="
            rounded-2xl
            rounded-br-md
            border
            border-white/10
            bg-violet-600/70
            px-4
            py-3
            text-[15px]
            leading-7
            text-white
            shadow-[0_6px_24px_rgba(0,0,0,0.12)]
            transition-colors
            duration-200
          "
        >
          <p className="whitespace-pre-wrap break-words">{message}</p>
        </div>
      </div>
    </div>
  );
};

const AssistantMessage = ({
  message,
  aiRequest,
  isCurrentAssistant,
  isLastMessage,
  isGenerating,
  isGenerationRequest,
  isCodePreviewOpen,
  showPreview,
  setShowPreview,
}) => {
  const isActive = isGenerating && isCurrentAssistant;

  return (
    <div
      className="
        flex
        justify-start
        motion-safe:animate-[chat-entry_260ms_cubic-bezier(0.22,1,0.36,1)]
      "
    >
      <div className="relative w-full max-w-[96%] sm:max-w-[94%]">
        <AssistantHeader isGenerating={isActive} aiRequest={aiRequest} />

        {/* Reading column — aligns body copy with the header label on ≥sm */}
        <div className="pl-0 pt-1">
          <div
            className={`
              relative
              ${isActive ? "transition-opacity duration-200" : ""}
            `}
          >
            <div
              className="
                text-[15px]
                leading-7
                text-neutral-200
                [&>*+*]:mt-3
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            >
              <ChatMarkdown>{message}</ChatMarkdown>
            </div>

            {isActive ? (
              <span
                aria-hidden="true"
                className="
                  ml-0.5
                  inline-block
                  h-[1.05em]
                  w-[2px]
                  translate-y-[3px]
                  rounded-full
                  bg-violet-300/80
                  shadow-[0_0_8px_rgba(196,181,253,0.35)]
                  motion-safe:animate-pulse
                "
              />
            ) : null}
          </div>

          <MessageMeta aiRequest={aiRequest} />
        </div>

        {isLastMessage && isGenerationRequest ? (
          <AnimatedCodePreview isOpen={isCodePreviewOpen} />
        ) : null}

        {!isGenerating && isLastMessage ? (
          <div className="absolute bottom-3 right-0 z-0 flex justify-end">
            <ChatPreviewToggle
              showPreview={showPreview}
              setShowPreview={setShowPreview}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ChatMessage = ({
  message,
  aiRequest,
  isCurrentAssistant,
  isLastMessage,
  isGenerating,
  isGenerationRequest,
  isCodePreviewOpen,
  showPreview,
  setShowPreview,
}) => {
  const text = message?.message?.trim() ?? "";

  if (message?.role === "USER") {
    return <UserMessage message={text} />;
  }

  return (
    <AssistantMessage
      message={text}
      aiRequest={aiRequest}
      isCurrentAssistant={isCurrentAssistant}
      isLastMessage={isLastMessage}
      isGenerating={isGenerating}
      isCodePreviewOpen={isCodePreviewOpen}
      isGenerationRequest={isGenerationRequest}
      showPreview={showPreview}
      setShowPreview={setShowPreview}
    />
  );
};

export default ChatMessage;
