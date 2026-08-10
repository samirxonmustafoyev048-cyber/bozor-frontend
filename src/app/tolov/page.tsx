import type { Metadata } from "next";
import { CreditCard, Banknote, Wallet2, ShieldCheck } from "lucide-react";
import InfoPage, { Bullets, Section } from "@/components/info/InfoPage";
import { getSettings } from "@/lib/api";
import { formatSom } from "@/lib/format";

export const metadata: Metadata = {
  title: "To'lov usullari | Olma Market",
  description:
    "Olma Marketda naqd pul, bank kartasi, Payme va Click orqali to'lash imkoniyatlari.",
};

const methods = [
  {
    icon: Banknote,
    name: "Naqd pul",
    description:
      "Buyurtmani qabul qilganingizda kuryerga naqd to'laysiz. Kuryerlarda qaytim bo'ladi.",
  },
  {
    icon: CreditCard,
    name: "Bank kartasi",
    description:
      "UzCard yoki Humo kartasi orqali kuryerdagi terminal yordamida to'lash.",
  },
  {
    icon: Wallet2,
    name: "Payme",
    description:
      "Buyurtmani rasmiylashtirgach Payme ilovasiga o'tasiz va to'lovni onlayn amalga oshirasiz.",
  },
  {
    icon: Wallet2,
    name: "Click",
    description:
      "Click orqali onlayn to'lov. To'lov tasdiqlangach buyurtma darhol tayyorlanadi.",
  },
];

export default async function PaymentPage() {
  const settings = await getSettings({ revalidate: 300 }).catch(() => null);

  return (
    <InfoPage
      icon={CreditCard}
      title="To'lov usullari"
      intro="Sizga qulay bo'lgan usulni tanlang — barcha to'lovlar xavfsiz."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {methods.map((method) => (
          <div
            key={method.name}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <method.icon aria-hidden className="h-5 w-5" />
            </span>
            <h2 className="mt-3 font-bold text-foreground">{method.name}</h2>
            <p className="mt-1 text-sm text-muted">{method.description}</p>
          </div>
        ))}
      </div>

      <Section title="Yetkazib berish narxi">
        <p>
          Manzilga yetkazib berish{" "}
          {settings ? (
            <strong className="text-foreground">
              {formatSom(settings.deliveryFee)}
            </strong>
          ) : (
            "belgilangan tarif bo'yicha"
          )}
          . Filialdan o&apos;zingiz olib ketsangiz — bepul.
        </p>
      </Section>

      <Section title="To'lov xavfsizligi">
        <div className="flex items-start gap-2">
          <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p>
            Onlayn to&apos;lovlar Payme va Click tomonida qayta ishlanadi.
            Karta ma&apos;lumotlaringiz bizning serverimizga tushmaydi va
            saqlanmaydi.
          </p>
        </div>
      </Section>

      <Section title="Kvitansiya va hisob-kitob">
        <Bullets
          items={[
            "Har bir buyurtma uchun elektron kvitansiya profilingizda saqlanadi.",
            "Yuridik shaxslar uchun hisob-faktura kerak bo'lsa, qo'llab-quvvatlash xizmatiga murojaat qiling.",
            "Tarozida o'lchanadigan mahsulotlarda yakuniy summa haqiqiy vaznga qarab biroz farq qilishi mumkin.",
          ]}
        />
      </Section>
    </InfoPage>
  );
}
