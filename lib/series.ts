import { DayData } from "./types";
import { getDay } from "./storage";
import { addDays, parseDate, todayStr } from "./date";

export const DAYS = 14;

export interface DayPoint {
  date: string;
  label: string;
  day: DayData;
}

/** Últimos n dias (do mais antigo para hoje), incluindo dias sem registos. */
export function lastDays(n: number = DAYS): DayPoint[] {
  const today = todayStr();
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(today, -(n - 1 - i));
    return { date, label: String(parseDate(date).getDate()), day: getDay(date) };
  });
}

export function consumedKcal(day: DayData): number {
  return Object.values(day.meals)
    .flat()
    .reduce((s, f) => s + f.kcal, 0);
}