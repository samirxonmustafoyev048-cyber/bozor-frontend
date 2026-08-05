import Link from "next/link";
import { Flame, ShoppingBasket, Truck, ShieldCheck, CreditCard } from "lucide-react";
import CountdownTimer from "@/components/home/CountdownTimer";
import PromoProductShowcase from "@/components/home/PromoProductShowcase";
import type { Product } from "@/types/product";

export default function PromoGrid({ discounted = [] }: { discounted?: Product[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 p-6 text-white sm:p-8 lg:col-span-2 lg:row-span-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          <Flame aria-hidden className="h-3.5 w-3.5" />
          Kun aksiyasi
        </span>
        <h2 className="mt-4 max-w-xs text-2xl font-extrabold leading-tight sm:max-w-sm sm:text-4xl">
          Bugungi chegirmalar siz uchun!
        </h2>
        <p className="mt-3 max-w-xs text-sm text-white/85 sm:text-base">
          Eng sifatli mahsulotlarga 50% gacha chegirma!
        </p>

        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-white/70">
            Aksiya tugashiga:
          </p>
          <CountdownTimer />
        </div>

        <ShoppingBasket
          aria-hidden
          className="pointer-events-none absolute -right-6 bottom-0 h-40 w-40 text-white/10 sm:h-56 sm:w-56"
        />
        <PromoProductShowcase products={discounted} />
      </div>

      <Link
        href="/katalog?saralash=new"
        className="flex flex-col justify-between rounded-2xl bg-brand-50 p-5 hover:bg-brand-100"
      >
        <div>
          <h3 className="font-bold text-brand-900">Yangi mahsulotlar</h3>
          <p className="mt-1 text-sm text-brand-800/80">
            Har kuni yangi va sifatli mahsulotlar
          </p>
        </div>
        <span className="mt-4 inline-block w-fit rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white">
          Ko&apos;rish
        </span>
      </Link>

      <div className="flex flex-col justify-between rounded-2xl bg-blue-50 p-5">
        <div>
          <h3 className="font-bold text-blue-900">Tez yetkazib berish</h3>
          <p className="mt-1 text-sm text-blue-800/80">
            Buyurtmangizni 2 soat ichida eshikingizda
          </p>
        </div>
        <Truck aria-hidden className="mt-4 h-8 w-8 self-end text-blue-500" />
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-amber-50 p-5">
        <div>
          <h3 className="font-bold text-amber-900">Sifat kafolati</h3>
          <p className="mt-1 text-sm text-amber-800/80">
            100% sifatli va tabiiy mahsulotlar
          </p>
        </div>
        <ShieldCheck aria-hidden className="mt-4 h-8 w-8 self-end text-amber-500" />
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-purple-50 p-5">
        <div>
          <h3 className="font-bold text-purple-900">Qulay to&apos;lov</h3>
          <p className="mt-1 text-sm text-purple-800/80">
            Turli xil to&apos;lov usullari mavjud
          </p>
        </div>
        <CreditCard aria-hidden className="mt-4 h-8 w-8 self-end text-purple-500" />
      </div>
    </div>
  );
}
