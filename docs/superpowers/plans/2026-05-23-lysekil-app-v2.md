# Lysekil App v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Lysekil-appen från kommunguide till en fokuserad app för restauranger, butiker, evenemang och färjan till Fiskebäckskil.

**Architecture:** React Native (Expo) med TypeScript. Befintligt designsystem (theme.ts) återanvänds oförändrat. Mock-data i TypeScript-arrayer tills vidare — Google Places API och Västtrafik API kopplas på sist via service-stubs som redan har rätt interface. Navigation: React Navigation Bottom Tabs (6 flikar) + Native Stack per flik för detaljsidor.

**Tech Stack:** Expo SDK, React Navigation v6, lucide-react-native, TypeScript, Jest (tester)

---

## Filstruktur

```
src/
├── theme.ts                        ✅ oförändrad
├── App.tsx                         🔄 ny 6-fliks-navigation
├── i18n/
│   ├── index.ts                    🆕 useTranslation-hook
│   ├── sv.ts                       🆕 svenska strängar
│   └── en.ts                       🆕 engelska strängar
├── data/
│   ├── pois.ts                     ✅ oförändrad (karta)
│   ├── places.ts                   🆕 Place-typ + mock-data + utilities
│   └── events.ts                   🆕 Event-typ + mock-data + utilities
├── services/
│   ├── googlePlaces.ts             🆕 stub → riktig API (task 14)
│   └── vasttrafik.ts               🆕 stub → riktig API (task 14)
├── components/
│   └── PlaceCard.tsx               🆕 delad kort-komponent
├── screens/
│   ├── HomeScreen.tsx              🔄 omskriven
│   ├── RestaurantsScreen.tsx       🆕
│   ├── ShopsScreen.tsx             🆕
│   ├── PlaceDetailScreen.tsx       🆕
│   ├── EventsScreen.tsx            🆕
│   ├── MapScreen.tsx               🔄 anpassad (från components/)
│   └── FerryScreen.tsx             🔄 anpassad (från features/FerryDirect)
└── __tests__/
    ├── places.test.ts              🆕
    ├── events.test.ts              🆕
    └── services.test.ts            🆕
```

---

## Task 1: Expo-projekt + beroenden

**Files:**
- Create: `package.json`
- Create: `app.json`
- Create: `tsconfig.json`
- Create: `babel.config.js`
- Delete: `src/features/CoastWeather.tsx`
- Delete: `src/features/HarborLive.tsx`

- [ ] **Steg 1: Initiera Expo-projekt med TypeScript**

```bash
npx create-expo-app@latest . --template blank-typescript
```

Kör i projektmappen. Svara "y" om den frågar om att skriva över filer — vi behåller vår src/.

- [ ] **Steg 2: Installera beroenden**

```bash
npx expo install react-native-maps
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npm install lucide-react-native
npx expo install expo-notifications expo-location
npm install --save-dev jest @types/jest jest-expo @testing-library/react-native @testing-library/jest-native
```

- [ ] **Steg 3: Konfigurera Jest i package.json**

Öppna `package.json` och lägg till/ersätt jest-sektionen:

```json
{
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|lucide-react-native)"
    ]
  }
}
```

- [ ] **Steg 4: Ta bort utgångna filer**

```bash
rm src/features/CoastWeather.tsx
rm src/features/HarborLive.tsx
rm src/components/HomeScreen.tsx
```

Vi skriver HomeScreen från scratch i screens/ istället.

- [ ] **Steg 5: Flytta MapScreen till screens/**

```bash
mv src/components/MapScreen.tsx src/screens/MapScreen.tsx
cp src/features/FerryDirect.tsx src/screens/FerryScreen.tsx
```

- [ ] **Steg 6: Verifiera att Expo startar**

```bash
npx expo start
```

Förväntat: Metro bundler startar utan fel. App.tsx ger ett fel om saknade imports — det är ok, vi fixar i Task 12.

- [ ] **Steg 7: Commit**

```bash
git add -A
git commit -m "chore: initialize expo project + install dependencies"
```

---

## Task 2: Data layer — places.ts

**Files:**
- Create: `src/data/places.ts`
- Create: `src/__tests__/places.test.ts`

- [ ] **Steg 1: Skriv testerna först**

Skapa `src/__tests__/places.test.ts`:

```typescript
import {
  filterPlaces,
  isOpenNow,
  MOCK_RESTAURANTS,
  MOCK_SHOPS,
} from "../data/places";

describe("filterPlaces", () => {
  const restaurants = MOCK_RESTAURANTS;

  it("returnerar alla ställen när filter är 'all'", () => {
    expect(filterPlaces(restaurants, "all")).toHaveLength(restaurants.length);
  });

  it("filtrerar på kategori", () => {
    const fikaPlaces = filterPlaces(restaurants, "Fika");
    expect(fikaPlaces.every((p) => p.category === "Fika")).toBe(true);
  });

  it("returnerar tom array om ingen matchar", () => {
    expect(filterPlaces(restaurants, "FinnsInte")).toHaveLength(0);
  });
});

describe("isOpenNow", () => {
  it("returnerar true om openUntil är i framtiden samma dag", () => {
    // Mocka kl 14:00
    jest.useFakeTimers().setSystemTime(new Date("2026-05-23T14:00:00"));
    expect(isOpenNow({ opensAt: "11:00", openUntil: "22:00" })).toBe(true);
    jest.useRealTimers();
  });

  it("returnerar false om openUntil redan passerat", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-05-23T23:00:00"));
    expect(isOpenNow({ opensAt: "11:00", openUntil: "22:00" })).toBe(false);
    jest.useRealTimers();
  });

  it("returnerar false om inte öppnat ännu", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-05-23T09:00:00"));
    expect(isOpenNow({ opensAt: "11:00", openUntil: "22:00" })).toBe(false);
    jest.useRealTimers();
  });

  it("returnerar false om openUntil saknas", () => {
    expect(isOpenNow({})).toBe(false);
  });
});
```

- [ ] **Steg 2: Kör testerna och verifiera att de misslyckas**

```bash
npx jest src/__tests__/places.test.ts --no-coverage
```

Förväntat: FAIL — "Cannot find module '../data/places'"

- [ ] **Steg 3: Skapa src/data/places.ts**

```typescript
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
```

- [ ] **Steg 4: Kör testerna och verifiera att de passerar**

```bash
npx jest src/__tests__/places.test.ts --no-coverage
```

Förväntat: PASS — 6 tester

- [ ] **Steg 5: Commit**

```bash
git add src/data/places.ts src/__tests__/places.test.ts
git commit -m "feat: add places data layer with mock data and utilities"
```

---

## Task 3: Data layer — events.ts

**Files:**
- Create: `src/data/events.ts`
- Create: `src/__tests__/events.test.ts`

- [ ] **Steg 1: Skriv testerna först**

Skapa `src/__tests__/events.test.ts`:

```typescript
import { getTodayEvents, getUpcomingEvents, MOCK_EVENTS } from "../data/events";

describe("getTodayEvents", () => {
  it("returnerar bara event med dagens datum", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-05-24T12:00:00"));
    const today = getTodayEvents(MOCK_EVENTS);
    expect(today.every((e) => e.date === "2026-05-24")).toBe(true);
    jest.useRealTimers();
  });

  it("returnerar tom array om inga event idag", () => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01T12:00:00"));
    expect(getTodayEvents(MOCK_EVENTS)).toHaveLength(0);
    jest.useRealTimers();
  });
});

describe("getUpcomingEvents", () => {
  it("returnerar event efter idag, sorterade på datum", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-05-23T12:00:00"));
    const upcoming = getUpcomingEvents(MOCK_EVENTS);
    expect(upcoming.length).toBeGreaterThan(0);
    // Ska vara sorterade
    for (let i = 1; i < upcoming.length; i++) {
      expect(upcoming[i].date >= upcoming[i - 1].date).toBe(true);
    }
    jest.useRealTimers();
  });

  it("exkluderar event som är idag eller tidigare", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-05-24T12:00:00"));
    const upcoming = getUpcomingEvents(MOCK_EVENTS);
    expect(upcoming.every((e) => e.date > "2026-05-24")).toBe(true);
    jest.useRealTimers();
  });
});
```

- [ ] **Steg 2: Kör testerna och verifiera att de misslyckas**

```bash
npx jest src/__tests__/events.test.ts --no-coverage
```

Förväntat: FAIL — "Cannot find module '../data/events'"

- [ ] **Steg 3: Skapa src/data/events.ts**

```typescript
/**
 * EVENTS DATA LAYER
 * Typ-definitioner, mock-data och utilities för evenemangskalendern.
 * Byts mot CMS/API senare — interfacet förblir detsamma.
 */

export interface AppEvent {
  id: string;
  title: string;
  description: string;
  date: string;       // ISO 8601: "2026-05-24"
  timeStart?: string; // "10:00"
  timeEnd?: string;   // "16:00"
  location: string;
}

/* ── Mock-data ── */
export const MOCK_EVENTS: AppEvent[] = [
  {
    id: "ev1",
    title: "Lysekils Fiskemarked",
    description: "Färsk fisk, räkor och lokala delikatesser direkt från båten.",
    date: "2026-05-24",
    timeStart: "10:00",
    timeEnd: "16:00",
    location: "Hamntorget",
  },
  {
    id: "ev2",
    title: "Konsertkväll vid hamnen",
    description: "Livemusik med lokal artist vid gästhamnen. Gratis inträde.",
    date: "2026-05-28",
    timeStart: "19:00",
    location: "Gästhamnen",
  },
  {
    id: "ev3",
    title: "Midsommarfirande",
    description: "Traditionellt midsommarfirande med dans kring stången.",
    date: "2026-06-01",
    location: "Stadsparken",
  },
  {
    id: "ev4",
    title: "Havets Dag",
    description: "Familjedag med aktiviteter, guidade turer och utställningar.",
    date: "2026-06-07",
    timeStart: "11:00",
    timeEnd: "18:00",
    location: "Hamntorget",
  },
  {
    id: "ev5",
    title: "Lysekils Sjöfartsdag",
    description: "Båtparad, sjöräddningsövning och fika.",
    date: "2026-06-14",
    timeStart: "12:00",
    location: "Gästhamnen",
  },
];

/* ── Utilities ── */

/** Returnerar event som äger rum exakt idag. */
export function getTodayEvents(events: AppEvent[]): AppEvent[] {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  return events.filter((e) => e.date === today);
}

/** Returnerar kommande event (efter idag), sorterade på datum. */
export function getUpcomingEvents(events: AppEvent[]): AppEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return events
    .filter((e) => e.date > today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Formaterar datum till "Lördag 24 maj". */
export function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate + "T12:00:00"); // mittdag för att undvika timezone-problem
  return date.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Returnerar dag + månads-förkortning som { day: "24", month: "maj" }. */
export function getDateBadge(isoDate: string): { day: string; month: string } {
  const date = new Date(isoDate + "T12:00:00");
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString("sv-SE", { month: "short" }),
  };
}
```

- [ ] **Steg 4: Kör testerna och verifiera att de passerar**

```bash
npx jest src/__tests__/events.test.ts --no-coverage
```

Förväntat: PASS — 4 tester

- [ ] **Steg 5: Commit**

```bash
git add src/data/events.ts src/__tests__/events.test.ts
git commit -m "feat: add events data layer with mock data and utilities"
```

---

## Task 4: PlaceCard-komponent

**Files:**
- Create: `src/components/PlaceCard.tsx`

- [ ] **Steg 1: Skapa src/components/PlaceCard.tsx**

```typescript
/**
 * PLACE CARD
 * Återanvänd kort-komponent för restauranger och butiker.
 * Används i RestaurantsScreen, ShopsScreen och MapScreen.
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Star, Clock, Circle } from "lucide-react-native";
import { colors, shadows, radius, spacing, typography } from "../theme";
import { Place, getOpenStatus } from "../data/places";

const { width } = Dimensions.get("window");

interface PlaceCardProps {
  place: Place;
  onPress: (place: Place) => void;
}

// Kategori → bakgrundsfärg för fotoplats (tills Google Photos kopplas)
const CATEGORY_COLORS: Record<string, [string, string]> = {
  Skaldjur:    ["#1B4B66", "#2D6A8E"],
  Mat:         ["#2D6A8E", "#4A8BAF"],
  Fika:        ["#4A7C59", "#5A7D6B"],
  Bar:         ["#3D3D3D", "#6B6B6B"],
  Souvenirer:  ["#B8860B", "#C9A96E"],
  "Mat & Dryck": ["#5A7D6B", "#7A9B8A"],
  Kläder:      ["#4A8BAF", "#C4B8A8"],
  Övrigt:      ["#C4B8A8", "#EDE8E0"],
};

export default function PlaceCard({ place, onPress }: PlaceCardProps) {
  const { open, label } = getOpenStatus(place);
  const [colorA, colorB] = CATEGORY_COLORS[place.category] ?? ["#2D6A8E", "#4A8BAF"];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(place)}
    >
      {/* Foto-banner (gradient tills riktiga foton kopplas) */}
      <View
        style={[
          styles.imageBanner,
          { backgroundColor: colorA },
        ]}
      >
        <View style={[styles.imageBannerOverlay, { backgroundColor: colorB }]} />
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{place.name}</Text>
          <View style={styles.openBadge}>
            <Circle
              size={7}
              color={open ? colors.kelp : colors.rust}
              fill={open ? colors.kelp : colors.rust}
            />
            <Text style={[styles.openText, { color: open ? colors.kelp : colors.rust }]}>
              {open ? "Öppet" : "Stängt"}
            </Text>
          </View>
        </View>

        <View style={styles.meta}>
          <Text style={styles.category}>{place.category}</Text>
          {place.rating != null && (
            <>
              <Text style={styles.dot}>·</Text>
              <Star size={11} color={colors.rust} fill={colors.rust} />
              <Text style={styles.rating}>{place.rating.toFixed(1)}</Text>
            </>
          )}
          <Text style={styles.dot}>·</Text>
          <Clock size={11} color={colors.granite} />
          <Text style={styles.metaText}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    ...shadows.sm,
  },
  imageBanner: {
    height: 72,
    position: "relative",
  },
  imageBannerOverlay: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50%",
    height: "100%",
    opacity: 0.6,
  },
  body: {
    padding: spacing.md,
    paddingTop: spacing.sm + 2,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    flex: 1,
    ...typography.h3,
    color: colors.rockDark,
    marginRight: spacing.sm,
  },
  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  openText: {
    fontSize: 10,
    fontWeight: "700",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  category: {
    fontSize: 11,
    color: colors.granite,
    fontWeight: "500",
  },
  dot: {
    fontSize: 11,
    color: colors.granite,
  },
  rating: {
    fontSize: 11,
    color: colors.granite,
    fontWeight: "600",
  },
  metaText: {
    fontSize: 11,
    color: colors.granite,
  },
});
```

- [ ] **Steg 2: Verifiera att TypeScript kompilerar**

```bash
npx tsc --noEmit
```

Förväntat: inga fel

- [ ] **Steg 3: Commit**

```bash
git add src/components/PlaceCard.tsx
git commit -m "feat: add shared PlaceCard component"
```

---

## Task 5: RestaurantsScreen

**Files:**
- Create: `src/screens/RestaurantsScreen.tsx`

- [ ] **Steg 1: Skapa src/screens/RestaurantsScreen.tsx**

```typescript
/**
 * RESTAURANTS SCREEN
 * Lista över restauranger med sök och filterchips.
 * Data: MOCK_RESTAURANTS → ersätts av GooglePlacesService.
 */

import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Search } from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { MOCK_RESTAURANTS, filterPlaces, Place, RestaurantCategory } from "../data/places";
import PlaceCard from "../components/PlaceCard";

const FILTERS: Array<{ key: string; label: string }> = [
  { key: "all",      label: "Alla" },
  { key: "Mat",      label: "Mat" },
  { key: "Skaldjur", label: "Skaldjur" },
  { key: "Fika",     label: "Fika" },
  { key: "Bar",      label: "Bar" },
];

interface Props {
  navigation: any;
}

export default function RestaurantsScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = filterPlaces(MOCK_RESTAURANTS, activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [activeFilter, searchQuery]);

  const handlePress = useCallback(
    (place: Place) => navigation.navigate("PlaceDetail", { place }),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restauranger</Text>
        <View style={styles.searchBar}>
          <Search size={15} color={colors.granite} />
          <TextInput
            style={styles.searchInput}
            placeholder="Sök restaurang..."
            placeholderTextColor={colors.granite}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {/* Filter chips */}
        <View style={styles.chips}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.chip, activeFilter === f.key && styles.chipActive]}
              onPress={() => setActiveFilter(f.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  activeFilter === f.key && styles.chipTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>Inga restauranger hittades.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  title: { ...typography.h1, color: colors.rockDark },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.shell,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.rockDark },
  chips: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: colors.sand,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  chipActive: { backgroundColor: colors.seaBlue },
  chipText: { fontSize: 12, fontWeight: "600", color: colors.granite },
  chipTextActive: { color: colors.white },
  list: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 100,
  },
  empty: {
    textAlign: "center",
    color: colors.granite,
    marginTop: 40,
    fontSize: 14,
  },
});
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

Förväntat: inga fel

- [ ] **Steg 3: Commit**

```bash
git add src/screens/RestaurantsScreen.tsx
git commit -m "feat: add RestaurantsScreen with search and filter"
```

---

## Task 6: ShopsScreen

**Files:**
- Create: `src/screens/ShopsScreen.tsx`

- [ ] **Steg 1: Skapa src/screens/ShopsScreen.tsx**

```typescript
/**
 * SHOPS SCREEN
 * Lista över butiker med sök och filterchips.
 * Identisk struktur som RestaurantsScreen.
 */

import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Search } from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { MOCK_SHOPS, filterPlaces, Place } from "../data/places";
import PlaceCard from "../components/PlaceCard";

const FILTERS = [
  { key: "all",        label: "Alla" },
  { key: "Mat & Dryck", label: "Mat & Dryck" },
  { key: "Kläder",     label: "Kläder" },
  { key: "Souvenirer", label: "Souvenirer" },
  { key: "Övrigt",     label: "Övrigt" },
];

interface Props {
  navigation: any;
}

export default function ShopsScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = filterPlaces(MOCK_SHOPS, activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [activeFilter, searchQuery]);

  const handlePress = useCallback(
    (place: Place) => navigation.navigate("PlaceDetail", { place }),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Butiker</Text>
        <View style={styles.searchBar}>
          <Search size={15} color={colors.granite} />
          <TextInput
            style={styles.searchInput}
            placeholder="Sök butik..."
            placeholderTextColor={colors.granite}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.chips}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.chip, activeFilter === f.key && styles.chipActive]}
              onPress={() => setActiveFilter(f.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  activeFilter === f.key && styles.chipTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>Inga butiker hittades.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  title: { ...typography.h1, color: colors.rockDark },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.shell,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.rockDark },
  chips: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: colors.sand,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  chipActive: { backgroundColor: colors.seaBlue },
  chipText: { fontSize: 12, fontWeight: "600", color: colors.granite },
  chipTextActive: { color: colors.white },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  empty: { textAlign: "center", color: colors.granite, marginTop: 40, fontSize: 14 },
});
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 3: Commit**

```bash
git add src/screens/ShopsScreen.tsx
git commit -m "feat: add ShopsScreen with search and filter"
```

---

## Task 7: PlaceDetailScreen

**Files:**
- Create: `src/screens/PlaceDetailScreen.tsx`

- [ ] **Steg 1: Skapa src/screens/PlaceDetailScreen.tsx**

```typescript
/**
 * PLACE DETAIL SCREEN
 * Detaljsida för restaurang eller butik.
 * Navigeras till med: navigation.navigate("PlaceDetail", { place })
 */

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SafeAreaView,
} from "react-native";
import {
  ArrowLeft,
  Phone,
  Globe,
  MapPin,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { Place, getOpenStatus } from "../data/places";

interface Props {
  route: { params: { place: Place } };
  navigation: any;
}

export default function PlaceDetailScreen({ route, navigation }: Props) {
  const { place } = route.params;
  const { open, label } = getOpenStatus(place);

  const handlePhone = () => {
    if (place.phone) Linking.openURL(`tel:${place.phone}`);
  };

  const handleMaps = () => {
    const url = `https://maps.apple.com/?q=${place.lat},${place.lng}`;
    Linking.openURL(url);
  };

  const handleWeb = () => {
    if (place.website) Linking.openURL(place.website);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tillbaka-knapp */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <ArrowLeft size={22} color={colors.seaBlue} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero-banner */}
        <View style={styles.heroBanner} />

        <View style={styles.content}>
          {/* Namn + status */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{place.name}</Text>
            <View style={[styles.statusPill, { backgroundColor: open ? "rgba(90,125,107,0.12)" : "rgba(184,134,11,0.1)" }]}>
              <Text style={[styles.statusText, { color: open ? colors.kelp : colors.rust }]}>
                {open ? "Öppet" : "Stängt"}
              </Text>
            </View>
          </View>

          {/* Kategori + betyg */}
          <View style={styles.metaRow}>
            <Text style={styles.category}>{place.category}</Text>
            {place.rating != null && (
              <>
                <Text style={styles.dot}>·</Text>
                <Star size={13} color={colors.rust} fill={colors.rust} />
                <Text style={styles.rating}>
                  {place.rating.toFixed(1)}
                  {place.reviewCount ? ` (${place.reviewCount})` : ""}
                </Text>
              </>
            )}
          </View>

          {/* Nästa öppet/stänger */}
          <View style={styles.infoRow}>
            <Clock size={15} color={colors.granite} />
            <Text style={styles.infoText}>{label}</Text>
          </View>

          {/* Öppettider */}
          {place.openHours && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Öppettider</Text>
              {Object.entries(place.openHours).map(([day, hours]) => (
                <View key={day} style={styles.hoursRow}>
                  <Text style={styles.hoursDay}>{day}</Text>
                  <Text style={styles.hoursTime}>{hours}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Kontakt */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kontakt</Text>

            <TouchableOpacity style={styles.actionRow} onPress={handleMaps} activeOpacity={0.8}>
              <MapPin size={18} color={colors.seaBlue} />
              <Text style={styles.actionText}>{place.address}</Text>
              <ChevronRight size={16} color={colors.granite} />
            </TouchableOpacity>

            {place.phone && (
              <TouchableOpacity style={styles.actionRow} onPress={handlePhone} activeOpacity={0.8}>
                <Phone size={18} color={colors.seaBlue} />
                <Text style={styles.actionText}>{place.phone}</Text>
                <ChevronRight size={16} color={colors.granite} />
              </TouchableOpacity>
            )}

            {place.website && (
              <TouchableOpacity style={styles.actionRow} onPress={handleWeb} activeOpacity={0.8}>
                <Globe size={18} color={colors.seaBlue} />
                <Text style={styles.actionText} numberOfLines={1}>
                  {place.website.replace(/^https?:\/\//, "")}
                </Text>
                <ChevronRight size={16} color={colors.granite} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  backBtn: {
    position: "absolute",
    top: 52,
    left: spacing.lg,
    zIndex: 10,
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.md,
  },
  heroBanner: {
    height: 220,
    backgroundColor: colors.deepSea,
  },
  content: { padding: spacing.lg },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  name: { ...typography.h1, color: colors.rockDark, flex: 1, marginRight: spacing.sm },
  statusPill: {
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  statusText: { fontSize: 12, fontWeight: "700" },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  category: { fontSize: 13, color: colors.granite },
  dot: { color: colors.granite },
  rating: { fontSize: 13, color: colors.granite, fontWeight: "600" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  infoText: { fontSize: 13, color: colors.granite },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.caption,
    color: colors.granite,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: spacing.md,
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },
  hoursDay: { fontSize: 13, color: colors.rockDark, fontWeight: "500" },
  hoursTime: { fontSize: 13, color: colors.granite },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },
  actionText: { flex: 1, fontSize: 14, color: colors.seaBlue, fontWeight: "500" },
});
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 3: Commit**

```bash
git add src/screens/PlaceDetailScreen.tsx
git commit -m "feat: add PlaceDetailScreen with hours, contact and map link"
```

---

## Task 8: EventsScreen

**Files:**
- Create: `src/screens/EventsScreen.tsx`

- [ ] **Steg 1: Skapa src/screens/EventsScreen.tsx**

```typescript
/**
 * EVENTS SCREEN
 * "Händer idag" + "Kommande" evenemangskalender.
 * Data: MOCK_EVENTS → byts mot API/CMS senare.
 */

import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MapPin, Clock } from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { MOCK_EVENTS, getTodayEvents, getUpcomingEvents, formatEventDate, getDateBadge } from "../data/events";

export default function EventsScreen() {
  const todayEvents = useMemo(() => getTodayEvents(MOCK_EVENTS), []);
  const upcomingEvents = useMemo(() => getUpcomingEvents(MOCK_EVENTS), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evenemang</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Händer idag */}
        <Text style={styles.sectionLabel}>Händer idag</Text>
        {todayEvents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Inga evenemang idag</Text>
          </View>
        ) : (
          todayEvents.map((ev) => (
            <View key={ev.id} style={styles.todayCard}>
              <Text style={styles.todayTag}>{formatEventDate(ev.date)}</Text>
              <Text style={styles.todayTitle}>{ev.title}</Text>
              <View style={styles.metaRow}>
                <MapPin size={11} color={colors.granite} />
                <Text style={styles.metaText}>{ev.location}</Text>
                {ev.timeStart && (
                  <>
                    <Text style={styles.dot}>·</Text>
                    <Clock size={11} color={colors.granite} />
                    <Text style={styles.metaText}>
                      {ev.timeStart}{ev.timeEnd ? `–${ev.timeEnd}` : ""}
                    </Text>
                  </>
                )}
              </View>
              {ev.description ? (
                <Text style={styles.todayDesc}>{ev.description}</Text>
              ) : null}
            </View>
          ))
        )}

        {/* Kommande */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>Kommande</Text>
        {upcomingEvents.map((ev, index) => {
          const { day, month } = getDateBadge(ev.date);
          const isFirst = index === 0;
          return (
            <View key={ev.id} style={styles.upcomingItem}>
              <View style={[styles.dateBadge, !isFirst && styles.dateBadgeMuted]}>
                <Text style={[styles.dateNum, !isFirst && styles.dateNumMuted]}>{day}</Text>
                <Text style={[styles.dateMon, !isFirst && styles.dateMonMuted]}>{month}</Text>
              </View>
              <View style={styles.upcomingContent}>
                <Text style={styles.upcomingTitle}>{ev.title}</Text>
                <View style={styles.metaRow}>
                  <MapPin size={11} color={colors.granite} />
                  <Text style={styles.metaText}>{ev.location}</Text>
                  {ev.timeStart && (
                    <>
                      <Text style={styles.dot}>·</Text>
                      <Clock size={11} color={colors.granite} />
                      <Text style={styles.metaText}>{ev.timeStart}</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  title: { ...typography.h1, color: colors.rockDark },
  content: { padding: spacing.lg, paddingBottom: 100 },
  sectionLabel: {
    ...typography.caption,
    color: colors.granite,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  emptyText: { fontSize: 14, color: colors.granite },
  todayCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.seaBlue,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  todayTag: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.seaBlue,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  todayTitle: { ...typography.h3, color: colors.rockDark, marginBottom: 4 },
  todayDesc: {
    fontSize: 12,
    color: colors.granite,
    lineHeight: 17,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.sand,
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 11, color: colors.granite },
  dot: { fontSize: 11, color: colors.granite },
  upcomingItem: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  dateBadge: {
    backgroundColor: colors.deepSea,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 2,
    alignItems: "center",
    minWidth: 44,
  },
  dateBadgeMuted: { backgroundColor: colors.sand },
  dateNum: { fontSize: 18, fontWeight: "700", color: colors.white, lineHeight: 20 },
  dateNumMuted: { color: colors.seaBlue },
  dateMon: { fontSize: 9, color: colors.white, textTransform: "uppercase", opacity: 0.85, marginTop: 1 },
  dateMonMuted: { color: colors.granite, opacity: 1 },
  upcomingContent: { flex: 1 },
  upcomingTitle: { ...typography.h3, color: colors.rockDark, marginBottom: 3 },
});
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 3: Commit**

```bash
git add src/screens/EventsScreen.tsx
git commit -m "feat: add EventsScreen with today and upcoming sections"
```

---

## Task 9: HomeScreen (ombygg)

**Files:**
- Create: `src/screens/HomeScreen.tsx`

- [ ] **Steg 1: Skapa src/screens/HomeScreen.tsx**

```typescript
/**
 * HOME SCREEN
 * Färje-widget + snabbknappar + dagens evenemang.
 */

import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ship, ArrowRight, Clock, Utensils, ShoppingBag, MapPin } from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { MOCK_RESTAURANTS, MOCK_SHOPS, isOpenNow } from "../data/places";
import { MOCK_EVENTS, getTodayEvents } from "../data/events";

// Hårdkodad färja — ersätts av VästtrafikService i Task 14
const NEXT_FERRY = { minutesLeft: 12, time: "14:15", status: "onTime" as const };

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const openRestaurants = useMemo(
    () => MOCK_RESTAURANTS.filter((p) => isOpenNow(p)).length,
    []
  );
  const openShops = useMemo(
    () => MOCK_SHOPS.filter((p) => isOpenNow(p)).length,
    []
  );
  const todayEvents = useMemo(() => getTodayEvents(MOCK_EVENTS), []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Färje-hero */}
        <View style={styles.ferryHero}>
          <View style={styles.ferryEyebrow}>
            <Ship size={12} color="rgba(255,255,255,0.75)" />
            <Text style={styles.ferryEyebrowText}>Nästa färja</Text>
          </View>
          <Text style={styles.ferryCountdown}>
            {NEXT_FERRY.minutesLeft < 1 ? "Nu" : `${NEXT_FERRY.minutesLeft} min`}
          </Text>
          <View style={styles.ferryRoute}>
            <Text style={styles.ferryRouteText}>Lysekil</Text>
            <ArrowRight size={13} color="rgba(255,255,255,0.8)" />
            <Text style={styles.ferryRouteText}>Fiskebäckskil</Text>
          </View>
          <TouchableOpacity
            style={styles.ferryPill}
            onPress={() => navigation.navigate("Färja")}
            activeOpacity={0.8}
          >
            <Clock size={11} color="rgba(255,255,255,0.9)" />
            <Text style={styles.ferryPillText}>
              Avgår {NEXT_FERRY.time} · I tid
            </Text>
          </TouchableOpacity>
        </View>

        {/* Snabbknappar */}
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Restauranger")}
          >
            <View style={styles.quickIcon}>
              <Utensils size={20} color={colors.seaBlue} />
            </View>
            <Text style={styles.quickName}>Restauranger</Text>
            <Text style={styles.quickOpen}>{openRestaurants} öppna nu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Butiker")}
          >
            <View style={styles.quickIcon}>
              <ShoppingBag size={20} color={colors.seaBlue} />
            </View>
            <Text style={styles.quickName}>Butiker</Text>
            <Text style={styles.quickOpen}>{openShops} öppna nu</Text>
          </TouchableOpacity>
        </View>

        {/* Händer idag */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Händer idag</Text>
          {todayEvents.length === 0 ? (
            <View style={styles.emptyEvent}>
              <Text style={styles.emptyText}>Inga evenemang idag</Text>
            </View>
          ) : (
            todayEvents.map((ev) => (
              <TouchableOpacity
                key={ev.id}
                style={styles.eventCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("Evenemang")}
              >
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <View style={styles.eventMeta}>
                  <MapPin size={11} color={colors.granite} />
                  <Text style={styles.eventMetaText}>{ev.location}</Text>
                  {ev.timeStart && (
                    <>
                      <Text style={styles.dot}>·</Text>
                      <Clock size={11} color={colors.granite} />
                      <Text style={styles.eventMetaText}>
                        {ev.timeStart}{ev.timeEnd ? `–${ev.timeEnd}` : ""}
                      </Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  content: { paddingBottom: 100 },
  ferryHero: {
    backgroundColor: colors.deepSea,
    padding: spacing.xl,
    paddingTop: spacing.xl + 4,
  },
  ferryEyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: spacing.sm,
  },
  ferryEyebrowText: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  ferryCountdown: {
    fontSize: 44,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: -1,
    lineHeight: 46,
  },
  ferryRoute: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: 4,
  },
  ferryRouteText: { fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: "500" },
  ferryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  ferryPillText: { fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: "600" },
  quickGrid: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  quickCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    ...shadows.sm,
  },
  quickIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.sand,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  quickName: { fontSize: 13, fontWeight: "700", color: colors.rockDark },
  quickOpen: { fontSize: 11, color: colors.kelp, fontWeight: "600", marginTop: 3 },
  section: { paddingHorizontal: spacing.lg },
  sectionLabel: {
    ...typography.caption,
    color: colors.granite,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.seaBlue,
    ...shadows.sm,
  },
  eventTitle: { ...typography.h3, color: colors.rockDark, marginBottom: 4 },
  eventMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  eventMetaText: { fontSize: 11, color: colors.granite },
  dot: { fontSize: 11, color: colors.granite },
  emptyEvent: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  emptyText: { fontSize: 13, color: colors.granite },
});
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 3: Commit**

```bash
git add src/screens/HomeScreen.tsx
git commit -m "feat: rebuild HomeScreen with ferry widget and quick links"
```

---

## Task 10: MapScreen (anpassa filter)

**Files:**
- Modify: `src/screens/MapScreen.tsx`

- [ ] **Steg 1: Uppdatera FILTERS i src/screens/MapScreen.tsx**

Hitta raden som definierar `FILTERS` (rad ~39) och ersätt hela arrayen:

```typescript
const FILTERS: { key: POICategory | "all"; label: string; icon: any }[] = [
  { key: "all",        label: "Allt",        icon: Layers },
  { key: "restaurant", label: "Restauranger", icon: Utensils },
  { key: "shop",       label: "Butiker",      icon: ShoppingBag },
];
```

Ta också bort oanvända importer (Waves, Car, Zap, Toilet, Bus, Bed) och lägg till ShoppingBag om det saknas:

```typescript
import {
  Layers,
  Utensils,
  ShoppingBag,
  X,
} from "lucide-react-native";
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 3: Commit**

```bash
git add src/screens/MapScreen.tsx
git commit -m "feat: narrow MapScreen filters to restaurants and shops"
```

---

## Task 11: FerryScreen (polish)

**Files:**
- Modify: `src/screens/FerryScreen.tsx`

- [ ] **Steg 1: Uppdatera rubriken och lägg till `SafeAreaView`**

Öppna `src/screens/FerryScreen.tsx`. Ändra:

```typescript
// Lägg till import
import { View, Text, TouchableOpacity, StyleSheet, Vibration, SafeAreaView } from "react-native";

// Wrap hela return-innehållet:
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.shellWhite }}>
    <View style={styles.container}>
      <Text style={styles.header}>Färja</Text>
      {/* resten oförändrat */}
    </View>
  </SafeAreaView>
);
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 3: Commit**

```bash
git add src/screens/FerryScreen.tsx
git commit -m "fix: wrap FerryScreen in SafeAreaView"
```

---

## Task 12: App.tsx — 6-fliks-navigation

**Files:**
- Modify: `src/App.tsx`

- [ ] **Steg 1: Ersätt src/App.tsx helt**

```typescript
/**
 * LYSEKIL APP — ROOT NAVIGATION
 * 6 flikar: Hem, Restauranger, Butiker, Evenemang, Karta, Färja
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Utensils, ShoppingBag, Calendar, Map, Ship } from "lucide-react-native";
import { colors } from "./theme";

import HomeScreen from "./screens/HomeScreen";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import ShopsScreen from "./screens/ShopsScreen";
import EventsScreen from "./screens/EventsScreen";
import MapScreen from "./screens/MapScreen";
import FerryScreen from "./screens/FerryScreen";
import PlaceDetailScreen from "./screens/PlaceDetailScreen";

const Tab = createBottomTabNavigator();
const RestaurantStack = createNativeStackNavigator();
const ShopStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();

function RestaurantsTab() {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen name="RestaurantsList" component={RestaurantsScreen} />
      <RestaurantStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </RestaurantStack.Navigator>
  );
}

function ShopsTab() {
  return (
    <ShopStack.Navigator screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="ShopsList" component={ShopsScreen} />
      <ShopStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </ShopStack.Navigator>
  );
}

function MapTab() {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="MapMain" component={MapScreen} />
      <MapStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </MapStack.Navigator>
  );
}

const TAB_ICON_SIZE = 22;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 72,
            paddingBottom: 10,
            paddingTop: 6,
            backgroundColor: colors.white,
            borderTopColor: "rgba(0,0,0,0.07)",
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: colors.seaBlue,
          tabBarInactiveTintColor: colors.driftwood,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginTop: 2,
          },
          tabBarIcon: ({ color }) => {
            switch (route.name) {
              case "Hem":           return <Home size={TAB_ICON_SIZE} color={color} />;
              case "Restauranger":  return <Utensils size={TAB_ICON_SIZE} color={color} />;
              case "Butiker":       return <ShoppingBag size={TAB_ICON_SIZE} color={color} />;
              case "Evenemang":     return <Calendar size={TAB_ICON_SIZE} color={color} />;
              case "Karta":         return <Map size={TAB_ICON_SIZE} color={color} />;
              case "Färja":         return <Ship size={TAB_ICON_SIZE} color={color} />;
              default:              return <Home size={TAB_ICON_SIZE} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Hem"          component={HomeScreen} />
        <Tab.Screen name="Restauranger" component={RestaurantsTab} />
        <Tab.Screen name="Butiker"      component={ShopsTab} />
        <Tab.Screen name="Evenemang"    component={EventsScreen} />
        <Tab.Screen name="Karta"        component={MapTab} />
        <Tab.Screen name="Färja"        component={FerryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

- [ ] **Steg 2: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 3: Starta appen och verifiera att alla 6 flikar fungerar**

```bash
npx expo start
```

Klicka igenom alla 6 flikar i simulatorn. Förväntat: inga kraschar, korrekt ikon och label per flik.

- [ ] **Steg 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire up 6-tab navigation with nested stacks"
```

---

## Task 13: i18n — SV/EN

**Files:**
- Create: `src/i18n/sv.ts`
- Create: `src/i18n/en.ts`
- Create: `src/i18n/index.ts`

- [ ] **Steg 1: Skapa src/i18n/sv.ts**

```typescript
export const sv = {
  tabs: {
    home: "Hem",
    restaurants: "Restauranger",
    shops: "Butiker",
    events: "Evenemang",
    map: "Karta",
    ferry: "Färja",
  },
  home: {
    nextFerry: "Nästa färja",
    onTime: "I tid",
    delayed: "Försenad",
    openNow: "öppna nu",
    todayEvents: "Händer idag",
    noEvents: "Inga evenemang idag",
  },
  places: {
    open: "Öppet",
    closed: "Stängt",
    closesAt: "Stänger",
    opensAt: "Öppnar",
    searchRestaurant: "Sök restaurang...",
    searchShop: "Sök butik...",
    noResults: "Inga resultat",
    openHours: "Öppettider",
    contact: "Kontakt",
  },
  events: {
    today: "Händer idag",
    upcoming: "Kommande",
    noToday: "Inga evenemang idag",
  },
  ferry: {
    title: "Färja",
    nextDeparture: "Nästa avgång om",
    now: "Nu",
    route: "Lysekil ↔ Fiskebäckskil",
    remind: "Påminn mig 10 min innan",
    remindActive: "Påminnelse aktiv (10 min innan)",
    upcoming: "Kommande avgångar",
    to: "→ Fiskebäckskil",
    from: "→ Lysekil",
  },
};

export type Strings = typeof sv;
```

- [ ] **Steg 2: Skapa src/i18n/en.ts**

```typescript
import { Strings } from "./sv";

export const en: Strings = {
  tabs: {
    home: "Home",
    restaurants: "Restaurants",
    shops: "Shops",
    events: "Events",
    map: "Map",
    ferry: "Ferry",
  },
  home: {
    nextFerry: "Next ferry",
    onTime: "On time",
    delayed: "Delayed",
    openNow: "open now",
    todayEvents: "Happening today",
    noEvents: "No events today",
  },
  places: {
    open: "Open",
    closed: "Closed",
    closesAt: "Closes",
    opensAt: "Opens",
    searchRestaurant: "Search restaurant...",
    searchShop: "Search shop...",
    noResults: "No results",
    openHours: "Opening hours",
    contact: "Contact",
  },
  events: {
    today: "Happening today",
    upcoming: "Upcoming",
    noToday: "No events today",
  },
  ferry: {
    title: "Ferry",
    nextDeparture: "Next departure in",
    now: "Now",
    route: "Lysekil ↔ Fiskebäckskil",
    remind: "Remind me 10 min before",
    remindActive: "Reminder set (10 min before)",
    upcoming: "Upcoming departures",
    to: "→ Fiskebäckskil",
    from: "→ Lysekil",
  },
};
```

- [ ] **Steg 3: Skapa src/i18n/index.ts**

```typescript
import React, { createContext, useContext, useState } from "react";
import { sv } from "./sv";
import { en } from "./en";
import type { Strings } from "./sv";

type Language = "sv" | "en";

const STRINGS: Record<Language, Strings> = { sv, en };

interface I18nContextType {
  t: Strings;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType>({
  t: sv,
  language: "sv",
  setLanguage: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("sv");
  return (
    <I18nContext.Provider value={{ t: STRINGS[language], language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
```

- [ ] **Steg 4: Wrappa App i I18nProvider i src/App.tsx**

Lägg till import och wrappa NavigationContainer:

```typescript
import { I18nProvider } from "./i18n";

// I return:
return (
  <I18nProvider>
    <NavigationContainer>
      {/* ... */}
    </NavigationContainer>
  </I18nProvider>
);
```

- [ ] **Steg 5: Verifiera TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Steg 6: Commit**

```bash
git add src/i18n/ src/App.tsx
git commit -m "feat: add i18n support for Swedish and English"
```

---

## Task 14: Service stubs (redo för API)

**Files:**
- Create: `src/services/googlePlaces.ts`
- Create: `src/services/vasttrafik.ts`
- Create: `src/__tests__/services.test.ts`

- [ ] **Steg 1: Skriv testerna**

Skapa `src/__tests__/services.test.ts`:

```typescript
import { fetchPlaces } from "../services/googlePlaces";
import { fetchNextDepartures } from "../services/vasttrafik";

describe("GooglePlacesService (stub)", () => {
  it("returnerar en array av Place", async () => {
    const results = await fetchPlaces({ type: "restaurant", location: { lat: 58.275, lng: 11.44 } });
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("id");
    expect(results[0]).toHaveProperty("name");
    expect(results[0]).toHaveProperty("type");
  });
});

describe("VästtrafikService (stub)", () => {
  it("returnerar kommande avgångar", async () => {
    const departures = await fetchNextDepartures();
    expect(Array.isArray(departures)).toBe(true);
    expect(departures.length).toBeGreaterThan(0);
    expect(departures[0]).toHaveProperty("time");
    expect(departures[0]).toHaveProperty("direction");
    expect(departures[0]).toHaveProperty("status");
  });
});
```

- [ ] **Steg 2: Kör testerna och verifiera att de misslyckas**

```bash
npx jest src/__tests__/services.test.ts --no-coverage
```

Förväntat: FAIL — "Cannot find module"

- [ ] **Steg 3: Skapa src/services/googlePlaces.ts**

```typescript
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
```

- [ ] **Steg 4: Skapa src/services/vasttrafik.ts**

```typescript
/**
 * VÄSTTRAFIK SERVICE
 * Stub som returnerar mock-data.
 * Byt ut fetchFromVasttrafik() mot riktigt API-anrop.
 * Västtrafik API: https://developer.vasttrafik.se
 */

export interface FerryDeparture {
  time: string;
  direction: "to" | "from"; // to = Lysekil→Fiskebäckskil
  status: "onTime" | "delayed" | "cancelled";
  delayMinutes?: number;
}

const MOCK_DEPARTURES: FerryDeparture[] = [
  { time: "14:00", direction: "from", status: "onTime" },
  { time: "14:15", direction: "to",   status: "onTime" },
  { time: "14:30", direction: "from", status: "onTime" },
  { time: "14:45", direction: "to",   status: "onTime" },
  { time: "15:00", direction: "from", status: "onTime" },
  { time: "15:15", direction: "to",   status: "onTime" },
  { time: "15:30", direction: "from", status: "delayed", delayMinutes: 5 },
  { time: "15:45", direction: "to",   status: "onTime" },
];

// Byt ut denna funktion mot riktigt API-anrop:
// async function fetchFromVasttrafik(): Promise<FerryDeparture[]> {
//   const token = await getVasttrafikToken();
//   const stopId = "9021014003940000"; // Lysekils färjeläge
//   const res = await fetch(
//     `https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=${stopId}&format=json`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   const data = await res.json();
//   return data.DepartureBoard.Departure.map(mapVasttrafikDeparture);
// }

export async function fetchNextDepartures(): Promise<FerryDeparture[]> {
  // TODO: ersätt med fetchFromVasttrafik() när API-nyckel är konfigurerad
  await new Promise((r) => setTimeout(r, 0));
  return MOCK_DEPARTURES;
}

export function getMinutesUntil(timeStr: string): number {
  const now = new Date();
  const [h, m] = timeStr.split(":").map(Number);
  const target = new Date();
  target.setHours(h, m, 0, 0);
  if (target < now) target.setDate(target.getDate() + 1);
  return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 60000));
}
```

- [ ] **Steg 5: Kör alla tester**

```bash
npx jest --no-coverage
```

Förväntat: PASS — alla tester gröna

- [ ] **Steg 6: Commit**

```bash
git add src/services/ src/__tests__/services.test.ts
git commit -m "feat: add service stubs for Google Places and Västtrafik APIs"
```

---

## Task 15: Slutverifiering

- [ ] **Steg 1: Kör alla tester**

```bash
npx jest --no-coverage
```

Förväntat: PASS — minst 12 tester gröna, 0 failures

- [ ] **Steg 2: TypeScript-check**

```bash
npx tsc --noEmit
```

Förväntat: inga fel

- [ ] **Steg 3: Starta appen och testa manuellt**

```bash
npx expo start
```

Checklista i simulatorn:
- [ ] Hem: färje-widget syns, snabbknappar navigerar rätt, event visas
- [ ] Restauranger: lista visas, sök fungerar, filter fungerar, klick öppnar detaljsida
- [ ] Butiker: lista visas, sök fungerar, filter fungerar, klick öppnar detaljsida
- [ ] Detaljsida: öppettider visas, kontakt-knappar fungerar, tillbaka-knapp fungerar
- [ ] Evenemang: "Händer idag" och "Kommande" visas korrekt
- [ ] Karta: öppnas, filter visar Restauranger/Butiker
- [ ] Färja: nedräkning visas, schema visas, påminnelse-knapp fungerar
- [ ] Alla 6 flikar: korrekt ikon och label

- [ ] **Steg 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Lysekil app v2 - restaurants, shops, events, ferry"
```
