"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, Plus, AlertCircle } from "lucide-react";
import { SocialLinkSelector } from "./social-link-selector";
import { SubscriptionBanner } from "./subscription-banner";
import { useSubscription } from "@/hooks/use-subscription";

interface LinksData {
  customLinks: Array<{ title: string; url: string }>;
  socialLinks: Array<{ platform: string; url: string }>;
}

interface LinksSectionProps {
  data: LinksData;
  onUpdate: (data: Partial<LinksData>) => void;
  onBack: () => void;
}

export function LinksSection({ data, onUpdate, onBack }: LinksSectionProps) {
  const [activeTab, setActiveTab] = useState("custom");
  const { tier, isTrialActive, trialDaysLeft } = useSubscription();
  
  const maxLinks = {
    FREE: 1,
    PRO: 10,
    PREMIUM: Infinity,
  }[tier];

  const totalLinks = data.customLinks.length + data.socialLinks.length;
  const canAddMore = totalLinks < maxLinks;

  const handleAddCustomLink = () => {
    if (!canAddMore) return;
    
    onUpdate({
      customLinks: [
        ...data.customLinks,
        { title: "", url: "" }
      ]
    });
  };

  const handleUpdateCustomLink = (index: number, field: "title" | "url", value: string) => {
    const updatedLinks = [...data.customLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    onUpdate({ customLinks: updatedLinks });
  };

  const handleRemoveCustomLink = (index: number) => {
    const updatedLinks = data.customLinks.filter((_, i) => i !== index);
    onUpdate({ customLinks: updatedLinks });
  };

  const handleAddSocialLink = (platform: string, url: string) => {
    if (!canAddMore) return;

    onUpdate({
      socialLinks: [
        ...data.socialLinks,
        { platform, url }
      ]
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    const updatedLinks = data.socialLinks.filter((_, i) => i !== index);
    onUpdate({ socialLinks: updatedLinks });
  };

  return (
    <div className="space-y-8">
      {isTrialActive && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Trial active: {trialDaysLeft} days remaining
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="flex gap-2 border-b">
          <Button
            variant={activeTab === "custom" ? "default" : "ghost"}
            onClick={() => setActiveTab("custom")}
          >
            Custom Links
          </Button>
          <Button
            variant={activeTab === "social" ? "default" : "ghost"}
            onClick={() => setActiveTab("social")}
          >
            Social Links
          </Button>
        </div>

        <div className="mt-4">
          {activeTab === "custom" ? (
            <div className="space-y-4">
              {data.customLinks.map((link, index) => (
                <Card key={index} className="p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Link Title</Label>
                      <Input
                        value={link.title}
                        onChange={(e) => handleUpdateCustomLink(index, "title", e.target.value)}
                        placeholder="Enter link title"
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={link.url}
                          onChange={(e) => handleUpdateCustomLink(index, "url", e.target.value)}
                          placeholder="Enter URL"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveCustomLink(index)}
                        >
                          <Link className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {canAddMore && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddCustomLink}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Link
                </Button>
              )}
            </div>
          ) : (
            <SocialLinkSelector
              existingLinks={data.socialLinks}
              onAdd={handleAddSocialLink}
              onRemove={handleRemoveSocialLink}
              canAddMore={canAddMore}
            />
          )}
        </div>
      </div>

      {!canAddMore && tier !== "PREMIUM" && (
        <SubscriptionBanner currentTier={tier} />
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Save
        </Button>
      </div>
    </div>
  );
}