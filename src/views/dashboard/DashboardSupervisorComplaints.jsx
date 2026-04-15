import React, { useState, useEffect } from 'react';
import { subscribeToSupervisorComplaints } from '../../services/db';
import { RecordListViewer } from '../../components/dashboard/RecordListViewer';
import { RecordDetailModal } from '../../components/dashboard/RecordDetailModal';

const DashboardSupervisorComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const unsub = subscribeToSupervisorComplaints(setComplaints);
    return () => unsub();
  }, []);

  const columns = [
    { key: 'complainantName', label: 'Complainant', subKey: 'complainantDetails' },
    { key: 'complaintType', label: 'Type', render: (val) => (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
        val === 'Animal Complaint' ? 'bg-tertiary/10 text-tertiary' :
        val === 'Waste Complaint' ? 'bg-primary/10 text-primary' :
        'bg-surface-container-high text-on-surface-variant'
      }`}>{val}</span>
    )},
    { key: 'supervisorName', label: 'Supervisor' },
    { key: 'dateReceived', label: 'Date Received' },
    { key: 'natureOfComplaint', label: 'Nature' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
        val === 'Resolved' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
      }`}>{val || 'Pending'}</span>
    )},
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-headline font-black text-xl md:text-2xl text-on-surface uppercase tracking-tight">Supervisor Complaints</h1>
        <p className="text-[11px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Administration &amp; Public Grievance Records</p>
      </div>
      <RecordListViewer
        title="Complaint Register"
        subtitle="All Supervisor-Received Complaints"
        records={complaints}
        columns={columns}
        onRowClick={setSelectedRecord}
      />
      <RecordDetailModal 
        record={selectedRecord}
        title="Supervisor Complaint"
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

export default DashboardSupervisorComplaints;
