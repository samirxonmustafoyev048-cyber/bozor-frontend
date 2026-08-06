import { Wallet, ShieldPlus, TrendingUp, GraduationCap, Users, Gift } from "lucide-react";

const perks = [
  { icon: Wallet, label: "Raqobatbardosh maosh", bg: "bg-emerald-50", fg: "text-emerald-600" },
  { icon: ShieldPlus, label: "Tibbiy sug'urta", bg: "bg-rose-50", fg: "text-rose-600" },
  { icon: TrendingUp, label: "Karyera o'sishi imkoniyati", bg: "bg-blue-50", fg: "text-blue-600" },
  { icon: GraduationCap, label: "O'quv va treninglar", bg: "bg-purple-50", fg: "text-purple-600" },
  { icon: Users, label: "Do'stona va qo'llab-quvvatlovchi jamoa", bg: "bg-amber-50", fg: "text-amber-600" },
  { icon: Gift, label: "Korxona tadbirlari va bonuslar", bg: "bg-pink-50", fg: "text-pink-600" },
];

export default function WhyUsPanel() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-bold text-foreground">
        Nega biz bilan ishlash kerak?
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {perks.map((p) => (
          <div key={p.label} className="flex items-start gap-2">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${p.bg} ${p.fg}`}>
              <p.icon aria-hidden className="h-4 w-4" />
            </span>
            <span className="text-xs font-medium text-foreground">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
