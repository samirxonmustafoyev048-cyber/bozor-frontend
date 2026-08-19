"use client";

import { TriangleAlert, X } from "lucide-react";

/**
 * Page-level failure notice for admin actions.
 *
 * The form errors inside the dialogs cannot carry these: a delete has no open
 * dialog to show them in, so before this existed a rejected request only
 * surfaced as the Next.js crash overlay.
 */
export default function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-600"
    >
      <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="min-w-0 flex-1">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Yopish"
        className="shrink-0 rounded-md p-0.5 hover:bg-danger-500/10"
      >
        <X aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}
