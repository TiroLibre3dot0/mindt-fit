import React from "react";
import { useLanguage } from "../../../context/LanguageContext";

const MotivationalQuote = () => {
  const { language } = useLanguage();

  const quotes = {
    it: "Prendersi cura della propria mente è il primo passo per diventare inarrestabile.",
    en: "Taking care of your mind is the first step toward becoming unstoppable.",
    es: "Cuidar tu mente es el primer paso para volverte imparable.",
  };

  const quote = quotes[language] || quotes.en;

  return (
    <div className="bg-[#2B3F3F] p-6 rounded-lg text-center shadow-inner">
      <p className="text-lg md:text-xl text-white font-medium italic">
        “{quote}”
      </p>
    </div>
  );
};

export default MotivationalQuote;
