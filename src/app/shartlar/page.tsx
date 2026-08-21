import type { Metadata } from "next";
import { FileText } from "lucide-react";
import InfoPage, { Bullets, Section } from "@/components/info/InfoPage";
import { getStoreName } from "@/lib/store-name";

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName();
  return {
    title: "Foydalanish shartlari",
    description:
      `${storeName} onlayn do'konidan foydalanish qoidalari, buyurtma berish va tomonlarning majburiyatlari.`,
  };
}

export default async function TermsPage() {
  const storeName = await getStoreName();

  return (
    <InfoPage
      icon={FileText}
      title="Foydalanish shartlari"
      intro={`${storeName} saytidan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz.`}
      updatedAt="07.08.2026"
    >
      <Section title="1. Umumiy qoidalar">
        <p>
          {storeName} — oziq-ovqat va maishiy mahsulotlarni onlayn buyurtma
          qilish va yetkazib berish xizmati. Saytda ro&apos;yxatdan
          o&apos;tish yoki buyurtma berish shu shartlarni qabul qilganingizni
          bildiradi.
        </p>
      </Section>

      <Section title="2. Buyurtma berish">
        <Bullets
          items={[
            "Buyurtma savatga mahsulot qo'shib, yetkazib berish usuli va to'lov turini tanlash orqali rasmiylashtiriladi.",
            "Buyurtma qabul qilingach, ko'rsatilgan telefon raqamiga tasdiqlash uchun bog'lanamiz.",
            "Aloqa raqami noto'g'ri bo'lsa yoki mijoz bilan bog'lanib bo'lmasa, buyurtma bekor qilinishi mumkin.",
            "Mahsulot omborda tugab qolgan hollarda biz sizga xabar beramiz va uni buyurtmadan chiqaramiz.",
          ]}
        />
      </Section>

      <Section title="3. Narxlar">
        <p>
          Saytdagi barcha narxlar O&apos;zbekiston so&apos;mida ko&apos;rsatilgan.
          Narxlar oldindan ogohlantirmasdan o&apos;zgarishi mumkin, lekin
          allaqachon tasdiqlangan buyurtma narxi o&apos;zgarmaydi. Tarozida
          o&apos;lchanadigan mahsulotlarda yakuniy summa haqiqiy vaznga qarab
          biroz farq qilishi mumkin.
        </p>
      </Section>

      <Section title="4. Mijozning majburiyatlari">
        <Bullets
          items={[
            "To'g'ri va to'liq manzil hamda aloqa ma'lumotlarini ko'rsatish.",
            "Yetkazib berish vaqtida ko'rsatilgan manzilda bo'lish yoki mahsulotni qabul qiladigan shaxsni belgilash.",
            "Naqd to'lov tanlangan bo'lsa, buyurtma summasini kuryerga topshirish.",
          ]}
        />
      </Section>

      <Section title="5. Javobgarlik">
        <p>
          Biz mahsulot sifati va yetkazib berish muddati uchun javobgarmiz.
          Mijoz tomonidan noto&apos;g&apos;ri manzil ko&apos;rsatilishi,
          telefonning o&apos;chiq bo&apos;lishi yoki mahsulotni qabul
          qilmaslik natijasida yuzaga kelgan kechikish uchun javobgarlik
          zimmamizda emas.
        </p>
      </Section>

      <Section title="6. Bog'lanish">
        <p>
          Savollaringiz bo&apos;lsa, qo&apos;llab-quvvatlash xizmatiga
          murojaat qiling — biz kuniga 24 soat javob beramiz.
        </p>
      </Section>
    </InfoPage>
  );
}
