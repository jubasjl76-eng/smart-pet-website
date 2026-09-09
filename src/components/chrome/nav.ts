export const PRIMARY_NAV = [
  { href: "/dogs", key: "dogs" },
  { href: "/litters", key: "litters" },
  { href: "/about", key: "about" },
  { href: "/apply", key: "apply" },
] as const;

export const FOOTER_NAV = [
  ...PRIMARY_NAV,
  { href: "/health", key: "health" },
  { href: "/faq", key: "faq" },
] as const;
