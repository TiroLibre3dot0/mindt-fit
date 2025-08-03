import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import Flag from "react-world-flags";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const availableLangs = ["it", "en", "es"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 bg-transparent text-white focus:outline-none"
      >
        <Flag code={language} style={{ width: 20, height: 14, borderRadius: 2 }} />
        <span className="text-sm">▼</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white text-black rounded shadow z-50">
          {availableLangs.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
            >
              <Flag code={lang} style={{ width: 20, height: 14, borderRadius: 2 }} />
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
