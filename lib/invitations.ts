import type { StaticImageData } from "next/image";
import classic from "../public/images/invitations/classic.png";
import garden from "../public/images/invitations/garden.png";
import goldenThumb from "../public/images/invitations/golden-thumb.png";
import golden from "../public/images/invitations/golden.png";
import minimalThumb from "../public/images/invitations/minimal-thumb.png";
import minimal from "../public/images/invitations/minimal.png";
import modern from "../public/images/invitations/modern.png";
import moonlightScreen from "../public/images/invitations/moonlight-screen.png";
import moonlight from "../public/images/invitations/moonlight.png";

export const CATEGORIES = [
  "ქორწილი",
  "დაბადების დღე",
  "კერძო ვახშამი",
  "კორპორაციული",
  "სხვა",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Template = {
  slug: string;
  title: string;
  category: Category;
  /** long copy used on desktop cards */
  description: string;
  /** short "category · mood" line used on mobile cards */
  tagline: string;
  /** short copy for the compact mobile list on the detail page */
  shortDescription: string;
  image: StaticImageData;
  /** square crop used by the compact mobile list (only where the design has one) */
  thumb?: StaticImageData;
  /** image inside the phone mock-up on the detail page */
  screen: StaticImageData;
};

export const TEMPLATES: Template[] = [
  {
    slug: "moonlight",
    title: "მთვარის შუქი",
    category: "ქორწილი",
    description:
      "ელეგანტური ციფრული მოსაწვევი ღამის ცისა და მთვარის ესთეტიკით. იდეალურია დახვეწილი საღამოს ქორწილისთვის.",
    tagline: "ქორწილი · ელეგანტური მოსაწვევი",
    shortDescription: "ელეგანტური მოსაწვევი ღამის ცისა და მთვარის ესთეტიკით.",
    image: moonlight,
    screen: moonlightScreen,
  },
  {
    slug: "golden-leaves",
    title: "ოქროს ფურცლები",
    category: "დაბადების დღე",
    description:
      "თბილი, ოქროსფერი დეტალებით გაფორმებული თანამედროვე დიზაინი თქვენი საიუბილეო დღესასწაულისთვის.",
    tagline: "დაბადების დღე · თბილი დიზაინი",
    shortDescription:
      "თბილი, ოქროსფერი დეტალებით გაფორმებული თანამედროვე დიზაინი.",
    image: golden,
    thumb: goldenThumb,
    screen: golden,
  },
  {
    slug: "minimalist",
    title: "მინიმალისტი",
    category: "კორპორაციული",
    description:
      "სუფთა ხაზები, მკაფიო გეომეტრია და პროფესიონალური ესთეტიკა ბიზნეს ღონისძიებებისთვის.",
    tagline: "კორპორაციული · სუფთა ხაზები",
    shortDescription:
      "სუფთა ხაზები, მკაფიო გეომეტრია და პროფესიონალური ესთეტიკა.",
    image: minimal,
    thumb: minimalThumb,
    screen: minimal,
  },
  {
    slug: "garden-party",
    title: "ბაღის წვეულება",
    category: "კერძო ვახშამი",
    description:
      "მსუბუქი, ორგანული ყვავილოვანი მოტივები მეგობრებთან ერთად მყუდროდ გატარებული საღამოებისთვის.",
    tagline: "კერძო ვახშამი · ორგანული",
    shortDescription:
      "მსუბუქი, ორგანული ყვავილოვანი მოტივები მყუდრო საღამოებისთვის.",
    image: garden,
    screen: garden,
  },
  {
    slug: "classic-elegance",
    title: "კლასიკური ელეგანტი",
    category: "ქორწილი",
    description:
      "მარადიული სილამაზე, კლასიკური შრიფტით და პრემიუმ რედაქციული ტექსტურით.",
    tagline: "ქორწილი · მარადიული",
    shortDescription:
      "მარადიული სილამაზე, კლასიკური შრიფტით და პრემიუმ ტექსტურით.",
    image: classic,
    screen: classic,
  },
  {
    slug: "modern",
    title: "თანამედროვე",
    category: "სხვა",
    description:
      "აბსტრაქტული ხელოვნება და ცოცხალი ფორმები ნებისმიერი ტიპის არასტანდარტული წვეულებისთვის.",
    tagline: "სხვა · აბსტრაქტული",
    shortDescription:
      "აბსტრაქტული ხელოვნება და ცოცხალი ფორმები არასტანდარტული წვეულებისთვის.",
    image: modern,
    screen: modern,
  },
];

export function getTemplate(slug: string) {
  return TEMPLATES.find((t) => t.slug === slug);
}

/** What every template includes (shown on the detail page). */
export const TEMPLATE_INCLUDES = [
  "პერსონალიზებული ტექსტი და დიზაინი",
  "დასწრების პასუხის მყისიერი სისტემა (RSVP)",
  "ლოკაციის ინტეგრირებული რუკა და ნავიგაცია",
  "მრავალენოვანი მხარდაჭერა სტუმრებისთვის",
  "Event Camera - საერთო გალერეის ფუნქცია",
  "ხმოვანი სტუმართა წიგნის დატოვების შესაძლებლობა",
];
