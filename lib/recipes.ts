import { Food, Recipe } from "./types";
import { uid } from "./date";

const KEY = "recipes";

export function getRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
  } catch {
    return [];
  }
}

export function saveRecipes(recipes: Recipe[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(recipes));
  } catch {
    // storage unavailable — fail silently
  }
}

export function addRecipe(input: Omit<Recipe, "id">): Recipe {
  const recipe: Recipe = { ...input, id: uid() };
  const recipes = getRecipes();
  recipes.push(recipe);
  saveRecipes(recipes);
  return recipe;
}

export function deleteRecipe(id: string): void {
  saveRecipes(getRecipes().filter((r) => r.id !== id));
}

/** Totals contributed by all ingredients (absolute, not per 100g). */
export function recipeTotals(recipe: Recipe) {
  return recipe.ingredients.reduce(
    (acc, i) => {
      acc.kcal += i.kcal;
      acc.p += i.p;
      acc.c += i.c;
      acc.f += i.f;
      acc.grams += i.grams;
      return acc;
    },
    { kcal: 0, p: 0, c: 0, f: 0, grams: 0 }
  );
}

/** Converts a recipe into a Food-like object with macros per 100g of the finished dish. */
export function recipeAsFood(recipe: Recipe): Food {
  const totals = recipeTotals(recipe);
  const weight = recipe.finalWeight || totals.grams || 1;
  const factor = 100 / weight;
  return {
    id: recipe.id,
    name: `${recipe.name} (receita)`,
    kcal: totals.kcal * factor,
    p: totals.p * factor,
    c: totals.c * factor,
    f: totals.f * factor,
  };
}

export { uid };
