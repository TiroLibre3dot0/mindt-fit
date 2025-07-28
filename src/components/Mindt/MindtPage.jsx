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
          <>
            {/* Illustrazione solo per mobile */}
            <div className="md:hidden mb-6">
              <img
                src="/rightside3.png"
                alt="Wellness"
                className="w-4/5 mx-auto max-w-[300px] object-contain"
              />
            </div>
            <IntroText key={language} onStart={handleStart} />
          </>
        ) : (
          <BurnoutFlow mode="short" />
        )}
      </div>

      {/* COLONNA DESTRA SOLO DESKTOP */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center bg-[#224344] p-4">
        <img
          src="/rightside3.png"
          alt="Wellness Illustration"
          className="w-full max-w-[500px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default MindtPage;
