# Lysekils Guide — Designspec för prototyp-omarbetning

**Datum:** 2026-05-02
**Mål:** Förvandla `prototype/`-webbprototypen till en demo som kan visas för Lysekils kommun. Sommargäst-premium med senior-vänlig grund (65+ är primärsekundär persona då många sommargäster är äldre).
**Kodbas:** Endast `prototype/` (HTML/CSS/JS + Leaflet). Ingen migrering till `src/`.
**Innehåll:** Prototyp-platshållare med faktiska Lysekil-namn och Bohuslän-foton. Markeras tydligt i koden var kommunens egna data ska in.

---

## 1. Persona & ton

**Hjälte:** Sommargäst, 50–75 år, första eller andra besök i Lysekil. Premium-känsla men aldrig på bekostnad av läsbarhet eller klickytor.

**Sekundärt:** Lokal invånare som behöver praktiska tjänster (felanmälan, sophämtning, badkoll).

**Ton i text:** Varm, rak, andra person ("Här hittar du…"). Inga utropstecken. Inga "Klicka här". Datum på svenskt vis ("Lör 4 juli").

---

## 2. Informationsarkitektur

**6 bottenflikar** (godkänt av användaren — ger plats för dedikerad Resa-flik):

| # | Tabb | Innehåll |
|---|------|----------|
| 1 | Upptäck | Hero, live-rad, snabbnav, händer just nu, tre tips, berättelser |
| 2 | Karta | Fullskärmskarta, filterrad, POI-bottom-sheet |
| 3 | Äta | Lunch idag, restauranger, café, take away, glass |
| 4 | Resa | Personfärja, bilfärja, tuff-tuff, bussar, taxi |
| 5 | Hav & Bad | Vattenstatus, badplatser, gästhamn |
| 6 | Mer | Upplev / Service & samhälle / Appen |

**Sub-pages som ska finnas (alla färdigbyggda):**
- Evenemang-lista → Evenemang-detalj
- Restaurang-detalj (dagens lunch, meny-utdrag, telefon, öppettider, karta)
- Badplats-detalj (vattentemp, vind, alg, tillgänglighet, vägbeskrivning)
- Vandringsled-detalj (höjdprofil, offline-knapp)
- Färje-detalj (full tidtabell)
- Nyhets-/notisdetalj från "Just nu"-flödet
- Felanmälan-flow (5 steg) + "Mina anmälningar"
- Sophämtning (adress-input + nästa hämtning)
- Tillgänglighet-vy (filter + dedikerad listning)
- Inställningar (textstorlek, kontrast, motion, språk)

**Flöde:** Splash → direkt Upptäck. Ingen onboarding, ingen inloggning.

---

## 3. Designsystem

### Färgtoken

| Token | Hex | Användning |
|-------|-----|-----------|
| `--gullmarn` | `#1F4E5F` | Primär CTA, aktiv flik, ikoner |
| `--gullmarn-deep` | `#0F2E3A` | Rubriker, headers, ikoner på vit |
| `--granit` | `#A85D4A` | Accent, "live"-status, badge |
| `--skum` | `#F5F1EA` | Sektionsbakgrund |
| `--snäcka` | `#FFFFFF` | Kort, ytor |
| `--sand` | `#E8E0D2` | Avdelare, alternerande bakgrund |
| `--tång` | `#3F5E3B` | Hållbarhet, "öppet", framgång |
| `--bärnsten` | `#C68A2E` | "Snart", varning |
| `--korall` | `#B33A2E` | Stängt, fullt, fel |
| `--text-mörk` | `#1A1A1A` | Brödtext (off-svart) |
| `--text-mjuk` | `#4A4A4A` | Sekundär text — endast mot vit/skum |

Alla brödtext-kombinationer klarar **WCAG AAA (≥7:1)**. Ingen text under 16px.

### Typografi

- **Display:** Fraunces (serif med karaktär) — H1/H2 i hero-sektioner
- **UI & brödtext:** Inter — alla andra storlekar
- **Skala:** 13 / 15 / **18 (brödtext)** / 22 / 28 / 36 / 48
- **Radavstånd:** 1.55 brödtext, 1.2 rubriker
- Inställning "Stor text" höjer hela skalan ett steg utan att layouten går sönder

### Komponenter

- **Klickytor:** ≥56×56dp (över Material 48dp-minimum)
- **Kort:** 14px radie, skugga `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(15,46,58,0.06)`
- **Knappar:** 56px höga, primär fylld gullmarn, sekundär outline
- **Ikoner:** Lucide, alltid gullmarn-blå (slut på regnbågsfärger)
- **Fokus-ring:** 3px gullmarn med 2px offset
- **Bottenmenyikoner:** fyllda när aktiva, outlined när vila — solid-form syns på avstånd
- **Vågformad SVG-avdelare** i sand-färg mellan sektioner på Upptäck — diskret kustreferens

### Bildstrategi

- Faktiska Bohuslän/Lysekil-motiv (Stångehuvuds röda granit, vita träfasader, Gullmarsfjorden, sjöbodar)
- Inga generiska kustbilder, inga pingviner, inga "abstrakt blå våg"
- Varje bild har en kommentar i koden: `<!-- TODO: byt mot kommunens eget foto -->`

---

## 4. Skärmar i detalj

### 4.1 Upptäck (startsidan)

1. **Hero "Idag i Lysekil"** — full-bleed foto, gradient nederkant, dag/datum + "Idag i Lysekil" i Fraunces 28px på vit. Lysekil-vapensköld diskret. Höjd ~36% av skärmen.
2. **Live-rad** — pill-chips horisontellt, 18px text: `☀️ 22° · 🌊 17° · ⚓ Färjan 8 min · 💨 4 m/s · 🅿️ Lediga`. Klickbara, leder till motsvarande detalj.
3. **Hitta snabbt** — 6 rutor (Evenemang, Mat & Fika, Vandring, Hav & Bad, Boende, Felanmälan). Alla ikoner gullmarn-blå. Bakgrunder zigzag i skum/sand. 112px höjd, klickyta hela rutan.
4. **Just nu händer** — horisontell scroll med editorial-cards (260×200), riktiga Lysekil-händelser (Sillens dag, Havets dag, marknad, sommarkonsert, Hamnloppet). CTA "Visa alla evenemang →".
5. **Tre tips just nu** — tidsbaserad kuratering (morgon/dag/eftermiddag/kväll). Tre stora editorial-kort med bild, kategori-tag, rubrik (Fraunces 22), beskrivning + meta ("12 min till fots").
6. **Berättelser från Lysekil** — två längre cards med magasinkänsla. Exempel: *"Varför är klipporna vid Stångehuvud röda?"* / *"Skotts gata och de vita husen"*.
7. **Bottenmarginal** — 100px luft över tab-bar.

### 4.2 Karta

- Tile-stil **Stadia Outdoor**
- Sticky filterrad i toppen: Allt • Bad • Äta • Parkering • Toaletter • Laddning • Buss • Färja
- "Min plats"-knapp 64×64dp flytande nere till höger
- Custom pins i kategorifärg, **clustering** vid utzoom
- POI-**bottom-sheet** med drag-handle, hero-bild 240px, namn, beskrivning, meta, tre stora knappar: **Vägbeskrivning** / **Ring** / **Spara**
- För badplatser: extra rad med vattentemp/vind/alg
- "Återställ"-pill när zoomat/filtrerat

### 4.3 Äta

- Filterrad: Lunch idag • À la carte • Café & Fika • Take away • Glass
- Default "Lunch idag" visar dagens rätt direkt på kortet
- **Restaurang-detalj:** hero-bild, dagens lunch om relevant, telefon (klickbart `tel:`), öppettider per veckodag, karta-knapp, tillgänglighetsinfo
- Inga betyg/stjärnor (undviker AI-platsmarkads-känsla)

### 4.4 Resa

- **Hero-kort "Närmaste avgång"** — smart-val mellan färja och buss baserat på tid/läge. 36px nedräkning.
- 5 utfällbara kort:
  1. **Personfärjan Lysekil ↔ Fiskebäckskil** — nedräkning, dagens schema, "Påminn 10 min innan"
  2. **Bilfärjan Finnsbo ↔ Skår** — tider, gratis-info, väntetidsuppskattning per dag/säsong
  3. **Tuff-tuff-tåget** — sommarrutt, avgångar Stora Torget, biljettpris, var man köper
  4. **Bussar (Västtrafik)** — närmaste hållplats, nästa 3 avgångar, "Öppna Västtrafik-app"
  5. **Taxi Lysekil** — telefonnummer, ett-tap att ringa

### 4.5 Hav & Bad

- **Hero "Idag vid havet"** — vattentemp medel, vind, alg, UV i magasinformat (Fraunces 36)
- Badplatslista: bild, namn, vattentemp stort, vindpil, tillgänglighetsbadge, avstånd
- **Badplats-detalj:** hero, väderdata, parkering närmast, toaletter, vägbeskrivning, mini-graf med historisk badtemp, kommunkommentar
- **Gästhamn:** statuskort ("12 av 80 lediga"), pris, bokning via SMS, hamnens service

### 4.6 Mer

Kategoriserad lista i tre block:

- **UPPLEV** — Vandring & natur · Butiker · Boende · Evenemang
- **SERVICE & SAMHÄLLE** — Felanmälan · Sophämtning & återvinning · Parkering · Bankomater & toaletter · Vårdcentral & apotek
- **APPEN** — Tillgänglighet · Språk (SV/EN/DE) · Om appen · Kontakt

---

## 5. Tre nya nyckelfunktioner

### 5.1 Felanmälan
- Stor knapp "Rapportera fel" på Upptäck-rutnätet och i Mer-listan
- 5-stegsflöde: Typ → Foto → Plats (GPS, ändringsbar) → Beskrivning (frivillig) → Kontakt (e-post + ev. tel) → Skicka
- Bekräftelse med ärendenummer, "Vi svarar inom 3 arbetsdagar"
- "Mina anmälningar"-vy med status: Mottagen / Pågår / Åtgärdad
- **Ingen inloggning** — endast e-post + ärendenummer

### 5.2 Vatten- & Badkoll
- Realtidsvattentemp per badplats
- Algflagga: grön / gul / röd
- Vind, vågor, UV-index, badvarning från Folkhälsomyndigheten
- Auto-rekommendation: "Bästa badplatsen just nu" baserat på vind + temp + alg

### 5.3 Tillgänglighetsguide
- Filter "Visa endast tillgänglighetsanpassat" på alla listor
- Egen vy: rullstolsvänliga promenader, badplatser med ramp, restauranger med hiss/HK-toa, P-platser med extra utrymme
- "Stor text"-läge slås på härifrån

---

## 6. Tillgänglighet (WCAG)

- **Kontrast:** AAA (≥7:1) för all brödtext, AA (≥4.5:1) för stora rubriker
- **Klickytor:** ≥56×56dp överallt
- **Textstorlek:** 18px brödtext default, dynamisk skalning ett steg upp via Inställningar
- **Fokusring:** synlig 3px gullmarn på alla interaktiva element
- **Reduce motion:** respekterar OS-inställning, stänger av parallax/fades
- **Bottenmenyn:** ikoner fyllda när aktiva (synligt på avstånd), text 13px Inter SemiBold under varje
- **Språk:** SV default, EN/DE ska finnas som inställning (prototyp: SV fullt, EN/DE som platshållare)
- **Skärmläsare:** alla bilder har alt-text, alla knappar har aria-label där ikon ensam inte räcker

---

## 7. Övergångar & polish

- **Splash → Upptäck:** 1.5s, logo fadear ut, hero fadear in (320ms)
- **Sub-page öppning:** slide-from-right, 280ms ease-out
- **Tab-byte:** instant, ingen animation
- **Reduce-motion:** alla animationer av
- **Skeleton loaders** istället för spinners
- **Pull-to-refresh** på Upptäck, Äta, Resa, Hav & Bad
- **Haptisk feedback** på primära CTA (om enhet stöder)
- **Toast:** 2s, slide-up, mörk gullmarn med vit text
- **Sub-page back:** swipe från vänster kant + back-knapp i header

---

## 8. Mikrocopy-regler

- "Se alla" → **"Visa alla evenemang →"**
- Alltid handlingsord i CTA: "Öppna karta", "Ladda ned offline-karta", "Ring restaurangen"
- Datum: "Lör 4 juli"
- Tid: "14:00–17:30" (sv. format)
- Inga utropstecken
- Andra person, varmt och rakt
- Inga emojis i rubriker (accepteras i live-raden där de är ikoner)

---

## 9. Vad som INTE ingår

- React Native-migrering (`src/` rörs inte)
- Riktig backend / API (allt är hårdkodad data i `app.js`)
- Push-notiser (lokala notiser simuleras med toast)
- Inloggning, konton, profiler
- Onboarding-flow
- Mörkt läge (parkeras till efter demon)

---

## 10. Filstruktur efter omarbetning

```
prototype/
├── index.html              # Alla skärmar och sub-pages
├── style.css               # Design-tokens + alla komponenter
├── app.js                  # Navigation, kartlogik, data, mikrointeraktioner
├── data/
│   ├── pois.js             # Kartens POI:er
│   ├── events.js           # Evenemang
│   ├── restaurants.js      # Restauranger + dagens lunch
│   ├── beaches.js          # Badplatser med tillgänglighet
│   ├── transport.js        # Färjor, buss, tuff-tuff, taxi
│   └── stories.js          # Berättelser från Lysekil
└── assets/
    ├── liggande_färg.png   # Befintlig logo
    └── images/             # Lokalt cachade Bohuslän-bilder
```

---

## 11. Demo-checklista (innan kommunpitch)

- [ ] Alla skärmar har riktigt Lysekil-innehåll, ingen lorem ipsum, inga generiska kustbilder
- [ ] Alla 6 flikar fungerar och har polerad design
- [ ] Alla sub-pages från sektion 2 är färdigbyggda
- [ ] Felanmälan-flöde går att klicka igenom (utan riktig backend)
- [ ] WCAG AAA på all brödtext (verifierat i kontrastverktyg)
- [ ] "Stor text"-inställning fungerar utan layoutbrott
- [ ] Reduce-motion respekteras
- [ ] "Tre tips just nu" växlar innehåll baserat på klockslag
- [ ] Demo-flöde dokumenterat — vilken ordning skärmarna visas under pitchen
