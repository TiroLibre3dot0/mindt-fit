// src/components/Mindt/flow/PostTestCTA.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const translations = {
  it: {
    title: "Cosa vuoi fare adesso?",
    btn1: "Crea il tuo profilo Mindt",
    btn2: "Scopri i tuoi snack funzionali",
  },
  en: {
    title: "What would you like to do next?",
    btn1: "Create your Mindt profile",
    btn2: "Discover your functional snacks",
  },
  es: {
    title: "¿Qué te gustaría hacer ahora?",
    btn1: "Crea tu perfil en Mindt",
    btn2: "Descubre tus snacks funcionales",
  },
};

const PostTestCTA = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = translations[language] || translations["en"];

  return (
    <div className="mt-10 bg-zinc-700 p-6 rounded-lg shadow-lg text-center space-y-4">
      <h3 className="text-xl font-semibold">{t.title}</h3>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-[#ee7a4d] text-white font-medium rounded-lg hover:bg-[#e76c3c] transition"
        >
          {t.btn1}
        </button>
        <button
          onClick={() => navigate("/snacks")}
          className="px-6 py-3 bg-white text-[#224344] font-medium rounded-lg hover:bg-gray-200 transition"
        >
          {t.btn2}
        </button>
      </div>
    </div>
  );
};

export default PostTestCTA;
