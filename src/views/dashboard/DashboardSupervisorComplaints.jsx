import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { SupervisorComplaintModule } from '../../components/operator/SupervisorComplaintModule';
import { addSupervisorComplaint, subscribeToSupervisors } from '../../services/db';

const DashboardSupervisorComplaints = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [supComplaintForm, setSupComplaintForm] = useState({
    dateReceived: format(new Date(), 'yyyy-MM-dd'),
    complainantName: '',
    complainantDetails: '',
    complaintType: 'Animal Complaint',
    natureOfComplaint: '',
    accusedDetails: '',
    supervisorName: '',
    dateActioned: '',
    actionTaken: '',
    intimationGiven: 'No',
    intimationNumber: '',
    dogNoticeGiven: 'No',
    dogNoticeNumber: '',
    ticketGiven: 'No',
    ticketNumber: '',
    tfPromptDate: '',
    wasteType: '',
    wasteVolume: ''
  });

  useEffect(() => {
    const unsub = subscribeToSupervisors(setSupervisors);
    return () => unsub();
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      await addSupervisorComplaint(supComplaintForm);
      setSupComplaintForm({
        dateReceived: format(new Date(), 'yyyy-MM-dd'),
        complainantName: '', complainantDetails: '', complaintType: 'Animal Complaint',
        natureOfComplaint: '', accusedDetails: '', supervisorName: '', dateActioned: '',
        actionTaken: '', intimationGiven: 'No', intimationNumber: '', dogNoticeGiven: 'No',
        dogNoticeNumber: '', ticketGiven: 'No', ticketNumber: '', tfPromptDate: '', wasteType: '', wasteVolume: ''
      });
      alert('Supervisor complaint submitted!');
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline font-black text-2xl text-on-surface uppercase tracking-tight">Supervisor Complaints</h1>
        <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Administration & Public Grievance</p>
      </div>

      <SupervisorComplaintModule 
        supComplaintForm={supComplaintForm}
        setSupComplaintForm={setSupComplaintForm}
        supervisors={supervisors}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default DashboardSupervisorComplaints;
