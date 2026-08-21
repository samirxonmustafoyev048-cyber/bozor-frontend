"use client";

import { createContext, useContext } from "react";
import { FALLBACK_STORE_NAME } from "@/lib/store-name";

/**
 * Carries the shop name to client components, which cannot read it from the
 * API the way a server component does. Seeded once in the root layout, so the
 * admin sidebar and the staff bar rename with everything else.
 */
const StoreNameContext = createContext(FALLBACK_STORE_NAME);

export function StoreNameProvider({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <StoreNameContext.Provider value={value}>
      {children}
    </StoreNameContext.Provider>
  );
}

export function useStoreName(): string {
  return useContext(StoreNameContext);
}
