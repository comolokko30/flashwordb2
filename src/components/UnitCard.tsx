import { motion } from "motion/react";
import { Unit } from "@/types";
import { Book, Languages, MessageSquare, Briefcase, Utensils, Plane, Code, GraduationCap } from "lucide-react";

interface UnitCardProps {
  unit: Unit;
  cardCount: number;
  onClick: () => void;
  index: number;
  key?: string;
}

const UNIT_ICONS: Record<string, any> = {
  "unit-1": Book,
  "unit-2": Languages,
  "unit-3": GraduationCap,
  "unit-4": MessageSquare,
  "unit-5": Plane,
  "unit-6": Utensils,
  "unit-7": Briefcase,
  "unit-8": Code,
};

export default function UnitCard({ unit, cardCount, onClick, index }: UnitCardProps) {
  const Icon = UNIT_ICONS[unit.id] || Book;
  const unitNumber = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group h-full"
    >
      <div className="bg-white p-10 rounded-[3rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100 relative overflow-hidden h-full flex flex-col justify-between min-h-[320px]">
        {/* Faded Background Icon */}
        <div className="absolute -right-4 -top-4 text-slate-50/50 group-hover:text-slate-100/50 transition-colors duration-500">
          <Icon size={200} strokeWidth={1} />
        </div>

        <div className="relative z-10">
          <span className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-8 block">
            {unitNumber}
          </span>
          
          <h3 className="text-2xl font-display font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 leading-tight pr-12">
            {unit.name}
          </h3>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-auto pt-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Curriculum</span>
            <span className="text-sm font-bold text-slate-600">{cardCount} Words</span>
          </div>
          
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Icon size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
