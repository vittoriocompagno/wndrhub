import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropertyCreationForm } from "@/components/properties/property-creation-form";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("property.create");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CreatePropertyPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PropertyCreationForm />
    </main>
  );
}