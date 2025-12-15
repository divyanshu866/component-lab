import { generateWithGemini } from "./gemini";

export async function generate(systemPrompt, prompt, selectedModel) {
  switch (selectedModel) {
    case "gemini-2.5-flash":
      return await generateWithGemini(systemPrompt, prompt, selectedModel);

    default:
      throw new Error(`Unknown AI provider: ${selectedModel}`);
  }
}
