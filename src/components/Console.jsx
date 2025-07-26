"use client";
import { useConsole } from "@/context/ConsoleContext";
import { Terminal, X } from "lucide-react";
import React, { useEffect, useState } from "react";
const Console = () => {
  const { showConsole, setShowConsole, consoleLogs, setConsoleLogs } =
    useConsole();
  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "console") {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
          id: Date.now(),
          level: event.data.level,
          message: event.data.message,
          timestamp,
        };
        setConsoleLogs((prev) => [...prev, logEntry]);
        console.log(consoleLogs);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const clearConsole = () => {
    setConsoleLogs([]);
  };
  return (
    <div
      className={`${
        showConsole ? " h-50" : "h-0"
      } flex flex-col border-t rounded-t-lg overflow-hidden border-gray-200 dark:border-darkBorder transition-all duration-75`}
    >
      <div className="bg-gray-200 rounded-t-lg dark:bg-darkSecondary border-b border-gray-200 dark:border-darkBorder px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-pink-600" />
          <span className="dark:text-neutral-400 text-sm font-semibold">
            Console
          </span>
          <span className="text-xs text-gray-400">
            ({consoleLogs.length} messages)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearConsole}
            className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700"
          >
            Clear
          </button>
          <button
            onClick={() => setShowConsole(false)}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-4 font-mono text-sm">
        {consoleLogs.length === 0 ? (
          <div className="text-gray-500 italic">
            No console output yet. Try interacting with your component!
          </div>
        ) : (
          consoleLogs.map((log, index) => (
            <div
              key={index}
              className={`mb-2 ${
                log.level === "error"
                  ? "text-red-400"
                  : log.level === "warn"
                  ? "text-yellow-400"
                  : "text-green-600"
              }`}
            >
              <span className="text-gray-500">[{log.timestamp}] </span>
              <span
                className={`font-semibold ${
                  log.level === "error"
                    ? "text-red-300"
                    : log.level === "warn"
                    ? "text-yellow-300"
                    : "text-gray-300"
                }`}
              >
                {log.level.toUpperCase()}:
              </span>
              <span className="ml-2">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Console;
