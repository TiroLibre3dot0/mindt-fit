// src/components/Mindt/IntroText.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import StartButton from "./StartButton";

const Keyword = ({ children, tone }) => {
  const styles = {
    orange: "bg-[#f7c1a8] border border-[#ee7a4d] text-[#5a2f1e]",
    brown: "bg-[#d1b5a3] border border-[#987358] text-[#382c26]",
  };

  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 text-sm font-semibold ${styles[tone]} mx-0.5`}
    >
      {children}
    </span>
  );
};

const IntroText = ({ onStart }) => {
  const { language } = useLanguage();

  const content = {
    it: {
      intro: (
        <>
          Il programma <Keyword tone="orange">Mindt</Keyword> ti aiuta a valutare il tuo livello di{" "}
          <Keyword tone="brown">esaurimento emotivo</Keyword>,{" "}
          <Keyword tone="orange">stress lavorativo</Keyword> e{" "}
          <Keyword tone="brown">soddisfazione personale</Keyword>.
        </>
      ),
      title: "Valutazione del Burnout",
      description:
        "Rispondi ad alcune domande per ricevere un'indicazione utile sul tuo stato mentale e professionale.",
      disclaimer: "⚠️ Questa valutazione non sostituisce un consulto medico professionale.",
    },
    en: {
      intro: (
        <>
          The <Keyword tone="orange">Mindt</Keyword> program helps you assess your level of{" "}
          <Keyword tone="brown">emotional exhaustion</Keyword>,{" "}
          <Keyword tone="orange">work-related stress</Keyword> and{" "}
          <Keyword tone="brown">personal satisfaction</Keyword>.
        </>
      ),
      title: "Burnout Assessment",
      description:
        "Answer a few questions to receive a helpful indication of your mental and professional state.",
      disclaimer: "⚠️ This assessment is not a substitute for professional medical advice.",
    },
    es: {
      intro: (
        <>
          El programa <Keyword tone="orange">Mindt</Keyword> te ayuda a evaluar tu nivel de{" "}
          <Keyword tone="brown">agotamiento emocional</Keyword>,{" "}
          <Keyword tone="orange">estrés laboral</Keyword> y{" "}
          <Keyword tone="brown">satisfacción personal</Keyword>.
        </>
      ),
      title: "Evaluación del Burnout",
      description:
        "Responde algunas preguntas para obtener una indicación útil sobre tu estado mental y profesional.",
      disclaimer: "⚠️ Esta evaluación no sustituye el consejo médico profesional.",
    },
  };

  const t = content[language];

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Frase introduttiva */}
      <div className="text-xl md:text-2xl mb-6 leading-relaxed font-medium text-zinc-100">
        {t.intro}
      </div>

      {/* Titolo */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{t.title}</h1>

      {/* Descrizione */}
      <p className="text-base md:text-lg text-zinc-300 mb-6">{t.description}</p>

      {/* Pulsante */}
      <StartButton onStart={onStart} />

      {/* Disclaimer */}
      <p className="mt-6 text-sm text-zinc-400 italic">{t.disclaimer}</p>
    </div>
  );
};

export default IntroText;
