// src/components/Mindt/StartButton.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const StartButton = ({ onStart }) => {
  const { language } = useLanguage();

  const labels = {
    it: "Inizia la valutazione",
    en: "Start the assessment",
    es: "Iniciar evaluación",
  };

  return (
    <button
      onClick={onStart}
      className="bg-[#e6a730] hover:bg-[#dca431] text-white font-semibold text-base sm:text-lg px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md transition-all"
    >
      {labels[language]}
    </button>
  );
};

export default StartButton;
