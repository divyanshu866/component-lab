"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your subscription whenever you like. Your Pro features remain available until the end of your billing period, and you won't be charged again.",
  },
  {
    question: "How does yearly billing work?",
    answer:
      "Yearly billing charges you once for the entire year while giving you a discounted monthly rate. It's the best value if you plan on using ComponentLab long-term.",
  },
  {
    question: "What happens if I reach the Free plan limit?",
    answer:
      "You'll simply need to wait until the next monthly quota resets or upgrade to Pro for unlimited generations and premium features.",
  },
  {
    question: "Can I switch between plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time. Changes take effect immediately, and billing is prorated whenever applicable.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. Every Pro subscription comes with a 7-day money-back guarantee. If you're not satisfied, contact us within seven days for a full refund.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. The Free plan requires no credit card. You can start building immediately and upgrade whenever you're ready.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section>
      {/* Heading */}

      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
          Frequently Asked Questions
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
          Questions? We've got answers.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
          Everything you need to know before upgrading.
        </p>
      </div>

      {/* FAQ List */}

      <div className="mx-auto mt-14 max-w-4xl space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between px-8 py-6 text-left"
              >
                <h3 className="pr-6 text-lg font-semibold text-white">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-violet-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/5 px-8 py-6">
                    <p className="leading-8 text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
