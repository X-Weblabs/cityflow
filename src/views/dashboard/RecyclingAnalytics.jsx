import React from 'react';
import { TrendingUp, Award, Zap, ArrowUpRight, Target } from 'lucide-react';

const RecyclingAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Top Insights */}
      <div className="grid grid-cols-1 gap-5">
        <div className="bg-primary rounded-3xl p-8 text-on-primary shadow-lg shadow-primary/10 relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-black text-[10px] uppercase tracking-widest opacity-70">Performance Snapshot</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-headline font-black leading-tight max-w-sm">
              Monthly recycling target reached 3 days early.
            </h3>
            <div className="flex gap-6 pt-2">
              <div>
                <p className="text-2xl font-black">24.8t</p>
                <p className="text-[9px] font-black opacity-60 uppercase tracking-widest mt-1">Collected</p>
              </div>
              <div className="w-[1px] bg-white/10 h-10 my-auto"></div>
              <div>
                <p className="text-2xl font-black">+18%</p>
                <p className="text-[9px] font-black opacity-60 uppercase tracking-widest mt-1">Efficiency</p>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[60px] group-hover:bg-white/20 transition-all duration-1000"></div>
        </div>
      </div>

      {/* Charts Section (CSS Based) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-headline font-black text-sm uppercase tracking-widest opacity-50">Weekly Tonnage</h4>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2.5 px-1">
            {[45, 62, 58, 85, 42, 70, 92].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer">
                <div 
                  className="w-full bg-surface-container group-hover:bg-primary/5 rounded-t-lg relative transition-all duration-300 flex flex-col justify-end overflow-hidden"
                  style={{ height: '100%' }}
                >
                  <div 
                    className="w-full bg-primary rounded-t-md group-hover:scale-y-105 transition-transform duration-500 origin-bottom"
                    style={{ height: `${height}%` }}
                  />
                  {/* Tooltip */}
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[9px] font-black px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    {height * 10}kg
                  </div>
                </div>
                <span className="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-tighter">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-headline font-black text-sm uppercase tracking-widest opacity-50">Composition</h4>
            <button className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-1 group">
              Report <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { type: 'Plastic', percent: 42, color: 'primary' },
              { type: 'Paper', percent: 28, color: 'secondary' },
              { type: 'Glass', percent: 18, color: 'tertiary' },
              { type: 'Metal', percent: 12, color: 'on-surface-variant' }
            ].map((item, i) => (
              <div key={i} className="space-y-1.5 group cursor-default">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-black text-on-surface/70 group-hover:text-primary transition-colors">{item.type}</span>
                  <span className="text-[9px] font-black opacity-30">{item.percent}%</span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 delay-${i * 100} ${
                      item.color === 'primary' ? 'bg-primary' : 
                      item.color === 'secondary' ? 'bg-secondary' : 
                      item.color === 'tertiary' ? 'bg-tertiary' : 'bg-on-surface-variant/30'
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingAnalytics;
