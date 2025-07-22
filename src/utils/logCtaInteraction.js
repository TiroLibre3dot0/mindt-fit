import { db } from "../firebase/firebaseClient";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

export const logCTAInteraction = async (colorName, type) => {
  const docRef = doc(db, "ctaStats", colorName);

  const existing = await getDoc(docRef);
  if (!existing.exists()) {
    await setDoc(docRef, {
      views: 0,
      clicks: 0,
    });
  }

  await updateDoc(docRef, {
    [type]: increment(1), // type = "views" o "clicks"
  });
};
