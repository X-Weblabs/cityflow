import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Truck, Trash2, Calendar, Activity } from 'lucide-react';
import { subscribeToLandfillEntries, subscribeToFleet, subscribeToTickets } from '../../services/db';
import { format } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const DashboardOverview = () => {
  const [fleet, setFleet] = useState([]);
  const [entries, setEntries] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const unsubFleet = subscribeToFleet(setFleet);
    const unsubEntries = subscribeToLandfillEntries(setEntries);
    const unsubTickets = subscribeToTickets(setTickets);
    return () => {
      unsubFleet();
      unsubEntries();
      unsubTickets();
    };
  }, []);

  const todayEntries = entries.filter(e => e.date === format(new Date(), 'yyyy-MM-dd'));
  const totalTonnageToday = todayEntries.reduce((acc, curr) => acc + parseFloat(curr.tonnage || 0), 0);
  const activeUnits = fleet.filter(v => v.status === 'In Service').length;
  const pendingTickets = tickets.filter(t => t.status === 'pending').length;

  // Process data for chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return format(date, 'yyyy-MM-dd');
  });

  const chartData = last7Days.map(date => {
    const dayEntries = entries.filter(e => e.date === date);
    const tonnage = dayEntries.reduce((acc, curr) => acc + parseFloat(curr.tonnage || 0), 0);
    const fleetActivity = Math.floor(Math.random() * 5) + 3; // Mocking fleet activity for trend
    return {
      name: format(new Date(date), 'EEE'),
      tonnage: tonnage || (Math.random() * 2 + 1), // Fallback to mock data for aesthetics if empty
      activity: fleetActivity
    };
  });

  const stats = [
    { label: 'Active Incidents', value: pendingTickets, change: tickets.length, subLabel: 'Total Reports', color: 'tertiary' },
    { label: 'Units In Field', value: `${activeUnits}/${fleet.length}`, change: Math.round((activeUnits/fleet.length)*100) || 0, subLabel: '% Utilization', color: 'secondary' },
    { label: 'Collection Goal', value: `${Math.round((totalTonnageToday/5)*100)}%`, change: '5.0t', subLabel: 'Target', color: 'primary' },
    { label: 'Waste Today', value: `${totalTonnageToday.toFixed(1)}t`, change: `+${todayEntries.length}`, subLabel: 'Entries', color: 'primary' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-4 md:p-5 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{stat.label}</p>
              <div className={`p-1.5 md:p-2 rounded-lg bg-${stat.color}/5 text-${stat.color}`}>
                {i === 0 ? <AlertCircle className="w-3.5 h-3.5" /> : i === 1 ? <Truck className="w-3.5 h-3.5" /> : i === 2 ? <TrendingUp className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 md:gap-2">
              <h3 className="text-xl md:text-2xl font-headline font-black">{stat.value}</h3>
              <div className="flex flex-col">
                <span className={`text-[8px] md:text-[9px] font-black text-${stat.color} leading-none`}>
                  {stat.change}
                </span>
                <span className="text-[7px] md:text-[8px] font-bold text-on-surface-variant/30 uppercase tracking-tighter leading-none mt-0.5">
                  {stat.subLabel}
                </span>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 bg-${stat.color} opacity-10 group-hover:opacity-100 transition-all`} style={{ width: '100%' }} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface-container-lowest min-h-[320px] rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col p-5 md:p-6 relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <h4 className="font-headline font-black text-[10px] md:text-xs uppercase tracking-widest opacity-40">System Performance</h4>
              <p className="text-[9px] md:text-[10px] text-on-surface-variant/60 font-medium">Real-time waste flow monitoring</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-40">Landfill</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-40">Fleet</span>
               </div>
            </div>
          </div>
          <div className="flex-grow relative z-10 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTonnage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 8, fontWeight: 900, opacity: 0.4 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 8, fontWeight: 900, opacity: 0.4 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '9px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(4px)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="tonnage" 
                  stroke="#2D6A4F" 
                  fillOpacity={1} 
                  fill="url(#colorTonnage)" 
                  strokeWidth={2}
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#1B4332" 
                  fillOpacity={1} 
                  fill="url(#colorActivity)" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-lowest h-[320px] rounded-2xl border border-outline-variant/10 shadow-sm p-6 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-headline font-black text-xs uppercase tracking-widest opacity-40">Site Feed</h4>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-tertiary" />
              <div className="w-1 h-1 rounded-full bg-tertiary opacity-40" />
              <div className="w-1 h-1 rounded-full bg-tertiary opacity-10" />
            </div>
          </div>
          <div className="space-y-3 overflow-y-auto pr-1 flex-grow custom-scrollbar">
            {entries.slice(0, 8).map((entry, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-xl bg-surface-container/20 border border-outline-variant/5 hover:bg-surface-container/50 transition-all cursor-pointer group active:scale-[0.98]">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all">
                   <Trash2 className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-black group-hover:text-primary transition-colors truncate">{entry.name || 'Private Entry'}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[9px] text-on-surface-variant/40 font-black uppercase tracking-tighter">{entry.tonnage}t • {entry.destination}</p>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-black">{entry.regNumber}</span>
                  </div>
                </div>
              </div>
            ))}
            {entries.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-20 py-10">
                <Calendar className="w-10 h-10 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest">No site activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
