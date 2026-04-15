import React, { useState, useEffect } from 'react';
import { TaskFollowUpModule } from '../../components/operator/TaskModules';
import { 
  subscribeToLandfillEntries, 
  subscribeToDogNotices, 
  subscribeToInspections, 
  updateRecordStatus 
} from '../../services/db';

const DashboardTasks = () => {
  const [entries, setEntries] = useState([]);
  const [dogNotices, setDogNotices] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [taskCategory, setTaskCategory] = useState('landfill');
  const [selectedTaskRecord, setSelectedTaskRecord] = useState(null);

  useEffect(() => {
    const unsubEntries = subscribeToLandfillEntries(setEntries);
    const unsubDogs = subscribeToDogNotices(setDogNotices);
    const unsubInspections = subscribeToInspections(setInspections);
    return () => { unsubEntries(); unsubDogs(); unsubInspections(); };
  }, []);

  const filterRecords = () => {
    let dataset = [];
    let collName = '';
    if (taskCategory === 'landfill') { dataset = entries; collName = 'landfill_entries'; }
    else if (taskCategory === 'dog') { dataset = dogNotices; collName = 'dog_notices'; }
    else if (taskCategory === 'inspection') { dataset = inspections; collName = 'inspections'; }

    return dataset
      .filter(r => {
        const query = taskSearchQuery.toLowerCase();
        return (
          r.id?.toLowerCase().includes(query) || 
          r.name?.toLowerCase().includes(query) || 
          r.ownerName?.toLowerCase().includes(query) ||
          r.facilityName?.toLowerCase().includes(query)
        );
      })
      .map(r => ({ ...r, _coll: collName }));
  };

  const handleResolve = async (collectionName, id) => {
    if (window.confirm('Mark this record as resolved?')) {
      await updateRecordStatus(collectionName, id, 'Resolved');
      setSelectedTaskRecord(null);
      alert('Record updated successfully.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline font-black text-2xl text-on-surface uppercase tracking-tight">Tasks Follow Up</h1>
        <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Historical Record Resolution</p>
      </div>

      <TaskFollowUpModule 
        taskCategory={taskCategory} setTaskCategory={setTaskCategory}
        taskSearchQuery={taskSearchQuery} setTaskSearchQuery={setTaskSearchQuery}
        filterRecords={filterRecords}
        selectedTaskRecord={selectedTaskRecord} setSelectedTaskRecord={setSelectedTaskRecord}
        handleResolve={handleResolve}
      />
    </div>
  );
};

export default DashboardTasks;
