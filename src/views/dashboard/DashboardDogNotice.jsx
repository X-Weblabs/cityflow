import React, { useState, useEffect } from 'react';
import { subscribeToDogNotices } from '../../services/db';
import { RecordListViewer } from '../../components/dashboard/RecordListViewer';
import { RecordDetailModal } from '../../components/dashboard/RecordDetailModal';

const DashboardDogNotice = () => {
  const [dogNotices, setDogNotices] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const unsub = subscribeToDogNotices(setDogNotices);
    return () => unsub();
  }, []);

  const columns = [
    { key: 'ownerName', label: 'Owner Name', subKey: 'address' },
    { key: 'noticeType', label: 'Notice Type', render: (val) => (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
        val === 'Dangerous Dog' ? 'bg-error/10 text-error' : 
        val === 'Unlicensed' ? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'
      }`}>{val}</span>
    )},
    { key: 'dogDescription', label: 'Dog Description' },
    { key: 'date', label: 'Issued Date' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`text-[10px] font-black uppercase ${val === 'Resolved' ? 'text-secondary' : 'text-primary'}`}>
        {val || 'Pending'}
      </span>
    )}
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <RecordListViewer 
        title="Dog Notice Management"
        subtitle="Animal Control & Compliance Records"
        records={dogNotices}
        columns={columns}
        onRowClick={setSelectedRecord}
      />
      <RecordDetailModal 
        record={selectedRecord}
        title="Dog Notice"
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

export default DashboardDogNotice;
