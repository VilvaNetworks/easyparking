"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEventHandler } from "react";

// Same rationale as TimeDropdown: a native <select>'s open list is drawn by
// the OS/browser and can't be restyled consistently, so this draws its own
// list instead. Generalized to arbitrary value/label options (terminals,
// service types, countries, etc.) rather than TimeDropdown's fixed time
// slots. The trigger keeps whatever look the caller passes in via
// className/style, matching each place this replaces a <select>.
export interface SelectOption {
  value: string;
  label: string;
}

export default function SelectDropdown({
  id,
  value,
  onChange,
  options,
  className,
  style,
  placeholder = "Select…",
  onFocus,
  onBlur,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
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

    const selected = listRef.current?.querySelector('[data-selected="true"]');
    selected?.scrollIntoView({ block: "center" });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label;

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
        <span
          style={{
            opacity: selectedLabel ? 1 : 0.55,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedLabel || placeholder}
        </span>
        <svg
          className="w-4 h-4 shrink-0"
          style={{ marginLeft: 8, transition: "transform 150ms", transform: open ? "rotate(180deg)" : undefined }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg text-left"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              data-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                opt.value === value ? "bg-[#fff1e6] text-[#e7701e] font-semibold" : "text-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
