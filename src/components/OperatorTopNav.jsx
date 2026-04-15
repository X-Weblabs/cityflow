import React from 'react';
import { 
  Bell, 
  Menu, 
  User,
  Activity,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

const OperatorTopNav = ({ toggleMobileSidebar, selectedVehicle }) => {
  return (
    <nav className="h-16 bg-surface-container-lowest border-b border-outline-variant/10 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 lg:hidden">
        <button 
          onClick={toggleMobileSidebar}
          className="p-2 hover:bg-surface-container rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5 text-on-surface" />
        </button>
        <h1 className="font-headline font-black text-sm tracking-tight">Operator<span className="text-primary">Hub</span></h1>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full border border-outline-variant/5">
          <Calendar className="w-3.5 h-3.5 text-on-surface-variant/40" />
          <span className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant/60">
            {format(new Date(), 'EEEE, MMMM dd')}
          </span>
        </div>
        
        {selectedVehicle && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-black uppercase tracking-widest text-primary">
              Unit: {selectedVehicle}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-surface-container rounded-xl transition-all active:scale-95 group">
          <Bell className="w-5 h-5 text-on-surface-variant group-hover:text-on-surface transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-tertiary rounded-full border border-surface-container-lowest" />
        </button>
        
        <div className="h-8 w-[1px] bg-outline-variant/10 mx-1" />

        <button className="flex items-center gap-3 pl-1 pr-3 py-1 bg-surface-container-low border border-outline-variant/10 rounded-full hover:bg-surface-container transition-all active:scale-95 group">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-black text-on-secondary shadow-sm">
            JS
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface hidden sm:block transition-colors">
            John Smith
          </span>
        </button>
      </div>
    </nav>
  );
};

export default OperatorTopNav;
