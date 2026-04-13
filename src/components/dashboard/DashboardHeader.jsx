import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const DashboardHeader = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Overview';
    if (path.includes('/reports')) return 'Service Delivery Reports';
    if (path.includes('/fleet')) return 'Fleet Maintenance';
    if (path.includes('/bins')) return 'Waste Bin Monitoring';
    if (path.includes('/analytics')) return 'Recycling Analytics';
    if (path.includes('/profile')) return 'Official Profile';
    return 'Dashboard';
  };

  return (
    <header className="h-20 bg-surface-container-lowest border-b border-outline-variant/15 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-surface-container rounded-xl text-on-surface-variant transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-headline font-bold text-on-surface hidden md:block">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center bg-surface-container px-4 py-2.5 rounded-2xl border border-outline-variant/10 w-96 group focus-within:border-primary/30 transition-all duration-200">
          <Search className="w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search reports, vehicles, or bins..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full placeholder:text-on-surface-variant/60"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 hover:bg-surface-container rounded-2xl relative text-on-surface-variant transition-all hover:scale-105 active:scale-95">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border-2 border-surface-container-lowest"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-outline-variant/20 mx-2 hidden sm:block"></div>
          
          <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-surface-container rounded-2xl transition-all group">
            <div className="w-9 h-9 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-bold shadow-sm group-hover:shadow-md transition-shadow">
              JD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold leading-none">James Dube</p>
              <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 uppercase tracking-wider">Bulawayo Admin</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
