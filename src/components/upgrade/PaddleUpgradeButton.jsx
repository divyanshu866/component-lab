"use client";
import { usePaddle } from "@/components/PaddleProvider";
import { ArrowRight } from "lucide-react";

export function PaddleUpgradeButton({ userId }) {
  const { paddle, paddleReady } = usePaddle();
  const handleUpgrade = () => {
    if (!paddleReady || !paddle) {
      return;
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
      disabled={!paddleReady}
      onClick={handleUpgrade}
      className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl font-semibold text-lg transition-all duration-300 bg-linear-to-r from-violet-200 to-fuchsia-200 text-gray-800 hover:brightness-105 cursor-pointer"
    >
      {/* Button Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-white/20 group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">
        Get Pro
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}
