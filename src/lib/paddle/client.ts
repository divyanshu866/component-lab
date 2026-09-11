"use client";

import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddlePromise: Promise<Paddle | undefined> | undefined;

export function getPaddle() {
  if (!paddlePromise) {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!token) {
      throw new Error("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not configured");
    }

    paddlePromise = initializePaddle({
      environment: "sandbox",
      token,
    });
  }

  return paddlePromise;
}
