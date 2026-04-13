import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FlashcardData } from "@/types";
import { CustomButton as Button } from "@/components/ui/CustomButton";
import { CustomBadge as Badge } from "@/components/ui/CustomBadge";
import { Languages, Volume2, RotateCw } from "lucide-react";

interface FlashcardProps {
  data: FlashcardData;
}

export default function Flashcard({ data }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTurkish, setShowTurkish] = useState(false);

  // Reset states when data changes
  useEffect(() => {
    setIsFlipped(false);
    setShowTurkish(false);
  }, [data.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000 min-h-[450px] md:min-h-[550px] lg:min-h-[650px]">
      <motion.div
        className="relative preserve-3d cursor-pointer w-full h-[450px] md:h-[550px] lg:h-[650px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        onClick={handleFlip}
      >
        {/* Front Side: Just the Word */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-6 md:p-10 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center text-center overflow-hidden">
          <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-auto shrink-0">
            {data.partOfSpeech}
          </Badge>
          
          <div className="flex-1 flex items-center justify-center w-full py-4 overflow-hidden">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 tracking-tighter break-words hyphens-auto w-full leading-[1.1] px-2">
              {data.word.toLowerCase()}
            </h3>
          </div>

          <div className="mt-auto flex flex-col items-center gap-3 text-slate-300 shrink-0">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
              <RotateCw size={20} className="animate-spin-slow" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Tap to reveal</span>
          </div>
        </div>

        {/* Back Side: Meaning and Details */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-6 md:p-10 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Definition</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all"
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6 overflow-y-auto scrollbar-hide py-4">
            <p className="text-lg md:text-xl lg:text-2xl font-medium text-slate-600 leading-relaxed text-center">
              {data.englishMeaning}
            </p>
            
            <div className="h-px bg-slate-100 w-full shrink-0" />

            {/* Turkish Translation Section */}
            <div className="w-full shrink-0">
              <AnimatePresence mode="wait">
                {showTurkish ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center"
                  >
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Turkish Meaning</span>
                    <p className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900">{data.turkishMeaning}</p>
                  </motion.div>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTurkish(true);
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl h-12 md:h-14 font-bold transition-all"
                  >
                    <Languages size={18} className="mr-2" />
                    Show Translation
                  </Button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 shrink-0">
            {data.otherForms && data.otherForms.slice(0, 3).map((form, i) => (
              <div key={i} className="bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg font-bold text-[10px] border border-slate-100 uppercase tracking-tight">
                {form}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
