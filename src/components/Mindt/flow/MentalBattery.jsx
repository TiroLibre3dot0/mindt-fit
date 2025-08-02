import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import clsx from "clsx";

const getBatteryLevel = (burnoutLevel) => {
  switch (burnoutLevel) {
    case "high":
      return 1;
    case "moderate":
      return 3;
    case "low":
    default:
      return 5;
  }
};

const getLabel = (level, language) => {
  const labels = {
    it: {
      high: "Batteria mentale scarica",
      moderate: "Batteria mentale a metà",
      low: "Batteria mentale carica",
    },
    en: {
      high: "Mental battery low",
      moderate: "Mental battery half-full",
      low: "Mental battery full",
    },
    es: {
      high: "Batería mental vacía",
      moderate: "Batería mental a la mitad",
      low: "Batería mental llena",
    },
  };
  return labels[language]?.[level] || labels.it[level];
};

const MentalBattery = ({ burnoutLevel, onClick }) => {
  const { language } = useLanguage();
  const level = getBatteryLevel(burnoutLevel);
  const label = getLabel(burnoutLevel, language);

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center animate-fade-in transition-all duration-500 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
      style={{ background: "transparent", border: "none" }}
    >
      {/* Battery container */}
      <div className="relative flex items-center">
        <div className="w-[160px] h-[60px] bg-white rounded-lg flex items-center justify-start p-1 gap-[6px] border-2 border-gray-300 shadow-md transition-all">
          {[...Array(5)].map((_, i) => {
            const isActive = i < level;
            const isLastPulse =
              (burnoutLevel === "low" && i === 4) ||
              (burnoutLevel === "moderate" && i === 2) ||
              (burnoutLevel === "high" && i === 0);

            return (
              <div
                key={i}
                className={clsx(
                  "w-[20px] h-[40px] rounded-sm transition-all duration-500",
                  {
                    // Green (Low)
                    "bg-green-500": isActive && burnoutLevel === "low",
                    "animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]":
                      isLastPulse && burnoutLevel === "low",

                    // Yellow (Moderate)
                    "bg-yellow-400": isActive && burnoutLevel === "moderate",
                    "animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.8)]":
                      isLastPulse && burnoutLevel === "moderate",

                    // Red (High)
                    "bg-red-500": isActive && burnoutLevel === "high",
                    "animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)]":
                      isLastPulse && burnoutLevel === "high",

                    // Inactive
                    "bg-gray-200": !isActive,
                  }
                )}
              />
            );
          })}
        </div>

        {/* Battery tip */}
        <div className="w-[12px] h-[28px] bg-gray-300 rounded-r ml-1" />
      </div>

      {/* Label */}
      <p className="text-sm mt-2 text-white font-semibold text-center">{label}</p>
    </button>
  );
};

export default MentalBattery;
