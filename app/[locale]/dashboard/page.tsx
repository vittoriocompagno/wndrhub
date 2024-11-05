import { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardStats } from "@/components/dashboard/stats";
import { PropertyGrid } from "@/components/dashboard/property-grid";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { Loader } from "@/components/ui/loader";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("dashboard");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loader className="w-8 h-8" />}>
          <DashboardStats />
          <AIInsights className="my-8" />
          <PropertyGrid />
        </Suspense>
      </main>
    </div>
  );
}