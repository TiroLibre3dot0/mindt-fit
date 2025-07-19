// src/components/Mindt/flow/StepNavigation.jsx
import React from "react";

const StepNavigation = ({ onNext, onBack, isLast }) => {
  return (
    <div className="flex justify-between items-center max-w-md mx-auto mt-10">
      <button
        onClick={onBack}
        className="px-5 py-2 text-sm font-semibold rounded-md border border-white text-white hover:bg-white hover:text-[#224344] transition"
      >
        ← Indietro
      </button>
      <button
        onClick={onNext}
        className="px-5 py-2 text-sm font-semibold rounded-md bg-[#ee7a4d] text-white hover:bg-[#e76a3c] transition"
      >
        {isLast ? "Vedi Risultato" : "Avanti →"}
      </button>
    </div>
  );
};

export default StepNavigation;
