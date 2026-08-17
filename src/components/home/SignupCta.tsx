import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";

export default function SignupCta() {
  return (
    <section className="flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-r from-brand-50 via-brand-50/60 to-white px-6 py-6 text-center sm:px-8 md:flex-row md:text-left">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
        <Gift aria-hidden className="h-7 w-7" />
      </span>

      <div className="flex-1">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          Birinchi buyurtmangizga{" "}
          <span className="text-brand-600">10% chegirma!</span>
        </h2>
        <p className="mt-0.5 text-sm text-muted">
          Hozir ro&apos;yxatdan o&apos;ting va chegirmadan foydalaning
        </p>
      </div>

      <Link
        href="/kirish"
        className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Ro&apos;yxatdan o&apos;tish
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </section>
  );
}
