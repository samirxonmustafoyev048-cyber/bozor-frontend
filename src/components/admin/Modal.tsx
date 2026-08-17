"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

/**
 * Centred dialog over a dimmed backdrop, for admin forms that used to sit
 * inline and stretch the full page width.
 *
 * Closes on Escape and on a backdrop click; the page behind is frozen so the
 * dialog does not scroll away with it.
 */
export default function Modal({
  open,
  title,
  onClose,
  children,
  widthClassName = "max-w-2xl",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClassName?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    // Freezing the body keeps the page from scrolling under the dialog.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus in so keyboard users land inside the dialog, not behind it.
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-neutral-900/50 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      // A click that both starts and ends on the backdrop closes the dialog;
      // checking the target keeps a drag that ends outside from closing it.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`my-auto w-full ${widthClassName} rounded-2xl border border-border bg-surface shadow-2xl outline-none`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <h2 id={titleId} className="font-bold text-foreground">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-brand-50 hover:text-brand-700"
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
