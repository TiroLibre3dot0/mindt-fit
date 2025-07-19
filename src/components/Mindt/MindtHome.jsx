// src/components/Mindt/MindtHome.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import StartButton from "./StartButton";

const translations = {
  it: {
    start: "Inizia la valutazione",
    disclaimer: "⚠️ Questa valutazione non sostituisce un consulto medico professionale.",
  },
  en: {
    start: "Start the assessment",
    disclaimer: "⚠️ This assessment is not a substitute for professional medical advice.",
  },
  es: {
    start: "Iniciar evaluación",
    disclaimer: "⚠️ Esta evaluación no sustituye el consejo médico profesional.",
  },
};

const MindtHome = ({ onStart }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="text-center mt-6">
      <StartButton onStart={onStart} />
      <p className="mt-6 text-sm text-zinc-400 italic">{t.disclaimer}</p>
    </div>
  );
};

export default MindtHome;
