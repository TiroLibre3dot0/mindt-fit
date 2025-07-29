// src/components/Mindt/flow/getRealtimeInsight.js

const getRealtimeInsight = async (question, answer, language = "en") => {
  try {
    const response = await fetch("/api/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, language }),
    });

    const data = await response.json();
    console.log("✅ Insight ricevuto dal server:", data.insight);
    return data.insight;
  } catch (error) {
    console.error("❌ GPT API Error:", error.message);
    return language === "it"
      ? "⚠️ Insight non disponibile al momento."
      : "⚠️ Insight temporarily unavailable.";
  }
};

export default getRealtimeInsight;
