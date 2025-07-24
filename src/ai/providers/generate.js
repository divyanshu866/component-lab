import { generateWithGemini } from "./gemini";

export async function generate(prompt, selectedModel) {
  switch (selectedModel) {
    case "gemini-2.5-flash":
      return await generateWithGemini(prompt, selectedModel);

    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
}
