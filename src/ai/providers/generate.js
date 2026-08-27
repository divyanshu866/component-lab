import { generateWithGemini } from "./gemini";
import { generateWithOpenAI } from "./openai";
export async function generate(systemPrompt, contents, selectedModel) {
  switch (selectedModel) {
    case "gemini-3.5-flash-lite":
      return await generateWithGemini(systemPrompt, contents, selectedModel);
    case "gemini-3.1-pro-preview":
      return await generateWithGemini(systemPrompt, contents, selectedModel);
    case "gpt-5.6-luna":
      return await generateWithOpenAI(systemPrompt, contents, selectedModel);
    default:
      throw new Error(`Unknown AI provider: ${selectedModel}`);
  }
}
