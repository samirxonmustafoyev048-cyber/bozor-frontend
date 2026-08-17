"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Banknote,
  CreditCard,
  ScanLine,
  CheckCircle2,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  createPosSale,
  getBranches,
  getCategories,
  getProducts,
  type PosSalePayload,
} from "@/lib/api";
import { formatSom } from "@/lib/format";
import { PHONE_LENGTH, isValidPhone, toApiPhone, toPhoneDigits } from "@/lib/phone";
import { cardLast4, isValidCard } from "@/lib/card";
import CardNumberField from "@/components/checkout/CardNumberField";
import ProductImage from "@/components/product/ProductImage";
import type { Branch, Category, Order, Product } from "@/types/product";

type PayMethod = "NAQD" | "KARTA";

interface Line {
  product: Product;
  quantity: number;
}

/** Quick-tender buttons: the notes a cashier actually gets handed. */
const NOTES = [10_000, 20_000, 50_000, 100_000, 200_000];

export default function CashierPage() {
  const { auth, isLoaded } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const [lines, setLines] = useState<Line[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>("NAQD");
  const [received, setReceived] = useState(0);
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [branchId, setBranchId] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Order | null>(null);

  useEffect(() => {
    getProducts({ pageSize: 200 })
      .then((r) => setProducts(r.items))
      .catch(() => setError("Mahsulotlarni yuklab bo'lmadi"));
    getCategories().then(setCategories).catch(() => {});
    getBranches()
      .then((data) => {
        setBranches(data);
        setBranchId((current) => current || data[0]?.id || "");
      })
      .catch(() => {});
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!activeCategory || p.category.slug === activeCategory) &&
        (!q || p.name.toLowerCase().includes(q))
    );
  }, [products, query, activeCategory]);

  const total = useMemo(
    () =>
      lines.reduce(
        (sum, l) => sum + (l.product.discountPrice ?? l.product.price) * l.quantity,
        0
      ),
    [lines]
  );

  const change = received - total;

  const addProduct = useCallback((product: Product) => {
    setError(null);
    setLines((current) => {
      const existing = current.find((l) => l.product.id === product.id);
      return existing
        ? current.map((l) =>
            l.product.id === product.id ? { ...l, quantity: l.quantity + 1 } : l
          )
        : [...current, { product, quantity: 1 }];
    });
  }, []);

  function setQuantity(productId: string, quantity: number) {
    setLines((current) =>
      quantity <= 0
        ? current.filter((l) => l.product.id !== productId)
        : current.map((l) =>
            l.product.id === productId ? { ...l, quantity } : l
          )
    );
  }

  function resetSale() {
    setLines([]);
    setReceived(0);
    setPhone("");
    setCard("");
    setError(null);
  }

  /** Enter finishes the sale, Escape clears it — both without leaving the keypad. */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (receipt) return;
      const typing =
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName);
      if (e.key === "Escape" && !typing) resetSale();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [receipt]);

  const canSubmit =
    lines.length > 0 &&
    !submitting &&
    (payMethod === "KARTA" ? isValidCard(card) : received >= total) &&
    (phone.length === 0 || isValidPhone(phone));

  async function handleCheckout() {
    if (!auth || !canSubmit) return;
    setSubmitting(true);
    setError(null);

    const payload: PosSalePayload = {
      items: lines.map((l) => ({ productId: l.product.id, quantity: l.quantity })),
      paymentMethod: payMethod,
      branchId: branchId || undefined,
      phone: phone ? toApiPhone(phone) : undefined,
      // Only the last four digits travel; the full number stays in this form.
      cardLast4: payMethod === "KARTA" ? cardLast4(card) : undefined,
    };

    try {
      const order = await createPosSale(auth.accessToken, payload);
      setReceipt(order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sotuvni yakunlab bo'lmadi");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isLoaded) return null;

  if (!auth || !["ADMIN", "KASSIR"].includes(auth.user.role)) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-bold text-foreground">
          Kassa paneli faqat xodimlar uchun
        </h1>
        <Link
          href="/kirish"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Kirish
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
            <ScanLine aria-hidden className="h-6 w-6 text-brand-600" />
            Kassa
          </h1>
          <p className="text-sm text-muted">
            Kassir: {auth.user.name}
            {branches.length > 0 && " · Filial tanlang"}
          </p>
        </div>

        {branches.length > 0 && (
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_22rem]">
        {/* Catalogue */}
        <div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
            <Search aria-hidden className="h-4 w-4 shrink-0 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot nomi bo'yicha qidirish..."
              autoFocus
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory("")}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                !activeCategory
                  ? "bg-brand-600 text-white"
                  : "border border-border text-muted hover:bg-brand-50"
              }`}
            >
              Barchasi
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActiveCategory(c.slug)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  activeCategory === c.slug
                    ? "bg-brand-600 text-white"
                    : "border border-border text-muted hover:bg-brand-50"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => addProduct(product)}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface text-left transition-shadow hover:border-brand-300 hover:shadow-md"
              >
                <span className="flex h-20 items-center justify-center bg-brand-50">
                  <ProductImage product={product} iconClassName="h-8 w-8 text-brand-500" />
                </span>
                <span className="flex flex-1 flex-col gap-0.5 p-2">
                  <span className="line-clamp-2 text-xs font-medium text-foreground">
                    {product.name}
                  </span>
                  <span className="text-[11px] text-muted">{product.unit}</span>
                  <span className="mt-auto text-sm font-bold text-brand-700">
                    {formatSom(product.discountPrice ?? product.price)}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="rounded-xl border border-border bg-surface px-4 py-10 text-center text-sm text-muted">
              Mahsulot topilmadi.
            </p>
          )}
        </div>

        {/* Current sale */}
        <aside className="flex h-fit flex-col rounded-2xl border border-border bg-surface lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="font-bold text-foreground">Joriy sotuv</h2>
            {lines.length > 0 && (
              <button
                type="button"
                onClick={resetSale}
                className="text-xs font-medium text-danger-600 hover:underline"
              >
                Tozalash
              </button>
            )}
          </div>

          {lines.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted">
              Mahsulot tanlang — u shu yerga qo&apos;shiladi.
            </p>
          ) : (
            <ul className="max-h-72 divide-y divide-border overflow-y-auto">
              {lines.map(({ product, quantity }) => {
                const unit = product.discountPrice ?? product.price;
                return (
                  <li key={product.id} className="flex items-center gap-2 px-4 py-2.5">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {formatSom(unit)} × {quantity} = {formatSom(unit * quantity)}
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="Kamaytirish"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted hover:bg-brand-50"
                      >
                        <Minus aria-hidden className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="Ko'paytirish"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted hover:bg-brand-50"
                      >
                        <Plus aria-hidden className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, 0)}
                        aria-label="O'chirish"
                        className="ml-0.5 text-muted hover:text-danger-600"
                      >
                        <Trash2 aria-hidden className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Jami</span>
              <span className="text-2xl font-extrabold text-foreground">
                {formatSom(total)}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {(
                [
                  { value: "NAQD", label: "Naqd", icon: Banknote },
                  { value: "KARTA", label: "Karta", icon: CreditCard },
                ] as const
              ).map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setPayMethod(m.value)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border-2 py-2 text-sm font-semibold ${
                    payMethod === m.value
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-border text-muted hover:border-brand-200"
                  }`}
                >
                  <m.icon aria-hidden className="h-4 w-4" />
                  {m.label}
                </button>
              ))}
            </div>

            {payMethod === "NAQD" && (
              <div className="mt-3">
                <label className="text-xs font-medium text-muted">
                  Qabul qilingan pul
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={received || ""}
                    onChange={(e) => setReceived(Number(e.target.value) || 0)}
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                </label>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {NOTES.map((note) => (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setReceived((r) => r + note)}
                      className="rounded-lg border border-border px-2 py-1 text-xs font-medium text-foreground hover:bg-brand-50"
                    >
                      +{note / 1000}k
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setReceived(total)}
                    className="rounded-lg border border-brand-200 bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700"
                  >
                    Aniq
                  </button>
                </div>

                {received > 0 && (
                  <p
                    className={`mt-2 flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold ${
                      change >= 0
                        ? "bg-brand-50 text-brand-700"
                        : "bg-danger-500/10 text-danger-600"
                    }`}
                  >
                    <span>{change >= 0 ? "Qaytim" : "Yetishmayapti"}</span>
                    <span>{formatSom(Math.abs(change))}</span>
                  </p>
                )}
              </div>
            )}

            {payMethod === "KARTA" && (
              <CardNumberField value={card} onChange={setCard} className="mt-3" />
            )}

            <label className="mt-3 block text-xs font-medium text-muted">
              Mijoz telefoni (ixtiyoriy)
              <span className="mt-1 flex items-center rounded-lg border border-border bg-background px-3 py-2 focus-within:border-brand-500">
                <span className="shrink-0 select-none pr-1 text-muted">+</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(toPhoneDigits(e.target.value))}
                  placeholder="998901234567"
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
                {phone.length > 0 && (
                  <span className="shrink-0 pl-2 text-[11px] tabular-nums text-muted">
                    {phone.length}/{PHONE_LENGTH}
                  </span>
                )}
              </span>
            </label>

            {error && <p className="mt-3 text-sm text-danger-600">{error}</p>}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={!canSubmit}
              className="mt-4 w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Yakunlanmoqda..." : "To'lovni yakunlash"}
            </button>
          </div>
        </aside>
      </div>

      {receipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-center shadow-2xl">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <CheckCircle2 aria-hidden className="h-7 w-7" />
            </span>
            <h2 className="mt-3 text-lg font-bold text-foreground">
              Sotuv yakunlandi
            </h2>
            <p className="mt-0.5 font-mono text-sm text-muted">
              {receipt.orderNumber}
            </p>

            <ul className="mt-4 flex flex-col gap-1 border-y border-border py-3 text-left text-sm">
              {receipt.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-2">
                  <span className="truncate text-muted">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="shrink-0 font-medium text-foreground">
                    {formatSom(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-bold text-foreground">Jami</span>
              <span className="text-lg font-extrabold text-brand-700">
                {formatSom(receipt.totalPrice)}
              </span>
            </div>
            {payMethod === "KARTA" && receipt.cardLast4 && (
              <div className="mt-1 flex items-center justify-between text-sm text-muted">
                <span>Karta</span>
                <span className="font-mono font-semibold">
                  •••• {receipt.cardLast4}
                </span>
              </div>
            )}
            {payMethod === "NAQD" && change > 0 && (
              <div className="mt-1 flex items-center justify-between text-sm text-muted">
                <span>Qaytim</span>
                <span className="font-semibold">{formatSom(change)}</span>
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  resetSale();
                }}
                className="flex-1 rounded-full bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Yangi sotuv
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-brand-50"
              >
                Chop etish
              </button>
              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  resetSale();
                }}
                aria-label="Yopish"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted hover:bg-brand-50"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
