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
  label = "" 
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
            "w-full min-h-[48px] px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-left transition-all flex items-center justify-between gap-2",
            isOpen && "ring-2 ring-primary/20 bg-surface-container-lowest border-primary/30"
          )}
        >
          <div className="flex flex-wrap gap-1.5 overflow-hidden">
            {selected.length > 0 ? (
              selected.map((option) => (
                <span 
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold border border-primary/10 animate-in zoom-in-95 duration-200"
                >
                  {option.text}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-primary-dark transition-colors" 
                    onClick={(e) => removeOption(e, option.value)}
                  />
                </span>
              ))
            ) : (
              <span className="text-[13px] font-bold text-on-surface-variant/40">{placeholder}</span>
            )}
          </div>
          <ChevronDown className={cn("w-4 h-4 text-on-surface-variant transition-transform", isOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-[110] top-[calc(100%+8px)] left-0 w-full bg-surface-container-lowest border border-outline-variant/15 shadow-2xl rounded-2xl p-1.5 max-h-[300px] overflow-y-auto custom-scrollbar"
            >
              {options.map((option) => {
                const isSelected = selected.some(s => s.value === option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleOption(option)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-bold transition-colors group",
                      isSelected 
                        ? "bg-primary text-on-primary" 
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    )}
                  >
                    <span>{option.text}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
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
