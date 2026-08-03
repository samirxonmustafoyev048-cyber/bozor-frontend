"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "popular", label: "Mashhurligi bo'yicha" },
  { value: "price-asc", label: "Arzon narx" },
  { value: "price-desc", label: "Qimmat narx" },
  { value: "new", label: "Yangi mahsulotlar" },
];

export default function SortDropdown({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("saralash", value);
    router.push(`?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <span className="hidden text-muted sm:inline">Saralash:</span>
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm outline-none focus:border-brand-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
