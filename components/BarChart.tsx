"use client";

export interface BarSeries {
  name: string;
  color: string;
  values: (number | null)[];
}

function niceCeil(n: number): number {
  if (n <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  const f = n / pow;
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const nice = steps.find((s) => f <= s) ?? 10;
  return nice * pow;
}

export default function BarChart({
  labels,
  series,
  format = (n) => String(Math.round(n)),
}: {
  labels: string[];
  series: BarSeries[];
  format?: (n: number) => string;
}) {
  const W = 420;
  const H = 210;
  const padL = 44;
  const padR = 8;
  const padT = 12;
  const padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const all = series.flatMap((s) => s.values).filter((v): v is number => v !== null);

  if (all.length === 0) {
    return (
      <div className="flex h-[210px] items-center justify-center rounded-card border border-border bg-surface text-xs text-textfaint">
        Sem dados neste período.
      </div>
    );
  }

  const top = niceCeil(Math.max(...all));
  const n = labels.length;
  const groupW = innerW / n;
  const barW = (groupW * 0.72) / series.length;
  const y = (v: number) => padT + innerH - (v / top) * innerH;
  const ticks = [0, top / 2, top];

  return (
    <div className="rounded-card border border-border bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#2c2528" strokeWidth={1} />
            <text x={padL - 6} y={y(t) + 3.5} textAnchor="end" fontSize={10} fill="#938c89">
              {format(t)}
            </text>
          </g>
        ))}
        {labels.map((label, i) => (
          <g key={i}>
            {series.map((s, si) => {
              const v = s.values[i];
              if (v === null || v === undefined) return null;
              const x = padL + i * groupW + (groupW - barW * series.length) / 2 + si * barW;
              return (
                <rect
                  key={s.name}
                  x={x}
                  y={y(v)}
                  width={Math.max(1, barW - 1)}
                  height={Math.max(1, padT + innerH - y(v))}
                  rx={2}
                  fill={s.color}
                >
                  <title>{`${s.name}: ${format(v)}`}</title>
                </rect>
              );
            })}
            <text x={padL + i * groupW + groupW / 2} y={H - 8} textAnchor="middle" fontSize={10} fill="#938c89">
              {label}
            </text>
          </g>
        ))}
      </svg>
      {series.length > 1 && (
        <div className="mt-2 flex gap-4 text-[11px] text-textmuted">
          {series.map((s) => (
            <span key={s.name} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  valueClass = "",
}: {
  label: string;
  value: string;
  hint?: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3.5">
      <div className={`font-num text-xl font-semibold ${valueClass}`}>{value}</div>
      <div className="mt-0.5 text-[11.5px] text-textmuted">{label}</div>
      {hint && <div className="mt-1 text-[11px] text-textfaint">{hint}</div>}
    </div>
  );
}