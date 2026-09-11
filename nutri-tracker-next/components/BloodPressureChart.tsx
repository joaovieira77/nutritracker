"use client";

interface BPPoint {
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
}

export default function BloodPressureChart({ points }: { points: BPPoint[] }) {
  const width = 600;
  const height = 200;
  const padX = 36;
  const padY = 20;

  if (points.length === 0) {
    return (
      <div className="flex h-[230px] items-center justify-center rounded-card border border-border bg-surface text-xs text-textfaint">
        Sem dados suficientes para o gráfico.
      </div>
    );
  }

  const allValues = points.flatMap((p) => [p.systolic, p.diastolic]);
  const min = Math.min(...allValues, 60);
  const max = Math.max(...allValues, 140);
  const range = max - min || 1;
  const yFor = (v: number) => height - padY - ((v - min) / range) * (height - 2 * padY);
  const xFor = (i: number) =>
    points.length === 1 ? width / 2 : padX + (i / (points.length - 1)) * (width - 2 * padX);

  const sysLine = points.map((p, i) => `${xFor(i)},${yFor(p.systolic)}`).join(" ");
  const diaLine = points.map((p, i) => `${xFor(i)},${yFor(p.diastolic)}`).join(" ");

  return (
    <div className="h-[230px] rounded-card border border-border bg-surface px-2.5 py-4">
      <div className="mb-1.5 flex items-center gap-4 px-2 text-[11px] text-textmuted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-red" /> Sistólica
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-amber" /> Diastólica
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[calc(100%-22px)] w-full" preserveAspectRatio="none">
        <polyline points={sysLine} fill="none" stroke="#e8384a" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={diaLine} fill="none" stroke="#d9a441" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={p.date + p.time}>
            <circle cx={xFor(i)} cy={yFor(p.systolic)} r={3} fill="#e8384a" />
            <circle cx={xFor(i)} cy={yFor(p.diastolic)} r={3} fill="#d9a441" />
          </g>
        ))}
        <text x={4} y={yFor(max) + 4} fill="#938c89" fontSize={10}>
          {max}
        </text>
        <text x={4} y={yFor(min) + 4} fill="#938c89" fontSize={10}>
          {min}
        </text>
      </svg>
    </div>
  );
}
