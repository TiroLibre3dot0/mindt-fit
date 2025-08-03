// src/components/Mindt/MindtHome.jsx

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import BurnoutFlow from "./flow/BurnoutFlow";
import InsightBox from "./flow/InsightBox";
import { CTA_COLORS } from "./StartButton";
import { logCTAInteraction } from "../../utils/logCtaInteraction";
import Flag from "react-world-flags";

// ✅ Mini-componente dinamico per parole evidenziate
const Keyword = ({ children, colors }) => {
  const background = colors?.hover || "#EDE9E3";
  const border = colors?.color || "#BCE784";
  const textColor = "#1a3a57";

  return (
    <span
      className="inline-block rounded-md px-2 py-0.5 text-xs sm:text-sm font-semibold mx-0.5"
      style={{ backgroundColor: background, border: `1px solid ${border}`, color: textColor }}
    >
      {children}
    </span>
  );
};

const MindtHome = () => {
  const { language, setLanguage } = useLanguage();
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const [highlightColors] = useState(() => {
    const index = Math.floor(Math.random() * CTA_COLORS.length);
    const selected = CTA_COLORS[index];
    logCTAInteraction(selected.name, "views", selected.label[language] || selected.label.en);
    return selected;
  });

  const handleStart = () => {
    logCTAInteraction(highlightColors.name, "clicks", highlightColors.label[language] || highlightColors.label.en);
    setLoading(true);
    setTimeout(() => {
      setStarted(true);
      setLoading(false);
    }, 1000);
  };

  const items = [
    { id: "home", label: "Mindt", href: "/" },
    { id: "shop", label: "Shop", href: "/shop" },
    { id: "signin", label: "Sign in", href: "/register" },
  ];
  const [internalActive, setInternalActive] = useState("home");
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const availableLangs = ["it", "en", "es"];

  useEffect(() => {
    const update = () => {
      const index = items.findIndex((item) => item.id === internalActive);
      const el = itemRefs.current[index];
      if (!el || !navRef.current || !indicatorRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = el.getBoundingClientRect();
      const offsetLeft = itemRect.left - navRect.left;
      const offsetTop = itemRect.top - navRect.top;
      indicatorRef.current.style.width = `${itemRect.width}px`;
      indicatorRef.current.style.height = `${itemRect.height}px`;
      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.top = `${offsetTop}px`;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [internalActive]);

  const t = {
    it: {
      intro: (
        <>
          Il programma <Keyword colors={highlightColors}>Mindt</Keyword> ti aiuta a valutare il tuo livello di
          <Keyword colors={highlightColors}> esaurimento emotivo</Keyword>,
          <Keyword colors={highlightColors}> stress lavorativo</Keyword> e
          <Keyword colors={highlightColors}> soddisfazione personale</Keyword>.
        </>
      ),
      title: "Valutazione del Burnout",
      description: "Rispondi ad alcune domande per ricevere un'indicazione utile sul tuo stato mentale e professionale.",
      disclaimer: "⚠️ Questa valutazione non sostituisce un consulto medico professionale.",
    },
    en: {
      intro: (
        <>
          The <Keyword colors={highlightColors}>Mindt</Keyword> program helps you assess your level of
          <Keyword colors={highlightColors}> emotional exhaustion</Keyword>,
          <Keyword colors={highlightColors}> work-related stress</Keyword> and
          <Keyword colors={highlightColors}> personal satisfaction</Keyword>.
        </>
      ),
      title: "Burnout Assessment",
      description: "Answer a few questions to receive a helpful indication of your mental and professional state.",
      disclaimer: "⚠️ This assessment is not a substitute for professional medical advice.",
    },
    es: {
      intro: (
        <>
          El programa <Keyword colors={highlightColors}>Mindt</Keyword> te ayuda a evaluar tu nivel de
          <Keyword colors={highlightColors}> agotamiento emocional</Keyword>,
          <Keyword colors={highlightColors}> estrés laboral</Keyword> y
          <Keyword colors={highlightColors}> satisfacción personal</Keyword>.
        </>
      ),
      title: "Evaluación del Burnout",
      description: "Responde algunas preguntas para obtener una indicación útil sobre tu estado mental y profesional.",
      disclaimer: "⚠️ Esta evaluación no sustituye el consejo médico profesional.",
    },
  }[language];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#224344] text-white relative">
      {/* Navbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <nav
          ref={navRef}
          className="relative flex items-center justify-between gap-4 px-4 py-2 bg-[#173f47] text-gray-300 rounded-2xl shadow-md w-fit"
        >
          {/* Indicatore */}
          <span
            ref={indicatorRef}
            className="absolute left-0 rounded-lg transition-all duration-300 pointer-events-none"
            style={{
              width: 0,
              height: 0,
              transform: "translateX(0)",
              top: 0,
              transitionTimingFunction: "cubic-bezier(0.32, 1.56, 0.64, 1)",
              background: `linear-gradient(to right, ${highlightColors.color}, ${highlightColors.hover})`,
            }}
          />

          {/* Link */}
          <div className="flex gap-3">
            {items.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                ref={(el) => (itemRefs.current[idx] = el)}
                onClick={() => setInternalActive(item.id)}
                className={`relative z-10 px-4 py-2 font-medium transition-colors duration-300 ${
                  internalActive === item.id ? "text-white" : "text-gray-400 hover:text-gray-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Selettore lingua */}
          <div className="relative z-10 ml-2">
            <button
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#224344] transition"
            >
              <Flag code={language} style={{ width: 20, height: 14, borderRadius: 2 }} />
              <span className="text-sm">▾</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow z-50 w-28">
                {availableLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <Flag code={lang} style={{ width: 20, height: 14, borderRadius: 2 }} />
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Colonna sinistra */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:p-12">
        {!started ? (
          <>
            <div className="md:hidden mb-6">
              <img src="/rightside3.png" alt="Wellness" className="w-4/5 mx-auto max-w-[300px] object-contain" />
            </div>

            <div className="text-left w-full max-w-xl space-y-6">
              <div className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium text-zinc-100">
                {t.intro}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">{t.title}</h1>
                <p className="text-sm sm:text-base md:text-lg text-zinc-300">{t.description}</p>
              </div>

              <div>
                <button
                  onClick={handleStart}
                  style={{ backgroundColor: highlightColors.color }}
                  className="text-[#224344] font-semibold text-base sm:text-lg px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 ease-in-out"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = highlightColors.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = highlightColors.color;
                  }}
                >
                  {highlightColors.label[language] || highlightColors.label.en}
                </button>
              </div>

              <p className="text-sm text-zinc-400 italic">{t.disclaimer}</p>
            </div>
          </>
        ) : (
          <BurnoutFlow
  mode="short"
  highlightColors={highlightColors} // ✅ aggiunto
  onInsightChange={(insight, loading) => {
    setInsightLoading(loading);
    setCurrentInsight(insight);
  }}
  onNextQuestion={() => setCurrentInsight(null)}
/>
        )}
      </div>

      {/* Colonna destra */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center bg-[#224344] p-4 relative transition-all duration-700 ease-in-out">
        <div className="relative w-full max-w-[460px] pb-10">
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

export default MindtHome;
