import { GoogleGenAI } from "@google/genai";
import { toGeminiContext } from "../../app/api/ai/buildEditContents";
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function* generateWithGemini(systemPrompt, context, model) {
  const contents = toGeminiContext(context);
  console.log("GEMINI CONTEXT=========>");
  console.dir(contents, { depth: null });
  const stream = await genAI.models.generateContentStream({
    model: model,
    contents,
    config: {
      systemInstruction: systemPrompt,
      thinkingConfig: {
        thinkingLevel: "low",
      },
    },
  });

  //Normalise Stream
  for await (const chunk of stream) {
    if (chunk.text) {
      yield {
        type: "text",
        text: chunk.text,
      };
    }

    if (chunk.usageMetadata) {
      yield {
        type: "usage",
        usage: {
          inputTokens: chunk.usageMetadata.promptTokenCount ?? 0,
          outputTokens: chunk.usageMetadata.candidatesTokenCount ?? 0,
          reasoningTokens: chunk.usageMetadata.thoughtsTokenCount ?? 0,
          totalTokens: chunk.usageMetadata.totalTokenCount ?? 0,
        },
      };
    }
  }
}
