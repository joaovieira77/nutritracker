"use client";

import { useEffect, useState } from "react";
import { DAYS, DayPoint, lastDays } from "@/lib/series";
import { parseDate } from "@/lib/date";
import BarChart, { StatCard } from "./BarChart";

export default function StepsTab() {
  const [points, setPoints] = useState<DayPoint[] | null>(null);

  useEffect(() => {
    setPoints(lastDays());
  }, []);

  if (!points) return null;

  const withData = points.filter((p) => p.day.steps);
  const total = withData.reduce((s, p) => s + (p.day.steps ?? 0), 0);
  const avg = withData.length ? Math.round(total / withData.length) : null;
  const best = withData.reduce<DayPoint | null>(
    (b, p) => (!b || (p.day.steps ?? 0) > (b.day.steps ?? 0) ? p : b),
    null
  );
  const fmt = (n: number) => Math.round(n).toLocaleString("pt-PT");
  const dateText = (d: string) =>
    parseDate(d).toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" });

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5">
      <header className="top-header mb-[18px] flex items-center gap-2 font-display text-[19px] font-semibold">
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        Passos
      </header>
      <div className="mb-3 text-xs text-textmuted">Últimos {DAYS} dias</div>

      <BarChart
        labels={points.map((p) => p.label)}
        series={[{ name: "Passos", color: "#e8384a", values: points.map((p) => p.day.steps || null) }]}
        format={fmt}
      />

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <StatCard label="Média por dia" value={avg !== null ? fmt(avg) : "—"} />
        <StatCard
          label="Melhor dia"
          value={best?.day.steps ? fmt(best.day.steps) : "—"}
          hint={best ? dateText(best.date) : undefined}
        />
        <StatCard label="Total" value={withData.length ? fmt(total) : "—"} />
      </div>

      <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Histórico</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        {withData.length === 0 ? (
          <div className="text-xs text-textfaint">
            Ainda sem passos registados. Usa o cartão &quot;Passos&quot; no separador Hoje.
          </div>
        ) : (
          [...withData].reverse().map((p, i) => (
            <div
              key={p.date}
              className={`flex items-center justify-between py-2.5 text-[13.5px] ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span className="text-xs text-textmuted">{dateText(p.date)}</span>
              <span className="font-num font-semibold">{fmt(p.day.steps ?? 0)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}