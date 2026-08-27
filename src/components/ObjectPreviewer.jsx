"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const INDENT_SIZE = 10;

const scalarClasses = {
  string: "text-emerald-400",
  number: "text-amber-300",
  bigint: "text-amber-300",
  boolean: "text-fuchsia-300",
  function: "text-violet-300",
  symbol: "text-orange-300",
  error: "text-red-300",
  null: "text-neutral-500 italic",
  undefined: "text-neutral-500 italic",
  value: "text-neutral-300",
};

function getValueType(value) {
  return String(value?.type || "value").toLowerCase();
}

function getScalarPreview(value) {
  const type = getValueType(value);

  if (type === "null") {
    return "null";
  }

  if (type === "undefined") {
    return "undefined";
  }

  if (type === "string") {
    const stringValue =
      value?.value !== undefined ? value.value : (value?.preview ?? "");

    return JSON.stringify(String(stringValue));
  }

  if (value?.preview !== undefined && value.preview !== null) {
    return String(value.preview);
  }

  if (value?.value !== undefined && value.value !== null) {
    return String(value.value);
  }

  return "";
}

function ScalarValue({ value }) {
  if (!value) {
    return null;
  }

  const type = getValueType(value);
  const className = scalarClasses[type] || scalarClasses.value;

  return (
    <span
      data-value-type={type}
      title={type}
      className={`whitespace-pre-wrap wrap-break-words ${className}`}
    >
      {getScalarPreview(value)}
    </span>
  );
}

function isExpandable(value) {
  const type = getValueType(value);

  return (
    type === "object" || type === "array" || type === "map" || type === "set"
  );
}

function getCollectionSize(value) {
  const type = getValueType(value);

  if (type === "object") {
    return Object.keys(value?.value ?? {}).length;
  }

  if (type === "array" || type === "map" || type === "set") {
    return Array.isArray(value?.value) ? value.value.length : 0;
  }

  return 0;
}

function getCollectionLabel(value) {
  const type = getValueType(value);
  const size = getCollectionSize(value);

  if (type === "array") {
    return (
      <>
        <span className="text-neutral-300">Array</span>
        <span className="text-neutral-600">({size})</span>
      </>
    );
  }

  if (type === "map") {
    return (
      <>
        <span className="text-neutral-300">Map</span>
        <span className="text-neutral-600">({size})</span>
      </>
    );
  }

  if (type === "set") {
    return (
      <>
        <span className="text-neutral-300">Set</span>
        <span className="text-neutral-600">({size})</span>
      </>
    );
  }

  return (
    <>
      <span className="text-neutral-300">Object</span>
      <span className="text-neutral-600">({size})</span>
    </>
  );
}

function NodeName({ name }) {
  if (name === undefined || name === null) {
    return null;
  }

  return (
    <>
      <span
        className={`${
          typeof name === "number" ? "text-neutral-500" : "text-neutral-300"
        }`}
      >
        {name}
      </span>
      <span className="text-neutral-600">:</span>
    </>
  );
}

function ObjectNode({ name, value, depth = 0, embedded = false }) {
  const [open, setOpen] = useState(depth === 0);
  const type = getValueType(value);
  const expandable = isExpandable(value);

  const indentation = embedded ? 0 : depth * INDENT_SIZE;
  const nodeLabel =
    name !== undefined && name !== null ? `${name} ${type}` : type;

  const renderChildren = () => {
    if (type === "object") {
      return Object.entries(value?.value ?? {}).map(([key, child]) => (
        <ObjectNode
          key={`object-${key}`}
          name={key}
          value={child}
          depth={depth + 1}
        />
      ));
    }

    if (type === "array") {
      return (value?.value ?? []).map((child, index) => (
        <ObjectNode
          key={`array-${index}`}
          name={index}
          value={child}
          depth={depth + 1}
        />
      ));
    }

    if (type === "map") {
      return (value?.value ?? []).map((entry, index) => {
        const [key, child] = Array.isArray(entry) ? entry : [null, entry];

        return (
          <div
            key={`map-${index}`}
            className="flex min-w-0 items-start gap-1.5 py-0.5"
            style={{
              paddingLeft: `${(depth + 1) * INDENT_SIZE}px`,
            }}
          >
            <div className="flex min-w-0 items-start gap-1.5">
              <ScalarValue value={key} />
              <span className="select-none text-neutral-600">→</span>
            </div>

            {isExpandable(child) ? (
              <ObjectNode value={child} depth={depth + 1} embedded />
            ) : (
              <ScalarValue value={child} />
            )}
          </div>
        );
      });
    }

    if (type === "set") {
      return (value?.value ?? []).map((child, index) => (
        <ObjectNode
          key={`set-${index}`}
          name={index}
          value={child}
          depth={depth + 1}
        />
      ));
    }

    return null;
  };

  if (!expandable) {
    return (
      <div
        className="flex min-h-5 min-w-0 items-baseline gap-1.5 py-0.5 ml-5"
        style={{
          paddingLeft: `${depth * INDENT_SIZE}px`,
        }}
      >
        <NodeName name={name} />
        <ScalarValue value={value} />
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${open ? "Collapse" : "Expand"} ${nodeLabel}`}
        onClick={() => setOpen((current) => !current)}
        className="group inline-flex min-h-6 max-w-full items-center gap-1 rounded px-1 py-0.5 text-left transition-colors hover:bg-neutral-900/80 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 cursor-pointer"
        style={{
          marginLeft: `${indentation}px`,
        }}
      >
        {open ? (
          <ChevronDown className="h-3 w-3 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-300" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-300" />
        )}

        {name !== undefined && name !== null && (
          <>
            <span
              className={`${
                typeof name === "number"
                  ? "text-neutral-500"
                  : "text-neutral-300"
              }`}
            >
              {name}
            </span>
            <span className="text-neutral-600">:</span>
          </>
        )}

        <span className="truncate text-xs">{getCollectionLabel(value)}</span>
      </button>

      {open && (
        <div className="ml-2 border-l border-neutral-800/90 pl-1">
          {renderChildren()}
        </div>
      )}
    </div>
  );
}

export function ObjectPreviewer({ data, inline = false }) {
  if (!data) {
    return null;
  }

  return (
    <div
      className={`font-mono text-xs leading-5 ${
        inline ? "inline-block align-top" : "block"
      }`}
    >
      <ObjectNode value={data} depth={0} />
    </div>
  );
}

export default ObjectPreviewer;
