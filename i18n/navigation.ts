import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/router/usePathname/redirect — use these instead of
// next/navigation and next/link anywhere a link needs to respect the
// current locale prefix.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
