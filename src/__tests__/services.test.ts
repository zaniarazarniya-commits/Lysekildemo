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
