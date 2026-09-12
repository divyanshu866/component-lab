"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initializePaddle } from "@paddle/paddle-js";

const PaddleContext = createContext(null);

export function PaddleProvider({ children }) {
  const [paddle, setPaddle] = useState(null);
  const [paddleReady, setPaddleReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    })
      .then((instance) => {
        if (cancelled) return;

        setPaddle(instance ?? null);
        setPaddleReady(Boolean(instance));
      })
      .catch((error) => {
        console.error("Failed to initialize Paddle:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PaddleContext.Provider value={{ paddle, paddleReady }}>
      {children}
    </PaddleContext.Provider>
  );
}

export function usePaddle() {
  const context = useContext(PaddleContext);

  if (!context) {
    throw new Error("usePaddle must be used inside PaddleProvider");
  }

  return context;
}
