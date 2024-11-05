"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Property {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  address: string;
  pageViews: number;
  createdAt: string;
}

export function useProperties() {
  const [data, setData] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data: properties, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (propertiesError) throw propertiesError;

        setData(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { data, isLoading, error };
}