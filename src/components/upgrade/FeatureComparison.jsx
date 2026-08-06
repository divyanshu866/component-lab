import { Check, Minus } from "lucide-react";
import { Fragment } from "react";
const features = [
  {
    category: "Usage",
    items: [
      {
        feature: "AI Component Generations",
        free: "10 / month",
        pro: "Unlimited",
      },
      {
        feature: "Projects",
        free: "3",
        pro: "Unlimited",
      },
      {
        feature: "Private Projects",
        free: false,
        pro: true,
      },
    ],
  },

  {
    category: "Components",
    items: [
      {
        feature: "Base Components",
        free: true,
        pro: true,
      },
      {
        feature: "Premium Components",
        free: false,
        pro: true,
      },
      {
        feature: "Component Templates",
        free: true,
        pro: true,
      },
    ],
  },

  {
    category: "AI Features",
    items: [
      {
        feature: "Prompt-to-UI",
        free: true,
        pro: true,
      },
      {
        feature: "AI Improvements",
        free: false,
        pro: true,
      },
      {
        feature: "Component Refactoring",
        free: false,
        pro: true,
      },
    ],
  },

  {
    category: "Export",
    items: [
      {
        feature: "React",
        free: true,
        pro: true,
      },
      {
        feature: "HTML",
        free: true,
        pro: true,
      },
      {
        feature: "Vue",
        free: false,
        pro: true,
      },
      {
        feature: "Advanced Export Options",
        free: false,
        pro: true,
      },
    ],
  },

  {
    category: "Support",
    items: [
      {
        feature: "Community Support",
        free: true,
        pro: true,
      },
      {
        feature: "Priority Support",
        free: false,
        pro: true,
      },
    ],
  },
];

function Value({ value }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-emerald-400" />
    ) : (
      <Minus className="mx-auto h-5 w-5 text-gray-600" />
    );
  }

  return <span className="text-gray-300">{value}</span>;
}

export default function FeatureComparison() {
  return (
    <section>
      {/* Heading */}

      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
          Compare Plans
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
          Everything included
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
          Choose the plan that matches your workflow today. Upgrade anytime as
          your projects grow.
        </p>
      </div>

      {/* Table */}

      <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-8 py-6 text-left text-gray-400">Feature</th>

              <th className="w-48 px-6 py-6 text-center text-lg font-semibold text-white">
                Free
              </th>

              <th className="w-48 bg-violet-500/5 px-6 py-6 text-center text-lg font-semibold text-violet-300">
                Pro
              </th>
            </tr>
          </thead>

          <tbody>
            {features.map((section, index) => (
              <Fragment key={section.category}>
                <tr key={index}>
                  <td
                    colSpan={3}
                    className="bg-white/2 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-violet-300"
                  >
                    {section.category}
                  </td>
                </tr>

                {section.items.map((item) => (
                  <tr
                    key={item.feature}
                    className="border-t border-white/5 transition-colors hover:bg-white/2.5"
                  >
                    <td className="px-8 py-5 text-gray-200">{item.feature}</td>

                    <td className="px-6 py-5 text-center">
                      <Value value={item.free} />
                    </td>

                    <td className="bg-violet-500/2.5 px-6 py-5 text-center">
                      <Value value={item.pro} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
