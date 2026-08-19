"use client";

import { useState } from "react";
import { Check, Mail, Send } from "lucide-react";

export default function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <section className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-600 p-5 sm:flex-row sm:p-6">
      <div className="flex items-center gap-3 text-white">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Mail aria-hidden className="h-5 w-5" />
        </span>
        <div>
          <p className="font-bold">Yangiliklardan xabardor bo&apos;lib boring!</p>
          <p className="text-sm text-white/85">
            Eng so&apos;nggi yangiliklar va e&apos;lonlarni email orqali oling
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full gap-2 sm:w-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email manzilingiz"
          className="min-w-0 flex-1 rounded-full border-0 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-white sm:w-64"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          {subscribed ? "Obuna bo'ldingiz" : "Obuna bo'lish"}
          {subscribed ? (
            <Check aria-hidden className="h-3.5 w-3.5" />
          ) : (
            <Send aria-hidden className="h-3.5 w-3.5" />
          )}
        </button>
      </form>
    </section>
  );
}
