"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Check, ChevronDown } from "lucide-react";
import type { Branch } from "@/types/product";

const BRANCH_PREVIEW_COUNT = 3;

export default function BranchList({
  branches,
  value,
  onChange,
}: {
  branches: Branch[];
  value: string;
  onChange: (id: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? branches : branches.slice(0, BRANCH_PREVIEW_COUNT);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-bold text-foreground">
          <MapPin aria-hidden className="h-4 w-4 text-brand-600" />
          Olib ketish uchun filiallar
        </h2>
        <Link href="/filiallar" className="text-xs font-medium text-brand-700 hover:underline">
          Xaritada ko&apos;rish →
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {visible.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onChange(b.id)}
            className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors ${
              value === b.id
                ? "border-brand-500 bg-brand-50/60"
                : "border-border hover:border-brand-200"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MapPin aria-hidden className="h-4 w-4 shrink-0 text-brand-600" />
              <span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{b.name}</span>
                  {i === 0 && (
                    <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                      Eng yaqin
                    </span>
                  )}
                </span>
                <span className="block text-xs text-muted">{b.address}</span>
              </span>
            </span>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                value === b.id ? "border-brand-600 bg-brand-600 text-white" : "border-border"
              }`}
            >
              {value === b.id && <Check aria-hidden className="h-3 w-3" />}
            </span>
          </button>
        ))}
        {branches.length === 0 && (
          <p className="text-sm text-muted">Filiallar topilmadi.</p>
        )}
      </div>
      {branches.length > BRANCH_PREVIEW_COUNT && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-brand-700 hover:underline"
        >
          Yana {branches.length - BRANCH_PREVIEW_COUNT} ta filialni ko&apos;rish
          <ChevronDown aria-hidden className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
