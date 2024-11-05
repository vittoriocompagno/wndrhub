"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { CategorySelection } from "./steps/category-selection";
import { PropertyDetails } from "./steps/property-details";
import { AddressSelection } from "./steps/address-selection";
import { LinksSection } from "./steps/links-section";
import { StepIndicator } from "./step-indicator";

const steps = ["category", "details", "address", "links"] as const;
type Step = typeof steps[number];

interface CustomLink {
  title: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FormData {
  category: string;
  title: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
  address: string;
  customLinks: CustomLink[];
  socialLinks: SocialLink[];
}

export function PropertyCreationForm() {
  const t = useTranslations("property.create");
  const [currentStep, setCurrentStep] = useState<Step>("category");
  const [formData, setFormData] = useState<FormData>({
    category: "",
    title: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    image: "",
    address: "",
    customLinks: [],
    socialLinks: [],
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case "category":
        return (
          <CategorySelection
            selectedCategory={formData.category}
            onSelect={(category) => {
              updateFormData({ category });
              goToStep("details");
            }}
          />
        );
      case "details":
        return (
          <PropertyDetails
            data={formData}
            onUpdate={updateFormData}
            onNext={() => goToStep("address")}
            onBack={() => goToStep("category")}
          />
        );
      case "address":
        return (
          <AddressSelection
            address={formData.address}
            onUpdate={(address) => updateFormData({ address })}
            onNext={() => goToStep("links")}
            onBack={() => goToStep("details")}
          />
        );
      case "links":
        return (
          <LinksSection
            data={{
              customLinks: formData.customLinks,
              socialLinks: formData.socialLinks,
            }}
            onUpdate={(data) => updateFormData(data)}
            onBack={() => goToStep("address")}
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">{t("title")}</h1>
      
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}