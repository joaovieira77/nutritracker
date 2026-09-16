"use client";

import { useState } from "react";
import Modal, { ModalActions, FieldLabel, inputClass, btnGhost, btnPrimary } from "../Modal";
import { searchAllFoods } from "@/lib/search";
import { Food, Recipe, RecipeIngredient } from "@/lib/types";
import { round1, uid } from "@/lib/date";
import { addRecipe, recipeTotals, updateRecipe } from "@/lib/recipes";

export default function RecipeBuilderModal({
  onClose,
  onSaved,
  initial,
}: {
  onClose: () => void;
  onSaved: () => void;
  initial?: Recipe;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(initial?.ingredients ?? []);
  const [finalWeight, setFinalWeight] = useState<number | undefined>(
    initial?.finalWeight ? initial.finalWeight : undefined
  );

  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Food | null>(null);
  const [grams, setGrams] = useState(100);

  const results = query.trim() ? searchAllFoods(query) : [];

  const totals = recipeTotals({ id: "", name: "", ingredients, finalWeight: 0 });
  const weight = finalWeight || totals.grams || 1;
  const per100 = {
    kcal: (totals.kcal * 100) / weight,
    p: (totals.p * 100) / weight,
    c: (totals.c * 100) / weight,
    f: (totals.f * 100) / weight,
  };

  function addIngredient() {
    if (!picked || grams <= 0) return;
    const entry: RecipeIngredient = {
      id: uid(),
      name: picked.name,
      grams,
      kcal: (picked.kcal * grams) / 100,
      p: (picked.p * grams) / 100,
      c: (picked.c * grams) / 100,
      f: (picked.f * grams) / 100,
    };
    setIngredients((prev) => [...prev, entry]);
    setPicked(null);
    setQuery("");
    setGrams(100);
  }

  const canSave = name.trim().length > 0 && ingredients.length > 0;

  return (
    <Modal title={initial ? "Editar receita" : "Nova receita"} onClose={onClose} center={false}>
      <FieldLabel>Nome da receita</FieldLabel>
      <input
        type="text"
        placeholder="ex: Frango no tacho com molho de tomate"
        className={inputClass}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FieldLabel>Adicionar ingrediente</FieldLabel>
      {!picked ? (
        <>
          <input
            type="text"
            placeholder="Pesquisar alimento..."
            className={inputClass}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <div className="mt-1 max-h-[160px] overflow-y-auto rounded-[10px] border border-border">
              {results.map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    setPicked(f);
                    setQuery(f.name);
                  }}
                  className="cursor-pointer border-b border-border px-3 py-2 text-[13px] last:border-b-0 active:bg-surface2"
                >
                  {f.name}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-[10px] border border-border bg-surface2 px-3 py-2.5 text-[13.5px]">
            {picked.name}
          </div>
          <input
            type="number"
            min={1}
            className={`${inputClass} w-24`}
            value={grams}
            onChange={(e) => setGrams(parseFloat(e.target.value) || 0)}
          />
          <span className="text-xs text-textmuted">g</span>
          <button
            className="rounded-[10px] border border-red bg-red px-3 py-2.5 text-xs font-semibold text-[#1a0506]"
            onClick={addIngredient}
          >
            Add
          </button>
          <button
            className="px-1 text-lg text-textfaint"
            onClick={() => {
              setPicked(null);
              setQuery("");
            }}
          >
            ×
          </button>
        </div>
      )}

      {ingredients.length > 0 && (
        <div className="mt-3 rounded-[10px] border border-border">
          {ingredients.map((ing, i) => (
            <div
              key={ing.id}
              className={`flex items-center justify-between px-3 py-2 text-[13px] ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span>
                {ing.name} <span className="text-textfaint">· {ing.grams}g</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-num text-xs text-textmuted">{Math.round(ing.kcal)} kcal</span>
                <button
                  className="px-0.5 text-base text-textfaint"
                  onClick={() => setIngredients((prev) => prev.filter((x) => x.id !== ing.id))}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FieldLabel>Peso final do prato depois de cozinhado (g) — opcional</FieldLabel>
      <input
        type="number"
        min={0}
        placeholder={`padrão: soma dos ingredientes (${Math.round(totals.grams)}g)`}
        className={inputClass}
        value={finalWeight ?? ""}
        onChange={(e) => setFinalWeight(e.target.value ? parseFloat(e.target.value) : undefined)}
      />

      {ingredients.length > 0 && (
        <div className="mt-3.5 rounded-[10px] border border-border bg-surface2 p-3 font-num text-[13px] text-textmuted">
          Por 100g: {Math.round(per100.kcal)} kcal · P {round1(per100.p)}g · H {round1(per100.c)}g · G{" "}
          {round1(per100.f)}g
        </div>
      )}

      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1 disabled:opacity-40`}
          disabled={!canSave}
          onClick={() => {
            if (!canSave) return;
            const data = { name: name.trim(), ingredients, finalWeight: finalWeight || 0 };
            if (initial) {
              updateRecipe(initial.id, data);
            } else {
              addRecipe(data);
            }
            onSaved();
          }}
        >
          {initial ? "Guardar alterações" : "Guardar receita"}
        </button>
      </ModalActions>
    </Modal>
  );
}
