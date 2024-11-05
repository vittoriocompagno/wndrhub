"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface SubscriptionBannerProps {
  currentTier: string;
}

export function SubscriptionBanner({ currentTier }: SubscriptionBannerProps) {
  const t = useTranslations("property.create.links.subscription");

  return (
    <Card className="p-6 bg-primary/5 border-primary/20">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {currentTier === "FREE" ? t("upgradeTitle") : t("goUnlimitedTitle")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentTier === "FREE" ? t("upgradeDescription") : t("goUnlimitedDescription")}
          </p>
        </div>
        <Button className="ml-4">
          {t("upgrade")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}