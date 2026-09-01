import { generate } from "@/ai/providers/generate";
import { createStreamingResponse } from "@/ai/stream_parser";
import { mockStream, mockText } from "./mockStreamGenerator";
import { buildNeutralEditContext } from "./buildEditContents";
import { buildNeutralGenerateContext } from "./buildGenerateContents";
import { resolveMode } from "./modeClassifier";

const mockResponse = false; // Set to true to use mock response for testing
const chunkSize = 1000; // Set the chunk size for the mock stream
const delay = 10; // Set the delay between chunks in milliseconds

import {
  WEB_BUNDLE_PROMPT,
  WEB_BUNDLE_EDIT_SYSTEM_PROMPT,
  WEB_BUNDLE_ASK_SYSTEM_PROMPT,
} from "./prompts/webBundle";
import {
  REACT_SYSTEM_PROMPT,
  REACT_EDIT_SYSTEM_PROMPT,
  REACT_ASK_SYSTEM_PROMPT,
} from "./prompts/react";

const SYSTEM_PROMPTS = {
  HTML: {
    ASK: WEB_BUNDLE_ASK_SYSTEM_PROMPT,
    REWORK: WEB_BUNDLE_PROMPT,
  },
  REACT: {
    ASK: REACT_ASK_SYSTEM_PROMPT,
    REWORK: REACT_SYSTEM_PROMPT,
  },
};

const EDIT_SYSTEM_PROMPT = {
  HTML: {
    ASK: WEB_BUNDLE_ASK_SYSTEM_PROMPT,
    REWORK: WEB_BUNDLE_EDIT_SYSTEM_PROMPT,
  },
  REACT: {
    ASK: REACT_ASK_SYSTEM_PROMPT,
    REWORK: REACT_EDIT_SYSTEM_PROMPT,
  },
};

//API GENERATE NEW COMPONENT
export async function POST(req) {
  const { messages, targetTech, generationMode, model } = await req.json();

  //Build neutral Contents
  const contents = buildNeutralGenerateContext(messages);

  // console.log("From frontEnd Messages object==================>>>>>");
  // console.dir(messages, { depth: null });

  // console.log("POST/GENERATE neutral CONTENTS==============>>>>>");
  // console.dir(contents, { depth: null });

  if (mockResponse) {
    const stream = mockStream(
      targetTech === "REACT" ? mockReactText : mockText,
      chunkSize,
      delay,
    );

    return createStreamingResponse(stream);
  } else {
    console.log(
      "SELECTED SYATEM PROMPT========>:",
      SYSTEM_PROMPTS[targetTech][generationMode],
    );

    console.log("GENERATION MODE========>:", generationMode);
    const resolvedMode = await resolveMode(generationMode, contents);
    console.log("RESOLVED GENERATION MODE========>:", resolvedMode);

    const stream = await generate(
      SYSTEM_PROMPTS[targetTech][resolvedMode],
      contents,
      model,
    );
    const headers = { "X-Resolved-Generation-Mode": resolvedMode };

    return createStreamingResponse(stream, headers);
  }
}

//API MODIFY EXISTING COMPONENT
export async function PATCH(req) {
  const {
    name,
    messages,
    html,
    css,
    js,
    jsx,
    targetTech,
    generationMode,
    model,
  } = await req.json();

  const request = {
    mode: "edit",
    targetTech,
    component: {
      name,
      html,
      css,
      js,
      jsx,
    },
    messages: messages,
  };

  //Build contents
  const contents = buildNeutralEditContext(request);

  // console.log("From frontEnd Messages object==================>>>>>");
  // console.dir(messages, { depth: null });

  // console.log("PATCH/EDIT neutral CONTENTS==============>>>>>");
  // console.dir(contents, { depth: null });

  if (mockResponse) {
    const stream = mockStream(
      targetTech === "REACT" ? mockReactText : mockText,
      chunkSize,
      delay,
    );
    return createStreamingResponse(stream);
  } else {
    console.log("GENERATION MODE========>:", generationMode);
    const resolvedMode = await resolveMode(generationMode, contents);
    console.log("RESOLVED GENERATION MODE========>:", resolvedMode);

    const stream = await generate(
      EDIT_SYSTEM_PROMPT[targetTech][resolvedMode],
      contents,
      model,
    );
    const headers = { "X-Resolved-Generation-Mode": resolvedMode };

    return createStreamingResponse(stream, headers);
  }
}
