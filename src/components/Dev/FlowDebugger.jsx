// src/components/Dev/FlowDebugger.jsx
import React, { useEffect, useState } from "react";
import { getFlowLogs, clearFlowLogs } from "../../utils/logFlow";

const FlowDebugger = () => {
  const [logs, setLogs] = useState([]);
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("flowDebuggerOpen");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    const updateLogs = () => {
      const allLogs = getFlowLogs();
      setLogs(allLogs.reverse().slice(0, 20));
    };

    const interval = setInterval(updateLogs, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDebugger = () => {
    const next = !isOpen;
    setIsOpen(next);
    localStorage.setItem("flowDebuggerOpen", next.toString());
  };

  const colorMap = {
    info: "border-blue-500",
    error: "border-red-500",
    warning: "border-yellow-500",
    trace: "border-gray-400",
  };

  return (
    <>
      {/* BOTTONE FLOTTANTE */}
      <button
        onClick={toggleDebugger}
        className="fixed bottom-4 right-4 z-50 bg-[#f17b4e] text-white px-3 py-1 rounded-full shadow-lg text-xs hover:bg-[#e56733] transition"
      >
        {isOpen ? "🛠️ Nascondi Debug" : "🛠️ Mostra Debug"}
      </button>

      {/* PANNELLO DEBUGGER */}
      {isOpen && (
        <div className="fixed bottom-14 right-4 z-50 w-[360px] max-h-[80vh] overflow-y-auto text-sm shadow-lg bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-bold text-gray-700">🛠️ Debug Log – Mindt Flow</div>
            <button
              onClick={() => {
                clearFlowLogs();
                setLogs([]);
              }}
              className="text-[10px] bg-red-100 text-red-600 px-2 py-[2px] rounded hover:bg-red-200"
            >
              Pulisci
            </button>
          </div>

          {logs.map((log, i) => (
            <div
              key={i}
              className={`mb-2 p-2 rounded border-l-4 ${colorMap[log.level] || "border-gray-300"}`}
            >
              <div className="font-semibold text-gray-800">{log.component}</div>
              <div className="text-gray-600">{log.action}</div>
              {log.data && (
                <pre className="mt-1 bg-gray-50 p-1 rounded text-xs text-gray-500 overflow-x-auto">
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FlowDebugger;
