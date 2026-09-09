export type MealKey = "pequeno-almoco" | "almoco" | "lanche" | "jantar" | "outro";

export const MEAL_TYPES: { key: MealKey; label: string }[] = [
  { key: "pequeno-almoco", label: "Pequeno-almoço" },
  { key: "almoco", label: "Almoço" },
  { key: "lanche", label: "Lanche" },
  { key: "jantar", label: "Jantar" },
  { key: "outro", label: "Outro" },
];

export interface Food {
  id: string;
  name: string;
  kcal: number; // per 100g
  p: number; // protein per 100g
  c: number; // carbs per 100g
  f: number; // fat per 100g
}

export interface FoodEntry {
  id: string;
  name: string;
  grams: number;
  kcal: number;
  p: number;
  c: number;
  f: number;
}

export interface ExerciseEntry {
  id: string;
  type: string;
  duration: number; // minutes
}

export interface SleepEntry {
  bed: string; // HH:mm
  wake: string; // HH:mm
  durationMin: number;
}

export interface DayData {
  meals: Record<MealKey, FoodEntry[]>;
  exercises: ExerciseEntry[];
  sleep: SleepEntry | null;
  water: number; // ml
  weight: number | null; // kg
  notes: string; // observações livres do dia
}

export interface WeightPoint {
  date: string;
  weight: number;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  grams: number;
  kcal: number;
  p: number;
  c: number;
  f: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  finalWeight: number; // peso final do prato depois de cozinhado (g); 0 = usar soma dos ingredientes
}
