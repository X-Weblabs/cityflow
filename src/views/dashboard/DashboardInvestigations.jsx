import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { InvestigationModule } from '../../components/operator/TaskModules';
import { addComplaintInvestigation, subscribeToComplaintInvestigations } from '../../services/db';

const DashboardInvestigations = () => {
  const [investigations, setInvestigations] = useState([]);
  const [complaintForm, setComplaintForm] = useState({
    complainantName: '',
    category: 'Illegal Dumping',
    location: '',
    findings: '',
    actionTaken: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    const unsub = subscribeToComplaintInvestigations(setInvestigations);
    return () => unsub();
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      await addComplaintInvestigation(complaintForm);
      setComplaintForm({ 
        complainantName: '', category: 'Illegal Dumping', location: '', findings: '', actionTaken: '', 
        date: format(new Date(), 'yyyy-MM-dd') 
      });
      alert('Investigation report submitted!');
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline font-black text-2xl text-on-surface uppercase tracking-tight">Complaint Investigations</h1>
        <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Citizen Grievance Resolution</p>
      </div>

      <InvestigationModule 
        complaintForm={complaintForm}
        setComplaintForm={setComplaintForm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default DashboardInvestigations;
