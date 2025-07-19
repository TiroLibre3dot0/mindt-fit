// src/components/Mindt/flow/SummaryFeedback.jsx

import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { getFinalSummary } from "./apiClient";
import BurnoutAnalyzer from "./BurnoutAnalyzer";

const SummaryFeedback = ({ answers, insights }) => {
  const { language } = useLanguage();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinalSummary = async () => {
      const result = await getFinalSummary({ answers, insights, language });
      setSummary(result);
      setLoading(false);
    };

    fetchFinalSummary();
  }, [answers, insights, language]);

  return (
    <div className="p-6 bg-zinc-800 text-white rounded-lg space-y-6">
      <h2 className="text-2xl font-bold">
        {language === "it"
          ? "Riepilogo del Test"
          : language === "es"
          ? "Resumen del Test"
          : "Test Summary"}
      </h2>

      {loading ? (
        <p className="text-sm italic text-gray-400">
          {language === "it"
            ? "Generazione del feedback in corso..."
            : language === "es"
            ? "Generando el resumen final..."
            : "Generating your final feedback..."}
        </p>
      ) : (
        <div className="p-4 bg-zinc-700 rounded-md border-l-4 border-green-500">
          <p className="text-white text-sm">{summary}</p>
        </div>
      )}

      {/* 🔍 Analisi oggettiva dei punteggi */}
      <BurnoutAnalyzer answers={answers} language={language} />
    </div>
  );
};

export default SummaryFeedback;
