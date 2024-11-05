"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2 } from "lucide-react";
import { AddressSearchResults } from "./address-search-results";
import { PropertyMap } from "./property-map";
import { useDebounce } from "@/hooks/use-debounce";

interface AddressSelectionProps {
  address: string;
  onUpdate: (address: string) => void;
  onNext: () => void;
  onBack: () => void;
}

interface GeocodingResult {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}

interface GeocodingResponse {
  results: GeocodingResult[];
}

export function AddressSelection({ address, onUpdate, onNext, onBack }: AddressSelectionProps) {
  const t = useTranslations("property.create.address");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number } | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!debouncedSearch) {
      setResults([]);
      return;
    }

    const searchAddresses = async () => {
      try {
        // Cancel previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();
        setIsLoading(true);

        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(debouncedSearch)}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`,
          { signal: abortControllerRef.current.signal }
        );

        if (!response.ok) throw new Error('Geocoding request failed');

        const data = await response.json() as GeocodingResponse;
        setResults(data.results || []);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Geocoding error:', error);
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    searchAddresses();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearch]);

  const handleAddressSelect = (result: GeocodingResult) => {
    setSearchQuery(result.properties.formatted);
    onUpdate(result.properties.formatted);
    setSelectedLocation({
      lat: result.properties.lat,
      lon: result.properties.lon,
    });
    setResults([]);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address-search">{t("searchLabel")}</Label>
            <div className="relative">
              <Input
                id="address-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="pr-10"
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
              )}
              {!isLoading && searchQuery && (
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>

          {results.length > 0 && (
            <AddressSearchResults
              results={results}
              onSelect={handleAddressSelect}
            />
          )}

          {selectedLocation && (
            <div className="h-[300px] rounded-lg overflow-hidden">
              <PropertyMap
                lat={selectedLocation.lat}
                lon={selectedLocation.lon}
              />
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t("common.back")}
        </Button>
        <Button
          onClick={onNext}
          disabled={!address}
        >
          {t("common.next")}
        </Button>
      </div>
    </div>
  );
}