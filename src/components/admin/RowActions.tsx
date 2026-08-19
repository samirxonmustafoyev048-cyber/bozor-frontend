"use client";

import { Pencil, Trash2 } from "lucide-react";

const BASE =
  "inline-flex items-center gap-1.5 rounded-lg border bg-surface px-2.5 py-1.5 " +
  "text-xs font-semibold transition-colors";

/** Neutral row action — for anything sitting beside Edit and Delete. */
export const rowActionClass = `${BASE} border-border text-foreground/80 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700`;

export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BASE} border-border text-brand-700 hover:border-brand-300 hover:bg-brand-50`}
    >
      <Pencil aria-hidden className="h-3.5 w-3.5" />
      Tahrirlash
    </button>
  );
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BASE} border-danger-500/30 text-danger-600 hover:bg-danger-500/10`}
    >
      <Trash2 aria-hidden className="h-3.5 w-3.5" />
      O&apos;chirish
    </button>
  );
}

/**
 * The action pair at the end of an admin row.
 *
 * These used to be bare underlined words, which read as body text and gave a
 * mouse a one-line target; as buttons they are visibly clickable and Delete
 * carries its own warning colour instead of relying on the label alone.
 *
 * `children` renders before the pair, for row-specific extras.
 */
export default function RowActions({
  onEdit,
  onDelete,
  children,
}: {
  onEdit: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
}) {
  return (
    <span className="flex flex-wrap items-center justify-end gap-2">
      {children}
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </span>
  );
}
