"use client";

import { getPaddle } from "@/lib/paddle/client";
import { ArrowRight } from "lucide-react";

export function PaddleUpgradeButton({ userId }) {
  const handleUpgrade = async () => {
    const paddle = await getPaddle();

    if (!paddle) {
      throw new Error("Failed to initialize Paddle");
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
  };

  return (
    <button
      type="button"
      onClick={handleUpgrade}
      className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl font-semibold text-lg transition-all duration-300 bg-linear-to-r from-violet-600 via-fuchsia-500 to-fuchsia-600 text-white hover:shadow-[0_0_35px_rgba(217,70,239,0.1)] hover:scale-[1.015] cursor-pointer"
    >
      {/* Button Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-white/20 group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">
        Upgrade to Premium
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}
