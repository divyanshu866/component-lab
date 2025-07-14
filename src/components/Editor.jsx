"use client";
import Preview from "@/components/Preview";
import ComponentEditor from "@/components/ComponentEditor";

import { useEffect, useRef, useState } from "react";
import { Code, FileText, Palette } from "lucide-react";

const Editor = ({ showConsole, setShowConsole }) => {
  const [css, setCss] = useState(`.btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.25);
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
}

.btn:active {
  transform: scale(0.97);
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.2);
}
`);
  const [html, setHtml] = useState(
    `<button onclick="handleclick()" class="btn">test</button>`
  );
  const [js, setJs] = useState(`function handleclick() {
  console.log("clicked");
}
`);

  const [code, setCode] = useState("");

  useEffect(() => {
    console.log("html");

    const finalHtml = `
 <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #f8fafc;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              // Override console methods to send messages to parent
              const originalLog = console.log;
              const originalError = console.error;
              const originalWarn = console.warn;
              
              console.log = function(...args) {
                window.parent.postMessage({
                  type: 'console',
                  level: 'log',
                  message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
                }, '*');
                originalLog.apply(console, args);
              };
              
              console.error = function(...args) {
                window.parent.postMessage({
                  type: 'console',
                  level: 'error',
                  message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
                }, '*');
                originalError.apply(console, args);
              };
              
              console.warn = function(...args) {
                window.parent.postMessage({
                  type: 'console',
                  level: 'warn',
                  message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
                }, '*');
                originalWarn.apply(console, args);
              };
              
              // Catch unhandled errors
              window.addEventListener('error', function(e) {
                console.error('Error:', e.message, 'at', e.filename + ':' + e.lineno);
              });
              
              try {
                ${js}
              } catch (e) {
                console.error('JavaScript error:', e.message);
              }
            </script>
          </body>
        </html>
`;

    setCode(finalHtml);
    console.log(finalHtml);
  }, [html, css, js]);

  return (
    <div className="flex flex-1 h-0 overflow-hidden">
      <div className="flex w-[50%] overflow-hidden">
        {/* Left Panel: Editors */}
        <div className="flex flex-col flex-1/2 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-2 flex items-center bg-gray-800 gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              <span className="flex items-center text-sm">HTML</span>
            </div>
            <div className="flex-1 h-0">
              <ComponentEditor
                code={html}
                onChange={(val) => setHtml(val || "")}
                language="html"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-2 flex items-center bg-gray-800 gap-2">
              <Palette className="w-4 h-4 text-blue-500" />
              <span className="flex items-center text-sm">CSS</span>
            </div>
            <div className="flex-1 h-0">
              <ComponentEditor
                code={css}
                onChange={(val) => setCss(val || "")}
                language="css"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-2 flex items-center bg-gray-800 gap-2">
              <Code className="w-4 h-4 text-yellow-500" />
              <span className="flex items-center text-sm">JavaScript</span>
            </div>
            <div className="flex-1 h-0">
              <ComponentEditor
                code={js}
                onChange={(val) => setJs(val || "")}
                language="javascript"
              />
            </div>
          </div>
        </div>
      </div>

      {/*preview window  */}
      <Preview finalHtml={code} />
    </div>
  );
};

export default Editor;
