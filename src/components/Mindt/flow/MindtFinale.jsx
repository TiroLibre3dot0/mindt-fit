// src/components/Mindt/mindtFinale.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../LanguageSwitcher";
import SummaryFeedback from "./SummaryFeedback";
import { useLanguage } from "../../../context/LanguageContext";
import SnackModal from "./SnackModal";
import SnackInfoBox from "./SnackInfoBox";


const MindtFinale = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [insights, setInsights] = useState([]);
  const [selectedSnack, setSelectedSnack] = useState(null);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("burnoutAnswers") || "[]");
    const storedInsights = JSON.parse(localStorage.getItem("burnoutInsights") || "[]");

    console.log("📦 Risposte caricate:", storedAnswers);
    console.log("📦 Insight caricati:", storedInsights);

    setAnswers(storedAnswers);
    setInsights(storedInsights);
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
      explore: "🧠 Scopri gli snack funzionali",
      exploreDesc: "Focus, energia, relax: scegli quello giusto per te.",
      quote: "“Prendersi cura della propria mente è il primo passo per diventare inarrestabile.”",
      restart: "🔁 Rifai il test",
    },
    en: {
      title: "Your journey starts here",
      subtitle: "You've just taken the first step to regain energy and wellness. 👏",
      create: "✨ Create your Mindt profile",
      createDesc: "Start your personalized mental and physical wellness journey.",
      explore: "🧠 Discover functional snacks",
      exploreDesc: "Focus, energy, relaxation: choose what fits you best.",
      quote: "“Taking care of your mind is the first step to becoming unstoppable.”",
      restart: "🔁 Restart the test",
    },
    es: {
      title: "Tu camino comienza aquí",
      subtitle: "Acabas de dar el primer paso para recuperar energía y bienestar. 👏",
      create: "✨ Crea tu perfil Mindt",
      createDesc: "Comienza tu camino personalizado hacia el bienestar mental y físico.",
      explore: "🧠 Descubre los snacks funcionales",
      exploreDesc: "Enfoque, energía, relax: elige el adecuado para ti.",
      quote: "“Cuidar tu mente es el primer paso para volverte imparable.”",
      restart: "🔁 Repite el test",
    },
  };

  const t = translations[language] || translations.it;

  const handleRestart = () => {
    localStorage.removeItem("burnoutAnswers");
    localStorage.removeItem("burnoutInsights");
    navigate("/mindt");
  };

  const snackImages = [1, 2, 3, 4, 5, 6];
  const snackPositions = [
    { top: "4%", left: "3%" },
    { top: "14%", right: "2%" },
    { bottom: "10%", left: "8%" },
    { top: "36%", right: "6%" },
    { bottom: "18%", right: "10%" },
    { top: "28%", left: "10%" },
  ];

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center transition-all duration-1000 ease-in-out ${
        show ? "bg-[#ffccc9]" : "bg-[#224344]"
      } relative overflow-hidden`}
    >
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher showLabel={false} />
      </div>

      {snackImages.map((num, idx) => (
        <img
          key={num}
          src={`/Snacks/snack${num}.png`}
          alt={`Snack ${num}`}
          onClick={() => setSelectedSnack(num)}
          className="absolute w-16 md:w-20 cursor-pointer z-10 transform transition-transform duration-300 hover:rotate-3 hover:scale-110 drop-shadow-md"
          style={{ ...snackPositions[idx] }}
        />
      ))}

      {selectedSnack && (
        <SnackInfoBox
          snackNumber={selectedSnack}
          onClose={() => setSelectedSnack(null)}
          language={language}
        />
      )}

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl w-full px-6 lg:px-16">
        <div className="w-full lg:w-1/2 text-left text-[#224344] space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{t.title}</h1>
          <p className="text-lg md:text-xl">{t.subtitle}</p>
          <SummaryFeedback answers={answers} insights={insights} />
          <div className="mt-6">
            <button
              onClick={handleRestart}
              className="text-sm text-blue-800 underline font-semibold"
            >
              {t.restart}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
          <button
            onClick={() => navigate("/mindt-register")}
            className="w-full max-w-sm bg-[#f17b4e] hover:bg-[#e56733] text-white text-lg font-semibold py-4 px-6 rounded-2xl shadow-lg transition"
          >
            {t.create}
            <p className="text-sm font-normal mt-1">{t.createDesc}</p>
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="w-full max-w-sm bg-white text-[#224344] border-2 border-[#224344] hover:bg-[#fefefe] text-lg font-semibold py-4 px-6 rounded-2xl shadow-lg transition"
          >
            {t.explore}
            <p className="text-sm font-normal mt-1">{t.exploreDesc}</p>
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-6 text-sm italic text-[#224344] opacity-80">
        {t.quote}
      </div>
    </div>
  );
};

export default MindtFinale;
