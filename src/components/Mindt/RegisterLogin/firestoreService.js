import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

export const saveUserProfile = async (uid, data) => {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  });
};

export const updateLastLogin = async (uid) => {
  await updateDoc(doc(db, "users", uid), {
    lastLogin: serverTimestamp(),
  });
};
