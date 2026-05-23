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
