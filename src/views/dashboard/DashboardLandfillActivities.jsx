import React, { useState, useEffect } from 'react';
import { subscribeToLandfillEntries, subscribeToBWMTDeliveries } from '../../services/db';
import { RecordListViewer } from '../../components/dashboard/RecordListViewer';
import { RecordDetailModal } from '../../components/dashboard/RecordDetailModal';

const DashboardLandfillActivities = () => {
  const [activeTab, setActiveTab] = useState('recycling');
  const [entries, setEntries] = useState([]);
  const [bwmtDeliveries, setBwmtDeliveries] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const unsubEntries = subscribeToLandfillEntries(setEntries);
    const unsubBwmt = subscribeToBWMTDeliveries(setBwmtDeliveries);
    return () => { unsubEntries(); unsubBwmt(); };
  }, []);

  const recyclingColumns = [
    { key: 'name', label: 'Company / Owner', subKey: 'registrationNumber' },
    { key: 'date', label: 'Date' },
    { key: 'tonnage', label: 'Weight (t)', render: (val) => (
      <span className="font-black text-primary">{val}t</span>
    )},
    { key: 'destination', label: 'Site' },
    { key: 'supervisor', label: 'Supervisor' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
        val === 'Resolved' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
      }`}>{val || 'Active'}</span>
    )},
  ];

  const bwmtColumns = [
    { key: 'month', label: 'Month' },
    { key: 'date', label: 'Date' },
    { key: 'tonnage', label: 'Tonnage (t)', render: (val) => (
      <span className="font-black text-secondary">{val}t</span>
    )},
    { key: 'supervisor', label: 'Supervisor' },
    { key: 'wasteTypes', label: 'Waste Categories', render: (val) => (
      <span className="text-[11px] font-bold opacity-60">
        {Array.isArray(val) ? val.join(', ') : val}
      </span>
    )},
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-headline font-black text-xl md:text-2xl text-on-surface uppercase tracking-tight">Landfill Activities</h1>
        <p className="text-[11px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Operations &amp; Waste Flow Records</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 p-1 bg-surface-container/30 rounded-xl w-fit border border-outline-variant/10">
        <button
          onClick={() => setActiveTab('recycling')}
          className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
            activeTab === 'recycling' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant/60 hover:text-on-surface'
          }`}
        >
          Waste Recycling ({entries.length})
        </button>
        <button
          onClick={() => setActiveTab('bwmt')}
          className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
            activeTab === 'bwmt' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant/60 hover:text-on-surface'
          }`}
        >
          BWMT Deliveries ({bwmtDeliveries.length})
        </button>
      </div>

      {activeTab === 'recycling' ? (
        <RecordListViewer
          title="Recycling Entries"
          subtitle="Waste Recycling Activity Log"
          records={entries}
          columns={recyclingColumns}
          onRowClick={setSelectedRecord}
        />
      ) : (
        <RecordListViewer
          title="BWMT Deliveries"
          subtitle="Bulawayo Waste Management Trust — Delivery Records"
          records={bwmtDeliveries}
          columns={bwmtColumns}
          onRowClick={setSelectedRecord}
        />
      )}

      <RecordDetailModal
        record={selectedRecord}
        title={activeTab === 'recycling' ? 'Recycling Entry' : 'BWMT Delivery'}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

export default DashboardLandfillActivities;
