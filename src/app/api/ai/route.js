import { NextResponse } from "next/server";
import { generate } from "@/ai/providers/generate";
import { createStreamingResponse } from "@/ai/stream_parser";
import { HTML_SYSTEM_PROMPT, HTML_EDIT_SYSTEM_PROMPT } from "./prompts/html";
import { REACT_SYSTEM_PROMPT, REACT_EDIT_SYSTEM_PROMPT } from "./prompts/react";
const mockResponse = false; // Set to true to use mock response for testing
const chunkSize = 100; // Set the chunk size for the mock stream
const delay = 10; // Set the delay between chunks in milliseconds

const SYSTEM_PROMPTS = {
  HTML: HTML_SYSTEM_PROMPT,
  REACT: REACT_SYSTEM_PROMPT,
};
const EDIT_SYSTEM_PROMPT = {
  HTML: HTML_EDIT_SYSTEM_PROMPT,
  REACT: REACT_EDIT_SYSTEM_PROMPT,
};

//API GENERATE NEW COMPONENT
export async function POST(req) {
  const { componentType, componentStyle, prompt, targetTech, model } =
    await req.json();

  const enrichedPrompt = `Create a production-ready UI component using the following requirements.
  
  Component Type:${componentType}

  Component Style:${componentStyle}

  User Request:${prompt}`;

  //Build contents object with first user prompt
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: enrichedPrompt,
        },
      ],
    },
  ];

  if (mockResponse) {
    const stream = mockStream(mockText, chunkSize, delay); // deliberately awkward chunk size

    return createStreamingResponse(stream);
  } else {
    console.log("RUNNING GEN NEW COMP=====>>>>>>>>>>>>>>>>>>>>>>>");
    const stream = await generate(SYSTEM_PROMPTS[targetTech], contents, model);
    return createStreamingResponse(stream);
  }
}

//API MODIFY EXISTING COMPONENT
export async function PATCH(req) {
  const { name, messages, html, css, js, jsx, targetTech, model } =
    await req.json();
  console.dir(messages, { depth: null });
  console.log("NOW CONTENTS==================>>>>>");
  let contents;

  // if (messages.length < 2) {
  //   const userMessage = {
  //     id: null,
  //     role: "USER",
  //     message: "Manually Created Code",
  //     createdAt: null,
  //   };

  //   messages.push();
  // }
  //Build contents
  switch (targetTech) {
    case "HTML":
      contents = buildContents(
        { name: name, html: html, css: css, js: js },
        messages,
      );
      break;
    case "REACT":
      contents = buildReactContents(
        { name: name, jsx: jsx, css: css },
        messages,
      );
      break;
  }
  // console.log("GEN AI PATCH REACT CONTENTS======>", contents);
  console.dir(contents, { depth: null });
  if (mockResponse) {
    const stream = mockStream(mockText, chunkSize, delay); // deliberately awkward chunk size
    return createStreamingResponse(stream);
  } else {
    console.log("RUNNING GEN EDIT=====>>>>>>>>>>>>>>>>>>>>>>>");
    // console.dir(contents, { depth: null });
    const stream = await generate(
      EDIT_SYSTEM_PROMPT[targetTech],
      contents,
      model,
    );
    return createStreamingResponse(stream);
  }
}
export function buildContents(component, messages) {
  const contents = [];
  //remove last assistant placeholder
  const conversationMessages =
    messages.at(-1)?.role === "ASSISTANT" ? messages.slice(0, -1) : messages;

  if (conversationMessages.length > 1) {
    for (let i = 0; i < conversationMessages.length; i++) {
      const message = conversationMessages[i];

      if (message.role === "USER") {
        contents.push({
          role: "user",
          parts: [{ text: message.message }],
        });
      } else {
        const isLatestCompletedAssistant =
          i === conversationMessages.length - 2;

        contents.push({
          role: "model",
          parts: [
            {
              text:
                message.message +
                (isLatestCompletedAssistant
                  ? `

Current component:

###NAME_START###
${component.name}
###NAME_END###
###HTML_START###
${component.html}
###HTML_END###
###CSS_START###
${component.css}
###CSS_END###
###JS_START###
${component.js}
###JS_END###`
                  : ""),
            },
          ],
        });
      }
    }
  } else {
    contents.push({
      role: "user",
      parts: [
        {
          text: `###MESSAGE_START###${messages[0].message}###MESSAGE_END###
              Component Current State:
              ###NAME_START###
              ${component.name}
              ###NAME_END###
              ###HTML_START###
              ${component.html}
              ###HTML_END###
              ###CSS_START###
              ${component.css}
              ###CSS_END###
              ###JS_START###
              ${component.js}
              ###JS_END###
              `,
        },
      ],
    });
  }

  return contents;
}
export function buildReactContents(component, messages) {
  const contents = [];
  //remove last assistant placeholder
  const conversationMessages =
    messages.at(-1)?.role === "ASSISTANT" ? messages.slice(0, -1) : messages;
  if (conversationMessages.length > 1) {
    for (let i = 0; i < conversationMessages.length; i++) {
      const message = conversationMessages[i];

      if (message.role === "USER") {
        contents.push({
          role: "user",
          parts: [{ text: message.message }],
        });
      } else {
        const isLatestCompletedAssistant =
          i === conversationMessages.length - 2;

        contents.push({
          role: "model",
          parts: [
            {
              text:
                message.message +
                (isLatestCompletedAssistant
                  ? `

Current component:

###NAME_START###
${component.name}
###NAME_END###
###JSX_START###
${component.jsx}
###JSX_END###
###CSS_START###
${component.css}
###CSS_END###`
                  : ""),
            },
          ],
        });
      }
    }
  } else {
    contents.push({
      role: "user",
      parts: [
        {
          text: `###MESSAGE_START###${messages[0].message}###MESSAGE_END###
              Component Current State:
              ###NAME_START###
              ${component.name}
              ###NAME_END###
              ###JSX_START###
              ${component.jsx}
              ###JSX_END###
              ###CSS_START###
              ${component.css}
              ###CSS_END###
              `,
        },
      ],
    });
  }

  return contents;
}
async function* mockStream(text, chunkSize = 1, delay = 50) {
  for (let i = 0; i < text.length; i += chunkSize) {
    await sleep(delay);

    yield {
      text: text.slice(i, i + chunkSize),
    };
  }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
