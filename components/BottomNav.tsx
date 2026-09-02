"use client";

export type Tab = "today" | "weight" | "report";

const ITEMS: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  {
    tab: "today",
    label: "Hoje",
    icon: (
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    ),
  },
  {
    tab: "weight",
    label: "Peso",
    icon: <path d="M4 20h16M6 20V10l6-6 6 6v10" />,
  },
  {
    tab: "report",
    label: "Relatório",
    icon: <path d="M4 19V9M10 19V5M16 19v-7M4 19h16" />,
  },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/90 backdrop-blur-md px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2">
      <div className="mx-auto flex max-w-[640px] justify-between gap-1.5">
        {ITEMS.map((item) => (
          <button
            key={item.tab}
            onClick={() => onChange(item.tab)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-[10px] px-1 py-1.5 ${
              active === item.tab ? "text-red" : "text-textfaint"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none stroke-[1.8]">
              {item.icon}
            </svg>
            <span className="text-[10.5px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
