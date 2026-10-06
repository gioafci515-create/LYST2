import type { StaticImageData } from "next/image";
import classic from "@/public/images/invitations/classic.png";
import garden from "@/public/images/invitations/garden.png";
import goldenThumb from "@/public/images/invitations/golden-thumb.png";
import golden from "@/public/images/invitations/golden.png";
import minimalThumb from "@/public/images/invitations/minimal-thumb.png";
import minimal from "@/public/images/invitations/minimal.png";
import modern from "@/public/images/invitations/modern.png";
import moonlightScreen from "@/public/images/invitations/moonlight-screen.png";
import moonlight from "@/public/images/invitations/moonlight.png";

// Stable, locale-independent keys — the display label for each lives in
// messages/{locale}.json under invitationsData.categories.{key}, same
// pattern lib/creationFlow.ts already uses for EVENT_TYPES.
export const CATEGORY_KEYS = [
  "wedding",
  "birthday",
  "privateDinner",
  "corporate",
  "other",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export type TemplateMeta = {
  slug: string;
  categoryKey: CategoryKey;
  image: StaticImageData;
  /** square crop used by the compact mobile list (only where the design has one) */
  thumb?: StaticImageData;
  /** image inside the phone mock-up on the detail page */
  screen: StaticImageData;
};

// Structural data only — title/description/tagline/shortDescription are
// translated text and live in messages/{locale}.json under
// invitationsData.templates.{slug}.
export const TEMPLATES: TemplateMeta[] = [
  { slug: "moonlight", categoryKey: "wedding", image: moonlight, screen: moonlightScreen },
  { slug: "golden-leaves", categoryKey: "birthday", image: golden, thumb: goldenThumb, screen: golden },
  { slug: "minimalist", categoryKey: "corporate", image: minimal, thumb: minimalThumb, screen: minimal },
  { slug: "garden-party", categoryKey: "privateDinner", image: garden, screen: garden },
  { slug: "classic-elegance", categoryKey: "wedding", image: classic, screen: classic },
  { slug: "modern", categoryKey: "other", image: modern, screen: modern },
];

export function getTemplate(slug: string) {
  return TEMPLATES.find((t) => t.slug === slug);
}
