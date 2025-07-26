import React, { useState } from "react";
import SnackModal from "./SnackModal";
import { useLanguage } from "../../../context/LanguageContext";

const snacks = [
  {
    id: 1,
    name: "Focus Bites",
    img: "/Snacks/snack1.png",
    description: {
      it: "Dark chocolate, ashwagandha, L-theanine",
      en: "Dark chocolate, ashwagandha, L-theanine",
      es: "Chocolate negro, ashwagandha, L-teanina",
    },
  },
  {
    id: 2,
    name: "Relax Cubes",
    img: "/Snacks/snack2.png",
    description: {
      it: "Miele, camomilla, magnesio",
      en: "Honey, chamomile, magnesium",
      es: "Miel, manzanilla, magnesio",
    },
  },
  {
    id: 3,
    name: "Energy Bar",
    img: "/Snacks/snack3.png",
    description: {
      it: "Noci, cacao crudo, vitamina B12",
      en: "Nuts, raw cacao, vitamin B12",
      es: "Nueces, cacao crudo, vitamina B12",
    },
  },
  {
    id: 4,
    name: "Sleep Squares",
    img: "/Snacks/snack4.png",
    description: {
      it: "Melatonina, lavanda, avena",
      en: "Melatonin, lavender, oats",
      es: "Melatonina, lavanda, avena",
    },
  },
  {
    id: 5,
    name: "Mood Bites",
    img: "/Snacks/snack5.png",
    description: {
      it: "Mandorle, triptofano, vitamina D",
      en: "Almonds, tryptophan, vitamin D",
      es: "Almendras, triptófano, vitamina D",
    },
  },
  {
    id: 6,
    name: "Calm Cookies",
    img: "/Snacks/snack6.png",
    description: {
      it: "Semi di lino, passiflora, zinco",
      en: "Flax seeds, passionflower, zinc",
      es: "Semillas de lino, pasiflora, zinc",
    },
  },
];

const SnackInfoBox = () => {
  const [selectedSnack, setSelectedSnack] = useState(null);
  const { language } = useLanguage();

  const handleSnackClick = (snack) => {
    setSelectedSnack(snack);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {snacks.map((snack) => (
        <button
          key={snack.id}
          onClick={() => handleSnackClick(snack)}
          className="transition-transform transform hover:scale-105 focus:outline-none"
        >
          <img
            src={snack.img}
            alt={snack.name}
            className="h-20 md:h-24 cursor-pointer drop-shadow-md hover:drop-shadow-xl"
          />
        </button>
      ))}
      {selectedSnack && (
        <SnackModal
          snackInfo={{
            name: selectedSnack.name,
            description: selectedSnack.description[language],
          }}
          onClose={() => setSelectedSnack(null)}
        />
      )}
    </div>
  );
};

export default SnackInfoBox;
