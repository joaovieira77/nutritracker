"use client";

import { useState } from "react";
import Modal, { ModalActions, FieldLabel, inputClass, btnGhost, btnPrimary } from "../Modal";
import { ExerciseEntry, SleepEntry, BloodPressureEntry } from "@/lib/types";
import { fmtDurationH, uid } from "@/lib/date";

export function WaterModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (ml: number) => void;
}) {
  const [ml, setMl] = useState(250);
  return (
    <Modal title="Registar água" onClose={onClose}>
      <FieldLabel>Quantidade (ml)</FieldLabel>
      <input
        type="number"
        min={1}
        inputMode="numeric"
        className={inputClass}
        value={ml}
        onChange={(e) => setMl(parseFloat(e.target.value) || 0)}
      />
      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1`}
          onClick={() => {
            if (ml > 0) onConfirm(ml);
          }}
        >
          Adicionar
        </button>
      </ModalActions>
    </Modal>
  );
}

export function ExerciseModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (entry: ExerciseEntry) => void;
}) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(30);
  const [caloriesBurned, setCaloriesBurned] = useState<number | undefined>(undefined);
  return (
    <Modal title="Registar exercício" onClose={onClose}>
      <FieldLabel>Tipo</FieldLabel>
      <input
        type="text"
        placeholder="Corrida, Ginásio, Caminhada..."
        className={inputClass}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <FieldLabel>Duração (minutos)</FieldLabel>
      <input
        type="number"
        min={1}
        inputMode="numeric"
        className={inputClass}
        value={duration}
        onChange={(e) => setDuration(parseFloat(e.target.value) || 0)}
      />
      <FieldLabel>Calorias gastas (opcional)</FieldLabel>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        className={inputClass}
        value={caloriesBurned ?? ""}
        onChange={(e) => setCaloriesBurned(e.target.value ? parseFloat(e.target.value) : undefined)}
      />
      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1`}
          onClick={() => {
            if (!type.trim() || duration <= 0) return;
            onConfirm({ id: uid(), type: type.trim(), duration, caloriesBurned });
          }}
        >
          Guardar
        </button>
      </ModalActions>
    </Modal>
  );
}

export function SleepModal({
  initial,
  onClose,
  onConfirm,
}: {
  initial: SleepEntry | null;
  onClose: () => void;
  onConfirm: (entry: SleepEntry) => void;
}) {
  const [bed, setBed] = useState(initial?.bed ?? "23:00");
  const [wake, setWake] = useState(initial?.wake ?? "07:00");

  function calcDur(): number {
    const [bh, bm] = bed.split(":").map(Number);
    const [wh, wm] = wake.split(":").map(Number);
    let mins = wh * 60 + wm - (bh * 60 + bm);
    if (mins <= 0) mins += 24 * 60;
    return mins;
  }
  const durationMin = calcDur();

  return (
    <Modal title="Registar sono" onClose={onClose}>
      <FieldLabel>Hora de deitar</FieldLabel>
      <input type="time" className={inputClass} value={bed} onChange={(e) => setBed(e.target.value)} />
      <FieldLabel>Hora de acordar</FieldLabel>
      <input type="time" className={inputClass} value={wake} onChange={(e) => setWake(e.target.value)} />
      <div className="mt-3.5 font-num text-[13px] text-textmuted">
        Duração: {fmtDurationH(durationMin)}
      </div>
      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1`}
          onClick={() => onConfirm({ bed, wake, durationMin })}
        >
          Guardar
        </button>
      </ModalActions>
    </Modal>
  );
}

export function WeightModal({
  initial,
  onClose,
  onConfirm,
}: {
  initial: number | null;
  onClose: () => void;
  onConfirm: (weight: number) => void;
}) {
  const [value, setValue] = useState(initial ?? undefined);
  return (
    <Modal title="Registar peso" onClose={onClose}>
      <FieldLabel>Peso (kg)</FieldLabel>
      <input
        type="number"
        step={0.1}
        min={1}
        inputMode="decimal"
        placeholder="ex: 78.4"
        className={inputClass}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
      />
      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1`}
          onClick={() => {
            if (value && value > 0) onConfirm(value);
          }}
        >
          Guardar
        </button>
      </ModalActions>
    </Modal>
  );
}

export function BloodPressureModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (entry: BloodPressureEntry) => void;
}) {
  const [systolic, setSystolic] = useState<number | undefined>(undefined);
  const [diastolic, setDiastolic] = useState<number | undefined>(undefined);
  const [pulse, setPulse] = useState<number | undefined>(undefined);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  const valid = systolic !== undefined && systolic > 0 && diastolic !== undefined && diastolic > 0;

  return (
    <Modal title="Registar tensão arterial" onClose={onClose}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <FieldLabel>Sistólica (mmHg)</FieldLabel>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="ex: 120"
            className={inputClass}
            value={systolic ?? ""}
            onChange={(e) => setSystolic(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
        <div>
          <FieldLabel>Diastólica (mmHg)</FieldLabel>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="ex: 80"
            className={inputClass}
            value={diastolic ?? ""}
            onChange={(e) => setDiastolic(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
      </div>
      <FieldLabel>Pulsação (bpm) — opcional</FieldLabel>
      <input
        type="number"
        min={1}
        inputMode="numeric"
        placeholder="ex: 72"
        className={inputClass}
        value={pulse ?? ""}
        onChange={(e) => setPulse(e.target.value ? parseFloat(e.target.value) : undefined)}
      />
      <FieldLabel>Hora</FieldLabel>
      <input type="time" className={inputClass} value={time} onChange={(e) => setTime(e.target.value)} />
      <ModalActions>
        <button className={`${btnGhost} flex-1`} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`${btnPrimary} flex-1 disabled:opacity-40`}
          disabled={!valid}
          onClick={() => {
            if (!valid || systolic === undefined || diastolic === undefined) return;
            onConfirm({ id: uid(), time, systolic, diastolic, pulse: pulse ?? null });
          }}
        >
          Guardar
        </button>
      </ModalActions>
    </Modal>
  );
}