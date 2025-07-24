import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateWithGemini(prompt, model = "gemini-2.5-flash") {
  try {
    const modelInstance = genAI.getGenerativeModel({ model });
    const response = await modelInstance.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw new Error("Failed to generate with Gemini");
  }
}
