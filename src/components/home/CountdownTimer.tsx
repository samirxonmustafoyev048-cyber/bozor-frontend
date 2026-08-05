"use client";

import { useEffect, useState } from "react";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({
  initialSeconds = 8 * 3600 + 24 * 60 + 36,
}: {
  initialSeconds?: number;
}) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : initialSeconds));
    }, 1000);
    return () => clearInterval(timer);
  }, [initialSeconds]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const units = [
    { label: "Soat", value: hours },
    { label: "Minut", value: minutes },
    { label: "Soniya", value: secs },
  ];

  return (
    <div className="flex gap-2">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center rounded-lg bg-white/15 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="text-lg font-bold tabular-nums text-white">
            {pad(u.value)}
          </span>
          <span className="text-[10px] text-white/80">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
