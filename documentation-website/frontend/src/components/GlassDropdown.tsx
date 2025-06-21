// components/GlassDropdown.tsx
import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface GlassDropdownProps {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

const GlassDropdown = ({ options, selected, onSelect }: GlassDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  return (
    <div className="relative w-full sm:w-auto z-50" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="glass-card cursor-pointer bg-black/40 text-white border border-white/20 px-4 py-2 rounded-md text-sm flex items-center justify-between"
      >
        <span>{selectedLabel}</span>
        <span className="ml-2">▼</span>
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-md text-white text-sm shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className={`px-4 py-2 hover:bg-white/10 cursor-pointer ${
                selected === option.value ? "bg-white/10" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlassDropdown;
