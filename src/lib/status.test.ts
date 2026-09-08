import { describe, expect, it } from "vitest";
import {
  litterStatusLabel,
  puppyStatusLabel,
  puppyStatusTone,
} from "./status";

describe("status maps", () => {
  it("labels every litter status", () => {
    expect(litterStatusLabel("available")).toBe("Puppies available");
    expect(litterStatusLabel("sold_out")).toBe("Placed");
    expect(litterStatusLabel("planned")).toBe("Planned");
  });

  it("labels every puppy status", () => {
    expect(puppyStatusLabel("available")).toBe("Available");
    expect(puppyStatusLabel("reserved")).toBe("Reserved");
    expect(puppyStatusLabel("sold")).toBe("In its new home");
  });

  it("uses accent only for available puppies", () => {
    expect(puppyStatusTone("available")).toBe("accent");
    expect(puppyStatusTone("reserved")).toBe("muted");
    expect(puppyStatusTone("sold")).toBe("muted");
  });
});
