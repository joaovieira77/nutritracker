import { DayData, Food, Recipe } from "./types";
import { getDay, saveDay, listAllDayDates } from "./storage";
import { getCustomFoods } from "./customFoods";
import { getRecipes, saveRecipes } from "./recipes";
import { todayStr } from "./date";

interface BackupData {
  version: 1;
  exportedAt: string;
  days: Record<string, DayData>;
  customFoods: Food[];
  recipes: Recipe[];
}

export function exportBackup(): void {
  if (typeof window === "undefined") return;
  const days: Record<string, DayData> = {};
  listAllDayDates().forEach((date) => {
    days[date] = getDay(date);
  });
  const data: BackupData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    days,
    customFoods: getCustomFoods(),
    recipes: getRecipes(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `nutri-tracker-backup-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export interface ImportResult {
  daysImported: number;
  foodsImported: number;
  recipesImported: number;
}

/** Merges a backup file into current localStorage. Days overwrite same-date entries;
 * custom foods and recipes are appended, skipping ids that already exist. */
export function importBackup(json: string): ImportResult {
  const data = JSON.parse(json) as BackupData;
  let daysImported = 0;
  let foodsImported = 0;
  let recipesImported = 0;

  Object.entries(data.days || {}).forEach(([date, day]) => {
    saveDay(date, day);
    daysImported++;
  });

  if (data.customFoods && data.customFoods.length) {
    const existing = getCustomFoods();
    const existingIds = new Set(existing.map((f) => f.id));
    const toAdd = data.customFoods.filter((f) => !existingIds.has(f.id));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("customFoods", JSON.stringify([...existing, ...toAdd]));
    }
    foodsImported = toAdd.length;
  }

  if (data.recipes && data.recipes.length) {
    const existing = getRecipes();
    const existingIds = new Set(existing.map((r) => r.id));
    const toAdd = data.recipes.filter((r) => !existingIds.has(r.id));
    saveRecipes([...existing, ...toAdd]);
    recipesImported = toAdd.length;
  }

  return { daysImported, foodsImported, recipesImported };
}
