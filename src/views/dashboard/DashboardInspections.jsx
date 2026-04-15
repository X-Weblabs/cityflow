import React, { useState, useEffect } from 'react';
import { subscribeToInspections } from '../../services/db';
import { RecordListViewer } from '../../components/dashboard/RecordListViewer';
import { RecordDetailModal } from '../../components/dashboard/RecordDetailModal';

const DashboardInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const unsub = subscribeToInspections(setInspections);
    return () => unsub();
  }, []);

  const columns = [
    { key: 'facilityName', label: 'Facility Name', subKey: 'location' },
    { key: 'inspectionType', label: 'Type' },
    { key: 'condition', label: 'Condition', render: (val) => (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <div key={star} className={`w-2 h-2 rounded-full ${star <= parseInt(val) ? 'bg-secondary' : 'bg-surface-container-highest'}`} />
        ))}
        <span className="text-[10px] font-bold ml-1">{val}/5</span>
      </div>
    )},
    { key: 'inspectorName', label: 'Inspector' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`text-[10px] font-black uppercase ${val === 'Resolved' ? 'text-secondary' : 'text-primary'}`}>
        {val || 'Pending'}
      </span>
    )}
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <RecordListViewer 
        title="Facility Inspections"
        subtitle="Public Convenience Health & Safety Audit"
        records={inspections}
        columns={columns}
        onRowClick={setSelectedRecord}
      />
      <RecordDetailModal 
        record={selectedRecord}
        title="Inspection Record"
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

export default DashboardInspections;
