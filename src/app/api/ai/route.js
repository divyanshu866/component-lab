import { NextResponse } from "next/server";
import { generate } from "@/ai/providers/generate";

export async function POST(req) {
  const { component_type, component_style, desc, model } = await req.json();
  const prompt = `Generate a UI component with functionality (if required) based on the following inputs:

Style: ${component_style}  
Component Type: ${component_type}
Client Instructions: ${desc}

Only for components initially absolutely required to be invisible/hidden (e.g. modals, popover etc.), provide toggle in style to match.
if data such as images etc. are required, use from these assests:
Avatar/Persona: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740';
Sample CSV: '/locations.csv';
Sample image 1:'https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg';
Sample image 2:'https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg';
Sample image 3:'https://wowslider.com/sliders/demo-93/data1/images/lake.jpg';
Sample image 4:'https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp';
Sample video: 'https://www.youtube.com/embed/tgbNymZ7vqY';

Please provide the output in a JSON object with the following fields:

- "name": a short descriptive name of the generated component (string)  
- "html": the HTML markup for the component (string) — **exclude all boilerplate HTML tags like <html>, <head>, <body>, etc.; provide only the component's internal markup**  
- "css": the CSS styling for the component (string) — you may include styles targeting tags like html, body, or global selectors here  
- "js": any JavaScript needed for interactive behavior (string, empty if no JS required)

Ensure the code is clean, well-structured, and ready for direct use in a real-time preview environment.

Example response format:
{
"name": "Glassmorphic Button",
"html": "<button class='glass-button'>Click Me</button>",
"css": "html, body { margin: 0; padding: 0; } .glass-button { ... }",
"js": ""
}

Make sure to set globals like html, body tag height and width to 100%;
Focus on creating visually appealing, accessible, and responsive components following modern best practices.
`;
  const rawResult = await generate(prompt, model);

  console.log("RAW RESULT======>", rawResult);

  // Remove code fences like ```json and ```
  const json = rawResult.replace(/```json|```/g, "").trim();

  return NextResponse.json({ output: json });
}

export async function PATCH(req) {
  const { name, html, css, js, changes, model } = await req.json();
  const prompt = `You are an expert Web developer.

Your task:
Apply the requested changes to the component and return the updated version as a JSON object in the following format:
Component details:
- name: ${name}

- HTML:
${html}

- CSS:
${css}

- JS:
${js}

Description of the required changes/Problems:
${changes}

If data such as images etc. are required, use from these assests:
Avatar/Persona: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740';
Sample CSV: '/locations.csv';
Sample image 1:'https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg';
Sample image 2:'https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg';
Sample image 3:'https://wowslider.com/sliders/demo-93/data1/images/lake.jpg';
Sample image 4:'https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp';
Sample video: 'https://www.youtube.com/embed/tgbNymZ7vqY';

Please provide the output in a JSON object with the following fields:

- "name": a short descriptive name of the generated component (string)  
- "html": the HTML markup for the component (string) — **exclude all boilerplate HTML tags like <html>, <head>, <body>, etc.; provide only the component's internal markup**  
- "css": the CSS styling for the component (string) — you may include styles targeting tags like html, body, or global selectors here  
- "js": any JavaScript needed for interactive behavior (string, empty if no JS required)

Ensure the code is clean, well-structured, and ready for direct use in a real-time preview environment.

Example response format:
{
"name": "Glassmorphic Button",
"html": "<button class='glass-button'>Click Me</button>",
"css": "html, body { margin: 0; padding: 0; } .glass-button { ... }",
"js": ""
}

Make sure to set globals like html, body tag height and width to 100%;
Focus on creating visually appealing, accessible, and responsive components following modern best practices.
`;

  const rawResult = await generate(prompt, model);

  console.log("RAW RESULT======>", rawResult);

  // Remove code fences like ```json and ```
  const json = rawResult.replace(/```json|```/g, "").trim();

  return NextResponse.json({ output: json });
}
