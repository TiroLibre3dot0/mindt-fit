// src/components/Mindt/MentalBattery.jsx
import React from "react";
import { FaBatteryFull, FaBatteryHalf, FaBatteryEmpty } from "react-icons/fa6";
import { useLanguage } from "../../../context/LanguageContext";

const getBatteryStatus = (burnoutLevel, language) => {
  const translations = {
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

  const labels = translations[language] || translations.it;

  if (burnoutLevel === "high") {
    return {
      icon: <FaBatteryEmpty className="text-red-500 animate-pulse" size={40} />,
      label: labels.high,
      color: "text-red-600",
    };
  }
  if (burnoutLevel === "moderate") {
    return {
      icon: <FaBatteryHalf className="text-yellow-500" size={40} />,
      label: labels.moderate,
      color: "text-yellow-600",
    };
  }
  return {
    icon: <FaBatteryFull className="text-green-500" size={40} />,
    label: labels.low,
    color: "text-green-600",
  };
};

const MentalBattery = ({ burnoutLevel }) => {
  const { language } = useLanguage();
  const { icon, label, color } = getBatteryStatus(burnoutLevel, language);

  return (
    <div className="flex flex-col items-center mb-6 animate-fade-in">
      <div className="mb-1">{icon}</div>
      <p className={`text-sm font-medium ${color}`}>{label}</p>
    </div>
  );
};

export default MentalBattery;
