import * as esbuild from "esbuild-wasm";
const SUPPORTED_REACT_DEPENDENCIES = {
  exact: {
    // React
    react: "https://esm.sh/react@19",

    // Icons
    "lucide-react": "https://esm.sh/lucide-react",

    // Animation
    "framer-motion": "https://esm.sh/framer-motion",
    motion: "https://esm.sh/motion",

    // Charts / data visualization
    recharts: "https://esm.sh/recharts",
    "react-chartjs-2": "https://esm.sh/react-chartjs-2",
    "chart.js": "https://esm.sh/chart.js",

    // Dates
    "date-fns": "https://esm.sh/date-fns",
    dayjs: "https://esm.sh/dayjs",

    // Forms / validation
    "react-hook-form": "https://esm.sh/react-hook-form",
    zod: "https://esm.sh/zod",

    // HTTP / data
    axios: "https://esm.sh/axios",

    // Markdown
    "react-markdown": "https://esm.sh/react-markdown",

    // Utilities
    clsx: "https://esm.sh/clsx",
    "tailwind-merge": "https://esm.sh/tailwind-merge",

    // UI primitives
    "@radix-ui/react-dialog":
      "https://esm.sh/@radix-ui/react-dialog?external=react",
    "@radix-ui/react-dropdown-menu":
      "https://esm.sh/@radix-ui/react-dropdown-menu?external=react",
    "@radix-ui/react-tabs":
      "https://esm.sh/@radix-ui/react-tabs?external=react",
    "@radix-ui/react-tooltip":
      "https://esm.sh/@radix-ui/react-tooltip?external=react",
    "@radix-ui/react-popover":
      "https://esm.sh/@radix-ui/react-popover?external=react",
    "@radix-ui/react-select":
      "https://esm.sh/@radix-ui/react-select?external=react",
    "@radix-ui/react-checkbox":
      "https://esm.sh/@radix-ui/react-checkbox?external=react",
    "@radix-ui/react-switch":
      "https://esm.sh/@radix-ui/react-switch?external=react",

    // Notifications
    sonner: "https://esm.sh/sonner?external=react",

    // Drag & drop
    "@dnd-kit/core": "https://esm.sh/@dnd-kit/core",
    "@dnd-kit/sortable": "https://esm.sh/@dnd-kit/sortable",

    //TIER 2
    // Core
    react: "https://esm.sh/react@19",

    // Icons / animation
    "lucide-react": "https://esm.sh/lucide-react",
    "framer-motion": "https://esm.sh/framer-motion",

    // Data / server state
    "@tanstack/react-query": "https://esm.sh/@tanstack/react-query",

    // Routing
    "react-router": "https://esm.sh/react-router",

    // Layout / interaction
    "react-resizable-panels": "https://esm.sh/react-resizable-panels",
    "react-intersection-observer": "https://esm.sh/react-intersection-observer",
    "react-use": "https://esm.sh/react-use",
    "embla-carousel-react":
      "https://esm.sh/embla-carousel-react?external=react",
    "react-dropzone": "https://esm.sh/react-dropzone",

    "react-colorful": "https://esm.sh/react-colorful",
    "react-hotkeys-hook": "https://esm.sh/react-hotkeys-hook",
    cmdk: "https://esm.sh/cmdk?external=react",
    vaul: "https://esm.sh/vaul?external=react",
    "input-otp": "https://esm.sh/input-otp?external=react",
  },
  prefixes: {
    // Icons
    "@heroicons/react/": "https://esm.sh/@heroicons/react/",
    // Carousels
    "swiper/": "https://esm.sh/swiper/",
    "@daypicker/": "https://esm.sh/@daypicker/",
  },
};
const RUNTIME_DEPENDENCIES = {
  "react-dom/client": "https://esm.sh/react-dom@19/client",
  "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime",
};

// Import map shape
// const IMPORT_MAP = {
//   imports: {
//     react: "https://esm.sh/react@19",
//     "react-dom/client": "https://esm.sh/react-dom@19/client",
//     "lucide-react": "https://esm.sh/lucide-react",
//     "framer-motion": "https://esm.sh/framer-motion",
//   },
// };
let esbuildInitPromise = null;

const initializeEsbuild = () => {
  if (!esbuildInitPromise) {
    esbuildInitPromise = esbuild.initialize({
      wasmURL: "/esbuild.wasm",
    });
  }
  return esbuildInitPromise;
};
function extractImportSpecifiers(jsx) {
  const specifiers = new Set();
  const importRegex =
    /(?:import\s+(?:[\s\S]*?\s+from\s+)?|import\s*\()\s*["']([^"']+)["']/g;
  let match;
  while ((match = importRegex.exec(jsx)) !== null) {
    specifiers.add(match[1]);
  }
  return [...specifiers];
}
function isBarePackageSpecifier(specifier) {
  return !(
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("http://") ||
    specifier.startsWith("https://")
  );
}

function extractPackageImports(jsx) {
  return extractImportSpecifiers(jsx).filter(isBarePackageSpecifier);
}
function resolveDependency(specifier) {
  const exact = SUPPORTED_REACT_DEPENDENCIES.exact[specifier];
  if (exact) {
    return exact;
  }

  for (const [prefix, baseUrl] of Object.entries(
    SUPPORTED_REACT_DEPENDENCIES.prefixes,
  )) {
    if (specifier.startsWith(prefix)) {
      const subpath = specifier.slice(prefix.length);
      return `${baseUrl}${subpath}`;
    }
  }
  return null;
}
function buildImportMap(jsx) {
  const imports = { ...RUNTIME_DEPENDENCIES };

  const packageImports = extractPackageImports(jsx);

  for (const specifier of packageImports) {
    const url = resolveDependency(specifier);

    if (!url) {
      throw new Error(`Unsupported dependency: "${specifier}".`);
    }
    imports[specifier] = url;
  }
  return { imports: imports };
}
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
  const importMap = buildImportMap(component.jsx);
  console.log("ImportMap==============>>>>>>", importMap);

  const document = `
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
  return document;
}
