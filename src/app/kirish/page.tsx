"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { requestOtp } from "@/lib/api";
import {
  PHONE_LENGTH,
  formatPhone,
  isValidPhone,
  toApiPhone,
  toPhoneDigits,
} from "@/lib/phone";

type Tab = "phone" | "email";
type EmailMode = "login" | "register";
type PhoneStep = "phone" | "code";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithOtp, loginWithEmail, registerWithEmail } = useAuth();

  const [tab, setTab] = useState<Tab>("phone");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Phone + OTP state
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);

  // Email state
  const [emailMode, setEmailMode] = useState<EmailMode>("login");
  const [regName, setRegName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const phoneReady = isValidPhone(phone);

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneReady) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await requestOtp(toApiPhone(phone));
      setDevCode(res.devCode);
      setPhoneStep("code");
    } catch {
      setError("Kod yuborishda xatolik. Telefon raqamini tekshiring.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginWithOtp(toApiPhone(phone), code, name || undefined);
      router.push("/profil");
    } catch {
      setError("Kod noto'g'ri yoki eskirgan.");
      setSubmitting(false);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (emailMode === "login") {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(regName, email, password);
      }
      router.push("/profil");
    } catch {
      setError(
        emailMode === "login"
          ? "Email yoki parol noto'g'ri."
          : "Ro'yxatdan o'tishda xatolik yuz berdi."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        Kirish
      </h1>

      <div className="mt-6 flex rounded-full border border-border p-1 text-sm">
        <button
          type="button"
          onClick={() => {
            setTab("phone");
            setError(null);
          }}
          className={`flex-1 rounded-full py-2 font-medium ${
            tab === "phone" ? "bg-brand-600 text-white" : "text-foreground"
          }`}
        >
          Telefon
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("email");
            setError(null);
          }}
          className={`flex-1 rounded-full py-2 font-medium ${
            tab === "email" ? "bg-brand-600 text-white" : "text-foreground"
          }`}
        >
          Email
        </button>
      </div>

      {tab === "phone" && phoneStep === "phone" && (
        <form onSubmit={handleRequestOtp} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            Telefon raqam
            <span className="flex items-center rounded-md border border-border bg-background px-3 py-2 focus-within:border-brand-500">
              <span className="shrink-0 select-none pr-1 text-muted">+</span>
              <input
                type="tel"
                required
                inputMode="numeric"
                autoComplete="tel"
                // Digits are stripped on every keystroke, so letters and
                // punctuation simply never reach the field.
                value={phone}
                onChange={(e) => setPhone(toPhoneDigits(e.target.value))}
                placeholder="998901234567"
                aria-describedby="phone-hint"
                className="w-full min-w-0 bg-transparent outline-none"
              />
              <span className="shrink-0 pl-2 text-xs tabular-nums text-muted">
                {phone.length}/{PHONE_LENGTH}
              </span>
            </span>
          </label>
          <p id="phone-hint" className="-mt-2 text-xs text-muted">
            {phone.length === 0
              ? "998 bilan boshlanadigan 12 ta raqam. Masalan: 998901234567"
              : phoneReady
                ? `Raqam: +${formatPhone(phone)}`
                : "Raqam 998 bilan boshlanishi va 12 ta raqamdan iborat bo'lishi kerak"}
          </p>
          <button
            type="submit"
            disabled={submitting || !phoneReady}
            className="rounded-full bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Yuborilmoqda..." : "Kod yuborish"}
          </button>
        </form>
      )}

      {tab === "phone" && phoneStep === "code" && (
        <form onSubmit={handleVerifyOtp} className="mt-6 flex flex-col gap-4">
          {devCode && (
            <p className="rounded-md bg-brand-50 px-3 py-2 text-xs text-brand-800">
              SMS integratsiyasi hali ulanmagan — test kodi: <b>{devCode}</b>
            </p>
          )}
          <label className="flex flex-col gap-1.5 text-sm">
            Tasdiqlash kodi
            <input
              type="text"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className="rounded-md border border-border bg-background px-3 py-2 tracking-widest outline-none focus:border-brand-500"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Ismingiz (agar yangi mijoz bo&apos;lsangiz)
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingiz"
              className="rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-brand-500"
            />
          </label>
          <button
            type="submit"
            disabled={submitting || code.length !== 6}
            className="rounded-full bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Tekshirilmoqda..." : "Tasdiqlash"}
          </button>
          <button
            type="button"
            onClick={() => setPhoneStep("phone")}
            className="text-sm text-muted hover:text-brand-700"
          >
            Raqamni o&apos;zgartirish
          </button>
        </form>
      )}

      {tab === "email" && (
        <div className="mt-6">
          <div className="flex gap-4 text-sm">
            <button
              type="button"
              onClick={() => setEmailMode("login")}
              className={
                emailMode === "login"
                  ? "font-semibold text-brand-700"
                  : "text-muted"
              }
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => setEmailMode("register")}
              className={
                emailMode === "register"
                  ? "font-semibold text-brand-700"
                  : "text-muted"
              }
            >
              Ro&apos;yxatdan o&apos;tish
            </button>
          </div>

          <form onSubmit={handleEmailSubmit} className="mt-4 flex flex-col gap-4">
            {emailMode === "register" && (
              <label className="flex flex-col gap-1.5 text-sm">
                Ism
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-brand-500"
                />
              </label>
            )}
            <label className="flex flex-col gap-1.5 text-sm">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-brand-500"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Parol
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-brand-500"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {submitting
                ? "Yuborilmoqda..."
                : emailMode === "login"
                  ? "Kirish"
                  : "Ro'yxatdan o'tish"}
            </button>
          </form>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-danger-600">{error}</p>}

      <p className="mt-6 text-center text-xs text-muted">
        Davom etish orqali siz{" "}
        <Link href="/shartlar" className="underline hover:text-brand-700">
          foydalanish shartlari
        </Link>{" "}
        bilan tanishgan bo&apos;lasiz.
      </p>
    </div>
  );
}
