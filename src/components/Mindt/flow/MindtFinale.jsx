// src/components/Mindt/pages/MindtFinale.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMindt from "../NavbarMindt";
import MentalBattery from "./MentalBattery";
import SummaryFeedback from "./SummaryFeedback";
import { useLanguage } from "../../../context/LanguageContext";
import { getColorPalette } from "../../../utils/burnoutColors";


const MindtFinale = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [answers, setAnswers] = useState({});
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const rawAnswers = JSON.parse(localStorage.getItem("burnoutAnswers") || "[]");
    const storedInsights = JSON.parse(localStorage.getItem("burnoutInsights") || "[]");

    const formattedAnswers = rawAnswers.reduce((acc, cur) => {
      acc[cur.question] = cur.score;
      return acc;
    }, {});

    setAnswers(formattedAnswers);
    setInsights(storedInsights);

    setTimeout(() => setLoading(false), 1500);
  }, []);

  const t = {
    it: {
      title: "Complimenti!",
      subtitle: "Hai appena concluso il primo passo.",
      keywords: ["nuova consapevolezza", "energia mentale", "equilibrio personale"],
      heading: "Ora inizia il tuo percorso",
      desc: "Ogni cambiamento inizia dalla consapevolezza. Scopri come migliorare il tuo stato mentale giorno dopo giorno.",
      cta: "Crea il tuo profilo personale",
      expand: "📄 Leggi il riepilogo completo",
      collapse: "🔙 Nascondi riepilogo",
      loading: "🧠 L’AI sta generando il tuo profilo mentale...",
    },
    en: {
      title: "Congratulations!",
      subtitle: "You've just completed the first step.",
      keywords: ["new awareness", "mental energy", "personal balance"],
      heading: "Now your journey begins",
      desc: "Every change starts with awareness. Discover how to improve your mental state day by day.",
      cta: "Create your personal profile",
      expand: "📄 Read the full summary",
      collapse: "🔙 Hide summary",
      loading: "🧠 AI is generating your mental profile...",
    },
  }[language || "it"];

  const getBurnoutLevel = () => {
    const EE = (answers["EE1"] || 0) + (answers["EE2"] || 0);
    const DP = (answers["DP1"] || 0) + (answers["DP2"] || 0);
    const RP = (answers["RP1"] || 0) + (answers["RP2"] || 0);
    if (EE >= 6 && (DP >= 4 || RP <= 3)) return "high";
    if (EE >= 4 || DP >= 3 || RP <= 4) return "moderate";
    return "low";
  };

  const burnoutLevel = getBurnoutLevel();

  const palette = getColorPalette(burnoutLevel);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#224344] text-white flex items-center justify-center text-lg animate-pulse">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#224344] text-white flex flex-col-reverse md:flex-row relative">
      {/* ✅ Navbar centrata con palette burnout */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <NavbarMindt highlightColors={{ color: palette.main, hover: palette.light }} />
      </div>

      {/* COLONNA SINISTRA */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-10 sm:px-8 md:p-16 space-y-4">
        <div className="block md:hidden flex flex-col items-center justify-center mt-8 mb-4 space-y-2">
          <button
            onClick={() => setExpanded(true)}
            className="scale-[1.4] active:scale-95 transition-transform"
          >
            <MentalBattery burnoutLevel={burnoutLevel} />
          </button>
          <p className="text-sm text-center text-white opacity-80 max-w-[240px] leading-tight">
            {t.desc}
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold font-[Fredoka] text-white">
          {t.title} <span className="text-orange-300 font-bold">Mindt</span>
        </h2>
        <p className="text-md md:text-lg italic text-center">{t.subtitle}</p>

        <div className="flex flex-wrap gap-2 justify-center text-sm">
          {t.keywords.map((kw, i) => (
            <span
              key={i}
              className="bg-orange-400/80 text-[#224344] px-3 py-1 rounded-xl font-semibold text-xs"
            >
              {kw}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-[Fredoka] mt-6 text-center">
          {t.heading}
        </h1>
        <p className="text-md md:text-lg text-center max-w-md">{t.desc}</p>

        {/* ✅ CTA con colore burnout */}
        <button
          onClick={() => navigate("/mindt-register")}
          className="mt-6 font-semibold py-3 px-6 rounded-full shadow-lg text-sm transition-all"
          style={{
            backgroundColor: palette.main,
            color: palette.light,
          }}
        >
          {t.cta}
        </button>
      </div>

      {/* COLONNA DESTRA */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative px-4 pb-10 hidden md:flex">
        <div
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => setExpanded(true)}
        >
          <div className="w-[200px] md:w-[260px] lg:w-[320px]">
            <MentalBattery burnoutLevel={burnoutLevel} />
          </div>
        </div>
      </div>

      <SummaryFeedback
        show={!!expanded}
        onClose={() => setExpanded(false)}
        answers={answers}
        insights={insights}
        burnoutLevel={burnoutLevel}
      />
    </div>
  );
};

export default MindtFinale;
