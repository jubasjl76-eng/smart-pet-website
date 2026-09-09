import { describe, expect, it } from "vitest";
import {
  litterStatusLabel,
  puppyStatusLabel,
  puppyStatusTone,
} from "./status";

describe("status maps", () => {
  it("labels every litter status", () => {
    expect(litterStatusLabel("available", "en")).toBe("Puppies available");
    expect(litterStatusLabel("sold_out", "en")).toBe("Placed");
    expect(litterStatusLabel("planned", "pt")).toBe("Planeada");
  });

  it("labels every puppy status", () => {
    expect(puppyStatusLabel("available", "en")).toBe("Available");
    expect(puppyStatusLabel("reserved", "pt")).toBe("Reservado");
    expect(puppyStatusLabel("sold", "en")).toBe("In its new home");
  });

  it("uses accent only for available puppies", () => {
    expect(puppyStatusTone("available")).toBe("accent");
    expect(puppyStatusTone("reserved")).toBe("muted");
    expect(puppyStatusTone("sold")).toBe("muted");
  });
});
