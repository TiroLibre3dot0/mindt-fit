// src/components/Mindt/Shop/ShopPage.jsx
import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageSwitcher from "../../LanguageSwitcher";

const translations = {
  addToCart: {
    it: "Aggiungi al carrello",
    en: "Add to Cart",
    es: "Agregar al carrito",
  },
  ingredientsLabel: {
    it: "Ingredienti funzionali:",
    en: "Nutritional Ingredients:",
    es: "Ingredientes funcionales:",
  },
  effectsLabel: {
    it: {
      focus: "🧠 Concentrazione",
      calm: "😌 Calma",
      energy: "⚡ Energia",
    },
    en: {
      focus: "🧠 Focus",
      calm: "😌 Calm",
      energy: "⚡ Energy",
    },
    es: {
      focus: "🧠 Concentración",
      calm: "😌 Calma",
      energy: "⚡ Energía",
    },
  },
};

const snacks = [
  {
    id: 1,
    image: "/Snacks/snack1.png",
    price: "$3.49",
    rating: 5,
    name: {
      it: "Barra Focus",
      en: "Focus Bar",
      es: "Barra Focus",
    },
    ingredients: {
      it: ["Magnesio", "L-Teanina", "Tè Verde"],
      en: ["Magnesium", "L-Theanine", "Green Tea"],
      es: ["Magnesio", "L-Teanina", "Té Verde"],
    },
    effects: ["focus", "energy"],
  },
  {
    id: 2,
    image: "/Snacks/snack2.png",
    price: "$3.49",
    rating: 4,
    name: {
      it: "Barra Calm",
      en: "Calm Bar",
      es: "Barra Calma",
    },
    ingredients: {
      it: ["Ashwagandha", "Camomilla", "Zinco"],
      en: ["Ashwagandha", "Chamomile", "Zinc"],
      es: ["Ashwagandha", "Manzanilla", "Zinc"],
    },
    effects: ["calm"],
  },
  {
    id: 3,
    image: "/Snacks/snack3.png",
    price: "$2.99",
    rating: 5,
    name: {
      it: "Shot Energetico",
      en: "Energy Shot",
      es: "Shot de Energía",
    },
    ingredients: {
      it: ["Guaranà", "Vitamina B12", "Maca"],
      en: ["Guaranà", "Vitamin B12", "Maca"],
      es: ["Guaraná", "Vitamina B12", "Maca"],
    },
    effects: ["energy"],
  },
  {
    id: 4,
    image: "/Snacks/snack4.png",
    price: "$3.99",
    rating: 4,
    name: {
      it: "Bites Umore",
      en: "Mood Boost Bites",
      es: "Bocados Ánimo",
    },
    ingredients: {
      it: ["Cioccolato fondente", "Zafferano", "Rhodiola"],
      en: ["Dark Chocolate", "Saffron", "Rhodiola"],
      es: ["Chocolate negro", "Azafrán", "Rhodiola"],
    },
    effects: ["calm", "focus"],
  },
  {
    id: 5,
    image: "/Snacks/snack5.png",
    price: "$3.49",
    rating: 4,
    name: {
      it: "Barra Sonno",
      en: "Deep Sleep Bar",
      es: "Barra Sueño",
    },
    ingredients: {
      it: ["Melatonina", "Lavanda", "GABA"],
      en: ["Melatonin", "Lavender", "GABA"],
      es: ["Melatonina", "Lavanda", "GABA"],
    },
    effects: ["calm"],
  },
  {
    id: 6,
    image: "/Snacks/snack6.png",
    price: "$3.69",
    rating: 5,
    name: {
      it: "Croccante Immunity",
      en: "Immunity Crunch",
      es: "Crocante Inmunidad",
    },
    ingredients: {
      it: ["Zinco", "Vitamina C", "Probiotici"],
      en: ["Zinc", "Vitamin C", "Probiotics"],
      es: ["Zinc", "Vitamina C", "Probióticos"],
    },
    effects: ["energy"],
  },
];

const ShopPage = () => {
  const { language } = useLanguage();
  const [selectedSnack, setSelectedSnack] = useState(snacks[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-4">
        <img src="/logo3.png" alt="Mindt Logo" className="h-10" />
        <LanguageSwitcher />
      </div>

      {/* Sezione Prodotto selezionato */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="relative flex-shrink-0">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-yellow-400 opacity-10 blur-3xl" />
          <img
            src={selectedSnack.image}
            alt={selectedSnack.name[language]}
            className="h-[320px] md:h-[400px] z-10 relative object-contain"
          />
        </div>

        <div className="max-w-xl text-center md:text-left z-10">
          <h1 className="text-4xl font-bold mb-4">{selectedSnack.name[language]}</h1>
          <p className="text-red-400 text-2xl font-bold mb-2">{selectedSnack.price}</p>

          <div className="text-yellow-400 my-2 text-sm">
            {"★".repeat(selectedSnack.rating)}{"☆".repeat(5 - selectedSnack.rating)}
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-1">{translations.ingredientsLabel[language]}</h2>
            <ul className="text-sm text-gray-300 list-disc list-inside">
              {selectedSnack.ingredients[language].map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {selectedSnack.effects.map((effect) => (
              <span
                key={effect}
                className="bg-gray-800 text-sm px-3 py-1 rounded-full border border-gray-600"
              >
                {translations.effectsLabel[language][effect]}
              </span>
            ))}
          </div>

          <button className="mt-6 bg-red-600 px-6 py-2 text-white font-semibold rounded-lg hover:bg-red-700 transition">
            {translations.addToCart[language]}
          </button>
        </div>
      </div>

      {/* Carosello snack */}
      <div className="flex flex-wrap justify-center gap-6 px-4 pb-20">
        {snacks.map((snack) => (
          <div
            key={snack.id}
            onClick={() => setSelectedSnack(snack)}
            className={`cursor-pointer bg-[#1c1c1c] rounded-xl p-4 w-[140px] text-center shadow transition hover:scale-105 ${
              selectedSnack.id === snack.id ? "ring-2 ring-red-500" : ""
            }`}
          >
            <img
              src={snack.image}
              alt={snack.name[language]}
              className="h-20 object-contain mx-auto mb-2"
            />
            <h3 className="text-xs font-semibold">{snack.name[language]}</h3>
            <p className="text-red-400 text-sm font-bold">{snack.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
