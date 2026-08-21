import type { Metadata } from "next";
import { RotateCcw } from "lucide-react";
import InfoPage, { Bullets, Section } from "@/components/info/InfoPage";
import { getStoreName } from "@/lib/store-name";

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName();
  return {
    title: "Qaytarish siyosati",
    description:
      `${storeName}dan olingan mahsulotni qaytarish va pulni qaytarib olish tartibi.`,
  };
}

export default function ReturnsPage() {
  return (
    <InfoPage
      icon={RotateCcw}
      title="Qaytarish siyosati"
      intro="Mahsulot sizni qoniqtirmasa — uni qaytarishingiz mumkin. Quyida tartib bilan tanishing."
      updatedAt="07.08.2026"
    >
      <Section title="Kuryer oldida tekshiring">
        <p>
          Eng oson yo&apos;l — buyurtmani kuryer ketishidan oldin tekshirish.
          Agar biror mahsulot sizga to&apos;g&apos;ri kelmasa, uni o&apos;sha
          zahoti kuryerga qaytarib berishingiz mumkin. Bunday holda o&apos;sha
          mahsulot summasi buyurtmadan chegiriladi.
        </p>
      </Section>

      <Section title="Qaysi mahsulotlarni qaytarish mumkin">
        <Bullets
          items={[
            "Sifati talabga javob bermaydigan mahsulotlar — muddati o'tgan, buzilgan yoki qadog'i shikastlangan.",
            "Buyurtmaga mos kelmaydigan mahsulotlar — noto'g'ri mahsulot yoki noto'g'ri miqdor yetkazilgan.",
            "Sanoat mollari — qadog'i ochilmagan va tovar ko'rinishi saqlangan bo'lsa, 14 kun ichida.",
          ]}
        />
      </Section>

      <Section title="Qaysi mahsulotlar qaytarilmaydi">
        <p>
          Qonunchilikka muvofiq, sifati yaxshi bo&apos;lgan oziq-ovqat
          mahsulotlari qaytarilmaydi. Bunga tez buziladigan mahsulotlar —
          go&apos;sht, baliq, sut mahsulotlari, tayyor taomlar, sabzavot va
          mevalar kiradi.
        </p>
      </Section>

      <Section title="Qanday qaytariladi">
        <Bullets
          items={[
            "Qo'llab-quvvatlash xizmatiga buyurtma raqamini ko'rsatib murojaat qiling.",
            "Muammoni tavsiflang — imkon bo'lsa mahsulot rasmini yuboring.",
            "Ariza 24 soat ichida ko'rib chiqiladi.",
            "Tasdiqlangach, kuryer mahsulotni olib ketadi yoki uni eng yaqin filialga topshirasiz.",
          ]}
        />
      </Section>

      <Section title="Pulni qaytarish muddati">
        <Bullets
          items={[
            "Naqd to'langan bo'lsa — kuryer orqali yoki filialda darhol.",
            "Karta, Payme yoki Click orqali to'langan bo'lsa — o'sha kartaga 3-10 ish kuni ichida qaytariladi. Muddat bankka bog'liq.",
          ]}
        />
      </Section>
    </InfoPage>
  );
}
