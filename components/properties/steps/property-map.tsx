"use client";

import { useEffect, useRef } from "react";

interface PropertyMapProps {
  lat: number;
  lon: number;
}

export function PropertyMap({ lat, lon }: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple placeholder for now
    if (!mapContainer.current) return;
    
    mapContainer.current.innerHTML = `
      <div class="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <p class="text-muted-foreground">Map location: ${lat}, ${lon}</p>
      </div>
    `;
  }, [lat, lon]);

  return <div ref={mapContainer} className="w-full h-full min-h-[300px] rounded-lg" />;
}