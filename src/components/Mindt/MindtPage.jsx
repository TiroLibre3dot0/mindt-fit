// src/components/Mindt/MindtPage.jsx
import React, { useState } from "react";
import BurnoutFlow from "./flow/BurnoutFlow";
import LanguageSwitcher from "../LanguageSwitcher";
import IntroText from "./IntroText";
import { useLanguage } from "../../context/LanguageContext";

const MindtPage = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setStarted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#224344] text-white">
      {/* COLONNA SINISTRA */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="absolute top-4 left-4">
          <LanguageSwitcher />
        </div>

        {!started ? (
          <IntroText key={language} onStart={handleStart} />
        ) : (
          <BurnoutFlow mode="short" />
        )}
      </div>

      {/* COLONNA DESTRA */}
      <div className="hidden md:flex md:w-1/2 justify-end items-end bg-[#224344] p-4">
        <img
          src="/rightside2.png"
          alt="Wellness Illustration"
          className="w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
};

export default MindtPage;
