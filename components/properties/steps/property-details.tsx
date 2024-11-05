"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PropertyDetailsData {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
}

interface PropertyDetailsProps {
  data: PropertyDetailsData;
  onUpdate: (data: Partial<PropertyDetailsData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PropertyDetails({ data, onUpdate, onNext, onBack }: PropertyDetailsProps) {
  const t = useTranslations("property.create.details");
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpdate({ image: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid gap-6">
          {/* Image Upload */}
          <div>
            <Label>{t("image")}</Label>
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center
                ${isDragging ? "border-primary bg-primary/10" : "border-muted"}
                ${data.image ? "p-4" : "p-8"}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {data.image ? (
                <div className="relative w-full max-w-xl mx-auto aspect-video">
                  <Image
                    src={data.image}
                    alt="Property preview"
                    className="rounded-lg object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => onUpdate({ image: "" })}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                    id="image-upload"
                  />
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer text-primary hover:underline"
                  >
                    {t("uploadImage")}
                  </Label>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("dragAndDrop")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">{t("title")}</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder={t("titlePlaceholder")}
              />
            </div>

            <div>
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
                placeholder={t("descriptionPlaceholder")}
                rows={4}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={data.contactEmail}
                onChange={(e) => onUpdate({ contactEmail: e.target.value })}
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                type="tel"
                value={data.contactPhone}
                onChange={(e) => onUpdate({ contactPhone: e.target.value })}
                placeholder={t("phonePlaceholder")}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t("common.back")}
        </Button>
        <Button onClick={onNext}>
          {t("common.next")}
        </Button>
      </div>
    </div>
  );
}