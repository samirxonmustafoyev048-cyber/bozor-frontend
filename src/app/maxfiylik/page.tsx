import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import InfoPage, { Bullets, Section } from "@/components/info/InfoPage";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati | Olma Market",
  description:
    "Olma Market shaxsiy ma'lumotlaringizni qanday to'playdi, ishlatadi va himoya qiladi.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      icon={ShieldCheck}
      title="Maxfiylik siyosati"
      intro="Shaxsiy ma'lumotlaringizni qanday to'playmiz, nima uchun ishlatamiz va qanday himoya qilamiz."
      updatedAt="07.08.2026"
    >
      <Section title="Qanday ma'lumot to'playmiz">
        <Bullets
          items={[
            "Ism va telefon raqami — buyurtmani tasdiqlash va kuryer bilan bog'lanish uchun.",
            "Yetkazib berish manzili — buyurtmani yetkazish uchun.",
            "Elektron pochta — hisobga kirish va buyurtma haqidagi xabarlar uchun.",
            "Buyurtmalar tarixi — xizmatni yaxshilash va sizga mos takliflar berish uchun.",
          ]}
        />
      </Section>

      <Section title="Ma'lumotlardan qanday foydalanamiz">
        <p>
          Ma&apos;lumotlaringiz faqat buyurtmani bajarish, siz bilan
          bog&apos;lanish va xizmat sifatini oshirish uchun ishlatiladi. Biz
          ma&apos;lumotlaringizni uchinchi shaxslarga sotmaymiz va reklama
          maqsadida bermaymiz.
        </p>
      </Section>

      <Section title="Ma'lumot kimlarga uzatiladi">
        <Bullets
          items={[
            "Kuryerlar — faqat buyurtmani yetkazish uchun zarur bo'lgan ism, manzil va telefon raqami.",
            "To'lov tizimlari (Payme, Click) — to'lovni amalga oshirish uchun zarur ma'lumotlar. Karta ma'lumotlaringiz bizning serverimizga tushmaydi.",
            "Qonun talab qilgan hollarda vakolatli davlat organlari.",
          ]}
        />
      </Section>

      <Section title="Xavfsizlik">
        <p>
          Parollar shifrlangan holda saqlanadi, sayt bilan aloqa HTTPS orqali
          himoyalangan. To&apos;lov ma&apos;lumotlari to&apos;g&apos;ridan-to&apos;g&apos;ri
          to&apos;lov tizimi tomonida qayta ishlanadi.
        </p>
      </Section>

      <Section title="Sizning huquqlaringiz">
        <Bullets
          items={[
            "Profilingizdagi ma'lumotlarni istalgan vaqtda ko'rish va tahrirlash.",
            "Hisobingizni va u bilan bog'liq ma'lumotlarni o'chirishni so'rash.",
            "Xabarnomalar yuborilishidan voz kechish.",
          ]}
        />
      </Section>

      <Section title="Cookie fayllari">
        <p>
          Sayt savatchangizni va tizimga kirgan holatingizni eslab qolish uchun
          brauzeringizda kichik ma&apos;lumotlarni saqlaydi. Ularsiz savat va
          hisobga kirish ishlamaydi.
        </p>
      </Section>
    </InfoPage>
  );
}
