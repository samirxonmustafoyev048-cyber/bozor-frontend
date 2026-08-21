import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import InfoPage from "@/components/info/InfoPage";

export const metadata: Metadata = {
  title: "Ko'p so'raladigan savollar",
  description:
    "Buyurtma, yetkazib berish, to'lov va qaytarish bo'yicha eng ko'p so'raladigan savollarga javoblar.",
};

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Buyurtma",
    items: [
      {
        q: "Ro'yxatdan o'tmasdan buyurtma bera olamanmi?",
        a: "Ha. Savatga mahsulot qo'shib, telefon raqamingiz va manzilingizni kiritsangiz kifoya. Lekin ro'yxatdan o'tsangiz, buyurtmalar tarixi saqlanadi va keyingi safar ma'lumotlarni qayta kiritish shart bo'lmaydi.",
      },
      {
        q: "Minimal buyurtma summasi bormi?",
        a: "Yo'q, istalgan summada buyurtma berishingiz mumkin. Faqat ayrim promo-kodlar minimal summa talab qilishi mumkin — bu kodning shartlarida ko'rsatiladi.",
      },
      {
        q: "Buyurtmani bekor qila olamanmi?",
        a: "Buyurtma hali yig'ilmagan bo'lsa, qo'llab-quvvatlash xizmatiga murojaat qilib bekor qilishingiz mumkin. Kuryer yo'lga chiqqandan keyin bekor qilish imkoni cheklangan.",
      },
      {
        q: "Buyurtmam qayerdaligini qanday bilaman?",
        a: "Profilingizdagi \"Buyurtmalarim\" bo'limida har bir buyurtmaning joriy holati ko'rsatiladi.",
      },
    ],
  },
  {
    title: "Yetkazib berish",
    items: [
      {
        q: "Yetkazib berish qancha vaqt oladi?",
        a: "Odatda 1-3 soat ichida. Aniq vaqt manzilingiz va buyurtmalar bandligiga bog'liq.",
      },
      {
        q: "Qaysi hududlarga yetkazasiz?",
        a: "Toshkent shahri va boshqa yirik shaharlar bo'ylab yetkazib beramiz. Manzilingiz xizmat hududiga kiradimi — buyurtma rasmiylashtirishda ko'rsatiladi.",
      },
      {
        q: "O'zim olib keta olamanmi?",
        a: "Ha. Buyurtma berishda \"Filialdan olib ketish\"ni tanlang — bu bepul. Buyurtma 15-30 daqiqada tayyor bo'ladi.",
      },
    ],
  },
  {
    title: "To'lov va chegirmalar",
    items: [
      {
        q: "Qanday to'lash mumkin?",
        a: "Naqd pul, bank kartasi, Payme yoki Click orqali. Batafsil ma'lumot \"To'lov usullari\" sahifasida.",
      },
      {
        q: "Promo-kodni qayerga kiritaman?",
        a: "Buyurtmani rasmiylashtirish sahifasida promo-kod maydoni bor. Kod amal qilsa, chegirma yakuniy summadan darhol chegiriladi.",
      },
      {
        q: "Nega promo-kodim ishlamayapti?",
        a: "Kodning muddati tugagan, foydalanish limiti tugagan yoki buyurtma summasi minimal talabdan kam bo'lishi mumkin. Aniq sabab kod kiritilganda ko'rsatiladi.",
      },
    ],
  },
  {
    title: "Mahsulot va qaytarish",
    items: [
      {
        q: "Mahsulot sifati yoqmasa nima qilaman?",
        a: "Kuryer oldida tekshiring va yoqmagan mahsulotni darhol qaytaring — uning summasi buyurtmadan chegiriladi. Keyinroq aniqlansa, 24 soat ichida murojaat qiling.",
      },
      {
        q: "Buyurtmada mahsulot yetishmayapti",
        a: "Mahsulot omborda tugab qolgan bo'lishi mumkin — bunday holda biz oldindan xabar beramiz va uning summasi olinmaydi. Xabar bermagan bo'lsak, qo'llab-quvvatlash xizmatiga yozing.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <InfoPage
      icon={HelpCircle}
      title="Ko'p so'raladigan savollar"
      intro="Eng ko'p beriladigan savollarga javoblar. Kerakli javobni topmasangiz — bizga yozing."
    >
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="mb-2 font-bold text-foreground">{group.title}</h2>
          <div className="flex flex-col gap-2">
            {group.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-surface p-4 sm:p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-foreground marker:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-xl leading-none text-brand-600 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <section className="rounded-2xl border border-brand-200 bg-brand-50/50 p-5 text-center sm:p-6">
        <h2 className="font-bold text-foreground">Javob topa olmadingizmi?</h2>
        <p className="mt-1 text-sm text-muted">
          Qo&apos;llab-quvvatlash xizmatimiz kuniga 24 soat ishlaydi.
        </p>
        <Link
          href="/haqida"
          className="mt-4 inline-flex rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Biz bilan bog&apos;lanish
        </Link>
      </section>
    </InfoPage>
  );
}
