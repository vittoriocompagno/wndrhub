"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { useAIInsights } from "@/hooks/use-ai-insights";

interface AIInsightsProps {
  className?: string;
}

export function AIInsights({ className }: AIInsightsProps) {
  const { insights, isLoading } = useAIInsights();

  if (isLoading || !insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">AI Insights</h2>
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="w-3 h-3" />
          AI Powered
        </Badge>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              {insight.trend === "up" ? (
                <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
              )}
              <div>
                <h3 className="font-medium">{insight.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}