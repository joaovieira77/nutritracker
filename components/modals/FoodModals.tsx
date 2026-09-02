"use client";

import { useState } from "react";
import Modal, { ModalActions, FieldLabel, inputClass, btnGhost, btnPrimary } from "../Modal";
import { searchFoods } from "@/lib/foods";
import { Food, FoodEntry, MEAL_TYPES, MealKey } from "@/lib/types";
import { round1, uid } from "@/lib/date";

export function FoodSearchModal({
  mealKey,
  onClose,
  onPickFood,
}: {
  mealKey: MealKey;
  onClose: () => void;
  onPickFood: (food: Food) => void;
}) {
  const [query, setQuery] = useState("");
  const results = searchFoods(query);
  const label = MEAL_TYPES.find((m) => m.key === mealKey)?.label ?? "";

  return (
    <Modal title={`Adicionar a ${label}`} onClose={onClose} center={false}>
      <input
        autoFocus
        type="text"
        placeholder="Pesquisar alimento (ex: arroz, frango...)"
        className={inputClass}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-1 max-h-[260px] overflow-y-auto rounded-[10px] border border-border">
        {query.trim() === "" ? null : results.length ? (
          results.map((f) => (
            <div
              key={f.id}
              onClick={() => onPickFood(f)}
              className="flex cursor-pointer justify-between border-b border-border px-3 py-2.5 text-[13.5px] last:border-b-0 active:bg-surface2"
            >
              <span>{f.name}</span>
              <span className="font-num text-xs text-textmuted">{f.kcal} kcal/100g</span>
            </div>
          ))
        ) : (
          <div className="p-3 text-xs text-textfaint">Sem resultados. Tenta outro termo.</div>
        )}
      </div>
    </Modal>
  );
}

export function QuantityModal({
  food,
  onClose,
  onConfirm,
}: {
  food: Food;
  onClose: () => void;
  onConfirm: (entry: FoodEntry) => void;
}) {
  const [grams, setGrams] = useState(100);
  const g = grams || 0;
  const k = (food.kcal * g) / 100;
  const p = (food.p * g) / 100;
  const c = (food.c * g) / 100;
  const f = (food.f * g) / 100;

  return (
    <Modal title={food.name} onClose={onClose}>
      <FieldLabel>Quantidade (gramas — para líquidos usa ml, é equivalente)</FieldLabel>
      <input
        type="number"
        min={1}
        inputMode="numeric"
        className={inputClass}
        value={grams}
        onChange={(e) => setGrams(parseFloat(e.target.value) || 0)}
      />
      <div className="mt-3.5 font-num text-[13px] text-textmuted">
        {Math.round(k)} kcal · P {round1(p)}g · H {round1(c)}g · G {round1(f)}g
      </div>
      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1`}
          onClick={() => {
            if (g <= 0) return;
            onConfirm({ id: uid(), name: food.name, grams: g, kcal: k, p, c, f });
          }}
        >
          Adicionar
        </button>
      </ModalActions>
    </Modal>
  );
}
