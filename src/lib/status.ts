import type { LitterStatus, PuppyStatus } from "./types";

export const LITTER_STATUS_LABEL: Record<LitterStatus, string> = {
  planned: "Planned",
  expecting: "Expecting",
  born: "Just born",
  available: "Puppies available",
  reserved: "All reserved",
  sold_out: "Placed",
};

export const PUPPY_STATUS_LABEL: Record<PuppyStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "In its new home",
};

/** Token classes only — accent for the one status that can be reserved. */
export const PUPPY_STATUS_TONE: Record<PuppyStatus, "accent" | "muted"> = {
  available: "accent",
  reserved: "muted",
  sold: "muted",
};

export function litterStatusLabel(status: LitterStatus): string {
  return LITTER_STATUS_LABEL[status];
}

export function puppyStatusLabel(status: PuppyStatus): string {
  return PUPPY_STATUS_LABEL[status];
}

export function puppyStatusTone(status: PuppyStatus): "accent" | "muted" {
  return PUPPY_STATUS_TONE[status];
}
