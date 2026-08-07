import { generateWithGemini } from "./gemini";

export async function generate(systemPrompt, contents, selectedModel) {
  switch (selectedModel) {
    case "gemini-3.5-flash-lite":
      return await generateWithGemini(systemPrompt, contents, selectedModel);

    default:
      throw new Error(`Unknown AI provider: ${selectedModel}`);
  }
}
