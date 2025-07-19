// src/components/Mindt/flow/getRealtimeInsight.js
const getRealtimeInsight = async (question, lang, answer) => {
  try {
    const response = await fetch("http://localhost:3001/api/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, lang }),
    });

    const data = await response.json();
    console.log("✅ Insight ricevuto dal server:", data.insight);
    return data.insight;
  } catch (error) {
    console.error("❌ GPT API Error:", error.message);
    return "⚠️ Insight non disponibile al momento.";
  }
};

export default getRealtimeInsight;
