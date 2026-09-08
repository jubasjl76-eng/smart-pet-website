export const PRIMARY_NAV = [
  { href: "/dogs", label: "Dogs" },
  { href: "/litters", label: "Litters" },
  { href: "/about", label: "About" },
  { href: "/apply", label: "Apply" },
] as const;

export const FOOTER_NAV = [
  ...PRIMARY_NAV,
  { href: "/health", label: "Health & guarantee" },
  { href: "/faq", label: "FAQ" },
] as const;
