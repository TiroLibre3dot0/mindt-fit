// src/components/LanguageSwitcher.jsx
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm text-gray-300">🌍 Language:</label>
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
