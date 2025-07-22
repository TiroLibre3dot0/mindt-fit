// src/components/Mindt/StartButton.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { logCTAInteraction } from "../../utils/logCtaInteraction"; // <-- importante

// Colori + testi dinamici
const CTA_COLORS = [
  {
    name: "corallo",
    color: "#F28482",
    hover: "#EDE9E3",
    label: {
      it: "Inizia ora con energia",
      en: "Start now with energy",
      es: "Empieza ahora con energía",
    },
  },
  {
    name: "lime",
    color: "#BCE784",
    hover: "#A8D5C0",
    label: {
      it: "Scopri il tuo livello",
      en: "Check your level",
      es: "Descubre tu nivel",
    },
  },
  {
    name: "lavanda",
    color: "#D7CCF0",
    hover: "#C6BEE9",
    label: {
      it: "Fai chiarezza",
      en: "Gain clarity",
      es: "Aclara tu mente",
    },
  },
  {
    name: "oro_rosa",
    color: "#D8A39D",
    hover: "#F0D5CF",
    label: {
      it: "Comincia il tuo percorso",
      en: "Begin your journey",
      es: "Empieza tu camino",
    },
  },
];

const StartButton = ({ onStart }) => {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Seleziona colore e logga visualizzazione su Firestore
  useEffect(() => {
  const randomIndex = Math.floor(Math.random() * CTA_COLORS.length);
  setSelectedIndex(randomIndex);

  const colorName = CTA_COLORS[randomIndex].name;
  logCTAInteraction(colorName, "views");
}, []);

  // Al click: logga e attiva funzione
  const handleClick = () => {
  const colorName = CTA_COLORS[selectedIndex].name;
  logCTAInteraction(colorName, "clicks");
  onStart();
};


  const { color, hover, label } = CTA_COLORS[selectedIndex];
  const text = label[language] || label.en;

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: color }}
      className={`
        text-[#224344]
        font-semibold text-base sm:text-lg
        px-5 sm:px-6 py-2.5 sm:py-3
        rounded-xl shadow-md
        hover:shadow-lg
        active:scale-95
        transition-all duration-200 ease-in-out
      `}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = color;
      }}
    >
      {text}
    </button>
  );
};

export default StartButton;
