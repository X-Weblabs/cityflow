import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { LandfillModule } from '../../components/operator/LandfillModule';
import { 
  addLandfillEntry, 
  addBWMTDelivery, 
  subscribeToLandfillSites, 
  subscribeToSupervisors 
} from '../../services/db';

const DashboardLandfillActivities = () => {
  const [activeTab, setActiveTab] = useState('recycling');
  const [sites, setSites] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  // Form States
  const [recyclingForm, setRecyclingForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    name: '', registrationNumber: '', tonnage: '', wasteTypes: [], destination: '', supervisor: ''
  });

  const [bwmtForm, setBwmtForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    month: format(new Date(), 'MMMM'),
    tonnage: '', wasteTypes: [], supervisor: ''
  });

  useEffect(() => {
    const unsubSites = subscribeToLandfillSites(setSites);
    const unsubSupers = subscribeToSupervisors(setSupervisors);
    return () => { unsubSites(); unsubSupers(); };
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      if (type === 'recycling') {
        await addLandfillEntry({ ...recyclingForm, wasteTypes: recyclingForm.wasteTypes.map(t => t.text) });
        setRecyclingForm({ ...recyclingForm, name: '', registrationNumber: '', tonnage: '', wasteTypes: [], destination: '', supervisor: '' });
      } else {
        await addBWMTDelivery({ ...bwmtForm, wasteTypes: bwmtForm.wasteTypes.map(t => t.text) });
        setBwmtForm({ ...bwmtForm, tonnage: '', wasteTypes: [], supervisor: '' });
      }
      alert('Record submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  const wasteOptionsEntry = [
    { text: 'Glass (Aluminium)', value: 'glass' }, { text: 'Pet/Plastic bottles', value: 'pet' },
    { text: 'Clear plastic', value: 'clear_plastic' }, { text: 'Cardboard', value: 'cardboard' },
    { text: 'Rubber', value: 'rubber' }, { text: 'Sack', value: 'sack' }, { text: 'Metals', value: 'metals' }
  ];

  const wasteOptionsBWMT = [
    { text: 'Food', value: 'food' }, { text: 'Garden', value: 'garden' },
    { text: 'Paper', value: 'paper' }, { text: 'Textile', value: 'textile' },
    { text: 'Nappies', value: 'nappies' }, { text: 'Metals', value: 'metals_bwmt' },
    { text: 'Rubber & Leather', value: 'rubber_leather' }, { text: 'Glass', value: 'glass_bwmt' },
    { text: 'Domestic', value: 'domestic' }, { text: 'Organic', value: 'organic' },
    { text: 'Industrial SWM', value: 'industrial' }
  ];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline font-black text-2xl text-on-surface uppercase tracking-tight">Landfill Activities</h1>
        <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Operations & Waste Flow</p>
      </div>

      <LandfillModule 
        activeTab={activeTab} setActiveTab={setActiveTab}
        recyclingForm={recyclingForm} setRecyclingForm={setRecyclingForm}
        bwmtForm={bwmtForm} setBwmtForm={setBwmtForm}
        supervisors={supervisors} sites={sites}
        handleSubmit={handleSubmit}
        wasteOptionsEntry={wasteOptionsEntry} wasteOptionsBWMT={wasteOptionsBWMT}
        months={months}
      />
    </div>
  );
};

export default DashboardLandfillActivities;
