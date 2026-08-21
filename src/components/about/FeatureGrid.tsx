import { BadgeCheck, Truck, ShieldCheck, Headset } from "lucide-react";
import { STOCK_PHOTOS } from "@/lib/stock-photos";

const features = [
  {
    icon: BadgeCheck,
    title: "Sifat kafolati",
    description: "Mahsulotlarimiz sifati muntazam tekshiriladi va nazorat qilinadi.",
    image: STOCK_PHOTOS.qualityProduce,
  },
  {
    icon: Truck,
    title: "Tez yetkazib berish",
    description: "Buyurtmangizni qisqa vaqt ichida esigingizgacha yetkazib beramiz.",
    image: STOCK_PHOTOS.fastDelivery,
  },
  {
    icon: ShieldCheck,
    title: "Xavfsiz to'lov",
    description: "To'lov ma'lumotlaringiz 100% himoyalangan va xavfsiz tizim orqali amalga oshiriladi.",
    image: STOCK_PHOTOS.securePayment,
  },
  {
    icon: Headset,
    title: "Mijozlar uchun xizmat",
    description: "Savollaringiz bormi? Bizning qo'llab-quvvatlash jamoamiz doim siz bilan.",
    image: STOCK_PHOTOS.customerService,
  },
];

export default function FeatureGrid() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.image}
              alt={f.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-600 shadow-md">
              <f.icon aria-hidden className="h-5 w-5" />
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
