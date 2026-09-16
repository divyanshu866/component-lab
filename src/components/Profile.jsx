"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Crown, LogOut, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Profile = ({ user }) => {
  const router = useRouter();
  const containerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  /*
   * Close the menu when clicking outside.
   */
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  /*
   * Close the menu with Escape.
   */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await authClient.signOut();
      router.push("/sign-in");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  const displayName = user?.name || "ComponentLab user";
  const email = user?.email || "";

  return (
    <div ref={containerRef} className="relative z-105 mr-2 rounded-full border">
      <button
        type="button"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={[
          "relative flex h-9 w-9 items-center justify-center rounded-full",
          "border bg-white/[0.04] transition-all duration-200",
          "cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-violet-400/50",
          open
            ? "border-violet-400/40 ring-4 ring-violet-400/[0.08]"
            : "border-white/[0.09] hover:border-white/[0.18]",
        ].join(" ")}
      >
        <Image
          src={user?.image || "/default-avatar.png"}
          width={36}
          height={36}
          alt={displayName}
          className="h-full w-full rounded-full object-cover"
        />

        {/* Signed-in indicator */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b0b0f] bg-emerald-400"
        />
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* Account popover                                                     */}
      {/* ------------------------------------------------------------------ */}

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] w-[292px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101014]/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {/* Account identity */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Image
                src={user?.image || "/default-avatar.png"}
                width={44}
                height={44}
                alt=""
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/[0.08]"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {displayName}
                </p>

                <p className="mt-1 truncate text-xs text-zinc-500">{email}</p>
              </div>
            </div>
          </div>

          {/* Plan */}
          <div className="border-y border-white/[0.06] px-4 py-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                  Plan
                </p>

                <p className="mt-1 text-sm font-medium text-zinc-200">Free</p>
              </div>

              <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-[10px] font-medium text-zinc-500">
                Current
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-2">
            {/* Upgrade */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                router.push("/upgrade");
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-400/[0.06] cursor-pointer"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-400/[0.06]">
                <Crown className="h-4 w-4 text-violet-300" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  Upgrade to Pro
                </p>

                <p className="mt-0.5 text-xs text-zinc-600">
                  Increase your AI capacity
                </p>
              </div>
            </button>
          </div>

          {/* Sign out */}
          <div className="border-t border-white/[0.06] p-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              disabled={signingOut}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-400/[0.05] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-400/10 bg-red-400/[0.035]">
                <LogOut className="h-4 w-4 text-red-400/80 transition-colors group-hover:text-red-300" />
              </div>

              <span className="text-sm font-medium text-red-400/80 transition-colors group-hover:text-red-300">
                {signingOut ? "Signing out…" : "Sign out"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
