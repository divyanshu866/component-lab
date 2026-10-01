import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddlePromise: Promise<Paddle | undefined> | null = null;

export function initializePaddleClient() {
  if (paddlePromise) {
    return paddlePromise;
  }

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

  if (!token) {
    paddlePromise = Promise.reject(
      new Error("Paddle client token is not configured"),
    );

    return paddlePromise;
  }

  paddlePromise = initializePaddle({
    environment:
      process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
        ? "production"
        : "sandbox",
    token,
  }).catch((error) => {
    paddlePromise = null;
    throw error;
  });

  return paddlePromise;
}

export async function openProCheckout(userId: string) {
  const paddle = await initializePaddleClient();

  if (!paddle) {
    throw new Error("Failed to initialize Paddle.js");
  }

  const priceId = process.env.NEXT_PUBLIC_PADDLE_PREMIUM_MONTHLY_PRICE_ID;

  if (!priceId) {
    throw new Error(
      "NEXT_PUBLIC_PADDLE_PREMIUM_MONTHLY_PRICE_ID is not configured",
    );
  }

  paddle.Checkout.open({
    items: [
      {
        priceId,
        quantity: 1,
      },
    ],
    customData: {
      userId,
    },
  });
}
