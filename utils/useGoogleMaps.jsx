import { useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

export function useGoogleMaps() {
  const libraries = useMemo(() => ["places"], []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });

  return { isLoaded };
}
