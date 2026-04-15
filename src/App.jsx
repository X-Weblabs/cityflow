import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CitizenPortal from './views/CitizenPortal';
import RecycleMap from './views/RecycleMap';
import RecyclingGuide from './views/RecyclingGuide';
import ReportCategory from './views/report/ReportCategory';
import ReportDetails from './views/report/ReportDetails';
import ReportReview from './views/report/ReportReview';
import ReportSuccess from './views/report/ReportSuccess';

// Dashboard Imports
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './views/dashboard/DashboardOverview';
import OfficialProfile from './views/dashboard/OfficialProfile';
import FleetMaintenance from './views/dashboard/FleetMaintenance';
import ServiceReports from './views/dashboard/ServiceReports';
import BinMonitoring from './views/dashboard/BinMonitoring';
import RecyclingAnalytics from './views/dashboard/RecyclingAnalytics';
import LandfillManagement from './views/dashboard/LandfillManagement';
import DashboardLandfillActivities from './views/dashboard/DashboardLandfillActivities';
import DashboardDogNotice from './views/dashboard/DashboardDogNotice';
import DashboardSupervisorComplaints from './views/dashboard/DashboardSupervisorComplaints';
import DashboardInvestigations from './views/dashboard/DashboardInvestigations';
import DashboardTasks from './views/dashboard/DashboardTasks';
import DashboardInspections from './views/dashboard/DashboardInspections';
import OperatorPortal from './views/OperatorPortal';

function App() {
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryLabel: '',
    description: '',
    photos: [],
    location: {
      address: 'Jason Moyo Ave, Bulawayo Central',
      lat: -20.1500,
      lng: 28.5833
    },
    status: 'pending'
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const resetForm = () => {
    setFormData({
      categoryId: '',
      categoryLabel: '',
      description: '',
      photos: [],
      location: {
        address: 'Jason Moyo Ave, Bulawayo Central',
        lat: -20.1500,
        lng: 28.5833
      },
      status: 'pending'
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Citizen Portal Routes */}
        <Route path="/" element={<CitizenPortal updateFormData={updateFormData} />} />
        <Route path="/map" element={<RecycleMap />} />
        <Route path="/guide" element={<RecyclingGuide />} />
        <Route 
          path="/report/step-1" 
          element={<ReportCategory formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/report/step-2" 
          element={<ReportDetails formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/report/step-3" 
          element={<ReportReview formData={formData} updateFormData={updateFormData} resetForm={resetForm} />} 
        />
        <Route 
          path="/report/success" 
          element={<ReportSuccess resetForm={resetForm} />} 
        />

        {/* Operator Portal */}
        <Route path="/operator" element={<OperatorPortal />} />

        {/* City Council Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<OfficialProfile />} />
          <Route path="fleet" element={<FleetMaintenance />} />
          <Route path="reports" element={<ServiceReports />} />
          <Route path="bins" element={<BinMonitoring />} />
          <Route path="analytics" element={<RecyclingAnalytics />} />
          <Route path="landfill" element={<DashboardLandfillActivities />} />
          <Route path="dog-notices" element={<DashboardDogNotice />} />
          <Route path="supervisor-complaints" element={<DashboardSupervisorComplaints />} />
          <Route path="investigations" element={<DashboardInvestigations />} />
          <Route path="tasks" element={<DashboardTasks />} />
          <Route path="inspections" element={<DashboardInspections />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
