// Helper function to create streaming response
const startMarkers = {
  "###NAME_START###": "name",
  "###MESSAGE_START###": "message",
  "###HTML_START###": "html",
  "###JSX_START###": "jsx",
  "###CSS_START###": "css",
  "###JS_START###": "js",
};

const endMarkers = {
  "###NAME_END###": "name",
  "###MESSAGE_END###": "message",
  "###HTML_END###": "html",
  "###JSX_END###": "jsx",
  "###CSS_END###": "css",
  "###JS_END###": "js",
};
export async function createStreamingResponse(stream) {
  // Create a ReadableStream for SSE
  const encoder = new TextEncoder();
  let usageMetadata = null;

  const readable = new ReadableStream({
    async start(controller) {
      try {
        let accumulator = "";
        let inSection = false;
        let currSection = null;
        for await (const chunk of stream) {
          if (chunk.usageMetadata) {
            usageMetadata = chunk.usageMetadata;
          }
          const chunkText = chunk.text || "";
          accumulator += chunkText;

          // Process markers and content in the accumulator
          let remaining = accumulator;
          // console.log("Remaining:", remaining);
          //No start untill lengths is greater than 19
          while (remaining.length >= 19) {
            if (inSection == false) {
              //Check for all markers
              let foundStartMarker = false;
              let foundMarker = null;
              let foundSection = null;
              //Check for all start markers
              for (const [marker, section] of Object.entries(startMarkers)) {
                //If a startMarker is found
                if (remaining.includes(marker)) {
                  foundMarker = marker;
                  foundSection = section;
                  currSection = section;
                  foundStartMarker = true;
                  break;
                }
              }
              //If none of the startMarker is found
              if (foundStartMarker == false) {
                //remove everything except last 19 characters
                remaining = remaining.slice(-19);
                break;
              } else {
                //remove marker & everything before it & set inSection to true
                remaining = remaining.slice(
                  remaining.indexOf(foundMarker) + foundMarker.length,
                );
                inSection = true;
                currSection = foundSection;
                // Send section start signal
                // console.log("Found Section Start:", currSection);
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: "section_start",
                      section: currSection,
                    })}\n\n`,
                  ),
                );
              }
            }
            //If inSection is true, check for end markers
            else {
              let foundMarker = null;
              let foundSection = null;
              let foundEndMarker = false;
              //check for all endMarkers
              for (const [marker, section] of Object.entries(endMarkers)) {
                //If none of the endMarker is found
                if (remaining.includes(marker)) {
                  foundMarker = marker;
                  foundSection = section;
                  currSection = section;
                  foundEndMarker = true;
                  break;
                }
              }
              if (foundEndMarker == false) {
                //Emit Everything except last 19 characters
                const emitContent = remaining.slice(0, -19);
                // console.log("Emitting Content for Section:", emitContent);
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: currSection,
                      content: emitContent,
                    })}\n\n`,
                  ),
                );
                //Retain last 19 characters for next iteration
                remaining = remaining.slice(-19);
                break;
              }
              //If End marker found, emit everything before the marker and send section end signal
              else {
                const emitContent = remaining.slice(
                  0,
                  remaining.indexOf(foundMarker),
                );
                // console.log("Emitting Content for Section:", emitContent);
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: currSection,
                      content: emitContent,
                    })}\n\n`,
                  ),
                );

                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: "section_end",
                      section: currSection,
                    })}\n\n`,
                  ),
                );
                //remove marker everything before it & set insection to flase
                remaining = remaining.slice(
                  remaining.indexOf(foundMarker) + foundMarker.length,
                );
                inSection = false;
                currSection = null;
              }
            }
          }
          accumulator = remaining;
        }

        // Send end event
        console.log("Streaming completed.");
        console.log("Final Gemini usage:", {
          promptTokens: usageMetadata?.promptTokenCount,
          outputTokens: usageMetadata?.candidatesTokenCount,
          thinkingTokens: usageMetadata?.thoughtsTokenCount,
          totalTokens: usageMetadata?.totalTokenCount,
        });
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "usage_metadata",
              content: usageMetadata,
            })}\n\n`,
          ),
        );
        controller.enqueue(encoder.encode("event: end\ndata: {}\n\n"));
        controller.close();
      } catch (error) {
        console.error("Streaming error:", error);
        console.log("Final Gemini usage:", {
          promptTokens: usageMetadata?.promptTokenCount,
          outputTokens: usageMetadata?.candidatesTokenCount,
          thinkingTokens: usageMetadata?.thoughtsTokenCount,
          totalTokens: usageMetadata?.totalTokenCount,
        });
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({
              error: error.message,
            })}\n\n`,
          ),
        );
        controller.close();
      }
    }, //CONTROLLER SCOPE
  }); // READABLE STREAM SCOPE

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
