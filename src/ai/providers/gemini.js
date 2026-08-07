import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function generateWithGemini(systemPrompt, contents, model) {
  const response = await genAI.models.generateContentStream({
    model: model,
    contents,
    config: {
      systemInstruction: systemPrompt,
      thinkingConfig: {
        thinkingLevel: "minimal",
      },
    },
  });

  return response; // Return the stream directly instead of accumulating
}
