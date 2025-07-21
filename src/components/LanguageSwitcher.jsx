// src/components/LanguageSwitcher.jsx
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = ({ showLabel = true }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 items-center">
      {showLabel && <label className="text-sm text-gray-300">🌍</label>}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-zinc-700 text-white px-2 py-1 rounded"
      >
        <option value="it">🇮🇹 Italiano</option>
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Español</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
