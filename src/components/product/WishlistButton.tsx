"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistButton({ productName }: { productName: string }) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      aria-label={
        active
          ? `${productName} sevimlilardan olib tashlash`
          : `${productName} sevimlilarga qo'shish`
      }
      onClick={(e) => {
        e.preventDefault();
        setActive((v) => !v);
      }}
      className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white"
    >
      <Heart
        aria-hidden
        className={`h-3.5 w-3.5 ${active ? "fill-danger-500 text-danger-500" : "text-muted"}`}
      />
    </button>
  );
}
