"use client";

const GenerationUsageIndicator = ({ generationUsage, onLimitReached }) => {
  const limit = Number(generationUsage?.limit ?? 20);
  const used = Math.min(Number(generationUsage?.used ?? 0), limit);
  const remaining = Math.max(limit - used, 0);

  const plan = generationUsage?.plan ?? "FREE";
  const isPro = plan === "PRO";
  const isEmpty = remaining === 0;

  const percentageUsed = limit > 0 ? Math.min((used / limit) * 100, 100) : 100;

  let resetText = "Resets monthly";

  if (generationUsage?.periodEnd) {
    const end = new Date(generationUsage.periodEnd);
    const now = new Date();

    const diffMs = end.getTime() - now.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      resetText = "Resets soon";
    } else if (days === 1) {
      resetText = "Resets tomorrow";
    } else {
      resetText = `Resets in ${days} days`;
    }
  }

  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] text-neutral-500">Generations</span>

        <span
          className={[
            "text-[10px] font-medium",
            isEmpty
              ? "text-red-400/80"
              : isPro
                ? "text-violet-300"
                : "text-neutral-300",
          ].join(" ")}
        >
          {remaining} remaining
        </span>
      </div>

      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={[
            "h-full rounded-full transition-all duration-500",
            isEmpty
              ? "bg-red-400/70"
              : isPro
                ? "bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400"
                : "bg-linear-to-r from-violet-400/80 to-violet-300/80",
          ].join(" ")}
          style={{
            width: `${percentageUsed}%`,
          }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[9px] text-neutral-700">
          {used} of {limit} used
        </span>

        <span className="text-[9px] text-neutral-700">{resetText}</span>
      </div>
    </>
  );

  if (isEmpty) {
    return (
      <button
        type="button"
        onClick={onLimitReached}
        className="block w-full cursor-pointer text-left"
        aria-label="Generation limit reached. Open upgrade options."
      >
        {content}
      </button>
    );
  }

  return <div>{content}</div>;
};

export default GenerationUsageIndicator;
