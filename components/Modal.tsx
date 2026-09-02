"use client";

export default function Modal({
  title,
  onClose,
  children,
  center = true,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-[2px] ${
        center ? "items-center" : "items-end"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-[640px] max-h-[85vh] overflow-y-auto border border-border bg-surface p-[18px] pb-[calc(20px+env(safe-area-inset-bottom))] ${
          center ? "rounded-[18px]" : "rounded-t-[18px]"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-3.5 text-xl text-textmuted"
          aria-label="Fechar"
        >
          ×
        </button>
        <h3 className="mb-3.5 font-display text-[17px] font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function ModalActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 flex gap-2.5">{children}</div>;
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 mt-3 block text-xs text-textmuted">{children}</label>;
}

export const inputClass =
  "w-full rounded-[10px] border border-border bg-surface2 px-3 py-2.5 text-[15px] text-text outline-none focus:border-red";

export const btnClass = "rounded-[10px] px-3.5 py-2.5 text-[13px] font-semibold";
export const btnGhost = `${btnClass} border border-border bg-transparent text-text`;
export const btnPrimary = `${btnClass} border border-red bg-red text-[#1a0506]`;
