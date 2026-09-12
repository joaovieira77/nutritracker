"use client";

import { useEffect, useState } from "react";
import { getDay, listAllDayDates } from "@/lib/storage";
import { parseDate } from "@/lib/date";
import BloodPressureChart from "./BloodPressureChart";

interface BPPoint {
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  pulse: number | null;
}

function classify(systolic: number, diastolic: number): { label: string; colorClass: string } {
  if (systolic < 90 || diastolic < 60) return { label: "Baixa", colorClass: "text-[#8fb3d9]" };
  if (systolic >= 180 || diastolic >= 110) return { label: "Hipertensão (grau 3)", colorClass: "text-red" };
  if (systolic >= 160 || diastolic >= 100) return { label: "Hipertensão (grau 2)", colorClass: "text-red" };
  if (systolic >= 140 || diastolic >= 90) return { label: "Hipertensão (grau 1)", colorClass: "text-amber" };
  if (systolic >= 130 || diastolic >= 85) return { label: "Normal-alta", colorClass: "text-amber" };
  if (systolic >= 120 || diastolic >= 80) return { label: "Normal", colorClass: "text-green" };
  return { label: "Ótima", colorClass: "text-green" };
}

export default function BloodPressureTab() {
  const [points, setPoints] = useState<BPPoint[] | null>(null);

  useEffect(() => {
    const dates = listAllDayDates();
    const entries: BPPoint[] = [];
    dates.forEach((date) => {
      const day = getDay(date);
      day.bloodPressure.forEach((bp) => {
        entries.push({ date, time: bp.time, systolic: bp.systolic, diastolic: bp.diastolic, pulse: bp.pulse });
      });
    });
    entries.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    setPoints(entries);
  }, []);

  const latest = points && points.length ? points[points.length - 1] : null;

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5">
      <header className="top-header mb-[18px] flex items-center gap-2 font-display text-[19px] font-semibold">
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        Tensão
      </header>

      {latest && (
        <div className="mb-4 rounded-card border border-border bg-surface p-4">
          <div className="font-num text-[28px] font-semibold">
            {latest.systolic}/{latest.diastolic} <span className="text-sm font-body font-normal text-textmuted">mmHg</span>
          </div>
          <div className={`mt-0.5 text-[12.5px] font-semibold ${classify(latest.systolic, latest.diastolic).colorClass}`}>
            {classify(latest.systolic, latest.diastolic).label}
          </div>
          <div className="mt-1 text-[11px] text-textfaint">
            Última medição · {parseDate(latest.date).toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })} às{" "}
            {latest.time}
          </div>
        </div>
      )}

      <BloodPressureChart points={points ?? []} />

      <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Histórico</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        {points === null ? (
          <div className="text-xs text-textfaint">A carregar...</div>
        ) : points.length === 0 ? (
          <div className="text-xs text-textfaint">
            Ainda sem medições. Usa o cartão &quot;Tensão arterial&quot; no separador Hoje.
          </div>
        ) : (
          points
            .slice()
            .reverse()
            .map((p, i) => {
              const c = classify(p.systolic, p.diastolic);
              return (
                <div
                  key={p.date + p.time + i}
                  className={`flex items-center justify-between py-2.5 text-[13.5px] ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <div>
                    <span className="font-num font-semibold">
                      {p.systolic}/{p.diastolic}
                    </span>
                    {p.pulse !== null && <span className="ml-2 font-num text-xs text-textmuted">{p.pulse} bpm</span>}
                    <span className={`ml-2 text-[11px] ${c.colorClass}`}>{c.label}</span>
                  </div>
                  <span className="text-xs text-textmuted">
                    {parseDate(p.date).toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })} · {p.time}
                  </span>
                </div>
              );
            })
        )}
      </div>

      <div className="mb-1 mt-[22px] text-center text-[11px] leading-relaxed text-textfaint">
        Classificação apenas indicativa (referência geral de tensão arterial em repouso), não substitui avaliação
        médica.
      </div>
    </div>
  );
}
