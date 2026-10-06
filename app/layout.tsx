// Required by Next.js (every app needs a root layout.tsx), but the real
// <html>/<body> and all providers live in app/[locale]/layout.tsx — this
// is a pure pass-through so every route stays under the locale segment.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
