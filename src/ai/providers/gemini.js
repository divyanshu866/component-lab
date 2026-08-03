// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function generateWithGemini(prompt, model = "gemini-2.5-flash") {
//   try {
//     const modelInstance = genAI.getGenerativeModel({ model });
//     const response = await modelInstance.generateContent(prompt);
//     return response.response.text();
//   } catch (error) {
//     console.error("Gemini generation error:", error);
//     throw new Error("Failed to generate with Gemini");
//   }
// }

import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function generateWithGemini(
  systemPrompt,
  prompt,
  model = "gemini-2.5-flash",
) {
  const response = await genAI.models.generateContentStream({
    model: model,
    contents: prompt,
    config: {
      temperature: 1.0,
      systemInstruction: systemPrompt,
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });

  return response; // Return the stream directly instead of accumulating
}
const contents = [
  {
    role: "user",
    parts: [
      {
        text: "Create a Hello button",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: `###MESSAGE_START###I created the buton with red text.###MESSAGE_END######NAME_START###
Test Component
###NAME_END###
###HTML_START###
<button>Hello</button>
###HTML_END###
###CSS_START###
button {
  color: red;
}
###CSS_END###
###JS_START###
//No javascript required
###JS_END###`,
      },
    ],
  },
  {
    role: "user",
    parts: [
      {
        text: "Make it blue instead of red",
      },
    ],
  },
];
