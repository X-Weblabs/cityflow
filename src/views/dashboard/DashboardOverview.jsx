import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Truck, Trash2, Calendar, Activity } from 'lucide-react';
import { subscribeToLandfillEntries, subscribeToFleet, subscribeToTickets } from '../../services/db';
import { format } from 'date-fns';

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

  const stats = [
    { label: 'Active Incidents', value: pendingTickets, change: tickets.length, subLabel: 'Total Reports', color: 'tertiary' },
    { label: 'Units In Field', value: `${activeUnits}/${fleet.length}`, change: Math.round((activeUnits/fleet.length)*100) || 0, subLabel: '% Utilization', color: 'secondary' },
    { label: 'Collection Goal', value: `${Math.round((totalTonnageToday/5)*100)}%`, change: '5.0t', subLabel: 'Target', color: 'primary' },
    { label: 'Waste Today', value: `${totalTonnageToday.toFixed(1)}t`, change: `+${todayEntries.length}`, subLabel: 'Entries', color: 'primary' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{stat.label}</p>
              <div className={`p-2 rounded-lg bg-${stat.color}/5 text-${stat.color}`}>
                {i === 0 ? <AlertCircle className="w-3.5 h-3.5" /> : i === 1 ? <Truck className="w-3.5 h-3.5" /> : i === 2 ? <TrendingUp className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-headline font-black">{stat.value}</h3>
              <div className="flex flex-col">
                <span className={`text-[9px] font-black text-${stat.color} leading-none`}>
                  {stat.change}
                </span>
                <span className="text-[8px] font-bold text-on-surface-variant/30 uppercase tracking-tighter leading-none mt-0.5">
                  {stat.subLabel}
                </span>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 bg-${stat.color} opacity-10 group-hover:opacity-100 transition-all`} style={{ width: '100%' }} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface-container-lowest min-h-[320px] rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h4 className="font-headline font-black text-xs uppercase tracking-widest opacity-40">System Performance</h4>
              <p className="text-[10px] text-on-surface-variant/60 font-medium">Real-time waste flow monitoring</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Landfill Entries</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Fleet Activity</span>
               </div>
            </div>
          </div>
          <div className="flex-grow flex items-center justify-center text-on-surface-variant font-black text-xs tracking-[0.2em] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-repeat rounded-xl border border-outline-variant/5">
            <div className="text-center">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-5" />
              REALTIME TREND DATA STREAM
            </div>
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
