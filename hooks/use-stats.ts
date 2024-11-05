"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Stats {
  totalProperties: number;
  totalViews: number;
  averageViews: number;
  forecastTrend: string;
}

export function useStats() {
  const [data, setData] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: properties, error: propertiesError } = await supabase
          .from('properties')
          .select('id, page_views')
          .eq('user_id', user.id);

        if (propertiesError) throw propertiesError;

        const totalProperties = properties.length;
        const totalViews = properties.reduce((sum, p) => sum + (p.page_views || 0), 0);
        const averageViews = totalProperties ? totalViews / totalProperties : 0;

        setData({
          totalProperties,
          totalViews,
          averageViews,
          forecastTrend: "Upward trend predicted",
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { data, isLoading };
}