export type MealKey = "pequeno-almoco" | "almoco" | "lanche" | "jantar" | "outro";

export const MEAL_TYPES: { key: MealKey; label: string }[] = [
  { key: "pequeno-almoco", label: "Pequeno-almoço" },
  { key: "almoco", label: "Almoço" },
  { key: "lanche", label: "Lanche" },
  { key: "jantar", label: "Jantar" },
  { key: "outro", label: "Outro" },
];

export interface Food { // per 100g
  id: string;
  name: string;
  kcal: number; 
  p: number;
  c: number; 
  f: number; 
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
  caloriesBurned?: number; // opcional
}

export interface SleepEntry {
  bed: string; // HH:mm
  wake: string; // HH:mm
  durationMin: number;
}

export interface BloodPressureEntry {
  id: string;
  time: string; // HH:mm
  systolic: number; // mmHg
  diastolic: number; // mmHg
  pulse: number | null; // bpm, opcional
}

export interface DayData {
  meals: Record<MealKey, FoodEntry[]>;
  exercises: ExerciseEntry[];
  sleep: SleepEntry | null;
  water: number; // ml
  weight: number | null; // kg
  notes: string; // observações livres do dia
  bloodPressure: BloodPressureEntry[];
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

