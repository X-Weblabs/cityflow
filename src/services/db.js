import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../config/firebase";

// --- Tickets ---
export const addTicket = async (ticketData) => {
  const ticketsRef = collection(db, 'tickets');
  await addDoc(ticketsRef, {
    ...ticketData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToTickets = (callback) => {
  const ticketsRef = collection(db, 'tickets');
  const q = query(ticketsRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const ticketArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || Date.now()
    }));
    callback(ticketArray);
  });
  return unsubscribe;
};

export const updateTicket = async (ticketId, updates) => {
  const ticketRef = doc(db, 'tickets', ticketId);
  await updateDoc(ticketRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// --- Fleet ---
export const addVehicle = async (vehicleData) => {
  const fleetRef = collection(db, 'fleet');
  await addDoc(fleetRef, {
    ...vehicleData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToFleet = (callback) => {
  const fleetRef = collection(db, 'fleet');
  const q = query(fleetRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fleetArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(fleetArray);
  });
  return unsubscribe;
};

export const deleteVehicle = async (vehicleId) => {
  await deleteDoc(doc(db, 'fleet', vehicleId));
};

export const updateVehicle = async (vehicleId, updates) => {
  const vehicleRef = doc(db, 'fleet', vehicleId);
  await updateDoc(vehicleRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// --- Fleet Team ---
export const addTeamMember = async (memberData) => {
  const teamRef = collection(db, 'fleet_team');
  await addDoc(teamRef, {
    ...memberData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToTeam = (callback) => {
  const teamRef = collection(db, 'fleet_team');
  const q = query(teamRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const teamArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(teamArray);
  });
  return unsubscribe;
};

export const deleteTeamMember = async (memberId) => {
  await deleteDoc(doc(db, 'fleet_team', memberId));
};

export const updateTeamMember = async (memberId, updates) => {
  const memberRef = doc(db, 'fleet_team', memberId);
  await updateDoc(memberRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// --- Landfill Entries ---
export const addLandfillEntry = async (entryData) => {
  const entriesRef = collection(db, 'landfill_entries');
  await addDoc(entriesRef, {
    ...entryData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToLandfillEntries = (callback) => {
  const entriesRef = collection(db, 'landfill_entries');
  const q = query(entriesRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const entriesArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || Date.now()
    }));
    callback(entriesArray);
  });
  return unsubscribe;
};

// --- BWMT Deliveries ---
export const addBWMTDelivery = async (deliveryData) => {
  const deliveriesRef = collection(db, 'bwmt_deliveries');
  await addDoc(deliveriesRef, {
    ...deliveryData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToBWMTDeliveries = (callback) => {
  const deliveriesRef = collection(db, 'bwmt_deliveries');
  const q = query(deliveriesRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const deliveriesArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || Date.now()
    }));
    callback(deliveriesArray);
  });
  return unsubscribe;
};

// --- Landfill Sites ---
export const addLandfillSite = async (siteData) => {
  const sitesRef = collection(db, 'landfill_sites');
  await addDoc(sitesRef, {
    ...siteData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToLandfillSites = (callback) => {
  const sitesRef = collection(db, 'landfill_sites');
  const q = query(sitesRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const sitesArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(sitesArray);
  });
  return unsubscribe;
};

// --- Supervisors ---
export const addSupervisor = async (supervisorData) => {
  const supervisorsRef = collection(db, 'supervisors');
  await addDoc(supervisorsRef, {
    ...supervisorData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToSupervisors = (callback) => {
  const supervisorsRef = collection(db, 'supervisors');
  const q = query(supervisorsRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const supervisorsArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(supervisorsArray);
  });
  return unsubscribe;
};

export const deleteSupervisor = async (supervisorId) => {
  await deleteDoc(doc(db, 'supervisors', supervisorId));
};

export const updateSupervisor = async (supervisorId, updates) => {
  const supervisorRef = doc(db, 'supervisors', supervisorId);
  await updateDoc(supervisorRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// --- Vehicle Issues ---
export const addVehicleIssue = async (issueData) => {
  const issuesRef = collection(db, 'vehicle_issues');
  await addDoc(issuesRef, {
    ...issueData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToVehicleIssues = (callback) => {
  const issuesRef = collection(db, 'vehicle_issues');
  const q = query(issuesRef, orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const issuesArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || Date.now()
    }));
    callback(issuesArray);
  });
  return unsubscribe;
};
