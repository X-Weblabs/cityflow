import React from 'react';
import { Trash2, AlertTriangle, MapPin, RefreshCw } from 'lucide-react';

const binData = [
  { id: 'BIN-402', location: 'Centenary Park', fill: 34, status: 'Normal', lastEmptied: '4h ago' },
  { id: 'BIN-415', location: 'City Hall North', fill: 89, status: 'Near Full', lastEmptied: '12h ago' },
  { id: 'BIN-422', location: 'Taxi Rank', fill: 95, status: 'Urgent', lastEmptied: '1d ago' },
  { id: 'BIN-430', location: 'Tower Block Entry', fill: 12, status: 'Normal', lastEmptied: '2h ago' },
  { id: 'BIN-438', location: 'Jason Moyo Ave', fill: 56, status: 'Normal', lastEmptied: '8h ago' },
  { id: 'BIN-445', location: 'Main Post Office', fill: 72, status: 'Review', lastEmptied: '10h ago' },
];

const BinMonitoring = () => {
  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
          <div className="flex-1">
            <h3 className="text-xl font-headline font-black mb-1">Network Health</h3>
            <p className="text-xs text-on-surface-variant font-bold opacity-40 uppercase tracking-widest">248 active monitoring sites</p>
            <div className="flex gap-3 mt-5">
              <div className="px-4 py-1.5 bg-secondary/5 rounded-xl border border-secondary/10 font-black text-secondary text-[10px] uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Network Online
              </div>
              <div className="px-4 py-1.5 bg-surface-container rounded-xl border border-outline-variant/10 font-black text-on-surface-variant/40 text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-surface-container-high transition-all cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" />
                Sync Grid
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {[
              { label: 'Avg Fill', value: '42%', icon: 'bar_chart_4_bars' },
              { label: 'Critical', value: '12', icon: 'error' },
              { label: 'Battery', value: '88%', icon: 'battery_full' }
            ].map((stat, i) => (
              <div key={i} className="px-4 py-3 rounded-xl bg-surface-container/20 border border-outline-variant/5 flex flex-col items-center text-center group hover:bg-surface-container transition-colors min-w-[90px]">
                <span className="material-symbols-outlined text-on-surface-variant/30 mb-0.5 group-hover:text-primary transition-colors text-lg">{stat.icon}</span>
                <p className="text-base font-black leading-tight">{stat.value}</p>
                <p className="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Bins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {binData.map((bin) => (
          <div 
            key={bin.id} 
            className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 duration-300 ${
                bin.fill > 85 ? 'bg-tertiary/10 text-tertiary shadow-sm' : 
                bin.fill > 70 ? 'bg-primary/10 text-primary' : 
                'bg-secondary/10 text-secondary'
              }`}>
                {bin.fill > 85 ? <AlertTriangle className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                bin.fill > 85 ? 'bg-tertiary/10 text-tertiary' : 
                bin.fill > 70 ? 'bg-primary/10 text-primary' : 
                'bg-surface-container text-on-surface-variant/40'
              }`}>
                {bin.fill}%
              </span>
            </div>

            <div className="space-y-3 flex-grow">
              <div>
                <h4 className="font-headline font-black text-sm group-hover:text-primary transition-colors">{bin.id}</h4>
                <div className="flex items-center gap-1.5 text-on-surface-variant/40 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <p className="text-[10px] font-bold truncate">{bin.location}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden p-0 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      bin.fill > 85 ? 'bg-tertiary' : 
                      bin.fill > 70 ? 'bg-primary' : 
                      'bg-secondary'
                    }`}
                    style={{ width: `${bin.fill}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between border-t border-outline-variant/5">
              <div className="space-y-0.5">
                <p className="text-[8px] font-black text-on-surface-variant opacity-30 uppercase tracking-widest">Last Update</p>
                <p className="text-[10px] font-black">{bin.lastEmptied}</p>
              </div>
              <button className="px-3 py-1.5 bg-surface-container/50 hover:bg-primary hover:text-on-primary rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 border border-outline-variant/5">
                Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinMonitoring;
