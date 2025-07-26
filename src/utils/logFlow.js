const isDev = import.meta.env.MODE === "development";

const debugLog = [];

export function logFlow({ component = "Unknown", action = "Unknown action", data = {}, level = "info" }) {
  if (!isDev) return;

  const entry = {
    time: new Date().toLocaleTimeString(),
    component,
    action,
    level,
    data: data ?? null,
  };

  debugLog.push(entry);

  console[level](
    `%c[${entry.time}] [${component}] ${action}`,
    "color: #f17b4e; font-weight: bold;",
    data
  );

  try {
    const logs = JSON.parse(localStorage.getItem("flowLogs") || "[]");
    logs.push(entry);
    localStorage.setItem("flowLogs", JSON.stringify(logs));
  } catch (err) {
    console.error("Errore salvataggio log in localStorage:", err);
  }
}

export function clearFlowLogs() {
  localStorage.removeItem("flowLogs");
}

export function getFlowLogs() {
  return JSON.parse(localStorage.getItem("flowLogs") || "[]");
}
