"use client";

import { useEffect, useState } from "react";
import { DAYS, DayPoint, consumedKcal, lastDays } from "@/lib/series";
import { parseDate } from "@/lib/date";
import BarChart, { StatCard } from "./BarChart";

const CONSUMED = "#e8384a";
const BURNED = "#8fb3d9";

export default function CaloriesTab() {
  const [points, setPoints] = useState<DayPoint[] | null>(null);

  useEffect(() => {
    setPoints(lastDays());
  }, []);

  if (!points) return null;

  const rows = points.map((p) => {
    const eaten = Math.round(consumedKcal(p.day));
    const burned = p.day.caloriesBurnedTotal || 0;
    return {
      date: p.date,
      label: p.label,
      eaten: eaten > 0 ? eaten : null,
      burned: burned > 0 ? burned : null,
    };
  });

  // O saldo só conta dias com os dois registos, para não distorcer a conta.
  const both = rows.filter((r) => r.eaten !== null && r.burned !== null);
  const totalEaten = both.reduce((s, r) => s + (r.eaten ?? 0), 0);
  const totalBurned = both.reduce((s, r) => s + (r.burned ?? 0), 0);
  const balance = totalEaten - totalBurned;

  const fmt = (n: number) => Math.round(n).toLocaleString("pt-PT");
  const signed = (n: number) => `${n > 0 ? "+" : ""}${fmt(n)}`;
  const balanceClass = balance < 0 ? "text-green" : balance > 0 ? "text-red" : "";
  const dateText = (d: string) =>
    parseDate(d).toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" });
  const history = rows.filter((r) => r.eaten !== null || r.burned !== null).reverse();

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5">
      <header className="top-header mb-[18px] flex items-center gap-2 font-display text-[19px] font-semibold">
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        Calorias
      </header>
      <div className="mb-3 text-xs text-textmuted">Últimos {DAYS} dias</div>

      <BarChart
        labels={rows.map((r) => r.label)}
        series={[
          { name: "Consumidas", color: CONSUMED, values: rows.map((r) => r.eaten) },
          { name: "Gastas", color: BURNED, values: rows.map((r) => r.burned) },
        ]}
        format={fmt}
      />

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <StatCard label="Consumidas" value={both.length ? fmt(totalEaten) : "—"} />
        <StatCard label="Gastas" value={both.length ? fmt(totalBurned) : "—"} />
        <StatCard
          label="Saldo (consumidas − gastas)"
          value={both.length ? signed(balance) : "—"}
          valueClass={balanceClass}
          hint={both.length ? `${both.length} dia(s) com ambos os registos` : undefined}
        />
      </div>

      <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Histórico</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        {history.length === 0 ? (
          <div className="text-xs text-textfaint">Ainda sem calorias registadas.</div>
        ) : (
          history.map((r, i) => {
            const net = r.eaten !== null && r.burned !== null ? r.eaten - r.burned : null;
            return (
              <div
                key={r.date}
                className={`flex items-center justify-between py-2.5 text-[13.5px] ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span className="text-xs text-textmuted">{dateText(r.date)}</span>
                <span className="flex items-center gap-3">
                  <span className="font-num text-xs text-textmuted">
                    {r.eaten !== null ? fmt(r.eaten) : "—"} / {r.burned !== null ? fmt(r.burned) : "—"}
                  </span>
                  <span
                    className={`min-w-[64px] text-right font-num font-semibold ${
                      net === null ? "text-textfaint" : net < 0 ? "text-green" : net > 0 ? "text-red" : ""
                    }`}
                  >
                    {net === null ? "—" : signed(net)}
                  </span>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}