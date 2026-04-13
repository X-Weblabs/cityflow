import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  Truck, 
  Weight, 
  MoreVertical,
  ArrowUpRight,
  User,
  Warehouse,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format } from 'date-fns';
import { 
  addLandfillEntry, 
  subscribeToLandfillEntries,
  addBWMTDelivery,
  subscribeToBWMTDeliveries,
  addLandfillSite,
  subscribeToLandfillSites,
  subscribeToSupervisors
} from '../../services/db';
import Modal from '../../components/Modal';
import MultiSelect from '../../components/MultiSelect';

// Fixed leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
}

const LandfillManagement = () => {
  const [entries, setEntries] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [sites, setSites] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [activeTab, setActiveTab] = useState('entries');

  // Modals
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isBWMTModalOpen, setIsBWMTModalOpen] = useState(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);

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

  const [siteForm, setSiteForm] = useState({
    name: '',
    location: [-20.15, 28.58] // Default Bulawayo
  });

  useEffect(() => {
    const unsubEntries = subscribeToLandfillEntries(setEntries);
    const unsubDeliveries = subscribeToBWMTDeliveries(setDeliveries);
    const unsubSites = subscribeToLandfillSites(setSites);
    const unsubSupervisors = subscribeToSupervisors(setSupervisors);
    return () => {
      unsubEntries();
      unsubDeliveries();
      unsubSites();
      unsubSupervisors();
    };
  }, []);

  const handleEntrySubmit = async (e) => {
    e.preventDefault();
    await addLandfillEntry({
      ...entryForm,
      wasteTypes: entryForm.wasteTypes.map(t => t.text)
    });
    setIsEntryModalOpen(false);
    setEntryForm({
      date: format(new Date(), 'yyyy-MM-dd'),
      name: '',
      regNumber: '',
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
    setIsBWMTModalOpen(false);
    setBwmtForm({
      date: format(new Date(), 'yyyy-MM-dd'),
      month: format(new Date(), 'MMMM'),
      tonnage: '',
      wasteTypes: []
    });
  };

  const handleSiteSubmit = async (e) => {
    e.preventDefault();
    await addLandfillSite(siteForm);
    setIsSiteModalOpen(false);
    setSiteForm({ name: '', location: [-20.15, 28.58] });
  };

  const todayEntries = entries.filter(e => e.date === format(new Date(), 'yyyy-MM-dd'));
  const totalTonnageToday = todayEntries.reduce((acc, curr) => acc + parseFloat(curr.tonnage || 0), 0);

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

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-black text-2xl text-on-surface">Landfill Management</h1>
          <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Operator Control Dashboard</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setIsEntryModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> New Entry
          </button>
          <button 
            onClick={() => setIsBWMTModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-on-secondary rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Truck className="w-4 h-4" /> BWMT Delivery
          </button>
          <button 
            onClick={() => setIsSiteModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface rounded-xl font-black text-xs uppercase tracking-widest border border-outline-variant/10 hover:bg-surface-container-highest transition-all"
          >
            <MapPin className="w-4 h-4" /> Manage Sites
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Today\'s Tonnage', value: `${totalTonnageToday.toFixed(1)}t`, icon: Weight, color: 'primary' },
          { label: 'Today\'s Entries', value: todayEntries.length, icon: Calendar, color: 'secondary' },
          { label: 'Active Sites', value: sites.length, icon: Warehouse, color: 'tertiary' },
          { label: 'BWMT (Month)', value: deliveries.length, icon: Truck, color: 'primary' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-0.5">{stat.label}</p>
              <h3 className="text-xl font-headline font-black">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Tables/Activity */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/10">
          <div className="flex gap-4">
             <button 
               onClick={() => setActiveTab('entries')}
               className={`text-[12px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'entries' ? 'text-primary border-primary' : 'text-on-surface-variant/40 border-transparent'}`}
             >
               Refuse Entries
             </button>
             <button 
               onClick={() => setActiveTab('deliveries')}
               className={`text-[12px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'deliveries' ? 'text-primary border-primary' : 'text-on-surface-variant/40 border-transparent'}`}
             >
               BWMT Deliveries
             </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
            <input 
              type="text" 
              placeholder="Search record..." 
              className="bg-surface-container-low border border-outline-variant/10 rounded-xl pl-9 pr-4 py-2 text-[13px] font-bold focus:ring-2 focus:ring-primary/20 outline-none w-64 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'entries' ? (
            <table className="w-full text-left">
              <thead className="bg-surface-container/30">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Company / Private</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Reg Number</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Weight (t)</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Destination</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Supervisor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-surface-container/10 transition-colors">
                    <td className="px-6 py-4 text-[13px] font-bold">{entry.date}</td>
                    <td className="px-6 py-4 text-[13px] font-bold">{entry.name}</td>
                    <td className="px-6 py-4 text-[13px] font-black font-mono text-secondary uppercase italic">{entry.regNumber}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[11px] font-black">{entry.tonnage}t</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-bold">{entry.destination}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-on-surface-variant">{entry.supervisor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-surface-container/30">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Report Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Month</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Total Tonnage</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Waste Types</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-surface-container/10 transition-colors">
                    <td className="px-6 py-4 text-[13px] font-bold">{delivery.date}</td>
                    <td className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider">{delivery.month}</td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-1 rounded bg-secondary/10 text-secondary text-[11px] font-black">{delivery.tonnage}t</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {delivery.wasteTypes?.map((w, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary text-[9px] font-black uppercase">{w}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* New Entry Modal */}
      <Modal isOpen={isEntryModalOpen} onClose={() => setIsEntryModalOpen(false)} title="Record New Landfill Entry">
        <form onSubmit={handleEntrySubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Date</label>
              <input 
                type="date" 
                value={entryForm.date}
                onChange={(e) => setEntryForm({...entryForm, date: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Company / Private Name</label>
              <input 
                type="text" 
                value={entryForm.name}
                onChange={(e) => setEntryForm({...entryForm, name: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold"
                placeholder="Enter name..."
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Registration Number</label>
              <input 
                type="text" 
                value={entryForm.regNumber}
                onChange={(e) => setEntryForm({...entryForm, regNumber: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold uppercase"
                placeholder="ABC-1234"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Tonnage of Refuse / Weight</label>
              <input 
                type="number" 
                step="0.01"
                value={entryForm.tonnage}
                onChange={(e) => setEntryForm({...entryForm, tonnage: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <MultiSelect 
            label="Type of Waste"
            options={wasteOptionsEntry}
            selected={entryForm.wasteTypes}
            onChange={(selected) => setEntryForm({...entryForm, wasteTypes: selected})}
            placeholder="Select waste types..."
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Destination</label>
              <select 
                value={entryForm.destination}
                onChange={(e) => setEntryForm({...entryForm, destination: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold outline-none"
                required
              >
                <option value="">Select Destination</option>
                {sites.map(site => (
                  <option key={site.id} value={site.name}>{site.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Reporting Supervisor</label>
              <select 
                value={entryForm.supervisor}
                onChange={(e) => setEntryForm({...entryForm, supervisor: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold outline-none"
                required
              >
                <option value="">Select Supervisor</option>
                {supervisors.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 mt-4 active:scale-95 transition-all">
            Confirm Entry Submission
          </button>
        </form>
      </Modal>

      {/* BWMT Delivery Modal */}
      <Modal isOpen={isBWMTModalOpen} onClose={() => setIsBWMTModalOpen(false)} title="B.W.M.T.A Delivery Form">
        <form onSubmit={handleBWMTSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Date of Report</label>
              <input 
                type="date" 
                value={bwmtForm.date}
                onChange={(e) => setBwmtForm({...bwmtForm, date: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Reporting For (Month)</label>
              <select 
                value={bwmtForm.month}
                onChange={(e) => setBwmtForm({...bwmtForm, month: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold outline-none"
                required
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Tonnage Total</label>
            <input 
              type="number" 
              step="0.01"
              value={bwmtForm.tonnage}
              onChange={(e) => setBwmtForm({...bwmtForm, tonnage: e.target.value})}
              className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold"
              placeholder="0.00"
              required
            />
          </div>

          <MultiSelect 
            label="Type of Waste"
            options={wasteOptionsBWMT}
            selected={bwmtForm.wasteTypes}
            onChange={(selected) => setBwmtForm({...bwmtForm, wasteTypes: selected})}
            placeholder="Select waste types..."
          />

          <button type="submit" className="w-full bg-secondary text-on-secondary py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-secondary/20 mt-4 active:scale-95 transition-all">
            Submit Delivery Report
          </button>
        </form>
      </Modal>

      {/* Manage Landfill Sites Modal */}
      <Modal isOpen={isSiteModalOpen} onClose={() => setIsSiteModalOpen(false)} title="Manage Landfill Sites">
        <div className="space-y-6">
          <form onSubmit={handleSiteSubmit} className="space-y-4 bg-surface-container/30 p-4 rounded-2xl border border-outline-variant/5">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Add New Site</h3>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Site Name</label>
              <input 
                type="text" 
                value={siteForm.name}
                onChange={(e) => setSiteForm({...siteForm, name: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-3 text-[13px] font-bold"
                placeholder="e.g. Richmond Landfill"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1 flex items-center justify-between">
                <span>Pin Location on Map</span>
                <span className="text-[8px] opacity-40 italic">{siteForm.location[0].toFixed(4)}, {siteForm.location[1].toFixed(4)}</span>
              </label>
              <div className="h-48 rounded-xl overflow-hidden border border-outline-variant/10">
                <MapContainer
                  center={siteForm.location}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                  <LocationMarker
                    position={siteForm.location}
                    setPosition={(pos) => setSiteForm({...siteForm, location: pos})}
                  />
                </MapContainer>
              </div>
            </div>

            <button type="submit" className="w-full bg-primary/10 text-primary py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/20 transition-all">
              Save Landfill Site
            </button>
          </form>

          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Registered Sites</h3>
            <div className="grid grid-cols-1 gap-2">
              {sites.map(site => (
                <div key={site.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                      <Warehouse className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold">{site.name}</p>
                      <p className="text-[9px] font-black opacity-30 uppercase tracking-tighter">
                        Lat: {site.location[0].toFixed(3)} • Lng: {site.location[1].toFixed(3)}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant/30 hover:text-error transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandfillManagement;
