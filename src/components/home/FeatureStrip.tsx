import { PackageOpen, Clock, ShieldCheck, Percent, type LucideIcon } from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  bg: string;
  color: string;
}[] = [
  {
    icon: PackageOpen,
    title: "Keng assortiment",
    subtitle: "10 000+ mahsulot",
    bg: "bg-brand-100",
    color: "text-brand-600",
  },
  {
    icon: Clock,
    title: "Tez yetkazib berish",
    subtitle: "2 soat ichida",
    bg: "bg-sky-100",
    color: "text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Ishonchli xizmat",
    subtitle: "100% kafolat",
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    icon: Percent,
    title: "Doimiy chegirmalar",
    subtitle: "Eng yaxshi narxlar",
    bg: "bg-brand-100",
    color: "text-brand-600",
  },
];

export default function FeatureStrip() {
  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-surface px-6 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      {features.map((f) => (
        <div key={f.title} className="flex items-center gap-3">
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${f.bg} ${f.color}`}>
            <f.icon aria-hidden className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">
              {f.title}
            </span>
            <span className="block text-xs text-muted">{f.subtitle}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
