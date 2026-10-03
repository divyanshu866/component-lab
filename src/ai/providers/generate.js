import { generateWithGemini } from "./gemini";
import { generateWithOpenAI } from "./openai";
import { generateWithZAI } from "./zai";
export async function generate(
  systemPrompt,
  contents,
  modelValue,
  effortValue,
  webSearchEnabeled,
) {
  switch (modelValue) {
    case "gpt-6-luna":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );
    case "gpt-6-sol":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );
    case "gpt-6-astra":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );
    case "gpt-5.6-luna":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );
    case "gpt-5.6-terra":
      return await generateWithOpenAI(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );

    case "gemini-3.8-flash":
      return await generateWithGemini(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );
    case "gemini-3.5-flash-lite":
      return await generateWithGemini(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );
    case "glm-5.3-flash":
      return await generateWithZAI(
        systemPrompt,
        contents,
        modelValue,
        effortValue,
        webSearchEnabeled,
      );
    default:
      throw new Error(`Unknown AI provider: ${modelValue}`);
  }
}
