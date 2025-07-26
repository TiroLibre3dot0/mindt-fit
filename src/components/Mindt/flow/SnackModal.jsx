import React from "react";
import { useLanguage } from "../../../context/LanguageContext";

const translations = {
  it: {
    title: "Suggerimento snack",
    close: "Chiudi",
  },
  en: {
    title: "Snack suggestion",
    close: "Close",
  },
  es: {
    title: "Sugerencia de snack",
    close: "Cerrar",
  },
};

const SnackModal = ({ snackInfo, onClose }) => {
  const { language } = useLanguage();
  const { name, description } = snackInfo;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <h3 className="text-xl font-semibold mb-2 text-[#224344]">
          {translations[language]?.title || translations.it.title}
        </h3>
        <p className="text-gray-700 mb-4">
          <strong>{name}</strong>: {description}
        </p>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-sm"
        >
          {translations[language]?.close || translations.it.close}
        </button>
      </div>
    </div>
  );
};

export default SnackModal;
