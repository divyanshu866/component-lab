import { ArrowRight, Check, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const UpgradeCard = ({ plan, billingCycle }) => {
  const isPro = plan.id === "premium";
  const price = plan.price[billingCycle];
  const router = useRouter();
  const yearlySavings =
    billingCycle === "yearly"
      ? (plan.price.monthly - plan.price.yearly) * 12
      : 0;

  return (
    <div
      className={`
    relative
    overflow-hidden
    rounded-[28px]
    bg-[#050505]
    transition-all
    duration-300
    hover:-translate-y-1
    mb-5

    ${
      isPro
        ? `
          border-2
          border-fuchsia-700/80
          shadow-[0_0_35px_rgba(217,70,239,.18)]
        `
        : `
          border-2
          border-white/30
        `
    }
  `}
    >
      {/* Border Glow */}

      {isPro && (
        <>
          <div className="absolute inset-0 rounded-[28px] bg-linear-to-r from-violet-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />

          <div className="absolute -right-24 top-0 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-[90px]" />
        </>
      )}

      <div className="relative flex h-full flex-col p-8">
        {/* Plan */}

        <div>
          <h3 className="text-3xl font-semibold text-white">{plan.name}</h3>

          {/* Price */}

          <div className="mt-5 flex items-end">
            <span className="text-6xl font-bold tracking-tight text-white">
              ${price}
            </span>

            <span className="mb-2 ml-2 text-xl font-medium text-gray-300">
              /month
            </span>
          </div>

          {billingCycle === "yearly" && yearlySavings > 0 && (
            <p className="mt-3 text-sm text-emerald-400">
              Save ${yearlySavings}/year
            </p>
          )}

          <p className="mt-8 text-lg leading-8 text-gray-300">
            {plan.description}
          </p>
        </div>

        {/* Features */}

        <div className="mt-10 space-y-5">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-center gap-4">
              <div
                className={`
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full

          ${isPro ? "bg-fuchsia-500 text-white" : "bg-white text-black"}
        `}
              >
                <Check size={11} strokeWidth={3} />
              </div>

              <span className="text-[17px] leading-8 text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Spacer */}

        <div className="flex-1" />

        {/* CTA */}

        <div className="mt-10">
          <button
            onClick={() => router.push(isPro ? "/" : "/workspace")}
            className={`
            group
            relative
            flex
            h-14
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            font-semibold
            text-lg
            transition-all
            duration-300

            ${
              isPro
                ? `
                  bg-linear-to-r
                  from-violet-600
                  via-fuchsia-500
                  to-fuchsia-600
                  text-white

                  hover:brightness-110
                  hover:scale-[1.015]
                `
                : `
                  bg-gradient-to-r
                  from-violet-200
                  to-fuchsia-200

                  text-gray-800

                  hover:brightness-105
                `
            }
          `}
          >
            {/* Button Glow */}

            <div
              className={`
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-300

              ${
                isPro
                  ? "bg-white/10 group-hover:opacity-100"
                  : "bg-white/20 group-hover:opacity-100"
              }
            `}
            />

            <span className="relative flex items-center gap-2">
              {plan.cta}

              {isPro && (
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeCard;
