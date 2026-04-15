import React from 'react';
import { 
  Search, 
  ChevronRight, 
  X, 
  FileText, 
  CheckCircle, 
  Activity, 
  PlusCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FormContainer = ({ children, title, onSubmit }) => (
  <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden">
    <div className="px-4 py-3 border-b border-outline-variant/5 bg-surface-container/10 flex items-center justify-between">
      <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/50">{title}</h3>
      <PlusCircle className="w-3.5 h-3.5 text-primary opacity-20" />
    </div>
    <form onSubmit={onSubmit} className="p-4 space-y-4">
      {children}
    </form>
  </div>
);

export const TaskFollowUpModule = ({ 
  taskCategory, 
  setTaskCategory, 
  taskSearchQuery, 
  setTaskSearchQuery, 
  filterRecords, 
  selectedTaskRecord, 
  setSelectedTaskRecord, 
  handleResolve,
  actionTaken,
  setActionTaken
}) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm space-y-4">
          <div className="flex gap-2 p-1 bg-surface-container/30 rounded-lg">
            {['landfill', 'dog', 'inspection'].map(cat => (
              <button 
                key={cat}
                onClick={() => { setTaskCategory(cat); setSelectedTaskRecord(null); }}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${taskCategory === cat ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant/50 hover:text-on-surface'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/30" />
            <input 
              type="text" 
              placeholder={`Search ${taskCategory} records...`}
              value={taskSearchQuery}
              onChange={(e) => setTaskSearchQuery(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-lg pl-9 pr-4 py-2.5 text-[12px] font-bold text-on-surface"
            />
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm max-h-[400px] overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-outline-variant/5">
            {filterRecords().map((record) => (
              <button 
                key={record.id}
                onClick={() => setSelectedTaskRecord(record)}
                className={`w-full text-left p-4 hover:bg-surface-container/20 transition-all flex items-center justify-between group ${selectedTaskRecord?.id === record.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-tighter opacity-30">{record.id?.slice(0, 8)}...</span>
                    {record.status === 'Resolved' && <span className="px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[8px] font-black uppercase">Resolved</span>}
                  </div>
                  <p className="text-[13px] font-bold text-on-surface group-hover:text-primary transition-colors">
                    {record.name || record.ownerName || record.facilityName || 'Unnamed Record'}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all ${selectedTaskRecord?.id === record.id ? 'text-primary' : 'opacity-10 group-hover:opacity-100 group-hover:translate-x-1'}`} />
              </button>
            ))}
            {filterRecords().length === 0 && (
              <div className="p-10 text-center opacity-30">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest">No matching records found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedTaskRecord ? (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-lg p-6 space-y-6 sticky top-20">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><FileText className="w-6 h-6" /></div>
              <button onClick={() => setSelectedTaskRecord(null)} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant/40 hover:text-error transition-all"><X className="w-4 h-4" /></button>
            </div>
            <div>
              <h3 className="text-xl font-headline font-black text-on-surface mb-1">{selectedTaskRecord.name || selectedTaskRecord.ownerName || selectedTaskRecord.facilityName}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Reference ID: {selectedTaskRecord.id}</p>
            </div>
            <div className="grid grid-cols-2 gap-6 py-4 border-y border-outline-variant/5 max-h-[160px] overflow-y-auto custom-scrollbar">
              {Object.entries(selectedTaskRecord).filter(([k]) => !['id', 'createdAt', '_coll', 'status', 'updatedAt', 'actionTaken'].includes(k)).map(([k, v]) => (
                <div key={k}>
                  <p className="text-[9px] font-black uppercase tracking-tighter text-on-surface-variant/40 mb-1">{k.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-[12px] font-bold text-on-surface truncate">{Array.isArray(v) ? v.join(', ') : v}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Resolution / Action Taken</label>
                <textarea 
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="Describe the steps taken to resolve this task..."
                  disabled={selectedTaskRecord.status === 'Resolved'}
                  className="w-full bg-surface-container border border-outline-variant/10 rounded-xl p-3 text-[12px] font-bold text-on-surface min-h-[100px] focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
                />
              </div>

              {selectedTaskRecord.status !== 'Resolved' ? (
                <button 
                  onClick={() => handleResolve(selectedTaskRecord._coll, selectedTaskRecord.id)}
                  disabled={!actionTaken?.trim()}
                  className="w-full bg-secondary text-on-secondary py-3.5 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] shadow-lg shadow-secondary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:scale-100"
                >
                  <CheckCircle className="w-4 h-4" />
                  Complete Resolution
                </button>
              ) : (
                <div className="w-full border-2 border-dashed border-secondary/20 p-4 rounded-xl text-center text-secondary font-black text-[10px] uppercase tracking-widest">
                  This item has been resolved
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="hidden lg:flex h-full min-h-[400px] items-center justify-center border-2 border-dashed border-outline-variant/10 rounded-xl opacity-30">
            <div className="text-center">
              <Activity className="w-12 h-12 mx-auto mb-4" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em]">Select a record to follow up</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

export const InvestigationModule = ({ complaintForm, setComplaintForm, handleSubmit }) => (
  <div className="space-y-6">
    <div className="max-w-xl text-on-surface">
      <FormContainer title="Log Investigation Findings" onSubmit={(e) => handleSubmit(e, 'complaint')}>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Complainant Name</label>
          <input type="text" value={complaintForm.complainantName} onChange={(e) => setComplaintForm({...complaintForm, complainantName: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Incident Category</label>
            <select value={complaintForm.category} onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold text-on-surface">
              <option>Illegal Dumping</option>
              <option>Noise Pollution</option>
              <option>Missed Collection</option>
              <option>Sewer Spillage</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Incident Location</label>
            <input type="text" value={complaintForm.location} onChange={(e) => setComplaintForm({...complaintForm, location: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold text-on-surface" required />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Field Findings</label>
          <textarea value={complaintForm.findings} onChange={(e) => setComplaintForm({...complaintForm, findings: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold min-h-[80px]" placeholder="Detailed investigation notes..." required />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1 text-on-surface">Proposed Action / Resolution</label>
          <input type="text" value={complaintForm.actionTaken} onChange={(e) => setComplaintForm({...complaintForm, actionTaken: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold text-on-surface" required />
        </div>
        <button type="submit" className="w-full bg-tertiary text-on-tertiary py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-tertiary/20 hover:scale-[1.01] active:scale-95 transition-all">Submit Investigation Report</button>
      </FormContainer>
    </div>
  </div>
);
