import React, { useState, useEffect } from 'react';
import { subscribeToComplaintInvestigations } from '../../services/db';
import { RecordListViewer } from '../../components/dashboard/RecordListViewer';
import { RecordDetailModal } from '../../components/dashboard/RecordDetailModal';

const DashboardInvestigations = () => {
  const [investigations, setInvestigations] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const unsub = subscribeToComplaintInvestigations(setInvestigations);
    return () => unsub();
  }, []);

  const columns = [
    { key: 'complainantName', label: 'Complainant', subKey: 'location' },
    { key: 'category', label: 'Category', render: (val) => (
      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-black uppercase">
        {val}
      </span>
    )},
    { key: 'findings', label: 'Field Findings' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`text-[10px] font-black uppercase ${val === 'Resolved' ? 'text-secondary' : 'text-primary'}`}>
        {val || 'Pending'}
      </span>
    )}
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <RecordListViewer 
        title="Complaint Investigations"
        subtitle="Citizen Grievance & Field Resolution Tracking"
        records={investigations}
        columns={columns}
        onRowClick={setSelectedRecord}
      />
      <RecordDetailModal 
        record={selectedRecord}
        title="Investigation Record"
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

export default DashboardInvestigations;
