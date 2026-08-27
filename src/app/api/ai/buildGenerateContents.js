export function buildNeutralGenerateContext(messages) {
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

  return contents;
}
