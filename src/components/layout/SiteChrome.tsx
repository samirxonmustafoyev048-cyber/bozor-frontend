"use client";

import { usePathname } from "next/navigation";
import StaffBar from "@/components/layout/StaffBar";

/** Panels that serve staff, not shoppers. */
const STAFF_PANELS = ["/admin", "/kassa", "/ombor"];

/**
 * Wraps the page in the shop's header and footer, except inside the staff
 * panels — their users are working, not shopping, so the search box, cart and
 * category links there were a second, unrelated set of controls.
 *
 * The admin panel brings its own sidebar and topbar. The till and the warehouse
 * do not, so they get StaffBar instead of nothing at all.
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
  const isStaffPanel = STAFF_PANELS.some(
    (panel) => pathname === panel || pathname.startsWith(`${panel}/`)
  );
  // The admin panel has a topbar of its own; the others need one from here.
  const needsStaffBar =
    isStaffPanel && !(pathname === "/admin" || pathname.startsWith("/admin/"));

  return (
    <>
      {!isStaffPanel && header}
      {needsStaffBar && <StaffBar />}
      <main className="flex-1">{children}</main>
      {!isStaffPanel && footer}
    </>
  );
}
