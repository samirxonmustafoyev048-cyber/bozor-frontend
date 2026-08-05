import { BadgeCheck, Truck, ShieldCheck, Headset } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Sifat kafolati",
    description: "Mahsulotlarimiz sifati muntazam tekshiriladi va nazorat qilinadi.",
    bg: "bg-emerald-50",
    fg: "text-emerald-600",
  },
  {
    icon: Truck,
    title: "Tez yetkazib berish",
    description: "Buyurtmangizni qisqa vaqt ichida esigingizgacha yetkazib beramiz.",
    bg: "bg-blue-50",
    fg: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Xavfsiz to'lov",
    description: "To'lov ma'lumotlaringiz 100% himoyalangan va xavfsiz tizim orqali amalga oshiriladi.",
    bg: "bg-amber-50",
    fg: "text-amber-600",
  },
  {
    icon: Headset,
    title: "Mijozlar uchun xizmat",
    description: "Savollaringiz bormi? Bizning qo'llab-quvvatlash jamoamiz doim siz bilan.",
    bg: "bg-purple-50",
    fg: "text-purple-600",
  },
];

export default function FeatureGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className={`flex h-28 items-center justify-center ${f.bg}`}>
            <span className={`flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ${f.fg}`}>
              <f.icon aria-hidden className="h-7 w-7" />
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
            <p className="mt-1 text-xs text-muted">{f.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
