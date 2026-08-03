"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AdminLink() {
  const { auth, isLoaded } = useAuth();

  if (!isLoaded || !auth || auth.user.role !== "ADMIN") {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="flex flex-col items-center rounded-lg px-2 py-1 text-xs text-foreground hover:bg-brand-50"
    >
      <span aria-hidden className="text-lg">
        ⚙️
      </span>
      <span className="hidden sm:inline">Admin</span>
    </Link>
  );
}
