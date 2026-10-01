const BillingToggle = ({ plans, billingCycle, setBillingCycle }) => {
  const yearlyDiscount = Math.round(
    ((plans[1].price.monthly - plans[1].price.yearly) /
      plans[1].price.monthly) *
      100,
  );

  const isYearly = billingCycle === "yearly";

  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      <span
        className={`text-lg font-medium transition-colors ${
          !isYearly ? "text-white" : "text-zinc-400"
        }`}
      >
        Monthly
      </span>

      <button
        onClick={() => setBillingCycle(isYearly ? "monthly" : "yearly")}
        className={`relative h-8 w-16 rounded-full transition-colors duration-300 ${
          isYearly
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-500"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
            isYearly ? "left-9" : "left-1"
          }`}
        />
      </button>

      <span
        className={`text-lg font-medium transition-colors ${
          isYearly ? "text-white" : "text-zinc-400"
        }`}
      >
        Yearly
      </span>

      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
        Save {yearlyDiscount}%
      </span>
    </div>
  );
};

export default BillingToggle;
