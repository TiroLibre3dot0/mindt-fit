// src/components/Mindt/Dashboard/UserProfile.jsx

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useLanguage } from "../../../context/LanguageContext";
import { getColorPalette } from "../../../utils/burnoutColors";
import NavbarMindt from "../NavbarMindt";
import MentalBattery from "../flow/MentalBattery";
import { motion } from "framer-motion";
import { logCTAInteraction } from "../../../utils/logCtaInteraction";

const computeScores = (answers) => {
  const score = answers.reduce((sum, a) => sum + (a.value || 0), 0);
  if (score < 30) return "low";
  if (score < 60) return "moderate";
  return "high";
};

const translations = {
  title: {
    it: "Bentornato su Mindt",
    en: "Welcome back to Mindt",
    es: "Bienvenido de nuevo a Mindt",
  },
  recovery: {
    title: {
      it: "🔊 Stima del recupero",
      en: "🔊 Recovery estimation",
      es: "🔊 Estimación de recuperación",
    },
    desc: {
      it: "Con il tuo impegno, potresti ritrovare l’equilibrio in circa 3-4 settimane.",
      en: "With your commitment, you could restore balance in about 3-4 weeks.",
      es: "Con tu esfuerzo, podrías recuperar el equilibrio en unas 3-4 semanas.",
    },
    button: {
      it: "Vai alla tua dashboard",
      en: "Go to your dashboard",
      es: "Ir a tu panel",
    },
  },
  snack: {
    title: {
      it: "🍫 Snack suggerito",
      en: "🍫 Suggested snack",
      es: "🍫 Snack sugerido",
    },
    desc: {
      it: "Un mix di magnesio e vitamine del gruppo B per sostenere il tuo equilibrio mentale.",
      en: "A mix of magnesium and B vitamins to support your mental balance.",
      es: "Una mezcla de magnesio y vitaminas B para apoyar tu equilibrio mental.",
    },
    button: {
      it: "Vai allo shop",
      en: "Go to the shop",
      es: "Ir a la tienda",
    },
  },
  games: {
    title: {
      it: "🧠 Giochi per la mente",
      en: "🧠 Mental games",
      es: "🧠 Juegos mentales",
    },
    desc: {
      it: "Presto potrai accedere a una sezione dedicata al tuo recupero mentale con giochi e attività.",
      en: "Soon you’ll access a section dedicated to mental recovery with games and exercises.",
      es: "Pronto tendrás acceso a una sección dedicada a la recuperación mental con juegos y actividades.",
    },
    button: {
      it: "In arrivo",
      en: "Coming soon",
      es: "Próximamente",
    },
    note: {
      it: "In arrivo nel tuo prossimo aggiornamento!",
      en: "Coming in the next update!",
      es: "¡Disponible en la próxima actualización!",
    },
  },
};

const UserProfile = () => {
  const { language } = useLanguage();
  const auth = getAuth();
  const user = auth.currentUser;

  const [answers, setAnswers] = useState([]);
  const [burnoutLevel, setBurnoutLevel] = useState("moderate");

  useEffect(() => {
    const stored = localStorage.getItem("burnoutAnswers");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAnswers(parsed);
      setBurnoutLevel(computeScores(parsed));
    }
  }, []);

  const palette = getColorPalette(burnoutLevel);

  const snacks = [
    "/Snackspeople/snackpeople1.png",
    "/Snackspeople/snackpeople2.png",
    "/Snackspeople/snackpeople3.png",
  ];
  const randomSnack = snacks[Math.floor(Math.random() * snacks.length)];

  return (
    <div className="min-h-screen bg-[#fef5ec] relative overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <MentalBattery burnoutLevel={burnoutLevel} />
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <NavbarMindt highlightColors={{ color: palette.main, hover: palette.light }} />
      </div>

      <main className="pt-32 px-6 max-w-6xl mx-auto">
        <motion.h1
          className="text-xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {translations.title[language]}
        </motion.h1>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="group bg-green-50 border border-green-200 p-5 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.03]"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="font-semibold text-lg">{translations.recovery.title[language]}</h4>
            <p className="text-sm mt-2 leading-snug max-w-[95%]">{translations.recovery.desc[language]}</p>
            <a
              href="/mindt-dashboard"
              onClick={() =>
                logCTAInteraction("dashboardCTA", "clicks", translations.recovery.button[language])
              }
              className="mt-4 inline-block text-sm font-semibold py-2 px-4 rounded-full shadow transition group-hover:brightness-110"
              style={{ backgroundColor: palette.main, color: palette.light }}
            >
              {translations.recovery.button[language]}
            </a>
          </motion.div>

          <motion.div
            className="group bg-orange-50 border border-orange-200 p-5 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.03]"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="font-semibold text-lg">{translations.snack.title[language]}</h4>
            <p className="text-sm mt-2 leading-snug max-w-[95%]">{translations.snack.desc[language]}</p>
            <a
              href="/shop"
              onClick={() =>
                logCTAInteraction("shopCTA", "clicks", translations.snack.button[language])
              }
              className="mt-4 inline-block text-sm font-semibold py-2 px-4 rounded-full shadow transition group-hover:brightness-110"
              style={{ backgroundColor: palette.main, color: palette.light }}
            >
              {translations.snack.button[language]}
            </a>
          </motion.div>

          <motion.div
            className="group bg-blue-50 border border-blue-200 p-5 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.03]"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="font-semibold text-lg">{translations.games.title[language]}</h4>
            <p className="text-sm mt-2 leading-snug max-w-[95%]">{translations.games.desc[language]}</p>
            <button
              disabled
              onClick={() =>
                logCTAInteraction("gamesCTA", "clicks", translations.games.button[language])
              }
              className="mt-4 inline-block bg-blue-300 text-white text-sm font-semibold py-2 px-4 rounded-full cursor-default opacity-80"
            >
              {translations.games.button[language]}
            </button>
            <p className="text-xs mt-1 italic text-gray-500">
              {translations.games.note[language]}
            </p>
          </motion.div>
        </motion.div>
      </main>

      <div className="hidden md:block absolute bottom-0 right-0 max-w-sm">
        <img src={randomSnack} alt="Snack person" className="w-full" />
      </div>
    </div>
  );
};

export default UserProfile;
