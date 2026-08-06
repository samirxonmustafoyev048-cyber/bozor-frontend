"use client";

import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { jobOpenings, departmentFilters, type Department } from "@/lib/careers-data";

type FilterKey = "Barchasi" | Department;

function timeAgoLabel(days: number): string {
  if (days === 1) return "1 kun oldin";
  return `${days} kun oldin`;
}

export default function JobListings() {
  const [filter, setFilter] = useState<FilterKey>("Barchasi");
  const [sort, setSort] = useState<"yangi" | "eski">("yangi");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered = jobOpenings
    .filter((job) => filter === "Barchasi" || job.department === filter)
    .sort((a, b) =>
      sort === "yangi"
        ? a.postedDaysAgo - b.postedDaysAgo
        : b.postedDaysAgo - a.postedDaysAgo
    );

  function toggleSaved(id: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section id="ochiq-ish-orinlari">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          Ochiq ish o&apos;rinlari
        </h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "yangi" | "eski")}
          className="w-fit rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-brand-500"
        >
          <option value="yangi">Saralash: Yangi</option>
          <option value="eski">Saralash: Eski</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["Barchasi", ...departmentFilters] as FilterKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium sm:text-sm ${
              filter === key
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border bg-surface text-foreground hover:bg-brand-50"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            Bu bo&apos;lim bo&apos;yicha hozircha ochiq o&apos;rin yo&apos;q.
          </p>
        ) : (
          filtered.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <job.icon aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{job.title}</p>
                  <p className="text-xs text-muted">{job.department} bo&apos;limi</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin aria-hidden className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span>{job.employmentType}</span>
                    <span>{timeAgoLabel(job.postedDaysAgo)}</span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  className="rounded-full border border-brand-600 px-4 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 sm:text-sm"
                >
                  Batafsil
                </button>
                <button
                  type="button"
                  aria-label={
                    saved.has(job.id)
                      ? `${job.title} saqlanganlardan olib tashlash`
                      : `${job.title} saqlash`
                  }
                  onClick={() => toggleSaved(job.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-brand-50 hover:text-danger-600"
                >
                  <Heart
                    aria-hidden
                    className={`h-4 w-4 ${saved.has(job.id) ? "fill-danger-500 text-danger-500" : ""}`}
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <button
          type="button"
          className="mt-4 w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-muted hover:bg-brand-50 hover:text-brand-700"
        >
          Ko&apos;proq ish o&apos;rinlarini ko&apos;rish ↓
        </button>
      )}
    </section>
  );
}
