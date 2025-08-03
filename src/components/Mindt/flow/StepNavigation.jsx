import React from "react";

const StepNavigation = ({ onNext, onBack, isLast, highlightColors }) => {
  const bg = highlightColors?.color || "#ee7a4d";
  const hover = highlightColors?.hover || "#e76a3c";
  const text = "#224344";

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
        style={{ backgroundColor: bg }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hover}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bg}
        className="px-5 py-2 text-sm font-semibold rounded-md text-white transition"
      >
        {isLast ? "Vedi Risultato" : "Avanti →"}
      </button>
    </div>
  );
};

export default StepNavigation;
