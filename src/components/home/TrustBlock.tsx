import { Store, Bike, Users, Star } from "lucide-react";

const stats = [
  { icon: Store, label: "Filiallar", value: "45+" },
  { icon: Bike, label: "O'rtacha yetkazish", value: "45 daqiqa" },
  { icon: Users, label: "Mamnun mijozlar", value: "120 000+" },
  { icon: Star, label: "Baholash", value: "4.8 / 5" },
];

export default function TrustBlock() {
  return (
    <section className="rounded-2xl border border-border bg-brand-50 px-6 py-8 sm:px-10">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <s.icon aria-hidden className="h-8 w-8 text-brand-600" />

            <span className="mt-2 text-lg font-bold text-brand-800 sm:text-xl">
              {s.value}
            </span>
            <span className="text-xs text-muted sm:text-sm">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
