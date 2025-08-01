import React from "react";
import { useLanguage } from "../../../context/LanguageContext";

const RecoveryStatsBox = ({ color }) => {
  const { language } = useLanguage();

  const content = {
    it: {
      title: "Stima del recupero",
      text: "Con il tuo impegno, potresti ritrovare l'equilibrio in circa 3-4 settimane.",
      button: "Inizia ora",
    },
    en: {
      title: "Recovery estimation",
      text: "With commitment, you can regain balance in about 3-4 weeks.",
      button: "Start now",
    },
    es: {
      title: "Estimación de recuperación",
      text: "Con compromiso, podrías recuperar el equilibrio en unas 3-4 semanas.",
      button: "Empezar ahora",
    },
  };

  return (
    <div
      className="rounded-xl p-4 shadow-sm flex flex-col h-full justify-between"
      style={{
        backgroundColor: color.light,
        border: `1px solid ${color.main}`,
      }}
    >
      <h3 className="text-sm font-semibold text-[#224344] mb-2" style={{ color: color.text }}>
        {content[language].title}
      </h3>
      <p className="text-xs mt-1 leading-snug" style={{ color: color.text }}>
        {content[language].text}
      </p>
      <button
        className="mt-4 self-start px-4 py-1.5 text-xs font-medium rounded-lg transition"
        style={{
          backgroundColor: color.main,
          color: "#fff",
        }}
      >
        {content[language].button}
      </button>
    </div>
  );
};

export default RecoveryStatsBox;
