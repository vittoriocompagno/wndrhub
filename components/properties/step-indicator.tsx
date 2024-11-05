"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = ["category", "details", "address", "links"] as const;
type Step = typeof steps[number];

interface StepIndicatorProps {
  steps: readonly Step[];
  currentStep: Step;
  onStepClick: (step: Step) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  const t = useTranslations("property.create.steps");

  return (
    <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center gap-4">
        {steps.map((step, index) => {
          const isCompleted = steps.indexOf(currentStep) > index;
          const isCurrent = currentStep === step;

          return (
            <motion.button
              key={step}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center
                ${isCurrent ? 'bg-primary' : isCompleted ? 'bg-primary/80' : 'bg-muted'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onStepClick(step)}
            >
              {isCompleted ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}

              <span className="absolute left-14 whitespace-nowrap text-sm">
                {t(step)}
              </span>

              {index < steps.length - 1 && (
                <div className={`absolute top-full w-0.5 h-4
                  ${isCompleted ? 'bg-primary' : 'bg-muted'}`}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}