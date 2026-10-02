import OpenAI from "openai";
import { toOpenAIContext } from "../../app/api/ai/buildEditContents";

const client = new OpenAI({
  apiKey: process.env.Z_AI_API_KEY,
  baseURL: "https://api.z.ai/api/paas/v4",
});

export async function* generateWithZAI(
  systemPrompt,
  context,
  modelValue = "glm-5.3-flash",
  effortValue = "low",
  webSearchEnabled = false,
) {
  const contents = toOpenAIContext(context);

  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    ...contents,
  ];
  console.log("ModelValue=====>", modelValue);
  console.log("EffortValue=====>", effortValue);
  const stream = await client.chat.completions.create({
    model: modelValue,
    messages,

    thinking: {
      type: "enabled",
      clear_thinking: false,
    },

    reasoning_effort: effortValue,

    temperature: 1,
    top_p: 0.95,

    stream: true,

    // Z.ai recommends this for streamed tool calls.
    tool_stream: true,

    // Keep this disabled until you've wired Z.ai's
    // actual web-search/tool schema.
    ...(webSearchEnabled
      ? {
          // tools: [...]
        }
      : {}),
  });

  for await (const chunk of stream) {
    const choice = chunk.choices?.[0];
    const delta = choice?.delta;

    if (!delta) {
      continue;
    }

    // Reasoning stream
    if (delta.reasoning_content) {
      yield {
        type: "reasoning",
        text: delta.reasoning_content,
      };
    }

    // Normal text stream
    if (delta.content) {
      yield {
        type: "text",
        text: delta.content,
      };
    }

    // Usage
    if (chunk.usage) {
      yield {
        type: "usage",
        usage: {
          inputTokens: chunk.usage.prompt_tokens ?? 0,
          outputTokens: chunk.usage.completion_tokens ?? 0,
          reasoningTokens: 0,
          totalTokens: chunk.usage.total_tokens ?? 0,
          cachedTokens: chunk.usage.prompt_tokens_details?.cached_tokens ?? 0,
        },
      };
    }
  }
}
