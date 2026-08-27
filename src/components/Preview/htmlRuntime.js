export async function buildHtmlPreviewDocument(component) {
  const boilerCss = /*css*/ `
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100vh;
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    img {
      max-width: 400px;
      max-height: 400px;
      height: 100%;
      width: 100%;
    }
  `;
  const constructedHtmlDocument = /*html*/ `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Component Preview</title>
        <style>
          ${component.css ? "" : boilerCss}

            ${component.css}
        </style>
      </head>
      <body>
        ${
          !component.html && !component.css && !component.js
            ? ' <img src="/newlogo.svg" alt="Logo"/>'
            : component.html
        }
        <script>
          // Override console methods to send messages to parent
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;
          console.log = function (...args) {
            window.parent.postMessage(
              {
                type: "console",
                level: "log",
                message: args
                  .map((arg) =>
                    typeof arg === "object"
                      ? JSON.stringify(arg, null, 2)
                      : String(arg),
                  )
                  .join(" "),
              },
              "*",
            );
            originalLog.apply(console, args);
          };
          console.error = function (...args) {
            window.parent.postMessage(
              {
                type: "console",
                level: "error",
                message: args
                  .map((arg) =>
                    typeof arg === "object"
                      ? JSON.stringify(arg, null, 2)
                      : String(arg),
                  )
                  .join(" "),
              },
              "*",
            );
            originalError.apply(console, args);
          };
          console.warn = function (...args) {
            window.parent.postMessage(
              {
                type: "console",
                level: "warn",
                message: args
                  .map((arg) =>
                    typeof arg === "object"
                      ? JSON.stringify(arg, null, 2)
                      : String(arg),
                  )
                  .join(" "),
              },
              "*",
            );
            originalWarn.apply(console, args);
          };
          // Catch unhandled errors
          window.addEventListener("error", function (e) {
            console.error(
              "Error:",
              e.message,
              "at",
              e.filename + ":" + e.lineno,
            );
          });
          document.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Link clicked:", link.href);
            });
          });
          try {
            ${component.js};
          } catch (e) {
            console.error("JavaScript error:", e.message);
          }
        </script>
      </body>
    </html>
  `;
  return constructedHtmlDocument;
}
