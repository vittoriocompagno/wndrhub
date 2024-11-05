"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function PropertyGrid() {
  const t = useTranslations("dashboard.properties");
  const router = useRouter();
  const { data: properties, isLoading, error } = useProperties();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t("error")}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.refresh()}
        >
          {t("retry")}
        </Button>
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">{t("empty.title")}</h3>
        <p className="text-muted-foreground mb-6">{t("empty.description")}</p>
        <Button
          onClick={() => router.push("/properties/create")}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          {t("empty.action")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}