# Lysekil App — Redesign v2
**Datum:** 2026-05-23  
**Status:** Godkänd

---

## Sammanfattning

En mobilapp (React Native / Expo) för besökare och lokalinvånare i Lysekil. Fokus på tre saker: **restauranger**, **butiker** och **färjan till Fiskebäckskil** — plus en enkel evenemangskalender. Inga kommunfunktioner. Ingen inloggning. Direkt till innehållet.

Data kommer från **Google Places API** (restauranger + butiker) och **Västtrafik API** (färja) — men byggs med mock-data tills vidare. API-kopplingen är sista steget.

---

## Målgrupp

- **Turister** som vill hitta mat, handel och veta när nästa färja går
- **Lokalinvånare** som snabbt vill kolla öppettider eller nästa avgång

Appen ska vara på **svenska och engelska** (i18n, enkel språkväljare).

---

## Designsystem

Befintligt tema återanvänds oförändrat — `src/theme.ts`.

| Token | Hex | Användning |
|---|---|---|
| `seaBlue` | `#2D6A8E` | Primärt, aktiva flikar, CTA |
| `deepSea` | `#1B4B66` | Hero-gradients, date badges |
| `seaMist` | `#4A8BAF` | Sekundärt blått |
| `rockDark` | `#2C2C2C` | Rubriker, primär text |
| `granite` | `#6B6B6B` | Sekundär text, ikoner |
| `shell` | `#F7F5F2` | Bakgrund |
| `sand` | `#EDE8E0` | Sekundär bakgrund, chip-inactive |
| `kelp` | `#5A7D6B` | Öppet-status |
| `rust` | `#B8860B` | Stängt-status, stjärnbetyg |
| `alertRed` | `#C0392B` | Fel, inställt |
| `white` | `#FFFFFF` | Kort, header-bar |

**Ikoner:** `lucide-react-native` — tunna linjeikoner, samma som befintlig app.  
**Typografi:** Inter / systemfont, befintliga `typography`-tokens.  
**Komponenter:** Avrundade hörn `radius.md` (10px), subtila skuggor `shadows.sm/md`.

---

## Appstruktur — 6 flikar

```
┌──────────┬────────────┬─────────┬──────────┬───────┬───────┐
│   Hem    │Restauranger│ Butiker │ Evenemang│ Karta │ Färja │
│  (Home)  │(Restaurants│ (Shops) │ (Events) │ (Map) │(Ferry)│
└──────────┴────────────┴─────────┴──────────┴───────┴───────┘
```

---

## Skärmar

### 1. Hem (`HomeScreen`) — OMBYGGD

**Syfte:** Snabb översikt och ingång till resten av appen.

**Layout (uppifrån och ned):**
1. **Färje-widget** — gradient-hero (`deepSea → seaBlue`), visar nedräkning till nästa avgång, rutt, status-pill ("I tid" / "Försenad")
2. **Snabbknappar** — 2-kolumns grid: Restauranger + Butiker. Varje kort visar ikon (Lucide), namn och "X öppna nu"
3. **Händer idag** — sektionsetikett + ett event-strip-kort med vänsterbord i `seaBlue`

**Ersätter:** Nuvarande HomeScreen med väder-widget, event-grid och kommunfokus.

---

### 2. Restauranger (`RestaurantsScreen`) — NY

**Syfte:** Hitta restauranger i Lysekil med Google Places-data.

**Layout:**
- **Header:** Titel + sökfält + filterchips (Alla / Mat / Fika / Bar)
- **Lista:** Vertikalt scrollbar lista av `PlaceCard`-komponenter
  - Fotobanner (Google Photo → mock-gradient)
  - Namn, öppet/stängt-badge (grön/gul med Lucide `circle`-ikon)
  - Kategori, stjärnbetyg (rust-färg), stänger/öppnar-tid

**Filtreringslogik:** Körs lokalt på hämtad data, ingen ny API-anrop per filter.

---

### 3. Butiker (`ShopsScreen`) — NY

**Syfte:** Hitta butiker i Lysekil.

**Layout:** Identisk struktur som RestaurantsScreen.  
**Filterchips:** Alla / Kläder / Mat & Dryck / Souvenirer / Övrigt

---

### 4. Detaljsida (`PlaceDetailScreen`) — NY (delas av Restauranger + Butiker)

**Navigeras till via:** Klick på PlaceCard i lista eller kartmarkör.

**Layout:**
- Stort fotogalleri (horisontell scroll)
- Namn + kategoribadge + stjärnbetyg + antal recensioner
- Öppettider (expanderbar lista per veckodag)
- Adress + "Öppna i Kartor"-knapp (deep link)
- Telefon + "Ring"-knapp
- Webbsida-länk

---

### 5. Evenemang (`EventsScreen`) — NY

**Syfte:** Enkel evenemangskalender — ingen komplex logik, manuellt ifylld mock-data.

**Layout:**
- **Händer idag** — ett eller flera kort med vänsterbord (`seaBlue`), datum-tag, titel, plats + tid, kort beskrivning. Tomt-state: "Inga evenemang idag"
- **Kommande** — vertikal lista, varje rad har date-badge (djupblå för närmast, sand för övriga), titel, plats + tid

**Datakälla:** Statisk TypeScript-array att börja med. Byts mot ett enkelt CMS eller API-endpoint senare.

---

### 6. Karta (`MapScreen`) — ANPASSAD

**Bas:** Befintlig `MapScreen.tsx` återanvänds.

**Ändringar:**
- Filterchips bantas till: Allt / Restauranger / Butiker
- Markörfärger: `seaBlue` för restauranger, `kelpGreen` för butiker
- Mini-informationskort vid klick visar PlaceCard-liknande info

---

### 7. Färja (`FerryScreen`) — ÅTERANVÄND

**Bas:** Befintlig `FerryDirect.tsx` återanvänds nästan rakt av.

**Ändringar:**
- Hårdkodad tidtabell ersätts med Västtrafik API (sista steget)
- UI behålls: nedräkning, schema, påminnelse-knapp

---

## Datamodell

### Place (Restaurang + Butik)
```typescript
interface Place {
  id: string;
  name: string;
  type: "restaurant" | "shop";
  category: string;           // "Mat", "Fika", "Bar", "Kläder", etc.
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;            // 1–5
  reviewCount?: number;
  isOpen?: boolean;
  openUntil?: string;         // "22:00"
  opensAt?: string;           // "08:00" om stängt
  openHours?: Record<string, string>; // { "Måndag": "11–22", ... }
  photos?: string[];          // URL:ar från Google Photos
  googlePlaceId?: string;     // kopplas när Google API läggs till
}
```

### Event
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;               // ISO 8601: "2026-05-24"
  timeStart?: string;         // "10:00"
  timeEnd?: string;           // "16:00"
  location: string;           // "Hamntorget"
  isToday: boolean;           // beräknas från date
}
```

### FerryDeparture (befintlig, oförändrad)
```typescript
interface FerryDeparture {
  time: string;
  direction: "to" | "from";
  status: "onTime" | "delayed" | "cancelled";
}
```

---

## Navigation

```
App (NavigationContainer)
└── BottomTabNavigator
    ├── Hem              → HomeScreen
    ├── Restauranger     → RestaurantsScreen
    │                       └── PlaceDetailScreen (stack, push)
    ├── Butiker          → ShopsScreen
    │                       └── PlaceDetailScreen (stack, push)
    ├── Evenemang        → EventsScreen
    ├── Karta            → MapScreen
    │                       └── PlaceDetailScreen (stack, push)
    └── Färja            → FerryScreen
```

`PlaceDetailScreen` ligger i en native stack ovanpå respektive flik.

---

## Filer att skapa / ändra

### Ny struktur
```
src/
├── theme.ts                          ✅ Oförändrad
├── App.tsx                           🔄 Ny tab-konfiguration (6 flikar)
├── data/
│   ├── places.ts                     🆕 Mock-data + Place-typ
│   └── events.ts                     🆕 Mock-data + Event-typ
│   └── pois.ts                       ✅ Behålls (filterPOIs, getDistanceMeters)
├── services/
│   ├── googlePlaces.ts               🆕 Google Places API (stub → riktig)
│   └── vasttrafik.ts                 🆕 Västtrafik API (stub → riktig)
├── components/
│   ├── PlaceCard.tsx                 🆕 Återanvänd i Restauranger, Butiker, Karta
│   ├── MapScreen.tsx                 🔄 Anpassade filter
│   └── HomeScreen.tsx                🔄 Omskriven
├── screens/
│   ├── RestaurantsScreen.tsx         🆕
│   ├── ShopsScreen.tsx               🆕
│   ├── PlaceDetailScreen.tsx         🆕
│   └── EventsScreen.tsx              🆕
├── features/
│   └── FerryDirect.tsx              ✅ Minimala ändringar
└── i18n/
    ├── sv.ts                         🆕 Svenska strängar
    └── en.ts                         🆕 Engelska strängar
```

### Tas bort
- `src/features/CoastWeather.tsx`
- `src/features/HarborLive.tsx`

---

## Byggordning

1. **Mock-data + typer** — `places.ts`, `events.ts`
2. **PlaceCard-komponent** — delas av alla listvyer
3. **RestaurantsScreen** — lista + filter + sök
4. **ShopsScreen** — identisk struktur som Restauranger
5. **PlaceDetailScreen** — detaljsida
6. **EventsScreen** — "Händer idag" + "Kommande"
7. **HomeScreen** — ombygg med färje-widget + snabbknappar + dagens event
8. **MapScreen** — anpassa filter + markörfärger
9. **FerryScreen** — minimala UI-justeringar
10. **App.tsx** — ny 6-fliks-navigation
11. **i18n** — SV/EN-lager
12. **API:er** — Google Places + Västtrafik (sista steget)

---

## Vad som INTE ingår

- Inloggning / konton
- Push-notiser (kan läggas till efter MVP)
- Favoriter (kan läggas till efter MVP)
- CMS för evenemang (statisk data räcker för MVP)
- Betallösning / monetisering
