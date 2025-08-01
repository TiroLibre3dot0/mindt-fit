import React, { useState } from "react";
import BurnoutFlow from "./flow/BurnoutFlow";
import LanguageSwitcher from "../LanguageSwitcher";
import IntroText from "./IntroText";
import InsightBox from "./flow/InsightBox";
import { useLanguage } from "../../context/LanguageContext";

const MindtPage = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const { language } = useLanguage();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setStarted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#224344] text-white relative">
      {/* LOGO ALTO SINISTRA */}
      <div className="absolute top-4 left-4 z-10">
        <img src="/logo3.png" alt="Mindt Logo" className="h-8 md:h-10" />
      </div>

      {/* SWITCHER LINGUA */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher showLabel={false} />
      </div>

      {/* COLONNA SINISTRA */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:p-12">
        {!started ? (
          <div className="md:hidden mb-6">
            <img
              src="/rightside3.png"
              alt="Wellness"
              className="w-4/5 mx-auto max-w-[300px] object-contain"
            />
          </div>
        ) : null}

        {!started ? (
          <IntroText key={language} onStart={handleStart} />
        ) : (
          <BurnoutFlow
            mode="short"
            onInsightChange={(insight, loading) => {
              setInsightLoading(loading);
              setCurrentInsight(insight);
            }}
            onNextQuestion={() => setCurrentInsight(null)} // ✅ INSERITO QUI
          />
        )}
      </div>

      {/* COLONNA DESTRA SOLO DESKTOP */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center bg-[#224344] p-4 relative transition-all duration-700 ease-in-out">
        <div className="relative w-full max-w-[460px] pb-10">
          {/* InsightBox come balloon */}
          {started && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-[340px] animate-fade-in-up drop-shadow-md">
              {insightLoading ? (
                <div className="flex items-center justify-center space-x-2 animate-pulse">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                </div>
              ) : currentInsight ? (
                <div className="animate-in fade-in slide-in-from-top duration-500">
                  <InsightBox insight={currentInsight} />
                </div>
              ) : null}
            </div>
          )}

          {/* IMMAGINE */}
          <img
            src="/rightside3.png"
            alt="Wellness Illustration"
            className={`w-full h-auto object-contain transition-transform duration-700 ${
              started ? "scale-90 translate-y-40" : "scale-100 translate-y-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default MindtPage;
