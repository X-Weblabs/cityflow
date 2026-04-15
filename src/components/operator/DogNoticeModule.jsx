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

export const DogNoticeModule = ({ dogForm, setDogForm, handleSubmit }) => (
  <div className="space-y-6">
    <div className="max-w-xl">
      <FormContainer title="Issue New Dog Notice" onSubmit={(e) => handleSubmit(e, 'dog')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-on-surface">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Owner Name</label>
            <input type="text" value={dogForm.ownerName} onChange={(e) => setDogForm({...dogForm, ownerName: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Action Date</label>
            <input type="date" value={dogForm.date} onChange={(e) => setDogForm({...dogForm, date: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" />
          </div>
        </div>
        <div className="space-y-1 text-on-surface">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Incident Address</label>
          <input type="text" value={dogForm.address} onChange={(e) => setDogForm({...dogForm, address: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold text-on-surface" required />
        </div>
        <div className="grid grid-cols-2 gap-3 text-on-surface">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Notice Category</label>
            <select value={dogForm.noticeType} onChange={(e) => setDogForm({...dogForm, noticeType: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold">
              <option>Unlicensed</option>
              <option>Nuisance Barking</option>
              <option>Dangerous Dog</option>
              <option>Stray / At Large</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Dog Description</label>
            <input type="text" value={dogForm.dogDescription} onChange={(e) => setDogForm({...dogForm, dogDescription: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" placeholder="Breed, color..." required />
          </div>
        </div>
        <div className="space-y-1 text-on-surface">
          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Actions Taken</label>
          <textarea value={dogForm.actionTaken} onChange={(e) => setDogForm({...dogForm, actionTaken: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold min-h-[80px]" required />
        </div>
        <button type="submit" className="w-full bg-tertiary text-on-tertiary py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-tertiary/20 hover:scale-[1.01] active:scale-95 transition-all">Submit Notice</button>
      </FormContainer>
    </div>
  </div>
);
