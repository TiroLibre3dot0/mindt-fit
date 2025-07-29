import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

// Crea o aggiorna il documento utente
export const saveUserProfile = async (uid, data = {}) => {
  await setDoc(
    doc(db, "users", uid),
    {
      ...data,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    },
    { merge: true } // se esiste aggiorna, altrimenti crea
  );
};

// Solo aggiornamento lastLogin
export const updateLastLogin = async (uid) => {
  await setDoc(
    doc(db, "users", uid),
    {
      lastLogin: serverTimestamp(),
    },
    { merge: true }
  );
};
