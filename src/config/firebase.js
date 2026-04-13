import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5Sunos-wmTyXaPdpjnG-j8bpFSkDS58E",
  authDomain: "cityflowweb.firebaseapp.com",
  databaseURL: "https://cityflowweb-default-rtdb.firebaseio.com",
  projectId: "cityflowweb",
  storageBucket: "cityflowweb.firebasestorage.app",
  messagingSenderId: "279860233164",
  appId: "1:279860233164:web:fe8bbb29f6ed9c57dc9369"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
