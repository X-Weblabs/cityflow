import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Activity, 
  ChevronRight,
  Plus,
  Weight,
  History,
  Navigation,
  Warehouse,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { 
  subscribeToFleet,
  subscribeToLandfillEntries,
  subscribeToBWMTDeliveries,
  addLandfillEntry,
  addBWMTDelivery,
  addVehicleIssue,
  subscribeToLandfillSites,
  subscribeToSupervisors
} from '../services/db';
import Modal from '../components/Modal';
import MultiSelect from '../components/MultiSelect';

const OperatorPortal = () => {
  const [fleet, setFleet] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [entries, setEntries] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [sites, setSites] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showBWMTModal, setShowBWMTModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  // Form States
  const [entryForm, setEntryForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    name: '',
    regNumber: '',
    tonnage: '',
    wasteTypes: [],
    destination: '',
    supervisor: ''
  });

  const [bwmtForm, setBwmtForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    month: format(new Date(), 'MMMM'),
    tonnage: '',
    wasteTypes: []
  });

  const [issueForm, setIssueForm] = useState({
    type: 'Mechanical',
    description: '',
    severity: 'Medium'
  });

  useEffect(() => {
    const unsubFleet = subscribeToFleet(setFleet);
    const unsubEntries = subscribeToLandfillEntries(setEntries);
    const unsubDeliveries = subscribeToBWMTDeliveries(setDeliveries);
    const unsubSites = subscribeToLandfillSites(setSites);
    const unsubSupervisors = subscribeToSupervisors(setSupervisors);
    
    // Auto-select vehicle if stored in localStorage
    const savedVehicle = localStorage.getItem('operatorVehicle');
    if (savedVehicle) {
      setSelectedVehicle(savedVehicle);
    }

    return () => {
      unsubFleet();
      unsubEntries();
      unsubDeliveries();
      unsubSites();
      unsubSupervisors();
    };
  }, []);

  useEffect(() => {
    if (selectedVehicle) {
      localStorage.setItem('operatorVehicle', selectedVehicle);
      setEntryForm(prev => ({ ...prev, regNumber: selectedVehicle }));
    }
  }, [selectedVehicle]);

  const handleEntrySubmit = async (e) => {
    e.preventDefault();
    await addLandfillEntry({
      ...entryForm,
      wasteTypes: entryForm.wasteTypes.map(t => t.text)
    });
    setShowEntryModal(false);
    setEntryForm({
      date: format(new Date(), 'yyyy-MM-dd'),
      name: '',
      regNumber: selectedVehicle || '',
      tonnage: '',
      wasteTypes: [],
      destination: '',
      supervisor: ''
    });
  };

  const handleBWMTSubmit = async (e) => {
    e.preventDefault();
    await addBWMTDelivery({
      ...bwmtForm,
      wasteTypes: bwmtForm.wasteTypes.map(t => t.text)
    });
    setShowBWMTModal(false);
    setBwmtForm({
      date: format(new Date(), 'yyyy-MM-dd'),
      month: format(new Date(), 'MMMM'),
      tonnage: '',
      wasteTypes: []
    });
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    await addVehicleIssue({
      ...issueForm,
      vehicleId: selectedVehicle,
      status: 'Open',
      reportedAt: format(new Date(), 'yyyy-MM-dd HH:mm')
    });
    setShowIssueModal(false);
    setIssueForm({ type: 'Mechanical', description: '', severity: 'Medium' });
  };

  const myEntriesToday = entries.filter(e => e.regNumber === selectedVehicle && e.date === format(new Date(), 'yyyy-MM-dd'));
  const dailyTotalTonnage = myEntriesToday.reduce((acc, curr) => acc + parseFloat(curr.tonnage || 0), 0);

  const wasteOptionsEntry = [
    { text: 'Glass (Aluminium)', value: 'glass' },
    { text: 'Pet/Plastic bottles', value: 'pet' },
    { text: 'Clear plastic', value: 'clear_plastic' },
    { text: 'Cardboard', value: 'cardboard' },
    { text: 'Rubber', value: 'rubber' },
    { text: 'Sack', value: 'sack' },
    { text: 'Metals', value: 'metals' }
  ];

  const wasteOptionsBWMT = [
    { text: 'Food', value: 'food' },
    { text: 'Garden', value: 'garden' },
    { text: 'Paper', value: 'paper' },
    { text: 'Textile', value: 'textile' },
    { text: 'Nappies', value: 'nappies' },
    { text: 'Metals', value: 'metals_bwmt' },
    { text: 'Rubber & Leather', value: 'rubber_leather' },
    { text: 'Glass', value: 'glass_bwmt' },
    { text: 'Domestic', value: 'domestic' },
    { text: 'Organic', value: 'organic' },
    { text: 'Industrial SWM', value: 'industrial' }
  ];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (!selectedVehicle) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-headline font-black mb-2">Vehicle Check-in</h1>
          <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest mb-8">Select your assigned unit to start</p>
          
          <div className="space-y-3">
            {fleet.map(v => (
              <button 
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="font-mono font-black text-sm">{v.id}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-4 md:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-mono font-black text-[10px]">{selectedVehicle}</span>
              <button onClick={() => setSelectedVehicle(null)} className="text-[10px] font-black uppercase text-primary/40 hover:text-primary transition-colors tracking-widest">Switch Unit</button>
            </div>
            <h1 className="text-2xl font-headline font-black">Field Operator</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-black">JS</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm">
            <Activity className="w-5 h-5 text-primary mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Activity</p>
            <h3 className="text-xl font-headline font-black">{myEntriesToday.length} <span className="text-[10px] text-on-surface-variant font-bold opacity-30 tracking-tight">STREAK</span></h3>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm">
            <Weight className="w-5 h-5 text-secondary mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Tonnage</p>
            <h3 className="text-xl font-headline font-black">{dailyTotalTonnage.toFixed(1)}t</h3>
          </div>
          <div className="col-span-2 bg-primary text-on-primary p-5 rounded-3xl shadow-lg shadow-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Today's Progress</p>
               <h3 className="text-2xl font-headline font-black mb-3">{Math.min(100, (myEntriesToday.length / 10) * 100).toFixed(0)}%</h3>
               <div className="w-full h-2 bg-on-primary/20 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${Math.min(100, (myEntriesToday.length / 10) * 100)}%` }}
                   className="h-full bg-on-primary" 
                 />
               </div>
            </div>
            <Activity className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowEntryModal(true)}
            className="flex flex-col items-center justify-center gap-3 p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 hover:border-primary/50 group transition-all"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
               <Plus className="w-6 h-6" />
            </div>
            <span className="font-black text-[11px] uppercase tracking-widest">New Refuse Entry</span>
          </button>
          <button 
            onClick={() => setShowBWMTModal(true)}
            className="flex flex-col items-center justify-center gap-3 p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 hover:border-secondary/50 group transition-all"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
               <Warehouse className="w-6 h-6" />
            </div>
            <span className="font-black text-[11px] uppercase tracking-widest">BWMT Delivery</span>
          </button>
          <button 
            onClick={() => setShowIssueModal(true)}
            className="flex flex-col items-center justify-center gap-3 p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 hover:border-tertiary/50 group transition-all"
          >
            <div className="w-12 h-12 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="font-black text-[11px] uppercase tracking-widest">Report Vehicle Issue</span>
          </button>
        </div>

        {/* Activity Feed */}
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-outline-variant/5 flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Recent Site Activity</h4>
              <History className="w-4 h-4 opacity-20" />
           </div>
           <div className="divide-y divide-outline-variant/5">
              {myEntriesToday.map((entry, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-on-surface-variant/40" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold">{entry.destination}</p>
                        <p className="text-[9px] font-black uppercase tracking-tighter opacity-30">{entry.tonnage}t • {entry.date}</p>
                      </div>
                   </div>
                   <CheckCircle className="w-5 h-5 text-secondary opacity-20" />
                </div>
              ))}
              {myEntriesToday.length === 0 && (
                <div className="p-12 text-center">
                   <Navigation className="w-12 h-12 bg-surface-container p-3 rounded-2xl text-on-surface-variant/20 mx-auto mb-4" />
                   <p className="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Waiting for First Collection</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Entry Modal */}
      <Modal isOpen={showEntryModal} onClose={() => setShowEntryModal(false)} title="New Refuse Submission">
        <form onSubmit={handleEntrySubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Company / Private Name</label>
              <input type="text" value={entryForm.name} onChange={(e) => setEntryForm({...entryForm, name: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Weight (t)</label>
              <input type="number" step="0.01" value={entryForm.tonnage} onChange={(e) => setEntryForm({...entryForm, tonnage: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold" required />
            </div>
          </div>
          <MultiSelect label="Type of Waste" options={wasteOptionsEntry} selected={entryForm.wasteTypes} onChange={(selected) => setEntryForm({...entryForm, wasteTypes: selected})} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Destination</label>
              <select value={entryForm.destination} onChange={(e) => setEntryForm({...entryForm, destination: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold">
                <option value="">Select Site</option>
                {sites.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Supervisor</label>
              <select value={entryForm.supervisor} onChange={(e) => setEntryForm({...entryForm, supervisor: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold">
                <option value="">Select Supervisor</option>
                {supervisors.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20">Submit Entry</button>
        </form>
      </Modal>

      {/* BWMT Modal */}
      <Modal isOpen={showBWMTModal} onClose={() => setShowBWMTModal(false)} title="BWMT Delivery Report">
        <form onSubmit={handleBWMTSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Month</label>
              <select value={bwmtForm.month} onChange={(e) => setBwmtForm({...bwmtForm, month: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold">
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Tonnage</label>
              <input type="number" step="0.01" value={bwmtForm.tonnage} onChange={(e) => setBwmtForm({...bwmtForm, tonnage: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold" required />
            </div>
          </div>
          <MultiSelect label="Type of Waste" options={wasteOptionsBWMT} selected={bwmtForm.wasteTypes} onChange={(selected) => setBwmtForm({...bwmtForm, wasteTypes: selected})} />
          <button type="submit" className="w-full bg-secondary text-on-secondary py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-secondary/20">Confirm Delivery</button>
        </form>
      </Modal>

      {/* Issue Modal */}
      <Modal isOpen={showIssueModal} onClose={() => setShowIssueModal(false)} title="Report Vehicle Issue">
        <form onSubmit={handleIssueSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Issue Type</label>
              <select value={issueForm.type} onChange={(e) => setIssueForm({...issueForm, type: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold">
                <option>Mechanical</option>
                <option>Electrical</option>
                <option>Flat Tire</option>
                <option>Hydraulic Leak</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Severity</label>
              <select value={issueForm.severity} onChange={(e) => setIssueForm({...issueForm, severity: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold">
                <option>Low</option>
                <option>Medium</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Description</label>
            <textarea value={issueForm.description} onChange={(e) => setIssueForm({...issueForm, description: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold min-h-[100px]" placeholder="Explain the issue..." required />
          </div>
          <button type="submit" className="w-full bg-tertiary text-on-tertiary py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-tertiary/20">Report To Dispatch</button>
        </form>
      </Modal>
    </div>
  );
};

export default OperatorPortal;
