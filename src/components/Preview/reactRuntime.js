import * as esbuild from "esbuild-wasm";
const importMap = {
  imports: {
    react: "https://esm.sh/react@19",
    "react-dom/client": "https://esm.sh/react-dom@19/client",
    "lucide-react": "https://esm.sh/lucide-react",
    "framer-motion": "https://esm.sh/framer-motion",
  },
};
let esbuildInitPromise = null;

const initializeEsbuild = () => {
  if (!esbuildInitPromise) {
    esbuildInitPromise = esbuild.initialize({
      wasmURL: "/esbuild.wasm",
    });
  }
  return esbuildInitPromise;
};

export async function compileReact(jsx) {
  await initializeEsbuild();
  try {
    const result = await esbuild.transform(jsx, {
      loader: "jsx",
      target: "es2020",
      format: "esm",
      //   globalName: "Component",
    });
    console.log("COMPILED JS:");
    console.log(result.code);
    return result.code;
  } catch (error) {
    console.error("ESBUILD ERROR:", error);
  }
}

export async function buildReactPreviewDocument(component) {
  const compiledJsx = await compileReact(component.jsx);
  const constructedReactDoc = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      ${component.css}
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="importmap">
      ${JSON.stringify(importMap)}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
        import { createElement } from "react";
        import { createRoot } from "react-dom/client";
       
        const componentCode = ${JSON.stringify(compiledJsx)};
        const blob = new Blob(
            [componentCode],
            {type: "text/javascript"}
        );

        const componentUrl = URL.createObjectURL(blob);

        try
        {
            const componentModule = await import(componentUrl);
            const Component = componentModule.default;

            if(!Component)
            {
            throw new Error("React component must have default export.");
            }

            const root = createRoot(
                document.getElementById("root")
            );
            root.render(
                createElement(Component)
            );
        } finally{
            URL.revokeObjectURL(componentUrl);
        }



       
    </script>
  </body>
</html>`;
  return constructedReactDoc;
}
