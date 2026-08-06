import { Users, Building2, Briefcase, TrendingUp, Heart, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "250+", label: "Jamoa a'zolari", bg: "bg-emerald-50", fg: "text-emerald-600" },
  { icon: Building2, value: "5", label: "Shaharlar", bg: "bg-blue-50", fg: "text-blue-600" },
  { icon: Briefcase, value: "18", label: "Ochiq ish o'rinlari", bg: "bg-amber-50", fg: "text-amber-600" },
  { icon: TrendingUp, value: "3+ yil", label: "Bozordagi tajriba", bg: "bg-purple-50", fg: "text-purple-600" },
  { icon: Heart, value: "1000+", label: "Mamnun mijozlar", bg: "bg-rose-50", fg: "text-rose-600" },
  { icon: Star, value: "4.8/5", label: "Jamoa bahosi", bg: "bg-teal-50", fg: "text-teal-600" },
];

export default function CareerStats() {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
        >
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${s.bg} ${s.fg}`}>
            <s.icon aria-hidden className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-foreground">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
