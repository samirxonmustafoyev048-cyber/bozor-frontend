import { Quote, Star } from "lucide-react";

const reviews = [
  {
    text: "Juda tez va sifatli yetkazib berishdi. Mahsulotlar doim yangi bo'ladi. Tavsiya qilaman!",
    name: "Dilshoda A.",
    // No customer photos to use, so a tinted initial stands in — honest and
    // better than repeating one stock portrait three times.
    tint: "bg-rose-100 text-rose-700",
  },
  {
    text: "Narxlar juda qulay, xizmat esa a'lo darajada. Endi faqat sizdan buyurtma beraman.",
    name: "Jahongir M.",
    tint: "bg-sky-100 text-sky-700",
  },
  {
    text: "Qo'llab-quvvatlash xizmati juda tezkor va yordamchilar. Rahmat!",
    name: "Malika R.",
    tint: "bg-brand-100 text-brand-700",
  },
];

export default function Testimonials() {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground sm:text-2xl">
        Mijozlarimiz fikri
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col rounded-2xl border border-border bg-surface p-5"
          >
            <Quote aria-hidden className="h-6 w-6 shrink-0 text-brand-200" />
            <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {review.text}
            </blockquote>

            <figcaption className="mt-4 flex items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${review.tint}`}
              >
                {review.name.slice(0, 1)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {review.name}
                </span>
                <span aria-label="5 yulduzdan 5" className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden
                      className="h-3 w-3 fill-current text-accent-500"
                    />
                  ))}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
