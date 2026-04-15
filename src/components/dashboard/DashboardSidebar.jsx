import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  Truck, 
  Trash2, 
  BarChart3, 
  UserCircle, 
  Settings,
  LogOut,
  ClipboardList,
  ShieldAlert,
  FileSearch,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', end: true },
  { icon: ClipboardList, label: 'Tasks Follow-up', path: '/dashboard/tasks' },
  { icon: Trash2, label: 'Bin Monitoring', path: '/dashboard/bins' },
  { icon: ShieldAlert, label: 'Dog Notices', path: '/dashboard/dogs' },
  { icon: FileSearch, label: 'Inspections', path: '/dashboard/inspections' },
  { icon: MessageSquare, label: 'Investigations', path: '/dashboard/investigations' },
  { icon: UserCircle, label: 'Official Profile', path: '/dashboard/profile' },
];

const secondaryNavItems = [
  { icon: Truck, label: 'Fleet Maintenance', path: '/dashboard/fleet' },
  { icon: Ticket, label: 'Service Reports', path: '/dashboard/reports' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
];

const DashboardSidebar = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/15 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <img src="/BCCLogo.png" alt="BCC Logo" className="w-10 h-10 object-contain" />
        <div>
          <h1 className="font-headline font-bold text-lg leading-none">CityFlow</h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1">Council Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-primary-container text-on-primary-container font-semibold shadow-sm" 
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              "group-hover:scale-110 transition-transform duration-200"
            )} />
            <span className="text-[13px]">{item.label}</span>
          </NavLink>
        ))}

        <div className="pt-2">
            <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={cn(
                    "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                    isMoreOpen ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                )}
            >
                <div className="flex items-center gap-3">
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="text-[13px]">More Tools</span>
                </div>
                {isMoreOpen ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
            </button>
            
            <AnimatePresence>
                {isMoreOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-surface-container/30 rounded-xl mt-1 ml-2 border-l border-outline-variant/10"
                    >
                        {secondaryNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group mx-1 my-0.5",
                                    isActive 
                                        ? "bg-secondary-container text-on-secondary-container font-semibold" 
                                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="text-[12px]">{item.label}</span>
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </nav>

      <div className="p-4 border-t border-outline-variant/15 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium transition-all group">
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-tertiary hover:bg-tertiary-container/10 font-medium transition-all group">
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>

      <div className="p-4">
        <div className="bg-surface-container rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">James Dube</p>
            <p className="text-xs text-on-surface-variant truncate">City Official</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
