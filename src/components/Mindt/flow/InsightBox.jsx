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

  const highlightKeywords = (text) => {
    const keywords = [
      "benessere emotivo",
      "distacco",
      "pause",
      "interesse",
      "colleghi",
      "emozioni",
      "stanchezza",
      "stress",
      "riposare",
      "motivazione"
    ];
    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      keywords.includes(part.toLowerCase()) ? (
        <span key={i} className="text-orange-600 font-semibold">{part}</span>
      ) : (
        part
      )
    );
  };

  const formatInsight = (text) => {
    const sentences = text.split(/(?<=[.!?])\s+/);
    const mid = Math.ceil(sentences.length / 2);
    return (
      <>
        <p className="mb-2">{highlightKeywords(sentences.slice(0, mid).join(" "))}</p>
        <p>{highlightKeywords(sentences.slice(mid).join(" "))}</p>
      </>
    );
  };

  return (
    <div className="relative w-[460px] bg-[#f0f7ff] border border-[#cfe5fb] text-[#1a3a57] rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.3)] px-7 py-6 animate-fadeIn transition-all duration-500 leading-relaxed text-[16px] rotate-[-0.5deg]">
      {/* Freccia in basso stile balloon */}
      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-[10px] border-l-transparent border-r-transparent border-t-[#f0f7ff]" />

      {loading ? (
        <p className="italic animate-pulse text-sm text-[#224344]">
          {loadingText[language] || loadingText["en"]}
        </p>
      ) : insight ? (
        <div className="flex items-start gap-3">
          <FaRegLightbulb className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
          <div className="text-sm font-medium">{formatInsight(insight)}</div>
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
