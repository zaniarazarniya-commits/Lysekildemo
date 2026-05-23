/**
 * GOOGLE PLACES SERVICE
 * Stub som returnerar mock-data.
 * Byt ut fetchFromGoogle() mot riktigt API-anrop när nyckel finns.
 * Interface förblir detsamma — inga ändringar i skärmarna behövs.
 */

import { Place, MOCK_RESTAURANTS, MOCK_SHOPS } from "../data/places";

interface FetchPlacesOptions {
  type: "restaurant" | "shop";
  location: { lat: number; lng: number };
  radius?: number; // meter, default 2000
}

// Byt ut denna funktion mot riktigt API-anrop:
// async function fetchFromGoogle(options: FetchPlacesOptions): Promise<Place[]> {
//   const apiKey = process.env.GOOGLE_PLACES_API_KEY;
//   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
//     + `?location=${options.location.lat},${options.location.lng}`
//     + `&radius=${options.radius ?? 2000}`
//     + `&type=${options.type === "restaurant" ? "restaurant" : "store"}`
//     + `&key=${apiKey}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   return data.results.map(mapGooglePlaceToPlace);
// }

export async function fetchPlaces(options: FetchPlacesOptions): Promise<Place[]> {
  // TODO: ersätt med fetchFromGoogle(options) när API-nyckel är konfigurerad
  await new Promise((r) => setTimeout(r, 0)); // simulerar async
  return options.type === "restaurant" ? MOCK_RESTAURANTS : MOCK_SHOPS;
}
