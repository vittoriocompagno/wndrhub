"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface SubscriptionData {
  tier: "FREE" | "PRO" | "PREMIUM";
  isTrialActive: boolean;
  trialDaysLeft: number;
}

export function useSubscription(): SubscriptionData {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    tier: "FREE",
    isTrialActive: true,
    trialDaysLeft: 14,
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('users')
        .select('subscription_tier, subscription_start_date, subscription_end_date')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Failed to fetch subscription:", error);
        return;
      }

      if (data) {
        const startDate = new Date(data.subscription_start_date);
        const endDate = data.subscription_end_date ? new Date(data.subscription_end_date) : null;
        const now = new Date();

        // Calculate trial days left
        const trialDaysLeft = endDate 
          ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
          : 0;

        setSubscriptionData({
          tier: data.subscription_tier,
          isTrialActive: trialDaysLeft > 0,
          trialDaysLeft,
        });
      }
    };

    fetchSubscription();
  }, [supabase]);

  return subscriptionData;
}