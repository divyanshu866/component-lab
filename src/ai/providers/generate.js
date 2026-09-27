import { generateWithGemini } from "./gemini";
import { generateWithOpenAI } from "./openai";
export async function generate(
  systemPrompt,
  contents,
  selectedModel,
  webSearchEnabeled,
) {
  switch (selectedModel) {
    case "gpt-6-luna":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        selectedModel,
        webSearchEnabeled,
      );
    case "gpt-6-sol":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        selectedModel,
        webSearchEnabeled,
      );
    case "gpt-6-astra":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        selectedModel,
        webSearchEnabeled,
      );
    case "gpt-5.6-luna":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        selectedModel,
        webSearchEnabeled,
      );
    case "gpt-5.6-terra":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        selectedModel,
        webSearchEnabeled,
      );

    case "gemini-3.8-flash":
      return await generateWithGemini(
        systemPrompt,
        contents,
        selectedModel,
        webSearchEnabeled,
      );
    case "gemini-3.5-flash-lite":
      return await generateWithGemini(
        systemPrompt,
        contents,
        selectedModel,
        webSearchEnabeled,
      );
    default:
      throw new Error(`Unknown AI provider: ${selectedModel}`);
  }
}
