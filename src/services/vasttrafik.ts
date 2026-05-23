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
  { time: "14:15", direction: "to", status: "onTime" },
  { time: "14:30", direction: "from", status: "onTime" },
  { time: "14:45", direction: "to", status: "onTime" },
  { time: "15:00", direction: "from", status: "onTime" },
  { time: "15:15", direction: "to", status: "onTime" },
  { time: "15:30", direction: "from", status: "delayed", delayMinutes: 5 },
  { time: "15:45", direction: "to", status: "onTime" },
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
