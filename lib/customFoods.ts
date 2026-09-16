import { Food } from "./types";
import { uid } from "./date";

const KEY = "customFoods";

export function getCustomFoods(): Food[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Food[]) : [];
  } catch {
    return [];
  }
}

function saveCustomFoods(foods: Food[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(foods));
  } catch {
    // storage unavailable — fail silently
  }
}

export function addCustomFood(input: Omit<Food, "id">): Food {
  const food: Food = { ...input, id: uid() };
  const foods = getCustomFoods();
  foods.push(food);
  saveCustomFoods(foods);
  return food;
}

export function deleteCustomFood(id: string): void {
  saveCustomFoods(getCustomFoods().filter((f) => f.id !== id));
}

export function updateCustomFood(id: string, updates: Omit<Food, "id">): void {
  const foods = getCustomFoods().map((f) => (f.id === id ? { ...f, ...updates } : f));
  saveCustomFoods(foods);
}