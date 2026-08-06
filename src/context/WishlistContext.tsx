"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/types/product";

const STORAGE_KEY = "bozor_wishlist";
const EMPTY: Product[] = [];

interface WishlistContextValue {
  products: Product[];
  isLoaded: boolean;
  isWishlisted: (productId: string) => boolean;
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

let wishlistState: Product[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function loadFromStorage(): Product[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function ensureHydrated() {
  if (!hydrated) {
    wishlistState = loadFromStorage();
    hydrated = true;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function mutate(updater: (prev: Product[]) => Product[]) {
  ensureHydrated();
  wishlistState = updater(wishlistState);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistState));
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Product[] {
  ensureHydrated();
  return wishlistState;
}

function getServerSnapshot(): Product[] {
  return EMPTY;
}

function subscribeNoop() {
  return () => {};
}

function getClientTrue() {
  return true;
}

function getClientFalse() {
  return false;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const products = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoaded = useSyncExternalStore(subscribeNoop, getClientTrue, getClientFalse);

  const toggle = useCallback((product: Product) => {
    mutate((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const remove = useCallback((productId: string) => {
    mutate((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clear = useCallback(() => mutate(() => []), []);

  const isWishlisted = useCallback(
    (productId: string) => products.some((p) => p.id === productId),
    [products]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ products, isLoaded, isWishlisted, toggle, remove, clear }),
    [products, isLoaded, isWishlisted, toggle, remove, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
