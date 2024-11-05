"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Bed, UtensilsCrossed, Wine, Store, Plus } from "lucide-react";

const categories = [
  { id: "hotel", icon: Bed },
  { id: "restaurant", icon: UtensilsCrossed },
  { id: "bar", icon: Wine },
  { id: "store", icon: Store },
  { id: "other", icon: Plus },
] as const;

interface CategorySelectionProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategorySelection({ selectedCategory, onSelect }: CategorySelectionProps) {
  const t = useTranslations("property.create.categories");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map(({ id, icon: Icon }) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card
            className={`relative cursor-pointer p-6 flex flex-col items-center justify-center gap-4 min-h-[200px] transition-colors
              ${selectedCategory === id ? 'border-primary' : 'hover:border-primary/50'}`}
            onClick={() => onSelect(id)}
          >
            <Icon className="w-16 h-16" />
            <h3 className="text-xl font-semibold text-center">{t(id)}</h3>
            
            {selectedCategory === id && (
              <motion.div
                layoutId="category-selection"
                className="absolute inset-0 border-2 border-primary rounded-lg"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}