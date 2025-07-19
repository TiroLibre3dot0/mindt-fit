// useBurnoutMetadata.js
import { useState } from "react";
// ⚠️ Assicurati di configurare Firebase prima di attivare Firestore
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

const useBurnoutMetadata = () => {
  const [metadata, setMetadata] = useState({
    startTime: Date.now(),
    answersTimestamps: {},
    userSector: "", // potrà essere valorizzato in futuro
    dateTaken: new Date(),
    inconsistentAnswers: false,
    emotionalVariations: [], // da integrare con UI/UX dinamica
    previousResult: null,    // da caricare quando disponibile
    insightsHistory: [],     // da usare dopo la generazione AI
  });

  const startTimer = (questionId) => {
    setMetadata((prev) => ({
      ...prev,
      answersTimestamps: {
        ...prev.answersTimestamps,
        [`${questionId}_start`]: Date.now(),
      },
    }));
  };

  const stopTimer = (questionId) => {
    const now = Date.now();
    const start = metadata.answersTimestamps[`${questionId}_start`] || now;
    const timeTaken = now - start;

    setMetadata((prev) => ({
      ...prev,
      answersTimestamps: {
        ...prev.answersTimestamps,
        [questionId]: timeTaken,
      },
    }));
  };

  const setUserSector = (sector) => {
    setMetadata((prev) => ({ ...prev, userSector: sector }));
  };

  const addEmotionalVariation = (note) => {
    setMetadata((prev) => ({
      ...prev,
      emotionalVariations: [...prev.emotionalVariations, note],
    }));
  };

  const addInsight = (insight) => {
    setMetadata((prev) => ({
      ...prev,
      insightsHistory: [...prev.insightsHistory, insight],
    }));
  };

  const checkConsistency = (answers) => {
    const values = Object.values(answers);
    const allSame = values.every((val) => val === values[0]);
    if (allSame) {
      setMetadata((prev) => ({ ...prev, inconsistentAnswers: true }));
    }
  };

  // 🔐 Salvataggio futuro su Firestore
  const saveMetadataToFirestore = async (userId) => {
    try {
      // const docRef = await addDoc(collection(db, "burnoutMetadata"), {
      //   userId,
      //   ...metadata,
      // });
      // console.log("🟢 Metadata salvati con ID:", docRef.id);
    } catch (error) {
      console.error("❌ Errore salvataggio metadata:", error);
    }
  };

  return {
    metadata,
    startTimer,
    stopTimer,
    setUserSector,
    addEmotionalVariation,
    addInsight,
    checkConsistency,
    saveMetadataToFirestore,
  };
};

export default useBurnoutMetadata;
