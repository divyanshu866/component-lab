"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Crown, LogOut } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEditorContext } from "@/context/EditorContext";

import GenerationUsageIndicator from "@/components/GenerationUsageIndicator";

const Profile = ({ user }) => {
  const { generationUsage, setGenerationUsage, setGenerationLimitModalOpen } =
    useEditorContext();

  const router = useRouter();
  const containerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

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
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  };

  const displayName = user?.name || "ComponentLab user";
  const email = user?.email || "";
  const plan = generationUsage?.plan ?? "FREE";
  const isPro = plan === "PRO";

  return (
    <div ref={containerRef} className="relative z-105 mr-2">
      {/* Avatar */}
      <button
        type="button"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={[
          "relative flex h-9 w-9 items-center justify-center rounded-full",
          "border bg-white/[0.035]",
          "cursor-pointer outline-none",
          "transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-violet-400/40",
          open
            ? "border-violet-400/40 ring-4 ring-violet-400/[0.07]"
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

        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b0b0f] bg-emerald-400"
        />
      </button>

      {open && (
        <div
          role="menu"
          className={[
            "absolute right-0 top-[calc(100%+14px)] w-[320px]",
            "overflow-hidden rounded-2xl",
            "border border-white/[0.09]",
            "bg-[#09090d]/95",
            "shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
            "backdrop-blur-2xl",
          ].join(" ")}
        >
          {/* Very subtle ambient glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/[0.05] blur-[90px]" />

          {/* Identity */}
          <div className="relative px-5 pb-5 pt-5">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  width={44}
                  height={44}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-white/[0.10]"
                />

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#09090d] bg-emerald-400"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium tracking-[-0.01em] text-white">
                  {displayName}
                </p>

                <p className="mt-1 truncate text-[11px] leading-4 text-neutral-500">
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="px-4">
            <div
              className={[
                "rounded-xl",
                "border border-white/[0.07]",
                "bg-white/[0.025]",
                "px-4 py-3.5",
              ].join(" ")}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-600">
                    AI Usage
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[13px] font-medium text-neutral-200">
                      {isPro ? "Pro" : "Free"}
                    </span>

                    <span
                      className={[
                        "rounded-full px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.12em]",
                        isPro
                          ? "bg-violet-400/[0.10] text-violet-300"
                          : "bg-white/[0.05] text-neutral-500",
                      ].join(" ")}
                    >
                      {isPro ? "Active" : "Current"}
                    </span>
                  </div>
                </div>
              </div>

              <GenerationUsageIndicator
                generationUsage={generationUsage}
                onLimitReached={() => {
                  setGenerationLimitModalOpen(true);
                }}
              />
            </div>
          </div>

          {/* Upgrade */}
          {!isPro && (
            <div className="px-4 pt-3.5">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  window.location.assign("/upgrade");
                }}
                className={[
                  "group flex w-full items-center gap-3",
                  "rounded-xl px-3 py-3",
                  "cursor-pointer text-left",
                  "transition-all duration-200",
                  "hover:bg-violet-400/[0.05]",
                ].join(" ")}
              >
                <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-violet-400/[0.07]">
                  <Crown className="h-4 w-4 text-yellow-300 stroke-1" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-neutral-200">
                    Upgrade to Pro
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-neutral-600">
                    Unlock more AI capacity and powerful models
                  </p>
                </div>

                <span className="text-[10px] text-neutral-700 transition-colors group-hover:text-violet-300/70">
                  →
                </span>
              </button>
            </div>
          )}

          {/* Sign out */}
          <div className={["px-4 pb-4", isPro ? "pt-3.5" : "pt-2"].join(" ")}>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              disabled={signingOut}
              className={[
                "group flex w-full items-center gap-3",
                "rounded-xl px-3 py-3",
                "cursor-pointer text-left",
                "transition-all duration-200",
                "hover:bg-red-400/[0.045]",
                "disabled:cursor-not-allowed disabled:opacity-50",
              ].join(" ")}
            >
              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-red-400/[0.035]">
                <LogOut className="h-4 w-4 text-red-400/70 transition-colors group-hover:text-red-300" />
              </div>

              <span className="text-[12px] font-medium text-red-400/70 transition-colors group-hover:text-red-300">
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
