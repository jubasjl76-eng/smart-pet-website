import type { LitterStatus, PuppyStatus } from "./types";
import type { Locale } from "@/i18n/routing";

const LITTER_STATUS: Record<Locale, Record<LitterStatus, string>> = {
  en: {
    planned: "Planned",
    expecting: "Expecting",
    born: "Just born",
    available: "Puppies available",
    reserved: "All reserved",
    sold_out: "Placed",
  },
  pt: {
    planned: "Planeada",
    expecting: "À espera",
    born: "Recém-nascidos",
    available: "Cachorros disponíveis",
    reserved: "Todos reservados",
    sold_out: "Colocados",
  },
};

const PUPPY_STATUS: Record<Locale, Record<PuppyStatus, string>> = {
  en: {
    available: "Available",
    reserved: "Reserved",
    sold: "In its new home",
  },
  pt: {
    available: "Disponível",
    reserved: "Reservado",
    sold: "Na nova casa",
  },
};

export const LITTER_STATUS_LABEL = LITTER_STATUS.pt;
export const PUPPY_STATUS_LABEL = PUPPY_STATUS.pt;

/** Token classes only — accent for the one status that can be reserved. */
export const PUPPY_STATUS_TONE: Record<PuppyStatus, "accent" | "muted"> = {
  available: "accent",
  reserved: "muted",
  sold: "muted",
};

export function litterStatusLabel(status: LitterStatus, locale: Locale = "pt"): string {
  return LITTER_STATUS[locale][status];
}

export function puppyStatusLabel(status: PuppyStatus, locale: Locale = "pt"): string {
  return PUPPY_STATUS[locale][status];
}

export function puppyStatusTone(status: PuppyStatus): "accent" | "muted" {
  return PUPPY_STATUS_TONE[status];
}
