import { Code, Crown } from "lucide-react";
import { useState } from "react";

const BillingToggle = ({ plans, billingCycle, setBillingCycle }) => {
  const yearlyDiscount = Math.round(
    ((plans[1].price.monthly - plans[1].price.yearly) /
      plans[1].price.monthly) *
      100
  );
  return (
    <div className="flex justify-center mb-16">
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-full p-2 flex">
        <div
          className={`absolute top-2 bottom-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500 ${
            billingCycle === "monthly"
              ? "left-2 right-1/2 mr-1"
              : "left-1/2 right-2 ml-1"
          }`}
        ></div>

        <button
          onClick={() => setBillingCycle("monthly")}
          className={`relative px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
            billingCycle === "monthly"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setBillingCycle("yearly")}
          className={`relative px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
            billingCycle === "yearly"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Yearly
          <span className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black text-xs font-black px-3 py-1 rounded-full animate-bounce">
            SAVE {yearlyDiscount}%
          </span>
        </button>
      </div>
    </div>
  );
};

export default BillingToggle;
