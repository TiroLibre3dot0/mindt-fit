// src/components/Mindt/flow/InsightBox.jsx
import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { FaRegLightbulb } from "react-icons/fa";

const InsightBox = ({ insight, loading }) => {
  const { language } = useLanguage();

  if (!insight && !loading) return null;

  const loadingText = {
    it: "💬 Generazione in corso...",
    en: "💬 Generating insight...",
    es: "💬 Generando análisis...",
  };

  const noInsightText = {
    it: "⚠️ Nessun insight generato.",
    en: "⚠️ No insight generated.",
    es: "⚠️ No se generó ningún insight.",
  };

  return (
    <div className="mt-6 max-w-xl mx-auto bg-[#f0f7ff] border border-[#cfe5fb] text-[#1a3a57] rounded-xl shadow-md px-6 py-4 text-left animate-fadeIn transition-all duration-300">
      {loading ? (
        <p className="italic animate-pulse text-sm text-[#224344]">
          {loadingText[language] || loadingText["en"]}
        </p>
      ) : insight ? (
        <div className="flex items-start space-x-3">
          <FaRegLightbulb className="text-yellow-500 mt-1 flex-shrink-0" size={22} />
          <p className="text-sm leading-relaxed font-medium">{insight}</p>
        </div>
      ) : (
        <p className="italic text-gray-400 text-sm">
          {noInsightText[language] || noInsightText["en"]}
        </p>
      )}
    </div>
  );
};

export default InsightBox;
