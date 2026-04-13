import React from 'react';
import { AlertCircle } from 'lucide-react';

const DashboardOverview = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Reports', value: '124', change: '+12%', color: 'primary' },
          { label: 'Units In Field', value: '18/24', change: '85% active', color: 'secondary' },
          { label: 'Dispatch Avg', value: '14m', change: '-2m', color: 'secondary' },
          { label: 'Waste Collection', value: '1.2t', change: '+0.4t Today', color: 'secondary' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-headline font-black">{stat.value}</h3>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg bg-${stat.color}/10 text-${stat.color} border border-${stat.color}/10`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface-container-lowest h-64 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h4 className="font-headline font-black text-xs uppercase tracking-widest opacity-40">System Performance</h4>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-widest opacity-30 leading-none">Live Analytics</span>
            </div>
          </div>
          <div className="flex-grow flex items-center justify-center text-on-surface-variant font-black text-xs tracking-[0.2em] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-repeat">
            REALTIME TREND DATA STREAM
          </div>
        </div>

        <div className="bg-surface-container-lowest h-64 rounded-2xl border border-outline-variant/10 shadow-sm p-5 overflow-hidden flex flex-col">
          <h4 className="font-headline font-black text-xs uppercase tracking-widest mb-4 opacity-40">Incident Queue</h4>
          <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
            {[1, 2, 3, 4, 5].map(item => (
              <div key={item} className="flex gap-3 p-2.5 rounded-xl bg-surface-container/20 border border-outline-variant/5 hover:bg-surface-container/50 transition-all cursor-pointer group active:scale-[0.98]">
                <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                   <AlertCircle className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[12px] font-black group-hover:text-primary transition-colors truncate">Illegal Dumping: Suburbs</p>
                  <p className="text-[9px] text-on-surface-variant font-black opacity-30 uppercase tracking-tighter">Ward 4 • {item * 5}m ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
