"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProductBySlug, products } from "@/lib/mock/products";
import type { Product } from "@/types/product";

const STORAGE_KEY = "bozor_cart";
const EMPTY: StoredLine[] = [];

interface StoredLine {
  productId: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  totalCount: number;
  subtotal: number;
  isLoaded: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// Module-level store synced to localStorage, read via useSyncExternalStore
// so the cart survives hydration without a setState-in-effect round-trip.
let cartState: StoredLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function loadFromStorage(): StoredLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredLine[]) : [];
  } catch {
    return [];
  }
}

function ensureHydrated() {
  if (!hydrated) {
    cartState = loadFromStorage();
    hydrated = true;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function mutate(updater: (prev: StoredLine[]) => StoredLine[]) {
  ensureHydrated();
  cartState = updater(cartState);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): StoredLine[] {
  ensureHydrated();
  return cartState;
}

function getServerSnapshot(): StoredLine[] {
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

export function CartProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoaded = useSyncExternalStore(subscribeNoop, getClientTrue, getClientFalse);

  const addItem = useCallback((productId: string, quantity = 1) => {
    mutate((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    mutate((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    mutate((prev) => {
      if (quantity <= 0) {
        return prev.filter((l) => l.productId !== productId);
      }
      return prev.map((l) =>
        l.productId === productId ? { ...l, quantity } : l
      );
    });
  }, []);

  const clear = useCallback(() => mutate(() => []), []);

  const lines = useMemo<CartLine[]>(() => {
    return stored
      .map((line) => {
        const product =
          products.find((p) => p.id === line.productId) ??
          getProductBySlug(line.productId);
        if (!product) return null;
        const unitPrice = product.discountPrice ?? product.price;
        return {
          product,
          quantity: line.quantity,
          lineTotal: unitPrice * line.quantity,
        };
      })
      .filter((l): l is CartLine => l !== null);
  }, [stored]);

  const totalCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    totalCount,
    subtotal,
    isLoaded,
    addItem,
    removeItem,
    setQuantity,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
