import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { getFinalSummary } from "./apiClient";
import BurnoutAnalyzer from "./BurnoutAnalyzer";
import { logFlow } from "../../../utils/logFlow";

const SummaryFeedback = ({ answers, insights }) => {
  const { language } = useLanguage();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showBox, setShowBox] = useState(false);

  const computeScores = (answers) => {
    const keys = {
      EE: ["EE1", "EE2"],
      DP: ["DP1", "DP2"],
      RP: ["RP1", "RP2"],
    };
    const sum = (keys) => keys.map((k) => answers[k] || 0).reduce((a, b) => a + b, 0);
    return {
      ee: sum(keys.EE),
      dp: sum(keys.DP),
      rp: sum(keys.RP),
    };
  };

  useEffect(() => {
    const localKey = `mindtFinalSummary_${language}`;
    const savedSummary = localStorage.getItem(localKey);
    const hasAnswers = answers && Object.keys(answers).length > 0;

    console.log("🟡 INIT SummaryFeedback → answers:", answers);
    console.log("🟡 INIT SummaryFeedback → insights:", insights);

    if (!hasAnswers) {
      console.warn("⚠️ Nessuna risposta trovata, skip chiamata API.");
      logFlow({
        component: "SummaryFeedback",
        action: "⏸️ Skip chiamata: risposte assenti",
        data: answers,
        level: "trace",
      });
      setLoading(false);
      return;
    }

    const fetchFinalSummary = async () => {
      try {
        const { ee, dp, rp } = computeScores(answers);

        console.log("📡 Chiamata a getFinalSummary:", { answers, insights, ee, dp, rp });

        const result = await getFinalSummary({
          answers,
          insights,
          language,
          ee,
          dp,
          rp,
        });

        setSummary(result);
        localStorage.setItem(localKey, result);

        logFlow({
          component: "SummaryFeedback",
          action: "✅ Final summary ricevuto da API",
          data: result,
          level: "info",
        });
      } catch (error) {
        console.error("❌ Errore nella chiamata getFinalSummary:", error);
        setSummary("");

        logFlow({
          component: "SummaryFeedback",
          action: "❌ Errore fetch final summary",
          data: error,
          level: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (savedSummary) {
      setSummary(savedSummary);
      setLoading(false);

      logFlow({
        component: "SummaryFeedback",
        action: "📦 Final summary caricato da localStorage",
        data: savedSummary,
        level: "info",
      });
    } else {
      fetchFinalSummary();
    }
  }, [answers, insights, language]);

  const title = {
    it: "Il tuo riepilogo personalizzato",
    en: "Your personalized summary",
    es: "Tu resumen personalizado",
  };

  const toggleText = {
    it: expanded ? "Mostra meno" : "Leggi tutto",
    en: expanded ? "Show less" : "Read more",
    es: expanded ? "Mostrar menos" : "Leer más",
  };

  const revealButton = {
    it: "📊 Scopri il tuo stato attuale",
    en: "📊 Reveal your current state",
    es: "📊 Descubre tu estado actual",
  };

  const quoteFallback = {
    it: "\"Non devi essere al massimo ogni giorno. Devi solo ricominciare.\"",
    en: "\"You don't have to be at your best every day. You just have to start again.\"",
    es: "\"No tienes que estar al máximo cada día. Solo tienes que volver a empezar.\"",
  };

  const shortText = summary?.split(" ").slice(0, 35).join(" ") + "...";

  return (
    <div className="space-y-4 max-w-3xl text-base text-[#224344]">
      <h2 className="text-xl md:text-2xl font-bold">{title[language] || title.it}</h2>

      {!showBox && (
        <button
          onClick={() => setShowBox(true)}
          className="px-4 py-2 bg-[#f17b4e] text-white rounded-full shadow hover:bg-[#e56733] transition text-sm"
        >
          {revealButton[language] || revealButton.it}
        </button>
      )}

      {showBox && (
        <div className="relative bg-green-50 p-4 rounded-md border-l-4 border-green-500">
          {loading ? (
            <p className="italic text-sm text-gray-500">Generazione in corso...</p>
          ) : summary?.length > 0 ? (
            <>
              <p className="leading-relaxed">{expanded ? summary : shortText}</p>
              {summary.length > 50 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-2 text-green-700 font-semibold underline text-sm"
                >
                  {toggleText[language] || toggleText.it}
                </button>
              )}
            </>
          ) : (
            <div className="text-center italic text-gray-700">
              💬 <span>{quoteFallback[language] || quoteFallback.it}</span><br />
              <span className="text-sm font-semibold">– Mindt AI</span>
            </div>
          )}
        </div>
      )}

      {Object.keys(answers || {}).length > 0 && (
        <BurnoutAnalyzer answers={answers} language={language} />
      )}
    </div>
  );
};

export default SummaryFeedback;
