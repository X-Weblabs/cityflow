import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const MultiSelect = ({ 
  options, 
  selected, 
  onChange, 
  placeholder = "Select options...",
  label = "",
  direction = "down" // "down" or "up"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const isSelected = selected.some(s => s.value === option.value);
    if (isSelected) {
      onChange(selected.filter(s => s.value !== option.value));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeOption = (e, optionValue) => {
    e.stopPropagation();
    onChange(selected.filter(s => s.value !== optionValue));
  };

  const menuPosition = direction === "up" 
    ? "bottom-[calc(100%+8px)] origin-bottom" 
    : "top-[calc(100%+8px)] origin-top";

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full min-h-[44px] px-3 py-2 bg-surface-container-low border border-outline-variant/10 rounded-lg text-left transition-all flex items-center justify-between gap-2",
            isOpen && "ring-2 ring-primary/20 bg-surface-container-lowest border-primary/30"
          )}
        >
          <div className="flex flex-wrap gap-1 overflow-hidden">
            {selected.length > 0 ? (
              selected.map((option) => (
                <span 
                  key={option.value}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black border border-primary/10"
                >
                  {option.text}
                  <X 
                    className="w-2.5 h-2.5 cursor-pointer hover:text-primary-dark transition-colors" 
                    onClick={(e) => removeOption(e, option.value)}
                  />
                </span>
              ))
            ) : (
              <span className="text-[12px] font-bold text-on-surface-variant/40">{placeholder}</span>
            )}
          </div>
          <ChevronDown className={cn("w-3.5 h-3.5 text-on-surface-variant transition-transform", isOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: direction === "up" ? -10 : 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: direction === "up" ? -10 : 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute z-[200] left-0 w-full bg-surface-container-lowest border border-outline-variant/15 shadow-2xl rounded-xl p-1 max-h-[250px] overflow-y-auto custom-scrollbar",
                menuPosition
              )}
            >
              {options.map((option) => {
                const isSelected = selected.some(s => s.value === option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleOption(option)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-bold transition-colors group",
                      isSelected 
                        ? "bg-primary text-on-primary" 
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    )}
                  >
                    <span>{option.text}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiSelect;
