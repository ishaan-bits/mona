"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface ShowDate {
  label: string;
  dateCode: string;
  day: string;
  date: string;
  month: string;
  year: string;
}

interface DateSelectorProps {
  dates: ShowDate[];
  selected: string;
  onSelect: (dateCode: string) => void;
}

export default function DateSelector({
  dates,
  selected,
  onSelect,
}: DateSelectorProps) {
  if (dates.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Calendar size={16} className="text-gold shrink-0" />
      <div className="flex gap-2">
        {dates.map((d) => {
          const isSelected = d.dateCode === selected;
          const isToday = d.label.startsWith("Today");

          return (
            <motion.button
              key={d.dateCode}
              onClick={() => onSelect(d.dateCode)}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center min-w-[72px] px-3 py-2 rounded-xl border transition-all shrink-0 ${
                isSelected
                  ? "bg-gold border-gold text-charcoal"
                  : "bg-charcoal-lighter/50 border-gold/10 text-cream/70 hover:border-gold/30"
              }`}
            >
              {isToday && !isSelected && (
                <span className="absolute -top-1.5 text-[9px] text-gold bg-charcoal px-1.5 rounded-full border border-gold/20">
                  Today
                </span>
              )}
              <span
                className={`text-[10px] uppercase tracking-wider ${
                  isSelected ? "text-charcoal/60" : "text-cream/40"
                }`}
              >
                {d.day.substring(0, 3)}
              </span>
              <span
                className={`text-lg font-bold leading-tight ${
                  isSelected ? "text-charcoal" : "text-cream"
                }`}
              >
                {d.date}
              </span>
              <span
                className={`text-[10px] ${
                  isSelected ? "text-charcoal/60" : "text-cream/40"
                }`}
              >
                {d.month.substring(0, 3)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
