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
  const date = new Date(isoDate + "T12:00:00");
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
