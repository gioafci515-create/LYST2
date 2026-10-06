import { getTemplate } from "./invitations";

export const EVENT_TYPES = [
  // `whiteIcon`: this one asset was exported with a white stroke (drawn for
  // the black "selected" badge) while the other five are black — so its
  // invert logic runs backwards from the rest.
  { key: "wedding", icon: "wedding", whiteIcon: true },
  { key: "birthday", icon: "birthday", whiteIcon: false },
  { key: "dinner", icon: "dinner", whiteIcon: false },
  { key: "corporate", icon: "corporate", whiteIcon: false },
  { key: "charity", icon: "charity", whiteIcon: false },
  { key: "other", icon: "other", whiteIcon: false },
] as const;

export type EventTypeKey = (typeof EVENT_TYPES)[number]["key"];

// The wizard's own template gallery reuses the invitation template images;
// `tag` and the translated title (messages/{locale}.json under
// create.templates.{slug}) are the creation-flow's own copy — it differs
// from the /invitations catalog copy in the design.
export const CREATION_TEMPLATES = [
  { tag: "Editorial", template: getTemplate("moonlight")! },
  { tag: "Minimal", template: getTemplate("golden-leaves")! },
  { tag: "Modern", template: getTemplate("minimalist")! },
  { tag: "Classic", template: getTemplate("modern")! },
];

export type WizardSettings = {
  rsvp: boolean;
  guestQuestions: boolean;
  gallery: boolean;
  guestInfoFields: boolean;
};

export const DEFAULT_SETTINGS: WizardSettings = {
  rsvp: true,
  guestQuestions: true,
  gallery: true,
  guestInfoFields: true,
};

export type WizardData = {
  eventType: EventTypeKey | null;
  templateSlug: string;
  format: "digital" | "interactive";
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dressCode: string;
  settings: WizardSettings;
};

export const INITIAL_WIZARD_DATA: WizardData = {
  eventType: "wedding",
  templateSlug: CREATION_TEMPLATES[0].template.slug,
  format: "digital",
  name: "",
  date: "",
  time: "",
  location: "",
  description: "",
  dressCode: "",
  settings: DEFAULT_SETTINGS,
};
