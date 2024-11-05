"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Insight {
  title: string;
  description: string;
  trend: "up" | "down";
}

export function useAIInsights() {
  const [insights, setInsights] = useState<Insight[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch analytics data from Supabase
        const { data: analytics, error } = await supabase
          .from('property_analytics')
          .select(`
            property_id,
            event_type,
            created_at
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;

        // Process analytics to generate insights
        // This would typically be done by an AI service
        // For now, we'll return mock insights
        setInsights([
          {
            title: "Increasing Engagement",
            description: "Your properties are seeing 23% more views compared to last week",
            trend: "up",
          },
          {
            title: "Popular Times",
            description: "Most visitors view your properties between 2 PM and 6 PM",
            trend: "up",
          },
          {
            title: "Optimization Needed",
            description: "Adding more images could increase engagement by 40%",
            trend: "down",
          },
        ]);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return { insights, isLoading };
}