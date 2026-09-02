import { DayData, MEAL_TYPES } from "./types";

export function emptyDay(): DayData {
  const meals = {} as DayData["meals"];
  MEAL_TYPES.forEach((m) => (meals[m.key] = []));
  return { meals, exercises: [], sleep: null, water: 0, weight: null, notes: "" };
}

const KEY_PREFIX = "day:";

export function getDay(dateStr: string): DayData {
  if (typeof window === "undefined") return emptyDay();
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + dateStr);
    if (!raw) return emptyDay();
    const parsed = JSON.parse(raw) as Partial<DayData>;
    // merge with empty day to survive schema additions gracefully
    return { ...emptyDay(), ...parsed, meals: { ...emptyDay().meals, ...parsed.meals } };
  } catch {
    return emptyDay();
  }
}

export function saveDay(dateStr: string, day: DayData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY_PREFIX + dateStr, JSON.stringify(day));
  } catch {
    // storage full or unavailable — fail silently, data stays in memory for this session
  }
}

export function listAllDayDates(): string[] {
  if (typeof window === "undefined") return [];
  const out: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith(KEY_PREFIX)) out.push(key.slice(KEY_PREFIX.length));
  }
  return out.sort();
}
