import { ArrowRight, Crown } from "lucide-react";
import { useState } from "react";

const UpgradeCard = ({ plan, billingCycle }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const Icon = plan.icon;
  const isPremium = plan.id === "premium";
  const price = plan.price[billingCycle];
  return (
    <div
      key={plan.id}
      onMouseEnter={() => setHoveredCard(plan.id)}
      onMouseLeave={() => setHoveredCard(null)}
      className={`relative group transition-all duration-700`}
    >
      {/* Glow Effect */}

      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

      {/* Popular Badge */}
      {plan.badge && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-black flex items-center gap-2 shadow-2xl animate-pulse">
            <Crown className="w-4 h-4" />
            {plan.badge}
            <Crown className="w-4 h-4" />
          </div>
        </div>
      )}

      <div
        className={`relative bg-gray-900/90 backdrop-blur-2xl border-2 rounded-3xl p-10 h-full transition-all duration-500 ${"border-pink-500/50 shadow-2xl shadow-pink-500/25"} ${
          hoveredCard === plan.id ? "transform translate-y-[-8px]" : ""
        }`}
      >
        {/* Card Header */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${plan.color} mb-6 shadow-2xl animate-pulse `}
          >
            <Icon className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-3xl font-black mb-3">{plan.name}</h3>
          <p className="text-gray-400 text-lg mb-8">{plan.description}</p>

          <div className="flex items-end justify-center gap-2 mb-6">
            <span className="text-6xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              ${price}
            </span>
            {price > 0 && (
              <span className="text-gray-400 mb-4 text-xl">
                /{billingCycle === "yearly" ? "mo" : "mo"}
              </span>
            )}
          </div>

          {billingCycle === "yearly" && plan.price.yearly > 0 && (
            <div className="text-lg text-green-400 mb-6 font-bold">
              💰 Save ${(plan.price.monthly - plan.price.yearly) * 12}/year
            </div>
          )}
        </div>

        {/* Features List */}

        {/* CTA Button */}
        <button
          className={`w-full py-6 px-8 rounded-2xl font-black text-xl transition-all duration-300 transform hover:scale-105 ${
            plan.ctaVariant === "primary"
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-2xl hover:shadow-pink-500/50 animate-pulse"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-gray-500"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            {plan.cta}
            {plan.ctaVariant === "primary" && (
              <ArrowRight className="w-5 h-5" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default UpgradeCard;
