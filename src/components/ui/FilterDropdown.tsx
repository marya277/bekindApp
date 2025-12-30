import { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onFilterChange: (value: string) => void;
}

export const FilterDropdown = ({
  label,
  options,
  selectedValue,
  onFilterChange,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span>{label}</span>
        {selectedValue && (
          <span className="px-2 py-0.5 text-xs bg-brand-primary text-white rounded-full">
            {selectedOption?.label}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-60 overflow-y-auto">
          <button
            onClick={() => {
              onFilterChange('');
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Todos
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onFilterChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                selectedValue === option.value
                  ? 'bg-brand-primary/10 text-brand-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
