"use client";

import ChatMarkdown from "./ChatMarkdown";
import ChatPreviewToggle from "./ChatPreviewToggle";
import AnimatedCodePreview from "./AnimatedCodePreview";
import Image from "next/image";

const MessageMeta = ({ aiRequest }) => {
  if (!aiRequest) {
    return null;
  }

  return (
    <div
      className="
        mt-5
        flex
        flex-wrap
        items-center
        gap-x-2.5
        gap-y-1
        text-[10px]
        leading-4
        text-neutral-400
      "
    >
      <span>Input {aiRequest.inputTokens ?? 0}</span>
      <span className="text-white/10">·</span>
      <span>Output {aiRequest.outputTokens ?? 0}</span>
      <span className="text-white/10">·</span>
      <span>Thinking {aiRequest.thinkingTokens ?? 0}</span>
      <span className="text-white/10">·</span>
      <span>Total {aiRequest.totalTokens ?? 0}</span>
    </div>
  );
};

const AssistantHeader = ({ isGenerating }) => {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <div
        className="
          flex
          h-7
          w-7
          mt-0
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-violet-400/20
          bg-violet-400/[0.07]
        "
      >
        <Image src={"/newlogo.svg"} width={30} height={30} alt="logo" />
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <span className="text-[13px] font-medium tracking-[0.01em] text-violet-400">
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
              text-[9px]
              font-medium
              tracking-[0.04em]
              text-violet-200/65
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
        <div className="mb-4 flex justify-end px-1">
          <span className="text-[13px] font-medium tracking-[0.01em] text-neutral-400">
            You
          </span>
        </div>

        <div
          className="
            rounded-2xl
            rounded-br-md
            border
            border-white/9
            bg-purple-700/90
            px-4
            py-3
            text-[14px]
            leading-6
            text-white
            shadow-[0_6px_24px_rgba(0,0,0,0.12)]
            transition-colors
            duration-200
          "
        >
          <p className="whitespace-pre-wrap wrap-break-words">{message}</p>
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
        <AssistantHeader isGenerating={isActive} />

        <div
          className={`
            relative
            pl-0.5
            ${isActive ? "transition-opacity duration-200" : ""}
          `}
        >
          <div
            className="
              text-white/72
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
                ml-1
                inline-block
                h-[1.1em]
                w-[2px]
                translate-y-[2px]
                rounded-full
                bg-violet-300/80
                shadow-[0_0_8px_rgba(196,181,253,0.35)]
                motion-safe:animate-pulse
              "
            />
          ) : null}
        </div>

        <MessageMeta aiRequest={aiRequest} />
        {isLastMessage & isGenerationRequest ? (
          <AnimatedCodePreview isOpen={isCodePreviewOpen} />
        ) : null}
        {!isGenerating & isLastMessage ? (
          <div className="absolute bottom-4.5 right-0 flex justify-end z-0">
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
