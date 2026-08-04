"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfileLink() {
  const { auth, isLoaded } = useAuth();
  const firstName = auth?.user.name.split(" ")[0];

  return (
    <Link
      href={isLoaded && auth ? "/profil" : "/kirish"}
      className="flex flex-col items-center rounded-lg px-2 py-1 text-xs text-foreground hover:bg-brand-50"
    >
      <User aria-hidden className="h-5 w-5" />
      <span className="hidden max-w-16 truncate sm:inline">
        {isLoaded && auth ? firstName : "Kirish"}
      </span>
    </Link>
  );
}
