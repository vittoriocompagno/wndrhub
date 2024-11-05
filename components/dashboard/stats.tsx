"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useStats } from "@/hooks/use-stats";
import {
  Home,
  Eye,
  TrendingUp,
  LineChart,
  Loader2,
} from "lucide-react";

export function DashboardStats() {
  const t = useTranslations("dashboard.stats");
  const { data, isLoading } = useStats();

  const stats = [
    { 
      id: "properties",
      label: t("totalProperties"),
      value: data?.totalProperties || 0,
      icon: Home,
    },
    {
      id: "views",
      label: t("totalViews"),
      value: data?.totalViews || 0,
      icon: Eye,
    },
    {
      id: "average",
      label: t("averageViews"),
      value: data?.averageViews?.toFixed(2) || "0.00",
      icon: TrendingUp,
    },
    {
      id: "trend",
      label: t("forecastTrend"),
      value: data?.forecastTrend || t("noData"),
      icon: LineChart,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ id, label, value, icon: Icon }, index) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Icon className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}