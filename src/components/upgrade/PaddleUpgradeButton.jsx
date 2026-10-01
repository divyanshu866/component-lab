"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { openProCheckout } from "@/lib/paddle/client";

export function PaddleUpgradeButton({ userId }) {
  const [opening, setOpening] = useState(false);

  const handleUpgrade = async () => {
    if (opening) return;

    setOpening(true);

    try {
      await openProCheckout(userId);
    } catch (error) {
      console.error("Paddle checkout failed:", error);
    } finally {
      setOpening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleUpgrade}
      disabled={opening}
      className="group flex h-14 w-full items-center justify-center rounded-2xl bg-white font-semibold text-lg text-black transition-all duration-300 hover:bg-neutral-200 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
    >
      <span className="flex items-center gap-2">
        {opening ? "Loading checkout…" : "Get Pro"}

        {!opening && (
          <ArrowRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </span>
    </button>
  );
}
