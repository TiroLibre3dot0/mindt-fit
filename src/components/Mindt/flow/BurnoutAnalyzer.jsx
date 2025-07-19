import React from "react";
import { burnoutThresholds } from "../flow/burnoutThresholds";

const BurnoutAnalyzer = ({ answers, language, mode = "short" }) => {
  const labels = {
    it: {
      result: "Risultato della valutazione",
      status: "Stato attuale:",
      high: "Rischio elevato di burnout",
      medium: "Rischio moderato",
      low: "Nessun segnale rilevante",
      message_high:
        "⚠️ Potresti essere a rischio di burnout. Valuta una pausa o un confronto con uno specialista.",
      message_medium:
        "😐 Stai mostrando alcuni segnali di affaticamento. Prenditi del tempo per recuperare energia.",
      message_low:
        "✅ Al momento non ci sono segnali preoccupanti. Continua così!",
    },
    en: {
      result: "Evaluation result",
      status: "Current status:",
      high: "High burnout risk",
      medium: "Moderate risk",
      low: "No significant signs",
      message_high:
        "⚠️ You may be at risk of burnout. Consider a break or professional help.",
      message_medium:
        "😐 Some signs of exhaustion detected. Take time to rest and recharge.",
      message_low: "✅ No major signs detected. Keep it up!",
    },
    es: {
      result: "Resultado de la evaluación",
      status: "Estado actual:",
      high: "Alto riesgo de burnout",
      medium: "Riesgo moderado",
      low: "Sin señales preocupantes",
      message_high:
        "⚠️ Podrías estar en riesgo de burnout. Considera un descanso o consultar con un especialista.",
      message_medium:
        "😐 Hay señales de cansancio. Tómate un momento para recuperarte.",
      message_low: "✅ No se detectan señales preocupantes. ¡Bien hecho!",
    },
  };

  const lang = labels[language] || labels.it;

  const getShortScore = (area) => {
    const keys = {
      EE: ["ee1", "ee2"],
      DP: ["dp1", "dp2"],
      RP: ["rp1", "rp2"],
    };
    return keys[area]
      .map((key) => answers[key] || 0)
      .reduce((a, b) => a + b, 0);
  };

  const getFullScore = (prefix, count) =>
    Array.from({ length: count }, (_, i) => answers[`${prefix}${i + 1}`] || 0).reduce((a, b) => a + b, 0);

  const ee = mode === "short" ? getShortScore("EE") : getFullScore("ee", 9);
  const dp = mode === "short" ? getShortScore("DP") : getFullScore("dp", 5);
  const rp = mode === "short" ? getShortScore("RP") : getFullScore("rp", 8);

  const getLevel = (score, area) => {
    const thresholds = burnoutThresholds[area][mode];
    if (!thresholds) return "unknown";

    if (area === "RP") {
      if (score <= thresholds.high.max) return "high";
      if (score >= thresholds.medium.min && score <= thresholds.medium.max) return "medium";
      if (score >= thresholds.low.min) return "low";
    } else {
      if (score >= thresholds.high.min) return "high";
      if (score >= thresholds.medium.min && score <= thresholds.medium.max) return "medium";
      if (score <= thresholds.low.max) return "low";
    }

    return "unknown";
  };

  const levelEE = getLevel(ee, "EE");
  const levelDP = getLevel(dp, "DP");
  const levelRP = getLevel(rp, "RP");

  const burnoutRisk =
    levelEE === "high" && (levelDP === "high" || levelRP === "high");

  const finalLevel =
    burnoutRisk
      ? "high"
      : levelEE === "medium" || levelDP === "medium" || levelRP === "medium"
      ? "medium"
      : "low";

  return (
    <div className="p-6 bg-white rounded shadow space-y-3 text-gray-800">
      <h2 className="text-xl font-semibold">{lang.result}</h2>
      <p className="text-base font-medium">
        {lang.status}{" "}
        <span
          className={
            finalLevel === "high"
              ? "text-red-600"
              : finalLevel === "medium"
              ? "text-yellow-600"
              : "text-green-600"
          }
        >
          {lang[finalLevel]}
        </span>
      </p>
      <p className="mt-2 italic">
        {finalLevel === "high"
          ? lang.message_high
          : finalLevel === "medium"
          ? lang.message_medium
          : lang.message_low}
      </p>
    </div>
  );
};

export default BurnoutAnalyzer;
