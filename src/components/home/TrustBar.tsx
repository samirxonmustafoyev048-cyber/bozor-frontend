import { Truck, ShieldCheck, Headset, Tag } from "lucide-react";

const items = [
  { icon: Truck, title: "Tez yetkazib berish", subtitle: "2 soat ichida eshikingizda" },
  { icon: ShieldCheck, title: "Sifat kafolati", subtitle: "100% tabiiy mahsulotlar" },
  { icon: Headset, title: "24/7 qo'llab-quvvatlash", subtitle: "Har doim siz bilan" },
  { icon: Tag, title: "Qulay narxlar", subtitle: "Eng arzon narxlar bizda" },
];

export default function TrustBar() {
  return (
    <section className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <item.icon aria-hidden className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <p className="text-xs text-muted">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
