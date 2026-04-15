import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DogNoticeModule } from '../../components/operator/DogNoticeModule';
import { addDogNotice, subscribeToDogNotices } from '../../services/db';

const DashboardDogNotice = () => {
  const [dogNotices, setDogNotices] = useState([]);
  const [dogForm, setDogForm] = useState({
    ownerName: '',
    address: '',
    dogDescription: '',
    noticeType: 'Unlicensed',
    actionTaken: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    const unsub = subscribeToDogNotices(setDogNotices);
    return () => unsub();
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      await addDogNotice(dogForm);
      setDogForm({ 
        ownerName: '', 
        address: '', 
        dogDescription: '', 
        noticeType: 'Unlicensed', 
        actionTaken: '', 
        date: format(new Date(), 'yyyy-MM-dd') 
      });
      alert('Dog notice submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline font-black text-2xl text-on-surface uppercase tracking-tight">Dog Notice Management</h1>
        <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Animal Control & Compliance</p>
      </div>

      <DogNoticeModule 
        dogForm={dogForm} 
        setDogForm={setDogForm} 
        handleSubmit={handleSubmit} 
      />
      
      {/* Optional: Add a history table below if needed, but the user just wanted the content from the operator screen */}
    </div>
  );
};

export default DashboardDogNotice;
