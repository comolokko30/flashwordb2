import { Book, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  setCurrentUnitId: (id: string | null) => void;
}

export default function Sidebar({ activeTab, onTabChange, setCurrentUnitId }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: "units", label: "Units", icon: Book },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-display font-black text-indigo-900 tracking-tight">Sanctuary</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deep Focus Learning</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (item.id === "units") setCurrentUnitId(null);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                  ? "text-indigo-600 font-bold bg-indigo-50/50" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 w-1.5 h-8 bg-indigo-600 rounded-r-full"
                />
              )}
              <Icon size={20} className={isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-900"} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button 
          onClick={toggleSidebar}
          className="p-3 bg-white rounded-2xl shadow-lg border border-slate-100 text-slate-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-sidebar-bg border-r border-slate-200 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[55] lg:hidden shadow-2xl flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
