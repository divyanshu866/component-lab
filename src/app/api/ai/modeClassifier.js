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
    const result = parseGenerationModeResponse(response);
    console.log("RESOLVER RESPONSE=========>", result);

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
    case "AUTO":
      resolvedMode = await classifyGenerationMode(contents);
      break;
    case "ASK":
      resolvedMode = "ASK";
      break;

    default:
      resolvedMode = "ASK";
  }

  return resolvedMode;
}
function parseGenerationModeResponse(response) {
  const trimmed = response.trim().replace(/^\uFEFF/, "");

  // Plain JSON
  if (!trimmed.startsWith("```")) {
    return JSON.parse(trimmed);
  }

  // Only accept ```json fences
  const fencedMatch = trimmed.match(/^```json\s*([\s\S]*?)\s*```$/i);

  if (!fencedMatch) {
    throw new Error(`Classifier returned a non-JSON code fence: ${trimmed}`);
  }

  return JSON.parse(fencedMatch[1]);
}
