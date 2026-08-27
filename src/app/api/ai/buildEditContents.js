export function buildNeutralEditContext(request) {
  const messages = request.messages;
  const component = request.component;
  const targetTech = request.targetTech;
  let currentComponentState = "";

  const contents = [];
  //remove last assistant placeholder
  const conversationMessages =
    messages.at(-1)?.role === "ASSISTANT" ? messages.slice(0, -1) : messages;

  conversationMessages.forEach((message) => {
    contents.push({
      role: message.role,
      text: message.message,
    });
  });

  switch (targetTech) {
    case "HTML":
      currentComponentState = buildComponentStateBundle(component);
      break;
    case "REACT":
      currentComponentState = buildComponentStateReact(component);
  }

  // The trailing assistant placeholder is removed above,
  // so the last conversation message is the current user request.
  contents[contents.length - 1].text =
    contents[contents.length - 1].text + currentComponentState;
  return contents;
}
function buildComponentStateBundle(component) {
  const componentState = `
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
###JS_END###`;
  return componentState;
}
function buildComponentStateReact(component) {
  const componentState = `
Current component:

###NAME_START###
${component.name}
###NAME_END###
###JSX_START###
${component.jsx}
###JSX_END###
###CSS_START###
${component.css}
###CSS_END###`;
  return componentState;
}

export function toGeminiContext(context) {
  return context.map((message) => ({
    role: message.role === "ASSISTANT" ? "model" : "user",
    parts: [{ text: message.text }],
  }));
}
export function toOpenAIContext(context) {
  return context.map((message) => ({
    role: message.role === "ASSISTANT" ? "assistant" : "user",
    content: message.text,
  }));
}
export function buildBundleEditGeminiContents(request) {
  const messages = request.messages;
  const component = request.component;
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
export function buildReactEditGeminiContents(request) {
  const messages = request.messages;
  const component = request.component;
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
