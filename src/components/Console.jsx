"use client";

import { useEffect } from "react";
import { useConsole } from "@/context/ConsoleContext";
import { ObjectPreviewer } from "./ObjectPreviewer";
import {
  AlertTriangle,
  ChevronRight,
  Circle,
  FileCode,
  Info,
  SquareTerminal,
  X,
  XCircle,
} from "lucide-react";

function getSeverityKey(entry) {
  const value = String(entry?.severity || entry?.type || "log").toLowerCase();

  if (value === "error") {
    return "error";
  }

  if (value === "warn" || value === "warning") {
    return "warn";
  }

  if (value === "info") {
    return "info";
  }

  if (value === "log" || value === "debug" || value === "verbose") {
    return "log";
  }

  return "info";
}

function getTypeLabel(entry, severityKey) {
  const rawType = String(entry?.type || severityKey || "log").replace(
    /^console\./i,
    "",
  );

  if (rawType.toLowerCase() === "warning") {
    return "warn";
  }

  return rawType;
}

function getSeverityStyles(severityKey) {
  const styles = {
    error: {
      rail: "border-red-500/70",
      surface: "bg-red-500/[0.035]",
      icon: "text-red-400",
      badge: "border-red-500/25 bg-red-500/10 text-red-300",
      label: "text-red-300",
    },
    warn: {
      rail: "border-amber-500/70",
      surface: "bg-amber-500/[0.035]",
      icon: "text-amber-400",
      badge: "border-amber-500/25 bg-amber-500/10 text-amber-300",
      label: "text-amber-300",
    },
    info: {
      rail: "border-fuchsia-500/60",
      surface: "bg-neutral-900/40",
      icon: "text-violet-400",
      badge: "border-violet-500/25 bg-violet-500/10 text-violet-300",
      label: "text-violet-300",
    },
    log: {
      rail: "border-neutral-700",
      surface: "bg-transparent",
      icon: "text-neutral-500",
      badge: "border-neutral-800 bg-neutral-900/80 text-neutral-400",
      label: "text-neutral-400",
    },
  };

  return styles[severityKey] || styles.log;
}

function ConsoleArgument({ value }) {
  if (!value) {
    return null;
  }

  const valueType = String(value.type || "value").toLowerCase();

  if (
    valueType === "object" ||
    valueType === "array" ||
    valueType === "map" ||
    valueType === "set"
  ) {
    return (
      <span
        title={valueType}
        data-console-type={valueType}
        className="text-orange-300"
      >
        <ObjectPreviewer data={value} inline />
      </span>
    );
  }

  if (valueType === "error") {
    return (
      <span
        title="error"
        data-console-type="error"
        className="font-mono text-red-300"
      >
        {value.preview}
      </span>
    );
  }

  const datatypeClasses = {
    string: "text-emerald-400",
    number: "text-amber-300",
    bigint: "text-amber-300",
    boolean: "text-fuchsia-300",
    function: "text-violet-300",
    symbol: "text-orange-300",
    null: "text-neutral-500 italic",
    undefined: "text-neutral-500 italic",
    value: "text-neutral-200",
  };

  return (
    <span
      title={valueType}
      data-console-type={valueType}
      className={`whitespace-pre-wrap wrap-break-words ${
        datatypeClasses[valueType] || datatypeClasses.value
      }`}
    >
      {value.preview}
    </span>
  );
}

function StackDisclosure({ label, children }) {
  return (
    <details className="group ml-6 mt-2">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[10px] text-neutral-600 transition-colors hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700 [&::-webkit-details-marker]:hidden">
        <ChevronRight className="h-3 w-3 shrink-0 transition-transform duration-150 group-open:rotate-90" />
        <span>{label}</span>
      </summary>

      <div className="mt-1.5 border-l border-neutral-800 pl-3">{children}</div>
    </details>
  );
}

function ConsoleEntry({ entry }) {
  const isConsoleEntry = entry.source === "console";
  const severityKey = getSeverityKey(entry);
  const severityStyles = getSeverityStyles(severityKey);
  const typeLabel = getTypeLabel(entry, severityKey);
  const argumentsList = entry.metadata?.arguments ?? [];

  const icon =
    severityKey === "error" ? (
      <XCircle className={`h-3.5 w-3.5 shrink-0 ${severityStyles.icon}`} />
    ) : severityKey === "warn" ? (
      <AlertTriangle
        className={`h-3.5 w-3.5 shrink-0 ${severityStyles.icon}`}
      />
    ) : severityKey === "info" ? (
      <Info className={`h-3.5 w-3.5 shrink-0 ${severityStyles.icon}`} />
    ) : (
      <Circle className={`h-2.5 w-2.5 shrink-0 ${severityStyles.icon}`} />
    );

  const location = entry.location?.file
    ? `${entry.location.file}:${entry.location.line ?? "—"}:${entry.location.column ?? "—"}`
    : null;

  const sourceLabel =
    entry.source && entry.source !== "console" ? entry.source : null;

  const targetLabel = entry.targetTech || null;

  return (
    <article
      className={`border-b border-neutral-900 border-l-2 px-3 py-2.5 transition-colors last:border-b-0 hover:bg-neutral-900/80 ${severityStyles.rail} ${severityStyles.surface}`}
    >
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {icon}

          <span
            className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${severityStyles.badge}`}
          >
            {typeLabel}
          </span>

          {entry.severity &&
            entry.type &&
            String(entry.severity).toLowerCase() !==
              String(entry.type).toLowerCase() &&
            severityKey !== "log" && (
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.08em] ${severityStyles.label}`}
              >
                {severityKey}
              </span>
            )}

          {sourceLabel && (
            <span className="rounded border border-neutral-800 bg-neutral-900/70 px-1.5 py-0.5 text-[10px] text-neutral-600">
              {sourceLabel}
            </span>
          )}

          {targetLabel && (
            <span className="text-[10px] text-neutral-600">{targetLabel}</span>
          )}
        </div>

        {location && (
          <div className="flex min-w-0 max-w-full shrink items-center gap-1.5 text-[10px] text-neutral-600">
            <FileCode className="h-3 w-3 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>

      {isConsoleEntry && argumentsList.length > 0 ? (
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pl-6 pt-2 font-mono text-xs leading-5">
          {argumentsList.map((argument, index) => (
            <ConsoleArgument
              key={`${entry.id ?? "entry"}-argument-${index}`}
              value={argument}
            />
          ))}
        </div>
      ) : (
        <div className="whitespace-pre-wrap break-words pl-6 pt-2 text-xs leading-5 text-neutral-300">
          {entry.message}
        </div>
      )}

      {entry.metadata?.componentStack && (
        <StackDisclosure label="Component stack">
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-neutral-500">
            {entry.metadata.componentStack}
          </pre>
        </StackDisclosure>
      )}

      {entry.stack && (
        <StackDisclosure label="Stack trace">
          <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-neutral-500">
            {entry.stack}
          </pre>
        </StackDisclosure>
      )}
    </article>
  );
}

export default function Console() {
  const {
    showConsole,
    setShowConsole,
    appendConsoleLog,
    consoleLogs,
    setConsoleLogs,
  } = useConsole();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type !== "console") {
        return;
      }

      const logEntry = [
        {
          source: "preview",
          targetTech: "HTML",
          severity: event.data.level,
          type: event.data.level,
          message: event.data.message,
          stack: null,
          location: {
            file: "component.html",
            line: null,
            column: null,
          },
          metadata: {},
        },
      ];

      setConsoleLogs((previousLogs) => [...previousLogs, ...logEntry]);
      setShowConsole(true);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setConsoleLogs, setShowConsole]);

  useEffect(() => {
    const handlePreviewMessage = (event) => {
      if (event.data?.type !== "preview-diagnostics") {
        return;
      }
      console.log(
        "DIAGNOSTICS FROM REACT_I_FRAME====>",
        event.data.diagnostics,
      );

      appendConsoleLog(event.data.diagnostics);
      setShowConsole(true);
    };
    window.addEventListener("message", handlePreviewMessage);

    return () => {
      window.removeEventListener("message", handlePreviewMessage);
    };
  }, [appendConsoleLog, setShowConsole]);

  const clearConsole = () => {
    setConsoleLogs([]);
    setShowConsole(false);
  };

  return (
    <div
      className={`${
        showConsole ? "h-70" : "h-0"
      } mx-1 flex flex-col overflow-hidden rounded-t-xl border border-b-0 border-neutral-800 bg-neutral-950 transition-[height] duration-150`}
    >
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-neutral-800 bg-neutral-900/70 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <SquareTerminal className="h-3.5 w-3.5 shrink-0 text-neutral-400" />

          <span className="text-xs font-medium text-neutral-200">Console</span>

          <span className="rounded border border-neutral-800 bg-neutral-950 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-neutral-500">
            {consoleLogs.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearConsole}
            className="rounded px-2 py-1 text-[11px] text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-700"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => setShowConsole(false)}
            aria-label="Close console"
            title="Close console"
            className="rounded p-1 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-700"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <div
        aria-live="polite"
        className="min-h-0 flex-1 overflow-y-auto bg-neutral-950 font-mono"
      >
        {consoleLogs.length === 0 ? (
          <div className="flex h-full items-center justify-center px-4 text-center text-[11px] text-neutral-600">
            Console is empty
          </div>
        ) : (
          <div>
            {consoleLogs.map((entry, index) => (
              <ConsoleEntry
                key={entry.id ?? `console-entry-${index}`}
                entry={entry}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
