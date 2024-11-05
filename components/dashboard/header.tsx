"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { Plus } from "lucide-react";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.push("/properties/create")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}