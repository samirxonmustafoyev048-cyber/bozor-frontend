import type { Metadata } from "next";
import { MapPin, ExternalLink } from "lucide-react";
import { getBranches } from "@/lib/api";
import { googleMapsUrl, googleMapsEmbedUrl } from "@/lib/maps";

export const metadata: Metadata = {
  title: "Filiallar — Olma Market",
};

export const revalidate = 300;

export default async function BranchesPage() {
  const branches = await getBranches({ revalidate: 300 });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        Filiallar
      </h1>
      <p className="mt-1 text-sm text-muted">
        Yaqin atrofdagi do&apos;konimizni tanlang va Google Xaritada ko&apos;ring.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {branches.map((b) => (
          <div
            key={b.id}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface"
          >
            <iframe
              src={googleMapsEmbedUrl(b)}
              className="h-40 w-full border-0"
              loading="lazy"
              title={`${b.name} xaritada`}
            />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h2 className="font-semibold text-foreground">{b.name}</h2>
              <p className="flex items-start gap-1.5 text-sm text-muted">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                {b.address}
              </p>
              <a
                href={googleMapsUrl(b)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Google Xaritada ochish
                <ExternalLink aria-hidden className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
