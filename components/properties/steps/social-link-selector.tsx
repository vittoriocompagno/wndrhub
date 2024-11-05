"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Link as LinkIcon,
} from "lucide-react";

const socialPlatforms = [
  { id: "INSTAGRAM", icon: Instagram },
  { id: "FACEBOOK", icon: Facebook },
  { id: "TWITTER", icon: Twitter },
  { id: "LINKEDIN", icon: Linkedin },
  { id: "YOUTUBE", icon: Youtube },
  { id: "TIKTOK", icon: LinkIcon },
] as const;

interface SocialLinkSelectorProps {
  existingLinks: Array<{ platform: string; url: string }>;
  onAdd: (platform: string, url: string) => void;
  onRemove: (index: number) => void;
  canAddMore: boolean;
}

export function SocialLinkSelector({
  existingLinks,
  onAdd,
  onRemove,
  canAddMore,
}: SocialLinkSelectorProps) {
  const t = useTranslations("property.create.links.social");
  const [platform, setPlatform] = useState<string>("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (platform && url) {
      onAdd(platform, url);
      setPlatform("");
      setUrl("");
    }
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    const Icon = platform?.icon || LinkIcon;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      {existingLinks.map((link, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-4">
              {getPlatformIcon(link.platform)}
              <span className="flex-1">{link.url}</span>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onRemove(index)}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}

      {canAddMore && (
        <Card className="p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              value={platform}
              onValueChange={setPlatform}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectPlatform")} />
              </SelectTrigger>
              <SelectContent>
                {socialPlatforms.map(({ id }) => (
                  <SelectItem key={id} value={id}>
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(id)}
                      {t(id.toLowerCase())}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("urlPlaceholder")}
              />
              <Button
                onClick={handleAdd}
                disabled={!platform || !url}
              >
                {t("add")}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}