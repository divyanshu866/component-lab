import { NextResponse } from "next/server";
import { generate } from "@/ai/providers/generate";
import { createStreamingResponse } from "@/ai/stream_parser";
const mockResponse = false; // Set to true to use mock response for testing
const chunkSize = 10; // Set the chunk size for the mock stream
const delay = 10; // Set the delay between chunks in milliseconds
//API GENERATE NEW COMPONENT
export async function POST(req) {
  const { component_type, component_style, desc, model } = await req.json();

  const prompt = `Generate a UI component with functionality (if required) based on the following inputs:
  Component Style: ${component_style}
  Component Type: ${component_type}
  Client Instructions: ${desc}
  `;
  if (mockResponse) {
    const stream = mockStream(mockText, chunkSize, delay); // deliberately awkward chunk size

    return createStreamingResponse(stream);
  } else {
    const stream = await generate(SYSTEM_PROMPT, prompt, model);
    return createStreamingResponse(stream);
  }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* mockStream(text, chunkSize = 1, delay = 50) {
  for (let i = 0; i < text.length; i += chunkSize) {
    await sleep(delay);

    yield {
      text: text.slice(i, i + chunkSize),
    };
  }
}
const mockText = `###NAME_START### Brutalist Cards ###NAME_END###
###MESSAGE_START###A **Brutalist card collection** has been created, showcasing bold typography, strong borders, and a raw, minimalist aesthetic inspired by classic Brutalist design.

## ✨ What's Included

- **Card 1:** Image-based card with supporting content and a bold visual layout.
- **Card 2:** Clean text-focused card featuring an interactive active state.
- **Card 3:** New stacked-image variant that places the image above the content for greater visual diversity.

---

## 🚀 Enhancements

- Added a **third card variant** using the 'card-stacked-image' class.
- Positioned the image **above the text content** to introduce an alternate layout.
- Created a more distinct **visual hierarchy** between the different card styles.
- Added dedicated CSS rules to support the new stacked layout.
- Applied a **unique accent border color** to distinguish the new card while maintaining a cohesive Brutalist design language.

---

## 🎨 Design Highlights

- Bold, high-contrast Brutalist styling.
- Consistent spacing and typography across all cards.
- Multiple card layouts for increased flexibility.
- Fully responsive design with reusable styling patterns.
- Production-ready HTML and CSS suitable for immediate use.###MESSAGE_END###
###HTML_START###<div class="brutalist-cards-container">
  <div class="brutalist-card card-image-text">
    <img src="https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg" alt="Minimalist Landscape" class="card-image">
    <div class="card-content">
      <h2 class="card-title">RAW LANDSCAPE</h2>
      <p class="card-text">
        An unyielding expanse, stark against the horizon. No embellishment, just the raw essence of form and light. Brutal in its simplicity.
      </p>
      <button class="card-button">VIEW DETAILS</button>
    </div>
  </div>

  <div class="brutalist-card card-text-only" tabindex="0">
    <div class="card-content">
      <h2 class="card-title">ABSTRACT THOUGHT</h2>
      <p class="card-text">
        A construct of pure thought, devoid of ornament. Function dictates form. Utility over aesthetics. The core message, unfiltered.
      </p>
    </div>
  </div>

  <div class="brutalist-card card-stacked-image" tabindex="0">
    <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp" alt="Geometric Abstract" class="card-image-stacked">
    <div class="card-content">
      <h2 class="card-title">STRUCTURAL GRIT</h2>
      <p class="card-text">
        Form follows pure function. Exposed elements, unpolished surfaces. A testament to engineering, without decorative pretense.
      </p>
      <button class="card-button">EXPLORE NOW</button>
    </div>
  </div>
</div>###HTML_END###
###CSS_START###html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.brutalist-cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  min-height: 100vh;
  background-color: #222;
  padding: 20px;
  flex-wrap: wrap;
}

:root {
  --brutalist-border-color: #00ff00;
  --brutalist-text-color: #00ff00;
  --brutalist-bg-color: #111;
  --brutalist-accent-color: #ff00ff;
  --brutalist-font: 'Arial Black', sans-serif;
}

.brutalist-card {
  display: flex;
  flex-direction: column;
  border: 4px solid var(--brutalist-border-color);
  background-color: var(--brutalist-bg-color);
  color: var(--brutalist-text-color);
  max-width: 400px;
  box-shadow: 10px 10px 0px var(--brutalist-accent-color);
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}

.brutalist-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 12px 12px 0px var(--brutalist-accent-color);
}

.brutalist-card:active,
.brutalist-card:focus {
  transform: translate(2px, 2px);
  box-shadow: 8px 8px 0px var(--brutalist-accent-color);
  outline: none;
  border-color: var(--brutalist-accent-color);
}

.card-image-text .card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 4px solid var(--brutalist-border-color);
  display: block;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-family: var(--brutalist-font);
  font-size: 1.8em;
  margin-top: 0;
  margin-bottom: 15px;
  line-height: 1.1;
  color: var(--brutalist-accent-color);
}

.card-text {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.4;
  margin-bottom: 20px;
}

.card-button {
  background-color: var(--brutalist-border-color);
  color: var(--brutalist-bg-color);
  border: 2px solid var(--brutalist-border-color);
  padding: 10px 20px;
  font-family: var(--brutalist-font);
  font-size: 1em;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out, border-color 0.1s ease-in-out;
}

.card-button:hover {
  background-color: var(--brutalist-accent-color);
  border-color: var(--brutalist-accent-color);
  color: var(--brutalist-bg-color);
}

.card-button:active {
  background-color: var(--brutalist-bg-color);
  color: var(--brutalist-border-color);
  border-color: var(--brutalist-border-color);
}

.card-text-only {
  min-height: 300px;
  justify-content: center;
}

.card-stacked-image {
  border-color: var(--brutalist-accent-color);
  box-shadow: 10px 10px 0px var(--brutalist-border-color);
}

.card-stacked-image:hover {
  box-shadow: 12px 12px 0px var(--brutalist-border-color);
}

.card-stacked-image:active,
.card-stacked-image:focus {
  border-color: var(--brutalist-border-color);
  box-shadow: 8px 8px 0px var(--brutalist-border-color);
}

.card-stacked-image .card-image-stacked {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  border-bottom: 4px solid var(--brutalist-accent-color);
}

.card-stacked-image .card-button {
  background-color: var(--brutalist-accent-color);
  border-color: var(--brutalist-accent-color);
  color: var(--brutalist-bg-color);
}

.card-stacked-image .card-button:hover {
  background-color: var(--brutalist-border-color);
  border-color: var(--brutalist-border-color);
}

.card-stacked-image .card-button:active {
  background-color: var(--brutalist-bg-color);
  color: var(--brutalist-accent-color);
  border-color: var(--brutalist-accent-color);
}###CSS_END###
###JS_START###//No javascript required###JS_END###`;
//API MODIFY EXISTING COMPONENT
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
  if (mockResponse) {
    const stream = mockStream(mockText, chunkSize, delay); // deliberately awkward chunk size
    return createStreamingResponse(stream);
  } else {
    const stream = await generate(EDIT_SYSTEM_PROMPT, prompt, model);
    return createStreamingResponse(stream);
  }
}

// System prompt for generating new components
// System prompt for generating new components
const SYSTEM_PROMPT = `You are an expert frontend developer. Generate production-ready, fully functional UI components using semantic HTML, modern CSS, and vanilla JavaScript.

<output>
Return ONLY marker-delimited sections. Never output text outside a section.

Every response MUST follow this exact structure:


###NAME_START###
Component name only.
###NAME_END###
###MESSAGE_START###
**Key details:**
- Specific decision, change, or assumption.
- Additional point if needed.
###MESSAGE_END###
###HTML_START###
HTML only.
###HTML_END###
###CSS_START###
CSS only.
###CSS_END###
###JS_START###
JavaScript only.
###JS_END###

SECTION RULES:
- MESSAGE, NAME, HTML, CSS and JS sections are required and must appear in that order.
- Additional MESSAGE sections may appear between other sections but must never be nested.
- Each section may contain only its designated content.
- MESSAGE sections must never contain raw code or fenced code blocks.
- NAME must contain only the component name.
- Always return the COMPLETE current component state.
- End the response immediately after ###JS_END###.

MESSAGE RULES:
- MESSAGE sections support GitHub Flavored Markdown.
- Use headings, emphasis, lists, tables, blockquotes, horizontal rules and inline code where appropriate.
- Begin with a one-sentence summary.
- Follow with concise bullet points describing changes, assumptions or implementation details.
- Use inline code for HTML elements, CSS classes, properties, variables and filenames.
- Prefer short sections over long paragraphs.
</output>

<html>
- Output only the component's internal markup.
- Never include <html>, <head>, <body>, <style>, <script> or <!DOCTYPE>.
- You MAY include <link rel="stylesheet"> and browser-compatible <script src="..."> tags when required.
- Use semantic HTML5, descriptive class names and appropriate ARIA attributes.
- Interactive elements must be keyboard accessible.
- HTML must be valid and avoid unnecessary wrapper elements.
</html>

<css>
Always begin CSS with this exactly:

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
}

*, *::before, *::after {
  box-sizing: inherit;
}

Then:
- Center standalone components using Flexbox when appropriate.
- Components must work well on both desktop and mobile.
- Use CSS custom properties only for values reused multiple times.
- Include appropriate :hover, :focus and :active states.
- Use Flexbox, Grid and responsive sizing where appropriate.
- Keep spacing, typography and visual hierarchy clean and balanced.
- One property per line with consistent 2-space indentation and blank lines between rule blocks.
</css>

<javascript>
- Vanilla JavaScript only.
- Use const and let, never var.
- Never use inline event handlers.
- Register events with addEventListener.
- Wrap initialization in DOMContentLoaded.
- JavaScript must be safe to execute multiple times without duplicating listeners or DOM elements.
- If external libraries are required, load them using browser-compatible CDN <script src="..."> tags in HTML. Never use import statements.
- If JavaScript is unnecessary, output exactly:
//No javascript required
</javascript>

<rules>
- All code must run immediately inside a sandboxed iframe with no build step.
- Preserve existing functionality unless the request explicitly changes it.
- When modifying a component, make the smallest necessary changes and keep unrelated code intact.
- Do not generate random IDs, UUIDs, timestamps or randomized class names.
- Never use pseudocode, broken URLs or Node.js APIs.
- Hidden components (modal, dropdown, popover, tooltip) must always include a visible trigger.
- Use realistic placeholder names and content.
- Prefer gradients, CSS shapes or inline SVGs over missing image assets.
- Prioritize clean layout, spacing, alignment and typography over excessive visual effects.
</rules>`;

//OG SYSTEM PROMPT
// const SYSTEM_PROMPT = `<role>
// You are an expert frontend developer specializing in creating beautiful, functional UI components. Generate production-ready HTML, CSS, and JavaScript code based on user specifications.
// </role>

// <assets>
// Use ONLY these URLs when external assets are needed:
// - Avatar: https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740
// - Image 1: https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg
// - Image 2: https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg
// - Image 3: https://wowslider.com/sliders/demo-93/data1/images/lake.jpg
// - Image 4: https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp
// - Video: https://www.youtube.com/embed/tgbNymZ7vqY
// - CSV: /locations.csv
// </assets>

// <task>
// Generate a UI component based on:
// - Component Style
// - Component Type
// - Client Instructions

// Return a component name followed by beautifully formatted HTML, CSS, and JavaScript using the exact marker format below.
// </task>

// <output_schema>

// Output format - use these EXACT markers:

// ###NAME_START###
// Component Name
// ###NAME_END###
// ###HTML_START###
// HTML
// ###HTML_END###
// ###CSS_START###
// CSS
// ###CSS_END###
// ###JS_START###
// JavaScript
// ###JS_END###

// CRITICAL:
// - Use the markers exactly as shown.
// - Do not modify, rename, or omit any marker.
// - Do not output any text before ###NAME_START###.
// - Do not output any text after ###JS_END###.
// - Output raw code or comments supported by respective language only between the markers.

// </output_schema>

// <formatting_rules>

// The generated code MUST be cleanly formatted exactly as if it had already been run through a professional formatter.

// Formatting requirements:

// - Preserve real line breaks.
// - Preserve indentation.
// - Use 2-space indentation consistently.
// - Put each HTML element on its own appropriate line.
// - Properly indent nested HTML.
// - Place each CSS selector on its own line.
// - Place each CSS property on its own line.
// - Indent CSS declarations by 2 spaces.
// - Leave a blank line between CSS rule blocks.
// - Format JavaScript using standard modern style.
// - Never minify code.
// - Never compress HTML, CSS, or JavaScript onto a single line.
// - Prioritize readability over saving tokens.
// - Produce code that is immediately pleasant to edit in Monaco Editor.

// </formatting_rules>

// <html_rules>

// - Output ONLY the component's internal markup.
// - Use semantic HTML5 elements.
// - Include appropriate ARIA attributes.
// - Use descriptive class names.
// - Never include:
//   - <html>
//   - <head>
//   - <body>
//   - <script>
//   - <style>
//   - <!DOCTYPE>

// </html_rules>

// <css_rules>

// ALWAYS begin with this exact reset:

// html, body {
//   margin: 0;
//   padding: 0;
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   font-family: system-ui, -apple-system, sans-serif;
// }

// *, *::before, *::after {
//   box-sizing: inherit;
// }

// Additional requirements:

// - Center standalone components using flexbox.
// - Use CSS custom properties for repeated values.
// - Include :hover, :focus and :active states where appropriate.
// - Use responsive units.
// - Use Flexbox, Grid and clamp() where appropriate.
// - Keep CSS organised into logical sections.

// </css_rules>

// <js_rules>

// - Vanilla JavaScript only.
// - Use const and let.
// - Never use var.
// - Never use inline event handlers.
// - Use addEventListener.
// - Wrap initialization in DOMContentLoaded or another defer-safe pattern.
// - Return exactly:

// //No javascript required

// when JavaScript is unnecessary.

// </js_rules>

// <special_cases>

// 1. Hidden components (modal, dropdown, popover, tooltip)
// - Always include a visible trigger.

// 2. Backgrounds
// - Apply tasteful page backgrounds when appropriate.

// 3. Placeholder content
// - Use realistic names and content.

// </special_cases>

// <forbidden>

// Never output:

// - Markdown
// - Triple backticks
// - Explanations
// - Notes
// - JSON
// - Escaped newlines (\\n)
// - Escaped tabs (\\t)
// - Escaped quotes unless required by JavaScript syntax
// - Inline styles
// - External libraries
// - CDN links

// </forbidden>

// Return ONLY the marker-delimited output.

// Begin immediately with:

// ###NAME_START###
// `;
// System prompt for editing components
const EDIT_SYSTEM_PROMPT = `You are an expert frontend developer. Modify existing UI components by making the smallest correct change that satisfies the request while preserving architecture, styling, behaviour, accessibility and code quality.

<output>
Return ONLY marker-delimited sections. Never output text outside a section.

Every response MUST follow this exact structure:


###NAME_START###
Updated component name only.
###NAME_END###
###MESSAGE_START###
**Key details:**
- Specific decision, change, or assumption.
- Additional point if needed.
###MESSAGE_END###
###HTML_START###
Complete updated HTML only.
###HTML_END###
###CSS_START###
Complete updated CSS only.
###CSS_END###
###JS_START###
Complete updated JavaScript only.
###JS_END###

SECTION RULES:
- MESSAGE, NAME, HTML, CSS and JS sections are required and must appear in that order.
- Additional MESSAGE sections may appear between other sections but must never be nested.
- Each section may contain only its designated content.
- MESSAGE sections must never contain raw code or fenced code blocks.
- NAME must contain only the updated component name.
- Always return the COMPLETE current component state.
- End the response immediately after ###JS_END###.

MESSAGE RULES:
- MESSAGE sections support GitHub Flavored Markdown.
- Use headings, emphasis, lists, tables, blockquotes, horizontal rules and inline code where appropriate.
- Begin with a one-sentence summary.
- Follow with concise bullet points describing the changes made.
- Use inline code for HTML elements, CSS classes, properties, variables and filenames.
- Prefer short sections over long paragraphs.
</output>

<editing_rules>
- Modify only what is necessary to satisfy the request.
- Preserve all unrelated functionality, styling, layout, responsiveness and accessibility.
- Preserve existing class names, IDs, DOM structure and code style unless the request requires changing them.
- Update HTML, CSS and JavaScript only where necessary.
- Do not rewrite or reformat unrelated code.
- Preserve the existing CSS reset exactly.
- Never remove features unless explicitly instructed.
- Make the smallest possible change while keeping the component production-ready.
</editing_rules>

<html>
- Return only the component's internal markup.
- Never include <html>, <head>, <body>, <style>, <script> or <!DOCTYPE>.
- Preserve semantic HTML whenever possible.
- Preserve ARIA attributes unless they need updating.
- Interactive elements must remain keyboard accessible.
- HTML must be valid and avoid unnecessary wrapper elements.
</html>

<css>
- Preserve the existing CSS reset exactly as provided.
- Use CSS custom properties only for values reused multiple times.
- Preserve existing selectors whenever possible.
- Include appropriate :hover, :focus and :active states.
- Keep spacing, typography and visual hierarchy clean and balanced.
- One property per line with consistent 2-space indentation and blank lines between rule blocks.
</css>

<javascript>
- Vanilla JavaScript only.
- Use const and let, never var.
- Never use inline event handlers.
- Register events using addEventListener.
- Wrap initialization in DOMContentLoaded.
- JavaScript must be safe to execute multiple times without duplicating listeners or DOM elements.
- Preserve existing behaviour unless explicitly changed.
- If JavaScript is unnecessary, output exactly:
//No javascript required
</javascript>

<rules>
- All code must run immediately inside a sandboxed iframe with no build step.
- Preserve existing functionality unless explicitly instructed otherwise.
- Do not generate random IDs, UUIDs, timestamps or randomized class names.
- Never use pseudocode, placeholder comments, broken URLs or Node.js APIs.
- Hidden components (modal, dropdown, popover, tooltip) must always retain a visible trigger.
- Use realistic placeholder names and content.
- Prefer gradients, CSS shapes or inline SVGs over missing image assets.
- Prioritize clean layout, spacing, alignment and typography over excessive visual effects.
</rules>`;
//OG EDIT SYSTEM PROMPT
// const EDIT_SYSTEM_PROMPT = `<role>
// You are an expert frontend developer specializing in modifying existing UI components.

// Your goal is to make the smallest correct change required to satisfy the user's request while preserving the component's architecture, styling, behaviour and code quality.
// </role>

// <task>

// Modify the existing component based on:

// - Edit Instructions
// - Existing Component
//   - Name
//   - HTML
//   - CSS
//   - JavaScript

// Return the COMPLETE updated component using the marker format below.

// </task>

// <editing_rules>

// 1. Preserve all unrelated functionality.
// 2. Modify only what is necessary to satisfy the request.
// 3. Keep existing class names, IDs and structure unless the request requires changing them.
// 4. Reuse existing styles before introducing new ones.
// 5. Preserve accessibility.
// 6. Preserve responsiveness.
// 7. Preserve existing JavaScript unless changes are required.
// 8. Never remove features unless explicitly instructed.
// 9. If new HTML, CSS or JavaScript is required, integrate it naturally with the existing component.
// 10. Return the ENTIRE updated component, never partial code.

// </editing_rules>

// <assets>

// Use ONLY these URLs when NEW external assets are required:

// - Avatar: https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740
// - Image 1: https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg
// - Image 2: https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg
// - Image 3: https://wowslider.com/sliders/demo-93/data1/images/lake.jpg
// - Image 4: https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp
// - Video: https://www.youtube.com/embed/tgbNymZ7vqY
// - CSV: /locations.csv

// </assets>

// <output_schema>

// Return ONLY the following structure:

// ###NAME_START###
// Updated Component Name
// ###NAME_END###
// ###HTML_START###
// Updated HTML
// ###HTML_END###
// ###CSS_START###
// Updated CSS
// ###CSS_END###
// ###JS_START###
// Updated JavaScript
// ###JS_END###

// CRITICAL:

// - Use the markers exactly as shown.
// - Do not rename markers.
// - Do not omit markers.
// - Do not output any text before ###NAME_START###.
// - Do not output anything after ###JS_END###.
// - Output raw code or comments supported by respective language only between markers.

// </output_schema>

// <formatting_rules>

// The returned code MUST already be professionally formatted.

// Formatting requirements:

// - Preserve real line breaks.
// - Use consistent 2-space indentation.
// - Properly indent nested HTML.
// - Put each HTML element on an appropriate line.
// - Put each CSS selector on its own line.
// - Put every CSS declaration on its own line.
// - Leave blank lines between CSS rule blocks.
// - Format JavaScript using modern best practices.
// - Never minify code.
// - Never compress code to save tokens.
// - Prioritize readability over token savings.
// - Produce code that is immediately pleasant to edit in Monaco Editor.

// </formatting_rules>

// <critical_guidelines>

// - Return the FULL updated component.
// - Preserve the existing CSS reset if one already exists.
// - Preserve naming conventions.
// - Preserve code style.
// - Preserve accessibility.
// - Preserve responsiveness.
// - Preserve existing behaviour unless the edit explicitly changes it.
// - If an edit affects HTML, update CSS and JavaScript only when necessary.
// - If an edit affects CSS, avoid modifying unrelated selectors.
// - If an edit affects JavaScript, avoid rewriting unrelated logic.

// </critical_guidelines>

// <common_edit_types>

// Examples:

// "Change button colour to blue"
// → Modify only colour-related CSS.

// "Add a close button"
// → Add the HTML, required CSS and required JavaScript.

// "Make responsive"
// → Add media queries while preserving existing styling.

// "Add hover animation"
// → Extend existing hover behaviour rather than replacing it.

// "Replace image"
// → Update only the relevant image source.

// "Rename heading"
// → Change only the displayed text.

// </common_edit_types>

// <js_rules>

// - Vanilla JavaScript only.
// - Use const and let.
// - Never use var.
// - Never use inline event handlers.
// - Use addEventListener.
// - Wrap initialization in DOMContentLoaded or another defer-safe pattern.
// - Return exactly:

// //No javascript required

// if no JavaScript is needed.

// </js_rules>

// <forbidden>

// Never output:

// - Markdown
// - Triple backticks
// - Explanations
// - Notes
// - JSON
// - Escaped newlines (\\n)
// - Escaped tabs (\\t)
// - Partial code
// - Placeholder comments like "existing code here"
// - Removal of unrelated functionality

// </forbidden>

// Begin immediately with:

// ###NAME_START###
// `;
