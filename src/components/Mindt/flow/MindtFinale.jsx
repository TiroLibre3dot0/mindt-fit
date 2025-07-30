import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../LanguageSwitcher";
import SummaryFeedback from "./SummaryFeedback";
import { useLanguage } from "../../../context/LanguageContext";

const MindtFinale = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [answers, setAnswers] = useState({});
  const [insights, setInsights] = useState([]);
  const [randomSnack, setRandomSnack] = useState(null);
  const [randomPerson, setRandomPerson] = useState(null);

  useEffect(() => {
    try {
      const rawAnswers = JSON.parse(localStorage.getItem("burnoutAnswers") || "[]");
      const storedInsights = JSON.parse(localStorage.getItem("burnoutInsights") || "[]");

      // 🔁 Converte array di oggetti in oggetto: { EE1: 2, EE2: 1, ... }
      const formattedAnswers = rawAnswers.reduce((acc, cur) => {
        acc[cur.question] = cur.score;
        return acc;
      }, {});

      setAnswers(formattedAnswers);
      setInsights(storedInsights);
    } catch (error) {
      console.error("Errore parsing localStorage:", error);
    }

    // 🎲 Elementi random grafici
    const snackImgs = [1, 2, 3, 4, 5, 6];
    const peopleImgs = [1, 2, 3, 4, 5, 6];
    setRandomSnack(`/Snacks/snack${snackImgs[Math.floor(Math.random() * snackImgs.length)]}.png`);
    setRandomPerson(`/Snackspeople/snackpeople${peopleImgs[Math.floor(Math.random() * peopleImgs.length)]}.png`);
  }, []);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const translations = {
    it: {
      title: "Il tuo percorso inizia da qui",
      subtitle: "Hai appena fatto il primo passo per ritrovare energia e benessere. 👏",
      create: "✨ Crea il tuo profilo Mindt",
      createDesc: "Inizia il tuo percorso personalizzato di benessere mentale e fisico.",
      explore: "Scopri gli snack funzionali",
      exploreDesc: "Focus, energia, relax: scegli quello giusto per te.",
      quote: "“Prendersi cura della propria mente è il primo passo per diventare inarrestabile.”",
      restart: "🔁 Rifai il test",
    },
    en: {
      title: "Your journey starts here",
      subtitle: "You've just taken the first step to regain energy and wellness. 👏",
      create: "✨ Create your Mindt profile",
      createDesc: "Start your personalized mental and physical wellness journey.",
      explore: "Discover functional snacks",
      exploreDesc: "Focus, energy, relaxation: choose what fits you best.",
      quote: "“Taking care of your mind is the first step to becoming unstoppable.”",
      restart: "🔁 Restart the test",
    },
    es: {
      title: "Tu camino comienza aquí",
      subtitle: "Acabas de dar el primer paso para recuperar energía y bienestar. 👏",
      create: "✨ Crea tu perfil Mindt",
      createDesc: "Comienza tu camino personalizado hacia el bienestar mental y físico.",
      explore: "Descubre los snacks funcionales",
      exploreDesc: "Enfoque, energía, relax: elige el adecuado para ti.",
      quote: "“Cuidar tu mente es el primer paso para volverte imparable.”",
      restart: "🔁 Repite el test",
    },
  };

  const t = translations[language] || translations.it;

  const handleRestart = () => {
    localStorage.removeItem("burnoutAnswers");
    localStorage.removeItem("burnoutInsights");
    localStorage.removeItem("mindtFinalSummary_it");
    navigate("/mindt");
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center transition-all duration-1000 ease-in-out ${
        show ? "bg-[#ffccc9]" : "bg-[#224344]"
      } relative overflow-hidden font-sans`}
    >
      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher showLabel={false} />
      </div>

      {/* Logo */}
      <img src="/logo3.png" alt="Mindt Logo" className="absolute top-4 left-4 w-28 z-10" />

      {/* Immagine decorativa */}
      {randomPerson && (
        <img
          src={randomPerson}
          alt="Snack person"
          className="absolute bottom-0 right-0 w-40 sm:w-56 opacity-90 animate-fade-in"
        />
      )}

      {/* Contenuto principale */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-[#224344] px-6 py-12 max-w-7xl w-full z-10">
        {/* Colonna sinistra */}
        <div className="w-full lg:w-1/2 text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold font-[Fredoka]">{t.title}</h1>
          <p className="text-md sm:text-lg">{t.subtitle}</p>

          <SummaryFeedback answers={answers} insights={insights} />

          <button
            onClick={handleRestart}
            className="text-sm text-blue-800 underline font-semibold mt-4"
          >
            {t.restart}
          </button>
        </div>

        {/* Colonna destra */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
          <button
            onClick={() => navigate("/mindt-register")}
            className="w-full max-w-sm bg-gradient-to-r from-orange-400 to-orange-500 hover:scale-105 text-white text-lg font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-300 flex flex-col items-center group"
          >
            <span className="flex items-center gap-2">
              <span className="animate-pulse group-hover:animate-shake">✨</span> {t.create}
            </span>
            <p className="text-sm font-normal mt-1">{t.createDesc}</p>
          </button>

          <button
            onClick={() => navigate("/Shop")}
            className="w-full max-w-sm bg-white text-[#224344] border-2 border-[#224344] hover:scale-105 text-lg font-semibold py-4 px-6 rounded-full shadow-md transition-all duration-300 flex flex-col items-center"
          >
            <span className="flex items-center gap-2">🧠 {t.explore}</span>
            <p className="text-sm font-normal mt-1">{t.exploreDesc}</p>
          </button>
        </div>
      </div>

      {/* Citazione finale */}
      <div className="absolute bottom-4 right-6 text-sm italic text-[#224344] opacity-80">
        {t.quote}
      </div>
    </div>
  );
};

export default MindtFinale;
