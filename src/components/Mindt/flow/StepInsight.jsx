// src/components/Mindt/flow/StepInsight.jsx

import React from "react";

const StepInsight = ({ insight }) => {
  if (!insight) return null;

  return (
    <div className="mt-4 p-4 bg-zinc-700 border-l-4 border-blue-500 rounded">
      <p className="italic text-sm text-white">{insight}</p>
    </div>
  );
};

export default StepInsight;
