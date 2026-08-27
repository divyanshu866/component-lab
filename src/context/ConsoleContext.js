// context/ConsoleContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

const ConsoleContext = createContext(null);

export const ConsoleProvider = ({ children }) => {
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const appendConsoleLog = (diagnostics) => {
    //append errors
    setConsoleLogs((prev) => [...prev, ...diagnostics]);
  };
  return (
    <ConsoleContext.Provider
      value={{
        showConsole,
        setShowConsole,
        consoleLogs,
        setConsoleLogs,
        appendConsoleLog,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsole = () => useContext(ConsoleContext);
