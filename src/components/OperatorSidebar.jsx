import React from 'react';
import { 
  Warehouse, 
  Dog, 
  ClipboardCheck, 
  ListTodo, 
  Search,
  LogOut,
  ChevronRight,
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all group relative overflow-hidden ${
      active 
        ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
    }`}
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors relative z-10 ${
      active ? 'bg-on-primary/10' : 'bg-surface-container-low group-hover:bg-surface-container-high'
    }`}>
      <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
    </div>
    <span className={`text-[12px] font-black uppercase tracking-wider text-left flex-grow relative z-10 ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
      {label}
    </span>
    
    {badge && (
      <span className={`relative z-10 px-2 py-0.5 rounded-full text-[9px] font-black ${
        active ? 'bg-on-primary text-primary' : 'bg-primary text-on-primary'
      }`}>
        {badge}
      </span>
    )}
    {!active && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-all translate-x-[-4px] group-hover:translate-x-0 relative z-10" />}

    {active && (
      <motion.div
        layoutId="activeGlow"
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    )}
  </button>
);

const OperatorSidebar = ({ activeSection, setActiveSection, selectedVehicle }) => {
  const menuItems = [
    { id: 'landfill', label: 'Landfill activities', icon: Warehouse },
    { id: 'dog', label: 'Dog notice', icon: Dog },
    { id: 'inspection', label: 'Public Convenience', icon: ClipboardCheck },
    { id: 'tasks', label: 'Tasks Follow up', icon: ListTodo },
    { id: 'complaints', label: 'Investigations', icon: Search },
    { id: 'supervisor_complaints', label: 'Supervisor Complaints', icon: ClipboardCheck },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-surface-container-lowest border-r border-outline-variant/10 p-4 sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <Truck className="w-5 h-5 text-on-primary" />
        </div>
        <div>
          <h1 className="font-headline font-black text-base leading-none tracking-tight">Operator<span className="text-primary">Hub</span></h1>
          <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest mt-1">Field Management System</p>
        </div>
      </div>

      <div className="space-y-2 flex-grow">
        <p className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em] px-4 mb-4">Operations</p>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
          />
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-outline-variant/5">
        <div className="bg-surface-container rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary font-black text-xs">
              {selectedVehicle?.slice(-2) || '??'}
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider">{selectedVehicle || 'No Unit'}</p>
              <p className="text-[9px] font-bold text-on-surface-variant/40">Current Assignment</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              className="h-full bg-secondary"
            />
          </div>
        </div>

        <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-error hover:bg-error/5 transition-colors font-black text-[11px] uppercase tracking-widest">
          <LogOut className="w-5 h-5" />
          End Shift
        </button>
      </div>
    </aside>
  );
};

export default OperatorSidebar;
