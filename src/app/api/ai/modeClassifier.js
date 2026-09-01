import { generate } from "@/ai/providers/generate";
import { GENERATION_MODE_SYSTEM_PROMPT } from "./prompts/general";
const GENERATION_MODE_CLASSIFIER_MODEL = "gemini-3.5-flash-lite";
export async function classifyGenerationMode(contents) {
  const stream = await generate(
    GENERATION_MODE_SYSTEM_PROMPT,
    contents,
    GENERATION_MODE_CLASSIFIER_MODEL,
  );

  let response = "";

  for await (const chunk of stream) {
    response += chunk.text ?? "";
  }

  try {
    const result = JSON.parse(response);
    console.log("INTENT RESPONSE==========>", result);

    if (result.resolvedMode !== "ASK" && result.resolvedMode !== "REWORK") {
      return "ASK";
    }

    return result.resolvedMode;
  } catch {
    return "ASK";
  }
}

export async function resolveMode(generationMode, contents) {
  let resolvedMode = "";
  switch (generationMode) {
    case "ASK":
      resolvedMode = "ASK";
      break;
    case "AUTO":
      resolvedMode = await classifyGenerationMode(contents);
      break;
    default:
      resolvedMode = "ASK";
  }

  return resolvedMode;
}
