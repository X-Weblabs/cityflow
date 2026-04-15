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

export const SupervisorComplaintModule = ({ 
  supComplaintForm, 
  setSupComplaintForm, 
  supervisors, 
  handleSubmit 
}) => (
  <div className="space-y-6">
    <div className="max-w-2xl">
      <FormContainer title="Submit Supervisor Complaint" onSubmit={(e) => handleSubmit(e, 'sup_complaint')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-on-surface">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Date Complaint Received</label>
            <input type="date" value={supComplaintForm.dateReceived} onChange={(e) => setSupComplaintForm({...supComplaintForm, dateReceived: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Name of Complainant</label>
            <input type="text" value={supComplaintForm.complainantName} onChange={(e) => setSupComplaintForm({...supComplaintForm, complainantName: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
          </div>
        </div>
        <div className="space-y-1 text-on-surface">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Details of Complainant</label>
          <input type="text" value={supComplaintForm.complainantDetails} onChange={(e) => setSupComplaintForm({...supComplaintForm, complainantDetails: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" placeholder="Address, Phone..." required />
        </div>
        <div className="space-y-1 text-on-surface">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Complaint Type</label>
          <select value={supComplaintForm.complaintType} onChange={(e) => setSupComplaintForm({...supComplaintForm, complaintType: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold">
            <option>Animal Complaint</option>
            <option>Refuse Removal Complaint</option>
            <option>Dumping Complaint</option>
          </select>
        </div>

        {supComplaintForm.complaintType === 'Animal Complaint' && (
            <div className="space-y-3 pt-4 border-t border-outline-variant/10">
               <div className="grid grid-cols-2 gap-3 text-on-surface">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Nature of Complaint</label>
                  <input type="text" value={supComplaintForm.natureOfComplaint} onChange={(e) => setSupComplaintForm({...supComplaintForm, natureOfComplaint: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Accused Details</label>
                  <input type="text" value={supComplaintForm.accusedDetails} onChange={(e) => setSupComplaintForm({...supComplaintForm, accusedDetails: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Area Supervisor</label>
                  <select value={supComplaintForm.supervisorName} onChange={(e) => setSupComplaintForm({...supComplaintForm, supervisorName: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold">
                     <option value="">Select Supervisor</option>
                     {supervisors.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Date Actioned</label>
                  <input type="date" value={supComplaintForm.dateActioned} onChange={(e) => setSupComplaintForm({...supComplaintForm, dateActioned: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" />
                </div>
               </div>
               
               <div className="p-3 bg-surface-container/50 rounded-xl space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Actions & Enforcement</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1 text-on-surface">
                      <label className="text-[8px] font-black uppercase opacity-60">Intimation?</label>
                      <select value={supComplaintForm.intimationGiven} onChange={(e) => setSupComplaintForm({...supComplaintForm, intimationGiven: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-md p-1.5 text-[10px] font-bold">
                        <option>No</option><option>Yes</option>
                      </select>
                    </div>
                    <div className="space-y-1 text-on-surface">
                       <label className="text-[8px] font-black uppercase opacity-60">Dog Notice?</label>
                       <select value={supComplaintForm.dogNoticeGiven} onChange={(e) => setSupComplaintForm({...supComplaintForm, dogNoticeGiven: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-md p-1.5 text-[10px] font-bold">
                        <option>No</option><option>Yes</option>
                      </select>
                    </div>
                    <div className="space-y-1 text-on-surface">
                       <label className="text-[8px] font-black uppercase opacity-60">Ticket?</label>
                       <select value={supComplaintForm.ticketGiven} onChange={(e) => setSupComplaintForm({...supComplaintForm, ticketGiven: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-md p-1.5 text-[10px] font-bold">
                        <option>No</option><option>Yes</option>
                      </select>
                    </div>
                  </div>
                  {(supComplaintForm.intimationGiven === 'Yes' || supComplaintForm.dogNoticeGiven === 'Yes' || supComplaintForm.ticketGiven === 'Yes') && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                       {supComplaintForm.intimationGiven === 'Yes' && <input type="text" placeholder="Intimation #" value={supComplaintForm.intimationNumber} onChange={(e) => setSupComplaintForm({...supComplaintForm, intimationNumber: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-md p-1.5 text-[10px] font-bold text-on-surface" />}
                       {supComplaintForm.dogNoticeGiven === 'Yes' && <input type="text" placeholder="Dog Notice #" value={supComplaintForm.dogNoticeNumber} onChange={(e) => setSupComplaintForm({...supComplaintForm, dogNoticeNumber: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-md p-1.5 text-[10px] font-bold text-on-surface" />}
                       {supComplaintForm.ticketGiven === 'Yes' && <input type="text" placeholder="Ticket #" value={supComplaintForm.ticketNumber} onChange={(e) => setSupComplaintForm({...supComplaintForm, ticketNumber: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-md p-1.5 text-[10px] font-bold text-on-surface" />}
                    </div>
                  )}
               </div>
               <div className="space-y-1 text-on-surface">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">TF Prompt Date</label>
                <input type="date" value={supComplaintForm.tfPromptDate} onChange={(e) => setSupComplaintForm({...supComplaintForm, tfPromptDate: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" />
              </div>
            </div>
          )}

          {(supComplaintForm.complaintType === 'Refuse Removal Complaint' || supComplaintForm.complaintType === 'Dumping Complaint') && (
            <div className="space-y-3 pt-4 border-t border-outline-variant/10">
              {supComplaintForm.complaintType === 'Dumping Complaint' && (
                <div className="grid grid-cols-2 gap-3 text-on-surface">
                   <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Waste Type</label>
                    <input type="text" value={supComplaintForm.wasteType} onChange={(e) => setSupComplaintForm({...supComplaintForm, wasteType: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" placeholder="Construction, Organic..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Estimated Volume</label>
                    <input type="text" value={supComplaintForm.wasteVolume} onChange={(e) => setSupComplaintForm({...supComplaintForm, wasteVolume: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" placeholder="e.g. 5 bags, 2 loads..." />
                  </div>
                </div>
              )}
              <div className="space-y-1 text-on-surface">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Nature of Complaint</label>
                <input type="text" value={supComplaintForm.natureOfComplaint} onChange={(e) => setSupComplaintForm({...supComplaintForm, natureOfComplaint: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
              </div>
              <div className="space-y-1 text-on-surface">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Action Taken</label>
                <textarea value={supComplaintForm.actionTaken} onChange={(e) => setSupComplaintForm({...supComplaintForm, actionTaken: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold min-h-[80px]" required />
              </div>
              <div className="space-y-1 text-on-surface">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">TF Prompt Date</label>
                <input type="date" value={supComplaintForm.tfPromptDate} onChange={(e) => setSupComplaintForm({...supComplaintForm, tfPromptDate: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" />
              </div>
            </div>
          )}

        <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all mt-4">Confirm Supervisor Report</button>
      </FormContainer>
    </div>
  </div>
);
