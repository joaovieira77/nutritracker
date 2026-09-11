import { FOOD_DB, normalize } from "./foods";
import { getCustomFoods } from "./customFoods";
import { getRecipes, recipeAsFood } from "./recipes";
import { Food } from "./types";

export function searchAllFoods(query: string, limit = 20): Food[] {
  const nq = normalize(query);
  if (!nq.trim()) return [];
  const custom = getCustomFoods();
  const recipeFoods = getRecipes().map(recipeAsFood);
  const all = [...FOOD_DB, ...custom, ...recipeFoods];
  return all.filter((f) => normalize(f.name).includes(nq)).slice(0, limit);
}
