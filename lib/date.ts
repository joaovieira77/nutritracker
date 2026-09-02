export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function fmtDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(dateStr: string, n: number): string {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + n);
  return fmtDate(d);
}

export function todayStr(): string {
  return fmtDate(new Date());
}

export function dayLabel(dateStr: string): string {
  const today = todayStr();
  if (dateStr === today) return "Hoje";
  if (dateStr === addDays(today, -1)) return "Ontem";
  return parseDate(dateStr).toLocaleDateString("pt-PT", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

export function startOfWeek(dateStr: string): string {
  const d = parseDate(dateStr);
  const dow = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - dow);
  return fmtDate(d);
}

export function fmtDurationH(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h${m > 0 ? pad(m) : ""}`;
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
