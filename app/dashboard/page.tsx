import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardStats } from '@/components/dashboard/stats';
import { PropertyGrid } from '@/components/dashboard/property-grid';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <DashboardStats />
        <PropertyGrid />
      </main>
    </div>
  );
}