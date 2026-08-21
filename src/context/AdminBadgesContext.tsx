"use client";

import { createContext, useContext } from "react";

/**
 * Lets an admin page refresh the counters in the sidebar and topbar.
 *
 * The layout owns those numbers, but the page that changes them — marking a
 * notification read, for instance — is rendered as `children`, so it cannot be
 * handed a callback through props.
 */
const AdminBadgesContext = createContext<{ refresh: () => void }>({
  refresh: () => {},
});

export function AdminBadgesProvider({
  refresh,
  children,
}: {
  refresh: () => void;
  children: React.ReactNode;
}) {
  return (
    <AdminBadgesContext.Provider value={{ refresh }}>
      {children}
    </AdminBadgesContext.Provider>
  );
}

export function useAdminBadges() {
  return useContext(AdminBadgesContext);
}
