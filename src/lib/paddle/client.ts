import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddlePromise: Promise<Paddle | undefined> | null = null;

function getPaddle() {
  if (!paddlePromise) {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!token) {
      return Promise.reject(new Error("Paddle client token is not configured"));
    }

    paddlePromise = initializePaddle({
      environment: "sandbox",
      token,
    });
  }

  return paddlePromise;
}

export async function openProCheckout(userId: string) {
  const paddle = await getPaddle();

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
