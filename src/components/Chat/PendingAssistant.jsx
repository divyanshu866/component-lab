"use client";

import { useEffect, useState } from "react";
import { Cpu, Sparkles } from "lucide-react";
import Image from "next/image";

const steps = [
  "Thinking through your request",
  "Planning the response",
  "Writing your response",
];

const PendingAssistant = () => {
  const [step, setStep] = useState(0);
  const isWriting = step === steps.length - 1;

  useEffect(() => {
    if (step === steps.length - 1) return;

    const timeout = setTimeout(() => setStep((current) => current + 1), 2800);
    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div
      className="cl-pending mt-2 flex w-full max-w-[96%] justify-start sm:max-w-[94%]"
      role="status"
      aria-live="polite"
      aria-label={`ComponentLab: ${steps[step]}`}
    >
      <div className="flex items-start gap-3 py-1">
        <div className="flex flex-col gap-1">
          <span
            key={step}
            className={
              isWriting
                ? "cl-pending-enter text-sm font-medium leading-5 text-white/75"
                : "cl-pending-enter cl-pending-shimmer text-sm font-medium leading-5"
            }
            aria-hidden="true"
          >
            {steps[step]}
            {isWriting && (
              <span className="ml-1 inline-block h-3 w-px animate-pulse bg-white/50 align-[-1px] motion-reduce:animate-none" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PendingAssistant;
