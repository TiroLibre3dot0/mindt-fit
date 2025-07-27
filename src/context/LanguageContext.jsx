// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { logFlow } from "../utils/logFlow"; 


const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("it");

  // ✅ Imposta la lingua del browser al primo caricamento
  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2); // "en", "es", "it"
    if (["en", "es", "it"].includes(browserLang)) {
      setLanguage(browserLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);