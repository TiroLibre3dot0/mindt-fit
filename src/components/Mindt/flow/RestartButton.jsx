// src/components/Mindt/RestartButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const RestartButton = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    localStorage.removeItem("burnoutAnswers");
    localStorage.removeItem("burnoutInsights");
    navigate("/mindt"); // o "/mindt-flow" se è il primo step
  };

  return (
    <button
      onClick={handleRestart}
      className="text-sm text-blue-800 underline hover:text-blue-900"
    >
      🔄 Rifai il test
    </button>
  );
};

export default RestartButton;
