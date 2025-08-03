// ✅ src/context/BurnoutContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const BurnoutContext = createContext();

export const BurnoutProvider = ({ children }) => {
  const [burnoutLevel, setBurnoutLevel] = useState("low");

  useEffect(() => {
    const rawAnswers = JSON.parse(localStorage.getItem("burnoutAnswers") || "[]");
    const formattedAnswers = rawAnswers.reduce((acc, cur) => {
      acc[cur.question] = cur.score;
      return acc;
    }, {});

    const EE = (formattedAnswers["EE1"] || 0) + (formattedAnswers["EE2"] || 0);
    const DP = (formattedAnswers["DP1"] || 0) + (formattedAnswers["DP2"] || 0);
    const RP = (formattedAnswers["RP1"] || 0) + (formattedAnswers["RP2"] || 0);

    if (EE >= 6 && (DP >= 4 || RP <= 3)) setBurnoutLevel("high");
    else if (EE >= 4 || DP >= 3 || RP <= 4) setBurnoutLevel("moderate");
    else setBurnoutLevel("low");
  }, []);

  return (
    <BurnoutContext.Provider value={{ burnoutLevel, setBurnoutLevel }}>
      {children}
    </BurnoutContext.Provider>
  );
};

export const useBurnout = () => useContext(BurnoutContext);
