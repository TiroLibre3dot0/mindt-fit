// src/utils/logCtaInteraction.js
import { db } from "../firebase/firebaseClient";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

export const logCTAInteraction = async (colorName, type, labelText) => {
  const docRef = doc(db, "ctaStats", colorName);
  const existing = await getDoc(docRef);

  if (!existing.exists()) {
    await setDoc(docRef, {
      views: 0,
      clicks: 0,
      label: labelText,
      lastUpdate: serverTimestamp(), // ← iniziale
    });
  }

  await updateDoc(docRef, {
    [type]: increment(1),
    label: labelText, // ← sovrascrive sempre l’ultimo testo mostrato
    lastUpdate: serverTimestamp(), // ← aggiorna la data
  });
};
