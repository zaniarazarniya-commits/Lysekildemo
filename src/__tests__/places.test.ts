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
