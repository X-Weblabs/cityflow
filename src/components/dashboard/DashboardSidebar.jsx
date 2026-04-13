import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  Truck, 
  Trash2, 
  BarChart3, 
  UserCircle, 
  Settings,
  LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', end: true },
  { icon: Ticket, label: 'Service Reports', path: '/dashboard/reports' },
  { icon: Truck, label: 'Fleet Maintenance', path: '/dashboard/fleet' },
  { icon: Trash2, label: 'Bin Monitoring', path: '/dashboard/bins' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/15 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <img src="/BCCLogo.png" alt="BCC Logo" className="w-10 h-10 object-contain" />
        <div>
          <h1 className="font-headline font-bold text-lg leading-none">CityFlow</h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1">Council Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-primary-container text-on-primary-container font-semibold" 
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              "group-hover:scale-110 transition-transform duration-200"
            )} />
            <span>{item.label}</span>
          </NavLink>
        ))}
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
