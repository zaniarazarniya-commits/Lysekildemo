/**
 * POI DATA LAYER
 * Offline-first data structure for Lysekil points of interest.
 */

export type POICategory =
    | "restaurant"
    | "beach"
    | "parking"
    | "charging"
    | "toilet"
    | "bus"
    | "shop"
    | "hotel"
    | "recycling"
    | "atm";

export interface POI {
    id: string;
    name: string;
    category: POICategory;
    lat: number;
    lng: number;
    description: string;
    meta: string;
    openHours?: string;
    phone?: string;
    website?: string;
    accessibility?: boolean;
}

export const CATEGORY_CONFIG: Record<
    POICategory,
    { label: string; icon: string; color: string }
> = {
    restaurant: { label: "Restaurang", icon: "utensils", color: "#f5576c" },
    beach: { label: "Badplats", icon: "waves", color: "#4facfe" },
    parking: { label: "Parkering", icon: "car", color: "#5A5A5A" },
    charging: { label: "Laddstation", icon: "zap", color: "#43e97b" },
    toilet: { label: "Toalett", icon: "toilet", color: "#667eea" },
    bus: { label: "Busshållplats", icon: "bus", color: "#D4A017" },
    shop: { label: "Butik", icon: "shopping-bag", color: "#f093fb" },
    hotel: { label: "Boende", icon: "bed", color: "#764ba2" },
    recycling: { label: "Miljöstation", icon: "recycle", color: "#4A7C59" },
    atm: { label: "Bankomat", icon: "banknote", color: "#3D3D3D" },
};

export const POI_DATA: POI[] = [
    {
        id: "r1",
        name: "Hamnkrogen",
        category: "restaurant",
        lat: 58.2756,
        lng: 11.4406,
        description: "Fisk & skaldjur vid gästhamnen",
        meta: "Öppet 11–22",
        openHours: "11:00-22:00",
        phone: "+46 523-12345",
    },
    {
        id: "r2",
        name: "Strandvillan",
        category: "restaurant",
        lat: 58.278,
        lng: 11.438,
        description: "Middag med havsutsikt",
        meta: "Öppet 17–23",
        openHours: "17:00-23:00",
    },
    {
        id: "r3",
        name: "Bryggan Café",
        category: "restaurant",
        lat: 58.2765,
        lng: 11.442,
        description: "Fika och lättare lunch",
        meta: "Öppet 08–18",
        openHours: "08:00-18:00",
    },
    {
        id: "r4",
        name: "Pinneviks Restaurang",
        category: "restaurant",
        lat: 58.273,
        lng: 11.445,
        description: "Familjevänligt vid badplatsen",
        meta: "Öppet 11–21",
        openHours: "11:00-21:00",
    },
    {
        id: "b1",
        name: "Pinneviken",
        category: "beach",
        lat: 58.2728,
        lng: 11.4448,
        description: "Brygga & sandstrand. Tillgänglighetsanpassad.",
        meta: "Vattentemp: 14°C",
        accessibility: true,
    },
    {
        id: "b2",
        name: "Stångehuvud",
        category: "beach",
        lat: 58.268,
        lng: 11.425,
        description: "Klippbad i naturreservat. Röda graniter.",
        meta: "Vattentemp: 13°C",
    },
    {
        id: "b3",
        name: "Havsbadsparken",
        category: "beach",
        lat: 58.28,
        lng: 11.435,
        description: "Centralt beläget med brygga.",
        meta: "Vattentemp: 14°C",
    },
    {
        id: "p1",
        name: "Gästhamnsparkering",
        category: "parking",
        lat: 58.275,
        lng: 11.441,
        description: "Stor parkering vid hamnen",
        meta: "Avgift 10 kr/tim",
    },
    {
        id: "p2",
        name: "Pinneviks P-plats",
        category: "parking",
        lat: 58.2725,
        lng: 11.444,
        description: "Nära badplatsen",
        meta: "Gratis",
    },
    {
        id: "c1",
        name: "Gästhamnen Laddning",
        category: "charging",
        lat: 58.2752,
        lng: 11.4408,
        description: "2 snabbladdare (50 kW)",
        meta: "Kostnad: 4 kr/kWh",
    },
    {
        id: "t1",
        name: "Toalett Gästhamnen",
        category: "toilet",
        lat: 58.2758,
        lng: 11.44,
        description: "Handikappanpassad",
        meta: "Öppet 06–22",
        accessibility: true,
    },
    {
        id: "t2",
        name: "Toalett Pinneviken",
        category: "toilet",
        lat: 58.2732,
        lng: 11.4445,
        description: "Säsongsöppen",
        meta: "Öppet 08–20",
    },
    {
        id: "bus1",
        name: "Lysekil Resecentrum",
        category: "bus",
        lat: 58.2785,
        lng: 11.4365,
        description: "Huvudbusstation",
        meta: "Västtrafik",
    },
];

/**
 * Filter POIs by active category.
 * "all" returns everything.
 */
export function filterPOIs(
    pois: POI[],
    activeFilter: POICategory | "all"
): POI[] {
    if (activeFilter === "all") return pois;
    return pois.filter((p) => p.category === activeFilter);
}

/**
 * Calculate distance in meters between two lat/lng points (Haversine).
 */
export function getDistanceMeters(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): number {
    const R = 6371e3;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
