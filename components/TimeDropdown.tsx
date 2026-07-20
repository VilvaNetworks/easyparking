"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEventHandler } from "react";

// Fixed 15-minute slots. A native <input type="time"> can't have typing
// reliably blocked (browsers don't honour readOnly on its internal spinner
// segments — confirmed on Chrome, see the Drop Off/Pickup fields this
// replaced), so this renders its own list instead of using that control at
// all. The trigger keeps whatever look the caller passes in via
// className/style; only the "no typing, pick from a list" behaviour is
// shared, since every place this is used (homepage hero, the booking
// wizard, the legacy booking form) has its own visual style.
const TIME_OPTIONS: string[] = Array.from({ length: 24 * 4 }, (_, i) => {
  const totalMinutes = i * 15;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
});

export default function TimeDropdown({
  id,
  value,
  onChange,
  className,
  style,
  placeholder = "--:--",
  onFocus,
  onBlur,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Scroll the currently-selected time into view rather than always
    // opening at the top of a 96-row list.
    const selected = listRef.current?.querySelector('[data-selected="true"]');
    selected?.scrollIntoView({ block: "center" });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={className}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", ...style }}
      >
        <span style={{ opacity: value ? 1 : 0.55 }}>{value || placeholder}</span>
        <svg className="w-4 h-4 shrink-0" style={{ marginLeft: 8 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
          <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg text-left"
        >
          {TIME_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              role="option"
              aria-selected={t === value}
              data-selected={t === value}
              onClick={() => {
                onChange(t);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                t === value ? "bg-[#fff1e6] text-[#e7701e] font-semibold" : "text-black"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
