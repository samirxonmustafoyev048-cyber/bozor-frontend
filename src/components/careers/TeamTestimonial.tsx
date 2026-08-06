"use client";

import { useState } from "react";
import { STOCK_PHOTOS } from "@/lib/stock-photos";

const testimonials = [
  {
    quote:
      "Olma Marketda ishlash menga katta tajriba va rivojlanish imkonini berdi. Bu yerda har bir fikr e'tiborga olinadi va qo'llab-quvvatlanadi.",
    name: "Malika Yusupova",
    role: "Marketing menejeri",
  },
  {
    quote:
      "Jamoamiz juda do'stona va professional. Har kuni yangi narsa o'rganish imkoniyati borligi meni ilhomlantiradi.",
    name: "Sardor Aliyev",
    role: "IT bo'limi",
  },
  {
    quote:
      "Karyera o'sishi uchun barcha shart-sharoitlar mavjud. Boshladigim kundan buyon doim qo'llab-quvvatlanganman.",
    name: "Dilnoza Karimova",
    role: "Savdo bo'limi",
  },
];

export default function TeamTestimonial() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-bold text-foreground">
        Jamoamiz nima deydi?
      </h2>
      <p className="mt-3 text-sm italic text-muted">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STOCK_PHOTOS.teamPortrait}
          alt={t.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted">{t.role}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Fikr ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-5 bg-brand-600" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
