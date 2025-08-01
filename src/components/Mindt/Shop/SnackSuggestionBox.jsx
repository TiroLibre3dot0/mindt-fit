import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { FaLeaf } from "react-icons/fa";

const SnackSuggestionBox = ({ color }) => {
  const { language } = useLanguage();

  const content = {
    it: {
      title: "Snack suggerito",
      text: "Un mix di magnesio e vitamine del gruppo B per sostenere il tuo equilibrio mentale.",
      cta: "Scopri ora",
    },
    en: {
      title: "Suggested snack",
      text: "A mix of magnesium and B vitamins to support your mental balance.",
      cta: "Discover now",
    },
    es: {
      title: "Snack sugerido",
      text: "Una mezcla de magnesio y vitaminas B para apoyar tu equilibrio mental.",
      cta: "Descúbrelo ahora",
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
      <div className="flex items-center gap-2 mb-2">
        <FaLeaf className="text-base" style={{ color: color.main }} />
        <h3 className="text-sm font-semibold uppercase tracking-tight" style={{ color: color.text }}>
          {content[language].title}
        </h3>
      </div>
      <p className="text-xs leading-snug" style={{ color: color.text }}>
        {content[language].text}
      </p>
      <button
        className="mt-4 self-start px-4 py-1.5 text-xs font-medium rounded-lg transition"
        style={{
          backgroundColor: color.main,
          color: "#fff",
        }}
      >
        {content[language].cta}
      </button>
    </div>
  );
};

export default SnackSuggestionBox;
