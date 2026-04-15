import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Warehouse, 
  Dog, 
  ClipboardCheck, 
  ListTodo, 
  Search,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { 
  subscribeToFleet,
  subscribeToLandfillEntries,
  subscribeToBWMTDeliveries,
  addLandfillEntry,
  addBWMTDelivery,
  subscribeToLandfillSites,
  subscribeToSupervisors,
  addDogNotice,
  subscribeToDogNotices,
  addInspection,
  subscribeToInspections,
  subscribeToTasksFollowUp,
  addComplaintInvestigation,
  subscribeToComplaintInvestigations,
  addSupervisorComplaint,
  subscribeToSupervisorComplaints,
  updateRecordStatus
} from '../services/db';
import OperatorSidebar from '../components/OperatorSidebar';
import OperatorTopNav from '../components/OperatorTopNav';

// Extracted Modules
import { LandfillModule } from '../components/operator/LandfillModule';
import { DogNoticeModule } from '../components/operator/DogNoticeModule';
import { InspectionModule } from '../components/operator/InspectionModule';
import { TaskFollowUpModule, InvestigationModule } from '../components/operator/TaskModules';
import { SupervisorComplaintModule } from '../components/operator/SupervisorComplaintModule';

const OperatorPortal = () => {
  const [fleet, setFleet] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeSection, setActiveSection] = useState('landfill');
  const [activeLandfillTab, setActiveLandfillTab] = useState('recycling');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Data States
  const [entries, setEntries] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [sites, setSites] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [dogNotices, setDogNotices] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [investigations, setInvestigations] = useState([]);
  const [supervisorComplaints, setSupervisorComplaints] = useState([]);

  // Task Search State
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [taskCategory, setTaskCategory] = useState('landfill');
  const [selectedTaskRecord, setSelectedTaskRecord] = useState(null);

  // Form States
  const [recyclingForm, setRecyclingForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    name: '',
    regNumber: '',
    registrationNumber: '',
    tonnage: '',
    wasteTypes: [],
    destination: '',
    supervisor: ''
  });

  const [bwmtForm, setBwmtForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    month: format(new Date(), 'MMMM'),
    tonnage: '',
    wasteTypes: [],
    supervisor: ''
  });

  const [dogForm, setDogForm] = useState({
    ownerName: '',
    address: '',
    dogDescription: '',
    noticeType: 'Unlicensed',
    actionTaken: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const [inspectionForm, setInspectionForm] = useState({
    facilityName: '',
    location: '',
    inspectionType: 'Routine',
    condition: '3',
    issues: '',
    inspectorName: 'John Smith'
  });

  const [complaintForm, setComplaintForm] = useState({
    complainantName: '',
    category: 'Illegal Dumping',
    location: '',
    findings: '',
    actionTaken: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

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
    const unsubFleet = subscribeToFleet(setFleet);
    const unsubEntries = subscribeToLandfillEntries(setEntries);
    const unsubDeliveries = subscribeToBWMTDeliveries(setDeliveries);
    const unsubSites = subscribeToLandfillSites(setSites);
    const unsubSupervisors = subscribeToSupervisors(setSupervisors);
    const unsubDogs = subscribeToDogNotices(setDogNotices);
    const unsubInspections = subscribeToInspections(setInspections);
    const unsubTasks = subscribeToTasksFollowUp(setTasks);
    const unsubInvestigations = subscribeToComplaintInvestigations(setInvestigations);
    const unsubSupComplaints = subscribeToSupervisorComplaints(setSupervisorComplaints);
    
    const savedVehicle = localStorage.getItem('operatorVehicle');
    if (savedVehicle) setSelectedVehicle(savedVehicle);

    return () => {
      unsubFleet(); unsubEntries(); unsubDeliveries(); unsubSites(); 
      unsubSupervisors(); unsubDogs(); unsubInspections(); 
      unsubTasks(); unsubInvestigations(); unsubSupComplaints();
    };
  }, []);

  useEffect(() => {
    if (selectedVehicle) {
      localStorage.setItem('operatorVehicle', selectedVehicle);
      setRecyclingForm(prev => ({ ...prev, regNumber: selectedVehicle }));
    }
  }, [selectedVehicle]);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      switch(type) {
        case 'recycling':
          await addLandfillEntry({ ...recyclingForm, wasteTypes: recyclingForm.wasteTypes.map(t => t.text) });
          setRecyclingForm({ ...recyclingForm, name: '', registrationNumber: '', tonnage: '', wasteTypes: [], destination: '', supervisor: '' });
          break;
        case 'bwmt':
          await addBWMTDelivery({ ...bwmtForm, wasteTypes: bwmtForm.wasteTypes.map(t => t.text) });
          setBwmtForm({ ...bwmtForm, tonnage: '', wasteTypes: [], supervisor: '' });
          break;
        case 'dog':
          await addDogNotice(dogForm);
          setDogForm({ ownerName: '', address: '', dogDescription: '', noticeType: 'Unlicensed', actionTaken: '', date: format(new Date(), 'yyyy-MM-dd') });
          break;
        case 'inspection':
          await addInspection(inspectionForm);
          setInspectionForm({ facilityName: '', location: '', inspectionType: 'Routine', condition: '3', issues: '', inspectorName: 'John Smith' });
          break;
        case 'complaint':
          await addComplaintInvestigation(complaintForm);
          setComplaintForm({ complainantName: '', category: 'Illegal Dumping', location: '', findings: '', actionTaken: '', date: format(new Date(), 'yyyy-MM-dd') });
          break;
        case 'sup_complaint':
          await addSupervisorComplaint(supComplaintForm);
          setSupComplaintForm({
            dateReceived: format(new Date(), 'yyyy-MM-dd'),
            complainantName: '', complainantDetails: '', complaintType: 'Animal Complaint',
            natureOfComplaint: '', accusedDetails: '', supervisorName: '', dateActioned: '',
            actionTaken: '', intimationGiven: 'No', intimationNumber: '', dogNoticeGiven: 'No',
            dogNoticeNumber: '', ticketGiven: 'No', ticketNumber: '', tfPromptDate: '', wasteType: '', wasteVolume: ''
          });
          break;
      }
      alert(`${type.split('_').join(' ')} record submitted successfully!`);
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  const handleResolve = async (collectionName, id) => {
    if (window.confirm('Mark this record as resolved?')) {
      await updateRecordStatus(collectionName, id, 'Resolved');
      setSelectedTaskRecord(null);
      alert('Record updated successfully.');
    }
  };

  const wasteOptionsEntry = [
    { text: 'Glass (Aluminium)', value: 'glass' }, { text: 'Pet/Plastic bottles', value: 'pet' },
    { text: 'Clear plastic', value: 'clear_plastic' }, { text: 'Cardboard', value: 'cardboard' },
    { text: 'Rubber', value: 'rubber' }, { text: 'Sack', value: 'sack' }, { text: 'Metals', value: 'metals' }
  ];

  const wasteOptionsBWMT = [
    { text: 'Food', value: 'food' }, { text: 'Garden', value: 'garden' },
    { text: 'Paper', value: 'paper' }, { text: 'Textile', value: 'textile' },
    { text: 'Nappies', value: 'nappies' }, { text: 'Metals', value: 'metals_bwmt' },
    { text: 'Rubber & Leather', value: 'rubber_leather' }, { text: 'Glass', value: 'glass_bwmt' },
    { text: 'Domestic', value: 'domestic' }, { text: 'Organic', value: 'organic' },
    { text: 'Industrial SWM', value: 'industrial' }
  ];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (!selectedVehicle) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-2xl p-6 text-center text-on-surface">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-5">
            <Truck className="w-7 h-7" />
          </div>
          <h1 className="text-lg font-headline font-black mb-1">Vehicle Check-in</h1>
          <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-6">Select assigned unit to start</p>
          <div className="space-y-2">
            {fleet.map(v => (
              <button key={v.id} onClick={() => setSelectedVehicle(v.id)} className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/5 transition-all group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="font-mono font-black text-xs">{v.id}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  const SectionTitle = ({ title, subtitle, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-lg font-headline font-black text-on-surface">{title}</h2>
        <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">{subtitle}</p>
      </div>
    </div>
  );

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

  const renderSection = () => {
    switch(activeSection) {
      case 'landfill':
        return (
          <>
            <SectionTitle title="Landfill Activities" subtitle="Operations & Waste Flow" icon={Warehouse} />
            <LandfillModule 
              activeTab={activeLandfillTab} setActiveTab={setActiveLandfillTab}
              recyclingForm={recyclingForm} setRecyclingForm={setRecyclingForm}
              bwmtForm={bwmtForm} setBwmtForm={setBwmtForm}
              supervisors={supervisors} sites={sites}
              handleSubmit={handleSubmit}
              wasteOptionsEntry={wasteOptionsEntry} wasteOptionsBWMT={wasteOptionsBWMT}
              months={months}
            />
          </>
        );
      case 'dog':
        return (
          <>
            <SectionTitle title="Dog Notice Management" subtitle="Animal Control & Compliance" icon={Dog} />
            <DogNoticeModule dogForm={dogForm} setDogForm={setDogForm} handleSubmit={handleSubmit} />
          </>
        );
      case 'inspection':
        return (
          <>
            <SectionTitle title="Public Convenience & Inspection" subtitle="Facility Health & Safety" icon={ClipboardCheck} />
            <InspectionModule inspectionForm={inspectionForm} setInspectionForm={setInspectionForm} handleSubmit={handleSubmit} />
          </>
        );
      case 'tasks':
        return (
          <>
            <SectionTitle title="Tasks Follow Up" subtitle="Historical Record Resolution" icon={ListTodo} />
            <TaskFollowUpModule
              taskCategory={taskCategory} setTaskCategory={setTaskCategory}
              taskSearchQuery={taskSearchQuery} setTaskSearchQuery={setTaskSearchQuery}
              filterRecords={filterRecords}
              selectedTaskRecord={selectedTaskRecord} setSelectedTaskRecord={setSelectedTaskRecord}
              handleResolve={handleResolve}
            />
          </>
        );
       case 'supervisor_complaints':
        return (
          <>
            <SectionTitle title="Supervisor Complaints" subtitle="Administration & Public Grievance" icon={ClipboardCheck} />
            <SupervisorComplaintModule 
              supComplaintForm={supComplaintForm} setSupComplaintForm={setSupComplaintForm}
              supervisors={supervisors} handleSubmit={handleSubmit}
            />
          </>
        );
      case 'complaints':
        return (
          <>
            <SectionTitle title="Complaint Investigations" subtitle="Citizen Grievance Resolution" icon={Search} />
            <InvestigationModule complaintForm={complaintForm} setComplaintForm={setComplaintForm} handleSubmit={handleSubmit} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface selection:bg-primary/10 selection:text-primary">
      <OperatorSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        selectedVehicle={selectedVehicle} 
        className="hidden lg:flex"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <OperatorTopNav 
          toggleMobileSidebar={() => setIsMobileSidebarOpen(true)} 
          selectedVehicle={selectedVehicle} 
        />
        
        <main className="flex-1 p-4 lg:p-6 max-w-[1200px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay — backdrop and drawer are separate keyed children */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            key="sidebar-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 left-0 bottom-0 w-[260px] bg-surface-container-lowest z-[120] lg:hidden shadow-2xl"
          >
            <OperatorSidebar 
              activeSection={activeSection} 
              setActiveSection={(s) => { setActiveSection(s); setIsMobileSidebarOpen(false); }} 
              selectedVehicle={selectedVehicle} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperatorPortal;
