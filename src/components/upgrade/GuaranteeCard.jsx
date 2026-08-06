import { ShieldCheck } from "lucide-react";

const GuaranteeCard = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      {/* Background Glow */}

      <div className="absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 px-8 py-8 text-center md:flex-row md:items-center md:text-left">
        {/* Icon */}

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
          <ShieldCheck className="h-10 w-10 text-violet-400" />
        </div>

        {/* Content */}
        {/* 
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-white md:text-3xl">
            7-day money-back guarantee
          </h3>

          <p className="mt-2 text-lg leading-7 text-gray-400">
            Not satisfied? Get a full refund within 7 days of upgrading. No
            questions asked.
          </p>
        </div> */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-white md:text-3xl">
            7-day money-back guarantee
          </h3>

          <p className="mt-2 text-lg leading-7 text-gray-400">
            Not satisfied? Get a full refund within 7 days of upgrading.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              ✓ Secure Payments
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              ✓ Cancel Anytime
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              ✓ Instant Upgrade
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeCard;
