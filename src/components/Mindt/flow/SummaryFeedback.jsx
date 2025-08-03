import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { getFinalSummary } from "./apiClient";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaChartBar, FaCandyCane } from "react-icons/fa";
import { getColorPalette } from "../../../utils/burnoutColors";

const SummaryFeedback = ({ answers, insights, show, onClose, burnoutLevel }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const colors = getColorPalette(burnoutLevel);

  const computeScores = (answers) => {
    const keys = {
      EE: ["EE1", "EE2"],
      DP: ["DP1", "DP2"],
      RP: ["RP1", "RP2"],
    };
    const sum = (arr) => arr.map((k) => answers[k] || 0).reduce((a, b) => a + b, 0);
    return {
      ee: sum(keys.EE),
      dp: sum(keys.DP),
      rp: sum(keys.RP),
    };
  };

  const extractKeywords = (text) => {
    const keywords = [
      "consapevolezza", "energia", "equilibrio", "esaurimento",
      "stress", "motivazione", "realizzazione", "burnout"
    ];
    return keywords.filter((kw) => text?.toLowerCase().includes(kw));
  };

  useEffect(() => {
    const localKey = `mindtFinalSummary_${language}`;
    const saved = localStorage.getItem(localKey);
    const hasData = answers && Object.keys(answers).length > 0;

    if (!hasData) {
      setLoading(false);
      return;
    }

    const fetchSummary = async () => {
      try {
        const { ee, dp, rp } = computeScores(answers);
        const result = await getFinalSummary({ answers, insights, language, ee, dp, rp });
        setSummary(result);
        localStorage.setItem(localKey, result);
      } catch (e) {
        setSummary("");
      } finally {
        setLoading(false);
      }
    };

    if (saved) {
      setSummary(saved);
      setLoading(false);
    } else {
      fetchSummary();
    }
  }, [answers, insights, language]);

  const shortText = summary?.split(" ").slice(0, 40).join(" ") + "...";
  const toggleText = {
    it: expanded ? "Mostra meno" : "Leggi tutto",
    en: expanded ? "Show less" : "Read more",
    es: expanded ? "Mostrar menos" : "Leer más",
  };

  const handleCreateProfile = () => {
    onClose();
    navigate("/mindt-register");
  };

  const keywords = extractKeywords(summary);

  return (
    <Dialog open={show} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl p-6 shadow-xl space-y-6"
          >
            {/* Titolo */}
            <Dialog.Title className="text-xl font-bold text-gray-800">
              {language === "it"
                ? "Mental Checkpoint"
                : language === "es"
                ? "Punto de control mental"
                : "Mental Checkpoint"}
            </Dialog.Title>

            {/* Parole chiave */}
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full border font-medium shadow-sm"
                  style={{
                    backgroundColor: colors.light,
                    color: colors.text,
                    borderColor: colors.main
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Testo centrale */}
{loading ? (
  <p className="text-sm italic text-gray-500">
    💬 {language === "it" ? "Generazione in corso..." : language === "es" ? "Generando análisis..." : "Generating insight..."}
  </p>
) : summary?.length > 0 ? (
  <div className="text-[15px] leading-relaxed text-gray-700 space-y-3">
    <p>{expanded ? summary : shortText}</p>
    {summary.length > 50 && (
      <button onClick={() => setExpanded(!expanded)} className="underline text-sm text-gray-500">
        {toggleText[language]}
      </button>
    )}
  </div>
) : (
  <p className="text-gray-600 italic">
    {language === "it"
      ? "\"Non devi essere al massimo ogni giorno. Devi solo ricominciare.\""
      : language === "es"
      ? "\"No tienes que estar al máximo cada día. Solo tienes que volver a empezar.\""
      : "\"You don't have to be at your best every day. You just have to start again.\""}
  </p>
)}


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
  {/* Quadrante 1: Recupero */}
  <div
    onClick={() => navigate("/mindt-register")}
    className="rounded-xl p-4 shadow transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
    style={{ backgroundColor: "#F3F6EF" }}
  >
    <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
      <FaBrain className="text-base" />
      <span>
        {language === "it"
          ? "Stima del recupero"
          : language === "es"
          ? "Estimación de recuperación"
          : "Recovery estimate"}
      </span>
    </div>
    <p className="text-gray-700">
      {language === "it"
        ? "Con il tuo impegno, potresti ritrovare l’equilibrio in circa 3-4 settimane."
        : language === "es"
        ? "Con tu esfuerzo, podrías recuperar el equilibrio en unas 3-4 semanas."
        : "With commitment, you could regain balance in about 3–4 weeks."}
    </p>
  </div>

  {/* Quadrante 2: Stato attuale */}
  <div
    onClick={() => navigate("/mindt-register")}
    className="rounded-xl p-4 shadow transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
    style={{ backgroundColor: "#EFF4F9" }}
  >
    <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
      <FaChartBar className="text-base" />
      <span>
        {language === "it"
          ? "Il tuo stato attuale"
          : language === "es"
          ? "Tu estado actual"
          : "Your current state"}
      </span>
    </div>
    <p className="text-gray-700">
      {language === "it"
        ? "83% degli utenti con parametri simili hanno beneficiato da un percorso di recupero guidato."
        : language === "es"
        ? "El 83% de los usuarios con valores similares mejoraron con un plan de recuperación guiado."
        : "83% of users with similar scores improved with a guided recovery program."}
    </p>
  </div>

  {/* Quadrante 3: Snack suggerito */}
  <div
    onClick={() => navigate("/shop")}
    className="rounded-xl p-4 shadow transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
    style={{ backgroundColor: "#FBF3ED" }}
  >
    <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
      <FaCandyCane className="text-base" />
      <span>
        {language === "it"
          ? "Snack suggerito"
          : language === "es"
          ? "Snack sugerido"
          : "Suggested snack"}
      </span>
    </div>
    <p className="text-gray-700">
      {language === "it"
        ? "Un mix di magnesio e vitamine del gruppo B per sostenere il tuo equilibrio mentale."
        : language === "es"
        ? "Una mezcla de magnesio y vitaminas del grupo B para apoyar tu equilibrio mental."
        : "A mix of magnesium and B vitamins to support your mental balance."}
    </p>
  </div>
</div>



            {/* CTA finale */}
            <div className="flex justify-between items-center pt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm"
              >
                {language === "it" ? "Chiudi" : language === "es" ? "Cerrar" : "Close"}
              </button>

              <button
                onClick={handleCreateProfile}
                className="px-5 py-2 text-white rounded-lg text-sm"
                style={{ backgroundColor: colors.main }}
              >
                {language === "it"
                  ? "Inizia il mio profilo personale"
                  : language === "es"
                  ? "Crear mi perfil personal"
                  : "Start My Profile"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Dialog>
  );
};

export default SummaryFeedback;
