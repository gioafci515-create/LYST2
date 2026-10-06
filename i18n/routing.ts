import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ka", "en", "ru"],
  defaultLocale: "ka",
  // ka (default) stays unprefixed at "/", en/ru get "/en", "/ru" — existing
  // Georgian URLs keep working exactly as they are today.
  localePrefix: "as-needed",
});
