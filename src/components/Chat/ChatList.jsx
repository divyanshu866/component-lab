"use client";

import { useEffect, useRef } from "react";
import { useEditorContext } from "@/context/EditorContext";
import ChatMessage from "./ChatMessage";
import PendingAssistant from "./PendingAssistant";
import AnimatedCodePreview from "./AnimatedCodePreview";

const PREVIEW_TRANSITION_MS = 1000;
const BOTTOM_THRESHOLD = 1000;

const getLatestAssistantIndex = (messages) => {
  for (let index = messages.length - 1; index >= 0; index--) {
    if (messages[index]?.role === "ASSISTANT") {
      return index;
    }
  }

  return -1;
};

const isNearBottom = (element) => {
  if (!element) return false;

  const distanceFromBottom =
    element.scrollHeight - element.scrollTop - element.clientHeight;

  return distanceFromBottom <= BOTTOM_THRESHOLD;
};

const ChatList = ({ resolvedGenerationMode, isGeneratingCode }) => {
  const {
    reworkUI,
    activeMessages,
    isGenerating,
    showPreview,
    setShowPreview,
  } = useEditorContext();

  const chatListRef = useRef(null);
  const bottomAnchoredRef = useRef(true);
  const animationFrameRef = useRef(null);

  const messages = activeMessages ?? [];

  const latestAssistantIndex = getLatestAssistantIndex(messages);
  const latestAssistant = messages[latestAssistantIndex];

  const hasLatestAssistantContent = Boolean(latestAssistant?.message?.trim());

  const isWaitingForAssistant = isGenerating && !hasLatestAssistantContent;

  const isGenerationRequest = resolvedGenerationMode === "REWORK";

  const isCodePreviewOpen = isGenerationRequest && isGeneratingCode;

  /*
   * Keep track of whether the user is currently following
   * the bottom of the conversation.
   *
   * We only auto-anchor during the preview animation when
   * they were already at the bottom.
   */
  const handleScroll = (event) => {
    bottomAnchoredRef.current = isNearBottom(event.currentTarget);
  };

  /*
   * Normal chat auto-scroll.
   *
   * During generation, new streamed content should continue
   * keeping the conversation at the bottom.
   */
  useEffect(() => {
    const element = chatListRef.current;

    if (!element) return;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: isGenerating ? "auto" : "smooth",
    });
  }, [messages, isGenerating]);

  /*
   * Keep the scroll container bottom-anchored while the
   * CodePreview panel expands/collapses.
   *
   * Without this, collapsing a large block inside a scrollable
   * container can cause scrollTop to be clamped abruptly when
   * the scrollHeight shrinks.
   */
  useEffect(() => {
    const element = chatListRef.current;

    if (!element || !isGenerationRequest) {
      return;
    }

    if (!bottomAnchoredRef.current) {
      return;
    }

    cancelAnimationFrame(animationFrameRef.current);

    const startedAt = performance.now();

    const syncBottom = (timestamp) => {
      const current = chatListRef.current;

      if (!current) return;

      if (!bottomAnchoredRef.current) {
        return;
      }

      current.scrollTop = current.scrollHeight - current.clientHeight;

      if (timestamp - startedAt < PREVIEW_TRANSITION_MS + 60) {
        animationFrameRef.current = requestAnimationFrame(syncBottom);
      }
    };

    animationFrameRef.current = requestAnimationFrame(syncBottom);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isCodePreviewOpen, isGenerationRequest]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  if (!reworkUI) {
    return null;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-backgroundDark pt-8">
      <div
        ref={chatListRef}
        onScroll={handleScroll}
        className="
          h-full
          w-full
          overflow-x-hidden
          overflow-y-auto
          px-5
          pt-8
          pb-34
          sm:px-6
          lg:px-7
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-white/10
        "
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {messages.map((message, index) => {
            const isAssistant = message.role === "ASSISTANT";
            const hasContent = Boolean(message.message?.trim());

            // Empty assistant messages represent an in-progress response.
            if (isAssistant && !hasContent) {
              return null;
            }

            const aiRequest = isAssistant
              ? (messages[index - 1]?.aiRequest ?? null)
              : null;

            return (
              <ChatMessage
                key={message.id ?? `${message.role}-${index}`}
                message={message}
                aiRequest={aiRequest}
                isCurrentAssistant={
                  isAssistant && index === latestAssistantIndex
                }
                isLastMessage={index === messages.length - 1}
                isGenerating={isGenerating}
                isGeneratingCode={isGeneratingCode}
                isCodePreviewOpen={isCodePreviewOpen}
                isGenerationRequest={isGenerationRequest}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
              />
            );
          })}

          {isWaitingForAssistant ? <PendingAssistant /> : null}

          {/* {isGenerationRequest ? (
            <AnimatedCodePreview isOpen={isCodePreviewOpen} />
          ) : null} */}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#070708] via-[#070708]/80 to-transparent" />
    </div>
  );
};

export default ChatList;
