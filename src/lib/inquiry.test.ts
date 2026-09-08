import { describe, expect, it } from "vitest";
import { parseInquiry } from "./inquiry";

describe("parseInquiry", () => {
  it("accepts a minimal valid body", () => {
    const result = parseInquiry({
      name: "Ada",
      email: "ada@example.com",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Ada");
      expect(result.data.email).toBe("ada@example.com");
      expect(result.data.company).toBeUndefined();
    }
  });

  it("keeps puppy and litter ids", () => {
    const result = parseInquiry({
      name: "Ada",
      email: "ada@example.com",
      puppyId: "pup_ws_green",
      litterId: "litter_willow_bruce_2026s",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.puppyId).toBe("pup_ws_green");
      expect(result.data.litterId).toBe("litter_willow_bruce_2026s");
    }
  });

  it("rejects a missing name and a bad email", () => {
    const result = parseInquiry({ name: "", email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toMatch(/name/i);
      expect(result.errors.email).toMatch(/email/i);
    }
  });

  it("treats empty optional fields as absent", () => {
    const result = parseInquiry({
      name: "Ada",
      email: "ada@example.com",
      phone: "",
      message: "   ",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.phone).toBeUndefined();
      expect(result.data.message).toBeUndefined();
    }
  });

  it("rejects a filled honeypot", () => {
    const result = parseInquiry({
      name: "Bot",
      email: "bot@example.com",
      company: "Acme",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.company).toBeTruthy();
    }
  });
});
