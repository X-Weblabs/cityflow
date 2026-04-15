import React, { useState, useEffect } from 'react';
import { InspectionModule } from '../../components/operator/InspectionModule';
import { addInspection, subscribeToInspections } from '../../services/db';

const DashboardInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [inspectionForm, setInspectionForm] = useState({
    facilityName: '',
    location: '',
    inspectionType: 'Routine',
    condition: '3',
    issues: '',
    inspectorName: 'John Smith'
  });

  useEffect(() => {
    const unsub = subscribeToInspections(setInspections);
    return () => unsub();
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      await addInspection(inspectionForm);
      setInspectionForm({ 
        facilityName: '', location: '', inspectionType: 'Routine', condition: '3', issues: '', 
        inspectorName: 'John Smith' 
      });
      alert('Inspection report submitted!');
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline font-black text-2xl text-on-surface uppercase tracking-tight">Public Convenience & Inspection</h1>
        <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Facility Health & Safety</p>
      </div>

      <InspectionModule 
        inspectionForm={inspectionForm}
        setInspectionForm={setInspectionForm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default DashboardInspections;
