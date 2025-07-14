// context/ConsoleContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

const ConsoleContext = createContext(null);

export const ConsoleProvider = ({ children }) => {
  const [showConsole, setShowConsole] = useState(true);

  return (
    <ConsoleContext.Provider value={{ showConsole, setShowConsole }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsole = () => useContext(ConsoleContext);
