import { NextResponse } from "next/server";
import { generate } from "@/ai/providers/generate";

// Helper function to create streaming response
function createStreamingResponse(stream) {
  // Create a ReadableStream for SSE
  const encoder = new TextEncoder();
  let buffer = "";

  const readable = new ReadableStream({
    async start(controller) {
      try {
        let currentSection = null;

        for await (const chunk of stream) {
          const chunkText = chunk.text || "";
          buffer += chunkText;

          // Process markers and content in the buffer
          let remaining = buffer;
          buffer = "";

          while (remaining.length > 0) {
            if (currentSection === null) {
              // Look for section start markers anywhere in the remaining content
              const startMarkerMap = {
                "###NAME_START###": { section: "name", length: 16 },
                "###HTML_START###": { section: "html", length: 16 },
                "###CSS_START###": { section: "css", length: 15 },
                "###JS_START###": { section: "js", length: 14 },
              };

              let markerFound = false;
              for (const [marker, info] of Object.entries(startMarkerMap)) {
                const markerIndex = remaining.indexOf(marker);
                if (markerIndex !== -1) {
                  // If we're not in a section and there's content before a marker,
                  // the LLM might be generating content before starting properly.
                  // Ignore content before markers when not in a section.

                  currentSection = info.section;
                  remaining = remaining.substring(markerIndex + info.length);

                  // Send section start signal
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: "section_start",
                        section: info.section,
                      })}\n\n`
                    )
                  );
                  markerFound = true;
                  break;
                }
              }

              if (!markerFound) {
                // No marker found, this shouldn't happen when not in section
                // The LLM might not be following the format, so we'll skip this character
                if (remaining.length > 0) {
                  remaining = remaining.substring(1);
                } else {
                  // Empty buffer, break out of loop
                  break;
                }
              }
            } else {
              // We're in a section, look for end marker or next start marker
              const endMarker =
                "###" + currentSection.toUpperCase() + "_END###";
              const endIndex = remaining.indexOf(endMarker);

              // Also check for any start marker that would indicate the next section
              const startMarkerMap = {
                "###NAME_START###": { section: "name", length: 16 },
                "###HTML_START###": { section: "html", length: 16 },
                "###CSS_START###": { section: "css", length: 15 },
                "###JS_START###": { section: "js", length: 14 },
              };

              let nextStartIndex = -1;
              let nextSection = null;
              let nextMarkerLength = 0;

              for (const [marker, info] of Object.entries(startMarkerMap)) {
                const index = remaining.indexOf(marker);
                if (
                  index !== -1 &&
                  (nextStartIndex === -1 || index < nextStartIndex)
                ) {
                  nextStartIndex = index;
                  nextSection = info.section;
                  nextMarkerLength = info.length;
                }
              }

              if (
                endIndex !== -1 &&
                (nextStartIndex === -1 || endIndex < nextStartIndex)
              ) {
                // Found end marker first, send content up to end marker
                const content = remaining.substring(0, endIndex);

                // Send each character individually
                for (let i = 0; i < content.length; i++) {
                  const char = content[i];
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: currentSection,
                        content: char,
                      })}\n\n`
                    )
                  );
                }

                // Send section end signal
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: "section_end",
                      section: currentSection,
                    })}\n\n`
                  )
                );

                // Reset for next section
                currentSection = null;
                remaining = remaining.substring(endIndex + endMarker.length);
              } else if (nextStartIndex !== -1) {
                // Found next start marker, send content up to it and switch sections
                const content = remaining.substring(0, nextStartIndex);

                // Send each character individually
                for (let i = 0; i < content.length; i++) {
                  const char = content[i];
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: currentSection,
                        content: char,
                      })}\n\n`
                    )
                  );
                }

                // Send section end signal
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: "section_end",
                      section: currentSection,
                    })}\n\n`
                  )
                );

                // Start new section
                currentSection = nextSection;
                remaining = remaining.substring(
                  nextStartIndex + nextMarkerLength
                );

                // Send section start signal for new section
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: "section_start",
                      section: currentSection,
                    })}\n\n`
                  )
                );
              } else {
                // No markers found, send one character at a time to avoid getting stuck
                if (remaining.length > 0) {
                  const char = remaining[0];
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: currentSection,
                        content: char,
                      })}\n\n`
                    )
                  );
                  remaining = remaining.substring(1);
                }
              }
            }
          }
        }

        // Send end event
        controller.enqueue(encoder.encode("event: end\ndata: {}\n\n"));
        controller.close();
      } catch (error) {
        console.error("Streaming error:", error);
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({
              error: error.message,
            })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

const SYSTEM_PROMPT = `<role>
You are an expert frontend developer specializing in creating beautiful, functional UI components. Generate production-ready HTML, CSS, and JavaScript code based on user specifications.
</role>

<assets>
Use ONLY these URLs when external assets are needed:
- Avatar: https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740
- Image 1: https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg
- Image 2: https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg
- Image 3: https://wowslider.com/sliders/demo-93/data1/images/lake.jpg
- Image 4: https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp
- Video: https://www.youtube.com/embed/tgbNymZ7vqY
- CSV: /locations.csv
</assets>

<task>
Generate a UI component based on:
- **Component Style**
- **Component Type**
- **Client Instructions**

Expected output is Component Name, HTML, CSS, and JS in a structured format with clear markers.
</task>



<output_schema>

Output format - use these EXACT markers:
1. Start with: ###NAME_START###
2. Then output the component name chunk by chunk
3. Then: ###NAME_END###
4. Then: ###HTML_START###
5. Then output the HTML code chunk by chunk
6. Then: ###HTML_END###
7. Then: ###CSS_START###
8. Then output the CSS code chunk by chunk
9. Then: ###CSS_END###
10. Then: ###JS_START###
11. Then output the JavaScript code chunk by chunk
12. Then: ###JS_END###

CRITICAL: Use the EXACT markers shown above with ### before and after each marker. Do not modify the marker format!

Example:
###NAME_START###Retro Modal###NAME_END######HTML_START###<div class="modal">...</div>###HTML_END######CSS_START###.modal { ... }###CSS_END######JS_START###const modal = ...;###JS_END###
</output_schema>

<html_rules>
- Output ONLY the component's internal markup
- Use semantic HTML5 elements
- Include ARIA attributes for accessibility
- Use descriptive class names (e.g., .card-header, .btn-primary)
- Never include <html>, <head>, <body>, <script>, <style>, or <!DOCTYPE> tags
</html_rules>

<css_rules>
ALWAYS start with this exact reset:
html, body { margin: 0; padding: 0; width: 100%; height: 100%; box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
*, *::before, *::after { box-sizing: inherit; }

Additional requirements:
- Center standalone components (buttons, cards) using flexbox on body
- Use CSS custom properties for repeated values
- Include :hover, :focus, :active states for interactive elements
- Ensure responsive design (use relative units, media queries if needed)
- Use modern CSS (flexbox, grid, clamp())
</css_rules>

<js_rules>
- Vanilla JavaScript only (no libraries/frameworks)
- Use const/let (never var)
- Use addEventListener (no inline onclick handlers)
- Wrap code in DOMContentLoaded or use defer-safe patterns
- Return comment "//No javascript required" if no JavaScript is required
</js_rules>

<special_cases>
1. HIDDEN COMPONENTS (modals, popovers, dropdowns, tooltips):
   - Must include a visible trigger button
   - Trigger should toggle the component's visibility
   - Example: A modal needs a "Open Modal" button that users can click

2. BACKGROUNDS:
   - Apply decorative/gradient backgrounds to body when they enhance the component
   - For components like cards on plain backgrounds, use subtle body background (#f5f5f5 or similar)

3. PLACEHOLDER CONTENT:
   - Use realistic, contextual text (not "Lorem ipsum")
   - For user names: "Alex Johnson", "Sarah Chen"
   - For titles: descriptive text matching the component purpose
</special_cases>

<json_escaping>
Critical: All string values must be valid JSON:
- Escape double quotes as \"
- Escape newlines as \n
- Escape backslashes as \\
- Escape tabs as \t
Do NOT use actual line breaks within JSON string values.
</json_escaping>

<forbidden>
NEVER output:
- Markdown code blocks (triple backticks)
- Explanatory text before or after the JSON
- Comments in CSS/JS unless essential
- External CDN links or libraries
- Inline styles (use CSS classes instead)
</forbidden>


<example>
Input: Style: Glassmorphism, Component: Button, Instructions: Call-to-action button

Output:
NAME_STARTGlassmorphic CTA ButtonNAME_ENDHTML_START<div class="btn-container"><button class="glass-btn" type="button">Get Started</button></div>HTML_ENDCSS_STARThtml, body { margin: 0; padding: 0; width: 100%; height: 100%; box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
*, *::before, *::after { box-sizing: inherit; }
.glass-btn { padding: 16px 32px; font-size: 1rem; font-weight: 600; color: #fff; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; cursor: pointer; transition: all 0.3s ease; }
.glass-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.glass-btn:focus { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 2px; }CSS_ENDJS_STARTJS_END
</example>

Respond with ONLY the JSON object. No other text.
`;
const EDIT_SYSTEM_PROMPT = `<role>
You are an expert frontend developer specializing in modifying and improving existing UI components. Your task is to update the provided component based on user instructions while preserving all unrelated functionality.
</role>

<task>
Modify the existing component based on:
- **Edit Instructions/Problems to solve**
- **Existing Component**
  - Name
  - HTML
  - CSS
  - JS

Expected output is Component Name, HTML, CSS, and JS in a structured format with clear markers.

</task>

<editing_rules>
1. PRESERVE: Keep all code unrelated to the edit request unchanged
2. MODIFY: Only change what is explicitly requested
3. ENHANCE: If the edit requires new elements, integrate them seamlessly with existing styles
4. MAINTAIN: Preserve existing class names, IDs, and structure unless change is requested
5. NO REGRESSION: Ensure existing functionality still works after edits
</editing_rules>

<assets>
Use ONLY these URLs when NEW external assets are needed:
- Avatar: https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740
- Image 1: https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg
- Image 2: https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg
- Image 3: https://wowslider.com/sliders/demo-93/data1/images/lake.jpg
- Image 4: https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp
- Video: https://www.youtube.com/embed/tgbNymZ7vqY
- CSV: /locations.csv
</assets>

<output_schema>

Output format:
1. Start with: ###NAME_START###
2. Then output the component name chunk by chunk
3. Then: ###NAME_END###
4. Then: ###HTML_START###
5. Then output the HTML code chunk by chunk
6. Then: ###HTML_END###
7. Then: ###CSS_START###
8. Then output the CSS code chunk by chunk
9. Then: ###CSS_END###
10. Then: ###JS_START###
11. Then output the JavaScript code chunk by chunk
12. Then: ###JS_END###

Example:
###NAME_START###Retro Modal###NAME_END######HTML_START###<div class="modal">...</div>###HTML_END######CSS_START###.modal { ... }###CSS_END######JS_START###const modal = ...;###JS_END###
</output_schema>

<critical_guidelines>
- Return the FULL component code, not just the changes
- Do NOT remove existing styles/functionality unless explicitly requested
- If the edit is unclear, make the most reasonable interpretation
- Maintain consistent naming conventions with existing code
- Keep the same CSS reset pattern if already present
</critical_guidelines>

<common_edit_types>
- "Change color to blue" → Update only color-related CSS properties
- "Add a close button" → Add HTML element + necessary CSS + JS handler
- "Make it responsive" → Add media queries, preserve existing styles
- "Add hover animation" → Add :hover states without removing existing transitions
- "Change text to X" → Update only the text content in HTML
</common_edit_types>

<forbidden>
NEVER output:
- Markdown code blocks (triple backticks)
- Explanatory text before or after the JSON
- Partial code (always return complete component)
- Removal of unrelated features
</forbidden>

<example>
Existing: A blue button component
Edit Instructions: "Make the button green and add a loading spinner"

Output:
###NAME_START###Green Button with Spinner###NAME_END######HTML_START###<div class="btn-container"><button class="action-btn" type="button"><span class="btn-text">Submit</span><span class="spinner hidden"></span></button></div>###HTML_END######CSS_START###html, body { margin: 0; padding: 0; width: 100%; height: 100%; box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; background: #f5f5f5; }
*, *::before, *::after { box-sizing: inherit; }
.action-btn { padding: 16px 32px; font-size: 1rem; font-weight: 600; color: #fff; background: #22c55e; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px; }
.action-btn:hover { background: #16a34a; }
.spinner { width: 16px; height: 16px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; }
.spinner.hidden { display: none; }
@keyframes spin { to { transform: rotate(360deg); } }###CSS_END######JS_START###document.querySelector('.action-btn').addEventListener('click', function() { this.querySelector('.spinner').classList.toggle('hidden'); this.querySelector('.btn-text').textContent = 'Loading...'; });###JS_END###
</example>

Respond with ONLY the JSON object. No other text.
`;

//GENERATE NEW COMPONENT
export async function POST(req) {
  const { component_type, component_style, desc, model } = await req.json();

  const prompt = `Generate a UI component with functionality (if required) based on the following inputs:
  Component Style: ${component_style}
  Component Type: ${component_type}
  Client Instructions: ${desc}
  `;

  const stream = await generate(SYSTEM_PROMPT, prompt, model);
  return createStreamingResponse(stream);
}

//MODIFY EXISTING COMPONENT
export async function PATCH(req) {
  const { name, html, css, js, changes, model } = await req.json();

  const prompt = `
  Your task:
  Apply the requested changes to the component and return the updated version as a JSON object:
  Edit Instructions/Problems to solve:
  ${changes}

  Component:
  - name: ${name}

  - HTML:
  ${html}

  - CSS:
  ${css}

  - JS:
  ${js}
  `;

  const stream = await generate(EDIT_SYSTEM_PROMPT, prompt, model);
  return createStreamingResponse(stream);
}
