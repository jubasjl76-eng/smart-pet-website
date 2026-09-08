import { afterEach, describe, expect, it, vi } from "vitest";
import { formatAge, formatLitterWhen, formatLongDate, formatMonthYear } from "./format";

afterEach(() => {
  vi.useRealTimers();
});

describe("formatAge", () => {
  it("returns empty when dob is missing", () => {
    expect(formatAge()).toBe("");
    expect(formatAge("")).toBe("");
  });

  it("uses months under one year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-09"));
    expect(formatAge("2026-03-09")).toBe("6 months");
  });

  it("uses whole years after that", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-09"));
    expect(formatAge("2021-05-20")).toBe("5 years");
  });
});

describe("dates", () => {
  it("formats a long Irish date", () => {
    expect(formatLongDate("2026-07-20")).toBe("20 July 2026");
  });

  it("formats month + year", () => {
    expect(formatMonthYear("2026-11-15")).toBe("November 2026");
  });
});

describe("formatLitterWhen", () => {
  it("prefers bornOn", () => {
    expect(formatLitterWhen({ bornOn: "2026-07-20", expectedOn: "2026-07-01" })).toBe(
      "Born 20 July 2026",
    );
  });

  it("falls back to expectedOn", () => {
    expect(formatLitterWhen({ expectedOn: "2026-11-15" })).toBe(
      "Expected November 2026",
    );
  });

  it("says TBA when neither date is set", () => {
    expect(formatLitterWhen({})).toBe("Dates to be confirmed");
  });
});
