import OpenAI from "openai";
import { toOpenAIContext } from "../../app/api/ai/buildEditContents";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function* generateWithOpenAI(
  systemPrompt,
  context,
  model = "gpt-5.6-luna",
) {
  const contents = toOpenAIContext(context);
  let summary = "";
  console.log("OPEN_AI CONTEXT=========>");
  console.dir(contents, { depth: null });
  const stream = await client.responses.create({
    model,
    instructions: systemPrompt,
    input: contents,
    reasoning: {
      effort: "high",
    },
    stream: true,
  });

  //Normalise Stream
  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      yield {
        type: "text",
        text: event.delta,
      };
      continue;
    }
    //Currently turned off
    if (event.type === "response.reasoning_summary_text.delta") {
      summary += event.delta;

      yield {
        type: "reasoning",
        text: event.delta,
      };
    }
    if (event.type === "response.completed") {
      const usage = event.response.usage;
      if (usage) {
        yield {
          type: "usage",
          usage: {
            inputTokens: usage.input_tokens ?? 0,
            outputTokens: usage.output_tokens ?? 0,
            reasoningTokens: usage.output_tokens_details?.reasoning_tokens ?? 0,
            totalTokens: usage.total_tokens ?? 0,
          },
        };
      }
    }
    console.log("OPEN_AI unlogged event RESPONSE=========>");
    console.dir(event, { depth: null });
    console.log("Reasoning Summary=======>", summary);
  }
}
