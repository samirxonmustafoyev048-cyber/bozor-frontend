import { Smile, ShoppingBag, Truck, Award } from "lucide-react";

const stats = [
  { icon: Smile, value: "10 000+", label: "Mamnun mijozlar" },
  { icon: ShoppingBag, value: "5 000+", label: "Mahsulot turlari" },
  { icon: Truck, value: "99%", label: "O'z vaqtida yetkazish" },
  { icon: Award, value: "1 Yillik+", label: "Ish tajribasi" },
];

export default function StatsBar() {
  return (
    <section className="grid grid-cols-2 gap-3 rounded-2xl bg-brand-50 p-5 sm:p-8 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
            <s.icon aria-hidden className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-brand-900 sm:text-xl">
              {s.value}
            </p>
            <p className="text-xs text-brand-800/80 sm:text-sm">{s.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
