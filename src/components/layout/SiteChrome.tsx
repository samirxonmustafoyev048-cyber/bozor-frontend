"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps the page in the shop's header and footer, except inside the admin
 * panel — that section brings its own sidebar and topbar, so the shop
 * navigation there was a second, unrelated set of controls above it.
 *
 * The header and footer arrive as props rather than imports: they are server
 * components, and this has to be a client component to read the route.
 */
export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPanel = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdminPanel && header}
      <main className="flex-1">{children}</main>
      {!isAdminPanel && footer}
    </>
  );
}
