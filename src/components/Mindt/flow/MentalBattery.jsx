// src/components/Mindt/pages/MentalBattery.jsx
import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import clsx from "clsx";
import { getColorPalette } from "../../../utils/burnoutColors";

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
  const palette = getColorPalette(burnoutLevel);

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
                    "bg-gray-200": !isActive,
                    [`bg-[${palette.main}]`]: isActive,
                    "animate-pulse": isLastPulse,
                  }
                )}
                style={
                  isLastPulse
                    ? {
                        backgroundColor: palette.main,
                        boxShadow: `0 0 12px ${palette.glow}`,
                      }
                    : isActive
                    ? { backgroundColor: palette.main }
                    : undefined
                }
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
