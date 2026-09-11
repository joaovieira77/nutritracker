"use client";

import { WeightPoint } from "@/lib/types";
import { parseDate } from "@/lib/date";

export default function WeightChart({ points }: { points: WeightPoint[] }) {
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

  const weights = points.map((p) => p.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;
  const yFor = (w: number) => height - padY - ((w - min) / range) * (height - 2 * padY);
  const xFor = (i: number) =>
    points.length === 1 ? width / 2 : padX + (i / (points.length - 1)) * (width - 2 * padX);

  const linePoints = points.map((p, i) => `${xFor(i)},${yFor(p.weight)}`).join(" ");
  const areaPoints = `${xFor(0)},${height - padY} ${linePoints} ${xFor(points.length - 1)},${height - padY}`;

  return (
    <div className="h-[230px] rounded-card border border-border bg-surface px-2.5 py-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
        <polyline points={areaPoints} fill="rgba(232,56,74,.12)" stroke="none" />
        <polyline points={linePoints} fill="none" stroke="#e8384a" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={p.date} cx={xFor(i)} cy={yFor(p.weight)} r={3} fill="#e8384a" />
        ))}
        <text x={padX} y={height - 4} fill="#938c89" fontSize={10}>
          {parseDate(points[0].date).toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit" })}
        </text>
        <text x={width - padX} y={height - 4} fill="#938c89" fontSize={10} textAnchor="end">
          {parseDate(points[points.length - 1].date).toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit" })}
        </text>
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
