/**
 * The text to show a user for a failed action.
 *
 * ApiError carries the server's own message, which is written for the person
 * reading it ("Bu kategoriyani o'chirib bo'lmaydi: unda 3 ta mahsulot bor").
 * Anything else — a network drop, a bug — has no useful text, so it gets the
 * caller's fallback instead of a stack-shaped string.
 */
export function errorMessage(
  error: unknown,
  fallback = "Amalni bajarib bo'lmadi. Qaytadan urinib ko'ring.",
): string {
  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}
