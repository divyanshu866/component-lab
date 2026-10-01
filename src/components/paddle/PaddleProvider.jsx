"use client";

import { useEffect } from "react";
import { initializePaddleClient } from "@/lib/paddle/client";

export default function PaddleProvider() {
  useEffect(() => {
    initializePaddleClient().catch((error) => {
      console.error("Failed to initialize Paddle.js:", error);
    });
  }, []);

  return null;
}
