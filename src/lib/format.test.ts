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
    expect(formatAge("2026-03-09", "en")).toBe("6 months");
    expect(formatAge("2026-03-09", "pt")).toBe("6 meses");
  });

  it("uses whole years after that", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-09"));
    expect(formatAge("2021-05-20", "en")).toBe("5 years");
    expect(formatAge("2021-05-20", "pt")).toBe("5 anos");
  });
});

describe("dates", () => {
  it("formats a long date in each locale", () => {
    expect(formatLongDate("2026-07-20", "en")).toBe("20 July 2026");
    expect(formatLongDate("2026-07-20", "pt")).toMatch(/julho/i);
  });

  it("formats month + year", () => {
    expect(formatMonthYear("2026-11-15", "en")).toBe("November 2026");
    expect(formatMonthYear("2026-11-15", "pt")).toMatch(/novembro/i);
  });
});

describe("formatLitterWhen", () => {
  it("prefers bornOn", () => {
    expect(formatLitterWhen({ bornOn: "2026-07-20", expectedOn: "2026-07-01" }, "en")).toBe(
      "Born 20 July 2026",
    );
    expect(formatLitterWhen({ bornOn: "2026-07-20" }, "pt")).toMatch(/^Nascidos /);
  });

  it("falls back to expectedOn", () => {
    expect(formatLitterWhen({ expectedOn: "2026-11-15" }, "en")).toBe(
      "Expected November 2026",
    );
  });

  it("says TBA when neither date is set", () => {
    expect(formatLitterWhen({}, "en")).toBe("Dates to be confirmed");
    expect(formatLitterWhen({}, "pt")).toBe("Datas a confirmar");
  });
});
