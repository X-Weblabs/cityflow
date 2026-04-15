import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  Truck, 
  BarChart3, 
  UserCircle, 
  MoreHorizontal,
  Bell,
  Search,
  LogOut,
  Settings,
  Dog,
  ClipboardCheck,
  ListTodo,
  Warehouse
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', end: true },
  { icon: Warehouse, label: 'Landfill Activities', path: '/dashboard/landfill' },
  { icon: Dog, label: 'Dog Notice', path: '/dashboard/dog-notices' },
  { icon: ClipboardCheck, label: 'Supervisor Complaints', path: '/dashboard/supervisor-complaints' },
  // Secondary items
  { icon: Search, label: 'Investigations', path: '/dashboard/investigations' },
  { icon: ListTodo, label: 'Tasks Follow up', path: '/dashboard/tasks' },
  { icon: ClipboardCheck, label: 'Inspections', path: '/dashboard/inspections' },
  { icon: Truck, label: 'Fleet', path: '/dashboard/fleet' },
  { icon: Ticket, label: 'Tickets', path: '/dashboard/reports' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
];

const DashboardNavbar = () => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const primaryItems = navItems.slice(0, 3);
  const secondaryItems = navItems.slice(3);

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/15 px-6 items-center justify-between z-[100] transition-all">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <img src="/BCCLogo.png" alt="BCC Logo" className="w-8 h-8 object-contain" />
            <div>
              <h1 className="font-headline font-bold text-base leading-none">CityFlow</h1>
              <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Admin</p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-outline-variant/20 mx-1"></div>

          <div className="flex items-center gap-0.5">
            {primaryItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => cn(
                  "px-4 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center gap-2 group",
                  isActive 
                    ? "bg-primary text-on-primary shadow-sm" 
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </NavLink>
            ))}

            {/* Desktop More Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowMore(!showMore)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center gap-2 group",
                  showMore ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
                <span>More</span>
              </button>

              {showMore && (
                <>
                  <div className="fixed inset-0 z-[110]" onClick={() => setShowMore(false)} />
                  <div className="absolute top-full left-0 mt-2 bg-surface-container-lowest border border-outline-variant/15 shadow-2xl rounded-2xl p-2 min-w-[220px] z-[120] animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-0.5">
                      {secondaryItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setShowMore(false)}
                          className={({ isActive }) => cn(
                            "flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all font-bold text-[13px]",
                            isActive ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container"
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant relative transition-transform active:scale-95">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-tertiary rounded-full border border-surface-container-lowest" />
          </button>

          <button 
            onClick={() => navigate('/dashboard/profile')}
            className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer hover:shadow-md transition-shadow active:scale-95"
          >
            JD
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/15 flex items-center justify-around px-2 pb-1 z-[100] shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
        {primaryItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center text-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[64px]",
              isActive ? "text-primary bg-primary/5" : "text-on-surface-variant"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                <span className="text-[8.5px] font-black uppercase tracking-tighter leading-none">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        <button 
          onClick={() => setShowMore(!showMore)}
          className={cn(
            "flex flex-col items-center justify-center text-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[64px]",
            showMore ? "text-primary bg-primary/5" : "text-on-surface-variant"
          )}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[8.5px] font-black uppercase tracking-tighter leading-none">More</span>
        </button>

        {/* More Menu — backdrop */}
        <AnimatePresence>
          {showMore && (
            <motion.div 
              key="more-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[110]" 
              onClick={() => setShowMore(false)} 
            />
          )}
        </AnimatePresence>

        {/* More Menu — panel */}
        <AnimatePresence>
          {showMore && (
            <motion.div 
              key="more-panel"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-[75px] right-4 bg-surface-container-lowest border border-outline-variant/15 shadow-2xl rounded-2xl p-2 min-w-[200px] z-[120] overflow-hidden"
            >
              <div className="space-y-0.5">
                {secondaryItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowMore(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-black text-[12px] uppercase tracking-wider",
                      isActive ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                <div className="h-[1px] bg-outline-variant/5 my-2"></div>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container font-black text-[12px] uppercase tracking-wider">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-tertiary hover:bg-tertiary-container/10 font-black text-[12px] uppercase tracking-wider">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Top Header (Minimal) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-surface-container-lowest border-b border-outline-variant/15 px-5 flex items-center justify-between z-[100]">
        <div className="flex items-center gap-2">
          <img src="/BCCLogo.png" alt="BCC Logo" className="w-7 h-7 object-contain" />
          <h1 className="font-headline font-bold text-sm leading-none">CityFlow</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant">
            <Bell className="w-4.5 h-4.5" />
          </button>
          <button 
            onClick={() => navigate('/dashboard/profile')}
            className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-[10px] ring-2 ring-surface-container-lowest"
          >
            JD
          </button>
        </div>
      </header>
    </>
  );
};

export default DashboardNavbar;
