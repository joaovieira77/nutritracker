"use client";

import { useState } from "react";
import Modal, { ModalActions, FieldLabel, inputClass, btnGhost, btnPrimary } from "../Modal";
import { Food } from "@/lib/types";
import { addCustomFood } from "@/lib/customFoods";

export default function CreateFoodModal({
  onClose,
  onCreated,
  initialName = "",
}: {
  onClose: () => void;
  onCreated: (food: Food) => void;
  initialName?: string;
}) {
  const [name, setName] = useState(initialName);
  const [kcal, setKcal] = useState<number | undefined>(undefined);
  const [p, setP] = useState<number | undefined>(undefined);
  const [c, setC] = useState<number | undefined>(undefined);
  const [f, setF] = useState<number | undefined>(undefined);

  const valid = name.trim().length > 0 && kcal !== undefined && kcal >= 0;

  return (
    <Modal title="Criar alimento" onClose={onClose}>
      <FieldLabel>Nome</FieldLabel>
      <input
        type="text"
        placeholder="ex: Arroz de cenoura"
        className={inputClass}
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <FieldLabel>Calorias (kcal por 100g/100ml)</FieldLabel>
      <input
        type="number"
        min={0}
        inputMode="decimal"
        className={inputClass}
        value={kcal ?? ""}
        onChange={(e) => setKcal(e.target.value ? parseFloat(e.target.value) : undefined)}
      />
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div>
          <FieldLabel>Proteína (g)</FieldLabel>
          <input
            type="number"
            min={0}
            inputMode="decimal"
            className={inputClass}
            value={p ?? ""}
            onChange={(e) => setP(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
        <div>
          <FieldLabel>Hidratos (g)</FieldLabel>
          <input
            type="number"
            min={0}
            inputMode="decimal"
            className={inputClass}
            value={c ?? ""}
            onChange={(e) => setC(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
        <div>
          <FieldLabel>Gordura (g)</FieldLabel>
          <input
            type="number"
            min={0}
            inputMode="decimal"
            className={inputClass}
            value={f ?? ""}
            onChange={(e) => setF(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
      </div>

      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1 disabled:opacity-40`}
          disabled={!valid}
          onClick={() => {
            if (!valid || kcal === undefined) return;
            const food = addCustomFood({
              name: name.trim(),
              kcal,
              p: p ?? 0,
              c: c ?? 0,
              f: f ?? 0,
            });
            onCreated(food);
          }}
        >
          Guardar
        </button>
      </ModalActions>
    </Modal>
  );
}
