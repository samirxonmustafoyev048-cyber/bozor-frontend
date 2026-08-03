"use client";

import { useState } from "react";

export default function QuantitySelector({ unit }: { unit: string }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-full border border-border">
        <button
          type="button"
          aria-label="Miqdorni kamaytirish"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 items-center justify-center text-lg text-foreground hover:text-brand-700"
        >
          −
        </button>
        <span className="w-10 text-center text-sm font-medium">{qty}</span>
        <button
          type="button"
          aria-label="Miqdorni oshirish"
          onClick={() => setQty((q) => q + 1)}
          className="flex h-10 w-10 items-center justify-center text-lg text-foreground hover:text-brand-700"
        >
          +
        </button>
      </div>
      <span className="text-sm text-muted">
        {qty} × {unit}
      </span>
    </div>
  );
}
