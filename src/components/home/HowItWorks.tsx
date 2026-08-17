import { ShoppingBasket, Smartphone, PackageCheck, Bike, type LucideIcon } from "lucide-react";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShoppingBasket,
    title: "Mahsulot tanlang",
    text: "Kerakli mahsulotlarni savatchaga qo'shing",
  },
  {
    icon: Smartphone,
    title: "Buyurtma bering",
    text: "Manzilingizni kiriting va buyurtmani tasdiqlang",
  },
  {
    icon: PackageCheck,
    title: "Tayyorlaymiz",
    text: "Buyurtmangizni tezda yig'ib tayyorlaymiz",
  },
  {
    icon: Bike,
    title: "Yetkazib beramiz",
    text: "2 soat ichida eshigingizgacha yetkazib beramiz",
  },
];

export default function HowItWorks() {
  return (
    <section className="text-center">
      <h2 className="text-xl font-bold text-foreground sm:text-2xl">
        Qanday buyurtma berish mumkin?
      </h2>

      <ol className="relative mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {/* The connecting rail only makes sense once the steps sit in one row */}
        <span
          aria-hidden
          className="absolute inset-x-[12%] top-9 hidden border-t-2 border-dashed border-brand-200 lg:block"
        />

        {steps.map((step, i) => (
          <li key={step.title} className="relative flex flex-col items-center">
            <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-border bg-surface shadow-sm">
              <step.icon aria-hidden className="h-7 w-7 text-brand-600" />
              <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-3 text-sm font-bold text-foreground">{step.title}</h3>
            <p className="mt-1 max-w-[15rem] text-xs leading-relaxed text-muted">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
