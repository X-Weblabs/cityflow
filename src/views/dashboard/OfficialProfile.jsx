import React from 'react';

const OfficialProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Profile Header */}
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm relative group">
        <div className="h-28 bg-gradient-to-r from-primary/90 to-secondary/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
        </div>
        <div className="px-6 pb-6 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-end gap-5">
              <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest p-1 shadow-sm">
                <div className="w-full h-full rounded-xl bg-primary flex items-center justify-center overflow-hidden text-on-primary text-3xl font-black">
                  JD
                </div>
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-black text-on-surface leading-none mb-1">James Dube</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 flex items-center gap-1.5 leading-none">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Operations Supervisor • Cleansing Division
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <button className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-[10px] font-black uppercase tracking-widest text-on-surface rounded-xl transition-all active:scale-95 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">settings</span>
                Settings
              </button>
              <button className="px-4 py-2 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">edit</span>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Contact & Details */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4 px-1">Contact Intel</h3>
            <div className="space-y-3">
              {[
                { icon: 'mail', label: 'Work Email', val: 'j.dube@cityflow.byo' },
                { icon: 'call', label: 'Direct Ext', val: '+263-9-7501-44' },
                { icon: 'room', label: 'Location', val: 'Tower Block, 4F' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container/20 border border-outline-variant/5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant/50">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[8px] text-on-surface-variant/40 uppercase font-black">{item.label}</p>
                    <p className="text-xs font-bold text-on-surface truncate">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4 px-1">Authorization</h3>
            <div className="space-y-3">
              {[
                { label: 'Role', val: 'Administrator' },
                { label: 'Clearance', val: 'L-04', badge: true },
                { label: 'Tenure', val: '6 Years' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold text-on-surface-variant/50">{item.label}</span>
                  {item.badge ? (
                    <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-lg text-[9px] font-black uppercase tracking-widest leading-none">{item.val}</span>
                  ) : (
                    <span className="text-[11px] font-black">{item.val}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Statistics & Achievements */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4 px-1">Quarterly Stats</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Tickets', count: '1,452', color: 'primary' },
                { label: 'Fleet', count: '18', color: 'secondary' },
                { label: 'Score', count: '98%', color: 'tertiary' },
              ].map((stat, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-surface-container/20 border border-outline-variant/5 text-center group active:scale-95 transition-all cursor-pointer">
                  <p className="text-xl font-black mb-0.5 tracking-tight group-hover:text-primary transition-colors">{stat.count}</p>
                  <p className="text-[8px] text-on-surface-variant/40 font-black uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col min-h-[290px]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4 px-1">Live Activity Logs</h3>
            <div className="space-y-2 flex-grow overflow-y-auto pr-1">
              {[
                { action: 'Authorized fleet maintenance #402', pt: '2h', icon: 'verified_user' },
                { action: 'Audit review of Ascot Service delivery', pt: '5h', icon: 'analytics' },
                { action: 'Updated security keys for field teams', pt: '1d', icon: 'vpn_key' },
                { action: 'System bypass for urgent repair ticket', pt: '2d', icon: 'shield_lock' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center group cursor-pointer hover:bg-surface-container/30 p-2 rounded-xl border border-transparent hover:border-outline-variant/5 transition-all">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant/40 group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <p className="text-[11px] font-black text-on-surface group-hover:text-primary transition-colors truncate">{item.action}</p>
                    <p className="text-[9px] text-on-surface-variant/30 font-bold uppercase mt-0.5 tracking-tighter">{item.pt} ago • System Log</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 border border-dashed border-outline-variant/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all active:scale-[0.98]">
              Open Activity Console
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialProfile;
