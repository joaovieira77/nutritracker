"use client";

import { useEffect, useState } from "react";
import { DAYS, DayPoint, lastDays } from "@/lib/series";
import { fmtDurationH, parseDate, round1 } from "@/lib/date";
import BarChart, { StatCard } from "./BarChart";

export default function SleepTab() {
  const [points, setPoints] = useState<DayPoint[] | null>(null);

  useEffect(() => {
    setPoints(lastDays());
  }, []);

  if (!points) return null;

  const withData = points.filter((p) => p.day.sleep);
  const mins = (p: DayPoint) => p.day.sleep?.durationMin ?? 0;
  const total = withData.reduce((s, p) => s + mins(p), 0);
  const avg = withData.length ? Math.round(total / withData.length) : null;
  const longest = withData.reduce<DayPoint | null>((b, p) => (!b || mins(p) > mins(b) ? p : b), null);
  const shortest = withData.reduce<DayPoint | null>((b, p) => (!b || mins(p) < mins(b) ? p : b), null);
  const dateText = (d: string) =>
    parseDate(d).toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" });

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5">
      <header className="top-header mb-[18px] flex items-center gap-2 font-display text-[19px] font-semibold">
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        Sono
      </header>
      <div className="mb-3 text-xs text-textmuted">Últimos {DAYS} dias</div>

      <BarChart
        labels={points.map((p) => p.label)}
        series={[
          {
            name: "Sono",
            color: "#8fb3d9",
            values: points.map((p) => (p.day.sleep ? p.day.sleep.durationMin / 60 : null)),
          },
        ]}
        format={(n) => `${round1(n)}h`}
      />

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <StatCard label="Média por noite" value={avg !== null ? fmtDurationH(avg) : "—"} />
        <StatCard
          label="Noite mais longa"
          value={longest ? fmtDurationH(mins(longest)) : "—"}
          hint={longest ? dateText(longest.date) : undefined}
        />
        <StatCard
          label="Noite mais curta"
          value={shortest ? fmtDurationH(mins(shortest)) : "—"}
          hint={shortest ? dateText(shortest.date) : undefined}
        />
      </div>

      <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Histórico</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        {withData.length === 0 ? (
          <div className="text-xs text-textfaint">
            Ainda sem sono registado. Usa o cartão &quot;Sono&quot; no separador Hoje.
          </div>
        ) : (
          [...withData].reverse().map((p, i) => (
            <div
              key={p.date}
              className={`flex items-center justify-between py-2.5 text-[13.5px] ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span className="text-xs text-textmuted">{dateText(p.date)}</span>
              <span className="flex items-center gap-3">
                <span className="text-[11px] text-textfaint">
                  {p.day.sleep?.bed} → {p.day.sleep?.wake}
                </span>
                <span className="font-num font-semibold">{fmtDurationH(mins(p))}</span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}