"use client";

export type Tab = "today" | "weight" | "bloodPressure" | "steps" | "sleep" | "calories" | "report" | "more";

const ITEMS: { tab: Tab; label: string; icon: React.ReactNode; mobileHidden?: boolean }[] = [
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
    tab: "bloodPressure",
    label: "Tensão",
    icon: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
  },
  {
    tab: "steps",
    label: "Passos",
    mobileHidden: true,
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
  {
    tab: "sleep",
    label: "Sono",
    mobileHidden: true,
    icon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  },
  {
    tab: "calories",
    label: "Calorias",
    mobileHidden: true,
    icon: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  },
  {
    tab: "report",
    label: "Relatório",
    icon: <path d="M4 19V9M10 19V5M16 19v-7M4 19h16" />,
  },
  {
    tab: "more",
    label: "Mais",
    icon: <path d="M12 5v.01M12 12v.01M12 19v.01" strokeLinecap="round" />,
  },
];

// Separadores que em mobile ficam dentro do "Mais"
const MOBILE_HIDDEN: Tab[] = ["steps", "sleep", "calories"];

export default function BottomNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/90 backdrop-blur-md px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 lg:bottom-auto lg:right-auto lg:top-0 lg:h-screen lg:w-56 lg:border-r lg:border-t-0 lg:bg-bg lg:px-3 lg:pb-6 lg:pt-8">
      <div className="hidden items-center gap-2 px-3 font-display text-xl font-semibold lg:mb-10 lg:flex">
        NutriTracker
      </div>
      <div className="mx-auto flex max-w-[640px] justify-between gap-1.5 lg:mx-0 lg:max-w-none lg:flex-col lg:justify-start lg:gap-5">
        {ITEMS.map((item) => {
          const isActive = active === item.tab;
          const moreHighlight = item.tab === "more" && MOBILE_HIDDEN.includes(active);
          return (
            <button
              key={item.tab}
              onClick={() => onChange(item.tab)}
              className={`${item.mobileHidden ? "hidden lg:flex" : "flex"} flex-1 flex-col items-center gap-1 rounded-[10px] px-1 py-1.5 lg:flex-none lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 ${
                isActive
                  ? "text-red lg:bg-red/10"
                  : moreHighlight
                  ? "text-red lg:text-textfaint lg:hover:bg-surface2 lg:hover:text-text"
                  : "text-textfaint lg:hover:bg-surface2 lg:hover:text-text"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none stroke-[1.8]">
                {item.icon}
              </svg>
              <span className="text-[10.5px] font-semibold lg:text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}