import React from 'react';
import { PlusCircle } from 'lucide-react';

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

export const InspectionModule = ({ inspectionForm, setInspectionForm, handleSubmit }) => (
  <div className="space-y-6">
    <div className="max-w-xl">
      <FormContainer title="Facility Inspection Report" onSubmit={(e) => handleSubmit(e, 'inspection')}>
        <div className="grid grid-cols-2 gap-3 text-on-surface">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Facility Name</label>
            <input type="text" value={inspectionForm.facilityName} onChange={(e) => setInspectionForm({...inspectionForm, facilityName: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Location / Ward</label>
            <input type="text" value={inspectionForm.location} onChange={(e) => setInspectionForm({...inspectionForm, location: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Inspection Type</label>
            <select value={inspectionForm.inspectionType} onChange={(e) => setInspectionForm({...inspectionForm, inspectionType: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold text-on-surface">
              <option>Routine</option>
              <option>Complaint-based</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Condition Rating (1-5)</label>
            <input type="range" min="1" max="5" value={inspectionForm.condition} onChange={(e) => setInspectionForm({...inspectionForm, condition: e.target.value})} className="w-full h-8 accent-primary cursor-pointer" />
          </div>
        </div>
        <div className="space-y-1 text-on-surface">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Reported Issues</label>
          <textarea value={inspectionForm.issues} onChange={(e) => setInspectionForm({...inspectionForm, issues: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold min-h-[80px]" required />
        </div>
        <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">Submit Inspection Log</button>
      </FormContainer>
    </div>
  </div>
);
