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
