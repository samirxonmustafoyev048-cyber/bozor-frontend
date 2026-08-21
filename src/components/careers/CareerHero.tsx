import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { STOCK_PHOTOS } from "@/lib/stock-photos";
import { getStoreName } from "@/lib/store-name";

export default async function CareerHero() {
  const storeName = await getStoreName();

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-white">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        <div className="px-6 py-10 sm:px-10 lg:py-14">
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Karyerangizga <span className="text-brand-600">{storeName}</span>{" "}
            bilan yangi qadam qo&apos;ying!
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
            Biz doimo iqtidorli, mehnatsevar va o&apos;sishga intilayotgan
            insonlarni izlaymiz. Jamoamizga qo&apos;shiling va kelajakni
            birga yarating.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#ochiq-ish-orinlari"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Ochiq ish o&apos;rinlari
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
            <Link
              href="/haqida"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-brand-50"
            >
              Biz haqimizda
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STOCK_PHOTOS.teamMeeting}
            alt={`${storeName} jamoasi`}
            className="h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-brand-700 shadow-lg">
            <Leaf aria-hidden className="h-4 w-4 fill-current" />
            {storeName}
          </span>
        </div>
      </div>
    </section>
  );
}
