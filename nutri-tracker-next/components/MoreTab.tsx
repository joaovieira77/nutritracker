"use client";

import { useEffect, useRef, useState } from "react";
import { Food, Recipe } from "@/lib/types";
import { getCustomFoods, deleteCustomFood } from "@/lib/customFoods";
import { getRecipes, deleteRecipe, recipeAsFood } from "@/lib/recipes";
import { exportBackup, importBackup } from "@/lib/backup";
import CreateFoodModal from "./modals/CreateFoodModal";
import RecipeBuilderModal from "./modals/RecipeBuilderModal";

export default function MoreTab() {
  const [customFoods, setCustomFoods] = useState<Food[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showCreateFood, setShowCreateFood] = useState(false);
  const [showRecipeBuilder, setShowRecipeBuilder] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function refresh() {
    setCustomFoods(getCustomFoods());
    setRecipes(getRecipes());
  }

  useEffect(refresh, []);

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = importBackup(String(reader.result));
        setImportMsg(
          `Importado: ${result.daysImported} dia(s), ${result.foodsImported} alimento(s), ${result.recipesImported} receita(s).`
        );
        refresh();
      } catch {
        setImportMsg("Não foi possível ler este ficheiro. Confirma que é um backup exportado por esta app.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5">
      <header className="top-header mb-[18px] flex items-center gap-2 font-display text-[19px] font-semibold">
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        Mais
      </header>

      {/* Custom foods */}
      <h2 className="mb-2.5 font-display text-sm font-semibold text-textmuted">Alimentos personalizados</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        {customFoods.length === 0 ? (
          <div className="text-xs text-textfaint">Ainda não criaste nenhum alimento.</div>
        ) : (
          customFoods.map((f, i) => (
            <div
              key={f.id}
              className={`flex items-center justify-between py-2 text-[13.5px] ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span>{f.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-num text-xs text-textmuted">{Math.round(f.kcal)} kcal/100g</span>
                <button
                  className="px-0.5 text-base text-textfaint"
                  onClick={() => {
                    deleteCustomFood(f.id);
                    refresh();
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
        <button
          className="mt-3 w-full rounded-[10px] border border-dashed border-border px-3 py-2.5 text-left text-[13px] text-textmuted active:border-red active:text-red"
          onClick={() => setShowCreateFood(true)}
        >
          + Criar alimento
        </button>
      </div>

      {/* Recipes */}
      <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">As minhas receitas</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        {recipes.length === 0 ? (
          <div className="text-xs text-textfaint">
            Ainda não tens receitas. Cria uma para somares automaticamente vários ingredientes.
          </div>
        ) : (
          recipes.map((r, i) => {
            const asFood = recipeAsFood(r);
            return (
              <div key={r.id} className={`py-2.5 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="flex items-center justify-between text-[13.5px]">
                  <span>{r.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-num text-xs text-textmuted">{Math.round(asFood.kcal)} kcal/100g</span>
                    <button
                      className="px-0.5 text-base text-textfaint"
                      onClick={() => {
                        deleteRecipe(r.id);
                        refresh();
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="mt-0.5 text-[11px] text-textfaint">
                  {r.ingredients.length} ingrediente(s) · {r.finalWeight || Math.round(recipeAsFoodWeight(r))}g finais
                </div>
              </div>
            );
          })
        )}
        <button
          className="mt-3 w-full rounded-[10px] border border-dashed border-border px-3 py-2.5 text-left text-[13px] text-textmuted active:border-red active:text-red"
          onClick={() => setShowRecipeBuilder(true)}
        >
          + Nova receita
        </button>
      </div>
      <div className="mt-2 text-[11px] text-textfaint">
        As receitas ficam disponíveis na pesquisa de alimentos, ao adicionar a uma refeição — basta pesquisar pelo
        nome (aparece com a etiqueta &quot;receita&quot;).
      </div>

      {/* Backup */}
      <h2 className="mb-2.5 mt-[26px] font-display text-sm font-semibold text-textmuted">Backup de dados</h2>
      <div className="rounded-card border border-border bg-surface p-4">
        <p className="mb-3 text-[12.5px] leading-relaxed text-textmuted">
          Todos os teus dados (dias registados, alimentos personalizados e receitas) vivem só neste browser. Exporta
          um ficheiro de segurança de vez em quando, ou antes de trocar de dispositivo/browser.
        </p>
        <div className="flex gap-2">
          <button
            className="flex-1 rounded-[10px] border border-red bg-red px-3.5 py-2.5 text-[13px] font-semibold text-[#1a0506]"
            onClick={exportBackup}
          >
            Exportar backup
          </button>
          <button
            className="flex-1 rounded-[10px] border border-border px-3.5 py-2.5 text-[13px] font-semibold"
            onClick={() => fileInputRef.current?.click()}
          >
            Importar backup
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleImportFile} />
        </div>
        {importMsg && <div className="mt-3 text-[12px] text-textmuted">{importMsg}</div>}
      </div>

      <div className="mb-1 mt-[22px] text-center text-[11px] leading-relaxed text-textfaint">
        Importar um backup adiciona os dias e itens em falta; não apaga dados já existentes neste browser.
      </div>

      {showCreateFood && (
        <CreateFoodModal
          onClose={() => setShowCreateFood(false)}
          onCreated={() => {
            setShowCreateFood(false);
            refresh();
          }}
        />
      )}
      {showRecipeBuilder && (
        <RecipeBuilderModal
          onClose={() => setShowRecipeBuilder(false)}
          onSaved={() => {
            setShowRecipeBuilder(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}

function recipeAsFoodWeight(r: Recipe): number {
  return r.ingredients.reduce((s, i) => s + i.grams, 0);
}
