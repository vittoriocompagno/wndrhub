"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface AddressSearchResultsProps {
  results: Array<{
    properties: {
      formatted: string;
      lat: number;
      lon: number;
    };
  }>;
  onSelect: (result: any) => void;
}

export function AddressSearchResults({ results, onSelect }: AddressSearchResultsProps) {
  const t = useTranslations("property.create.address");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute z-10 mt-1 w-full bg-card rounded-lg shadow-lg border border-border overflow-hidden"
      >
        <div className="max-h-60 overflow-auto">
          {results.map((result, index) => (
            <motion.button
              key={`${result.properties.formatted}-${index}`}
              className="w-full px-4 py-3 text-left hover:bg-muted flex items-start gap-3 transition-colors"
              onClick={() => onSelect(result)}
              whileHover={{ backgroundColor: "hsl(var(--muted))" }}
              whileTap={{ scale: 0.99 }}
            >
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-muted-foreground" />
              <span className="text-sm">{result.properties.formatted}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}