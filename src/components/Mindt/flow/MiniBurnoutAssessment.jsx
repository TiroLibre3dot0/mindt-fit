import React, { useState, useContext, useEffect } from "react";
import { burnoutQuestionsShort as burnoutQuestions } from "./burnoutQuestionsShort";
import { LanguageContext } from "../../../context/LanguageContext";
import { logFlow } from "../../../utils/logFlow";
import getRealtimeInsight from "./getRealtimeInsight";

const MiniBurnoutAssessment = ({ onComplete }) => {
  const { language } = useContext(LanguageContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [insights, setInsights] = useState([]);

  const questions = ["EE1", "EE2", "DP1", "DP2", "RP1", "RP2"];
  const q = burnoutQuestions[language];

  useEffect(() => {
    logFlow("MiniBurnoutAssessment", "Step iniziale", {
      currentIndex,
      question: questions[currentIndex],
    });
  }, []);

  const handleAnswer = async (score) => {
    const selectedQuestion = questions[currentIndex];
    const newAnswers = [...answers, { question: selectedQuestion, score }];
    setAnswers(newAnswers);

    logFlow("MiniBurnoutAssessment", "Risposta selezionata", {
      question: selectedQuestion,
      score,
    });

    // 🔁 Genera insight per la risposta attuale
    const insightText = await getRealtimeInsight(
      q[selectedQuestion],
      q.options[score],
      language
    );
    const newInsights = [...insights, insightText];
    setInsights(newInsights);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      logFlow("MiniBurnoutAssessment", "Step avanzato", {
        newIndex: currentIndex + 1,
        nextQuestion: questions[currentIndex + 1],
      });
    } else {
      // ✅ Fine: salva risposte e insight in localStorage
      localStorage.setItem("burnoutAnswers", JSON.stringify(newAnswers));
      localStorage.setItem("burnoutInsights", JSON.stringify(newInsights));
      logFlow("MiniBurnoutAssessment", "Test completato", {
        answers: newAnswers,
        insights: newInsights,
      });
      onComplete(newAnswers);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto text-gray-800">
      <h2 className="text-xl font-semibold mb-6 text-center">
        {q[questions[currentIndex]]}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((label, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="bg-zinc-100 hover:bg-zinc-200 py-2 px-4 rounded-lg text-left text-sm sm:text-base shadow transition-all"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniBurnoutAssessment;
