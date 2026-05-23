/**
 * PLACES DATA LAYER
 * Typ-definitioner, mock-data och utilities för restauranger och butiker.
 * Byts mot Google Places API-anrop via services/googlePlaces.ts.
 */

export type PlaceType = "restaurant" | "shop";

export type RestaurantCategory = "Mat" | "Fika" | "Bar" | "Skaldjur";
export type ShopCategory = "Kläder" | "Mat & Dryck" | "Souvenirer" | "Övrigt";
export type PlaceCategory = RestaurantCategory | ShopCategory;

export interface Place {
  id: string;
  name: string;
  type: PlaceType;
  category: PlaceCategory;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  opensAt?: string;   // "08:00"
  openUntil?: string; // "22:00"
  openHours?: Record<string, string>; // { "Måndag": "11–22" }
  photos?: string[];
  googlePlaceId?: string;
}

/* ── Mock-data: Restauranger ── */
export const MOCK_RESTAURANTS: Place[] = [
  {
    id: "r1",
    name: "Hamnkrogen",
    type: "restaurant",
    category: "Skaldjur",
    lat: 58.2756,
    lng: 11.4406,
    address: "Hamntorget 1, Lysekil",
    phone: "+46 523-123 45",
    rating: 4.6,
    reviewCount: 128,
    opensAt: "11:00",
    openUntil: "22:00",
    openHours: {
      Måndag: "11–22",
      Tisdag: "11–22",
      Onsdag: "11–22",
      Torsdag: "11–22",
      Fredag: "11–23",
      Lördag: "11–23",
      Söndag: "11–21",
    },
  },
  {
    id: "r2",
    name: "Strandvillan",
    type: "restaurant",
    category: "Mat",
    lat: 58.278,
    lng: 11.438,
    address: "Strandgatan 12, Lysekil",
    rating: 4.4,
    reviewCount: 85,
    opensAt: "17:00",
    openUntil: "23:00",
    openHours: {
      Måndag: "Stängt",
      Tisdag: "17–23",
      Onsdag: "17–23",
      Torsdag: "17–23",
      Fredag: "17–24",
      Lördag: "16–24",
      Söndag: "16–22",
    },
  },
  {
    id: "r3",
    name: "Bryggan Café",
    type: "restaurant",
    category: "Fika",
    lat: 58.2765,
    lng: 11.442,
    address: "Bryggavägen 3, Lysekil",
    rating: 4.7,
    reviewCount: 210,
    opensAt: "08:00",
    openUntil: "18:00",
    openHours: {
      Måndag: "08–18",
      Tisdag: "08–18",
      Onsdag: "08–18",
      Torsdag: "08–18",
      Fredag: "08–19",
      Lördag: "09–19",
      Söndag: "10–17",
    },
  },
  {
    id: "r4",
    name: "Pinneviks Restaurang",
    type: "restaurant",
    category: "Mat",
    lat: 58.273,
    lng: 11.445,
    address: "Pinneviksvägen 8, Lysekil",
    rating: 4.2,
    reviewCount: 63,
    opensAt: "11:00",
    openUntil: "21:00",
  },
  {
    id: "r5",
    name: "Havet Bar & Kök",
    type: "restaurant",
    category: "Bar",
    lat: 58.2772,
    lng: 11.439,
    address: "Kungsgatan 5, Lysekil",
    rating: 4.3,
    reviewCount: 97,
    opensAt: "16:00",
    openUntil: "01:00",
  },
];

/* ── Mock-data: Butiker ── */
export const MOCK_SHOPS: Place[] = [
  {
    id: "s1",
    name: "Havets Gåvor",
    type: "shop",
    category: "Souvenirer",
    lat: 58.2758,
    lng: 11.441,
    address: "Storgatan 4, Lysekil",
    rating: 4.5,
    reviewCount: 44,
    opensAt: "10:00",
    openUntil: "18:00",
  },
  {
    id: "s2",
    name: "Lysekils Fisk & Delikatess",
    type: "shop",
    category: "Mat & Dryck",
    lat: 58.276,
    lng: 11.4415,
    address: "Hamngatan 2, Lysekil",
    phone: "+46 523-456 78",
    rating: 4.8,
    reviewCount: 112,
    opensAt: "09:00",
    openUntil: "17:00",
  },
  {
    id: "s3",
    name: "Skärgårdsmode",
    type: "shop",
    category: "Kläder",
    lat: 58.277,
    lng: 11.44,
    address: "Kungsgatan 8, Lysekil",
    rating: 4.1,
    reviewCount: 29,
    opensAt: "10:00",
    openUntil: "18:00",
  },
  {
    id: "s4",
    name: "ICA Nära Lysekil",
    type: "shop",
    category: "Mat & Dryck",
    lat: 58.2775,
    lng: 11.438,
    address: "Storgatan 15, Lysekil",
    rating: 3.9,
    reviewCount: 78,
    opensAt: "07:00",
    openUntil: "22:00",
  },
];

/* ── Utilities ── */

/**
 * Filtrerar platser på kategori.
 * "all" returnerar alla.
 */
export function filterPlaces(places: Place[], category: string): Place[] {
  if (category === "all") return places;
  return places.filter((p) => p.category === category);
}

/**
 * Avgör om en plats är öppen just nu baserat på opensAt/openUntil.
 * Hanterar midnatt (openUntil "01:00" = nästa dag).
 */
export function isOpenNow(place: Pick<Place, "opensAt" | "openUntil">): boolean {
  if (!place.openUntil || !place.opensAt) return false;

  const now = new Date();
  const [openH, openM] = place.opensAt.split(":").map(Number);
  const [closeH, closeM] = place.openUntil.split(":").map(Number);

  const todayOpen = new Date(now);
  todayOpen.setHours(openH, openM, 0, 0);

  const todayClose = new Date(now);
  todayClose.setHours(closeH, closeM, 0, 0);

  // Om stängningstid < öppningstid → stänger efter midnatt
  if (todayClose <= todayOpen) {
    todayClose.setDate(todayClose.getDate() + 1);
  }

  return now >= todayOpen && now < todayClose;
}

/**
 * Returnerar öppet/stängt-text och nästa händelse.
 * Ex: { open: true, label: "Stänger 22:00" }
 *     { open: false, label: "Öppnar 11:00" }
 */
export function getOpenStatus(place: Place): { open: boolean; label: string } {
  const open = isOpenNow(place);
  if (open) {
    return { open: true, label: `Stänger ${place.openUntil}` };
  }
  return { open: false, label: place.opensAt ? `Öppnar ${place.opensAt}` : "Stängt" };
}
