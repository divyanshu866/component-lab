export function serializeConsoleValue(value, seen = new WeakSet()) {
  if (value === null) {
    return {
      type: "null",
      value: null,
      preview: "null",
    };
  }

  if (value === undefined) {
    return {
      type: "undefined",
      value: null,
      preview: "undefined",
    };
  }

  if (typeof value === "string") {
    return {
      type: "string",
      value,
      preview: value,
    };
  }

  if (typeof value === "number") {
    return {
      type: "number",
      value,
      preview: String(value),
    };
  }

  if (typeof value === "boolean") {
    return {
      type: "boolean",
      value,
      preview: String(value),
    };
  }

  if (typeof value === "bigint") {
    return {
      type: "bigint",
      value: null,
      preview: `${value}n`,
    };
  }

  if (typeof value === "function") {
    return {
      type: "function",
      value: null,
      preview: value.name ? `ƒ ${value.name}()` : "ƒ ()",
    };
  }

  if (value instanceof Error) {
    return {
      type: "error",
      value: {
        name: value.name,
        message: value.message,
        stack: value.stack ?? null,
      },
      preview: `${value.name}: ${value.message}`,
    };
  }

  if (typeof Node !== "undefined" && value instanceof Node) {
    return {
      type: "dom-node",
      value: null,
      preview: value.outerHTML ?? value.nodeName,
    };
  }

  if (typeof value === "object") {
    if (seen.has(value)) {
      return {
        type: "circular",
        value: null,
        preview: "[Circular]",
      };
    }

    seen.add(value);

    if (value instanceof Date) {
      return {
        type: "date",
        value: value.toISOString(),
        preview: value.toISOString(),
      };
    }

    if (value instanceof RegExp) {
      return {
        type: "regexp",
        value: value.toString(),
        preview: value.toString(),
      };
    }

    if (value instanceof Map) {
      return {
        type: "map",
        value: [...value.entries()].map(([key, mapValue]) => [
          serializeConsoleValue(key, seen),
          serializeConsoleValue(mapValue, seen),
        ]),
        preview: `Map(${value.size})`,
      };
    }

    if (value instanceof Set) {
      return {
        type: "set",
        value: [...value].map((item) => serializeConsoleValue(item, seen)),
        preview: `Set(${value.size})`,
      };
    }

    const serialized = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      serialized[key] = serializeConsoleValue(nestedValue, seen);
    }

    return {
      type: "object",
      value: serialized,
      preview: "[Object]",
    };
  }

  return {
    type: typeof value,
    value: null,
    preview: String(value),
  };
}
