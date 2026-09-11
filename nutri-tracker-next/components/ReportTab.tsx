"use client";

import { useEffect, useState } from "react";
import { getDay } from "@/lib/storage";
import { addDays, dayLabel, fmtDurationH, parseDate, round1, startOfWeek, todayStr } from "@/lib/date";
import { DayData, ExerciseEntry, BloodPressureEntry } from "@/lib/types";

interface WeekAgg {
  totKcal: number;
  totP: number;
  totC: number;
  totF: number;
  totWater: number;
  totSleepMin: number;
  sleepDays: number;
  exList: (ExerciseEntry & { date: string })[];
  weightEntries: { date: string; weight: number }[];
  notesEntries: { date: string; notes: string }[];
  bpEntries: (BloodPressureEntry & { date: string })[];
  daysWithData: number;
}

function aggregateWeek(weekStart: string): WeekAgg {
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  const dayObjs: (DayData & { date: string })[] = days.map((ds) => ({ date: ds, ...getDay(ds) }));

  let totKcal = 0,
    totP = 0,
    totC = 0,
    totF = 0,
    totWater = 0,
    totSleepMin = 0,
    sleepDays = 0;
  const exList: (ExerciseEntry & { date: string })[] = [];
  const weightEntries: { date: string; weight: number }[] = [];
  const notesEntries: { date: string; notes: string }[] = [];
  const bpEntries: (BloodPressureEntry & { date: string })[] = [];

  dayObjs.forEach((d) => {
    const flat = Object.values(d.meals).flat();
    flat.forEach((f) => {
      totKcal += f.kcal;
      totP += f.p;
      totC += f.c;
      totF += f.f;
    });
    totWater += d.water || 0;
    if (d.sleep) {
      totSleepMin += d.sleep.durationMin;
      sleepDays++;
    }
    d.exercises.forEach((e) => exList.push({ ...e, date: d.date }));
    if (d.weight) weightEntries.push({ date: d.date, weight: d.weight });
    if (d.notes && d.notes.trim()) notesEntries.push({ date: d.date, notes: d.notes.trim() });
    d.bloodPressure.forEach((bp) => bpEntries.push({ ...bp, date: d.date }));
  });

  const daysWithData =
    dayObjs.filter(
      (d) => Object.values(d.meals).flat().length > 0 || d.water > 0 || d.sleep || d.exercises.length > 0
    ).length || 1;

  return {
    totKcal,
    totP,
    totC,
    totF,
    totWater,
    totSleepMin,
    sleepDays,
    exList,
    weightEntries,
    notesEntries,
    bpEntries,
    daysWithData,
  };
}

export default function ReportTab() {
  const [weekStart, setWeekStart] = useState(startOfWeek(todayStr()));
  const [agg, setAgg] = useState<WeekAgg | null>(null);

  useEffect(() => {
    setAgg(aggregateWeek(weekStart));
  }, [weekStart]);

  if (!agg) return null;

  const {
    totKcal,
    totP,
    totC,
    totF,
    totWater,
    totSleepMin,
    sleepDays,
    exList,
    weightEntries,
    notesEntries,
    bpEntries,
    daysWithData,
  } = agg;

  const avgSystolic = bpEntries.length
    ? Math.round(bpEntries.reduce((s, e) => s + e.systolic, 0) / bpEntries.length)
    : null;
  const avgDiastolic = bpEntries.length
    ? Math.round(bpEntries.reduce((s, e) => s + e.diastolic, 0) / bpEntries.length)
    : null;

  const weightChange =
    weightEntries.length >= 2 ? weightEntries[weightEntries.length - 1].weight - weightEntries[0].weight : null;

  const weekEnd = addDays(weekStart, 6);
  const rangeLabel = `${parseDate(weekStart).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
  })} – ${parseDate(weekEnd).toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })}`;

  const thisWeek = startOfWeek(todayStr());

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5">
      <header className="top-header mb-[18px] flex items-center gap-2 font-display text-[19px] font-semibold">
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        Relatório
      </header>

      <div className="no-print mb-4 flex items-center justify-between">
        <button
          className="rounded-[10px] border border-border px-3.5 py-2.5 text-[13px] font-semibold"
          onClick={() => setWeekStart((w) => addDays(w, -7))}
        >
          ‹ Semana anterior
        </button>
        <span className="font-num text-[12.5px] text-textmuted">{rangeLabel}</span>
        <button
          className="rounded-[10px] border border-border px-3.5 py-2.5 text-[13px] font-semibold disabled:opacity-40"
          onClick={() => setWeekStart((w) => addDays(w, 7))}
          disabled={weekStart >= thisWeek}
        >
          Seguinte ›
        </button>
      </div>

      <div id="report-print-area">
        <h2 className="mb-1 font-display text-lg font-semibold">Relatório semanal</h2>
        <div className="mb-4 font-num text-[13px] text-textmuted">{rangeLabel}</div>

        <h2 className="mb-2.5 mt-0 font-display text-sm font-semibold text-textmuted">
          Resumo alimentar (média diária)
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          <RStat value={`${Math.round(totKcal / daysWithData)}`} label="kcal / dia" />
          <RStat value={`${round1(totP / daysWithData)}g`} label="Proteína / dia" />
          <RStat value={`${round1(totC / daysWithData)}g`} label="Hidratos / dia" />
          <RStat value={`${round1(totF / daysWithData)}g`} label="Gordura / dia" />
        </div>

        <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Água &amp; Sono</h2>
        <div className="grid grid-cols-2 gap-2.5">
          <RStat value={`${Math.round(totWater / 7)}ml`} label="Água / dia (média)" />
          <RStat value={`${totWater}ml`} label="Água total na semana" />
          <RStat value={sleepDays ? fmtDurationH(Math.round(totSleepMin / sleepDays)) : "—"} label="Sono médio / noite" />
          <RStat value={`${sleepDays}/7`} label="Noites registadas" />
        </div>

        <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Exercício</h2>
        <div className="rounded-card border border-border bg-surface p-4">
          {exList.length ? (
            exList.map((e, i) => (
              <div
                key={e.id}
                className={`flex justify-between py-1.5 text-[13px] ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span>
                  {parseDate(e.date).toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" })} ·{" "}
                  {e.type}
                </span>
                <span>{e.duration} min</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-textfaint">Sem exercícios esta semana.</div>
          )}
        </div>

        <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Evolução do peso</h2>
        <div className="rounded-card border border-border bg-surface p-4">
          {weightEntries.length ? (
            <>
              <div
                className="font-num text-[22px] font-semibold"
                style={{
                  color: weightChange !== null ? (weightChange < 0 ? "#5fae7a" : weightChange > 0 ? "#e8384a" : undefined) : undefined,
                }}
              >
                {weightChange !== null
                  ? `${weightChange > 0 ? "+" : ""}${round1(weightChange)} kg`
                  : `${weightEntries[0].weight} kg`}
              </div>
              <div className="mt-1 text-xs text-textmuted">{weightEntries.length} registo(s) esta semana</div>
            </>
          ) : (
            <div className="text-xs text-textfaint">Sem registos de peso esta semana.</div>
          )}
        </div>

        <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Observações</h2>
        <div className="rounded-card border border-border bg-surface p-4">
          {notesEntries.length ? (
            notesEntries.map((n, i) => (
              <div key={n.date} className={`py-2 text-[13px] ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="mb-1 font-num text-[11px] text-textmuted">
                  {parseDate(n.date).toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" })}
                </div>
                <div className="whitespace-pre-wrap text-text">{n.notes}</div>
              </div>
            ))
          ) : (
            <div className="text-xs text-textfaint">Sem observações esta semana.</div>
          )}
        </div>

        <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Tensão arterial</h2>
        <div className="rounded-card border border-border bg-surface p-4">
          {bpEntries.length ? (
            <>
              <div className="font-num text-[22px] font-semibold">
                {avgSystolic}/{avgDiastolic} <span className="text-sm font-body font-normal text-textmuted">mmHg (média)</span>
              </div>
              <div className="mt-1 text-xs text-textmuted">{bpEntries.length} medição(ões) esta semana</div>
            </>
          ) : (
            <div className="text-xs text-textfaint">Sem medições de tensão esta semana.</div>
          )}
        </div>
      </div>

      <button
        className="no-print mt-5 w-full rounded-[10px] border border-red bg-red px-3.5 py-2.5 text-[13px] font-semibold text-[#1a0506]"
        onClick={() => window.print()}
      >
        Exportar / imprimir relatório
      </button>
      <div className="no-print mt-3.5 text-center text-[11.5px] leading-relaxed text-textfaint">
        Usa &quot;Exportar / imprimir&quot; para gerar uma versão apresentável (PDF) para mostrares à nutricionista.
      </div>
    </div>
  );
}

function RStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3.5">
      <div className="font-num text-xl font-semibold">{value}</div>
      <div className="mt-0.5 text-[11.5px] text-textmuted">{label}</div>
    </div>
  );
}
