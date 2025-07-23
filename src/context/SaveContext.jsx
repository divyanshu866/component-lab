"use client";
// SaveContext.js
import { createContext, useContext, useState } from "react";

const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <SaveContext.Provider value={{ isSaving, setIsSaving }}>
      {children}
    </SaveContext.Provider>
  );
};

export const useSave = () => useContext(SaveContext);
