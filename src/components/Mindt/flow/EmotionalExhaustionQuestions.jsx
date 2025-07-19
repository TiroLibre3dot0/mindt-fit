// EmotionalExhaustionQuestions.jsx
import React from "react";

const EmotionalExhaustionQuestions = ({ answers, onChange, language }) => {
  const questions = {
    it: [
      "Ti senti emotivamente sfinito dal tuo lavoro?",
      "Ti senti stanco al mattino al solo pensiero di affrontare un’altra giornata di lavoro?",
      "Ti senti prosciugato emotivamente dal tuo lavoro?",
      "Dopo il lavoro ti senti completamente svuotato?",
      "Lavorare tutto il giorno è per te uno sforzo troppo grande?",
      "Senti di non riuscire più a dare nulla di te sul lavoro?",
      "Ti senti frustrato sul lavoro?",
      "Ti capita di piangere per motivi legati al lavoro?",
      "Ti senti sotto pressione ogni giorno?",
    ],
    en: [
      "Do you feel emotionally drained from your work?",
      "Do you feel tired in the morning just thinking about another day of work?",
      "Do you feel emotionally exhausted because of your work?",
      "Do you feel completely burned out after work?",
      "Is working all day too stressful for you?",
      "Do you feel you can't give any more to your work?",
      "Do you feel frustrated by your work?",
      "Do you ever cry because of work-related problems?",
      "Do you feel under pressure every day?",
    ],
    es: [
      "¿Te sientes emocionalmente agotado por tu trabajo?",
      "¿Te sientes cansado por la mañana solo de pensar en otro día de trabajo?",
      "¿Te sientes emocionalmente exhausto por tu trabajo?",
      "¿Te sientes completamente vacío después del trabajo?",
      "¿Trabajar todo el día te resulta demasiado agotador?",
      "¿Sientes que no puedes dar más de ti en el trabajo?",
      "¿Te sientes frustrado en el trabajo?",
      "¿Te pasa llorar por problemas relacionados con el trabajo?",
      "¿Te sientes bajo presión todos los días?",
    ],
  };

  const responseOptions = [
    { value: 0, label: { it: "Mai", en: "Never", es: "Nunca" } },
    { value: 1, label: { it: "Qualche volta al mese", en: "A few times a month", es: "Algunas veces al mes" } },
    { value: 2, label: { it: "Una volta al mese", en: "Once a month", es: "Una vez al mes" } },
    { value: 3, label: { it: "Qualche volta a settimana", en: "A few times a week", es: "Algunas veces por semana" } },
    { value: 4, label: { it: "Una volta a settimana", en: "Once a week", es: "Una vez por semana" } },
    { value: 5, label: { it: "Più volte a settimana", en: "Several times a week", es: "Varias veces por semana" } },
    { value: 6, label: { it: "Ogni giorno", en: "Every day", es: "Todos los días" } },
  ];

  return (
    <div className="space-y-6">
      {questions[language].map((question, index) => (
        <div key={index} className="mb-4">
          <p className="mb-2">{question}</p>
          <div className="flex flex-wrap gap-2">
            {responseOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange(`ee${index + 1}`, opt.value)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  answers[`ee${index + 1}`] === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {opt.label[language]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmotionalExhaustionQuestions;

// DepersonalizationQuestions.jsx, PersonalAchievementQuestions.jsx vanno costruiti allo stesso modo, cambiando solo le chiavi e le domande
