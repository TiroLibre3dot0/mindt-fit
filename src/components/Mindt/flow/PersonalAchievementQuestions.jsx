// PersonalAchievementQuestions.jsx
import React from "react";

const PersonalAchievementQuestions = ({ answers, onChange, language }) => {
  const questions = {
    it: [
      "Senti di riuscire a gestire efficacemente i problemi?",
      "Ti senti pienamente realizzato professionalmente?",
      "Senti di avere un impatto positivo sul lavoro?",
      "Sei soddisfatto dei tuoi risultati?",
      "Pensi di lavorare in modo efficace?",
      "Ti senti competente in ciò che fai?",
      "Ti accorgi di aiutare realmente le persone nel tuo lavoro?",
      "Senti che il tuo lavoro ha valore?",
    ],
    en: [
      "Do you feel you handle problems effectively?",
      "Do you feel fully accomplished professionally?",
      "Do you feel you're having a positive impact at work?",
      "Are you satisfied with your results?",
      "Do you believe you work efficiently?",
      "Do you feel competent in your job?",
      "Do you realize you really help others in your work?",
      "Do you feel your job has value?",
    ],
    es: [
      "¿Sientes que manejas los problemas eficazmente?",
      "¿Te sientes plenamente realizado profesionalmente?",
      "¿Sientes que tienes un impacto positivo en el trabajo?",
      "¿Estás satisfecho con tus resultados?",
      "¿Crees que trabajas de manera eficiente?",
      "¿Te sientes competente en lo que haces?",
      "¿Te das cuenta de que realmente ayudas a otros en tu trabajo?",
      "¿Sientes que tu trabajo tiene valor?",
    ],
  };

  const responseOptions = [
    { value: 0, label: { it: "Mai", en: "Never", es: "Nunca" } },
    { value: 1, label: { it: "Qualche volta", en: "Sometimes", es: "A veces" } },
    { value: 2, label: { it: "Spesso", en: "Often", es: "A menudo" } },
    { value: 3, label: { it: "Sempre", en: "Always", es: "Siempre" } },
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
                onClick={() => onChange(`rp${index + 1}`, opt.value)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  answers[`rp${index + 1}`] === opt.value
                    ? "bg-green-600 text-white"
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

export default PersonalAchievementQuestions;
