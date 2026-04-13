import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FlashcardData, Unit } from "@/types";
import Flashcard from "@/components/Flashcard";
import UnitCard from "@/components/UnitCard";
import Sidebar from "@/components/Sidebar";
import { Search, ChevronLeft, ArrowLeft, ArrowRight, Settings, Zap, Library } from "lucide-react";
import { CustomInput as Input } from "@/components/ui/CustomInput";
import { CustomButton as Button } from "@/components/ui/CustomButton";
import { INITIAL_UNITS, INITIAL_WORDS } from "./data";

export default function App() {
  const [units] = useState<Unit[]>(INITIAL_UNITS);
  const [cards] = useState<FlashcardData[]>(INITIAL_WORDS);
  const [currentUnitId, setCurrentUnitId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("units");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCardIndex, currentUnitId]);

  const filteredCards = cards.filter(c => {
    const matchesSearch = c.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = currentUnitId ? c.unitId === currentUnitId : true;
    return matchesSearch && matchesUnit;
  });

  const currentUnit = units.find(u => u.id === currentUnitId);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} setCurrentUnitId={setCurrentUnitId} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 bg-white/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            {currentUnitId && (
              <button 
                onClick={() => setCurrentUnitId(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm ml-12 lg:ml-0"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Back to Units</span>
                <span className="sm:hidden">Back</span>
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 px-6 lg:px-12 py-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {!currentUnitId ? (
              /* Unit Selection View */
              <motion.div
                key="unit-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="space-y-2">
                  <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest">Current Curriculum</h2>
                  <h3 className="text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">Core Language Mastery</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                  {units.map((unit, index) => (
                    <UnitCard 
                      key={unit.id}
                      unit={unit} 
                      index={index}
                      cardCount={cards.filter(c => c.unitId === unit.id).length}
                      onClick={() => {
                        setCurrentUnitId(unit.id);
                        setActiveCardIndex(0);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Unit Detail View (Word Detail) */
              <motion.div
                key="unit-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 lg:space-y-12 pb-24"
              >
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                  <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-lg text-[10px] font-black uppercase tracking-widest">
                      Level B2 Proficiency
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-900 tracking-tighter break-words hyphens-auto">
                      {filteredCards[activeCardIndex]?.word}
                    </h2>
                    <p className="text-slate-500 text-base lg:text-lg font-medium leading-relaxed">
                      Focus on the essence of the word. Take your time to internalize the nuance.
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-4xl lg:text-6xl font-display font-black text-indigo-100">
                      <span className="text-indigo-600">{(activeCardIndex + 1).toString().padStart(2, '0')}</span>
                      <span className="text-indigo-200"> / {filteredCards.length.toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>

                {filteredCards.length > 0 ? (
                  <div className="space-y-8 lg:space-y-12">
                    <Flashcard data={filteredCards[activeCardIndex]} />

                    {/* Navigation */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-6">
                      <Button
                        variant="ghost"
                        disabled={activeCardIndex === 0}
                        onClick={() => setActiveCardIndex(prev => prev - 1)}
                        className="w-full sm:w-auto h-14 px-8 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-bold flex items-center justify-center gap-3 transition-all"
                      >
                        <ArrowLeft size={20} />
                        Previous Word
                      </Button>

                      <div className="flex gap-2 order-first sm:order-none">
                        {filteredCards.length <= 15 ? (
                          filteredCards.map((_, i) => (
                            <div 
                              key={i}
                              className={`h-1.5 rounded-full transition-all duration-500 ${
                                i === activeCardIndex ? "w-8 bg-indigo-600" : "w-1.5 bg-slate-100"
                              }`}
                            />
                          ))
                        ) : (
                          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
                            {activeCardIndex + 1} of {filteredCards.length}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        disabled={activeCardIndex === filteredCards.length - 1}
                        onClick={() => setActiveCardIndex(prev => prev + 1)}
                        className="w-full sm:w-auto h-14 px-8 rounded-2xl text-slate-900 hover:bg-slate-50 font-bold flex items-center justify-center gap-3 transition-all"
                      >
                        Next Word
                        <ArrowRight size={20} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-40 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">No words in this unit</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
