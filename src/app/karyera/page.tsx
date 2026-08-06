import type { Metadata } from "next";
import CareerHero from "@/components/careers/CareerHero";
import CareerStats from "@/components/careers/CareerStats";
import JobListings from "@/components/careers/JobListings";
import WhyUsPanel from "@/components/careers/WhyUsPanel";
import TeamTestimonial from "@/components/careers/TeamTestimonial";

export const metadata: Metadata = {
  title: "Karyera — Olma Market",
  description: "Olma Market jamoasiga qo'shiling va birga o'samiz!",
};

export default function CareerPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Karyera
        </h1>
        <p className="mt-1 text-sm text-muted">
          Olma Market jamoasiga qo&apos;shiling va birga o&apos;samiz!
        </p>
      </div>

      <CareerHero />
      <CareerStats />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <JobListings />
        <div className="flex flex-col gap-6">
          <WhyUsPanel />
          <TeamTestimonial />
        </div>
      </div>
    </div>
  );
}
