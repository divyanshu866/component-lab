"use client";
import { ArrowRight } from "lucide-react";
import { openProCheckout } from "@/lib/paddle/client";

export function PaddleUpgradeButton({ userId }) {
  const handleUpgrade = async () => {
    try {
      await openProCheckout(userId);
    } catch (error) {
      console.error("Paddle checkout failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleUpgrade}
      className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl font-semibold text-lg transition-all duration-300 bg-linear-to-r from-violet-200 to-fuchsia-200 text-gray-800 hover:brightness-105 cursor-pointer"
    >
      <span className="flex items-center gap-2">
        Get Pro
        <ArrowRight size={18} />
      </span>
    </button>
  );
}
