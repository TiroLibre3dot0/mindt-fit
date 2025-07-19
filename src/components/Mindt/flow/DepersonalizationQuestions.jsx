// DepersonalizationQuestions.jsx
import React from "react";

const DepersonalizationQuestions = ({ answers, onChange, language }) => {
  const questions = {
    it: [
      "Hai perso interesse verso le persone con cui lavori?",
      "Ti capita di trattare le persone come oggetti?",
      "Sei diventato più insensibile nei confronti degli altri?",
      "Ti accorgi di evitare il coinvolgimento emotivo sul lavoro?",
      "Ti sembra di non curarti più di ciò che succede al lavoro?",
    ],
    en: [
      "Have you lost interest in the people you work with?",
      "Do you sometimes treat people as if they were objects?",
      "Have you become more insensitive towards others?",
      "Do you find yourself avoiding emotional involvement at work?",
      "Do you feel like you no longer care about what happens at work?",
    ],
    es: [
      "¿Has perdido interés por las personas con las que trabajas?",
      "¿Tratas a las personas como objetos a veces?",
      "¿Te has vuelto más insensible con los demás?",
      "¿Evitas involucrarte emocionalmente en el trabajo?",
      "¿Sientes que ya no te importa lo que pasa en el trabajo?",
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
                onClick={() => onChange(`dp${index + 1}`, opt.value)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  answers[`dp${index + 1}`] === opt.value
                    ? "bg-red-600 text-white"
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

export default DepersonalizationQuestions;
