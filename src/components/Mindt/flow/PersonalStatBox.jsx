import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { FaChartBar } from "react-icons/fa";

const PersonalStatBox = ({ color }) => {
  const { language } = useLanguage();

  const content = {
    it: {
      title: "Il tuo stato attuale",
      text: "L'83% degli utenti con parametri simili ha beneficiato di un percorso di recupero guidato.",
    },
    en: {
      title: "Your current state",
      text: "83% of users with similar scores improved with a guided recovery program.",
    },
    es: {
      title: "Tu estado actual",
      text: "El 83% de los usuarios con valores similares mejoraron con un plan de recuperación guiado.",
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
      <div className="flex items-center gap-2 mb-2" style={{ color: color.text }}>
        <FaChartBar className="text-base" />
        <h3 className="text-sm font-semibold tracking-tight uppercase">
          {content[language].title}
        </h3>
      </div>
      <p className="text-xs mt-1" style={{ color: color.text }}>
        {content[language].text}
      </p>
    </div>
  );
};

export default PersonalStatBox;
