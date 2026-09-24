"use client";

import { useEffect, useState } from "react";
import { DayData, Food, FoodEntry, MEAL_TYPES, MealKey, BloodPressureEntry } from "@/lib/types";
import { getDay, saveDay } from "@/lib/storage";
import { addDays, dayLabel, fmtDurationH, round1, todayStr } from "@/lib/date";
import { FoodSearchModal, QuantityModal } from "./modals/FoodModals";
import { WaterModal, ExerciseModal, SleepModal, WeightModal, BloodPressureModal } from "./modals/EntryModals";

type ModalState =
  | { kind: "none" }
  | { kind: "foodSearch"; mealKey: MealKey }
  | { kind: "quantity"; mealKey: MealKey; food: Food }
  | { kind: "water" }
  | { kind: "exercise" }
  | { kind: "sleep" }
  | { kind: "weight" }
  | { kind: "bloodPressure" };

export default function TodayTab() {
  const [currentDate, setCurrentDate] = useState(todayStr());
  const [day, setDay] = useState<DayData | null>(null);
  const [modal, setModal] = useState<ModalState>({ kind: "none" });

  useEffect(() => {
    setDay(getDay(currentDate));
  }, [currentDate]);

  function mutate(fn: (d: DayData) => void) {
    setDay((prev) => {
      const base = prev ?? getDay(currentDate);
      const next: DayData = JSON.parse(JSON.stringify(base));
      fn(next);
      saveDay(currentDate, next);
      return next;
    });
  }

  if (!day) return null;

  const totals = Object.values(day.meals)
    .flat()
    .reduce(
      (acc, f) => {
        acc.kcal += f.kcal;
        acc.p += f.p;
        acc.c += f.c;
        acc.f += f.f;
        return acc;
      },
      { kcal: 0, p: 0, c: 0, f: 0 }
    );

  const isToday = currentDate === todayStr();
  const cups = Math.floor((day.water || 0) / 250);

  function closeModal() {
    setModal({ kind: "none" });
  }

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5 lg:max-w-[1120px]">
      <header className="top-header mb-[18px] flex items-center justify-between lg:sticky lg:top-0 lg:z-20 lg:-mx-4 lg:mb-6 lg:border-b lg:border-border lg:bg-bg/85 lg:px-4 lg:py-3 lg:backdrop-blur-md">
        <div className="flex items-center gap-2 font-display text-[19px] font-semibold lg:text-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-red shadow-[0_0_12px_var(--tw-shadow-color)] shadow-redglow" />
          Diário
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentDate((d) => addDays(d, -1))}
            className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-surface2 text-text active:bg-reddim"
          >
            ‹
          </button>
          <span className={`min-w-[96px] text-center font-num text-[13px] ${isToday ? "text-red" : "text-textmuted"}`}>
            {dayLabel(currentDate)}
          </span>
          <button
            onClick={() => {
              if (currentDate >= todayStr()) return;
              setCurrentDate((d) => addDays(d, 1));
            }}
            className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-surface2 text-text active:bg-reddim disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </header>

      <div className="lg:flex lg:items-start lg:gap-8">
        {/* Coluna esquerda ~60%: totals + refeições — mais espaço, é onde se vive mais tempo */}
        <div className="lg:w-[58%]">
          {/* Totals hero — cresce no desktop para manter presença face ao espaço extra */}
          <div className="relative overflow-hidden rounded-[18px] border border-border bg-surface p-5 px-[18px] lg:rounded-[22px] lg:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-[140px] w-[140px] rounded-full bg-[radial-gradient(circle,rgba(232,56,74,.16),transparent_70%)] lg:h-[220px] lg:w-[220px]" />
            <div className="font-num text-[42px] font-bold leading-none lg:text-[58px]">
              {Math.round(totals.kcal)}
              <small className="ml-1.5 font-body text-sm font-medium text-textmuted lg:text-base">kcal hoje</small>
            </div>
            <div className="mt-4 flex gap-2.5 lg:mt-6 lg:gap-3">
              <MacroPill label="Proteína" value={`${round1(totals.p)}g`} colorClass="text-red" />
              <MacroPill label="Hidratos" value={`${round1(totals.c)}g`} colorClass="text-amber" />
              <MacroPill label="Gordura" value={`${round1(totals.f)}g`} colorClass="text-[#8fb3d9]" />
            </div>
          </div>

          <SectionTitle className="lg:mt-8 lg:text-base">Refeições</SectionTitle>
          <div className="rounded-card border border-border bg-surface p-4 lg:p-6">
            {MEAL_TYPES.map((mt) => {
              const items = day.meals[mt.key];
              const kcal = items.reduce((s, f) => s + f.kcal, 0);
              return (
                <div key={mt.key} className="mb-3 last:mb-0 lg:mb-5">
                  <div className="flex items-center justify-between px-1 py-2.5 lg:py-1">
                    <span className="text-sm font-semibold lg:text-[15px]">{mt.label}</span>
                    <span className="font-num text-[13px] text-textmuted">
                      {kcal > 0 ? `${Math.round(kcal)} kcal` : ""}
                    </span>
                  </div>
                  {items.map((f) => (
                    <div key={f.id} className="flex items-center justify-between border-t border-border px-1 py-2.5 text-[13.5px] lg:py-3">
                      <div>
                        <span>{f.name}</span>
                        <span className="ml-1.5 text-xs text-textfaint">{f.grams}g</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-num whitespace-nowrap text-textmuted">{Math.round(f.kcal)} kcal</span>
                        <button
                          className="ml-2 px-0.5 text-base text-textfaint"
                          onClick={() =>
                            mutate((d) => {
                              d.meals[mt.key] = d.meals[mt.key].filter((x) => x.id !== f.id);
                            })
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="mt-1.5 w-full rounded-[10px] border border-dashed border-border px-2.5 py-2 text-left text-[13px] text-textmuted active:border-red active:text-red lg:hover:border-red lg:hover:text-red"
                    onClick={() => setModal({ kind: "foodSearch", mealKey: mt.key })}
                  >
                    + Adicionar alimento
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coluna direita ~40%: registos rápidos, mais compactos e densos — não competem em peso visual com Refeições */}
        <div className="mt-[26px] lg:mt-0 lg:w-[42%] lg:space-y-5">
          <div>
            <SectionTitle className="lg:mb-2 lg:mt-0 lg:text-xs lg:uppercase lg:tracking-wide">Água</SectionTitle>
            <div className="rounded-card border border-border bg-surface p-4 lg:p-3.5">
              <div className="flex items-center gap-3.5">
                <div className="flex flex-1 flex-wrap gap-1">
                  {Array.from({ length: Math.max(cups, 8) }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-5 w-4 rounded-[3px_3px_6px_6px] border-[1.5px] ${
                        i < cups ? "border-red bg-red" : "border-border bg-surface2"
                      }`}
                    />
                  ))}
                </div>
                <div className="whitespace-nowrap text-right font-num text-xl font-semibold lg:text-lg">
                  {day.water || 0}
                  <small className="block font-body text-[11px] font-normal text-textmuted">ml</small>
                </div>
              </div>
              <div className="mt-3.5 flex gap-2 lg:mt-2.5">
                <button
                  className="rounded-[10px] border border-red bg-red px-3.5 py-2.5 text-[13px] font-semibold text-[#1a0506] lg:px-3 lg:py-2"
                  onClick={() =>
                    mutate((d) => {
                      d.water = (d.water || 0) + 250;
                    })
                  }
                >
                  +1 copo (250ml)
                </button>
                <button
                  className="rounded-[10px] border border-border px-3.5 py-2.5 text-[13px] font-semibold lg:px-3 lg:py-2"
                  onClick={() => setModal({ kind: "water" })}
                >
                  Personalizado
                </button>
              </div>
            </div>
          </div>

          <div>
            <SectionTitle
              className="lg:mb-2 lg:mt-0 lg:text-xs lg:uppercase lg:tracking-wide"
              action={
                <button className="text-[13px] font-semibold text-red" onClick={() => setModal({ kind: "exercise" })}>
                  + adicionar
                </button>
              }
            >
              Exercício
            </SectionTitle>
            <div className="rounded-card border border-border bg-surface p-4 lg:p-3.5">
              {day.exercises.length ? (
                day.exercises.map((e, i) => (
                  <div key={e.id} className={`flex justify-between py-2 text-[13px] ${i > 0 ? "border-t border-border" : ""}`}>
                    <span>{e.type}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-num text-textmuted">
                        {e.duration} min{e.caloriesBurned ? ` · ${e.caloriesBurned} kcal` : ""}
                      </span>
                      <button
                        className="px-0.5 text-base text-textfaint"
                        onClick={() =>
                          mutate((d) => {
                            d.exercises = d.exercises.filter((x) => x.id !== e.id);
                          })
                        }
                      >
                        ×
                      </button>
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-textfaint">Sem exercício registado.</div>
              )}
            </div>
          </div>

          <div>
            <SectionTitle className="lg:mb-2 lg:mt-0 lg:text-xs lg:uppercase lg:tracking-wide">Sono &amp; Peso</SectionTitle>
            <div className="grid grid-cols-2 gap-3 lg:gap-2.5">
              <div
                className="cursor-pointer rounded-card border border-border bg-surface p-3.5 lg:p-3"
                onClick={() => setModal({ kind: "sleep" })}
              >
                {day.sleep ? (
                  <>
                    <div className="font-num text-[22px] font-semibold lg:text-lg">{fmtDurationH(day.sleep.durationMin)}</div>
                    <div className="mt-0.5 text-xs text-textmuted">Sono</div>
                    <div className="mt-1.5 text-[11px] text-textfaint">
                      {day.sleep.bed} → {day.sleep.wake}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[15px] text-textmuted">—</div>
                    <div className="mt-0.5 text-xs text-textmuted">Sono</div>
                    <div className="mt-1.5 text-[11px] text-textfaint">Sem registo</div>
                  </>
                )}
              </div>
              <div
                className="cursor-pointer rounded-card border border-border bg-surface p-3.5 lg:p-3"
                onClick={() => setModal({ kind: "weight" })}
              >
                {day.weight ? (
                  <>
                    <div className="font-num text-[22px] font-semibold lg:text-lg">
                      {day.weight} <span className="text-xs text-textmuted">kg</span>
                    </div>
                    <div className="mt-0.5 text-xs text-textmuted">Peso</div>
                    <div className="mt-1.5 text-[11px] text-textfaint">Registado hoje</div>
                  </>
                ) : (
                  <>
                    <div className="text-[15px] text-textmuted">—</div>
                    <div className="mt-0.5 text-xs text-textmuted">Peso</div>
                    <div className="mt-1.5 text-[11px] text-textfaint">Opcional</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <SectionTitle
              className="lg:mb-2 lg:mt-0 lg:text-xs lg:uppercase lg:tracking-wide"
              action={
                <button className="text-[13px] font-semibold text-red" onClick={() => setModal({ kind: "bloodPressure" })}>
                  + adicionar
                </button>
              }
            >
              Tensão arterial
            </SectionTitle>
            <div className="rounded-card border border-border bg-surface p-4 lg:p-3.5">
              {day.bloodPressure.length ? (
                day.bloodPressure.map((bp, i) => (
                  <div
                    key={bp.id}
                    className={`flex items-center justify-between py-2 text-[13px] ${i > 0 ? "border-t border-border" : ""}`}
                  >
                    <span className="text-textmuted">{bp.time}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-num font-semibold">
                        {bp.systolic}/{bp.diastolic} <span className="font-body font-normal text-textmuted">mmHg</span>
                      </span>
                      {bp.pulse !== null && (
                        <span className="font-num text-textmuted">{bp.pulse} bpm</span>
                      )}
                      <button
                        className="px-0.5 text-base text-textfaint"
                        onClick={() =>
                          mutate((d) => {
                            d.bloodPressure = d.bloodPressure.filter((x) => x.id !== bp.id);
                          })
                        }
                      >
                        ×
                      </button>
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-textfaint">Sem medições registadas.</div>
              )}
            </div>
          </div>

          <div>
            <SectionTitle className="lg:mb-2 lg:mt-0 lg:text-xs lg:uppercase lg:tracking-wide">Observações</SectionTitle>
            <div className="rounded-card border border-border bg-surface p-4 lg:p-3.5">
              <textarea
                placeholder="Notas livres do dia — sintomas, disposição, contexto para a consulta..."
                className="min-h-[80px] w-full resize-y rounded-[10px] border border-border bg-surface2 p-3 text-[13.5px] text-text outline-none focus:border-red lg:min-h-[64px]"
                value={day.notes}
                onChange={(e) => {
                  const value = e.target.value;
                  mutate((d) => {
                    d.notes = value;
                  });
                }}
              />
            </div>
          </div>

          <div className="mb-1 mt-[22px] text-center text-[11px] leading-relaxed text-textfaint lg:mt-2 lg:text-left">
            Os dados ficam guardados neste browser (localStorage), sem sincronização com outros dispositivos.
          </div>
        </div>
      </div>

      {modal.kind === "foodSearch" && (
        <FoodSearchModal
          mealKey={modal.mealKey}
          onClose={closeModal}
          onPickFood={(food) => setModal({ kind: "quantity", mealKey: modal.mealKey, food })}
        />
      )}
      {modal.kind === "quantity" && (
        <QuantityModal
          food={modal.food}
          onClose={closeModal}
          onConfirm={(entry: FoodEntry) => {
            mutate((d) => {
              d.meals[modal.mealKey].push(entry);
            });
            closeModal();
          }}
        />
      )}
      {modal.kind === "water" && (
        <WaterModal
          onClose={closeModal}
          onConfirm={(ml) => {
            mutate((d) => {
              d.water = (d.water || 0) + ml;
            });
            closeModal();
          }}
        />
      )}
      {modal.kind === "exercise" && (
        <ExerciseModal
          onClose={closeModal}
          onConfirm={(entry) => {
            mutate((d) => {
              d.exercises.push(entry);
            });
            closeModal();
          }}
        />
      )}
      {modal.kind === "sleep" && (
        <SleepModal
          initial={day.sleep}
          onClose={closeModal}
          onConfirm={(entry) => {
            mutate((d) => {
              d.sleep = entry;
            });
            closeModal();
          }}
        />
      )}
      {modal.kind === "weight" && (
        <WeightModal
          initial={day.weight}
          onClose={closeModal}
          onConfirm={(w) => {
            mutate((d) => {
              d.weight = w;
            });
            closeModal();
          }}
        />
      )}
      {modal.kind === "bloodPressure" && (
        <BloodPressureModal
          onClose={closeModal}
          onConfirm={(entry: BloodPressureEntry) => {
            mutate((d) => {
              d.bloodPressure.push(entry);
            });
            closeModal();
          }}
        />
      )}
    </div>
  );
}

function SectionTitle({
  children,
  action,
  className = "",
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`mb-2.5 mt-[26px] flex items-center justify-between font-display text-sm font-semibold text-textmuted ${className}`}>
      {children}
      {action}
    </h2>
  );
}

function MacroPill({ label, value, colorClass }: { label: string; value: string; colorClass: string }) {
  return (
    <div className="flex-1 rounded-[10px] border border-border bg-surface2 px-2 py-2.5 text-center lg:px-3 lg:py-3">
      <div className={`font-num text-base font-semibold lg:text-lg ${colorClass}`}>{value}</div>
      <div className="mt-0.5 text-[11px] text-textmuted">{label}</div>
    </div>
  );
}