import React, { useState } from 'react';
import { Warehouse, PlusCircle } from 'lucide-react';
import MultiSelect from '../MultiSelect';

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

export const LandfillModule = ({ 
  activeTab, 
  setActiveTab, 
  recyclingForm, 
  setRecyclingForm, 
  bwmtForm, 
  setBwmtForm, 
  supervisors, 
  sites, 
  handleSubmit, 
  wasteOptionsEntry, 
  wasteOptionsBWMT, 
  months 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4 bg-surface-container/30 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setActiveTab('recycling')}
          className={`px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider transition-all ${activeTab === 'recycling' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant/60 hover:text-on-surface'}`}
        >
          Waste Recycling
        </button>
        <button 
          onClick={() => setActiveTab('bwmt')}
          className={`px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider transition-all ${activeTab === 'bwmt' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant/60 hover:text-on-surface'}`}
        >
          BWMT Delivery
        </button>
      </div>
      {activeTab === 'recycling' ? (
          <FormContainer key="recycling" title="Record Waste Recycling" onSubmit={(e) => handleSubmit(e, 'recycling')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-on-surface">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Date of Entry</label>
                <input type="date" value={recyclingForm.date} onChange={(e) => setRecyclingForm({...recyclingForm, date: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Company / Private Name</label>
                <input type="text" value={recyclingForm.name} onChange={(e) => setRecyclingForm({...recyclingForm, name: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold outline-none focus:ring-1 focus:ring-primary/20 transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Registration Number</label>
                <input type="text" value={recyclingForm.registrationNumber} onChange={(e) => setRecyclingForm({...recyclingForm, registrationNumber: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Weight (t)</label>
                <input type="number" step="0.01" value={recyclingForm.tonnage} onChange={(e) => setRecyclingForm({...recyclingForm, tonnage: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1 font-bold">Reporting Supervisor</label>
                <select value={recyclingForm.supervisor} onChange={(e) => setRecyclingForm({...recyclingForm, supervisor: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold">
                  <option value="">Select Supervisor</option>
                  {supervisors.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Destination Site</label>
                <select value={recyclingForm.destination} onChange={(e) => setRecyclingForm({...recyclingForm, destination: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold">
                  <option value="">Select Site</option>
                  {sites.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div className="z-[150] relative">
              <MultiSelect direction="up" label="Type of Recycling Waste" options={wasteOptionsEntry} selected={recyclingForm.wasteTypes} onChange={(selected) => setRecyclingForm({...recyclingForm, wasteTypes: selected})} />
            </div>
            <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">Submit Recycling Record</button>
          </FormContainer>
        ) : (
          <FormContainer key="bwmt" title="Record BWMT Delivery" onSubmit={(e) => handleSubmit(e, 'bwmt')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-on-surface">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Reporting Date</label>
                <input type="date" value={bwmtForm.date} onChange={(e) => setBwmtForm({...bwmtForm, date: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Reporting Month</label>
                <select value={bwmtForm.month} onChange={(e) => setBwmtForm({...bwmtForm, month: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold">
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Tonnage Total</label>
                <input type="number" step="0.01" value={bwmtForm.tonnage} onChange={(e) => setBwmtForm({...bwmtForm, tonnage: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Reporting Supervisor</label>
                <select value={bwmtForm.supervisor} onChange={(e) => setBwmtForm({...bwmtForm, supervisor: e.target.value})} className="w-full bg-surface-container border border-outline-variant/10 rounded-lg p-2.5 text-[12px] font-bold">
                  <option value="">Select Supervisor</option>
                  {supervisors.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div className="z-[150] relative">
              <MultiSelect direction="up" label="Waste Categories" options={wasteOptionsBWMT} selected={bwmtForm.wasteTypes} onChange={(selected) => setBwmtForm({...bwmtForm, wasteTypes: selected})} />
            </div>
            <button type="submit" className="w-full bg-secondary text-on-secondary py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-secondary/20 hover:scale-[1.01] active:scale-95 transition-all">Log Delivery Data</button>
          </FormContainer>
        )}
    </div>
  );
};
