"use client";

import { useEffect, useState } from "react";
import { getDay, listAllDayDates } from "@/lib/storage";
import { parseDate } from "@/lib/date";
import { WeightPoint } from "@/lib/types";
import WeightChart from "./WeightChart";

export default function WeightTab() {
  const [points, setPoints] = useState<WeightPoint[] | null>(null);

  useEffect(() => {
    const dates = listAllDayDates();
    const entries: WeightPoint[] = [];
    dates.forEach((date) => {
      const day = getDay(date);
      if (day.weight) entries.push({ date, weight: day.weight });
    });
    entries.sort((a, b) => a.date.localeCompare(b.date));
    setPoints(entries);
  }, []);

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5">
      <header className="top-header mb-[18px] flex items-center gap-2 font-display text-[19px] font-semibold">
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        Peso
      </header>

      <WeightChart points={points ?? []} />

      <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Histórico</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        {points === null ? (
          <div className="text-xs text-textfaint">A carregar...</div>
        ) : points.length === 0 ? (
          <div className="text-xs text-textfaint">
            Ainda sem registos de peso. Usa o cartão &quot;Peso&quot; no separador Hoje.
          </div>
        ) : (
          points
            .slice()
            .reverse()
            .map((e, i) => (
              <div
                key={e.date}
                className={`flex items-center justify-between py-2.5 text-[13.5px] ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="font-num font-semibold">{e.weight} kg</span>
                <span className="text-xs text-textmuted">
                  {parseDate(e.date).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
